import uuid

from django.conf import settings
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from users.models import CustomUser


# Set a path for found cat photo upload
def catphoto_directory_path(instance, filename):
    return f'{settings.FOUND_CAT_PHOTO}/{instance.id}/{uuid.uuid4()}.{filename.split(".")[-1]}'


class FoundCat(models.Model):
    """
    Model representing a found cat application.

    Attributes:
        description (TextField): A description of the found cat. Can be blank.
        address (CharField): The address where the cat was found.
        photo (ImageField): A photo of the found cat. Can be blank.
            For deleting old photo on S3 django signals are used.
        user (ForeignKey): A relationship with the CustomUser model, information about the user who
          found the cat.
        created_at (DateField): The date and time when the application was created.
        status (CharField): The status of the application, chosen from predefined choices.
        phone_number (PhoneNumber): The phone number associated with the application.

    Methods:
        __str__(): Returns a string representation of the application.
    """

    description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=settings.ADDRESS_FIELD_LENGTH)
    photo = models.ImageField(upload_to=catphoto_directory_path, blank=True, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2, choices=settings.FORM_STATUS_CHOICES, default="NW")
    phone_number = PhoneNumberField(region="UA", null=False, blank=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Application №{self.pk}, status:{self.status}"

    def save(self, *args, **kwargs):
        """ "
        Overriding the save method to get the id of the object, which is needed for the path of the photo.
        """
        if self.pk is None and self.photo:
            saved_photo = self.photo
            self.photo = None
            super().save(*args, **kwargs)
            self.photo = saved_photo

            kwargs.pop("force_insert", None)

        return super().save(*args, **kwargs)
