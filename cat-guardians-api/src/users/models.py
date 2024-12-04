from django.contrib.auth.models import AbstractUser
from django.db import models


class LowercaseEmailField(models.EmailField):
    """
    A custom EmailField that converts email addresses to lowercase.
    """

    def get_prep_value(self, value):
        return value.lower()


class CustomUser(AbstractUser):
    """CustomUser is a Django model subclassing AbstractUser, it overrides the email field
    to make it unique and non-nullable, and the username field is set to match the email.

    The model has a property `full_name` that concatenates `first_name` and `last_name`,
    and a setter for `full_name` that splits a name into `first_name` and `last_name` by last space ' '.

    Attributes:
        email (LowercaseEmailField): A field that stores the user's email. It is unique and non-nullable.
        first_name (CharField): Inherited from AbstractUser. A character field that stores the user's first name.
        last_name (CharField): Inherited from AbstractUser. A character field that stores the user's last name.
        password (CharField): Inherited from AbstractUser. A character field that stores the user's hashed password.
        username (CharField): Inherited from AbstractUser. In this model, it's same as email.

    Methods:
        full_name: Returns the full name.
        full_name (setter): Splits the full name into first name and last name by last space ' '.
        save: Save method overridden to enforce username to be the same as email.
    """

    email = LowercaseEmailField(unique=True, blank=False, null=False)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @full_name.setter
    def full_name(self, name):
        if not name:
            raise ValueError("Full name cannot be empty.")

        name_parts = name.rsplit(" ", 1)
        if len(name_parts) == 2:
            self.first_name, self.last_name = name_parts
        else:
            self.first_name = name.strip()
            self.last_name = ""

    def save(self, *args, **kwargs):
        self.username = self.email
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
