from django.conf import settings
from django.http import Http404
from rest_framework import filters, status, mixins
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from retrying import retry

from core.logger import LogWrapper
from utils.mixins import HandleRetryingMixin, ListMixin
from utils.retrying_conf import retry_if_expectation_failed

from .models import FoundCat
from .serializers import FormCreateSerializer, FormListSerializer, FormEditSerializer

logger = LogWrapper.FOUND


class FormCreateAPIView(HandleRetryingMixin, CreateAPIView):
    """
    View for creating a new found cat form.

    Inherits from HandleRetryingMixin and CreateAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for validation and serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        post(request, *args, **kwargs): Handles POST requests to create a new found cat form.
    """

    queryset = FoundCat.objects.all()
    serializer_class = FormCreateSerializer
    permission_classes = [IsAuthenticated]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def post(self, request, *args, **kwargs):
        """
        Handles POST requests to create a new found cat form.

        Args:
            request (Request): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response containing the result of the form creation process.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            obj = serializer.save(user=self.request.user, photo=request.data.get("photo"))
            return Response({"Found form was created": f"{str(obj)}"}, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            field, message = (list(e.detail.keys())[0], list(e.detail.values())[0][0])
            message = f"{field}: {message}"
            status_code = status.HTTP_400_BAD_REQUEST
            return Response({"message": message}, status=status_code)


class FormListAPIView(ListMixin, ListAPIView):
    """
    View for listing found cat forms.

    Inherits from ListMixin and ListAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.
        filter_backends (list): The list of filter backends used for filtering the queryset.
        search_fields (list): The list of fields used for searching in the queryset.
        ordering_fields (list): The list of fields used for ordering the queryset.

    Note:
        The queryset is optimized to select related "user" objects.

    """

    queryset = FoundCat.objects.all().select_related("user")
    serializer_class = FormListSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["status"]
    ordering_fields = ["created_at"]


class FormDetailAPIView(RetrieveAPIView):
    """
    View for retrieving details of a found cat form.

    Inherits from RetrieveAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        retrieve(request, *args, **kwargs): Retrieves details of a found cat form.

    """

    queryset = FoundCat.objects.all().select_related("user")
    serializer_class = FormListSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieves details of a found cat form.

        Args:
            request (Request): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response containing the details of the found cat form.
                     If the form does not exist, returns an HTTP 404 error response.
        """
        try:
            form = self.get_object()
        except Http404:
            return Response({"message": "Found form does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(form)
        return Response(serializer.data, status.HTTP_200_OK)


class FormDeleteAPIView(HandleRetryingMixin, DestroyAPIView):
    """
    View for deleting a found cat form.

    Inherits from HandleRetryingMixin and DestroyAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        delete(request, *args, **kwargs): Handles DELETE requests to delete a found cat form.

    """

    queryset = FoundCat.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def delete(self, request, *args, **kwargs):
        """
        Handles DELETE requests to delete a found cat form.

        Args:
            request (Request): The HTTP request object.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
            Response: The HTTP response indicating the result of the deletion operation.
                     If the form is successfully deleted, returns an HTTP 200 OK response.
                     If the form does not exist, returns an HTTP 404 error response.
        """
        try:
            form = self.get_object()
            self.perform_destroy(form)
            return Response({"message": "Found form was deleted"}, status=status.HTTP_200_OK)
        except Http404:
            return Response({"message": "Found form does not exist"}, status=status.HTTP_404_NOT_FOUND)


class FormEditAPIview(HandleRetryingMixin, mixins.UpdateModelMixin, GenericAPIView):
    """
    View for updating an existing found form request.

    Inherits from HandleRetryingMixin, mixins.UpdateModelMixin, and GenericAPIView.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    Methods:
        put(request, *args, **kwargs): Updates an existing found form request by providing new data.
    """

    queryset = FoundCat.objects.all()
    serializer_class = FormEditSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def put(self, request, *args, **kwargs):
        """
        Update an existing Found Form request.

        This method allows updating an existing Found Form request by providing new data. You can partially update
        fields, such as "status".

        Permissions:
        - The user must be authenticated as superuser or admin.

        Args:
            request (HttpRequest): The HTTP request object containing the updated data.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.

        Returns:
        - 200 OK: If the request is successful and the Found Form request is updated.
        - 400 Bad Request: If the request is invalid.
        - 403 Forbidden: If the user does not have permission to update this Found Form request.
        - 404 Not Found: If the Found FOrm request with the given ID does not exist.
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
                found_form = self.get_object()

                if "status" in serializer.validated_data:
                    if not (user.is_staff or user.is_superuser):
                        return Response(
                            {"message": "You can't change Found Form request status "}, status=status.HTTP_403_FORBIDDEN
                        )
                    found_form.status = serializer.validated_data.get("status")

                found_form.save()

            except Http404:
                return Response({"message": "Found Form request not found"}, status=status.HTTP_404_NOT_FOUND)
            except PermissionDenied:
                return Response({"message": "You do not have access for this action"}, status=status.HTTP_403_FORBIDDEN)

        return Response({"message": "Found Form request edited"}, status=status.HTTP_200_OK)
