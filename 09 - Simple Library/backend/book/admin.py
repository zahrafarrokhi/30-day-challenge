from django.contrib import admin
from .models import Book,Tag,Category
# Register your models here.
class BookAdmin(admin.ModelAdmin):
    search_fields = ('authors', 'name', 
                     'created_at', 'page_numbers')
    list_display = [  'name','created_at', 'page_numbers', 'Categories','author_field','tag_field'
                  ]
    ordering = ( 'name', )
    fields = None

    def author_field(self, obj):
        # "z,f,g,"
        ret = ""
        for author in obj.authors.all():
            ret += f"{author.full_name}, "
        return ret
    

    def tag_field(self, obj):
        # ret = ""
        # for tag in obj.tag.all():
        #     ret += f"{self.name}, "
        
        ret = ", ".join([f"{tag.name}" for tag in  obj.tag.all()])
        print([f"{tag.name}" for tag in  obj.tag.all()])
        print(ret)
        return ret




class Tagdmin(admin.ModelAdmin):
    search_fields = ('name', 'created_at', 
                     'active')
    list_display = ['name',  'active'
                  ]
    ordering = ('name', )
    fields = None
class Categorydmin(admin.ModelAdmin):
    search_fields = ('name',
                     )
    list_display = ['name',
                  ]
    ordering = ('name', )
    fields = None


admin.site.register(Book, BookAdmin)
admin.site.register(Tag, Tagdmin)
admin.site.register(Category,Categorydmin)