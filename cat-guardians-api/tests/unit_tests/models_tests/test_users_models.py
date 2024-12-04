import allure
import pytest
from django.db import IntegrityError
from django.forms import forms

from users.models import CustomUser

"""
CustomUser tests
"""


@pytest.mark.django_db(transaction=True)
@allure.title("Test create CustomUser")
def test_create_custom_user(test_password):
    user = CustomUser.objects.create(email="test_create@example.com", password=test_password)
    with allure.step("Check user's email"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_user_email",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.email == "test_create@example.com"

    with allure.step("Check user's username"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_user_username",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.username == "test_create@example.com"
    with allure.step("Check user's fullname"):
        allure.attach(
            "Expected response: ''",
            name="expected_response_user_fullname",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.full_name == ""
    with allure.step("Check user's .str() method"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_user_str_method",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert str(user) == "test_create@example.com"


@pytest.mark.django_db(transaction=True)
@allure.title("Test set full name")
def test_set_full_name(test_password):
    user = CustomUser.objects.create(email="test_fullname@example.com", password=test_password)
    user.full_name = "Name Lastname"
    with allure.step("Check user's first name"):
        allure.attach(
            "Expected response: Name",
            name="expected_response_user_first_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.first_name == "Name"
    with allure.step("Check user's last name"):
        allure.attach(
            "Expected response: Lastname",
            name="expected_response_user_last_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.last_name == "Lastname"
    with allure.step("Check user's full name"):
        allure.attach(
            "Expected response: Name Lastname",
            name="expected_response_user_full_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.full_name == "Name Lastname"


@pytest.mark.django_db(transaction=True)
@allure.title("Test set fullname empty")
def test_set_full_name_empty(test_password):
    user = CustomUser.objects.create(email="test_fullname_empty@example.com", password=test_password)
    with allure.step("Check user's empty full name"):
        allure.attach(
            "Expected response: ValueError",
            name="expected_response_user_raises_value_error",
            attachment_type=allure.attachment_type.TEXT,
        )
        with pytest.raises(ValueError):
            user.full_name = ""


@pytest.mark.django_db(transaction=True)
@allure.title("Test create CustomUser duplicate email")
def test_create_custom_user_duplicate_email(test_password):
    CustomUser.objects.create(email="test_duplicate_email@example.com", password=test_password)
    with allure.step("Check user create duplicate email"):
        allure.attach(
            "Expected response: IntegrityError",
            name="expected_response_user_raises_exception",
            attachment_type=allure.attachment_type.TEXT,
        )
        with pytest.raises(IntegrityError):
            CustomUser.objects.create(email="test_duplicate_email@example.com", password=test_password)


@pytest.mark.django_db(transaction=True)
@allure.title("Test create CustomUser with invalid email")
def test_create_custom_user_invalid_email(test_password):
    with allure.step("Check user create with invalid email"):
        allure.attach(
            "Expected response: forms.ValidationError",
            name="expected_response_user_raises_validation_error",
            attachment_type=allure.attachment_type.TEXT,
        )
        with pytest.raises(forms.ValidationError):
            user = CustomUser.objects.create(email="invalid_email", password=test_password)
            user.full_clean()


@pytest.mark.django_db(transaction=True)
@allure.title("Test change CustomUser email")
def test_change_custom_user_email(test_password):
    user = CustomUser.objects.create(email="old_email@example.com", password=test_password)
    with allure.step("Check user created email"):
        allure.attach(
            "Expected response: old_email@example.com",
            name="expected_response_user_created_email",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.email == "old_email@example.com"

    user.email = "new_email@example.com"
    user.save()
    with allure.step("Check user email was changed"):
        allure.attach(
            "Expected response: new_email@example.com",
            name="expected_response_user_email_changed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.email == "new_email@example.com"
    with allure.step("Check user username after email was changed"):
        allure.attach(
            "Expected response: new_email@example.com",
            name="expected_response_user_username_changed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.username == "new_email@example.com"


@pytest.mark.django_db(transaction=True)
@allure.title("Test CustomUser triple word full name")
def test_custom_user_triple_word_fullname(test_password):
    user = CustomUser.objects.create(email="triple_word_fullname@example.com", password=test_password)
    user.full_name = "First_word Second_word Third_word"
    user.save()

    with allure.step("Check user first name"):
        allure.attach(
            "Expected response: First_word Second_word",
            name="expected_response_user_first_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.first_name == "First_word Second_word"
    with allure.step("Check user last name"):
        allure.attach(
            "Expected response: Third_word",
            name="expected_response_user_last_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert user.last_name == "Third_word"


""""""
