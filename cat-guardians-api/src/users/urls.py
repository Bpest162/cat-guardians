from django.urls import include, path

from users import views

crud = [
    path("", views.UserListAPIView.as_view(), name="user_list"),
    path("signup/", views.UserCreateAPIView.as_view(), name="signup"),
    path("delete/<int:pk>/", views.DeleteUserAPIView.as_view(), name="delete_user"),
    path("edit-profile/", views.UserEditView.as_view(), name="edit_profile"),
    path("change-password/", views.UserChangePasswordView.as_view(), name="change_password"),
    path("password-reset/", include("django_rest_passwordreset.urls", namespace="password_reset")),
]

auth = [
    path("login/", views.UserLoginView.as_view(), name="login"),
    path("logout/", views.UserLogoutView.as_view(), name="logout"),
    path("check-auth/", views.CheckLoginStatusView.as_view(), name="check_auth"),
]

google_oauth = [
    path("oauth/google", views.GoogleLoginApiView.as_view(), name="google_login"),
    path("oauth/google/redirect/", views.GoogleRedirectApiView.as_view(), name="google_login_redirect"),
    path("oauth/google/callback", views.GoogleCallbackApiView.as_view(), name="google_login_callback"),
]

urlpatterns = [] + crud + auth + google_oauth
