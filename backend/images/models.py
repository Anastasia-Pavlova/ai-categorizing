import os
from django.db import models
from datetime import datetime


def upload_to(instance, filename):
    category = instance.category
    return os.path.join("uploads", category, filename)


class Images(models.Model):
    name = models.CharField(max_length=30, blank=True, null=True)
    image = models.ImageField(upload_to=upload_to)
    category = models.CharField(max_length=20)
    ai_category = models.CharField(max_length=20)

    def __str__(self):
        return self.name