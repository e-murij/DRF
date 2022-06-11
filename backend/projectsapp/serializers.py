from rest_framework import serializers
from .models import Project, NoteToDo


class ProjectSerializer(serializers.ModelSerializer):
    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ProjectCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class NoteToDoSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    project = ProjectSerializer()

    class Meta:
        model = NoteToDo
        fields = '__all__'


class NoteToDoCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = NoteToDo
        fields = '__all__'

