# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import LearningInfo
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer, UserLoginSerializer, LearningInfoSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
def add_learning_info(request):
    if request.method == 'POST':
        try:
            # Parse JSON body from request
            data = json.loads(request.body)

            # Extract values from JSON
            lesson_number = data.get('lesson_number')
            lesson_title = data.get('lesson_title')
            lesson_description = data.get('lesson_description')
            user = data.get('user')

            # Create and save LearningInfo object
            learning_info = LearningInfo.objects.create(
                lesson_number=lesson_number,
                lesson_title=lesson_title,
                lesson_description=lesson_description,
                user=user
            )

            # Return success response
            return JsonResponse({'message': 'Learning info added successfully'}, status=201)

        except Exception as e:
            # Return error response if there's an exception
            return JsonResponse({'error': str(e)}, status=400)

    else:
        # Return error response for unsupported HTTP methods
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@api_view(['POST'])
def user_registration(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            user = User.objects.get(username=username)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_learning_info(request):
    if request.method == 'GET':
        # Retrieve all LearningInfo objects from the database
        learning_info = LearningInfo.objects.all()

        # Serialize the queryset
        serializer = LearningInfoSerializer(learning_info, many=True)

        # Return serialized data as response
        return Response(serializer.data)
