from flask import Flask, render_template, redirect, jsonify, request
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

app = Flask(__name__)

connection_string = "postgres:postgres@localhost:5432/MoreWineeeeeee"
engine = create_engine(f'postgresql://{connection_string}')
conn = engine.connect()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/data")
def data():
    results = conn.execute("SELECT * FROM winedescriptions")

    WineDescriptions = []
    for result in results:
        WineDescriptions_dict = {}
        WineDescriptions_dict["Type"] = result[1]
        WineDescriptions_dict["Variety"] = result[2]
        WineDescriptions_dict["Description"] = result[3]
        WineDescriptions.append(WineDescriptions_dict)

    return jsonify(WineDescriptions)

if __name__ == "__main__":
    app.run(debug=True)
