# imports
from flask import Flask, render_template, request, jsonify
import scripts.ledctrl as ledCtrl
import scripts.color as colorUtil
import time

# initialize flask
app = Flask(__name__)

# routes

@app.before_first_request
def before_first_request():
    print('########### Restarted, first request made ###########')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/solidcolor', methods=['POST'])
def changeToSolidColor():
    newColor = request.form.get('color')
    print("Setting solid color to %s" % newColor)
    return ""

@app.route('/brightnesschange', methods=['POST'])
def changeBrightness():
    newBrightness = request.form.get('brightness')
    print("Setting brightness to %s%%" % newBrightness)
    return ""

@app.route('/pattern', methods=['POST'])
def startPattern():
    pattern = request.form.get('pattern')
    if pattern == "rainbow":
        print("Starting rainbow...")
    elif pattern == "sparkle":
        print("Starting sparkle...")
    else:
        print("Invalid pattern: %s" % pattern)
    return ""

# run the server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='80')
