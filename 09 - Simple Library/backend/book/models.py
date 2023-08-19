from django.db import models
from author.models import Author
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=120)
    is_sub = models.BooleanField(default=False,null=True, blank=True)
    slug = models.SlugField(max_length=200, unique=True,allow_unicode=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE,null=True, blank=True, related_name='child',
                               related_query_name='child')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField()
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
   
    def __str__(self) -> str:
        return self.name

class Book(models.Model):
    authors = models.ManyToManyField(Author, )
    tag = models.ManyToManyField(Tag,)
    name = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    page_numbers = models.IntegerField()
    Categories = models.ForeignKey(Category, on_delete=models.PROTECT, null=True,blank=True)
    # books.objects.filter(Categories__name__iexact="A")

    def __str__(self):
        return self.name if self.name is not None else ""


#


