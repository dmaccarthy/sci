SVG2.cache("p20/shm/img/shm.js", {

shm: (sel, n, t, y) => {
    if (!n) n = 0;
    let [T, dt, dec_t] = t ? t : [1, 0.2, 1];
    let [ymax, dy, dec_y, unit] = y ? y : [4, 1, 0, "m"];
    if (!unit) unit = "m";
    if (n) unit = `(${unit}/s${n==2?"^2":""})`;
    unit = ["Position", "Velocity", "Acceleration"][n] + " / " + unit;    
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-dt, 9*dt, -5*dy, 5*dy], margin: [36, 16, 12, 12]});
    svg.graph({grid: [dt, dy],
        x: {tick: [dt, 9.1*dt, dt], dec: dec_t, title: ["Time / s", [8.25*dt, "8"]], shift: [0, "-18"]},
        y: {tick: [-5*dy, 5.1*dy, dy], dec: dec_y, title: [unit, "-60"], shift: ["-20", 0]},
        data: [{locus: [(x) => ymax * sin(360 / T * x + 90 * n)]}]
    });
    svg.$.find("text.Zero").remove();
    if (n) svg.$.find("g.Locus").css({stroke: ["red", "purple"][n-1]});
},

v_t: (sel, n, click) => {
    let xva = {n: (n ? n : 0) - 1};
    let svg = new SVG2(sel, {size: [480, 300], lrbt: [-0.25, 2, -1.25, 1.25], margin: 2});
    svg.graph({grid: [0.25, 0.25],
        data: [{locus: [(x) => Math.sin(twoPi * (x + xva.n / 4))]}]
    });
    let poly = svg.series[0].find("polyline").config({animated: true});

    let ylabel = svg.group(); 
    ylabel.mjax("\\vec{\\bf x}", {scale: 0.8}, ["-14", 1.125], "#0065fe");
    ylabel.mjax("\\vec{\\bf v}", {scale: 0.8}, ["-14", 1.125], "red");
    ylabel.mjax("\\vec{\\bf a}", {scale: 0.8}, ["-14", 1.125], "purple");
    svg.mjax("t", {scale: 0.8}, [1.9, "-14"]);

    let next_graph = (n) => {
        let a = xva.n = n == null ? (xva.n + 1) % 3 : n;
        let g = ylabel.$.children("g");
        for (let i=0;i<3;i++) {
            if (i == a) $(g[i]).show();
            else $(g[i]).hide();
        }
        poly.css(["#0065fe@", "red@", "purple@"][a]);
        svg.update(0);
    }
    next_graph();
    if (click) svg.$.on("click", () => next_graph());
    return svg;
},

x_t: (sel) => {
    let svg = SVG2.cache_run("p20/shm/img/shm.js", "v_t", sel);
    svg.arrow({tail: [0.25, 1.05], tip: [1.25, 1.05]}, {tail: "3", double: 1}).css(".Toggle1", "grey");
    svg.arrow({tail: [1.25, 0], tip: [1.25, 1]}, {tail: "3", double: 1}).css(".Toggle0", "grey");
    svg.mjax("A", {scale: 0.8}, [1.33, 0.5], "grey").then(g => g.css(".Toggle0"));
    svg.mjax("T", {scale: 0.8}, [0.75, 0.9], "grey").then(g => g.css(".Toggle1"));
    svg.click_toggle(2);
},

});