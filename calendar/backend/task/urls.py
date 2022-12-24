
from django.urls import path, include
from rest_framework import routers

from task.views import TaskView

router = routers.DefaultRouter()
router.register(r'task',TaskView,basename='task')
urlpatterns = [

    path('', include(router.urls)),
]

