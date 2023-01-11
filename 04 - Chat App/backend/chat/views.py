from django.shortcuts import render
from rest_framework import mixins,viewsets
from rest_framework.permissions import IsAuthenticated

from chat.models import Chat, Message
from chat.serializer import ChatSerializer, MessageSerializer, ChatRetrieveSerializer


# Create your views here.

class ChatView(mixins.CreateModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat = Chat.objects.filter(user__contains=self.request.user)
        return chat


class MessageView(mixins.CreateModelMixin,mixins.UpdateModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params['chat']
        # you see your message not other mesages
        # message = Message.objects.filter(user=self.request.user, chat=query)

        # you see any messages ,private chat doesnt exist
        # message = Message.objects.filter(chat=query)

        # private and see your chat and others
        message = Message.objects.filter(chat__user__contains=self.request.user,chat=query)
        return message


# We need a separate serializer so that messages aren't returned to user when user gets chat list
class ChatRetrieveView(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = ChatRetrieveSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat = Chat.objects.filter(user__contains=self.request.user)
        return chat
