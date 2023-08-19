from django.contrib import admin
from .models import Author
# Register your models here.
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ('first_name', 'last_name', 
                      'user', 'phone')
    list_display = ['user',  'first_name', 'last_name',
                    'phone','address']
    ordering = ('last_name', 'first_name', )
    fields = None


admin.site.register(Author, AuthorAdmin)