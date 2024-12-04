import allure
import pytest
from django.conf import settings
from django.urls import reverse
from rest_framework import status

from adoption.models import Adoption


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Adoption Request")
def test_create_adoption_request(create_user, test_phone_number, api_client, auto_login_user, create_cat):
    url = reverse("create_adoption")
    user = create_user()
    api_client, user = auto_login_user(user=user)
    cat = create_cat()
    phone_number = test_phone_number

    data = {"id_cat": cat.id, "notes": "Test notes", "phone_number": phone_number}

    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code"):
        allure.attach(
            "Expected status code: 201",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_201_CREATED
        assert Adoption.objects.filter(user=user, cat=cat).exists()

        adoption = Adoption.objects.get(user=user, cat=cat)
        assert adoption.cat == cat
        assert adoption.user == user
        assert adoption.request_date is not None
        assert adoption.notes == "Test notes"
        assert adoption.status == "pending"
        assert adoption.decision_date is None
        assert adoption.phone_number == phone_number

    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code for duplicate request adoption"):
        allure.attach(
            "Expected status code: 409",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
    assert response.status_code == status.HTTP_409_CONFLICT


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Adoption Request With Missing Cat ID")
def test_cat_not_found(create_user, test_phone_number, api_client, auto_login_user):
    url = reverse("create_adoption")
    user = create_user()
    api_client, user = auto_login_user(user=user)
    phone_number = test_phone_number

    data = {"id_cat": "1", "notes": "Test notes", "phone_number": phone_number}

    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code for missing cat id"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Invalid Adoption Request")
def test_invalid_adoption_request(
    create_user,
    create_cat,
    test_phone_number,
    api_client,
    auto_login_user,
    test_phone_number_invalid,
):
    url = reverse("create_adoption")
    user = create_user()
    cat = create_cat()
    phone_number = test_phone_number
    phone_number_invalid = test_phone_number_invalid

    data = {"id_cat": cat.id, "notes": "Test notes", "phone_number": phone_number}

    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code with not authenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    api_client, user = auto_login_user(user=user)

    data = {"id_cat": cat.id, "notes": "Test notes", "phone_number": phone_number_invalid}
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code with invalid phone number"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    data = {
        "id_cat": cat.id,
        "notes": "Test notes",
    }
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code with missing phone number"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    data = {"notes": "Test notes", "phone_number": phone_number_invalid}
    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code without id_cat"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db(transaction=True)
@allure.title("Test Create Adoption Request Failed")
def test_create_adoption_request_failed(
    create_user,
    create_cat,
    test_phone_number,
    api_client,
    auto_login_user,
    mock_create_adoption_failed,
):
    url = reverse("create_adoption")
    user = create_user()
    api_client, user = auto_login_user(user=user)
    cat = create_cat()
    phone_number = test_phone_number

    data = {"id_cat": cat.id, "notes": "Test notes", "phone_number": phone_number}

    response = api_client.post(url, data, format="json")

    with allure.step("Check response status code for duplicate request adoption"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED


@pytest.mark.django_db(transaction=True)
@allure.title("Test Adoption Request List")
def test_adoption_request_list(fill_adoptions, create_user, api_client, auto_login_user):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    url = reverse("list_adoption")
    adoptions_number = 12
    fill_adoptions(adoptions_number=adoptions_number)

    response = api_client.get(url)

    with allure.step("Check adoptions list response without access"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    user.is_staff = True
    user.save()

    response = api_client.get(url)

    with allure.step("Check adoptions list response"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2
        assert len(response.data["data"]) == settings.PAGINATION_PAGE_SIZE
        assert response.data["pages"] == 2

    response_page_1 = api_client.get(url, {"page": 1})

    with allure.step("Check 1 adoption page"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_page_1.status_code == status.HTTP_200_OK
        assert response.data == response_page_1.data

    response_page_2 = api_client.get(url, {"page": 2})

    with allure.step("Check 2 adoption page"):
        allure.attach(
            "Expected: Different response from page 1 and page 2",
            name="expected_different_response",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_page_2.status_code == status.HTTP_200_OK
        assert response_page_2.data != response_page_1.data


@pytest.mark.django_db(transaction=True)
@allure.title("Test Adoption List Search And Ordering")
def test_adoption_list_search_and_ordering(
    create_user,
    api_client,
    auto_login_user,
    create_cat,
):
    user = create_user()
    user.is_staff = True
    user.save()
    api_client, user = auto_login_user(user=user)
    url = reverse("list_adoption")
    cat_1 = create_cat(name="Malysh")
    cat_2 = create_cat(name="Luchick")
    adoption_1 = Adoption.objects.create(cat=cat_1, status="pending")
    adoption_2 = Adoption.objects.create(cat=cat_2, status="approved")

    response = api_client.get(url, {"search": f"{adoption_1.cat.name}"})

    with allure.step("Check search cat_1 name"):
        allure.attach(
            f"Expected response: {cat_1.name}",
            name="expected_response_data_with_cat_1_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert len(response.data["data"]) == 1
        assert cat_1.name in response.data["data"][0]["cat"]

    response = api_client.get(url, {"search": f"{adoption_2.cat.name}"})

    with allure.step("Check search cat_2 name"):
        allure.attach(
            f"Expected response: {cat_2.name}",
            name="expected_response_data_with_cat_2_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert len(response.data["data"]) == 1
        assert cat_2.name in response.data["data"][0]["cat"]

    response = api_client.get(url, {"ordering": "status"})

    with allure.step("Check adoption list ordering asc"):
        allure.attach(
            "Expected response: Adoption list sorted by status",
            name="expected_response_data_sorted_by_status_asc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["status"] == "approved"
        assert response.data["data"][1]["status"] == "pending"

    response = api_client.get(url, {"ordering": "-status"})

    with allure.step("Check adoption list ordering desc"):
        allure.attach(
            "Expected response: Adoption list sorted by status",
            name="expected_response_data_sorted_by_status_desc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["status"] == "pending"
        assert response.data["data"][1]["status"] == "approved"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Detail Adoption")
def test_detail_adoption(create_user, api_client, auto_login_user, sample_cat_breed, sample_cat_color, create_adoption):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    adoption = create_adoption(user=user)
    url = reverse("adoption_detail", kwargs={"pk": adoption.id})

    response = api_client.get(url)

    with allure.step("Check response status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == adoption.id


@pytest.mark.django_db(transaction=True)
@allure.title("Test Detail Adoption Not Associated")
def test_detail_adoption_not_associated(create_user, api_client, auto_login_user, create_adoption):
    user_is_staff = create_user()
    user_is_staff.is_staff = True
    user_is_staff.save()
    user_1 = create_user(email="user_1@example.com")
    adoption_1 = create_adoption(user=user_1)
    adoption_2 = create_adoption(user=user_is_staff)
    url = reverse("adoption_detail", kwargs={"pk": adoption_1.id})

    response = api_client.get(url)

    with allure.step("Check response for unauthenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    api_client, user = auto_login_user(user=user_is_staff)
    response = api_client.get(url)

    with allure.step("Check response for staff"):
        allure.attach(
            f"Expected response: adoption with id={adoption_1.id}",
            name="expected_adoption_1",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == adoption_1.id

    url_logout = reverse("logout")
    api_client.post(url_logout)
    api_client, user = auto_login_user(user=user_1)
    url = reverse("adoption_detail", kwargs={"pk": adoption_2.id})
    response = api_client.get(url)

    with allure.step("Check response for not associated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Detail Adoption Not Found")
def test_detail_adoption_not_found(create_user, api_client, auto_login_user):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    url = reverse("adoption_detail", kwargs={"pk": 1})

    response = api_client.get(url)

    with allure.step("Check response for not found"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Detail Adoption Request Failed")
def test_detail_adoption_request_failed(
    create_user, api_client, auto_login_user, create_adoption, mock_get_object_fail_adoption
):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    adoption = create_adoption(user=user)
    url = reverse("adoption_detail", kwargs={"pk": adoption.id})

    response = api_client.get(url)

    with allure.step("Check response for failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED


@pytest.mark.django_db(transaction=True)
@allure.title("Test User List Adoption")
def test_user_list_adoption(
    create_user,
    api_client,
    auto_login_user,
    create_cat,
    create_adoption,
):
    user_1 = create_user(email="user_1@example.com")
    user_2 = create_user(email="user_2@example.com")
    cat_1 = create_cat(name="Malysh")
    cat_2 = create_cat(name="Luchick")
    adoption_1 = create_adoption(user=user_1, cat=cat_1)
    adoption_2 = create_adoption(user=user_1, cat=cat_2)
    create_adoption(user=user_2, cat=cat_1)
    url = reverse("user_adoption", kwargs={"pk": user_1.id})

    response = api_client.get(url)

    with allure.step("Check response for unauthenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    api_client, user = auto_login_user(user=user_1)
    response = api_client.get(url)

    with allure.step("Check response for user's list adoption"):
        allure.attach(
            "Expected response: user's list adoption",
            name="expected_user's_list_adoption",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["data"]) == 2
        assert response.data["data"][0]["id"] == adoption_1.id
        assert response.data["data"][1]["id"] == adoption_2.id
        assert response.data["pages"] == 1


@pytest.mark.django_db(transaction=True)
@allure.title("Test User List Adoption Ordering")
def test_user_list_adoption_ordering(
    create_user,
    api_client,
    auto_login_user,
    create_cat,
    create_adoption,
):
    user = create_user()
    cat_1 = create_cat(name="Malysh")
    cat_2 = create_cat(name="Luchick")
    create_adoption(user=user, cat=cat_1, status="pending")
    create_adoption(user=user, cat=cat_2, status="approved")
    api_client, user = auto_login_user(user=user)
    url = reverse("user_adoption", kwargs={"pk": user.id})

    response = api_client.get(url, {"ordering": "status"})

    with allure.step("Check user adoption list ordering asc"):
        allure.attach(
            "Expected response: User adoption list sorted by status",
            name="expected_response_data_sorted_by_status_asc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["status"] == "approved"
        assert response.data["data"][1]["status"] == "pending"

    response = api_client.get(url, {"ordering": "-status"})

    with allure.step("Check user adoption list ordering desc"):
        allure.attach(
            "Expected response: User adoption list sorted by status",
            name="expected_response_data_sorted_by_status_desc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data["data"][0]["status"] == "pending"
        assert response.data["data"][1]["status"] == "approved"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Delete Adoption")
def test_delete_adoption(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user = create_user()
    adoption = create_adoption(user=user)
    url = reverse("delete_adoption", kwargs={"pk": adoption.id})

    response = api_client.delete(url)

    with allure.step("Check response for unauthenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    api_client, user = auto_login_user(user=user)

    response = api_client.delete(url)

    with allure.step("Check response for associated user"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert not Adoption.objects.filter(id=adoption.id).exists()

    response = api_client.delete(url)

    with allure.step("Check response for not found"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Delete Adoption not associated")
def test_delete_adoption_not_associated(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user_1 = create_user(email="user_1@example.com")
    user_2 = create_user(email="user_2@example.com")
    adoption = create_adoption(user=user_1)
    api_client, user = auto_login_user(user=user_2)
    url = reverse("delete_adoption", kwargs={"pk": adoption.id})

    response = api_client.delete(url)

    with allure.step("Check response for not associated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Delete Adoption Staff")
def test_delete_adoption_staff(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user_is_staff = create_user()
    user_is_staff.is_staff = True
    user_is_staff.save()
    user_1 = create_user(email="user_1@example.com")
    adoption = create_adoption(user=user_1)
    api_client, user = auto_login_user(user=user_is_staff)
    url = reverse("delete_adoption", kwargs={"pk": adoption.id})

    response = api_client.delete(url)

    with allure.step("Check response for staff"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_200_OK
        assert not Adoption.objects.filter(id=adoption.id).exists()


@pytest.mark.django_db(transaction=True)
@allure.title("Test Delete Adoption Failed")
def test_delete_adoption_failed(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
    mock_delete_fail_adoption,
):
    user = create_user()
    adoption = create_adoption(user=user)
    api_client, user = auto_login_user(user=user)
    url = reverse("delete_adoption", kwargs={"pk": adoption.id})

    response = api_client.delete(url)

    with allure.step("Check response for failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption")
def test_edit_adoption(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
    test_change_phone_number,
):
    user = create_user()
    adoption = create_adoption(user=user)
    url = reverse("edit_adoption", kwargs={"pk": adoption.id})
    phone_number = test_change_phone_number

    data = {"phone_number": phone_number, "notes": "Changed notes"}

    response = api_client.put(url, data=data)

    with allure.step("Check response for unauthenticated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN

    api_client, user = auto_login_user(user=user)

    response = api_client.put(url, data=data)

    with allure.step("Check response for associated user"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        adoption.refresh_from_db()

        assert response.status_code == status.HTTP_200_OK
        assert adoption.notes == "Changed notes"
        assert adoption.phone_number == phone_number

    data = {"status": "approved"}
    response = api_client.put(url, data=data)

    with allure.step("Check response for change status not staff or admin"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption By Not Associated User")
def test_edit_adoption_not_associated(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user_1 = create_user(email="user_1@example.com")
    user_2 = create_user(email="user_2@example.com")
    adoption = create_adoption(user=user_1)
    api_client, user = auto_login_user(user=user_2)
    url = reverse("edit_adoption", kwargs={"pk": adoption.id})

    data = {"notes": "Changed notes"}

    response = api_client.put(url, data=data)

    with allure.step("Check response for not associated user"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption Staff")
def test_edit_adoption_staff(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user_is_staff = create_user()
    user_is_staff.is_staff = True
    user_is_staff.save()
    api_client, user = auto_login_user(user=user_is_staff)
    user = create_user(email="user_1@example.com")
    adoption = create_adoption(user=user)
    url = reverse("edit_adoption", kwargs={"pk": adoption.id})

    data = {"status": "approved"}
    response = api_client.put(url, data=data)

    with allure.step("Check response for change status by staff"):
        allure.attach(
            "Expected response: status == approved",
            name="expected_status_change",
            attachment_type=allure.attachment_type.TEXT,
        )

        adoption.refresh_from_db()

        assert response.status_code == status.HTTP_200_OK
        assert adoption.status == "approved"
        assert adoption.decision_date is not None

    data = {"status": "pending"}
    response = api_client.put(url, data=data)

    with allure.step("Check response for change status to pending"):
        allure.attach(
            "Expected response: status == pending",
            name="expected_status_change",
            attachment_type=allure.attachment_type.TEXT,
        )
        adoption.refresh_from_db()

        assert response.status_code == status.HTTP_200_OK
        assert adoption.status == "pending"
        assert adoption.decision_date is None


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption Not Found")
def test_edit_adoption_not_found(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    url = reverse("edit_adoption", kwargs={"pk": 1})

    data = {"notes": "Changed notes"}
    response = api_client.put(url, data=data)

    with allure.step("Check response for not found"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption Invalid Data")
def test_edit_adoption_invalid_data(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
    test_phone_number_invalid,
):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    adoption = create_adoption(user=user)
    url = reverse("edit_adoption", kwargs={"pk": adoption.id})

    data = {"phone_number": test_phone_number_invalid}

    response = api_client.put(url, data=data)

    with allure.step("Check response for invalid data"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db(transaction=True)
@allure.title("Test Edit Adoption Failed")
def test_edit_adoption_failed(
    create_user,
    api_client,
    auto_login_user,
    create_adoption,
    mock_edit_fail_adoption,
):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    adoption = create_adoption(user=user)
    url = reverse("edit_adoption", kwargs={"pk": adoption.id})

    data = {"notes": "Changed notes"}
    response = api_client.put(url, data=data)

    with allure.step("Check response for failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == status.HTTP_417_EXPECTATION_FAILED
