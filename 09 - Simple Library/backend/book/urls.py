from django.urls import include, path
from rest_framework import routers
from book import views

router = routers.DefaultRouter()

router.register(r'book', views.BookView, basename='books')
router.register(r'category', views.CategoryView, basename='categories')

urlpatterns = [
    path('', include(router.urls)),
    # apiView
    path('filter-values', views.FilterPageNumbers.as_view()),
]