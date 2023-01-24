from django.shortcuts import render
from rest_framework import viewsets,mixins

from product.models import Product
from product.serializers import ProductSerializer


# Create your views here.
class ProductView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ProductSerializer
    permission_classes = []
    queryset = Product.objects.all()
