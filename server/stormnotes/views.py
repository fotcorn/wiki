from django.http import HttpResponse
import os

from django.conf import settings


def index(request):
    """ development view to deliver index.html on all /wiki/* sub pages """
    with open(os.path.join(settings.BASE_DIR, '..', 'client', 'index.html')) as f:
        html = f.read()
    return HttpResponse(html)
