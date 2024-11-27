SVG2.cache("test/plot.js", {

plot: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 140], margin: [62, 12, 52, 12]});
    let pts = [[0, 125], [3, 125], [8, 0]];
    svg.graph({grid: [0.5, 10], css: true,
        x: {tick: [0, 8.1, 1], dec: 0, title: ["Time / s", "-44"], shift: [0, "-20"]},
        y: {tick: [0, 141, 20], title: ["Velocity / (km/h)", "-44"], shift: ["-10", "-5"]},
        data: [
            {locus: [(x, t) => 50 * (1 + sin(80 * (x - 2 * t))), [0, 8]]},
            {connect: pts},
            {plot: [pts, ["10", "10"], null, 45]},
            {plot: [{x: [1, 4, 7], y: [100, 80, 60]}, "7"]},
        ]
    });
    svg.animate(svg.series[0].find(".Locus")).play().$.on("click", () => svg.toggle());
},

pe: (sel) => { // Photoelectric Effect graph
    let svg = new SVG2(sel, {size: [512, 420], lrbt: [0, 12, 0, 4], margin: [52, 12, 56, 12]});
    svg.graph({grid: [1, 0.2],
        x: {tick: [0, 12.1, 2], shift: [0, "-20"]},
        y: {tick: [0, 4.1, 1], title: ["Maximum Kinetic Energy / eV", "-32"], shift: ["-10", "-5"]},
        data: [
            {locus: [(f) => 0.414 * (f - 5), [5, 12]]},
            {locus: [(f) => 0.414 * (f - 3), [3, 12]]},
        ]
    });
    let g = svg.find("g.Text");
    let f = g.symbol(["Frequency / 10 ", 0], ["14", 4, ["70", "12"]], ["Hz", 0, ["96", 0]]).recenter([6, "-36"]);
    svg.css_map("grid", "text", "plot").addClass("NoStyle");
    f.css({"font-family": SVG2.sans});
    $(svg.$.find("g.Series g.Locus")[0]).css({stroke: "red"});
    g.text("A", [7, 2]).css({fill: "#0065fe"});
    g.text("B", [9, 1.2]).css({fill: "red"});
    // svg.save();
},

});