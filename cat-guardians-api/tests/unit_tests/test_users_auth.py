from unittest.mock import Mock

import allure
import pytest
from django.conf import settings
from django.contrib.auth import get_user_model

from users.auth import CustomAuthentication
from users.services import SignedDataHandler

# Assuming CustomUser is your custom user model
CustomUser = get_user_model()


@pytest.fixture
def mock_request():
    request = Mock()
    request.COOKIES = {}
    return request


@pytest.fixture
def mock_signed_data_handler():
    return Mock()


@allure.title("Test No Cookie Authentication Fails")
def test_authenticate_no_cookie(mock_request, mock_signed_data_handler):
    auth = CustomAuthentication()
    user, _ = auth.authenticate(mock_request)
    assert user is None


@allure.title("Test Invalid Cookie Authentication Fails")
def test_authenticate_invalid_cookie(mock_request, mock_signed_data_handler):
    mock_request.COOKIES[settings.SIGNED_COOKIE_NAME] = "invalid_cookie"
    mock_signed_data_handler.get_signed_data.return_value = None

    auth = CustomAuthentication()
    user, _ = auth.authenticate(mock_request)
    assert user is None


@allure.title("Test No User Id Cookie Authentication Fails")
def test_authenticate_no_user_id(mock_request, mock_signed_data_handler):
    mock_request.COOKIES[settings.SIGNED_COOKIE_NAME] = "valid_cookie"
    mock_signed_data_handler.get_signed_data.return_value = {}

    auth = CustomAuthentication()
    user, _ = auth.authenticate(mock_request)
    assert user is None


@allure.title("Test User Not Found Authentication Fails")
def test_authenticate_user_not_found(mock_request, mock_signed_data_handler):
    mock_request.COOKIES[settings.SIGNED_COOKIE_NAME] = "valid_cookie"
    mock_signed_data_handler.get_signed_data.return_value = {settings.SIGNED_COOKIE_USER_KEY: 123}

    CustomUser.objects.get = Mock(side_effect=CustomUser.DoesNotExist)

    auth = CustomAuthentication()
    user, _ = auth.authenticate(mock_request)
    assert user is None


@allure.title("Test Cookie Authentication Succeeds")
def test_authenticate_successful(mock_request, mock_signed_data_handler):
    with allure.step("Signing cookie with user's id"):
        signed_data_handler = SignedDataHandler()
        kwargs = {"id": "1"}
        signed_data = signed_data_handler.create_signed_data(**kwargs)
        settings.SIGNED_COOKIE_USER_KEY = "id"
        mock_request.COOKIES[settings.SIGNED_COOKIE_NAME] = signed_data
    with allure.step("Mocking user"):
        mock_signed_data_handler.get_signed_data.return_value = {settings.SIGNED_COOKIE_USER_KEY: kwargs["id"]}
        mock_user = Mock()
        CustomUser.objects.get = Mock(return_value=mock_user)
    with allure.step("Running authentication"):
        auth = CustomAuthentication()
        user, _ = auth.authenticate(mock_request)
    assert user == mock_user
