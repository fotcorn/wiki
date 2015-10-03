from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^pages/(?P<page_name>[a-zA-Z0-9:]+)/$', views.page, name='page')
]
