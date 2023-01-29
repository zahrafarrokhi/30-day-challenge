# socket
Unlike normal http connections, Socket connections stay open and both client and server can send messages.

## Django channels
[Django channels](https://channels.readthedocs.io/en/stable/)

### Installation
1. Install channels package with daphene as asgi server
```commandline
python -m pip install -U channels["daphne"]
```
2. Add daphene and channels to INSTALLED_APPS
```python
INSTALLED_APPS = [
    "daphne",
    "channels",
    ...
]
```
3. Update asgi file to add daphene server
```python
import os

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'online_chat.settings')
django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    "http": django_asgi_app,
})
```
4. Add `ASGI_APPLICATION` to your settings.py
```python
ASGI_APPLICATION = "online_chat.asgi.application"

```

### Registering a Websocket consumer
1. Add `ws_urlpatterns` to `urls` files
```python
# chat.urls
ws_urlpatterns = [
]
```
2. Setup daphene to read websocket urls:
```python
# asgi
# online_chat.asgi
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    # Add this
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(URLRouter(chat.urls.ws_urlpatterns))
    ),
})
```
3. Install channels redis backend
```commandline
pip install channels_redis
```
4. Run redis
```yaml
version: '3.9'

services:
  redis:
    image: redis:6.2.8-alpine
    ports:
      - 6379:6379
```
```commandline
docker compose up -d
```

5. Setup redis channel layer
```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}
```

## Setup socket connections
### Consumer
* connection starts => connect
* disconnect
* receive => when client sends a message(for login)

This class creates a global group with all connections, and when users logs in in receive function it adds user to a chat group. 

### Sending messages to users
* Write a handler in consumer
```python

    async def new_message(self, event):
        message = event["message"]
        print("sending message to ", self.room_group_name, self.room_name, self.user)
        await self.send(
            text_data=json.dumps({"type": "chat_message", "message": message})
        )
```

* Send messages:
```python
channel_layer = channels.layers.get_channel_layer()
async_to_sync(channel_layer.group_send)(f"chat_{serializer.instance.chat.pk}", {"type": "new_message", "message": serializer.data})

# view.py
    def perform_create(self, serializer):
        serializer.save()
        channel_layer = channels.layers.get_channel_layer()
        async_to_sync(channel_layer.group_send)(f"chat_{serializer.instance.chat.pk}", {"type": "new_message", "message": serializer.data})


```
