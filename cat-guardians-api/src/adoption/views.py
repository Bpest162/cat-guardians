from django.conf import settings
from django.http import Http404
from rest_framework import filters, mixins, permissions, status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView, DestroyAPIView, GenericAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from retrying import retry

from core.logger import LogWrapper
from pets.models import CatProfile
from utils.mixins import HandleRetryingMixin, ListMixin
from utils.retrying_conf import retry_if_expectation_failed

from .adoption_permission import CustomForbiddenException, OwnOrAdminPermission, OwnStaffOrAdminPermission
from .models import Adoption
from .serializers import AdoptionEditSerializer, CreateAdoptionSerializer, ListAdoptionSerializer
from .services import update_decision_date

logger = LogWrapper.ADOPTION


class CreateAdoptionAPIView(HandleRetryingMixin, CreateAPIView):
    """
    View for creating an adoption request for a cat.

    Inherits from HandleRetryingMixin and CreateAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        post(request, *args, **kwargs): Handles POST requests to create an adoption request for a cat.
    """

    queryset = Adoption.objects.all()
    serializer_class = CreateAdoptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def post(self, request, *args, **kwargs):
        """
        Create an adoption request for a cat.

        It checks for existing adoption requests for the same user and cat, and creates a new adoption record.

        Args:
            request (HttpRequest): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
        - 201 Created response if the adoption request is created successfully.
        - 400 Bad Request response if the request data is invalid.
        - 404 Not Found response if the cat is not found.
        - 409 Conflict response if the adoption request already exists for the user and cat.
        - 417 Expectation Failed response if the adoption request creation failed.
        """

        user = request.user
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            field, message = (list(e.detail.keys())[0], list(e.detail.values())[0][0])
            message = f"{field}: {message}"
            status_code = status.HTTP_400_BAD_REQUEST
            return Response({"message": message}, status=status_code)

        id_cat = serializer.validated_data.get("id_cat")
        notes = serializer.validated_data.get("notes")
        phone_number = serializer.validated_data.get("phone_number")

        try:
            cat = CatProfile.objects.get(id=id_cat)
        except CatProfile.DoesNotExist:
            return Response({"message": "Cat not found"}, status=status.HTTP_404_NOT_FOUND)

        if Adoption.objects.filter(user=user, cat=cat).exists():
            return Response({"message": "You already have an adoption request"}, status=status.HTTP_409_CONFLICT)

        adoption = Adoption.objects.create(cat=cat, user=user, notes=notes, phone_number=phone_number)

        return Response({"message": f"Adoption request created: {adoption}"}, status=status.HTTP_201_CREATED)


class ListAdoptionAPIView(ListMixin, ListAPIView):
    """
    View for listing adoption requests.

    Inherits from ListMixin and ListAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.
        filter_backends (list): The list of filter backends used for filtering the queryset.
        search_fields (list): The list of fields used for searching in the queryset.
        ordering_fields (list): The list of fields used for ordering the queryset.

    Note:
        The queryset is ordered by default based on cat's name, user, request date, decision date, and status.
    """

    queryset = Adoption.objects.all()
    serializer_class = ListAdoptionSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["cat__name", "user__email", "status"]
    ordering_fields = ["cat__name", "user", "request_date", "decision_date", "status"]


class UserListAdoptionAPIView(ListMixin, ListAPIView):
    """
    View for listing adoption requests associated with a specific user.

    Inherits from ListMixin and ListAPIView.

    Attributes:
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.
        filter_backends (list): The list of filter backends used for filtering the queryset.
        ordering_fields (list): The list of fields used for ordering the queryset.

    Methods:
        get_queryset(*args, **kwargs): Retrieves the queryset of adoption requests for the authenticated user.
    """

    serializer_class = ListAdoptionSerializer
    permission_classes = [permissions.IsAuthenticated, OwnOrAdminPermission]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["cat__name", "request_date", "decision_date", "status"]

    def get_queryset(self, *args, **kwargs):
        """Filter the queryset to get adoptions only for the authenticated user

        Args:
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
            primary_key (int): The primary key of the user
        """

        pk = self.kwargs.get("pk")
        return Adoption.objects.filter(user__id=pk)


class DetailAdoptionAPIView(HandleRetryingMixin, RetrieveAPIView):
    """
    View for retrieving details of an adoption request.

    Inherits from HandleRetryingMixin and RetrieveAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        retrieve(request, *args, **kwargs): Retrieves a single adoption request by its ID and
         returns it as a JSON response.
    """

    queryset = Adoption.objects.all()
    serializer_class = ListAdoptionSerializer
    permission_classes = [permissions.IsAuthenticated, OwnStaffOrAdminPermission]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve Adoption Request.

        This method retrieves a single adoption request by its ID and returns it as a JSON response.

        Permissions:
        - The user must be authenticated as superuser or staff.
        - The user must be authenticated, user and the requested adoption instance are associated.

        Args:
        - request: The HTTP request object.
        - args: Additional positional arguments passed to the method.
        - kwargs: Additional keyword arguments passed to the method.

        Returns:
        - 200 OK: If the adoption request is successfully retrieved.
        - 403 Forbidden: If the user does not have permission to access this adoption request.
        - 404 Not Found: If the adoption request with the given ID does not exist.
        - 417 Expectation Failed: If there are problems with the database.
        """

        try:
            instance = self.get_object()
        except Http404:
            return Response({"message": "Adoption request not found"}, status=status.HTTP_404_NOT_FOUND)
        except CustomForbiddenException:
            return Response({"message": "You do not have access for this action"}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteAdoptionAPIView(HandleRetryingMixin, DestroyAPIView):
    """
    View for deleting an adoption request.

    Inherits from HandleRetryingMixin and DestroyAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        delete(request, *args, **kwargs): Deletes an adoption request by its ID.

    """

    queryset = Adoption.objects.all()
    permission_classes = [permissions.IsAuthenticated, OwnStaffOrAdminPermission]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def delete(self, request, *args, **kwargs):
        """
        Delete an adoption request.

        This method allows an authenticated user to delete an existing adoption request.

        Permissions:
        - The user must be authenticated as superuser or staff.
        - The user must be authenticated, user and the requested adoption instance are associated.

        Args:
        - request: The HTTP request object.
        - args: Additional positional arguments passed to the method.
        - kwargs: Additional keyword arguments passed to the method.

        Returns:
         - 200 OK: If the adoption request is successfully deleted.
         - 403 Forbidden: If the user does not have permission to delete this adoption request.
         - 404 Not Found: If the adoption request with the given ID does not exist.
         - 417 Expectation Failed: If there are problems with the database.
        """

        try:
            instance = self.get_object()
            adoption_id = instance.id
            instance.delete()
        except Http404:
            return Response({"message": "Adoption request not found"}, status=status.HTTP_404_NOT_FOUND)
        except CustomForbiddenException:
            return Response({"message": "You do not have access for this action"}, status=status.HTTP_403_FORBIDDEN)

        return Response({"message": f"Adoption request with id={adoption_id} deleted"}, status=status.HTTP_200_OK)


class EditAdoptionAPIview(HandleRetryingMixin, mixins.UpdateModelMixin, GenericAPIView):
    """
    View for updating an existing adoption request.

    Inherits from HandleRetryingMixin, mixins.UpdateModelMixin, and GenericAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        put(request, *args, **kwargs): Updates an existing adoption request by providing new data.
    """

    queryset = Adoption.objects.all()
    serializer_class = AdoptionEditSerializer
    permission_classes = [permissions.IsAuthenticated, OwnStaffOrAdminPermission]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def put(self, request, *args, **kwargs):
        """
        Update an existing Adoption request.

        This method allows updating an existing Adoption request by providing new data. You can partially update
        fields, such as "notes", "phone_number and "status".

        Permissions:
        - The user must be authenticated as superuser or staff.
        - The user must be authenticated, user and the requested adoption instance are associated.
        - Only superuser or staff can update field "status".

        Args:
            request (HttpRequest): The HTTP request object containing the updated data.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
        - 200 OK: If the request is successful and the Adoption request is updated.
        - 400 Bad Request: If the request is invalid.
        - 403 Forbidden: If the user does not have permission to update this adoption request.
        - 404 Not Found: If the Adoption request with the given ID does not exist.
        - 417 Expectation Failed: If there are problems with the database.
        """

        serializer = self.get_serializer(data=request.data, partial=True)
        user = request.user
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            field, message = (list(e.detail.keys())[0], list(e.detail.values())[0][0])
            message = f"{field}: {message}"
            return Response({"message": message}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                adoption = self.get_object()

                if "notes" in serializer.validated_data:
                    adoption.notes = serializer.validated_data.get("notes")
                if "phone_number" in serializer.validated_data:
                    adoption.phone_number = serializer.validated_data.get("phone_number")
                if "status" in serializer.validated_data:
                    if not (user.is_staff or user.is_superuser):
                        return Response(
                            {"message": "You can't change adoption request status "}, status=status.HTTP_403_FORBIDDEN
                        )
                    update_decision_date(adoption, serializer.validated_data.get("status"))
                    adoption.status = serializer.validated_data.get("status")

                adoption.save()

            except Http404:
                return Response({"message": "Adoption request not found"}, status=status.HTTP_404_NOT_FOUND)
            except CustomForbiddenException:
                return Response({"message": "You do not have access for this action"}, status=status.HTTP_403_FORBIDDEN)

        return Response({"message": "Adoption request edited"}, status=status.HTTP_200_OK)
