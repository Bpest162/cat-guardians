from django.urls import path

from feedback import views

urlpatterns = [
    path("", views.FeedbackAPIList.as_view(), name="list_feedback"),
    path("<int:pk>/", views.FeedbackAPIRetrieve.as_view(), name="retrieve_feedback"),
    path("create/", views.FeedbackAPICreate.as_view(), name="create_feedback"),
    path("delete/<int:pk>/", views.FeedbackAPIDelete.as_view(), name="delete_feedback"),
]
