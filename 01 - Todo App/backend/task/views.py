from django.shortcuts import render
from rest_framework import viewsets

from task.models import Task
from task.serializers import TaskSerializer


# Create your views here.
class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = []
    queryset = Task.objects.all()