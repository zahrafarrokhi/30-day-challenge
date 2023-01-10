from django.db import models

from authentication.models import User
import datetime


# Create your models here.
class Task(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=40)
    description = models.TextField(blank=True,null=True)
    date = models.DateTimeField()
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    task_complete = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.date.strftime("%Y-%m-%d %H:%M:%S")} - {self.name}'
