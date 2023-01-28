

from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'login', views.LoginView, basename='sms')
router.register(r'confirm', views.ConfirmView, basename='login')
router.register(r'signup', views.SignUpView, basename='signup')

urlpatterns = [
    # path('signup/', views.SignUpView.as_view(), name='signup'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]