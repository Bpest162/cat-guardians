from rest_framework import permissions, status
from rest_framework.exceptions import PermissionDenied


class CustomUnauthorizedException(PermissionDenied):
    status_code = status.HTTP_401_UNAUTHORIZED


class CustomForbiddenException(PermissionDenied):
    status_code = status.HTTP_403_FORBIDDEN


class OwnOrAdminPermission(permissions.BasePermission):
    """
    Custom permission to allow access if:
    - The request user's ID matches the target user's ID,
    - The user is staff,
    - The user is a superuser.
    """

    def has_permission(self, request, view):
        if request.user.id == view.kwargs.get("pk"):
            return True
        if request.user.is_staff:
            return True
        if request.user.is_superuser:
            return True

        raise CustomUnauthorizedException


class OwnStaffOrAdminPermission(permissions.BasePermission):
    """
    Custom permission to allow access if:
    - The user is staff,
    - The user is a superuser.
    - The user and the requested adoption instance are associated
    """

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.is_superuser or obj.user == request.user:
            return True
        raise CustomForbiddenException
