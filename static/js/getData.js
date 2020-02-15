setInterval(() => {
    $.get("/getLastVals", (dat) => {
        plotPoints(Object.keys(dat).map(function(key) {
            return dat[key];
        }));
    })
}, 3000)

var markerOccupancy = {"a":0,"b":0,"c":0,"d":0,"e":0,"f":0,"g":0,"h":0,"i":0,"j":0,"k":100};
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
                var markerName = markerBuildings[building][i];
                numPeople += parseInt(markerPeople[markerName]);
            }
            var occupancy = ((numPeople / buildingSizes[building]) * 100).toPrecision(4);
            buildingOccupancy[building] = occupancy;
        }
    }

    // Update map
    cmuMap = $("#map").vectorMap("get", "mapObject");
    cmuMap.series.markers[0].setValues(Object.values(markerOccupancy));
    cmuMap.series.regions[0].setValues(getBuildingOccupancies());    
}

function getBuildingOccupancy(building) {
    var hasSeats = buildingSizes[building] || -1;
    if(hasSeats == -1) return 100;
    else return 0;
}

function getBuildingOccupancies() {
    var result = {};
    for(var building in mapData["paths"]) {
        result[building] = getBuildingOccupancy(building);
    }
    return result;
}