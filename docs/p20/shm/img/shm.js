SVG2.cache("p20/shm/img/shm.js", {

shm: (sel, n, t, y) => {
    if (!n) n = 0;
    let [T, dt, dec_t] = t ? t : [1, 0.2, 1];
    let [ymax, dy, dec_y, unit] = y ? y : [4, 1, 0, "m"];
    if (!unit) unit = "m";
    if (n) unit = `(${unit}/s${n==2?"^2":""})`;
    unit = ["Position", "Velocity", "Acceleration"][n] + " / " + unit;    
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-dt, 9*dt, -5*dy, 5*dy], margin: [36, 16, 12, 12]});
    svg.graph({grid: [dt, dy], css: true,
        x: {tick: [dt, 9.1*dt, dt], dec: dec_t, title: ["Time / s", [8.25*dt, "8"]], shift: [0, "-22"]},
        y: {tick: [-5*dy, 5.1*dy, dy], dec: dec_y, title: [unit, "-60"], shift: ["-10", "-4"]},
        data: [{locus: [(x) => ymax * sin(360 / T * x + 90 * n)]}]
    });
    svg.$.find("text.Zero").remove();
    if (n) svg.$.find("g.Locus").css({stroke: ["red", "purple"][n-1]});
},

v_t: (sel, n, click) => {
    console.log(82, sel);
    let xva = {n: (n ? n : 0) - 1};
    let svg = new SVG2(sel, {size: [480, 300], lrbt: [-0.25, 2, -1.25, 1.25], margin: 2});
    svg.graph({grid: [0.25, 0.25],
        data: [{locus: [(x) => Math.sin(2 * Math.PI * (x + xva.n / 4))]}]
    });
    svg.animate(svg.series[0].find("polyline"));
    let arr = ["→", 5, [0, "12"]];
    svg.symbol(["t", 2]).config({shift: [1.875, "-24"]});
    let sym = svg.symbol(["x", 1], arr).config({shift: ["-18", 1.05]});
    svg.css_map("grid", "plot", "text");
    sym.css({fill: "#0065fe"});

    let next_graph = (n) => {
        let a = xva.n = n == null ? (xva.n + 1) % 3 : n;
        let c = ["#0065fe", "red", "purple"][a];
        $(sym.$.css({fill: c}).find("text")[0]).html(["x", "v", "a"][a]);
        svg.$.find("polyline").css({stroke: c});
        svg.update(0);
    }
    next_graph();
    if (click) svg.$.on("click", () => next_graph());
    return svg;
},

x_t: (sel) => {
    let svg = SVG2.cache_run("p20/shm/img/shm.js", "v_t", sel);
    svg.arrow({tail: [0.25, 1.05], tip: [1.25, 1.05]}, {tail: "3", double: 1}).addClass("Toggle1");
    svg.arrow({tail: [1.25, 0], tip: [1.25, 1]}, {tail: "3", double: 1}).addClass("Toggle0");
    svg.symbol(["T", 2]).addClass("Toggle1").config({shift: [0.75, 0.875]});
    svg.symbol(["A", 2]).addClass("Toggle0").config({shift: [1.31, 0.5]});
    svg.css_map("arrow", "text");
    svg.$.find(".Toggle0, .Toggle1").css({fill: "grey"});

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
    );

},

});