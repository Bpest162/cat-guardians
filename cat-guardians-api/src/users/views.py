from urllib.parse import urlencode

from django.conf import settings
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import check_password, make_password
from django.db import DatabaseError
from django.shortcuts import redirect
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, mixins, permissions, serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from retrying import retry

from core.logger import LogWrapper
from users.mixins import ApiErrorsMixin, PublicApiMixin
from users.utils import google_get_access_token, google_get_user_info
from utils.mixins import HandleRetryingMixin, ListMixin
from utils.retrying_conf import retry_if_expectation_failed

from .models import CustomUser
from .serializers import ChangePasswordSerializer, CustomUserSerializer, LoginSerializer, UserEditSerializer
from .services import _get_sessions_expiration_times, _get_signed_cookie, _get_user_data_from_request
from .swagger_schemas import delete_user_response_schema
from .user_permissions import OwnOrAdminPermission

logger = LogWrapper.USER

# Check if running in development or production environment (because when secure is True,
# cookie will be set only for HTTPS)
SECURE = not settings.DEBUG


class GoogleLoginApiView(PublicApiMixin, ApiErrorsMixin, APIView):
    """
    API view for handling Google authentication.

    Inherits from PublicApiMixin, ApiErrorsMixin, and APIView.

    """

    class InputSerializer(serializers.Serializer):
        """
        Serializer class for handling input data.

        """

        code = serializers.CharField(required=True)

    def get(self, request, *args, **kwargs):
        """
        Handle GET request for Google authentication.

        Parameters:
        - request: Django HTTP request object.
        - args: Additional positional arguments.
        - kwargs: Additional keyword arguments.

        Returns:
        - Response: HTTP response indicating the success of the login.

        TODO: Redirects to the home page frontend URL.
        """
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data
        code = validated_data.get("code")

        redirect_uri = f"{settings.BASE_URL}{reverse('google_login_callback')}"
        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)
        try:
            user = CustomUser.objects.get(email=user_data.get("email"))
        except CustomUser.DoesNotExist:
            email = user_data.get("email")
            first_name = user_data.get("given_name", "")
            last_name = user_data.get("family_name", "")

            user = CustomUser.objects.create(
                email=email,
                first_name=first_name,
                last_name=last_name,
            )
        login(request, user)

        session_expiration_time, cookie_expiration_time = _get_sessions_expiration_times(remember_me=True)
        signed_cookie = _get_signed_cookie(user.id)

        request.session.set_expiry(session_expiration_time)

        response_data = {"message": "Login Successful"}
        response = Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie(
            settings.SIGNED_COOKIE_NAME, signed_cookie, httponly=True, secure=True, expires=cookie_expiration_time
        )
        return response  # TODO: Here must be redirect to home page frontend url


class GoogleRedirectApiView(APIView):
    """
    API view for redirecting to Google choice account.

    Inherits from APIView.

    """

    permission_classes = [
        ~IsAuthenticated,
    ]

    def get(self, request, *args, **kwargs):
        """
        Handle GET request for redirecting to Google choice account.

        Parameters:
        - request: Django HTTP request object.
        - args: Additional positional arguments.
        - kwargs: Additional keyword arguments.

        Returns:
        - HttpResponseRedirect: Redirects to Google authentication URL.
        """
        google_auth_url = settings.GOOGLE_AUTH_URL
        redirect_uri = f"{settings.BASE_URL}{reverse('google_login_callback')}"
        params = {
            "response_type": "code",
            "client_id": settings.GOOGLE_OAUTH2_CLIENT_ID,
            "redirect_uri": redirect_uri,
            "prompt": "select_account",
            "access_type": "offline",
            "scope": f"{settings.GOOGLE_SCOPE_EMAIL} {settings.GOOGLE_SCOPE_PROFILE}",
        }

        return redirect(google_auth_url + "?" + urlencode(params))


class GoogleCallbackApiView(PublicApiMixin, APIView):
    """
    API view for handling Google authentication callback.

    Inherits from PublicApiMixin and APIView.

    """

    def get(self, request, *args, **kwargs):
        """
        Handle GET request for Google authentication callback.

        Parameters:
        - request: Django HTTP request object.
        - args: Additional positional arguments.
        - kwargs: Additional keyword arguments.

        Returns:
        - HttpResponseRedirect: Redirects to the Google Login API View with authentication parameters.
        """
        scope_values = [
            "email",
            "profile",
            "openid",
            settings.GOOGLE_SCOPE_PROFILE,
            settings.GOOGLE_SCOPE_EMAIL,
        ]
        scope = " ".join(scope_values)
        params = {
            "code": request.GET.get("code"),
            "scope": scope,
            "authuser": 0,
            "prompt": "none",
        }
        google_login_url = f"{settings.BASE_URL}{reverse('google_login')}"

        return redirect(google_login_url + "?" + urlencode(params))


class UserLoginView(CreateAPIView):
    """
    API view for user login.

    Inherits from CreateAPIView.

    """

    serializer_class = LoginSerializer
    permission_classes = [~permissions.IsAuthenticated]

    def post(self, request: Request, *args, **kwargs):
        """Process the POST request. Verifies the authenticity of the user and logs them in.

        The function validates the request data, extracts a user and a "remember me" preference
        from cookie data, checks user validity. If user is valid, they get logged in and
        session time is set based on the preferences. The signed cookie for the user is  also
        created in the response.

        Args:
            request (HttpRequest): The Django request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: A HTTP Response. The content of the response and its status depend on whether
                      the login operation was successful or not. In case of success, it returns a
                      200 OK response with a success message and updates the user's signed cookie.
                      In case of failure, it returns a 403 FORBIDDEN response with an error message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        user, remember_me = _get_user_data_from_request(data)

        if not user:
            response_data = {
                "message": "Invalid Credentials",
            }
            return Response(response_data, status=status.HTTP_403_FORBIDDEN)

        login(request, user)

        session_expiration_time, cookie_expiration_time = _get_sessions_expiration_times(remember_me)
        signed_cookie = _get_signed_cookie(user.id)

        request.session.set_expiry(session_expiration_time)

        response_data = {
            "message": {"Login Successful"},
            "data": {
                "email": user.email,
                "id": user.id,
            },
        }
        response = Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie(
            settings.SIGNED_COOKIE_NAME, signed_cookie, httponly=True, secure=SECURE, expires=cookie_expiration_time
        )
        return response


class UserLogoutView(APIView):
    """
    View for logging out a user.

    Inherits from APIView.

    Attributes:
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        post(request): Handles POST requests to log out a user.
    """

    permission_classes = [permissions.IsAuthenticated]

    @staticmethod
    def post(request):
        """
        Handles POST requests to log out a user.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            Response: The HTTP response indicating successful logout.
        """
        logout(request)
        response_data = {
            "message": "Logged out successfully",
        }
        response = Response(response_data, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIGNED_COOKIE_NAME)
        return response


class UserCreateAPIView(CreateAPIView):
    """
    View for creating a new user and logging them in automatically.

    Inherits from CreateAPIView.

    Attributes:
        serializer_class (Serializer): The serializer class used for serialization.
        queryset (QuerySet): The queryset used by the view to retrieve objects.
    """

    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

    def create(self, request, *args, **kwargs):
        """
        Handles POST requests to create a new user and logs them in.

        Args:
            request (HttpRequest): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response indicating the result of the user creation and login process.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            message = "Email address has been taken"
            status_code = status.HTTP_400_BAD_REQUEST
            return Response({"message": message}, status=status_code)

        validated_data = serializer.validated_data
        password = validated_data.get("password")
        hashed_password = make_password(password)
        validated_data["password"] = hashed_password
        user = serializer.save()

        # Log the user in
        login(request, user)

        session_expiration_time, cookie_expiration_time = _get_sessions_expiration_times(remember_me=True)
        signed_cookie = _get_signed_cookie(user.id)

        request.session.set_expiry(session_expiration_time)

        response_data = {
            "message": {"New user created and logged in successfully"},
            "data": {
                "email": user.email,
                "id": user.id,
            },
        }
        response = Response(response_data, status=status.HTTP_201_CREATED)

        response.set_cookie(
            settings.SIGNED_COOKIE_NAME, signed_cookie, httponly=True, secure=SECURE, expires=cookie_expiration_time
        )

        return response


class UserListAPIView(ListMixin, ListAPIView):
    """
    View for listing users.

    Inherits from ListMixin and ListAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        permission_classes (list): The list of permission classes applied to the view.
        serializer_class (Serializer): The serializer class used for serialization.
        filter_backends (list): The list of filter backends used for filtering the queryset.
        search_fields (list): The list of fields used for searching in the queryset.
        ordering_fields (str): The fields used for ordering the queryset.

    Note:
        The queryset is ordered by ID by default.
    """

    queryset = CustomUser.objects.all().order_by("id")
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = CustomUserSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["username", "email"]
    ordering_fields = "__all__"


class DeleteUserAPIView(HandleRetryingMixin, APIView):
    """
    A view to delete a user profile.

    This view allows an authenticated user to delete their own profile or an administrator to delete any user.

    Attributes:
        permission_classes (list): The list of permission classes applied to the view.
        http_method_names (list): The list of HTTP method names supported by the view.

    Methods:
        delete: Handles the DELETE request for deleting a user profile.

    Raises:
        DatabaseError: If the deletion of the user fails.

    Example Usage:
        DELETE /api/users/delete/1/
        Delete the user with identifier 1.
    """

    permission_classes = [permissions.IsAuthenticated, OwnOrAdminPermission]
    http_method_names = ["delete"]

    @swagger_auto_schema(
        responses=delete_user_response_schema,
    )
    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def delete(self, request: Request, pk):
        """
        Delete a user.
        This method allows an authenticated user to delete their own profile
        or an administrator to delete any user.

        Args:
        - request (Request): The HTTP DELETE request object.
        - pk (int): The identifier of the user to be deleted.

        Returns:
        - Response: An HTTP response indicating the result of the user deletion.

        Response Status Codes:
        - 200 OK: The user was successfully deleted.
        - 401 Permission denied: Non-admin user attempting to delete someone else's profile
        - 403 Forbidden: Access denied to the resource.
        - 404 Not Found: The specified user was not found.
        - 417 Expectation Failed: User deletion failed.

        Example Usage:
        ```
        DELETE /api/users/delete/1/
        ```
        Delete the user with identifier 1.
        """
        user = CustomUser.objects.filter(pk=pk).first()
        if not user:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        deleted_count, data = user.delete()
        if not deleted_count:
            raise DatabaseError(
                "User deletion failed"
            )  # Trigger retry or return 417 response when the attempts are over

        return Response({"message": f"User(id={pk}) was deleted successfully"}, status=status.HTTP_200_OK)


class UserEditView(HandleRetryingMixin, mixins.UpdateModelMixin, GenericAPIView):
    """
    A view to update user details.

    This view allows authenticated users to update their own user data such as email, fullName, etc.

    Attributes:
        queryset (QuerySet): The queryset of CustomUser objects.
        serializer_class (Serializer): The serializer class used to serialize/deserialize user data.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        put: Handles the PUT request for updating user details.

    Raises:
        ValidationError: If the request data is invalid.

    Returns:
        Response: A HTTP Response with a success message and status code.
    """

    queryset = CustomUser.objects.all()
    serializer_class = UserEditSerializer
    permission_classes = [IsAuthenticated]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def put(self, request, *args, **kwargs):
        """Update user details.

        This method allows you to update user data such as email, fullName, etc.

        Args:
            request (HttpRequest): The Django request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: A HTTP Response with a success message and status code.
        """
        partial = True
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            field, message = (list(e.detail.keys())[0], list(e.detail.values())[0][0])
            message = f"{field}: {message}"
            status_code = status.HTTP_400_BAD_REQUEST
        else:
            self.perform_update(serializer)
            message = "User details updated"
            status_code = status.HTTP_200_OK

        return Response({"message": message}, status=status_code)


class UserChangePasswordView(HandleRetryingMixin, mixins.UpdateModelMixin, GenericAPIView):
    """
    A view to change user password.

    This view allows authenticated users to change their password after providing the old password,
    a new password, and confirming the new password.

    Attributes:
        serializer_class (Serializer): The serializer class used to serialize/deserialize password change data.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        put: Handles the PUT request for changing user password.

    Raises:
        ValidationError: If the request data is invalid.

    Returns:
        Response: A HTTP Response with a success message and status code.
    """

    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def put(self, request, *args, **kwargs):
        """Change user password.

        This method allows a user to change their password after providing the old password,
        a new password, and confirming the new password.

        Args:
            request (HttpRequest): The Django request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: A HTTP Response with a success message and status code.
        """
        user = self.request.user
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_412_PRECONDITION_FAILED)

        old_password = serializer.validated_data.get("old_password")
        new_password = serializer.validated_data.get("new_password")
        confirm_password = serializer.validated_data.get("confirm_password")

        if new_password == old_password:
            return Response(
                {"message": "New password must be different from old password"},
                status=status.HTTP_412_PRECONDITION_FAILED,
            )

        if not check_password(old_password, user.password):
            return Response({"message": "Invalid old password"}, status=status.HTTP_412_PRECONDITION_FAILED)

        if new_password != confirm_password:
            return Response({"message": "Password mismatch"}, status=status.HTTP_412_PRECONDITION_FAILED)

        user.set_password(new_password)
        user.save()

        logout(request)
        response = Response({"message": "Password changed successfully. You can login now."}, status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIGNED_COOKIE_NAME)

        return response


class CheckLoginStatusView(APIView):
    """
    A view to check if the user is authenticated and returns status code 200 with user's data, otherwise 401.
    """

    def get(self, request):
        if not request.user:
            return Response(
                data={
                    "message": "User is not authenticated",
                },
                status=status.HTTP_401_UNAUTHORIZED,
                headers={"WWW-Authenticate": "Login Required"},
            )

        user_data = {
            "id": request.user.id,
            "email": request.user.email,
            "fullName": request.user.full_name,
            "isStaff": request.user.is_staff,
            "isAdmin": request.user.is_superuser,
            "isActive": request.user.is_active
        }

        return Response(data={"message": "User is authenticated", "data": user_data}, status=status.HTTP_200_OK)
