from .base_settings import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'TODO',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'db',
        'PORT': '5432'
    }
}
