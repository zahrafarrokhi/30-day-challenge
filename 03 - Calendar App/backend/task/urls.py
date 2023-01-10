
from django.urls import path, include
from rest_framework import routers

from task.views import TaskView,CalendarView

router = routers.DefaultRouter()
router.register(r'task',TaskView,basename='task')
router.register(r'days',CalendarView,basename='days')
urlpatterns = [

    path('', include(router.urls)),
]

