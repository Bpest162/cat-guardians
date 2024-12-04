# Generated by Django 4.2.13 on 2024-07-09 15:42

import django.db.models.deletion
from django.db import migrations, models

import pets.models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CatBreed",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="CatColor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="CatPhoto",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "photo",
                    models.ImageField(upload_to=pets.models.catphoto_directory_path),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="CatProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "gender",
                    models.CharField(choices=[("M", "Male"), ("F", "Female")], max_length=1),
                ),
                ("birth_date", models.DateField(default=None, null=True)),
                ("bio", models.TextField(blank=True)),
                ("requirements_for_owner", models.TextField(blank=True)),
                ("preferences", models.TextField(blank=True)),
                ("aversions", models.TextField(blank=True)),
                (
                    "breed",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="pets.catbreed",
                    ),
                ),
                (
                    "color",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="pets.catcolor",
                    ),
                ),
            ],
            options={
                "ordering": ["id"],
            },
        ),
    ]
