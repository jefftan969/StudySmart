setInterval(() => {
    $.get("/getLastVals", (dat) => {
        plotPoints(Object.keys(dat).map(function(key) {
            return dat[key];
        }));
    })
}, 3000)


function plotPoints(dataValues) {
    console.log("ploting updates...")
}