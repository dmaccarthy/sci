SVG2.cache("_test/_p20/fq3.js", {

rocket: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 12, 0, 3000], margin: [72, 12, 50, 12]});
    let k = 2880 / 6;
    svg.graph({grid: [0.5, 100], css: true,
        x: {tick: [0, 13, 2], title: ["Time / s", [6, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 3001, 500], title: ["Position / m", "-56"], shift: ["-10", "-4"]},
        data: [
            {locus: [(t) => 20*t*t, [0, 12]]},
            {locus: [(t) => 2880 + k * (t - 12), [6, 12]]},
        ],
    });
    let g = svg.series[1].css("red1").$.hide();
    svg.$.on("click", () => g.fadeToggle());
},

lrt: (sel) => {
    let x = [...range(0, 11)], y;
    let pts = zip(x, [...fn_eval((x) => 30 - 1.4 * x, x)]);
    console.log(pts);
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 32], margin: [60, 12, 50, 12]});
    svg.graph({grid: [0.5, 2], css: true,
        x: {tick: [0, 10.1, 1], title: ["Time / s", [5, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 33, 4], title: ["Velocity / (m/s)", "-44"], shift: ["-10", "-4"]},
        data: [
            {connect: [pts[0], pts[10]]},
            {plot: [pts, "4"]},
        ],
    });
    let g1 = svg.group("blue1");
    for (let i=1;i<11;i++) {
        [x, y] = pts[i];
        g1.line([x, y], [x, 0]);
    }
    g1 = g1.$.hide().insertBefore(svg.$.find("g.Series"));
    let g2 = svg.series[1].$.hide();
    svg.$.on("click", () => {
        g1.fadeToggle();
        g2.fadeToggle();
    });
},

});