from flask import Flask, request
import modules.reddit as red

app = Flask(__name__, static_url_path='')

@app.route("/")
def index():
    return app.send_static_file("index.html");

@app.route("/reddit")
def reddit():
    return red.fetchposts('happy')

if __name__ == "__main__":
    print("The magic happens at port 5000")
    app.run()
