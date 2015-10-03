from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^account/', include('account.urls', namespace='account')),
]
