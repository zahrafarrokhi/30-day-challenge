from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=40)
    slug = models.CharField(max_length=40)

    def __str__(self):
        return self.name

class Image(models.Model):
    name = models.CharField(max_length=30)
    file = models.FileField()
    categories = models.ManyToManyField(Category)

    def __str__(self):
        return self.name