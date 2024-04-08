from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def get_date():
    return jsonify({ 'abc': 'def'})

@app.route('/')
def home():
    return jsonify({ 'fooo': 'bar'})

if __name__ == '__main__':
    app.run()