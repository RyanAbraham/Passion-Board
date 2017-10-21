from flask import Flask, request, send_from_directory
import modules.reddit as red

app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/reddit/<emotion>")
def reddit(emotion):
    return red.fetchposts(emotion)

@app.route("/scripts/main.js")
def mainjs():
    return app.send_static_file("scripts/main.js")

@app.route("/scripts/vue.js")
def vuejs():
    return app.send_static_file("scripts/vue.js")

@app.route("/styles/main.css")
def maincss():
    return app.send_static_file("styles/main.css")

if __name__ == "__main__":
    app.run()

