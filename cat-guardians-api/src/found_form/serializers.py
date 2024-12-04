from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from users.models import CustomUser

from .models import FoundCat


class FormCreateSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(region="UA")

    class Meta:
        model = FoundCat
        fields = ["description", "address", "phone_number", "photo"]


class UserFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "full_name"]


class FormListSerializer(serializers.ModelSerializer):
    user = UserFieldSerializer()

    class Meta:
        model = FoundCat
        fields = "__all__"


class FormEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundCat
        fields = ["status"]
        partial = True
