from rest_framework.routers import DefaultRouter

from django.urls import path,include

from img_app.views import ImageSearch, CategoryList

router = DefaultRouter()
router.register('',ImageSearch, basename='image')
router.register('cat',CategoryList, basename='category')
urlpatterns = [

    path('', include(router.urls)),
]
