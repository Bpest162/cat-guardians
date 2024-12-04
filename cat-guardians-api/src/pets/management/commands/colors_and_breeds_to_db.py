from django.conf import settings
from django.core.management import BaseCommand, CommandError
from django.db import OperationalError, connection

from pets.models import CatBreed, CatColor


def create_color_objects():
    created_count = 0
    for color in settings.BASIC_CAT_COLORS_LIST:
        color_obj, created = CatColor.objects.get_or_create(name=color)
        if created:
            created_count += 1
    return created_count


def create_breed_objects():
    created_count = 0
    for breed in settings.BASIC_CAT_BREEDS_LIST:
        color_obj, created = CatBreed.objects.get_or_create(name=breed)
        if created:
            created_count += 1
    return created_count


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                cursor.fetchone()
        except OperationalError as e:
            raise CommandError("No access to the database: ", str(e))
        colors_count = create_color_objects()
        breeds_count = create_breed_objects()
        self.stderr.write(
            self.style.SUCCESS(f"{colors_count} CatColors created... \n{breeds_count} CatBreeds created...")
        )
