### relation

![img.png](img.png)

```python

class Category(models.Model):
    name = models.CharField(max_length=120)

# Product has fk for Category
class Product(models.Model):
    category = models.ForeignKey(Category,related_name='products',on_delete=models.CASCADE)
```


### serializers

get category for product
```python

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# nested Category in Product
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Product
        fields = '__all__'
```
get product in category
1. `field name` in CategorySerializer  <==> `related_name='products'` in Product model
```python
class ProductSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Product
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = '__all__'
```
2. we dont have `related_name` in Product model,so you have `source`

```python
class ProductSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Product
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True,source='product_set')
    class Meta:
        model = Category
        fields = '__all__'
```
3. you have `related_name` in Product model but doesn't mach  `field name` in CategorySerializer

##### models
```python

class Category(models.Model):
    name = models.CharField(max_length=120)

# Product has fk for Category
class Product(models.Model):
    category = models.ForeignKey(Category,related_name='products',on_delete=models.CASCADE)
```

##### serializers

```python
class ProductSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Product
        fields = '__all__'
        
class CategorySerializer(serializers.ModelSerializer):
    products_in_category = ProductSerializer(many=True,source='products')
    class Meta:
        model = Category
        fields = '__all__'
```


### views


* you don't have `related_name`
```python
cat => product
class Category(models.Model):
    name = models.CharField(max_length=120)

# Product has fk for Category
class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)

cat => product

# all products in category
cat.product_set.all()
# filter categories with a product
Category.objects.filter(product_set__in=[5])
```

* you  have `related_name`
```python
cat => product
class Category(models.Model):
    name = models.CharField(max_length=120)

# Product has fk for Category
class Product(models.Model):
    category = models.ForeignKey(Category,related_name='products',on_delete=models.CASCADE)


# all products in category
cat.products.all()
# filter categories with a product
Category.objects.filter(products__in=[5])
```

products in specific category
```python
product => cat
# filter products in a specific category
def all_products(request):
    # r = request.GET or  r = request.query_params
    r = request.GET.get('cat',None) # r = request.GET['cat']
    products = Products.objects.filter(category=r)
    return products
```

