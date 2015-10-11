import os
from django.conf.urls import include, url
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^account/', include('account.urls', namespace='account')),
]

from django.views import static

if settings.SYSTEM == 'development':
    urlpatterns += [
        url(r'^wiki/', views.index),
        url(r'^static/fonts/(?P<path>.*)$', static.serve, kwargs={
            'document_root': os.path.join(settings.BASE_DIR, '..', 'client', 'node_modules', 'roboto-font', 'fonts')
        }),
        url(r'^static/(?P<path>.*)$', static.serve, kwargs={
            'document_root': os.path.join(settings.BASE_DIR, '..', 'client')
        }),
    ]
