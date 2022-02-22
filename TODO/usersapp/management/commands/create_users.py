from django.core.management.base import BaseCommand
import json
import os
from usersapp.models import User

JSON_PATH = 'usersapp/jsons'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), 'r', encoding='UTF-8') as file:
        return json.load(file)


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser(username='admin', password='admin', email='admin@mail.ru')
        users = load_from_json('users')
        for item in users:
            User(**item).save()
