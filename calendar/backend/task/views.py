from django.db.models import Count
from django.shortcuts import render
from rest_framework import  mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from task.models import Task
from task.serializers import TaskSerializer, CalenderSerializer


# Create your views here.
class TaskView(mixins.CreateModelMixin,mixins.ListModelMixin,mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = {
        'date': ['date',],
    }
    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)


class CalendarView(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = CalenderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # queryset = Task.objects.filter(user=user).annotate(day=F("date__date")).values('day').annotate(count=Count('day')) #2020/5/14
        queryset = Task.objects.filter(user=user).values('date__date').annotate(count=Count('date__date')) #2020/5/14
        print(queryset)
        return queryset
