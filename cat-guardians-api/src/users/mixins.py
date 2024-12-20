from django.core.exceptions import ValidationError
from rest_framework import exceptions as rest_exceptions

from users.models import CustomUser


def get_error_message(exc):
    """
    Returns an error message based on the given exception object.

    Parameters:
        exc (Exception): The exception object.

    Returns:
        str: The error message.

    """
    if hasattr(exc, "message"):
        return exc.message
    if hasattr(exc, "args") and exc.args:
        return exc.args[0]

    return "An unknown error has occurred"


class PublicApiMixin:
    authentication_classes = ()
    permission_classes = ()


class ApiErrorsMixin:
    """
    Mixin that transforms Django and Python exceptions into rest_framework  ones.
    Without the mixin, they return 500 status code which is not desired.
    """

    expected_exceptions = {
        ValueError: rest_exceptions.ValidationError,
        ValidationError: rest_exceptions.ValidationError,
        PermissionError: rest_exceptions.PermissionDenied,
        CustomUser.DoesNotExist: rest_exceptions.NotAuthenticated,
    }

    def handle_exception(self, exc):
        if isinstance(exc, tuple(self.expected_exceptions.keys())):
            drf_exception_class = self.expected_exceptions[exc.__class__]
            drf_exception = drf_exception_class(get_error_message(exc))

            return super().handle_exception(drf_exception)
        return super().handle_exception(exc)
