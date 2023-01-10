from django.shortcuts import render
from rest_framework import mixins,viewsets

from authentication.serializers import OtpSerializer, UserSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Create your views here.
class GetOtpView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = OtpSerializer
    permission_classes = []


# create user and otp
class SignUpView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = []


class LoginView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = []

    def perform_create(self, serializer):
        print(serializer.data)
