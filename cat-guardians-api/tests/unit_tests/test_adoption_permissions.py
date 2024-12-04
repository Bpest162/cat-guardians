import allure
import pytest
from django.test import RequestFactory

from src.adoption.adoption_permission import (
    CustomForbiddenException,
    CustomUnauthorizedException,
    OwnOrAdminPermission,
    OwnStaffOrAdminPermission,
)


class TestOwnOrAdminPermission:
    @staticmethod
    @allure.title("Test OwnOrAdminPermission Grants Access To Owner")
    @pytest.mark.django_db
    def test_allows_on_owner_view_access(create_user, mocker):
        permission = OwnOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = create_user()
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        with allure.step("Check has_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_permission(request, view) is True

    @staticmethod
    def test_allows_on_admin_access(admin_user, mocker):
        permission = OwnOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = admin_user
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        with allure.step("Check has_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_permission(request, view) is True

    @staticmethod
    def test_allows_on_staff_access(admin_user, mocker):
        permission = OwnOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = admin_user
        user.is_superuser = False
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        with allure.step("Check has_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_permission(request, view) is True

    @staticmethod
    @pytest.mark.django_db
    def test_denies_on_non_owner_access(create_user, mocker):
        permission = OwnOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = create_user()
        request.user = user
        non_user_id = user.id + 1
        view = mocker.MagicMock(kwargs={"pk": non_user_id})
        with allure.step("Check has_permission raises CustomUnauthorizedException"):
            allure.attach(
                "Expected exception: CustomUnauthorizedException",
                name="expected_exception",
                attachment_type=allure.attachment_type.TEXT,
            )
            with pytest.raises(CustomUnauthorizedException):
                permission.has_permission(request, view)


class TestOwnStaffOrAdminPermission:
    @staticmethod
    @pytest.mark.django_db
    def test_allows_on_owner_object_access(create_user, mocker):
        permission = OwnStaffOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = create_user()
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        obj = mocker.MagicMock(user=user)
        with allure.step("Check has_object_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_object_permission(request, view, obj) is True

    @staticmethod
    def test_allows_on_admin_object_access(admin_user, mocker):
        permission = OwnStaffOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = admin_user
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        obj = mocker.MagicMock(user=user)
        with allure.step("Check has_object_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_object_permission(request, view, obj) is True

    @staticmethod
    def test_allows_on_staff_object_object_access(admin_user, mocker):
        permission = OwnStaffOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = admin_user
        user.is_superuser = False
        request.user = user
        view = mocker.MagicMock(kwargs={"pk": user.id})
        obj = mocker.MagicMock(user=user)
        with allure.step("Check has_object_permission"):
            allure.attach(
                "Expected data: True",
                name="expected_data",
                attachment_type=allure.attachment_type.TEXT,
            )
            assert permission.has_object_permission(request, view, obj) is True

    @staticmethod
    @pytest.mark.django_db
    def test_denies_on_non_owner_object_access(create_user, mocker):
        permission = OwnStaffOrAdminPermission()
        request_factory = RequestFactory()
        request = request_factory.get("/url/")
        user = create_user()
        # create_user fixture returns function ref with the same email (fixture) which currently __eq__ on email
        user2 = create_user(email="a@gmail.com")
        request.user = user
        view = mocker.MagicMock()
        obj = mocker.MagicMock(user=user2)
        with allure.step("Check has_object_permission raises CustomForbiddenException"):
            allure.attach(
                "Expected exception: CustomForbiddenException",
                name="expected_exception",
                attachment_type=allure.attachment_type.TEXT,
            )
            with pytest.raises(CustomForbiddenException):
                assert permission.has_object_permission(request, view, obj)
