from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _

from product.models import Product


# Create your models here.
class Cart(models.Model):

    # STATUS_CHOICES = [
    #     ('OPEN', 'open'),
    #     ('CLOSED', 'closed')
    # ]
    # status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='open')

    class Status(models.TextChoices):
        open = 'OPEN', 'open'
        closed = 'CLOSED', 'closed'

    status = models.CharField(choices=Status.choices, max_length=20, default=Status.open)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    discount = models.IntegerField(blank=True, null=True, default=None)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='carts', related_query_name='cart')
    # MTM
    products = models.ManyToManyField(Product,through='CartItem')

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Cart")
        verbose_name_plural = _("Carts")

    def __str__(self):
        return self.user.email # sel.user.phone

    def get_total_price(self):
        total = sum(item.get_cost() for item in self.items.all())
        if self.discount:
            discount_price = (self.discount / 100) * total
            return int(total - discount_price)
        return total


class CartItem(models.Model):
    quantity = models.IntegerField(default=0)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='carts', related_query_name='cart')
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items', related_query_name='item')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _("Cart Item detail")
        verbose_name_plural = _("Cart Item detail")

    def __str__(self):
        return self.product.name

    def get_cost(self):
        return self.product.price * self.quantity


# class Payment(models.Model):
#     pay_date = models.DateField()
#     total = models.FloatField()
#     details = models.TextField(max_length=255, blank=True)
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     # address = models.ForeignKey(Address, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.details