from flask import Flask
import modules.reddit as red

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world"

@app.route("/reddit")
def reddit():
    return red.fetchposts('happy')

if __name__ == "__main__":
    print("The magic happens at port 5000")
    app.run()
