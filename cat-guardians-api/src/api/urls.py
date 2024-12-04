from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("users.urls")),
    path("api/pets/", include("pets.urls")),
    path("api/adoption/", include("adoption.urls")),
    path("api/found-cat/", include("found_form.urls")),
    path("api/feedbacks/", include("feedback.urls")),
    *doc_urls,
]

if settings.DJANGO_DEV_TOOLS:
    urlpatterns = [
        *urlpatterns,
        path("__debug__/", include("debug_toolbar.urls")),
    ]
