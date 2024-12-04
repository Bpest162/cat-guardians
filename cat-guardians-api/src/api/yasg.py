from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Cats Guardian API",
        default_version="0.2.0a68",
        description="API for accessing and modifying APP data",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    # url="http://107.23.108.166/api/",  # noqa E501 add real url nginx or comment it for local
)

urlpatterns = [
    path("swagger.<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
]
