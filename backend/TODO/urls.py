from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from usersapp.views import UserModelViewSet
from projectsapp.views import ProjectModelViewSet, NoteToDoModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="TODO",
      default_version='0.1',
      description="Documentation to out project",
      contact=openapi.Contact(email="admin@mail.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(AllowAny, ),
)


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', NoteToDoModelViewSet)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api-auth-token/', obtain_auth_token),
   path('api/', include(router.urls)),
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui()),
   path('swagger/', schema_view.with_ui()),
]