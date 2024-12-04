import boto3
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

import api.settings as settings
from found_form.models import FoundCat


@receiver(post_delete, sender=FoundCat)
def delete_found_cat_photo(instance, **kwargs):
    """
    This signal is used to delete the photo on S3 when a FoundCat object is deleted.
    """
    if instance.photo:
        session = boto3.Session(
            aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME
        )
        s3 = session.resource('s3')
        bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
        key = instance.photo.name
        s3.Object(bucket.name, key).delete()


@receiver(pre_save, sender=FoundCat)
def delete_old_found_cat_photo(instance, **kwargs):
    """
    This signal is used to delete the old photo on S3 when a new photo is changed/updated.
    In such way it prevents from storing unused photos on S3.
    """
    if instance.pk:
        try:
            old_photo = FoundCat.objects.get(pk=instance.pk).photo
        except FoundCat.DoesNotExist:
            return
        if old_photo and old_photo != instance.photo:
            session = boto3.Session(
                aws_access_key_id=settings.AWS_S3_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_S3_SECRET_ACCESS_KEY,
                region_name=settings.AWS_S3_REGION_NAME
            )
            s3 = session.resource('s3')
            bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
            key = old_photo.name
            s3.Object(bucket.name, key).delete()
