from rest_framework import serializers
from .models import Project, NoteToDo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NoteToDoSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    project = ProjectSerializer()

    class Meta:
        model = NoteToDo
        fields = '__all__'

