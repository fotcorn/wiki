import os
import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SYSTEM = 'development'
if os.environ.get('STORMNOTES_PRODUCTION'):
    SYSTEM = 'production'

if SYSTEM == 'production':
    DEBUG = False
    ALLOWED_HOSTS = [os.environ['STORMNOTES_ALLOWED_HOST']]
    SECRET_KEY = os.environ['STORMNOTES_SECRET_KEY']
else:
    DEBUG = True
    ALLOWED_HOSTS = []
    SECRET_KEY = '@v%jtvz^m+2ura0epp18ld^67bxs(9c5!-33213qs6s6f4+_$7'

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.staticfiles',
    'django.contrib.messages',

    'api',
    'account',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'stormnotes.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
            ],
        },
    },
]

WSGI_APPLICATION = 'stormnotes.wsgi.application'

SESSION_ENGINE = 'redis_sessions.session'
SESSION_REDIS_PREFIX = 'django_session'

if SYSTEM == 'development':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
elif SYSTEM == 'production':
    DATABASES = {'default': dj_database_url.config()}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/authstatic/'

AUTH_USER_MODEL = 'account.User'
LOGIN_REDIRECT_URL = '/wiki/index'
