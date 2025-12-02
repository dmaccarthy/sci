SVG2.cache("p20/kin/img/acc.js", {

vt: (sel) => {
    let pt = [2.5, -9.81 * 2.5];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -45, 0], margin: [62, 12, 12, 28]});
    let p = svg.group().css(".Plot", "black@1");
    svg.graph({grid: [0.5, 5],
        x: {tick: [0, 4.1, 1], tickSize: "6", title: ["Time / s", [3.5, "-20"]], shift: [0, "12"]},
        y: {tick: [-45, 0, 5], title: ["Velocity / (m/s)", "-44"], shift: ["-10", "-5"]},
        data: [{connect: [[0, 0], [4, -9.81 * 4]]}]
    });
    p.poly([[0, 0], pt, [2.5, 0]]).css({stroke: "none", fill: "#0065fe", "fill-opacity": 0.2});
    p.circle("5", pt).css({fill: "#0065fe"});
    svg.$.on("click", () => p.$.fadeToggle()).append(p.$.hide());
},

dt: (sel) => {
    let t = 2.5, v = -9.81 * t, d = v * t / 2;
    let pt = new RArray(t, v * t / 2);
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -80, 0], margin: [62, 12, 12, 28]});
    let p = svg.group().css(".Plot", "black@1");
    svg.graph({grid: [0.5, 10],
        x: {tick: [0, 4.1, 1], tickSize: "6", title: ["Time / s", [3.5, "-20"]], shift: [0, "12"]},
        y: {tick: [-80, 0, 10], title: ["Position / m", "-44"], shift: ["-10", "-5"]},
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
        y: {tick: [0, 141, 20], title: ["Velocity / (km/h)", "-44"], shift: ["-10", "-5"]},
        data: [{connect: [[0, 125], [3, 125], [8, 0]]}]
    });
},

});