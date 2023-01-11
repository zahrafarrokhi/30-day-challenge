from django.db import models

from authentication.models import User


# Create your models here.
class Chat(models.Model):
    # user to chat => user.chat_set
    user = models.ManyToManyField(User)
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
class Message(models.Model):
    # message to user => message.user ,
    # user to message => user.message_set ,with related_name => user.messages
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="messages")
    chat = models.ForeignKey(Chat,on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # user to messages user has seen=> user.seen
    seen_by = models.ManyToManyField(User,related_name="seen")