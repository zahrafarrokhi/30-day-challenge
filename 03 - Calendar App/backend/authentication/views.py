from django.shortcuts import render
from rest_framework import  mixins, viewsets

from authentication.serializers import UserSerializer


# Create your views here.
class Signup(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = []