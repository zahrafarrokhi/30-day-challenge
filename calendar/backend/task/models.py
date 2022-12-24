from django.db import models

from authentication.models import User


# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    description = models.TextField(blank=True,null=True)
    date = models.DateTimeField()
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)