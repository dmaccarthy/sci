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
    let svg = new SVG2(sel, {size: [512, 420], lrbt: [0, 12, 0, 3.25], margin: [52, 12, 60, 12]});
    svg.graph({grid: [0.5, 0.2],
        x: {tick: [0, 12.1, 1], shift: [0, "-20"]},
        y: {tick: [0, 4.1, 1], title: ["Stopping Voltage / V", "-32"], shift: ["-10", "-5"]},
        data: [
            {locus: [(f) => 0.414 * (f - 4.4), [4.4, 12]]},
            {plot: [[[10, 5.6 * 0.414]], "5"]},
        ]
    });
    let g = svg.find("g.Text");
    let f = g.symbol(["Frequency / 10 ", 0], ["14", 4, ["70", "12"]], ["Hz", 0, ["96", 0]]).recenter([6, "-44"]);
    svg.css_map("grid", "text", "plot").addClass("NoStyle");
    f.css({"font-family": SVG2.sans});
    g.text("P", [9.6, 2.4]).css({fill: "#0065fe"});
    // svg.save();
},

vt: (sel) => {
    let eq = quadRegXY([0, 2, 4], [8, 12, 0]).fn;
    let pts = [...range(1, 3.01, 0.1)];
    pts = zip(pts, [...fn_eval(eq, pts)]);
    pts = pts.concat([[3, 0], [1, 0]]);
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, 0, 14], margin: [52, 12, 50, 12]});
    svg.graph({grid: [0.5, 1], css: true,
        x: {tick: [0, 4.1, 1], title: ["Time / s", [2, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 15, 2], title: ["Velocity / (m/s)", "-36"], shift: ["-10", "-4"]},
        data: [{locus: [eq, [0, 4]]}],
    });
    svg.poly(pts, 0).css({fill: "#0065fe", "fill-opacity": 0.3}).insertBefore(svg.$.find("g.Series"));
    // svg.$.find("g.LabelX text.Zero").remove();
},

vt1: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 20], margin: [60, 12, 50, 12]});
    svg.graph({grid: [1, 2], css: true,
        x: {tick: [0, 10.1, 1], title: ["Time / s", [5, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 21, 2], title: ["Velocity / (m/s)", "-44"], shift: ["-10", "-4"]},
        data: [
            {connect: [[0, 4], [10, 19]]},
            {plot: [[[4, 10]], "5"]}
        ],
    });
},


});