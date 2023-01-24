from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('carts', views.CartListView, basename='cart')
router.register('add-to-cart', views.AddToCartView, basename='cart')
urlpatterns = [
    # we don't have id in url so we cant use router
    path('cart', views.CartView.as_view({'get': 'retrieve'})),
    path('', include(router.urls))
]
