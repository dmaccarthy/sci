SVG2.cache("_test/plot.js", {

earth: (sel) => {
    let svg = new SVG2(sel, {scale: 40, lrbt: [-1, 20, -6, 6]}).css(".NoStyle");
    svg.graph({grid: [0.25, 0.25],
        x: {tick: [8, 19, 2], shift: [0, "-22"]},
    });
    let g = svg.group().css("text");
    g.symb(0, ["× 10"], ["m", 0, ["40", 0]], ["6", 4, ["22", "8"]]).align([19, "16"]);
    svg.circle(6.37).css({fill: "#0065fe", "fill-opacity": 0.3, stroke: "black"});
},

g: (sel) => {
    let svg = new SVG2(sel, {scale: 40, lrbt: [-20, 20, -12, 12], grid: 1}).css(".NoStyle");
    svg.$.find("g.Grid").css({"stroke-width": "1"});
    let g = svg.group().css("black1");
    g.circle("25", [8, 0]).css({fill: "lime"});
    g.circle("25", [-8, 0]).css({fill: "#0065fe"});
},

tri: (sel) => {
    let h = root(300);
    let t = 8 + Math.round(h);
    let svg = new SVG2(sel, {scale: 40, lrbt: [-18, 18, -8, t], grid: 0}).css(".NoStyle");
    let g = svg.group().css("black1", {"stroke-width": "3px"});
    let pts = [[-30, 0], [30, 0]];
    g.line([0, -10], [0, t]);
    g.group().config({pivot: [-10, 0], theta: 30}).line(...pts);
    g.group().config({pivot: [10, 0], theta: -30}).line(...pts);
    g = svg.group().css("black1");
    g.circle("25", [10, 0]).css({fill: "lime"});
    g.circle("25", [-10, 0]).css({fill: "red"});
    g.circle("25", [0, h]).css({fill: "#0065fe"});
},

pi: (sel) => {
    let svg = new SVG2(sel, {size: [64, 64], lrbt: [-2, 2], grid: 1});
    svg.delay(svg.group().addClass("Text"), {recenter: [0, 0]}).text("π").css({fill: "#0065fe", "font-family": "serif", "font-size": "64px"});
    svg.addClass("NoStyle").css_map().finalize();
},
    
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
    console.log(svg.series[0]);
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
    let f = g.symb(0, ["Frequency / 10 ", 0], ["14", 4, ["70", "12"]], ["Hz", 0, ["96", 0]]).align([6, "-44"]);
    svg.css(".NoStyle", "text", "plot");
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

lrt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 32], margin: [60, 12, 50, 12]});
    svg.graph({grid: [0.5, 2], css: true,
        x: {tick: [0, 10.1, 1], title: ["Time / s", [5, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 33, 4], title: ["Velocity / (m/s)", "-44"], shift: ["-10", "-4"]},
        data: [{connect: [[0, 30], [10, 16]]}],
    });
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


lever: (sel) => {
    let svg = new SVG2(sel, {size: [480, 180], lrbt: [-10, 10, -3.2], grid: 0, margin: 0});
    let css = {fill: "black", stroke: "none"};
    svg.rect([20, 0.2], [0, 0.1]).css(css);
    css = {fill: "red", "fill-opacity": 0.2, stroke: "red", "stroke-width": "3px"};
    svg.rect([2, 2], [8, 1.3]).css(css);
    Object.assign(css, {fill: "#0065fe", stroke: "#0065fe"});
    svg.poly([[-8, -0.1], [-9.5, -3], [-6.5, -3]], 1).css(css);
    Object.assign(css, {fill: "green", stroke: "green"});
    svg.arrow({tip: [0, 4], tail: [0, 0.4]}, {tail: "8"}).css(css);
},

});