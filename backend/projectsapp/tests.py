from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from .views import ProjectModelViewSet
from .models import Project, NoteToDo
from usersapp.models import User
from mixer.backend.django import mixer


class TestProjectApi(TestCase):

    def setUp(self) -> None:
        self.user = User.objects.create_superuser('admin', email='admin@mail.com', password='1234')
        self.project = mixer.cycle(4).blend(Project)

    def test_get_project_list_factory(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects')
        force_authenticate(request, self.user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 4)

    def test_create_project_201_factory(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects', {'name': 'some project', 'link_repository': 'https://github.com/e-murij/DRF'})
        force_authenticate(request, self.user)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_project_401_factory(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects', {'name': 'some project', 'link_repository': 'https://github.com/e-murij/DRF'})
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_project_APIClient(self):
        client = APIClient()
        client.login(username='admin', password='1234')
        response = client.get('/api/projects/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()

    def test_edit_project_APIClient(self):
        client = APIClient()
        client.login(username='admin', password='1234')
        response = client.put('/api/projects/1/', {'name': 'new_project', 'link_repository': 'https://github.com/e-murij/DRF'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=1)
        self.assertEqual(project.name, 'new_project')
        client.logout()


class TestNoteToDoClientApi(APITestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_superuser('admin', email='admin@mail.com', password='1234')
        self.NoteToDo = mixer.cycle(4).blend(NoteToDo)

    def test_get_list_NoteToDo_401(self):
        self.client.login(username='admin', password='1234')
        self.client.logout()
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_list_NoteToDo_200(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 4)
        self.client.logout()

    def test_get_detail_NoteToDo(self):
        self.client.force_login(self.user)
        response = self.client.get('/api/notes/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
