from django.urls import path

from adoption import views

urlpatterns = [
    path("", views.ListAdoptionAPIView.as_view(), name="list_adoption"),
    path("<int:pk>/", views.DetailAdoptionAPIView.as_view(), name="adoption_detail"),
    path("user/<int:pk>/", views.UserListAdoptionAPIView.as_view(), name="user_adoption"),
    path("create/", views.CreateAdoptionAPIView.as_view(), name="create_adoption"),
    path("edit/<int:pk>/", views.EditAdoptionAPIview.as_view(), name="edit_adoption"),
    path("delete/<int:pk>/", views.DeleteAdoptionAPIView.as_view(), name="delete_adoption"),
]
