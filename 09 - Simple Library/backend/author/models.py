from django.db import models
from authentication.models import User
# Create your models here.
class Author(models.Model):
    user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.CASCADE, )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=120,null=True, blank=True)
    

 
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return f"{self.last_name} "