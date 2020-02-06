from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class CableParks(models.Model):

    name = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    latitude = models.FloatField()
    longitude = models.FloatField()
    website = models.URLField()


class Review(models.Model):

    name = models.ForeignKey(CableParks, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)


class WeatherPredictions(models.Model):

    location = models.ForeignKey(CableParks, on_delete=models.CASCADE)
    image = models.CharField(max_length=64)
    date = models.DateField()
    time = models.TimeField()
    temperature = models.IntegerField()
    precipitation = models.FloatField()
    wind_force = models.IntegerField()
    wind_direction = models.CharField(max_length=5)
