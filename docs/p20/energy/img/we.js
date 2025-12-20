SVG2.cache("p20/energy/img/we.js", {

work: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 20, -400, 400], grid: [1, 50], margin: [68, 12, 12, 12]});

    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [5, 21, 5], ...opt});
    svg.ticks({y: [-400, 401, 100], ...opt});
    css(svg.poly([[0, 0], [5, 400], [10, 400], [20, -400]]), "none", "#0065fe@2");
    let g = svg.group("sans", 18);
    g.text("Position / m", [20, "8", "br"]);
    g.text("Force / N", ["-44", 0, "b"], 90);

    let shade = svg.group("sans", 18, "none@", "#0065fe");
    g = shade.group().addClass("Toggle0");
    g.poly([[0, 0], [5, 400], [5, 0]], 1);
    g.line([5, 400], [5, 0]);
    g.gtext("1000 J", [], [3, 75]);

    g = shade.group().addClass("Toggle1");
    g.rect([5, 400], [7.5, 200]);
    g.line([10, 400], [10, 0]);
    g.gtext("2000 J", [], [7.5, 200]);

    g = shade.group().addClass("Toggle2");
    g.poly([[10, 400], [10, 0], [15, 0]], 1);
    g.gtext("1000 J", [], [12, 75]);

    g = shade.group().addClass("Toggle3");
    g.poly([[20, -400], [20, 0], [15, 0]], 1);
    g.gtext("–1000 J", [], [18, -75]);

    shade.$.find("polygon, rect").css({"fill-opacity": 0.2});
    css(shade.$.find("line"), "#0065fe@1");
    svg.click_toggle(4);
},

tennis: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 80, 0, 90], grid: [5, 5], margin: [58, 12, 52, 12]});
    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 81, 10], ...opt});
    svg.ticks({y: [0, 91, 10], ...opt});
    css(svg.poly([[0, 0], [40, 80], [50, 80], [75, 0]]), "none", "#0065fe@2");
    let g = svg.group("sans", 18);
    g.text("Position / m", [40, "-28", "t"]);
    g.text("Force / N", ["-40", 45, "b"], 90);
},


F1: (sel) => {
    let svg = new SVG2(sel, {scale: 160, lrbt: [-1.5, 1.6, -0.8, 0.8]});
    let L = 0.75;
    svg.energy_flow({radius: 0.75,
        labels: [
            ["$E_k", [0, -0.01]],
            ["Food", [-1.25, 0.02], "red"],
            ["Waste", [1.3, 0.02], "red"],
        ],
        arrows: [
            [L, [-0.6, 0], 0, ["75.0 J", ["6", "-18"]], "red"],
            [L, [0.6, 0], 0, ["30.0 J", ["-6", "-18"]], "red"],
        ]
    });
},

Q1: (sel) => {
    SVG2.ebg(sel, 80, 10, [
        ["+W", (t) => 75 * (1 - t * t), "red"],
        ["E_k", true],
        ["-W", (t) => 30 * t * t, "red"],
    ], {E: 75, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

F2: (sel) => {
    let svg = new SVG2(sel, {size: [400, 260], lrbt: [-8.5, 4.5]});
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_k", [0, 0]],
            ["Food", [-7, 0], "red"],
        ],
        arrows: [
            [4, [-3, 0], 0, ["4.46 kJ", ["6", "-18"]], "red"],
        ]
    });
    // console.log(svg);
},

Q2: (sel) => {
    let Ei = 0.075 * 12.5;
    let W = 5.4 - Ei;
    SVG2.ebg(sel, 6, 1, [
        ["+W", (t) => W * (1 - t * t), "red"],
        ["E_k", true],
    ], {E: 5.4, unit: "kJ", duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

F4: (sel) => {
    let svg = new SVG2(sel, {size: [500, 256], lrbt: [-1.5, 1.5]});
    let L = 0.7;
    svg.energy_flow({radius: 0.75,
        labels: [
            ["$E_k", [0, -0.5]],
            ["$E_g", [0, 0.5]],
            ["Food", [-1.15, -0.5], "red"],
            ["Waste", [1.15, -0.5], "red"],
        ],
        arrows: [
            [L, [0, 0], 90, ["13.7 J", ["-12", "-18"]]],
            [L, [-0.5, -0.5], 0, ["20.0 J", ["6", "18"]], "red"],
            [L, [0.5, -0.5], 0, ["6.35 J", ["-18", "18"]], "red"],
        ]
    });
},

Q4: (sel) => {
    let Eg = 98.1 * sin(8);
    SVG2.ebg(sel, 24, 2, [
        ["+W", (t) => 20 * (1 - t), "red"],
        ["E_k", (t) => 1 - 2 * Math.abs(t - 0.5)],
        ["E_g", (t) => Eg * t],
        ["-W", true, "red"],
    ], {E: 20, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 2]});
},

ramp : (sel) => {
    svg = new SVG2(sel, {scale: 220, grid: 0, lrbt: [0, 2.15, 0, 0.3], margin: 2});
    let pt = vec2d(2, 8);
    css(svg.poly([pt, [pt[0], 0], [0, 0]], 1), "none", "red@2");

    let g = svg.group().config({theta: 8});
    let s = {scale: 0.8};
    g.mjax("\\Delta\\vec{\\bf d} = \\rm +2.00\\ m", s, [1, 0.08], "red");
    svg.mjax("h_f", s, [2, 0.15, -0.1, 0.5], "red");
    svg.mjax("\\rm 8.00^\\circ", s, [0.2, 0.1], "red");
},

});