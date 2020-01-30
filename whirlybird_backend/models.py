from django.db import models
# Create your models here.


class CableParks(models.Model):

    name = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    latitude = models.FloatField()
    longitude = models.FloatField()
    website = models.URLField()


class Reviews(models.Model):

    name = models.OneToOneField(CableParks, on_delete=models.CASCADE, primary_key=True)
    score = models.FloatField(default=0.0)


class Icon(models.Model):

    name = models.CharField(max_length=128)
    image = models.BinaryField()


class PredictionPerHour(models.Model):

    location = models.ForeignKey(CableParks, on_delete=models.CASCADE)
    image = models.ForeignKey(Icon, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    temperature = models.IntegerField()
    precipitation = models.FloatField()
    wind_force = models.IntegerField()
    wind_direction = models.CharField(max_length=5)


class PredictionPerDay(models.Model):

    location = models.ForeignKey(CableParks, on_delete=models.CASCADE)
    image = models.ForeignKey(Icon, on_delete=models.CASCADE)
    date = models.DateField()
    min_temp = models.IntegerField()
    max_temp = models.IntegerField()
    precipitation = models.FloatField()
    wind_force = models.IntegerField()
    wind_direction = models.CharField(max_length=5)
