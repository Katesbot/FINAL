from flask import Flask, render_template, redirect, jsonify, request
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

app = Flask(__name__)

connection_string = "postgres:postgres@localhost:5432/MoreWineeeee"
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()

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

if __name__ == "__main__":
    app.run(debug=True)
