from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from usersapp.views import UserModelViewSet
from projectsapp.views import ProjectModelViewSet, NoteToDoModelViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', NoteToDoModelViewSet)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api-auth-token/', obtain_auth_token),
   path('api/', include(router.urls)),
]