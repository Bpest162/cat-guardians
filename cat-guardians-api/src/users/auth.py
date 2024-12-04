from django.conf import settings
from rest_framework.authentication import BaseAuthentication

from users.services import SignedDataHandler

from .models import CustomUser


class CustomAuthentication(BaseAuthentication):
    """
    Custom Authentication Class.

    This authentication class extends the Django REST Framework's BaseAuthentication
    and provides a custom authentication mechanism based on a signed user cookie.
    """

    def authenticate(self, request):
        """
        Steps:
        1. Check for the presence of 'user_cookie' in the request's COOKIES.
        2. Validate the 'user_cookie' using the `get_data_from_signed_cookie` function.
        3. If validation is successful and the 'userID' is present in the cookie data,
           retrieve the associated user id from the database.
        4. Return the authenticated user object or None if object doesn't exist.
        """
        if settings.SIGNED_COOKIE_NAME not in request.COOKIES:
            return None, None

        cookie_handler = SignedDataHandler()
        signed_cookie = request.COOKIES.get(settings.SIGNED_COOKIE_NAME)

        if (data := cookie_handler.get_signed_data(signed_cookie)) is None:
            return None, None

        if settings.SIGNED_COOKIE_USER_KEY not in data:
            return None, None

        try:
            user = CustomUser.objects.get(id=data[settings.SIGNED_COOKIE_USER_KEY])
            return user, None
        except CustomUser.DoesNotExist:
            return None, None
