from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from .models import Adoption


class CreateAdoptionSerializer(serializers.ModelSerializer):
    id_cat = serializers.CharField(required=True)
    phone_number = PhoneNumberField(region="UA", required=True)

    class Meta:
        model = Adoption
        fields = ["id", "phone_number", "notes", "id_cat"]


class ListAdoptionSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    cat = serializers.StringRelatedField()

    class Meta:
        model = Adoption
        fields = "__all__"


class AdoptionEditSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region="UA")

    class Meta:
        model = Adoption
        fields = ["id", "phone_number", "notes", "status"]
        partial = True
