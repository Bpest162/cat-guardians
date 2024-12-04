import re
from datetime import datetime, timedelta, timezone

import allure
import pytest
from django.conf import settings
from itsdangerous import URLSafeSerializer

from adoption.services import update_decision_date
from users.services import _get_sessions_expiration_times, _get_signed_cookie, _get_user_data_from_request


@pytest.mark.django_db(transaction=True)
@pytest.mark.cookie
@allure.title("Test Get Signed Cookie")
def test_get_signed_cookie(create_user):
    user = create_user()
    secret_key = settings.SECRET_KEY
    salt = settings.SIGNED_COOKIE_USER_KEY

    data = {settings.SIGNED_COOKIE_USER_KEY: user.id}

    serializer = URLSafeSerializer(secret_key, salt=salt)
    expected_data = serializer.dumps(data)

    signed_data = _get_signed_cookie(user.id)

    expected_data = re.sub(r"\.[\w\-]+", "", expected_data)
    signed_data = re.sub(r"\.[\w\-]+", "", signed_data)

    with allure.step("Check signed cookie data"):
        allure.attach(
            f"Expected data: {expected_data}",
            name="expected_data",
            attachment_type=allure.attachment_type.TEXT,
        )
        allure.attach(
            f"Actual data: {signed_data}",
            name="actual_data",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert signed_data == expected_data


@pytest.mark.django_db(transaction=True)
@pytest.mark.parametrize(
    "email, password, remember_me, expected_none",
    [
        (
            pytest.lazy_fixture("test_email"),
            pytest.lazy_fixture("test_password"),
            False,
            False,
        ),
        (
            pytest.lazy_fixture("test_email"),
            pytest.lazy_fixture("test_password"),
            True,
            False,
        ),
        ("invalid_email", pytest.lazy_fixture("test_password"), True, True),
    ],
)
@allure.title("Test Get User Data from Request")
def test_get_user_data_from_request(email, password, remember_me, expected_none, create_user, test_password):
    user = create_user()
    test_data = {
        "email": email,
        "password": password,
    }
    if remember_me:
        test_data["rememberMe"] = remember_me

    res_user, res_remember_me = _get_user_data_from_request(test_data)

    with allure.step("Check user data from request"):
        allure.attach(f"Email: {email}", name="email", attachment_type=allure.attachment_type.TEXT)
        allure.attach(
            f"Password: {password}",
            name="password",
            attachment_type=allure.attachment_type.TEXT,
        )
        allure.attach(
            f"Remember Me: {remember_me}",
            name="remember_me",
            attachment_type=allure.attachment_type.TEXT,
        )

        if expected_none:
            assert res_user is None
            assert res_remember_me is None
        else:
            assert res_user == user
            assert res_remember_me == remember_me


@pytest.mark.parametrize(
    "remember_me, expected_none",
    [
        (True, False),
        (False, True),
    ],
)
@allure.title("Test Get Sessions Expiration Times")
def test_get_sessions_expiration_times(remember_me, expected_none):
    expected_session_expiration = timedelta(days=settings.SESSION_EXPIRATION_DAYS)
    expected_session_expiration_time = expected_cookie_expiration_time = (  # noqa: F841
        datetime.now(timezone.utc) + expected_session_expiration
    )

    session_expiration_time, cookie_expiration_time = _get_sessions_expiration_times(remember_me)

    with allure.step("Check sessions expiration times"):
        allure.attach(
            f"Remember Me: {remember_me}",
            name="remember_me",
            attachment_type=allure.attachment_type.TEXT,
        )

        if expected_none:
            assert not session_expiration_time
            assert cookie_expiration_time is None
        else:
            allure.attach(
                f"Session Expiration Time: {session_expiration_time}",
                name="session_expiration_time",
                attachment_type=allure.attachment_type.TEXT,
            )
            allure.attach(
                f"Cookie Expiration Time: {cookie_expiration_time}",
                name="cookie_expiration_time",
                attachment_type=allure.attachment_type.TEXT,
            )

            assert session_expiration_time.replace(microsecond=0) == expected_session_expiration_time.replace(
                microsecond=0
            )
            assert cookie_expiration_time.replace(microsecond=0) == expected_cookie_expiration_time.replace(
                microsecond=0
            )


@pytest.mark.django_db(transaction=True)
@allure.title("Test Update Adoption Decision Date")
def test_update_adoption_decision_date(create_adoption):
    adoption = create_adoption()
    new_status = "approved"
    update_decision_date(adoption, new_status)

    with allure.step("Update Adoption Decision Date With Approved Status"):
        allure.attach(
            "Decision date: not None",
            name="update_decision_date",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.decision_date is not None

    new_status = "pending"
    update_decision_date(adoption, new_status)

    with allure.step("Update Adoption Decision Date With Pending Status"):
        allure.attach(
            "Decision date: None",
            name="update_decision_date",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.decision_date is None

    new_status = "rejected"
    update_decision_date(adoption, new_status)

    with allure.step("Update Adoption Decision Date With Rejected Status"):
        allure.attach(
            "Decision date: not None",
            name="update_decision_date",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.decision_date is not None


@pytest.mark.django_db(transaction=True)
@allure.title("Test Update Adoption Decision Date With The Same Statuses")
def test_update_adoption_decision_date_same_statuses(create_adoption):
    adoption = create_adoption(status="approved")
    decision_date = datetime.now()
    adoption.decision_date = decision_date
    same_status = "approved"
    update_decision_date(adoption, same_status)

    with allure.step("Update Adoption Decision Date With The Same Statuses"):
        allure.attach(
            f"Decision date: {decision_date}",
            name="update_decision_date",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert adoption.decision_date == decision_date
