$(function() {
    map = new jvm.Map({
        container: $("#map"),
        backgroundColor: "#222222",
        map: "cmu-map",
        markers: markerData["coords"],
        series: {
            markers: [{
                attribute: "fill",
                values: markerData["occupancy"],
                scale: ["#e5fee9", "#0fa515"]
            },{
                attribute: "r",
                values: markerData["size"],
                scale: [5, 10],
            }],
            regions: [{
                attribute: "fill",
                values: buildingData,
                scale: ["#c8eeff", "#0071a4"],
                normalizeFunction: "linear"
            }]
        },
        onRegionTipShow: function(event, label, code) {
            if(buildingData[code] != "0") {
                label.html(label.html() + " (Occupancy: " + buildingData[code] + ")");
            }
        },
        onMarkerTipShow: function(event, label, index) {
            label.html(
                "<b>"+markerData["name"][index]+"</b><br/>"+
                "<b>Size: "+markerData["size"][index]+"</br>"+
                "<b>Occupancy: "+markerData["occupancy"][index]+"%"
            );
        }
    });

    console.log(map.container);
    map.container.click(function(e) {
        var x = e.pageX - map.container.offset().left;
        var y = e.pageY - map.container.offset().top;
        var latLng = map.pointToLatLng(x, y);
        console.log({"left": x, "top": y});
        console.log(latLng);
        map.addMarker(Math.random(), {latLng: [latLng.lat, latLng.lng]});
    });
});