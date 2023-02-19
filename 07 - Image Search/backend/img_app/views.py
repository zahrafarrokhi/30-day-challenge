from django.shortcuts import render
from rest_framework import mixins,viewsets
# from rest_framework.filters import SearchFilter

from img_app.models import Image, Category
from img_app.serializers import ImageSerializer, CategorySerializer


# Create your views here.
class ImageSearch(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = ImageSerializer
    permission_classes = []
    # filter_backends = [SearchFilter, DjangoFilterBackend]
    # filterset_fields = ['status',]

    # queryset = Image.objects.all()
    def get_queryset(self):
        q, cat = self.request.GET.get('q'), self.request.GET.get('cat')

        objs = Image.objects.all()

        if q is not None:
            objs = objs.filter(name__icontains=q)
        if cat is not None:
            objs = objs.filter(categories__in=[cat])
        return objs


class CategoryList(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = CategorySerializer
    permission_classes = []
    queryset = Category.objects.all()