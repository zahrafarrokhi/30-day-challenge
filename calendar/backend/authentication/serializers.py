from rest_framework import serializers

from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def validate(self, attrs):
        confirm_password = attrs.pop('confirm_password') # pop for create
        password = attrs['password']
        if confirm_password != password:
            raise serializers.ValidationError("your passwords dont match")
        return attrs

    # or
    # def validate_confirm_password(self, confirm_password):
    #     password = self.initial_data['password']
    #     if confirm_password != password:
    #         raise serializers.ValidationError("your passwords dont match")
    #     return confirm_password

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    # or
    # def create(self, validated_data):
    #     password = validated_data.pop('password') # pop for password encryption
    #     user = User.objects.create(**validated_data)
    #     user.set_password(password)
    #     return user