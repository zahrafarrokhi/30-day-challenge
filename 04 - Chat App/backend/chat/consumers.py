# chat/consumers.py
import json
from asyncio import gather

from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import User
from chat.models import Chat


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("global", self.channel_name)

        self.room_group_name = None
        print("New connection")

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard("global", self.channel_name)

        if self.room_group_name is not None:
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print("Closing connection")
        pass

    # Receive message from WebSocket
    async def receive(self, text_data):
        print("message", text_data)
        data = json.loads(text_data)

        if data['type'] == 'login': # front
            try:
                ref = RefreshToken(data['refresh_token'])

                user = await sync_to_async(User.objects.get)(pk=ref['user_id'])
                # self.user = user
                async for chat in Chat.objects.filter(user__in=[user]):
                    await self.channel_layer.group_add(f"chat_{chat.pk}", self.channel_name)

                await self.send(json.dumps({"type": 'login_successful'}))
            except Exception as e:
                print(e)
                await self.send(json.dumps({"type": 'login_failed'}))



    # Receive message from room group
    # run after perform_create
    async def new_message(self, event):
        message = event["message"]
        # print("sending message to ", self.room_group_name, self.room_name, self.user)
        await self.send(
            text_data=json.dumps({"type": "chat_message", "message": message})
        )
