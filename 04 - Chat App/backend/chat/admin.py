from django.contrib import admin

from chat.models import Chat, Message


class MessageInlineAdmin(admin.TabularInline):
    model = Message
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at', 'user',)
    fields = ('text', 'created_at', 'updated_at', 'user')


class ChatAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    search_fields = ('name', )
    list_display = ('name', )
    ordering = ('-created_at', 'name',)
    fields = ('name', 'created_at', 'updated_at', 'user')

    inlines = [MessageInlineAdmin]


admin.site.register(Chat, ChatAdmin)
