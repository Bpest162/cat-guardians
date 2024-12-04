import allure
import pytest
from django.urls import reverse
from rest_framework import status

from found_form.models import FoundCat


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Found Form Success")
def test_create_found_form_success(create_user, test_phone_number, api_client, auto_login_user, test_address):
    url = reverse("form_create")
    phone_number = test_phone_number
    address = test_address
    description = "some random description"
    data = {"address": address, "phone_number": phone_number, "description": description}

    response = api_client.post(url, data, format="json")
    with allure.step("Check response for unauthenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code_unauthenticated_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    user = create_user()
    api_client, user = auto_login_user(user=user)
    response = api_client.post(url, data=data, format="json")

    with allure.step("Check response for authenticated user"):
        allure.attach(
            "Expected status code: 201",
            name="expected_status_code_authenticated_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert FoundCat.objects.filter(address=address, phone_number=phone_number, user=user).exists()

        form = FoundCat.objects.get(address=address, phone_number=phone_number, user=user)
        assert form.user == user


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Found Form ValidationError")
def test_create_found_form_invalid(
    create_user, auto_login_user, api_client, test_phone_number, test_address, test_phone_number_invalid
):
    url = reverse("form_create")
    phone_number = test_phone_number
    phone_number_invalid = test_phone_number_invalid
    address = test_address

    data = {"phone_number": phone_number}

    user = create_user()
    api_client, user = auto_login_user(user=user)
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status with no address"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code_no_address",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    data = {"address": address, "phone": phone_number_invalid}
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status with invalid phone number"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code_invalid_phone_number",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    data = {"address": address}
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status with no phone number"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code_no_phone_number",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Found Form Failed")
def test_create_found_form_fail(
    api_client, create_user, auto_login_user, test_phone_number, test_address, mock_create_found_form_fail
):
    url = reverse("form_create")
    phone_number = test_phone_number
    address = test_address

    data = {"phone_number": phone_number, "address": address}

    user = create_user()
    api_client, user = auto_login_user(user=user)
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status when expectation failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code_when_expectation_failed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED
        assert response.data["message"] == "Database is not available"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form List Forbidden")
def test_list_found_form_forbidden(create_user, auto_login_user, fill_found_forms):
    url = reverse("form_list")
    user = create_user()
    api_client, user = auto_login_user(user=user)
    fill_found_forms()

    response = api_client.get(url)

    with allure.step("Check response permission forbidden"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code_permission_forbidden",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form List Allowed")
def test_list_found_form_allowed(create_user, auto_login_user, fill_found_forms):
    url = reverse("form_list")
    user = create_user()
    api_client, user = auto_login_user(user=user)
    fill_found_forms()

    user.is_staff = True
    user.save()

    response = api_client.get(url)

    with allure.step("Check response permission allowed"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code_permission_allowed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2
        assert len(response.data["data"]) == 5
        assert response.data["pages"] == 1


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form List Filters")
def test_list_found_form_filters(create_user, api_client, auto_login_user, create_found_form):
    url = reverse("form_list")
    user = create_user()
    api_client, user = auto_login_user(user=user)

    create_found_form(description="Created 1st")
    create_found_form(description="Created 2nd", status="CP")
    create_found_form(description="Created 3rd")

    user.is_staff = True
    user.save()

    response = api_client.get(url, {"ordering": "created_at"})
    with allure.step("Check created_at ordering asc"):
        allure.attach(
            "Expected data sorted by created_at asc",
            name="expected_data_sorted_by_created_at_asc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["description"] == "Created 1st"
        assert response.data["data"][2]["description"] == "Created 3rd"

    response = api_client.get(url, {"ordering": "-created_at"})
    with allure.step("Check created_at ordering desc"):
        allure.attach(
            "Expected data sorted by created_at desc",
            name="expected_data_sorted_by_created_at_desc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["description"] == "Created 3rd"
        assert response.data["data"][2]["description"] == "Created 1st"

    response = api_client.get(url, {"search": "NW"})
    with allure.step("Check search status NW"):
        allure.attach(
            "Expected data has status NW",
            name="expected_data_has_status_NW",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert len(response.data["data"]) == 2

    response = api_client.get(url, {"search": "CP"})
    with allure.step("Check search status CP"):
        allure.attach(
            "Expected data has status CP",
            name="expected_data_has_status_CP",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert len(response.data["data"]) == 1
        assert response.data["data"][0]["description"] == "Created 2nd"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Detail Forbidden")
def test_detail_found_form_forbidden(create_user, api_client, auto_login_user, create_found_form):
    instance = create_found_form()
    url = reverse("form_detail", kwargs={"pk": instance.pk})
    user = create_user()
    api_client, user = auto_login_user(user=user)

    response = api_client.get(url)
    with allure.step("Check response permission forbidden"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code_permission_forbidden",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Detail Allowed")
def test_detail_found_form_allowed(create_user, api_client, auto_login_user, create_found_form):
    instance = create_found_form()
    url = reverse("form_detail", kwargs={"pk": instance.pk})
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)

    response = api_client.get(url)
    with allure.step("Check response with permission allowed"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code_permission_allowed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["phone_number"] == instance.phone_number
        assert response.data["address"] == instance.address


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Detail Not Found")
def test_detail_found_form_not_found(create_user, api_client, auto_login_user):
    url = reverse("form_detail", kwargs={"pk": 1})
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)

    response = api_client.get(url)
    with allure.step("Check response for not found"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code_not_found",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Delete Forbidden")
def test_delete_found_form_forbidden(create_user, api_client, auto_login_user, create_found_form):
    instance = create_found_form()
    url = reverse("form_delete", kwargs={"pk": instance.pk})
    user = create_user()
    api_client, user = auto_login_user(user=user)

    response = api_client.delete(url)
    with allure.step("Check response permission forbidden"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code_permission_forbidden",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Delete Success")
def test_delete_found_form_success(create_user, api_client, auto_login_user, create_found_form):
    instance = create_found_form()
    url = reverse("form_delete", kwargs={"pk": instance.pk})
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)

    response = api_client.delete(url)
    with allure.step("Check response delete found form success"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code_delete_success",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["message"] == "Found form was deleted"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Found Form Delete Not Found")
def test_delete_found_form_not_found(create_user, api_client, auto_login_user):
    url = reverse("form_delete", kwargs={"pk": 1})
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)

    response = api_client.delete(url)
    with allure.step("Check response delete found form not found"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code_not_found",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Delete Found Form Failed")
def test_delete_found_form_fail(create_found_form, create_user, auto_login_user, mock_delete_found_form_fail):
    instance = create_found_form()
    url = reverse("form_delete", kwargs={"pk": instance.pk})
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)

    response = api_client.delete(url)
    with allure.step("Check response status when expectation failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code_when_expectation_failed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED
