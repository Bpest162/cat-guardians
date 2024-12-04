import allure
import pytest
from django.core.exceptions import PermissionDenied
from django.core.exceptions import ValidationError as DjangoValidationError

from api.settings import GOOGLE_USER_INFO_URL, REQUEST_TIMEOUT
from users.utils import custom_exception_handler, google_get_access_token, google_get_user_info


@allure.title("Test Custom Exception Handler Adds Details To Response")
def test_custom_handler_adds_details_to_response(mocker):
    with allure.step("Mocking exception's detail field"):
        message = "Details of this exception"
        mocker.patch.object(PermissionDenied, "detail", message, create=True)
        exc = PermissionDenied("Something went wrong")
        context = mocker.Mock()

    response = custom_exception_handler(exc, context)
    print(response.data["detail"])
    assert "detail" in response.data and response.data["detail"] == "У вас нема дозволу робити цю дію."


def test_google_get_access_token_success(mocker):
    with allure.step("Mocking Google API requests"):
        mock_post = mocker.patch("requests.post")
        mock_post.return_value.ok = True
        mock_post.return_value.json.return_value = {"access_token": "dummy_access_token"}

    access_token = google_get_access_token(code="dummy_code", redirect_uri="dummy_redirect_uri")

    assert access_token == "dummy_access_token"
    mock_post.assert_called_once()


def test_google_get_access_token_failure(mocker):
    # Mock the response from requests.post
    with allure.step("Mocking Google API requests"):
        mock_post = mocker.patch("requests.post")
        mock_post.return_value.ok = False

    # Call the function and expect it to raise a ValidationError
    with pytest.raises(DjangoValidationError):
        google_get_access_token(code="dummy_code", redirect_uri="dummy_redirect_uri")


def test_google_get_user_info_success(mocker):
    # Mock the response from requests.get
    with allure.step("Mocking Google API requests"):
        mock_get = mocker.patch("requests.get")
        mock_get.return_value.ok = True
        mock_get.return_value.json.return_value = {"email": "test@example.com", "name": "Test User"}

    # Call the function with mock data
    user_info = google_get_user_info(access_token="dummy_access_token")

    # Assertions
    assert user_info == {"email": "test@example.com", "name": "Test User"}
    mock_get.assert_called_once_with(
        GOOGLE_USER_INFO_URL, params={"access_token": "dummy_access_token"}, timeout=REQUEST_TIMEOUT
    )


def test_google_get_user_info_failure(mocker):
    with allure.step("Mocking Google API requests"):
        # Mock the response from requests.get
        mock_get = mocker.patch("requests.get")
        mock_get.return_value.ok = False

    # Call the function and expect it to raise a ValidationError
    with pytest.raises(DjangoValidationError):
        google_get_user_info(access_token="dummy_access_token")
