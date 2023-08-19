from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import BookSerializer, CategorySerializer
from .models import Book,Category,Tag
from django.db.models import Min, Max
# Create your views here.
class BookView(mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = BookSerializer
    permission_classes = []
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = {
        'page_numbers': ['exact', 'in','lte','gte'],
        'created_at': ['date__lte', 'date__gte'],
        'Categories':['exact'],
        # 'authors':['in']
    }
    search_fields = ['name']
    # sort
    ordering_fields = ['authors', 'tag', 'name', 'created_at','updated_at','page_numbers','categories']
    # pagination
    pagination_class = LimitOffsetPagination

    def get_queryset(self):
        print(self.request.query_params.getlist('author[]'))
        author = self.request.query_params.getlist('author[]', [])

        if author is not None and author != "" and len(author) > 0 and author:
            print(author)
            return Book.objects.filter(authors__in=author)
        else:
            return Book.objects.all()


class CategoryView(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = CategorySerializer
    permission_classes = []
    filter_backends = [ SearchFilter]
    search_fields = ['name']
    queryset = Category.objects.all()

class FilterPageNumbers(APIView):
    def get(self,request,**kwargs):
        # page_number_min = 10000000000
        # page_number_max = 0
        # for book in Book.objects.all():
        #     page_number_min = min(page_number_min, book.page_numbers)
        #     page_number_max = max(page_number_max, book.page_numbers)
        max_page_numbers = Book.objects.all().aggregate(Max('page_numbers'))
        min_page_numbers = Book.objects.all().aggregate(Min('page_numbers'))
        return Response(data={
            "page_number_min":min_page_numbers['page_numbers__min'],
            "page_number_max": max_page_numbers['page_numbers__max'],
        },status=status.HTTP_200_OK)


