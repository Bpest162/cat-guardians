from django.urls import path

from . import views

urlpatterns = [
    path("", views.FormListAPIView.as_view(), name="form_list"),
    path("<int:pk>/", views.FormDetailAPIView.as_view(), name="form_detail"),
    path("create/", views.FormCreateAPIView.as_view(), name="form_create"),
    path("delete/<int:pk>/", views.FormDeleteAPIView.as_view(), name="form_delete"),
    path("edit/<int:pk>/", views.FormEditAPIview.as_view(), name="form_edit"),
]
