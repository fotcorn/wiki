from django.conf.urls import include, url
from django.contrib import admin

from api import urls as api_urls
from account import urls as account_urls

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api_urls)),
    url(r'^accounts/', include(account_urls)),
]
