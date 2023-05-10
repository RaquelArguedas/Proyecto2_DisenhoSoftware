import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from MainController import *

# Instantiation
app = Flask(__name__)

# Settings
CORS(app)

control = MainController()

# Routes
@app.route('/users', methods=['POST'])
def createUser():
  est = control.buscarEstudiante(1)

  if (est == None):
     jsonStr = "No existe"
  else:
    jsonStr = json.dumps(est.__dict__)

  return jsonify(jsonStr)


if __name__ == "__main__":
    app.run(debug=True)