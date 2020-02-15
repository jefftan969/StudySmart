setInterval(() => {
    $.get("/getLastVals", (data) => {
        dat = JSON.parse(data.replace(/'/g, '"'))
        plotPoints(Object.keys(dat).map(function(key) {
            return parseInt(dat[key]);
        }));
    })
}, 3000)

var markerOccupancy = {};
var markerPeople = {};
var buildingOccupancy = {};

function plotPoints(dataValues) {
    var index = 0;
    markerOccupancy = {};
    // Update occupancy data
    for(var marker in markerNames) {
        // var numPeople = dataValues[index];
        var numPeople = Math.floor(15 * Math.random());
        var occupancy = ((numPeople / markerSizes[marker]) * 100).toPrecision(4);
        markerPeople[marker] = numPeople;
        markerOccupancy[marker] = occupancy;
        index++;
    }

    // Update building data
    for(var building in mapData["paths"]) {
        var hasSeats = buildingSizes[building] || -1;
        if(hasSeats != -1) {
            var numPeople = 0;
            for(var i in markerBuildings[building]) {
                numPeople += parseInt(markerOccupancy[markerBuildings[building][i]]);
            }
            var occupancy = ((numPeople / buildingSizes[building]) * 100).toPrecision(4);
            buildingOccupancy[building] = occupancy;
        }
    }

    // Update map
    cmuMap = $("#map").vectorMap("get", "mapObject");
    cmuMap.series.markers[0].setValues(Object.values(markerOccupancy));
    // cmuMap.series.regions[0].setValues(getBuildingOccupancies());    
}

function getBuildingOccupancy(building) {
    var hasSeats = buildingSizes[building] || -1;
    if(hasSeats == -1) return 100;
    else return 0;
}

function getBuildingOccupancies() {
    var result = [];
    for(var building in mapData["paths"]) {
        result.push(getBuildingOccupancy(building));
    }
    return result;
}