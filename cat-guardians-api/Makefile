manage_py := python ./src/manage.py
PORT ?= 8000

run:
	$(manage_py) runserver 0.0.0.0:$(PORT)

shell:
	$(manage_py) shell_plus --print-sql

makemigrations:
	$(manage_py) makemigrations

migrate:
	$(manage_py) migrate

createsuperuser:
	$(manage_py) createsuperuser

gunicorn:
	cd src; poetry run gunicorn api.wsgi:application --log-level=debug -b 0.0.0.0:$(PORT)

catgenerate:
	cd src; python manage.py generate_cat_profiles

postgres:
	docker compose up -d postgres

pytest:
	pytest --cov --cov-report=html

messages_ua:
	cd src; django-admin makemessages -l uk

update_messages:
	cd src; django-admin makemessages -a

compilemessages:
	cd src; django-admin compilemessages
