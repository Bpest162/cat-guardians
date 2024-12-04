import logging
import random

from django.conf import settings
from django.core.files import File
from django.core.management import BaseCommand
from faker import Faker
from retrying import retry

from pets.models import CatBreed, CatColor, CatPhoto, CatProfile
from utils.retrying_conf import retry_if_expectation_failed

CAT_QUANTITY = 18

CATS_DEFAULT_PHOTOS = [
    "default/images/cat_1.jpg",
    "default/images/cat_2.jpg",
    "default/images/cat_3.jpg",
    "default/images/cat_4.jpg",
]


class Command(BaseCommand):
    help = "Generate fake cat profiles to database"

    @retry(
        stop_max_attempt_number=settings.MAX_RETRY_ATTEMPTS,
        retry_on_exception=retry_if_expectation_failed,
        wait_fixed=settings.RETRY_WAIT_TIME,
    )
    def handle(self, *args, **options):
        fake = Faker()

        for _ in range(CAT_QUANTITY):
            color_obj, _ = CatColor.objects.get_or_create(name=random.choice(settings.BASIC_CAT_COLORS_LIST))  # nosec
            breed_obj, _ = CatBreed.objects.get_or_create(name=random.choice(settings.BASIC_CAT_BREEDS_LIST))  # nosec
            name = fake.name()
            gender = random.choice(settings.GENDER_CHOICES)[0]  # nosec
            birth_date = fake.date_between(start_date="-5y", end_date="-1m")
            requirements_for_owner = fake.sentence()
            preferences = fake.sentence()
            aversions = fake.sentence()

            cat = CatProfile.objects.create(
                name=name,
                gender=gender,
                birth_date=birth_date,
                color=color_obj,
                breed=breed_obj,
                bio=f"This a beautifull {color_obj.name} cat of {breed_obj} breed. Its name {name}. "
                f"It was born {birth_date}",
                requirements_for_owner=requirements_for_owner,
                preferences=preferences,
                aversions=aversions,
            )

            for photo_path in CATS_DEFAULT_PHOTOS:
                with open(photo_path, "rb") as photo_file:
                    photo = File(photo_file)
                    CatPhoto.objects.create(cat=cat, photo=photo)

        logging.info("Successfully generated cats profiles")
