

# Setting up postman environment
1. Go to environments tab
2. Create a new environment 
3. Add url to environment variables

![Environment](./screenshots/postman_create_environment.png)

4. Save and Select environment


![Environment](./screenshots/postman_select_environment.png)

5. You can view environment in the eye button


![Environment](./screenshots/postman_view_environment.png)
# Create superuser
```bash
python3 manage.py createsuperuser
```
# Get Product List
![Product list](./screenshots/product_list.png)


# Add authentication
1. User chat authentication postman to login
2. Add access token to collection authentication
![Postman access token](./screenshots/postman_refresh.png)

# Add product to cart
## Error: cart is required
![Cart Error](./screenshots/cart_readonly_error.png)
* In CartItemSerializer, make cart readonly
```python
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
        read_only_fields = ['cart']
    ...
```

## Successful
![CartItem](./screenshots/add_to_cart.png)

# Get Cart
![Cart](./screenshots/cart_after_adding.png)


# Nesting product in cart
```python
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    ...
```
![Nested Product](./screenshots/cart_after_nesting_product.png)