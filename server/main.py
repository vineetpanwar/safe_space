from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def get_date():
    return jsonify({ 'abc': 'def'})

if __name__ == '__main__':
    app.run()