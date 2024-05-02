# serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import LearningInfo

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError('User account is disabled.')
            else:
                raise serializers.ValidationError('Invalid username or password.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return data

class LearningInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningInfo
        fields = ['id', 'lesson_number', 'lesson_title', 'lesson_description', 'user']
