from flask import Flask, render_template, redirect, jsonify, request
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pickle
import numpy as np

app = Flask(__name__)

connection_string = "postgres:Mktiger2!@localhost:5432/MoreWineeeee"
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()

wine_model = pickle.load(open('wine_LOGmodel.sav', "rb"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    winedescriptionresults = conn.execute("SELECT * FROM winedescriptions")

    WineDescriptions = []
    for result in winedescriptionresults:
        WineDescriptions_dict = {}
        WineDescriptions_dict["Type"] = result[1]
        WineDescriptions_dict["Variety"] = result[2]
        WineDescriptions_dict["Description"] = result[3]
        WineDescriptions.append(WineDescriptions_dict)
    
    return jsonify(WineDescriptions)

@app.route("/data2")
def data2():
    winecontentresults = conn.execute("SELECT * FROM winecontent")

    WineContent = []
    for result in winecontentresults:
        WineContent_dict = {}
        WineContent_dict["Type"] = result[1]
        WineContent_dict["Content"] = result[2]
        WineContent_dict["Low"] = result[3]
        WineContent_dict["High"] = result[4]
        WineContent.append(WineContent_dict)
    
    return jsonify(WineContent)

@app.route('/user_answer', methods=['GET', 'POST'])
def get_answers():
    userAnswers = []
    results = []
    if request.method == 'POST':
        answers = request.get_json()
        for answer in answers["responses"]:
            answer = int(answer)
            userAnswers.append(answer)

        userAnswers = np.reshape(userAnswers, (1,-1))
        result = wine_model.predict(userAnswers)

        result_dict = {"Results": int(result[0])}
        results.append(result_dict)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
