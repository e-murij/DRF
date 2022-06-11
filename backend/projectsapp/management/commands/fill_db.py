from django.core.management.base import BaseCommand
import json
import os
from usersapp.models import User
from projectsapp.models import NoteToDo, Project

JSON_PATH = 'projectsapp/jsons'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r', encoding='UTF-8') as file:
        return json.load(file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        # User.objects.all().delete()
        User.objects.create_superuser(username='admin', password='admin', email='admin@mail.ru')
        users = load_from_json('users')
        for item in users:
            User(**item).save()
        Project.objects.all().delete()
        projects = load_from_json('projects')
        for item in projects:
            obj = Project(**item)
            obj.save()
            obj.users.add(1, 2)
            obj.save()
        #NoteToDo.objects.all().delete()
        notesToDo = load_from_json('notes')
        for item in notesToDo:
            user = User.objects.get(pk=item['user'])
            project = Project.objects.get(pk=item['project'])
            NoteToDo(project=project, text=item['text'], user=user).save()
