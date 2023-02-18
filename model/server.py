from flask import Flask
from flask import request
from flask_cors import CORS
import import_ipynb
import model
import json


app = Flask(__name__)
CORS(app)

@app.route("/", methods = ['POST'])
def collector():
    field = request.json.get('field')
    value = { 
        "result": model.text_rewrite(field) 
    }

    return json.dumps(value)