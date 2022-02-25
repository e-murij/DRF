from rest_framework.viewsets import ModelViewSet
from .models import Project, NoteToDo
from .serializers import ProjectSerializer, NoteToDoSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class NoteToDoModelViewSet(ModelViewSet):
    queryset = NoteToDo.objects.all()
    serializer_class = NoteToDoSerializer

