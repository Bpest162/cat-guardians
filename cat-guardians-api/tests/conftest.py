import random
import uuid

import pendulum
import pytest
from django.conf import settings
from django.db import DatabaseError
from faker import Faker
from rest_framework.mixins import UpdateModelMixin
from rest_framework.reverse import reverse
from rest_framework.test import APIClient

from adoption.models import Adoption
from found_form.models import FoundCat
from pets.models import CatBreed, CatColor, CatProfile
from users.models import CustomUser

"""
Fixtures
"""


@pytest.fixture(scope="session")
def image_file():
    with open("tests/fixtures/images/test_cat.jpeg", "rb") as file:
        yield file


@pytest.fixture(scope="session")
def test_password():
    return "test_password"


@pytest.fixture(scope="session")
def test_email():
    return str(uuid.uuid4()) + "@example.com"


@pytest.fixture(scope="session")
def test_full_name():
    return "Full Name"


@pytest.fixture(scope="session")
def api_client():
    return APIClient()


@pytest.fixture
def get_signed_cookie():
    return {settings.SIGNED_COOKIE_NAME: "mocked_cookie_value"}


@pytest.fixture
def fill_users(django_user_model):
    def create_users(users_number: int = 10):
        fake = Faker()
        created_users = 0
        for _ in range(users_number):
            email = fake.unique.email()
            django_user_model.objects.create(full_name=fake.name(), email=email, password=fake.password())
            created_users += 1
        return created_users

    return create_users


@pytest.fixture
def create_user(django_user_model, test_password, test_email):
    def make_user(**kwargs):
        kwargs["password"] = test_password
        if "email" not in kwargs:
            kwargs["email"] = test_email
        if "username" not in kwargs:
            kwargs["username"] = str(uuid.uuid4())
        return django_user_model.objects.create_user(**kwargs)

    return make_user


@pytest.fixture
def fill_cats():
    def create_cats(cats_number: int = 10):
        fake = Faker()
        created_cats = 0
        for _ in range(cats_number):
            name = fake.name()
            gender = random.choice(settings.GENDER_CHOICES)[0]
            birth_date = fake.date_between(start_date="-5y", end_date="today")
            color = CatColor.objects.order_by("?").first()
            breed = CatBreed.objects.order_by("?").first()
            bio = (fake.text(),)
            requirements_for_owner = (fake.text(),)
            preferences = (fake.text(),)
            aversions = fake.text()
            CatProfile.objects.create(
                name=name,
                gender=gender,
                birth_date=birth_date,
                color=color,
                breed=breed,
                bio=bio,
                requirements_for_owner=requirements_for_owner,
                preferences=preferences,
                aversions=aversions,
            )
            created_cats += 1
        return created_cats

    return create_cats


@pytest.fixture
def create_cat():
    def make_cat(**kwargs):
        if "name" not in kwargs:
            kwargs["name"] = str(uuid.uuid4())

        if "birth_date" in kwargs and isinstance(kwargs["birth_date"], str):
            kwargs["birth_date"] = pendulum.parse(kwargs["birth_date"]).date()

        return CatProfile.objects.create(**kwargs)

    return make_cat


@pytest.fixture
def auto_login_user(api_client, create_user, test_password):
    def make_auto_login(user=None):
        if user is None:
            user = create_user()
        url = reverse("login")
        data = {"email": user.email, "password": test_password}
        response = api_client.post(url, data=data)
        assert response.status_code == 200
        return api_client, user

    return make_auto_login


@pytest.fixture
def sample_cat_color():
    return CatColor.objects.get_or_create(name="White")[0]


@pytest.fixture
def sample_cat_breed():
    return CatBreed.objects.get_or_create(name="Mixed-Breed")[0]


@pytest.fixture
def get_cat_age():
    def calculate_age(cat: CatProfile) -> str:
        today = pendulum.today()

        birth_date = pendulum.date(cat.birth_date.year, cat.birth_date.month, cat.birth_date.day)
        age_diff = birth_date.diff(today)

        years = age_diff.years
        months = age_diff.months

        years_plural = "year" if years == 1 else "years"
        months_plural = "month" if months == 1 else "months"

        years_str = f"{years} {years_plural} " if years else ""
        months_str = f"{months} {months_plural}" if months else ""

        return years_str + months_str

    return calculate_age


@pytest.fixture(scope="session")
def test_phone_number():
    return "+380671111111"


@pytest.fixture(scope="session")
def test_change_phone_number():
    return "+380672222222"


@pytest.fixture(scope="session")
def test_phone_number_invalid():
    return "+38067111111111"


@pytest.fixture
def create_adoption(create_user, create_cat, test_phone_number, status="pending"):
    def make_adoption(user=None, cat=None, phone_number=None, notes=None, status=status):
        if user is None:
            user = create_user()
        if cat is None:
            cat = create_cat()
        if phone_number is None:
            phone_number = test_phone_number
        if notes is None:
            notes = "Test notes"
        return Adoption.objects.create(user=user, cat=cat, phone_number=phone_number, notes=notes, status=status)

    return make_adoption


@pytest.fixture
def fill_adoptions(create_adoption, fill_users, fill_cats):
    def make_adoptions(adoptions_number: int = 10):
        fake = Faker()
        fill_users(adoptions_number)
        fill_cats(adoptions_number)

        notes = []
        for note in range(adoptions_number):
            note = fake.text()
            notes.append(note)

        users = CustomUser.objects.all()
        cats = CatProfile.objects.all()

        for _ in range(adoptions_number):
            user = random.choice(users)
            cat = random.choice(cats)
            notes = random.choice(notes)
            create_adoption(user=user, cat=cat, notes=notes)

    return make_adoptions


@pytest.fixture(scope="session")
def test_address():
    return "Test Address 99"


@pytest.fixture
def create_found_form(test_phone_number, test_address):
    def make_found_form(phone_number=None, address=None, description="", status="NW"):
        faker = Faker("uk_UA")
        if phone_number is None:
            phone_number = faker.phone_number()
        if address is None:
            address = faker.address()
        return FoundCat.objects.create(
            phone_number=phone_number, address=address, description=description, status=status
        )

    return make_found_form


@pytest.fixture
def fill_found_forms(create_found_form):
    def make_found_forms(forms_amount=5):
        for _ in range(forms_amount):
            create_found_form()

    return make_found_forms


"""
Mockers
"""


@pytest.fixture
def mocked_delete_fail_user_model(mocker):
    def mocked_delete_method(using=None, keep_parents=False):
        return 0, {}

    mocker.patch("users.models.CustomUser.delete", side_effect=mocked_delete_method)


@pytest.fixture
def mock_set_password_fail(mocker):
    mocker.patch("users.models.CustomUser.set_password", side_effect=DatabaseError("Database is not available"))


@pytest.fixture
def mock_perform_update_fail(mocker):
    mocker.patch.object(UpdateModelMixin, "perform_update", side_effect=DatabaseError("Database is not available"))


@pytest.fixture
def mock_create_adoption_failed(mocker):
    mocker.patch("adoption.models.Adoption.objects.create", side_effect=DatabaseError("Database is not available"))


@pytest.fixture
def mock_get_object_fail_adoption(mocker):
    mocker.patch(
        "adoption.views.DetailAdoptionAPIView.get_object", side_effect=DatabaseError("Database is not available")
    )


@pytest.fixture
def mock_delete_fail_adoption(mocker):
    mocker.patch("adoption.models.Adoption.delete", side_effect=DatabaseError("Database is not available"))


@pytest.fixture
def mock_edit_fail_adoption(mocker):
    mocker.patch(
        "adoption.views.EditAdoptionAPIview.get_object", side_effect=DatabaseError("Database is not available")
    )


@pytest.fixture
def mock_create_found_form_fail(mocker):
    mocker.patch("found_form.models.FoundCat.objects.create", side_effect=DatabaseError("Database is not available"))


@pytest.fixture
def mock_delete_found_form_fail(mocker):
    mocker.patch("found_form.models.FoundCat.delete", side_effect=DatabaseError("Database is not available"))
