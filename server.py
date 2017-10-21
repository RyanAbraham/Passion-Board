from flask import Flask
import modules.reddit as red

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world"

@app.route("/reddit/<emotion>")
def reddit(emotion):
    return red.fetchposts(emotion)

if __name__ == "__main__":
    app.run()
