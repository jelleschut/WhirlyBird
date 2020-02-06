from rest_framework import serializers
from whirlybird_backend.models import WeatherPredictions, CableParks, Review
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name']


class FullUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_superuser', 'first_name', 'last_name']


class CableParksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CableParks
        fields = ['id', 'name', 'city', 'website']


class WeatherPredictionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherPredictions
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['user', 'name', 'score', ]
