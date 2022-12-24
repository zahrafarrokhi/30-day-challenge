from django.shortcuts import render
from rest_framework import  mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from task.models import Task
from task.serializers import TaskSerializer


# Create your views here.
class TaskView(mixins.CreateModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return  Task.objects.filter(user=user)