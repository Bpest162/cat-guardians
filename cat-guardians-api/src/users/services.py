from datetime import datetime, timedelta, timezone

from django.conf import settings
from itsdangerous import BadSignature, URLSafeSerializer

from .models import CustomUser


class SignedDataHandler:
    """SignedDataHandler is a utility class to handle the creation and retrieval of signed data using
    URLSafeSerializer from the `itsdangerous` library.

    This class can be used to serialize and sign data into a URL safe format and then retrieve and validate
    the data from the signed format.

    Attributes:
        salt (str): An optional salt string that will be used while signing the data.
        serializer (URLSafeSerializer): An instance of URLSafeSerializer initialized with a secret key and
         the optional salt.

    Methods:
        create_signed_data: Serializes and signs a dictionary of data and returns it as a URL safe string.
        get_signed_data: Retrieves signed data from a signed string, validates the signature and returns the original
         dictionary. If signature validation fails, returns None.
    """

    def __init__(self, salt=None):
        """
        Initialize the SignedDataHandler.

        Args:
            salt (str, optional): An optional salt string. Defaults to None.
        """
        self.salt = salt
        self.serializer = URLSafeSerializer(settings.SECRET_KEY, salt=self.salt)

    def create_signed_data(self, **kwargs):
        """
        Serialize and sign data into a URL safe format.

        Args:
            **kwargs: Arbitrary keyword arguments to be serialized.

        Returns:
            str: A URL safe string containing the serialized and signed data.
        """
        return self.serializer.dumps(kwargs, salt=self.salt)

    def get_signed_data(self, signed_data):
        """
        Retrieve signed data and validate the signature.

        Args:
            signed_data (str): The URL safe string containing the signed data.

        Returns:
            dict or None: The original dictionary of data if the signature is valid, else None.
        """
        try:
            return self.serializer.loads(signed_data, salt=self.salt)
        except BadSignature:
            return


def _get_user_data_from_request(data: dict) -> (CustomUser, bool):
    """Extracts the user and "remember me" preference from the request data.

        This function extracts "email", "password" and "remember me" fields from the given data.
        It then tries to retrieve a user with the given email from the database.
        If a user is found and their password matches the given one, then the function returns that user
        and the "remember me" preference. If not, None is returned for both the user and the preference.

    Args:
        data (dict): The request data.

    Returns:
        (CustomUser, bool): The user and remember me flag.
    """
    email = data["email"]
    password = data["password"]
    remember_me = data.get("rememberMe", False)

    try:
        user = CustomUser.objects.get(email__iexact=email)
    except CustomUser.DoesNotExist:
        return None, None

    if not user.check_password(password):
        return None, None

    return user, remember_me


def _get_sessions_expiration_times(remember_me: bool) -> (datetime, datetime):
    """Determines the session expiration time and the cookie expiration time based on the "remember me" preference.

    If "remember me" is True, the session and cookie expiration times will be set to the current time plus
    the SESSION_EXPIRATION_DAYS setting. If it is False, the session expiration time is set to 0 and the cookie
    expiration time is set to None, which    indicates that the cookie will expire when the user's browser is closed.

    Args:
        remember_me (bool): The "remember me" preference.

    Returns:
        (datetime, datetime): The session and cookie expiration times.
    """
    if remember_me:
        session_expiration = timedelta(days=settings.SESSION_EXPIRATION_DAYS)
        session_expiration_time = cookie_expiration_time = datetime.now(timezone.utc) + session_expiration
    else:
        session_expiration_time = 0
        cookie_expiration_time = None
    return session_expiration_time, cookie_expiration_time


def _get_signed_cookie(user_id: int) -> str:
    """Creates a signed cookie for the given user.

    Args:
        user_id (int): The user ID.

    Returns:
        str: The signed cookie.
    """
    key = settings.SIGNED_COOKIE_USER_KEY
    cookie_handler = SignedDataHandler()
    return cookie_handler.create_signed_data(**{key: user_id})
