from flask import Flask
import json

app = Flask(__name__)

@app.route("/")
def sanity_check():
    return json.dumps({"success": True})

if __name__ == '__main__':
    app.run()