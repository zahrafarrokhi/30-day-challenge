from django.urls import path,include
from rest_framework import routers

from task.views import NoteView

router = routers.DefaultRouter()
router.register(r'notes',NoteView,basename='note')
urlpatterns = [
    path('',include(router.urls)),

]