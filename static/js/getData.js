setInterval(() => {
    $.get("/getLastVals", (data) => {
        dat = JSON.parse(data.replace(/'/g, '"'))
        plotPoints(Object.keys(dat).map(function(key) {
            return parseInt(dat[key]);
        }));
    })
}, 3000)


function plotPoints(dataValues) {
    console.log("ploting updates:" + dataValues)
}