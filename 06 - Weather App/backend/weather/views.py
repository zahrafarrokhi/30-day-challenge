from django.conf import settings
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
# Create your views here.
class GetWeather(APIView):

    @method_decorator(cache_page(60*60*2))
    def get(self,request):
        try:
            print("New request")
            lat = request.GET['lat']
            lon = request.GET['lon']
            response = requests.get('https://api.openweathermap.org/data/2.5/forecast', {
                'lat' : lat,
                'lon': lon,
                'appid':settings.API_KEY,
                'units': 'metric',
            })

            return Response({'response':response.json()}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'message':'the weather not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
