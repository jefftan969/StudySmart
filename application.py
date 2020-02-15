# imports
from flask import Flask, render_template, request, jsonify
import scripts.ledctrl as ledCtrl
import scripts.color as colorUtil
import time
from collections import deque

# initialize flask
app = Flask(__name__)

# initialize data structure to hold known device counts
numOldEntries = 25
deviceData = {}

# routes

@app.before_first_request
def before_first_request():
    print('########### Restarted, first request made ###########')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/nodeUpdate', methods=['POST'])
def nodeUpdate():
    node = request.form.get('node')
    newValue = request.form.get('value')

    if node not in deviceData.keys():
        # add new queue entry into deviceData
        deviceData[node] = deque([newValue], numOldEntries)
    else:
        deviceData[node].append(newValue)

    print("Adding data to node %s: %s" % (node, newValue))
    return ""

@app.route('/getNodeData', methods=['GET'])
def getNodeData():
    node = request.form.get('node')
    return deviceData[node]

@app.route('/getLastVals', methods=['GET'])
def getLastVals():
    return {key:value[-1] for (key,value) in deviceData.items()} #gets most recent entry for each elem

# run the server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port='80')
