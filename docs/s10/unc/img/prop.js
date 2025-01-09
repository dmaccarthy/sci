SVG2.cache("s10/unc/img/prop.js", {

ebar: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 80, 0, 70], margin: [64, 16, 56, 12]});
    let x = [10, 20, 30, 40, 50, 60, 70, 80];
    let y = [...fn_eval((x) => randint(66, 70) - 0.74 * x, x)];
    let f = linRegXY(x, y).fn;
    svg.graph({grid: [5, 5], css: true,
        x: {tick: [0, 81, 10], title: ["Mass / g", [40, "-44"]], shift: [0, "-20"]},
        y: {tick: [0, 71, 10], title: ["Final Temperature / °C", "-44"], shift: ["-10", "-5"]},
        data: [
            {connect: [[0, f(0)], [80, f(80)]]},
            {plot: [zip(x, y), "4"]}
        ]
    });

    // Error bars
    let g = svg.group().addClass("ErrorBars").css({stroke: "#0065fe"});
    g.$.prependTo(svg.$.find("g.Series"));
    let dx = 5, dy = 3;
    for (let i=0;i<x.length;i++) {
        let xi = x[i], yi = y[i];
        g.errorBar(xi, yi - dy, yi + dy, "8");
        g.errorBar(yi, xi - dx, xi + dx, "8", 1);
    }

    svg.$.addClass("NoStyle");
    svg.css_map("grid", "text", "plot");
},

});