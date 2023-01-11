from django.contrib import admin

from chat.models import Chat


class ChatAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ('name', )
    list_display = ('name', )
    ordering = ('-created_at', 'name',)
    fields = ('name', 'created_at', 'updated_at', 'user')


admin.site.register(Chat, ChatAdmin)
