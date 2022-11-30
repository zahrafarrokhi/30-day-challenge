from django.urls import path, include
from rest_framework import routers
from task.views import TaskView

router = routers.DefaultRouter()
router.register('tasks',TaskView,basename="tasks")
urlpatterns = [
    path('', include(router.urls)),

]