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
    # Импортируем JSON 
    dump = open('patterns.json')
    patterns = json.load(dump)
    for pattern in patterns:
        if (field.find(pattern["substring"]) != -1) and (pattern["field_id"] == False):
            return json.dumps(pattern)
    
    # Если рерайтинг запускаем нейронку
    for pattern in patterns:
        if (field.find(pattern["substring"]) != -1):
            return json.dumps({ 
                "result": model.text_rewrite(field),
                "field_id": pattern["field_id"]  
            })
            
    # Дефолтный возврат
    return json.dumps({ 
        "result": "Друг, у меня нет ответов на твой вопрос! Но скоро он появится!)",
        "field_id": False  
    })
    