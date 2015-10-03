from django.conf.urls import include, url
from django.conf import settings
from . import views

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^account/', include('account.urls', namespace='account')),
]

if settings.SYSTEM == 'development':
    urlpatterns += [
        url(r'^wiki/', views.index),
    ]
