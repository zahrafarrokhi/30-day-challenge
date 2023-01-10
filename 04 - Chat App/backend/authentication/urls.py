

from django.urls import path, include
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'login/sms', views.GetOtpView, basename='sms')
router.register(r'login', views.LoginView, basename='login')
router.register(r'signup', views.SignUpView, basename='signup')

urlpatterns = [

    # path('signup/', views.SignUpView.as_view(), name='signup'),
    path('', include(router.urls)),
]