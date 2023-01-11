from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'chat', views.ChatView, basename='chat')
router.register(r'message', views.MessageView, basename='message')


urlpatterns = [
    path('', include(router.urls)),
]