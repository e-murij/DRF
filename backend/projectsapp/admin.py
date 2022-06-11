from django.contrib import admin
from .models import NoteToDo, Project
# Register your models here.
admin.site.register(NoteToDo)
admin.site.register(Project)
