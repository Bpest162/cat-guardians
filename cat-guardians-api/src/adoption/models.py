from django.conf import settings
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from pets.models import CatProfile
from users.models import CustomUser


class Adoption(models.Model):
    """Model for recording the cat adoption process.

    This model contains information about requests for cat adoptions, including details about the cats,
    users, and adoption status.

    Attributes:
        - cat (ForeignKey): A relationship with the CatProfile model, information about the cat being adopted.
        - user (ForeignKey): A relationship with the CustomUser model, information about the user making the
          adoption request.
        - request_date (DateField): The date when the adoption request was made (set automatically).
        - decision_date (DateField): The date of the adoption decision (initially empty).
        - phone_number (PhoneNumberField): The user's phone number with the region set to "UA" (Ukraine).
        - status (CharField): The adoption status (default is "pending", with choices from "pending", "rejected",
          "approved", "completed").
        - notes (TextField): Notes or comments about the adoption process (initially empty).
    """

    cat = models.ForeignKey(CatProfile, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    request_date = models.DateField(auto_now_add=True)
    decision_date = models.DateField(null=True, blank=True)
    phone_number = PhoneNumberField(max_length=50, region="UA")
    status = models.CharField(max_length=10, default="pending", choices=settings.ADOPTION_STATUS_CHOICES)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Cat: {self.cat.name}; Adopter: {self.user}; Status: {self.status}; {self.request_date}"
