from django.apps import AppConfig


class FoundFormConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "found_form"

    def ready(self):
        import found_form.signals  # noqa: F401
