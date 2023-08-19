from django.urls import include, path
from rest_framework import routers
from author import views

router = routers.DefaultRouter()

router.register(r'author', views.AuthorView, basename='authors')

urlpatterns = [
    path('', include(router.urls)),
]