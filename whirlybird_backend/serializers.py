from rest_framework import serializers
from whirlybird_backend.models import PredictionPerDay, PredictionPerHour, CableParks
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CableParksSerializer(serializers.ModelSerializer):
    class Meta:
        model = CableParks
        fields = ['id', 'name', 'city', 'website']


class PredictionPerDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionPerDay
        fields = "__all__"


class PredictionPerHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionPerHour
        fields = "__all__"
