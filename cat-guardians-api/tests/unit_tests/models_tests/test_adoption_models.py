import allure
import pytest
from django.core.exceptions import ValidationError

from adoption.models import Adoption

"""
Adoption tests
"""


@pytest.mark.django_db(transaction=True)
@allure.title("Test create Adoption")
def test_create_adoption(create_user, test_phone_number, create_cat):
    user = create_user()
    cat = create_cat(name="Malysh")
    phone_number = test_phone_number
    notes = "Test notes"
    adoption = Adoption.objects.create(user=user, cat=cat, phone_number=phone_number, notes=notes)

    with allure.step("Check adoption's notes"):
        allure.attach(
            "Expected response: Test notes",
            name="expected_response_adoption_notes",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.notes == notes

    with allure.step("Check adoption's phone number"):
        allure.attach(
            "Expected response: +380671111111",
            name="expected_response_adoption_phone_number",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.phone_number == phone_number

    with allure.step("Check adoption's user"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_adoption_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.user == user

    with allure.step("Check adoption's cat"):
        allure.attach(
            "Expected response: Malysh",
            name="expected_response_adoption_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.cat == cat

    with allure.step("Check adoption's status"):
        allure.attach(
            "Expected response: pending",
            name="expected_response_adoption_status",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.status == "pending"

    with allure.step("Check adoption's request date"):
        allure.attach(
            "Expected response: True",
            name="expected_response_adoption_request_date",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.request_date is not None


@pytest.mark.django_db(transaction=True)
@allure.title("Test invalid phone number")
def test_invalid_phone_number(create_user, test_phone_number_invalid, sample_cat_breed, sample_cat_color, create_cat):
    user = create_user()
    cat = create_cat()
    phone_number = test_phone_number_invalid
    notes = "Test notes"
    adoption = Adoption.objects.create(user=user, cat=cat, phone_number=phone_number, notes=notes)

    with allure.step("Check invalid phone number"):
        allure.attach(
            "Expected response: Invalid phone number",
            name="expected_response_invalid_phone_number",
            attachment_type=allure.attachment_type.TEXT,
        )
        with pytest.raises(ValidationError):
            adoption.full_clean()
