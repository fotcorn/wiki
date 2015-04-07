from flask import Flask, jsonify
from flask.ext.cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route('/api/pages/<page>/')
def page(page):
    return jsonify({'text': u'# {}'.format(page)})

if __name__ == '__main__':
    app.run(debug=True)
