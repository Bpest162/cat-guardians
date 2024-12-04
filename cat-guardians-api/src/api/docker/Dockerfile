# Python version should be under 3.12, as in 3.12+ pendulum dependency cannot be built (distutils removed)
# Using Python version > 3.11.4 results in pytest fixture errors
FROM python:3.11-buster

RUN apt-get update && apt-get install -y gettext && apt-get clean

RUN pip install poetry==1.8.0

ENV ENVIRONMENT=docker \
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

ARG PROJECT_DIR
ENV PROJECT_DIR ${PROJECT_DIR}
# setting work directory
WORKDIR ${PROJECT_DIR}

RUN mkdir -p ${PROJECT_DIR}/static && if [ ! -d ${PROJECT_DIR}/media ]; then mkdir ${PROJECT_DIR}/media; fi

COPY pyproject.toml poetry.lock ./

RUN poetry install --without dev --no-root && rm -rf $POETRY_CACHE_DIR

COPY src ./src

RUN poetry install --without dev

# compile translations
RUN cd src && poetry run django-admin compilemessages
