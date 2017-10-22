from flask import Flask, request
import modules.reddit as red
import modules.spotify as spot
import modules.azure as az
import modules.twitter as twit

app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/reddit/<subreddit>/<emotion>")
def reddit(subreddit, emotion):
    return red.fetch_posts(subreddit, emotion)

@app.route("/spotify/<emotion>")
def spotify(emotion):
    uri = spot.fetch_playlist_uri(emotion)
    return uri

@app.route("/azure/<emotion>")
def azure(emotion):
    return az.get_image_uri(emotion)

@app.route("/twitter/<emotion>")
def twitter(emotion):
    return "unimplemented"

@app.route("/scripts/main.js")
def mainjs():
    return app.send_static_file("scripts/main.js")

@app.route("/scripts/vue.js")
def vuejs():
    return app.send_static_file("scripts/vue.js")

@app.route("/scripts/axios.min.js")
def axiosjs():
    return app.send_static_file("scripts/axios.min.js")

@app.route("/styles/main.css")
def maincss():
    return app.send_static_file("styles/main.css")

if __name__ == "__main__":
    app.run()

