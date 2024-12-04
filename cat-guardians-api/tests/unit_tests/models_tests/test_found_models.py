import allure
import pytest
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile

from found_form.models import FoundCat

"""
Found form tests
"""


@pytest.mark.django_db(transaction=True)
@allure.title("Test create FoundForm")
def test_create_form_without_photo(create_user, test_phone_number):
    user = create_user()
    phone_number = test_phone_number
    address = "test_address 123"
    description = "test_description"
    form = FoundCat.objects.create(user=user, phone_number=phone_number, address=address, description=description)

    with allure.step("Check form's description"):
        allure.attach(
            "Expected response: test_description",
            name="expected_response_form_description",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.description == description

    with allure.step("Check form's phone number"):
        allure.attach(
            "Expected response: +380671111111",
            name="expected_response_form_phone_number",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.phone_number == phone_number

    with allure.step("Check form's user"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_form_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.user == user

    with allure.step("Check form's address"):
        allure.attach(
            "Expected response: test_address 123",
            name="expected_response_form_address",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.address == address

    with allure.step("Check form's status"):
        allure.attach(
            "Expected response: NW",
            name="expected_response_form_status",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.status == "NW"

    with allure.step("Check adoption's created_at"):
        allure.attach(
            "Expected response: True",
            name="expected_response_form_created_at",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert form.created_at is not None


@pytest.mark.django_db(transaction=True)
@allure.title("Test upload photo for FoundForm")
def test_upload_photo_for_found_cat(image_file, create_user, test_phone_number):
    user = create_user()
    phone_number = test_phone_number
    address = "test_address 123"
    description = "test_description"

    # Open the test image file
    image_data = image_file.read()

    # Create an in-memory uploaded file
    uploaded_file = SimpleUploadedFile(name="test_cat.jpeg", content=image_data, content_type="image/jpeg")

    found_cat = FoundCat.objects.create(
        user=user, phone_number=phone_number, address=address, description=description, photo=uploaded_file
    )

    with allure.step("Check form's photo"):
        allure.attach(
            "Expected response: True",
            name="expected_response_form_photo",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert found_cat.photo is not None

    with allure.step("Check form's photo path"):
        allure.attach(
            f"Expected response: {settings.FOUND_CAT_PHOTO}/1/",
            name="expected_response_form_photo_path",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert found_cat.photo.name.startswith(f"{settings.FOUND_CAT_PHOTO}/{found_cat.id}/")
