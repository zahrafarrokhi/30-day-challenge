from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import  SearchFilter
from task.models import Note
from task.serializers import NoteSerializer


# Create your views here.
class NoteView(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = []
    queryset = Note.objects.all()
    filter_backends = [ SearchFilter]

    search_fields = ['title', 'description',]