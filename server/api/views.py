import json
from django.http.response import JsonResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from .redis_store import RedisStore

r = RedisStore()


@csrf_exempt
def page(request, page_name):
    if not request.user.is_authenticated():
        return HttpResponseForbidden()

    if request.method == 'POST':
        data = json.loads(request.body)
        r.set_page(request.user.pk, page_name, data['text'])
        return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse({'text': r.get_page(request.user.pk, page_name)})
