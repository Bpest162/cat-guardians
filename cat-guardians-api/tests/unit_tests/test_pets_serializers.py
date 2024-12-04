import datetime

import allure
import pytest
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from api.settings import GENDER_CHOICES
from pets.models import CatBreed, CatColor, CatPhoto, CatProfile
from pets.serializers import (
    CaseInsensitiveSlugRelatedField,
    CatBreedSerializer,
    CatColorSerializer,
    CatProfileSerializer,
)

IMAGE_FILE = "tests/fixtures/images/test_cat.jpeg"


@pytest.fixture
def mock_queryset(mocker):
    return mocker.Mock()


@pytest.fixture
def serializer_field(mock_queryset):
    return CaseInsensitiveSlugRelatedField(queryset=mock_queryset, slug_field="slug_field")


@allure.title("Test serializer field Case Insensitive Slug Related Field Raises Exception when DoesNotExist")
def test_internal_insensitive_field_doesnt_exist(serializer_field, mock_queryset):
    mock_queryset.get.side_effect = ObjectDoesNotExist()

    with pytest.raises(serializers.ValidationError):
        serializer_field.to_internal_value("test-slug")


@allure.title("Test serializer field Case Insensitive Slug Related Field Raises Exception when invalid")
def test_internal_insensitive_field_invalid(serializer_field, mock_queryset):
    mock_queryset.get.side_effect = (TypeError, ValueError)

    with pytest.raises(serializers.ValidationError):
        serializer_field.to_internal_value("invalid-slug")


@allure.title("Test serializer field Case Insensitive Slug Related Field Returns Instance")
def test_internal_insensitive_field_valid(serializer_field, mock_queryset):
    expected_instance = mock_queryset.get.return_value
    instance = serializer_field.to_internal_value("slug-field")

    assert instance == expected_instance


@allure.title("Test Cat Color Serializer Returns Valid Fields")
def test_cat_color_serializer_valid():
    cat_color = CatColor(name="ginger")
    serializer = CatColorSerializer(cat_color)
    assert serializer.data.get("name") == "ginger"


@allure.title("Test Cat Breed Serializer Returns Valid Fields")
def test_cat_breed_serializer_valid():
    cat_breed = CatBreed(name="tabby")
    serializer = CatBreedSerializer(cat_breed)
    assert serializer.data.get("name") == "tabby"


@allure.title("Test Cat Profile Serializer Returns Valid Fields")
@pytest.mark.django_db
def test_cat_profile_serializer_valid():
    cat_color = CatColor(name="ginger")
    cat_breed = CatBreed(name="tabby")
    with allure.step("Initializing fields"):
        fields = {
            "id": 1,
            "name": "name",
            "gender": GENDER_CHOICES[0],
            "birth_date": datetime.date(2024, 1, 1),
            "color": cat_color,
            "breed": cat_breed,
            "bio": "bio",
            "requirements_for_owner": "reqs",
            "preferences": "preferences",
            "aversions": "aversions",
        }
    cat_profile = CatProfile(**fields)
    serializer = CatProfileSerializer(cat_profile)
    with allure.step("Preparing fields for comparison"):
        serializer_fields_copy = serializer.data.copy()
        with allure.step("Changing some fields as they were serialized"):
            del serializer_fields_copy["age"]
            fields["likes"] = []
            fields["color"] = fields["color"].name
            fields["breed"] = fields["breed"].name
            fields["birth_date"] = fields["birth_date"].strftime("%Y-%m-%d")
            fields["photos"] = []
    with allure.step("Comparing fields in a loop"):
        for key, value in serializer_fields_copy.items():
            assert value == fields[key]


@pytest.mark.django_db(transaction=True)
@allure.title("Test Cat Profile Serializer Returns Field 'photos' as List of Urls")
def test_cat_profile_serializer_photos_as_list(sample_cat_breed, sample_cat_color):
    cat_profile = CatProfile.objects.create(name="Dobby", gender="M", color=sample_cat_color, breed=sample_cat_breed)
    cat_photo = CatPhoto.objects.create(photo=IMAGE_FILE, cat=cat_profile)
    serializer = CatProfileSerializer(cat_profile)
    with allure.step("Checking if the field 'photos' returns a list of urls"):
        assert isinstance(serializer.data["photos"], list)
        assert serializer.data["photos"][0] == cat_photo.photo.url
