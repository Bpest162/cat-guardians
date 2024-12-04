import json

import allure
import pytest
from django.conf import settings
from django.urls import reverse

from pets.models import CatProfile
from users.models import CustomUser


@pytest.mark.django_db(transaction=True)
@allure.title("Test Get Cats")
def test_get_cats(api_client, create_cat, fill_cats):
    test_cat = create_cat()
    cats_number = 60
    fill_cats(cats_number=cats_number)
    url = reverse("cat_list")

    response = api_client.get(url)

    with allure.step("Check cat list response"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200
        assert len(response.data) == 2
        assert len(response.data["data"]) == settings.PAGINATION_PAGE_SIZE
        assert response.data["pages"] == 11
        assert test_cat.name in str(response.data)

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
            f"Expected response: Not containing {test_cat.name}",
            name="expected_response_page_11",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response_page_11.status_code == 200
        assert len(response_page_11.data) == 2
        assert len(response_page_11.data["data"]) == 1
        assert response_page_11.data["pages"] == 11
        assert test_cat.name not in response_page_11.content.decode()


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_list filtering")
def test_cat_list_filtering(api_client, create_cat):
    first_cat = create_cat(name="a_first_cat", birth_date="2020-01-01", gender="M")  # TODO add color
    second_cat = create_cat(name="b_second_cat", birth_date="2023-11-01", gender="M")
    third_cat = create_cat(name="c_third_cat", birth_date="2023-12-01", gender="F")

    url = reverse("cat_list")

    response_filter_first = api_client.get(url + "?search=first")
    with allure.step("Check search first cat"):
        allure.attach(
            f"Expected response: {first_cat.name}",
            name="expected_response_filter_first_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_first.data["data"][0]["name"] == first_cat.name

    response_filter_second = api_client.get(url + "?search=second")
    with allure.step("Check search second cat"):
        allure.attach(
            f"Expected response: {second_cat.name}",
            name="expected_response_filter_second_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_second.data["data"][0]["name"] == second_cat.name

    response_filter_black_male = api_client.get(url + "?search=M")
    with allure.step("Check search for male cats"):
        allure.attach(
            f"Expected response: {[first_cat.name, second_cat.name]}",
            name="expected_response_filter_first_and_second_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        names = [v["name"] for v in response_filter_black_male.data["data"]]
        assert names == [first_cat.name, second_cat.name]

    response_filter_age_lt_1 = api_client.get(url + "?age__lt=1")
    with allure.step("Check search for cats younger then 1 year"):
        allure.attach(
            f"Expected response: {[second_cat.name, third_cat.name]}",
            name="expected_response_filter_second_and_third_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        names = [v["name"] for v in response_filter_age_lt_1.data["data"]]
        assert names == [second_cat.name, third_cat.name]

    response_filter_age_gt_1 = api_client.get(url + "?age__gt=1")
    with allure.step("Check search for cats older then 1 year"):
        allure.attach(
            f"Expected response: {first_cat.name}",
            name="expected_response_filter_second_and_third_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_age_gt_1.data["data"][0]["name"] == first_cat.name

    response_filter_third_female = api_client.get(url + "?search=third F")
    with allure.step("Check search for female cat named 'third'"):
        allure.attach(
            f"Expected response: {third_cat.name}",
            name="expected_response_filter_third_cat",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_filter_third_female.data["data"][0]["name"] == third_cat.name

    response_ordering_asc = api_client.get(url + "?ordering=name")
    with allure.step("Check ordering asc"):
        allure.attach(
            f"Expected response: {first_cat.name}",
            name="expected_response_ordering_asc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_ordering_asc.data["data"][0]["name"] == first_cat.name

    response_ordering_desc = api_client.get(url + "?ordering=-name")
    with allure.step("Check search ordering desc"):
        allure.attach(
            f"Expected response: {second_cat.name}",
            name="expected_response_ordering_desc",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_ordering_desc.data["data"][0]["name"] == third_cat.name


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_detail")
def test_cat_details(api_client, create_cat):
    test_cat = create_cat(name="a_first_cat", birth_date="2020-01-01", gender="M")
    second_cat = create_cat(name="b_second_cat", birth_date="2023-01-01", gender="M")

    url = reverse("cat_detail", kwargs={"pk": test_cat.id})

    response = api_client.get(url)

    with allure.step("Check cat detail response"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200
        assert len(response.data) == 13
        assert response.data["name"] == test_cat.name
        assert response.data["birth_date"] == test_cat.birth_date.isoformat()
        assert response.data["gender"] == test_cat.gender
        assert response.data["age"] == test_cat.age
        assert test_cat.name in str(response.data)
        assert second_cat.name not in str(response.data)


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_edit")
@pytest.mark.parametrize(
    "user_email, cat_name, user_logged, user_is_staff, create_cat_status",
    [
        ("user1@email1.com", "new_cat", False, False, 403),
        ("user1@email2.com", "new_cat", True, False, 403),
        ("user1@email3.com", "new_cat", True, True, 201),
        ("user1@email3.com", "", True, True, 400),
    ],
)
def test_cat_create(
    user_email,
    cat_name,
    user_logged,
    user_is_staff,
    create_cat_status,
    api_client,
    create_cat,
    create_user,
    auto_login_user,
):
    user = create_user(email="a_first@email.com", is_staff=user_is_staff)
    test_cat = create_cat(name="a_first_cat", birth_date="2020-01-01", gender="M")
    second_cat = create_cat(name="b_second_cat", birth_date="2023-01-01", gender="M")

    assert CatProfile.objects.count() == 2
    assert CustomUser.objects.count() == 1

    if user_logged:
        api_client, user_1 = auto_login_user(user=user)

    url = reverse("cat_create")

    data = {
        "name": cat_name,
        "birth_date": "2023-01-01",
        "gender": "M",
        "color": None,
        "breed": None,
    }

    response = api_client.post(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check cat create status"):
        allure.attach(
            f"Expected status code: {create_cat_status}",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == create_cat_status

        if user_is_staff and cat_name:
            assert len(response.data) == 13
            assert response.data["name"] == data["name"]
            assert response.data["birth_date"] == data["birth_date"]
            assert response.data["gender"] == data["gender"]
            assert response.data["age"] == CatProfile.objects.get(name=data["name"]).age
        else:
            assert len(response.data) == 1

        assert test_cat.name not in str(response.data)
        assert second_cat.name not in str(response.data)
        assert CatProfile.objects.count() == 2 + (user_is_staff and bool(cat_name))
        assert CustomUser.objects.count() == 1


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_edit")
@pytest.mark.parametrize(
    "user_email, cat_name, user_logged, user_is_staff, edit_cat_status",
    [
        ("user1@email1.com", "new_cat", False, False, 403),
        ("user1@email2.com", "new_cat", True, False, 403),
        ("user1@email3.com", "new_cat", True, True, 200),
        ("user1@email3.com", "", True, True, 400),
    ],
)
def test_cat_edit(
    user_email,
    cat_name,
    user_logged,
    user_is_staff,
    edit_cat_status,
    api_client,
    create_cat,
    create_user,
    auto_login_user,
):
    user = create_user(email="a_first@email.com", is_staff=user_is_staff)

    old_name = "a_first_cat"
    new_name = cat_name
    old_birth_date = "2020-01-01"
    new_birth_date = "2023-01-01"

    test_cat = create_cat(name=old_name, birth_date=old_birth_date, gender="M")
    second_cat = create_cat(name="b_second_cat", birth_date="2023-01-01", gender="M")

    test_cat_from_db = CatProfile.objects.get(name=old_name)

    assert test_cat_from_db == test_cat
    assert test_cat_from_db.name == old_name
    assert str(test_cat_from_db.birth_date) == old_birth_date

    assert CatProfile.objects.count() == 2
    assert CustomUser.objects.count() == 1

    if user_logged:
        api_client, user_1 = auto_login_user(user=user)

    url = reverse("cat_edit", kwargs={"pk": test_cat.id})

    data = {
        "name": new_name,
    }

    response1 = api_client.put(url, data=json.dumps(data), content_type="application/json")

    with allure.step("Check cat edit status"):
        allure.attach(
            f"Expected status code: {edit_cat_status}",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response1.status_code == edit_cat_status

        if user_is_staff and cat_name:
            assert len(response1.data) == 13
            assert response1.data["name"] == data["name"]
            test_cat_from_db_after_1 = CatProfile.objects.get(name=new_name)
            assert test_cat_from_db_after_1 == test_cat
            assert test_cat_from_db_after_1.name == new_name
            assert str(test_cat_from_db_after_1.birth_date) == old_birth_date
        else:
            assert len(response1.data) == 1

        assert second_cat.name not in str(response1.data)

        assert CatProfile.objects.count() == 2

        if not (user_is_staff and cat_name):
            # "Skip tests for second change for not eligible"
            return

        data2 = {
            "name": old_name,
            "birth_date": new_birth_date,
        }

        response2 = api_client.put(url, data=json.dumps(data2), content_type="application/json")
        test_cat_from_db_after_2 = CatProfile.objects.get(name=old_name)

        with allure.step("Check cat edit status"):
            allure.attach(
                "Expected status code: 200",
                name="expected_status_code",
                attachment_type=allure.attachment_type.TEXT,
            )

            assert response2.status_code == 200
            assert len(response2.data) == 13
            assert response2.data["name"] == old_name
            assert response2.data["birth_date"] == new_birth_date
            assert test_cat.name in str(response2.data)
            assert second_cat.name not in str(response2.data)

            assert test_cat_from_db_after_2 == test_cat
            assert test_cat_from_db_after_2.name == old_name
            assert str(test_cat_from_db_after_2.birth_date) == new_birth_date

            assert CatProfile.objects.count() == 2


@pytest.mark.django_db()
@pytest.mark.parametrize(
    "user_email, user_logged, user_is_staff, delete_cat_status",
    [
        ("user1@email1.com", False, False, 403),
        ("user1@email2.com", True, False, 403),
        ("user1@email3.com", True, True, 204),
    ],
)
@allure.title("Test delete_cat endpoint")
def test_delete_cat(
    user_email,
    user_logged,
    user_is_staff,
    delete_cat_status,
    create_user,
    auto_login_user,
    api_client,
    create_cat,
):
    user = create_user(email="a_first@email.com", is_staff=user_is_staff)
    test_cat = create_cat(name="a_first_cat", birth_date="2020-01-01", gender="M")
    second_cat = create_cat(name="b_second_cat", birth_date="2023-01-01", gender="M")

    assert CatProfile.objects.count() == 2
    assert CustomUser.objects.count() == 1

    if user_logged:
        api_client, user_1 = auto_login_user(user=user)

    url = reverse("cat_delete", kwargs={"pk": test_cat.id})

    response_user_1_deletes_user_2 = api_client.delete(url)

    with allure.step("user trying to delete cat"):
        allure.attach(
            f"Expected status code: {delete_cat_status}",
            name="expected_status_code 1->2",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert response_user_1_deletes_user_2.status_code == delete_cat_status
        assert CatProfile.objects.count() == 2 - user_is_staff
        assert CatProfile.objects.filter(name=test_cat.name).exists() is not user_is_staff
        assert CatProfile.objects.filter(name=second_cat.name).exists() is True
        assert CustomUser.objects.count() == 1


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_add_like")
def test_cat_add_like_true(api_client, create_cat, create_user, auto_login_user):
    test_cat = create_cat()
    user = create_user()
    auto_login_user(user=user)
    response = api_client.post(reverse("cat_add_like", kwargs={"pk": test_cat.id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200

    with allure.step("Check message is True"):
        allure.attach(
            "Expected response: True",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] is True

    with allure.step("Check like added"):
        allure.attach(
            "Expected user in likes",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        test_cat.refresh_from_db()

        assert user in test_cat.likes.all()


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_add_like already liked")
def test_cat_add_like_false(api_client, create_cat, create_user, auto_login_user):
    test_cat = create_cat()
    user = create_user()
    test_cat.likes.add(user)
    auto_login_user(user=user)

    # Add like twice
    _ = api_client.post(reverse("cat_add_like", kwargs={"pk": test_cat.id}))
    response = api_client.post(reverse("cat_add_like", kwargs={"pk": test_cat.id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200

    with allure.step("Check like added"):
        allure.attach(
            "Expected response: False",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] is False


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_remove_like_true")
def test_cat_remove_like_true(api_client, create_cat, create_user, auto_login_user):
    test_cat = create_cat()
    user = create_user()
    test_cat.likes.add(user)
    auto_login_user(user=user)
    response = api_client.delete(reverse("cat_add_like", kwargs={"pk": test_cat.id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200

    with allure.step("Check like removed"):
        allure.attach(
            "Expected response: True",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] is True

    with allure.step("Check like removed"):
        allure.attach(
            "Expected user not in likes",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        test_cat.refresh_from_db()

        assert user not in test_cat.likes.all()


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_remove_like_false")
def test_cat_remove_like_false(api_client, create_cat, create_user, auto_login_user):
    test_cat = create_cat()
    user = create_user()
    auto_login_user(user=user)
    response = api_client.delete(reverse("cat_add_like", kwargs={"pk": test_cat.id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 200",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 200

    with allure.step("Check like removed"):
        allure.attach(
            "Expected response: False",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] is False


@pytest.mark.django_db(transaction=True)
@allure.title("Test add like to not existing cat")
def test_cat_add_like_not_existing_cat(api_client, create_user, auto_login_user):
    cat_id = 1111
    user = create_user()
    auto_login_user(user=user)

    response = api_client.post(reverse("cat_add_like", kwargs={"pk": cat_id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 404

    with allure.step("Check message"):
        allure.attach(
            f"Cat with id {cat_id} does not exist",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] == f"Cat with id {cat_id} does not exist"


@pytest.mark.django_db(transaction=True)
@allure.title("Test remove like from not existing cat")
def test_cat_remove_like_not_existing_cat(api_client, create_user, auto_login_user):
    cat_id = 1111
    user = create_user()
    auto_login_user(user=user)

    response = api_client.delete(reverse("cat_add_like", kwargs={"pk": cat_id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 404",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 404

    with allure.step("Check message"):
        allure.attach(
            f"Cat with id {cat_id} does not exist",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] == f"Cat with id {cat_id} does not exist"


@pytest.mark.django_db(transaction=True)
@allure.title("Test cat_add_like_not_authenticated")
def test_cat_add_like_not_authenticated(api_client, create_cat):
    test_cat = create_cat()
    response = api_client.post(reverse("cat_add_like", kwargs={"pk": test_cat.id}))

    with allure.step("Check status code"):
        allure.attach(
            "Expected status code: 403",
            name="expected_status_code",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.status_code == 403

    with allure.step("Check message"):
        allure.attach(
            "У вас нема дозволу робити цю дію.",
            name="expected_response",
            attachment_type=allure.attachment_type.TEXT,
        )

        assert response.data["message"] == "У вас нема дозволу робити цю дію."
