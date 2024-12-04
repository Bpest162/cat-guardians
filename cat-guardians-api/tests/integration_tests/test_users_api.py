import allure
import pytest
from django.conf import settings
from django.urls import reverse
from rest_framework.utils import json


@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    "email, password, status_code",
    [
        ("", "", 400),
        (pytest.lazy_fixture("test_email"), "", 400),
        (pytest.lazy_fixture("test_email"), "invalid_pass", 403),
        (pytest.lazy_fixture("test_email"), pytest.lazy_fixture("test_password"), 200),
    ],
)
@allure.title("Test Login Data Validation")
def test_login_data_validation(email, password, status_code, api_client, create_user):
    create_user(username="test_user")
    url = reverse("login")
    data = {"email": email, "password": password}
    response = api_client.post(url, data=data)

    with allure.step("Check login status"):
        allure.attach(
            f"Expected status code: {status_code}",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == status_code, f"Unexpected status code: {response.status_code}"


@allure.title("Test Logout")
def test_logout(auto_login_user, create_user):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    url = reverse("logout")

    response = api_client.post(url)

    with allure.step("Check logout status"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200, f"Unexpected status code: {response.status_code}"


@pytest.mark.django_db(transaction=True)
@allure.title("Test Get Users")
def test_get_users(api_client, create_user, fill_users, auto_login_user):
    test_user = create_user()
    test_user.is_staff = True
    test_user.save()
    users_number = 60
    fill_users(users_number=users_number)
    url = reverse("user_list")
    api_client, user = auto_login_user(user=test_user)

    response = api_client.get(url)

    with allure.step("Check user list response"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200
        assert len(response.data) == 2
        assert len(response.data["data"]) == settings.PAGINATION_PAGE_SIZE
        assert response.data["pages"] == 11
        assert test_user.username in str(response.data)

    response_page_1 = api_client.get(url + "?page=1")

    with allure.step("Check page 1 response"):
        allure.attach(
            f"Expected response: {response.data}",
            name="expected_response_page_1",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data == response_page_1.data

    response_page_11 = api_client.get(url + "?page=11")

    with allure.step("Check page 11 response"):
        allure.attach(
            f"Expected response: Not containing {test_user.username}",
            name="expected_response_page_11",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response_page_11.status_code == 200
        assert len(response_page_11.data) == 2
        assert len(response_page_11.data["data"]) == 1
        assert response_page_11.data["pages"] == 11
        assert test_user.username not in response_page_11.content.decode()


@pytest.mark.django_db(transaction=True)
@allure.title("Test user_list filtering")
def test_user_list_filtering(api_client, create_user, auto_login_user):
    first_user = create_user(email="a_first@email.com")
    second_user = create_user(email="b_second@email.com")
    first_user.is_staff = True
    first_user.save()
    api_client, user = auto_login_user(user=first_user)

    url = reverse("user_list")

    response_filter_first = api_client.get(url + "?search=first")
    with allure.step("Check search first user"):
        allure.attach(
            f"Expected response: {first_user.email}",
            name="expected_response_filter_first_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_first.data["data"][0]["email"] == first_user.email

    response_filter_second = api_client.get(url + "?search=second")
    with allure.step("Check search second user"):
        allure.attach(
            f"Expected response: {second_user.email}",
            name="expected_response_filter_second_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_second.data["data"][0]["email"] == second_user.email

    response_ordering_asc = api_client.get(url + "?ordering=email")
    with allure.step("Check ordering asc"):
        allure.attach(
            f"Expected response: {first_user.email}",
            name="expected_response_ordering_asc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_ordering_asc.data["data"][0]["email"] == first_user.email

    response_ordering_desc = api_client.get(url + "?ordering=-email")
    with allure.step("Check search ordering desc"):
        allure.attach(
            f"Expected response: {second_user.email}",
            name="expected_response_ordering_desc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_ordering_desc.data["data"][0]["email"] == second_user.email


@pytest.mark.django_db(transaction=True)
@allure.title("Test Signup")
def test_signup(api_client, django_user_model, test_email, test_password):
    url = reverse("signup")

    fullname = "testuser_fullname"
    data = {
        "email": test_email,
        "password": test_password,
        "fullName": fullname,
    }

    response = api_client.post(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check signup status"):
        allure.attach(
            "Expected status code: 201",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == 201
        assert django_user_model.objects.filter(first_name=fullname).count() == 1
        assert django_user_model.objects.filter(email=test_email).count() == 1

    response_existing_data = api_client.post(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check duplicate signup response"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code_duplicate",
            attachment_type=allure.attachment_type.TEXT,
        )
        allure.attach(
            'Expected data: {{"message": "Email address has been taken"}}',
            name="expected_data_duplicate",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_existing_data.status_code == 400
        assert response_existing_data.data == {"message": "Email address has been taken"}


@pytest.mark.django_db()
@pytest.mark.parametrize(
    "user_1_email, user_2_email, user_1_logged, user_1_is_staff, delete_user_2_status, delete_user_1_status",
    [
        ("user1@email1.com", "user2@email1.com", False, False, 403, 403),
        ("user1@email2.com", "user2@email2.com", True, False, 401, 200),
        ("user1@email3.com", "user2@email3.com", True, True, 200, 200),
    ],
)
@allure.title("Test delete_user endpoint")
def test_delete_user(
    user_1_email,
    user_2_email,
    user_1_logged,
    user_1_is_staff,
    delete_user_2_status,
    delete_user_1_status,
    create_user,
    auto_login_user,
    api_client,
    test_password,
    django_user_model,
):
    user_1 = create_user(email=user_1_email, is_staff=user_1_is_staff)
    user_2 = create_user(email=user_2_email)

    if user_1_logged:
        api_client, user_1 = auto_login_user(user=user_1)

    url = reverse("delete_user", kwargs={"pk": user_2.id})
    response_user_1_deletes_user_2 = api_client.delete(url)
    with allure.step("user_1 trying to delete user_2"):
        allure.attach(
            f"Expected status code: {delete_user_2_status}",
            name="expected_status_code 1->2",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_user_1_deletes_user_2.status_code == delete_user_2_status

    if user_1_logged and user_1_is_staff:
        url = reverse("delete_user", kwargs={"pk": (django_user_model.objects.all().count() + 1)})
        response_delete_non_existent_user = api_client.delete(url)
        with allure.step("user_1 trying to delete non-existent user"):
            allure.attach(
                "Expected status code: 404",
                name="expected_status_code 1->None",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert response_delete_non_existent_user.status_code == 404

    url = reverse("delete_user", kwargs={"pk": user_1.id})
    response_user_1_deletes_user_1 = api_client.delete(url)
    with allure.step("user_1 trying to delete user_1"):
        allure.attach(
            f"Expected status code: {delete_user_1_status}",
            name="expected_status_code 1->1",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_user_1_deletes_user_1.status_code == delete_user_1_status
    try:
        user_1.delete()
        user_2.delete()
    except Exception:
        pass


@pytest.mark.django_db(transaction=True)
@allure.title("Test deletion failed with delete_user endpoint")
def test_user_deletion_failed(api_client, create_user, auto_login_user, mocked_delete_fail_user_model):
    user = create_user(email="deletion_failed@test.com")

    api_client, user = auto_login_user(user=user)

    url = reverse("delete_user", kwargs={"pk": user.id})

    response = api_client.delete(url)

    with allure.step("User deletion failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code_user_deletion_failed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == 417


@pytest.mark.django_db(transaction=True)
@allure.title("Test User Details Update")
def test_user_details_update(api_client, django_user_model, create_user, auto_login_user):
    user_1 = create_user()
    api_client, user_1 = auto_login_user(user=user_1)
    url = reverse("edit_profile")

    data_ok = {
        "email": "new_email@example.com",
        "fullName": "NewName",
    }

    response_ok = api_client.put(url, data=json.dumps(data_ok), content_type="application/json")

    with allure.step("Check user details update status"):
        allure.attach(
            "Expected status code: 200", name="expected_status_code_ok", attachment_type=allure.attachment_type.TEXT
        )

        user_1_updated = django_user_model.objects.get(pk=user_1.pk)

        assert response_ok.status_code == 200
        assert user_1_updated.email == data_ok["email"]
        assert user_1_updated.first_name == data_ok["fullName"]

    user_2 = create_user()
    data_wrong = {
        "email": f"{user_2.email}",
    }

    response_wrong = api_client.put(url, data=json.dumps(data_wrong), content_type="application/json")

    with allure.step("Check user details update with a duplicate email"):
        allure.attach(
            "Expected status code: 400",
            name="expected_status_code_duplicate_email",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response_wrong.status_code == 400


@pytest.mark.django_db(transaction=True)
@allure.title("Test User Details Update Failed")
def test_user_details_update_fail(
    api_client, django_user_model, create_user, auto_login_user, mock_perform_update_fail
):
    user = create_user()
    api_client, user = auto_login_user(user=user)
    url = reverse("edit_profile")

    data = {
        "email": "new_email@example.com",
        "fullName": "NewName",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user details update status"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code_user_data_changes_failed",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 417


@pytest.mark.django_db(transaction=True)
@allure.title("Test User Password Change")
def test_user_password_change(api_client, create_user, auto_login_user, django_user_model, test_password):
    user = create_user()
    url = reverse("change_password")

    data = {
        "old_password": test_password,
        "new_password": "new_password",
        "confirm_password": "new_password",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change status without authentication"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code_forbidden",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 403

    api_client, user = auto_login_user(user=user)

    data = {
        "old_password": "invalid_old_password",
        "new_password": "new_password",
        "confirm_password": "new_password",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change status with invalid old password"):
        allure.attach(
            "Expected status code: 412",
            name="expected_status_code_expectation_failed",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 412
        assert response.data["message"] == "Invalid old password"

    data = {
        "old_password": test_password,
        "new_password": "new_password",
        "confirm_password": "different_password",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change with mismatched passwords"):
        allure.attach(
            "Expected status code: 412",
            name="expected_status_code_expectation_failed",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 412
        assert response.data["message"] == "Password mismatch"

    data = {
        "old_password": test_password,
        "new_password": test_password,
        "confirm_password": test_password,
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change with same passwords"):
        allure.attach(
            "Expected status code: 412",
            name="expected_status_code_expectation_failed",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 412
        assert response.data["message"] == "New password must be different from old password"

    data = {
        "old_password": test_password,
        "new_password": "new_password",
        "confirm_password": "new_password",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change status"):
        allure.attach(
            "Expected status code: 200", name="expected_status_code_ok", attachment_type=allure.attachment_type.TEXT
        )

        updated_user = django_user_model.objects.get(pk=user.pk)

        assert response.status_code == 200
        assert updated_user.check_password(data["new_password"])


@pytest.mark.django_db(transaction=True)
@allure.title("Test Password Change Failed")
def test_password_change_when_db_unavailable(
    api_client, create_user, auto_login_user, mock_set_password_fail, test_password
):
    user = create_user()
    url = reverse("change_password")
    api_client, user = auto_login_user(user=user)

    data = {
        "old_password": test_password,
        "new_password": "new_password",
        "confirm_password": "new_password",
    }

    response = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check user password change failed"):
        allure.attach(
            "Expected status code: 417",
            name="expected_status_code_password_change_failed",
            attachment_type=allure.attachment_type.TEXT,
        )

    assert response.status_code == 417


@pytest.mark.django_db(transaction=True)
@allure.title("check-auth: Check login status when user is not authenticated")
def test_login_status_when_user_is_not_authenticated(api_client):
    url = reverse("check_auth")
    response = api_client.get(url)

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 401",
            name="expected_status_code_unauthorized",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == 401

    with allure.step("Check response data"):
        allure.attach(
            'Expected data: {"message":"User is not authenticated"}',
            name="expected_response_data",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data == {"message": "User is not authenticated"}

    with allure.step("Check headers"):
        allure.attach(
            "Expected headers: 'WWW-Authenticate",
            name="expected_headers",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.has_header("WWW-Authenticate")


@pytest.mark.django_db(transaction=True)
@allure.title("check-auth: Check login status when user is authenticated 200 OK")
def test_check_login_status_when_user_is_authenticated_200(api_client, auto_login_user):
    url = reverse("check_auth")
    api_client, user = auto_login_user()
    response = api_client.get(url)

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code_ok",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.status_code == 200


@pytest.mark.django_db(transaction=True)
@allure.title("check-auth: check response data when user is authenticated")
def test_check_login_status_when_user_is_authenticated_response_data(
    api_client, auto_login_user, django_user_model, test_password, test_email, test_full_name
):
    url = reverse("check_auth")
    user = django_user_model.objects.create_user(
        email=test_email, password=test_password, full_name=test_full_name, username=test_email
    )

    api_client, user = auto_login_user(user=user)
    response = api_client.get(url)

    user_data = {
        "id": user.id,
        "email": user.email,
        "fullName": user.full_name,
    }

    with allure.step("Check response data"):
        allure.attach(
            f'Expected data: "message":"User is authenticated", "data":{user_data}',
            name="expected_response_data",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data == {"message": "User is authenticated", "data": user_data}


@pytest.mark.django_db(transaction=True)
@allure.title("Test Login after Signup")
def test_login_after_signup(api_client, django_user_model, test_email, test_password, test_full_name):
    url = reverse("signup")

    data = {
        "email": test_email,
        "password": test_password,
        "fullName": test_full_name,
    }

    response = api_client.post(url, data=json.dumps(data), content_type="application/json")
    user = django_user_model.objects.get(email=test_email)

    expected_response_data = {
        "message": {"New user created and logged in successfully"},
        "data": {
            "id": user.id,
            "email": user.email,
        },
    }

    with allure.step("Check response data"):
        allure.attach(
            f"Expected response data: {expected_response_data}",
            name="expected_response_data",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response.data == expected_response_data

    expected_cookies = settings.SIGNED_COOKIE_NAME

    with allure.step("Check response's cookies"):
        allure.attach(
            f"Expected cookies: '{expected_cookies}'",
            name="expected_cookies",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert expected_cookies in response.cookies
