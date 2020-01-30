from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from whirlybird_backend.models import *
from whirlybird_backend.serializers import *


@api_view(['GET'])
def cableparks_list(request, format=None):
    """
    List all code CableParks, or create a new CablePark.
    """
    if request.method == 'GET':
        cableparks = CableParks.objects.all()
        serializer = CableParksSerializer(cableparks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CableParksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def cableparks_detail(request, pk, format=None):
    """
    Retrieve, update or delete a code CablePark.
    """
    try:
        cablepark = CableParks.objects.get(pk=pk)
    except CableParks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CableParksSerializer(cablepark)
        return Response(serializer.data)


@api_view(['POST'])
def create_user(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        User.objects.create_user(
            serialized.initial_data['username'],
            serialized.initial_data['email'],
            serialized.initial_data['password']
        )
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET', 'DELETE'])
def user_profile(request, username):
    try:
        user = User.objects.get(username=username)
    except CableParks.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)