from rest_framework import serializers

from cart.models import Cart, CartItem
from product.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = CartItem
        fields = '__all__'
        read_only_fields = ['cart']

    def validate(self, attrs):
        user = self.context['request'].user
        quantity = attrs['quantity']
        if quantity < 0:
            raise serializers.ValidationError("number of your product must be positive")
        available = attrs['product'].available
        if not available:
            raise serializers.ValidationError(" product isnt in stock")
        cart, created = Cart.objects.get_or_create(user=user,status=Cart.Status.open)
        attrs['cart'] = cart
        return attrs

#     or
#     def create(self, validated_data):
#         user = self.context['request'].user
#         cart = Cart.objects.get_or_create(user=user, status=Cart.Status.open)
#         return super().create(validated_data={**validated_data, 'cart': cart})
# or

#     def create(self, validated_data):
#         user = self.context['request'].user
#         cart = Cart.objects.get_or_create(user=user, status=Cart.Status.open)
#         item = CartItem(cart=cart,**validated_data)
#         item.save()
#         return item

class CartSerializer(serializers.ModelSerializer):
    # we dont have source because related_name in cartItem
    items = CartItemSerializer(many=True)
    class Meta:
        model = Cart
        fields = '__all__'




