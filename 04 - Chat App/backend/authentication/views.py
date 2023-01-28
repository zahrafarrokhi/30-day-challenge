from datetime import datetime

from django.conf import settings
from django.shortcuts import render
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.models import User, OTP
from authentication.serializers import ConfirmSerializer, UserSerializer, LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Create your views here.
class LoginView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = LoginSerializer
    permission_classes = []

# class LoginView(APIView):
#     def post(self, request):
#         try:
#             phone_number = request.data['phone_number']
#             user = User.objects.get(phone_number=phone_number)
#             otp = OTP.objects.create(user=user, exp_date=datetime.now() + settings.OTP_EXP)
#
#             return Response({"msg": "Otp has been sent", "phone_number": phone_number}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({"error": "user does not exist"}, status=status.HTTP_404_NOT_FOUND)



# create user and otp
class SignUpView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = UserSerializer
    permission_classes = []


class ConfirmView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = ConfirmSerializer
    permission_classes = []

    def perform_create(self, serializer):
        print(serializer.data)
