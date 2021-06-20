from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from . import models


# Create your views here.
@api_view(['POST'])
def create_auth(request):
    serialized = serializers.RegisterUserSerializer(data=request.data)

    if serialized.is_valid():
        user = User.objects.create_user(
            username=serialized.validated_data['username'],
            email=serialized.validated_data['email'],
            password=serialized.validated_data['password']
        )
        account = models.Account(user=user)
        account.save()

        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)
