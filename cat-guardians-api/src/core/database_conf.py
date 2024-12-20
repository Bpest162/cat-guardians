import os


def get_database_configuration(env):
    """
    This function returns the configuration for the database
    """

    # Localhost postgres
    database_local = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env.str("POSTGRES_DB", default=""),
            "USER": env.str("POSTGRES_USER", default=""),
            "PASSWORD": env.str("POSTGRES_PASSWORD", default=""),
            "HOST": "localhost",
            "PORT": "5432",
        }
    }

    # Docker postgres
    database_docker = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env.str("POSTGRES_DB", default=""),
            "USER": env.str("POSTGRES_USER", default=""),
            "PASSWORD": env.str("POSTGRES_PASSWORD", default=""),
            "HOST": "postgres_container",
            "PORT": "5432",
        }
    }

    # GitLab CI postgres
    database_gitlab_ci = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
            "HOST": os.getenv("POSTGRES_HOST"),
            "PORT": "5432",
        }
    }

    if os.getenv("ENVIRONMENT") == "docker":
        return database_docker
    elif os.getenv("ENVIRONMENT") == "gitlab-ci":
        return database_gitlab_ci
    else:
        return database_local
