from django.shortcuts import render
from rest_framework import viewsets,mixins

from cart.models import Cart
from cart.serializers import CartSerializer, CartItemSerializer


# add_to_cart
class AddToCartView(mixins.CreateModelMixin,viewsets.GenericViewSet):
    serializer_class = CartItemSerializer
    permission_classes = []



# Retrieve
class CartView(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = CartSerializer
    permission_classes = []

    def get_object(self):
        return Cart.objects.filter(user=self.request.user,status=Cart.Status.open).first()

# List
class CartListView(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = CartSerializer
    permission_classes = []

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)