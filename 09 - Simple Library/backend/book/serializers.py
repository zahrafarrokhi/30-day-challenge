
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import Book,Category,Tag
from author.serializers import AuthorSerializer
class CategorySerializer(serializers.ModelSerializer):
    parent = SerializerMethodField()

    class Meta:
        model = Category
        fields = "__all__"

    def get_parent(self, obj):
        if obj.parent is not None:
            return CategorySerializer(obj.parent).data
        else:
            return None
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    tag = TagSerializer(many=True)
    Categories = CategorySerializer()
    class Meta:
        model = Book
        fields = "__all__"




