from django.db import DatabaseError


def retry_if_expectation_failed(exception):
    return isinstance(exception, DatabaseError)
