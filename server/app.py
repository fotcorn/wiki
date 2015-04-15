from flask import Flask, jsonify
from flask.ext.cors import CORS
from redis_store import RedisStore


app = Flask(__name__)
cors = CORS(app)

r = RedisStore()

USERNAME = 'admin'  # hardcoded for now

@app.route('/api/pages/<page>/')
def page(page):
    return jsonify({'text': r.get_page(USERNAME, page)})

if __name__ == '__main__':
    app.run(debug=True)
