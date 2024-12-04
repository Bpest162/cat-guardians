from django.contrib import admin

from .models import CatBreed, CatColor, CatPhoto, CatProfile

admin.site.register(CatProfile)
admin.site.register(CatBreed)
admin.site.register(CatColor)
admin.site.register(CatPhoto)
