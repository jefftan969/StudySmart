$(function() {
    map = new jvm.Map({
        container: $("#map"),
        backgroundColor: "#222222",
        map: "cmu-map",
        markers: Object.values(markerCoords),
        series: {
            markers: [{
                attribute: "fill",
                values: Object.values(markerOccupancy),
                scale: ["#0fa515", "#e5fee9", "#808080"],
                min: 150,
                max: 200
            },{
                attribute: "r",
                values: Object.values(markerSizes),
                scale: [5, 10],
            }],
            regions: [{
                attribute: "fill",
                values: getBuildingOccupancies(),
                scale: ["#0071a4", "#c8eeff", "#444444"],
                normalizeFunction: "linear"
            }]
        },
        focusOn: {
            x: 1,
            y: 0.6,
            scale: 2.2
        },
        onRegionTipShow: function(event, label, code) {
            var currOccupancy = getBuildingOccupancy(code);
            if(currOccupancy != "100") {
                label.html(label.html() + " (Occupancy: " + currOccupancy + "%)");
            }
        },
        onMarkerTipShow: function(event, label, index) {
            label.html(
                "<b>"+Object.values(markerNames)[index]+"</b><br/>"+
                "<b>Seats: "+Object.values(markerSizes)[index]+"</br>"+
                "<b>People: "+Object.values(markerPeople)[index]+"</br>"+
                "<b>Occupancy: "+Object.values(markerOccupancy)[index]+"%"
            );
        }
    });

    console.log(map.container);
    // map.container.click(function(e) {
    //     var x = e.pageX - map.container.offset().left;
    //     var y = e.pageY - map.container.offset().top;
    //     var latLng = map.pointToLatLng(x, y);
    //     console.log({"left": x, "top": y});
    //     console.log(latLng);
    //     map.addMarker(Math.random(), {latLng: [latLng.lat, latLng.lng]});
    // });
});