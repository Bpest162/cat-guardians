import uuid

import pendulum
from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.translation import ngettext


# set a path for cat photos in CatPhoto model "/{cat_id}/uuid." + photo.name
def catphoto_directory_path(instance, filename):
    return f'{settings.CAT_PROFILE_PHOTO}/{instance.cat.id}/{uuid.uuid4()}.{filename.split(".")[-1]}'


class CatProfile(models.Model):
    """
    Model representing a cat profile.

    Attributes:
        name (CharField): The name of the cat.
        gender (CharField): The gender of the cat, chosen from predefined choices.
        birth_date (DateField): The birth date of the cat.
        color (ForeignKey): A relationship with the CatColor model, information about the cat's color'.
        breed (ForeignKey): A relationship with the CatBreed model, information about the cat's breed'.
        bio (TextField): A biography of the cat.
        requirements_for_owner (TextField): Requirements for the cat's owner.
        preferences (TextField): Preferences of the cat.
        aversions (TextField): Aversions of the cat.
        likes (ManyToManyField): A relationship with the CustomUser model, information about the users who liked the
         cat'.
        adoption_requests (ForeignKey): A relationship with the AdoptionRequest model, information adoption requests
         pytrelated to the cat'
        donations (QuerySet): A relationship with the Payment model, information payments related to the cat'

    Properties:
        age (str): The age of the cat.

    Methods:
        add_like(user): Adds a user to the list of users who liked the cat.
        remove_like(user): Removes a user from the list of users who liked the cat.
        __str__(): Returns a string representation of the cat profile.
    """

    name = models.CharField(max_length=100, blank=False)
    gender = models.CharField(max_length=1, choices=settings.GENDER_CHOICES)
    birth_date = models.DateField(null=True, default=None)
    color = models.ForeignKey("CatColor", on_delete=models.SET_NULL, null=True)
    breed = models.ForeignKey("CatBreed", on_delete=models.SET_NULL, null=True)
    bio = models.TextField(blank=True)
    requirements_for_owner = models.TextField(blank=True)
    preferences = models.TextField(blank=True)
    aversions = models.TextField(blank=True)
    likes = models.ManyToManyField("users.CustomUser", related_name="liked_cats", blank=True)

    # adoption_requests = "relation with AdoptionRequest model " # TODO: create AdoptionRequest model

    class Meta:
        ordering = ["id"]

    @property
    def age(self):
        """
        Calculates the age of the cat based on its birthdate. By default, the age is returned in ukrainian language.
        For getting the age in english, client should make request with 'Accept-Language: en' header.

        Returns:
            str: The age of the cat.
        """

        if self.birth_date is None:
            return None

        birth_date = pendulum.date(self.birth_date.year, self.birth_date.month, self.birth_date.day)
        today = pendulum.today()

        age_diff = birth_date.diff(today)

        years = age_diff.years
        months = age_diff.months

        years_plural = ngettext("%(years)d year", "%(years)d years", years) % {"years": years}
        months_plural = ngettext("%(months)d month", "%(months)d months", months) % {"months": months}

        years_str = f"{years_plural} " if years else ""
        months_str = f"{months_plural}" if months else ""

        if age := years_str + months_str:
            return age
        else:
            return _("less than 1 month")

    def add_like(self, user):
        """
        Adds a user to the list of users who liked the cat.

        Args:
            user (CustomUser): The user to add.

        Returns:
            bool: True if the user has added 'like', False - if user had done already it before.
        """

        if self.likes.filter(id=user.id).exists():
            return False
        self.likes.add(user)
        return True

    def remove_like(self, user):
        """
        Removes a user from the list of users who liked the cat.

        Args:
            user (CustomUser): The user to remove.

        Returns:
            bool: True if the user has removed 'like' successfully, False otherwise.
        """
        if not self.likes.filter(id=user.id).exists():
            return False
        self.likes.remove(user)
        return True

    def __str__(self):
        """
        Returns a string representation of the cat profile.

        Returns:
            str: The string representation of the cat profile.
        """
        return f"{self.name}, {self.age}"


class CatPhoto(models.Model):
    cat = models.ForeignKey(CatProfile, on_delete=models.CASCADE, related_name="photos")
    photo = models.ImageField(upload_to=catphoto_directory_path)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.cat.name}/ photo-{self.id}: {self.photo.name}]"


class CatColor(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class CatBreed(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
