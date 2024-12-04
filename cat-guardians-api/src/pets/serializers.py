from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from .models import CatBreed, CatColor, CatPhoto, CatProfile


class CatColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatColor
        fields = ("name",)


class CatBreedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatBreed
        fields = ("name",)


class CaseInsensitiveSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().get(**{self.slug_field + "__iexact": data})
        except ObjectDoesNotExist:
            self.fail("does_not_exist", slug_name=self.slug_field, value=str(data))
        except (TypeError, ValueError):
            self.fail("invalid")


class CatPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatPhoto
        fields = ("photo",)

    def to_representation(self, instance):
        """Return the list photo's urls for the cat profile."""
        return instance.photo.url


class CatProfileSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    color = CaseInsensitiveSlugRelatedField(slug_field="name", queryset=CatColor.objects.all(), allow_null=True)
    breed = CaseInsensitiveSlugRelatedField(slug_field="name", queryset=CatBreed.objects.all(), allow_null=True)
    photos = CatPhotoSerializer(many=True)

    class Meta:
        model = CatProfile
        fields = "__all__"
