import json
from django.http.response import JsonResponse, HttpResponseForbidden
from stormnotes.redis_store import RedisStore

r = RedisStore()


def page(request, page_name):
    if not request.user.is_authenticated():
        return HttpResponseForbidden()

    if request.method == 'POST':
        data = json.loads(request.data)
        r.set_page(request.user.username, page_name, data['text'])
        return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse({'text': r.get_page(request.user.username, page_name)})
