from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import CatBreedViewSet, CatColorViewSet

router = DefaultRouter()
router.register(r"cat_colors", CatColorViewSet, basename="cat_color")
router.register(r"cat_breeds", CatBreedViewSet, basename="cat_breed")

cat_crud = [
    path("", views.CatListAPIView.as_view(), name="cat_list"),
    path("<int:pk>/", views.CatDetailAPIView.as_view(), name="cat_detail"),
    path("create/", views.CatCreateAPIView.as_view(), name="cat_create"),
    path("delete/<int:pk>", views.CatDeleteAPIView.as_view(), name="cat_delete"),
    path("edit/<int:pk>", views.CatUpdateAPIView.as_view(), name="cat_edit"),
    path("like/<int:pk>", views.CatAddRemoveLike.as_view(), name="cat_add_like"),
]

urlpatterns = cat_crud + router.urls
