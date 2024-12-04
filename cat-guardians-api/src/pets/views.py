import logging
from urllib import request
from django.conf import settings
from django.db import DatabaseError
from django.http import Http404
from django_filters import rest_framework as django_filters
from rest_framework import filters, status, viewsets, serializers
from rest_framework.generics import CreateAPIView, DestroyAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError, PermissionDenied
from django.core.exceptions import ObjectDoesNotExist
from retrying import retry

from core.logger import LogWrapper
from utils.mixins import HandleRetryingMixin, ListMixin
from utils.retrying_conf import retry_if_expectation_failed

from .filters import CatProfileFilter
from .models import CatBreed, CatColor, CatProfile, CatPhoto
from .serializers import CatBreedSerializer, CatColorSerializer
from .utils import BaseCatAPIView, ReadOnlyOrStuffPermission, handle_validations

logger = LogWrapper.PETS


class CatListAPIView(BaseCatAPIView, ListMixin, ListAPIView):
    """
    View for listing cats.

    Inherits from BaseCatAPIView, ListMixin, and ListAPIView.

    Attributes:
        filter_backends (list): The list of filter backends used for filtering the queryset.
        filterset_class (FilterSet): The filterset class used for filtering the queryset.
        search_fields (list): The list of fields used for searching in the queryset.
        ordering_fields (list): The list of fields used for ordering the queryset.

    """

    queryset = CatProfile.objects.select_related("color", "breed").prefetch_related("photos", "likes")
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, django_filters.DjangoFilterBackend]
    filterset_class = CatProfileFilter
    search_fields = ["name", "gender", "color__name", "breed__name"]
    ordering_fields = "__all__"


class CatDetailAPIView(BaseCatAPIView, RetrieveAPIView):
    pass


class CaseInsensitiveSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().get(**{self.slug_field + "__iexact": data})
        except ObjectDoesNotExist:
            self.fail("does_not_exist", slug_name=self.slug_field, value=str(data))
        except (TypeError, ValueError):
            self.fail("invalid")


class CatCreateAPIView(HandleRetryingMixin, BaseCatAPIView, CreateAPIView):
    """Create cat profile.

    This method allows you to create a cat profile.

    Args:
        request (HttpRequest): The Django request object.
        *args: Variable length argument list.
        **kwargs: Arbitrary keyword arguments.

    Returns:
        Response: A HTTP Response with a success message and status code.
    """

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def create(self, request, *args, **kwargs):
        fields = ["name", "gender", "birth_date", "bio", "requirements_for_owner", "preferences", "aversions"]
        cat_data = {}
        color = CaseInsensitiveSlugRelatedField(slug_field="name", queryset=CatColor.objects.all(), allow_null=True)
        breed = CaseInsensitiveSlugRelatedField(slug_field="name", queryset=CatBreed.objects.all(), allow_null=True)


        photos = request.FILES.getlist('photos')
        if len(photos) == 0:
            return Response({'error': f'`photos` are required'}, status=status.HTTP_400_BAD_REQUEST)


        cat_data["color"] = color.to_internal_value(data=request.data.get("color"))
        cat_data["breed"] = breed.to_internal_value(data=request.data.get("breed"))

        for field_name in fields:
            current_field_value = request.data.get(field_name)
            if current_field_value is None:
                return Response({'error': f'Field {field_name} is required'}, status=status.HTTP_400_BAD_REQUEST)
            cat_data[field_name] = current_field_value


        cat_profile = CatProfile.objects.create(**cat_data)

        for photo in photos:
            CatPhoto.objects.create(cat=cat_profile, photo=photo)


        return Response({"Cat was successfully created": f"{cat_profile.id}"}, status=status.HTTP_201_CREATED)


class CatDeleteAPIView(HandleRetryingMixin, BaseCatAPIView, DestroyAPIView):
    """
    Delete a cat.
    This method allows an admit or stuff user to delete any cat.

    Args:
    - request (Request): The HTTP DELETE request object.
    - pk (int): The identifier of the cat to be deleted.

    Returns:
    - Response: An HTTP response indicating the result of the user deletion.

    Response Status Codes:
    - 200 OK: The cat was successfully deleted.
    - 401 Permission denied: Non-admin user attempting to delete someone else's profile
    - 403 Forbidden: Access denied to the resource.
    - 404 Not Found: The specified user was not found.
    - 417 Expectation Failed: Cat deletion failed.

    Example Usage:
    ```
    DELETE /api/pets/delete/1/
    ```
    Delete the cat with identifier 1.
    """

    queryset = CatProfile.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def delete(self, request, *args, **kwargs):
        logger.info("Processing request with pk: ", args, kwargs)
        print("Processing request with pk: ", args, kwargs)
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": f"Cat was deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Http404:
            print("Something not found ")
            logger.warn("Something not found")
            return Response({"message": "Cat not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            logger.error(f"Something went wrong: {e}")
            print("Something went wrong: ", e)
            return Response({"error": f"Got error while processing: {e}"})

class CatUpdateAPIView(HandleRetryingMixin, BaseCatAPIView, UpdateAPIView):
    """Update cat details.

    This method allows you to update all cat data.

    Args:
        request (HttpRequest): The Django request object.
        *args: Variable length argument list.
        **kwargs: Arbitrary keyword arguments.

    Returns:
        Response: A HTTP Response with a success message and status code.
    """

    http_method_names = ["put"]

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def put(self, request, pk):
        try:
            cat_instance = self.get_object()
        except Http404:
            return Response({"message": "Cat not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(cat_instance, data=request.data, partial=True)
        error_response, error_status_code = handle_validations(serializer)
        if error_response:
            return Response(error_response, status=error_status_code)

        self.perform_update(serializer)

        # updating photos
        photos = request.FILES.getlist('photos')
        if photos:
            for photo in photos:
                CatPhoto.objects.create(cat=cat_instance, photo=photo)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CatColorViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing cat colors.

    Inherits from viewsets.ModelViewSet.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    """

    queryset = CatColor.objects.all()
    serializer_class = CatColorSerializer
    permission_classes = [ReadOnlyOrStuffPermission]


class CatBreedViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing cat breeds.

    Inherits from viewsets.ModelViewSet.

    Attributes:
        queryset (QuerySet): The queryset used by the view to retrieve objects.
        serializer_class (Serializer): The serializer class used for serialization.
        permission_classes (list): The list of permission classes applied to the view.

    """

    queryset = CatBreed.objects.all()
    serializer_class = CatBreedSerializer
    permission_classes = [ReadOnlyOrStuffPermission]


class CatAddRemoveLike(APIView):
    """
    View for adding/removing a like to a cat profile:

        POST: Adds a like to a cat profile. Returns True if the like was added, False otherwise.
        DELETE: Removes a like from a cat profile. Returns True if the like was removed, False otherwise.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            cat = CatProfile.objects.get(pk=pk)
        except CatProfile.DoesNotExist:
            return Response({"message": f"Cat with id {pk} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        if cat.add_like(user):
            return Response({"message": True}, status=status.HTTP_200_OK)
        return Response({"message": False}, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            cat = CatProfile.objects.get(pk=pk)
        except CatProfile.DoesNotExist:
            return Response({"message": f"Cat with id {pk} does not exist"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        if cat.remove_like(user):
            return Response({"message": True}, status=status.HTTP_200_OK)
        return Response({"message": False}, status=status.HTTP_200_OK)
