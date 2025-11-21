from django.contrib.auth.models import User #for buildin user of django
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4, style={'input_type': 'password'})

    class Meta:
        model = User #from line 1
        fields = ['username', 'email','password']

    def create(self, validated_data):
        # user = User.objects.create_user(**validated_data)  
        user = User.objects.create_user(validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user