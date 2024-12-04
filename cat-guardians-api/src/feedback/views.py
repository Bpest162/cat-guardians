from django.forms import model_to_dict
from rest_framework import generics, permissions, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .models import Feedback
from .serializers import FeedbackSerializer


class FeedbackAPIPagination(PageNumberPagination):
    """
    Custom pagination class for paginating feedback instances in API responses.

    This pagination class extends the `PageNumberPagination` provided by Django Rest Framework.
    It defines specific pagination settings for the Feedback API, including a default page size,
    a query parameter for dynamically setting the page size, and a maximum allowed page size.

    Attributes:
        page_size (int): The default number of feedback instances to include on each page.
        page_size_query_param (str): The query parameter to dynamically set the page size in API requests.
        max_page_size (int): The maximum allowed page size to prevent excessively large responses.

    Example Usage:
        To use this pagination class in a Django Rest Framework view, set the `pagination_class` attribute:

        ```
        class FeedbackAPIList(generics.ListAPIView):
            queryset = Feedback.objects.all()
            serializer_class = FeedbackSerializer
            pagination_class = FeedbackAPIPagination
        ```
    """

    page_size = 50
    page_size_query_param = "page_size"
    max_page_size = 10000


class FeedbackAPIList(generics.ListAPIView):
    """
    API endpoint that returns a list of all feedback.

    Uses the `FeedbackSerializer` for serialization and retrieves all instances
    from the `Feedback` model.
    """

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    pagination_class = FeedbackAPIPagination


class FeedbackAPICreate(generics.CreateAPIView):
    """
    API endpoint that allows the creation of new feedback.

    Requires authentication, and uses the `FeedbackSerializer` for serialization.
    On successful creation, returns a JSON response with the created feedback details.
    """

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (permissions.IsAuthenticated,)
    MAX_TEXT_LENGTH = 255

    def post(self, request):
        """
        Handle POST requests for creating new feedback.

        Parameters:
            - request: The HTTP request object.

        Returns:
            A JSON response with the details of the created feedback.
        """
        if "text" not in request.data:
            return Response({"error": "Text field is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not request.data["text"]:
            return Response({"error": "Text field cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

        if len(request.data["text"]) > self.MAX_TEXT_LENGTH:
            return Response(
                {"error": f"Text field length cannot exceed {self.MAX_TEXT_LENGTH} characters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        feedback = Feedback.objects.create(user=request.user, text=request.data["text"])
        return Response({"post": model_to_dict(feedback)})


class FeedbackAPIRetrieve(generics.RetrieveAPIView):
    """
    API endpoint that retrieves a single feedback instance by its ID.

    Uses the `FeedbackSerializer` for serialization and retrieves the feedback instance
    from the `Feedback` model based on the provided ID.
    """

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class FeedbackAPIDelete(generics.DestroyAPIView):
    """
    API endpoint that allows the deletion of a feedback instance.

    Requires admin authentication and uses the `FeedbackSerializer` for serialization.
    """

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_class = (permissions.IsAdminUser,)
