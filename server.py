from flask import Flask, request
import modules.reddit as red
import modules.spotify as spot
import modules.azure as az
import modules.twitter as twit
import modules.stories as sto

app = Flask(__name__)
route_val = {}

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/reddit/<subreddit>/<emotion>")
def reddit(subreddit, emotion):
    if('reddit' not in route_val):
        route_val['reddit'] = [emotion, red.fetch_posts(subreddit, emotion)]
    elif(route_val['reddit'][0] != emotion):
        route_val['reddit'] = [emotion, red.fetch_posts(subreddit, emotion)]
    return route_val['reddit'][1]

@app.route("/spotify/<emotion>")
def spotify(emotion):
    if('spotify' not in route_val):
        route_val['spotify'] = [emotion, spot.fetch_playlist_uri(emotion)]
    elif(route_val['spotify'][0] != emotion):
        route_val['spotify'] = [emotion, spot.fetch_playlist_uri(emotion)]
    return route_val['spotify'][1]

@app.route("/azure/<emotion>")
def azure(emotion):
    if('azure' not in route_val):
        route_val['azure'] = [emotion, az.get_image_uri(emotion)]
    elif(route_val['azure'][0] != emotion):
        route_val['azure'] = [emotion, az.get_image_uri(emotion)]
    return route_val['azure'][1]


@app.route("/twitter/<emotion>")
def twitter(emotion):
    return "unimplemented"

@app.route("/stories/<emotion>")
def story(emotion):
    if('stories' not in route_val):
        route_val['stories'] = [emotion, sto.get_story_uri(emotion)]
    elif(route_val['stories'][0] != emotion):
        route_val['stories'] = [emotion, sto.get_story_uri(emotion)]
    return route_val['stories'][1]

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

