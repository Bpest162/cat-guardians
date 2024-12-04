import os
from pathlib import Path

from environ import Env

from core.database_conf import get_database_configuration
from core.dev_tools_conf import get_dev_tools_configuration
from core.logger import ConfigLogger

from .settings_local import *  # noqa: F403

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env = Env()
env_file_path = os.path.join(BASE_DIR, "../.env")
if os.path.exists(env_file_path):
    env.read_env(env_file=env_file_path)

# SECURITY WARNING: set DEBUG to True only for development
DEBUG = env.bool("DEBUG", default=False)

SECRET_KEY = env.str("SECRET_KEY", default="django-insecure-for-testing-jcj^k0a-(q=jx@uhxtk4-)+$)qwo4ieg_8id+j0")

# Application  definition

INTERNAL_IPS = [
    "127.0.0.1",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third party apps
    "rest_framework",
    "django_rest_passwordreset",
    "drf_yasg",
    "corsheaders",
    "phonenumber_field",
    "django_filters",
    "storages",
    # core apps
    "users",
    "pets",
    "adoption",
    "found_form",
    "feedback",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

DJANGO_DEV_TOOLS = get_dev_tools_configuration(env)

if DJANGO_DEV_TOOLS:
    INSTALLED_APPS = [
        *INSTALLED_APPS,
        "django_extensions",
        "debug_toolbar",
    ]
    MIDDLEWARE = [
        "debug_toolbar.middleware.DebugToolbarMiddleware",
        *MIDDLEWARE,
    ]

ROOT_URLCONF = "api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR,
            "templates/",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "api.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# # For sqlite3
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

DATABASES = get_database_configuration(env)

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGES = [
    ("en", "English"),
    ("uk-ua", "Ukrainian"),
]
USE_I18N = True

LOCALE_PATHS = [
    os.path.join(BASE_DIR, "locale"),
]

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

#  AWS S3 storage
FOUND_CAT_PHOTO = env.str("FOUND_CAT_PHOTO", default="found_cats")
CAT_PROFILE_PHOTO = env.str("CAT_PROFILE_PHOTO", default="photos")
AWS_S3_ACCESS_KEY_ID = env.str("AWS_S3_ACCESS_KEY_ID")
AWS_S3_SECRET_ACCESS_KEY = env.str("AWS_S3_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = env.str("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = env.str("AWS_S3_REGION_NAME")
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION_NAME}.amazonaws.com"
AWS_S3_OBJECT_PARAMETERS = {
    "CacheControl": "max-age=86400",
}
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": PAGINATION_PAGE_SIZE,  # noqa: F405
    "DEFAULT_AUTHENTICATION_CLASSES": ["users.auth.CustomAuthentication"],
    "EXCEPTION_HANDLER": "users.utils.custom_exception_handler",
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}


AUTH_USER_MODEL = "users.CustomUser"

DOMAIN = env.str("DOMAIN", default="")

CSRF_TRUSTED_ORIGINS = [f"https://{DOMAIN}"]


LOGGER_CONFIG = ConfigLogger()
LOGGER_CONFIG.configure_logger()

# Email Backend Configuration
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env.str("EMAIL_HOST_PASSWORD", default="")

# Google config
BASE_URL = env.str("BASE_URL", default="")
GOOGLE_OAUTH2_CLIENT_ID = env.str("GOOGLE_OAUTH2_CLIENT_ID", default="")
GOOGLE_OAUTH2_CLIENT_SECRET = env.str("GOOGLE_OAUTH2_CLIENT_SECRET", default="")
GOOGLE_ID_TOKEN_INFO_URL = env.str("GOOGLE_ID_TOKEN_INFO_URL", default="")
GOOGLE_ACCESS_TOKEN_OBTAIN_URL = env.str("GOOGLE_ACCESS_TOKEN_OBTAIN_URL", default="")
GOOGLE_USER_INFO_URL = env.str("GOOGLE_USER_INFO_URL", default="")
GOOGLE_AUTH_URL = env.str("GOOGLE_AUTH_URL", default="")
GOOGLE_SCOPE_EMAIL = env.str("GOOGLE_SCOPE_EMAIL", default="")
GOOGLE_SCOPE_PROFILE = env.str("GOOGLE_SCOPE_PROFILE", default="")
