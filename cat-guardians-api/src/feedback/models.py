from django.db import models

from users.models import CustomUser


class Feedback(models.Model):
    """
    Model representing user feedback.

    Attributes:
        user (CustomUser): The user who provided the feedback.
        text (TextField): The actual feedback text provided by the user.
        creation_time (DateTimeField): The timestamp when the feedback was created.
    """

    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    text = models.TextField(blank=False, max_length=255)
    creation_time = models.DateTimeField(auto_now_add=True)
