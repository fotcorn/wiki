import json
from flask import Flask, jsonify, request
from flask.ext.cors import CORS
from redis_store import RedisStore


app = Flask(__name__)
cors = CORS(app)

r = RedisStore()

USERNAME = 'admin'  # hardcoded for now

@app.route('/api/pages/<page>/', methods=['GET', 'POST'])
def page(page):
    if request.method == 'POST':
        data = json.loads(request.data)
        r.set_page(USERNAME, page, data['text'])
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'text': r.get_page(USERNAME, page)})

if __name__ == '__main__':
    app.run(debug=True)
