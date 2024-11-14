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

});