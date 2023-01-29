from django.urls import path,include
from rest_framework import routers
from . import views, consumers

router = routers.DefaultRouter()
router.register(r'chat', views.ChatView, basename='chat')
router.register(r'message', views.MessageView, basename='message')
router.register(r'chat-retrieve' ,views.ChatRetrieveView, basename='chat-retrieve')

urlpatterns = [
    path('', include(router.urls)),
]

ws_urlpatterns = [
    path("ws/chat/", consumers.ChatConsumer.as_asgi()),

]