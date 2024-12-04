import os

import allure
import pytest
from environ import Env

from core.database_conf import get_database_configuration


@pytest.fixture
def get_env() -> Env:
    env = Env(
        POSTGRES_DB=(str, "example_db"),
        POSTGRES_USER=(str, "example_user"),
        POSTGRES_PASSWORD=(str, "example_password"),
    )
    return env


@allure.title("Test Database Configuration Returns Local Configuration")
def test_database_conf_returns_local_config(get_env):
    with allure.step("Set environment as `localhost`"):
        os.environ["ENVIRONMENT"] = "localhost"
    conf = get_database_configuration(get_env)
    with allure.step("Check if config fields are the same as environment variables"):
        assert conf["default"]["HOST"] == "localhost"
        assert conf["default"]["NAME"] == get_env.str("POSTGRES_DB")
        assert conf["default"]["USER"] == get_env.str("POSTGRES_USER")
        assert conf["default"]["PASSWORD"] == get_env.str("POSTGRES_PASSWORD")


@allure.title("Test Database Configuration Returns Docker Configuration")
def test_database_conf_returns_docker_config(get_env):
    with allure.step("Set environment as `docker`"):
        os.environ["ENVIRONMENT"] = "docker"
    conf = get_database_configuration(get_env)
    with allure.step("Check if config fields are the same as environment variables and host is `postgres_container`"):
        assert conf["default"]["HOST"] == "postgres_container"
        assert conf["default"]["NAME"] == get_env.str("POSTGRES_DB")
        assert conf["default"]["USER"] == get_env.str("POSTGRES_USER")
        assert conf["default"]["PASSWORD"] == get_env.str("POSTGRES_PASSWORD")


@allure.title("Test Database Configuration Returns Gitlab CI Configuration")
def test_database_conf_returns_gitlab_ci_configuration(get_env):
    with allure.step("Set environment as `gitlab-ci`"):
        os.environ["ENVIRONMENT"] = "gitlab-ci"
        os.environ["POSTGRES_HOST"] = "host"
    conf = get_database_configuration(get_env)
    with allure.step("Check if config fields are the same as environment variables and host is `gitlab_ci`"):
        assert conf["default"]["HOST"] == get_env.str("POSTGRES_HOST")
        assert conf["default"]["NAME"] == get_env.str("POSTGRES_DB")
        assert conf["default"]["USER"] == get_env.str("POSTGRES_USER")
        assert conf["default"]["PASSWORD"] == get_env.str("POSTGRES_PASSWORD")
