SVG2.cache("p20/kin/img/acc.js", {

vt: (sel) => {
    let pt = [2.5, -9.81 * 2.5];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -45, 0], grid: [0.5, 5], margin: [62, 12, 12, 28]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [1, 4.2, 1], ...tick});
    svg.ticks({y: [-45, -1, 5], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [3.8, "8", "br"]);
    g.text("Velocity / (m/s)", ["-40", -22.5, "b"], 90);
    g = svg.group("#0065fe", "black@1", ".Toggle0");
    css(g.poly([[0, 0], pt, [pt[0], 0]], 1), "none@", {"fill-opacity": 0.2});
    g.circle("5", pt);
    css(svg.line([0, 0], [4, -9.81 * 4]), "#0065fe@2");
    svg.click_toggle(1, 1);
},

dt: (sel) => {
    let t = 2.5, v = -9.81 * t, d = v * t / 2;
    let pt = new RArray(t, v * t / 2);
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -80, 0], margin: [62, 12, 12, 28]});
    let p = svg.group().css(".Plot", "black@1");
    svg.graph({grid: [0.5, 10],
        x: {tick: [0, 4.1, 1], tickSize: "6", title: ["Time / s", [3.5, "-20"]], shift: [0, "12"]},
        y: {tick: [-80, 0, 10], title: ["Position / m", "-44"], shift: ["-20", 0]},
        data: [{locus: [(x) => -9.81 / 2 * x * x, [0, 4]]}]
    });
    p.line([d/v, 0], pt.plus([1.5, 1.5*v])).css({stroke: "#0065fe", "stroke-width": "1px"});
    p.circle("5", pt).css({fill: "#0065fe"});
    svg.$.on("click", () => p.$.fadeToggle()).append(p.$.hide());
},

vt_radar: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 140], margin: [62, 12, 52, 12]});
    svg.graph({grid: [0.5, 10],
        x: {tick: [0, 8.1, 1], title: ["Time / s", "-44"], shift: [0, "-20"]},
        y: {tick: [0, 141, 20], title: ["Velocity / (km/h)", "-44"], shift: ["-20", 0]},
        data: [{connect: [[0, 125], [3, 125], [8, 0]]}]
    });
},

});