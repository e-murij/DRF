import django_filters
from django_filters import CharFilter, DateTimeFilter
from django_filters.rest_framework import FilterSet
from rest_framework.viewsets import ModelViewSet
from .models import Project, NoteToDo
from .serializers import ProjectSerializer, NoteToDoSerializer
from rest_framework.pagination import LimitOffsetPagination


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class NoteToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class NoteToDoFilter(FilterSet):
    start_time = DateTimeFilter(field_name="updated_at", lookup_expr='gte')
    end_time = DateTimeFilter(field_name="updated_at", lookup_expr='lte')
    project = CharFilter(field_name="project__name", lookup_expr='contains')

    class Meta:
        model = NoteToDo
        fields = ['updated_at', 'project']


class ProjectFilter(FilterSet):
    name = CharFilter(field_name="name", lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ProjectModelViewSet(ModelViewSet):
    """
        Доступны все варианты запросов;
        Для постраничного вывода установлен размер страницы 10 записей;
        Добавлена фильтрацию по совпадению части названия проекта по полю name
        пример запроса: http://127.0.0.1:8000/api/projects/?name=Dj

    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    # def get_queryset(self):
    #     queryset = Project.objects.all()
    #     name = self.request.query_params.get('name', None)
    #     if name:
    #         queryset = queryset.filter(name__contains=name)
    #     return queryset


class NoteToDoModelViewSet(ModelViewSet):
    """
        Доступны все варианты запросов;
        При удалении выставляется признак is_active в False, сама запись не удаляется;
        Добавлена фильтрацию по  части названия проекта параметр запроса project
        пример запроса http://127.0.0.1:8000/api/notes/?project=Py
        Для постраничного вывода установлен размер страницы 20 записей
        Фильтрация по дате создания. Передаем 2 даты, дату начала(start_time) и окончания(end_time)
        пример запроса http://127.0.0.1:8000/api/notes/?end_time=2022-03-03&start_time=2022-02-22

    """
    queryset = NoteToDo.objects.all()
    serializer_class = NoteToDoSerializer
    pagination_class = NoteToDoLimitOffsetPagination
    filterset_class = NoteToDoFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    # def get_queryset(self):
    #     queryset = NoteToDo.objects.all()
    #     project_name = self.request.query_params.get('project', None)
    #     if project_name:
    #         queryset = queryset.filter(project__name__contains=project_name)
    #     return queryset
