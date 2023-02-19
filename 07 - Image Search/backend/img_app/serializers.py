from rest_framework import serializers

from img_app.models import Category, Image


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Image