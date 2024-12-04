import allure
import pendulum
import pytest
from django.utils.translation import activate, deactivate

from pets.models import CatPhoto, CatProfile

"""
CatProfile tests
"""


@pytest.mark.django_db(transaction=True)
@allure.title("Test create CatProfile")
def test_create_cat_profile(sample_cat_color, sample_cat_breed):
    cat = CatProfile.objects.create(name="Dobby", gender="M", color=sample_cat_color, breed=sample_cat_breed)

    with allure.step("Check cat's name"):
        allure.attach(
            "Expected response: Dobby",
            name="expected_response_cat_name",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.name == "Dobby"

    with allure.step("Check cat's gender"):
        allure.attach(
            "Expected response: M",
            name="expected_response_cat_gender",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.gender == "M"

    with allure.step("Check cat's color"):
        allure.attach(
            f"Expected response: {sample_cat_color}",
            name="expected_response_cat_color",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.color == sample_cat_color

    with allure.step("Check cat's breed"):
        allure.attach(
            f"Expected response: {sample_cat_breed}",
            name="expected_response_cat_breed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.breed == sample_cat_breed


@pytest.mark.django_db(transaction=True)
@allure.title("Test CatProfile age property")
def test_cat_age_property(sample_cat_color, sample_cat_breed, get_cat_age):
    activate("en")
    initial_birth_date = pendulum.date(2019, 10, 15)
    cat = CatProfile.objects.create(name="Bobby", birth_date=initial_birth_date)
    expected_age = get_cat_age(cat)
    with allure.step("Check cat's age"):
        allure.attach(
            f"Expected response: {expected_age}",
            name="expected_response_cat_age",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.age == expected_age
    deactivate()


@pytest.mark.django_db(transaction=True)
@allure.title("Test CatProfile add/remove like")
def test_add_like_and_remove_like(create_user):
    user = create_user(email="test_like@example.com")
    cat = CatProfile.objects.create(name="Lobby")

    with allure.step("Check like was added"):
        allure.attach(
            "Expected response: True",
            name="expected_response_like_added",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.add_like(user) is True

    with allure.step("Check user already liked"):
        allure.attach(
            "Expected response: False",
            name="expected_response_like_duplicated",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.add_like(user) is False

    with allure.step("Check cat's likes count"):
        allure.attach(
            "Expected response: 1",
            name="expected_response_likes_count",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.likes.count() == 1

    with allure.step("Check like was removed"):
        allure.attach(
            "Expected response: True",
            name="expected_response_like_removed",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.remove_like(user) is True

    with allure.step("Check like was already removed before"):
        allure.attach(
            "Expected response: False",
            name="expected_response_like_already_removed_before",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.remove_like(user) is False

    with allure.step("Check cat's likes count after remove"):
        allure.attach(
            "Expected response: 0",
            name="expected_response_likes_count_after_remove",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.likes.count() == 0


"""
CatPhoto tests
"""

IMAGE_FILE = "tests/fixtures/images/test_cat.jpeg"


@pytest.mark.django_db(transaction=True)
@allure.title("Test create CatPhoto")
def test_create_cat_photo(sample_cat_breed, sample_cat_color):
    cat = CatProfile.objects.create(name="Dobby", gender="M", color=sample_cat_color, breed=sample_cat_breed)

    cat_photo = CatPhoto.objects.create(photo=IMAGE_FILE, cat=cat)

    with allure.step("Check cat's photo"):
        allure.attach(
            f"Expected response: {IMAGE_FILE}",
            name="expected_response_cat_photo",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat_photo.photo == IMAGE_FILE


@pytest.mark.django_db(transaction=True)
@allure.title("Test age pluralization of Ukrainian localization for CatProfile")
@pytest.mark.parametrize(
    "birth_date, expected_age",
    [
        (pendulum.now().subtract(days=1).date(), "Менше ніж 1 місяць"),
        (pendulum.now().subtract(months=1).date(), "1 місяць"),
        (pendulum.now().subtract(months=2).date(), "2 місяці"),
        (pendulum.now().subtract(months=3).date(), "3 місяці"),
        (pendulum.now().subtract(months=4).date(), "4 місяці"),
        (pendulum.now().subtract(months=5).date(), "5 місяців"),
        (pendulum.now().subtract(months=6).date(), "6 місяців"),
        (pendulum.now().subtract(months=7).date(), "7 місяців"),
        (pendulum.now().subtract(months=8).date(), "8 місяців"),
        (pendulum.now().subtract(months=9).date(), "9 місяців"),
        (pendulum.now().subtract(months=10).date(), "10 місяців"),
        (pendulum.now().subtract(months=11).date(), "11 місяців"),
        (pendulum.now().subtract(years=1).date(), "1 рік "),
        (pendulum.now().subtract(years=2).date(), "2 роки "),
        (pendulum.now().subtract(years=3).date(), "3 роки "),
        (pendulum.now().subtract(years=4).date(), "4 роки "),
        (pendulum.now().subtract(years=5).date(), "5 років "),
        (pendulum.now().subtract(years=6).date(), "6 років "),
        (pendulum.now().subtract(years=7).date(), "7 років "),
        (pendulum.now().subtract(years=8).date(), "8 років "),
        (pendulum.now().subtract(years=9).date(), "9 років "),
        (pendulum.now().subtract(years=10).date(), "10 років "),
        (pendulum.now().subtract(years=1, months=1).date(), "1 рік 1 місяць"),
        (pendulum.now().subtract(years=1, months=2).date(), "1 рік 2 місяці"),
        (pendulum.now().subtract(years=1, months=3).date(), "1 рік 3 місяці"),
        (pendulum.now().subtract(years=1, months=4).date(), "1 рік 4 місяці"),
        (pendulum.now().subtract(years=1, months=5).date(), "1 рік 5 місяців"),
    ],
)
def test_cat_age_property_ukrainian_pluralization(birth_date, expected_age):
    cat = CatProfile.objects.create(birth_date=birth_date)

    with allure.step("Check cat's age"):
        allure.attach(
            f"Expected response: {expected_age}",
            name="expected_response_cat_age",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert cat.age == expected_age
