SVG2.cache("p30/mom/img/impulse.js", {

bat: (sel) => {
    $(sel).attr({width: 480, height: 400, "data-aspect": "6/5"});
    let svg = applet.graph(sel, {
        grid: [[0, 0.32, 0.02], [0, 110, 10], 1],
        margin: [0.2, 0.06, 0.18, 0.05],
        x: ["Time / s", [">", "-48"], {interval: 0.06, fixed: 2, length: "8", offset: [0, "-22"]}],
        y: ["Force / N", ["-60", ">"], {interval: 20, length: "8", offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.poly([[0, 0], [0.08, 100], [0.18, 100], [0.3, 0]]);
    svg.final();
},

});