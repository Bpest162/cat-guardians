# Generated by Django 4.2.13 on 2024-07-09 15:42

import phonenumber_field.modelfields
from django.db import migrations, models

import found_form.models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="FoundCat",
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
                ("description", models.TextField(blank=True, null=True)),
                ("address", models.CharField(max_length=100)),
                (
                    "photo",
                    models.ImageField(
                        blank=True,
                        null=True,
                        upload_to=found_form.models.catphoto_directory_path,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("NW", "New"),
                            ("PG", "In Progress"),
                            ("CP", "Completed"),
                        ],
                        default="NW",
                        max_length=2,
                    ),
                ),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(max_length=128, region="UA"),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
    ]
