from django.conf.urls import include, url

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^account/', include('account.urls', namespace='account')),
]
