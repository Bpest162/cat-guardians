import allure
import pytest
from django.conf import settings

from pets.management.commands import colors_and_breeds_to_db
from pets.models import CatBreed, CatColor


@pytest.mark.django_db(transaction=True)
@allure.title("Test colors_and_breeds_to_db command")
def test_colors_and_breeds_to_db_command():
    colors_qty = len(settings.BASIC_CAT_COLORS_LIST)
    breeds_qty = len(settings.BASIC_CAT_BREEDS_LIST)

    command = colors_and_breeds_to_db.Command()
    command.handle()

    with allure.step("Check colors count"):
        allure.attach(
            f"Expected response: {colors_qty}",
            name="expected_response_colors_qty",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert CatColor.objects.all().count() == colors_qty

    with allure.step("Check breeds count"):
        allure.attach(
            f"Expected response: {breeds_qty}",
            name="expected_response_breeds_qty",
            attachment_type=allure.attachment_type.TEXT,
        )
    assert CatBreed.objects.all().count() == breeds_qty
