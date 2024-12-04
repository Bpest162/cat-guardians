from rest_framework import permissions, status
from rest_framework.exceptions import ValidationError

from pets.models import CatProfile
from pets.serializers import CatProfileSerializer


class ReadOnlyOrStuffPermission(permissions.BasePermission):
    """
    Custom permission to allow access for:
    - Read-only access for non-authenticated users.
    - Full access for authenticated staff or superusers.
    """

    def has_permission(self, request, view):
        if request.user and request.user.is_authenticated:
            if request.user.is_staff or request.user.is_superuser:
                return True
        return request.method in permissions.SAFE_METHODS


class BaseCatAPIView:
    """
    BaseCatAPIView Class

    This class is a base class for API views related to CatProfile model.

    Attributes:
        - queryset: A queryset representing all the CatProfile objects.
        - serializer_class: The serializer class to be used for serializing and deserializing CatProfile objects.
        - permission_classes: A list of permission classes used to check the permissions for accessing the API views.

    """

    queryset = CatProfile.objects.all()
    serializer_class = CatProfileSerializer
    permission_classes = [ReadOnlyOrStuffPermission]


def handle_validations(serializer):
    """
    This method handles validations for a serializer.

    :param serializer: The serializer that needs to be validated.
    :return: A tuple containing a message and an HTTP status code. If validation fails, the message will be the first
             validation error encountered and the status code will be 400. Otherwise, both values will be None.
    """
    try:
        serializer.is_valid(raise_exception=True)
    except ValidationError as e:
        field, message = list(e.detail.keys())[0], list(e.detail.values())[0][0]
        message = f"{field}: {message}"
        return {"message": message}, status.HTTP_400_BAD_REQUEST
    return None, None
