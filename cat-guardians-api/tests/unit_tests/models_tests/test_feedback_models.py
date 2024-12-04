import allure
import pytest

from feedback.models import Feedback


@pytest.mark.django_db(transaction=True)
@allure.title("Test create Feedback")
def test_create_feedback(create_user):
    user = create_user()
    text = "test text"
    feedback = Feedback.objects.create(user=user, text=text)

    with allure.step("Check feedback's text"):
        allure.attach(
            "Expected response: test test",
            name="expected_response_adoption_notes",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert feedback.text == text

    with allure.step("Check feedback's creation_time"):
        allure.attach(
            "Expected response: True",
            name="expected_response_form_created_at",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert feedback.creation_time is not None

    with allure.step("Check feedback's user"):
        allure.attach(
            "Expected response: test_create@example.com",
            name="expected_response_adoption_user",
            attachment_type=allure.attachment_type.TEXT,
        )
        assert feedback.user == user
