from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User
# Register your models here.


class TODOUserAdmin(UserAdmin):
    model = User,
    list_display = ['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active']


admin.site.register(User, TODOUserAdmin)
