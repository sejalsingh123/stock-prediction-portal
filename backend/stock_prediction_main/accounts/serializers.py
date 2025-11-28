from django.contrib.auth.models import User
from rest_framework import serializers
from .utils import send_welcome_email

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4, style={'input_type': 'password'})

    class Meta:
        model = User 
        fields = ['username', 'email','password']

    def create(self, validated_data):
        # user = User.objects.create_user(**validated_data)  
        user = User.objects.create_user(validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        # Send welcome email
        send_welcome_email(user.email, user.username)
        print("WELCOME EMAIL SENT!")
        return user