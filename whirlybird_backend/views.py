from django.db.models import Max, Count, Sum, Avg
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from whirlybird_backend.serializers import *
import datetime


@api_view(['GET'])
def cableparks_list(request):
    cableparks = CableParks.objects.all()
    serializer = CableParksSerializer(cableparks, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def cableparks_detail(request, pk):
    try:
        cablepark = CableParks.objects.get(pk=pk)
    except CableParks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CableParksSerializer(cablepark)
    return Response(serializer.data)


@api_view(['GET'])
def weather(request, pk):
    today = datetime.date.today()
    predicted_weather_serializer = []

    try:
        cablepark = CableParks.objects.get(pk=pk)
    except CableParks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    for i in range(4):
        try:
            predicted_weather = WeatherPredictions.objects.filter(location=pk,
                                                                  date=(today + datetime.timedelta(days=i)))
            predicted_weather_serializer.append(WeatherPredictionsSerializer(predicted_weather, many=True))
        except WeatherPredictions.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    cablepark_serializer = CableParksSerializer(cablepark)

    return Response({
        'cablepark': cablepark_serializer.data,
        'd0': predicted_weather_serializer[0].data,
        'd1': predicted_weather_serializer[1].data,
        'd2': predicted_weather_serializer[2].data,
        'd3': predicted_weather_serializer[3].data
    })


@api_view(['GET'])
def summarized_weather(request, pk):
    today = datetime.date.today()
    daytime_begin = datetime.datetime.strptime('10:00', '%H:%M').time()
    daytime_end = datetime.datetime.strptime('20:00', '%H:%M').time()
    now = datetime.datetime.now()
    predicted_weather = []

    try:
        cableparks = CableParks.objects.get(pk=pk)
    except CableParks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    cableparks_serializer = CableParksSerializer(cableparks)

    try:
        current_weather = WeatherPredictions.objects.filter(location=pk, date=today,
                                                            time__range=(
                                                                now.time(),
                                                                (now + datetime.timedelta(hours=1)).time()))[:1]

        for i in range(4):
            predicted_weather.append(
                WeatherPredictions.objects
                    .filter(location=pk, date=(today + datetime.timedelta(days=i)))
                    .aggregate(Max('temperature'),
                               Sum('precipitation')))

            predicted_weather[i]["image"] = WeatherPredictions.objects \
                                                .filter(location=pk,
                                                        date=(today + datetime.timedelta(days=i)),
                                                        time__range=(daytime_begin, daytime_end)) \
                                                .values_list('image') \
                                                .annotate(img=Count('image')) \
                                                .order_by("-img")[:1][0][0]

            predicted_weather[i]["date"] = (today + datetime.timedelta(days=i)).strftime("%d/%m")

    except WeatherPredictions.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    current_weather_serializer = WeatherPredictionsSerializer(current_weather[0])

    return Response({
        'cablepark': cableparks_serializer.data,
        'weather': current_weather_serializer.data,
        'd0': predicted_weather[0],
        'd1': predicted_weather[1],
        'd2': predicted_weather[2],
        'd3': predicted_weather[3]
    })


@api_view(['POST'])
def create_user(request):
    new_user = UserSerializer(data=request.data)

    if new_user.is_valid():
        User.objects.create_user(username=new_user.initial_data['username'],
                                 first_name=new_user.initial_data['first_name'],
                                 last_name=new_user.initial_data['last_name'],
                                 email=new_user.initial_data['email'],
                                 password=new_user.initial_data['password'],
                                 )
        return Response(new_user.data, status=status.HTTP_201_CREATED)
    else:
        return Response(new_user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'GET', 'DELETE'])
@authentication_classes([JSONWebTokenAuthentication, SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def user_profile(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(request.user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            User.objects.filter(username=request.user) \
                .update(username=request.data['username'],
                        email=request.data['email'],
                        first_name=request.data['firstname'],
                        last_name=request.data['lastname'])

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def review_score(request, pk):
    if request.method == 'GET':
        score = Review.objects.filter(name_id=pk).values('score').aggregate(Avg('score'))
        return Response(score)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication, SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def post_review_score(request):
    print(request.data)

    Review.objects.update_or_create(defaults={'score': request.data['score']},
                                    user_id=request.user.id,
                                    name_id=request.data['name_id'])
    return Response(request.data)
