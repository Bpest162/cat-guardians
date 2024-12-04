import logging
import sys

from django.db import DatabaseError
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import exception_handler

logging.basicConfig(level=logging.DEBUG, stream=sys.stdout)


class ListMixin:
    def list(self: Request, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response_data = {
                "pages": (queryset.count() + self.pagination_class.page_size - 1) // self.pagination_class.page_size,
                "data": serializer.data,
            }
            return Response(response_data, status=status.HTTP_200_OK)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class HandleRetryingMixin:
    def handle_exception(self, exc):
        logger = logging.getLogger(__name__)
        logger.error(exc)
        response = exception_handler(exc, self)
        if isinstance(exc, DatabaseError):
            response = Response({"message": f"{exc.args[0]}"}, status=status.HTTP_417_EXPECTATION_FAILED)
        return response
