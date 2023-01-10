from datetime import datetime

from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import User, OTP


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['phone_number', 'first_name', 'last_name']



    def create(self, validated_data):
        # user has phone_number
        user = User.objects.create_user(**validated_data)
        otp = OTP.objects.create(user=user, exp_date=datetime.now() + settings.OTP_EXP)
        return user



class OtpSerializer(serializers.ModelSerializer):
    # 'OTP' object has no attribute 'phone_number' error on postman =>  phone_number without  write_only=True
    # or
    # in def create =>  otp.phone_number = validated_data['phone_number']
    phone_number = serializers.CharField()


    class Meta:
        model = OTP
        fields = ['phone_number']  # user isnt phone_number ,phone_number = user.phone_number

    # def create(self, validated_data):
    #     phone_number = self.validated_data['phone_number']
    #     # we dont have user in login
    #     user = User.objects.get(phone_number=phone_number)
    #
    #     otp = OTP.objects.create(user=user,exp_date=datetime.now()+settings.OTP_EXP)
    #     return otp

    def validate(self, attrs):
        phone_number = attrs['phone_number']
        # without try except django return server error(500)
        try:
            user = User.objects.get(phone_number=phone_number)
            # for access in def create below for user
            attrs['user'] = user
        except User.DoesNotExist:
            raise serializers.ValidationError("user does not exist")
        return attrs

    def create(self, validated_data):
        otp = OTP.objects.create(user=validated_data['user'], exp_date=datetime.now() + settings.OTP_EXP)
        otp.phone_number = validated_data['phone_number']
        return otp


class LoginSerializer(serializers.Serializer):
    # input frontend
    phone_number = serializers.CharField(write_only=True)
    otp = serializers.CharField(write_only=True)
    # output
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)

    def validate(self, attrs):
        phone_number = attrs['phone_number']
        otp = attrs['otp']
        try:
            user = User.objects.get(phone_number=phone_number)
            otp = OTP.objects.get(user=user,is_active=True,value=otp,exp_date__gte=datetime.now())
            attrs['user'] = user
        except User.DoesNotExist:
            raise serializers.ValidationError("user does not exist")
        except OTP.DoesNotExist:
            raise serializers.ValidationError("OTP does not exist")

        tokens = RefreshToken.for_user(user)

        # refresh = str(tokens)
        # access = str(tokens.access_token)

        attrs['refresh'] = str(tokens)
        attrs['access'] = str(tokens.access_token)

        # return user,refresh,access
        return attrs

    # def create(self, validated_data):
    #     return validated_data