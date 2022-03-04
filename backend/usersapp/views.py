from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    """
        Есть возможность просмотра списка и каждого пользователя в отдельности,
        можно вносить изменения, нельзя удалять и создавать

    """
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
