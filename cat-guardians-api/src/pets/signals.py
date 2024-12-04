import boto3
from django.db.models.signals import post_delete
from django.dispatch import receiver

import api.settings as settings
from pets.models import CatPhoto, CatProfile


@receiver(post_delete, sender=CatPhoto)
def delete_cat_photo(instance, **kwargs):
    # Or create a session with specific credentials
    session = boto3.Session(
        aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )
    s3 = session.resource('s3')
    bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
    key = instance.photo.name
    s3.Object(bucket.name, key).delete()


@receiver(post_delete, sender=CatProfile)
def delete_cat_photos_dir(instance, **kwargs):
    session = boto3.Session(
        aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME
    )
    s3 = session.resource('s3')
    bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
    key = f"{settings.CAT_PROFILE_PHOTO}/{instance.id}/"
    s3.Object(bucket.name, key).delete()
