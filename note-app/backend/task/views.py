from django.shortcuts import render
from rest_framework import viewsets

from task.models import Note
from task.serializers import NoteSerializer


# Create your views here.
class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = []
    queryset = Note.objects.all()