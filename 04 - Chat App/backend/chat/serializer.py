from rest_framework import serializers

from authentication.models import User
from authentication.serializers import UserSerializer
from chat.models import Chat, Message


class ChatSerializer(serializers.ModelSerializer):
    add_users = serializers.PrimaryKeyRelatedField(source='user', many=True, queryset=User.objects.all())

    class Meta:
        model = Chat
        fields ='__all__'


    def create(self, validated_data):
        users = validated_data.pop('add_users')
        chat = Chat(**validated_data)
        chat.save()
        chat.user.add(*users)
        return chat



class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields ='__all__'
        read_only_fields = ['user','seen_by']

    def create(self, validated_data):
        user = self.context['request'].user
        message = Message.objects.create(user=user,**validated_data)
        return message


class ChatRetrieveSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(source="message_set", many=True)
    class Meta:
        model = Chat
        fields = '__all__'



