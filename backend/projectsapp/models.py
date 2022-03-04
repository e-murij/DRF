from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64, unique=True)
    link_repository = models.URLField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name} {self.link_repository}'


class NoteToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(verbose_name='активна', default=True)
