from background_task import background
from whirlybird_backend.models import WeatherPredictions, CableParks
from django.core import serializers
import requests
import json
import datetime


@background(schedule=1)
def update_predicted_weather():
    cableparks = serializers.serialize('python', CableParks.objects.all())

    for park in cableparks:
        print("updating: " + park['fields']['name'])

        url = "https://data.meteoserver.nl/api/uurverwachting_gfs.php?lat=" + str(
            park['fields']['latitude']) + "&long=" + str(park['fields']['longitude']) + "&key=88f8a1da33"
        response = requests.get(url)

        while response.status_code != 200:
            response = requests.get(url)

        WeatherPredictions.objects.filter(location=park).delete()

        raw_json_data = json.loads(response.content)
        usable_data = raw_json_data['data']

        for i in range(100):
            location = CableParks.objects.get(name=park['fields']['name'])
            date = datetime.datetime.strptime(usable_data[i]['tijd_nl'].split(" ")[0], '%d-%m-%Y').strftime('%Y-%m-%d')
            image = usable_data[i]['icoon']
            time = usable_data[i]['tijd_nl'].split(" ")[1]
            temperature = round(float(usable_data[i]['temp']))
            precipitation = float(usable_data[i]['neersl'])
            wind_force = usable_data[i]['windb']
            wind_direction = usable_data[i]['windrltr']

            WeatherPredictions.objects.update_or_create(defaults={"location": location,
                                                                  "image": image,
                                                                  "date": date,
                                                                  "time": time,
                                                                  "temperature": temperature,
                                                                  "precipitation": precipitation,
                                                                  "wind_force": wind_force,
                                                                  "wind_direction": wind_direction},
                                                        location=location, date=date, time=time)
