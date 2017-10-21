from flask import Flask, request
import modules.reddit as red

app = Flask(__name__, static_url_path='')

@app.route("/")
def index():
    return app.send_static_file("index.html");

@app.route("/reddit/<emotion>")
def reddit(emotion):
    return red.fetchposts(emotion)

if __name__ == "__main__":
    app.run()
