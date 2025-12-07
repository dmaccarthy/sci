SVG2.cache("p20/energy/img/work.js", {

ex2: (sel) => {
    svg = SVG2.ebg(sel, 10, 1, [
        ["+W", true, "red"],
        ["E_k", (t) => 3 * t],
        ["E_g", (t) => 5 * t],
        ["–W", (t) => t, "red"],
    ], {E: 9, duration: 4, label: [0, "-6"]});
},

ramp: (sel) => {
	let svg = new SVG2(sel, {size: [360, 360], lrbt: [-1.5, 2.5]});
    svg.gradient("gradFBD", "#d0d0ff", "royalblue", 80, 0, 0, 100);
    let g = svg.group().config({theta: 30});
    let tail = {tail: "6"};
    css(g.line([-4, "-4"], [4, "-4"]), "black@3");
    css(g.rect([1, 1], [0, 0.5]), "url(#gradFBD)", "black@1", {"fill-opacity": 0.4});
    let f = g.group("arrow");
    f.arrow({tail: [0, 0], tip: [0, 2]}, tail);
    f.arrow({tail: [0.5, 0.5], tip: [1.5, 0.5]}, tail);
    f.arrow({tail: [-0.5, 0.2], tip: [-1.2, 0.2]}, tail);
    f.arrow({tail: [0, 0.5], tip: [0, -1.81]}, tail, "tail").config({theta: -30});
    f.arrow(2, tail).config({shift: [1, "-20"]}).css("#0065fe");

    g = svg.group();
    let F = (s, sz, xy) => [`\\vec{\\bf F}_${s}`, sz, xy, "red"];
    g.mjax(...F('a', ["38.5", "40.4"], [0.5, 1.4]));
    g.mjax(...F('n', ["40.1", "40.4"], [-0.45, 1.5]));
    g.mjax(...F('g', ["37.3", "44.9"], [0.05, -1]));
    g.mjax(...F('f', ["39", "44.9"], [-1.2, 0.15]));
    g.mjax("\\Delta\\vec{\\bf d}", ["48", "35.9"], [1.25, 0.1], "#0065fe");
},

flow2: (sel) => {
    let svg = new SVG2(sel, {size: [400, 260], lrbt: [-8.5, 4.5]});
    let top = [0.5, 0];
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_k", [[-2.5, 0.3], top]],
            ["$E_g", [[2.5, 0.3], top]],
            ["Food", [-7, 2.4], "red"],
            ["Waste", [-7, -2.2], "red"],
        ],
        arrows: [
            [3, [-4.5, 1.25], -35, "9.0 J", "red"],
            [3, null, 0, "5.0 J"],
            [-3, [-4.5, -1.25], 35, "1.0 J", "red"],
        ]
    });
    let i = 0;
    for (let e of svg.$.find("g.Arrow > text")) $(e).addClass(`Toggle${i++}`);
    svg.click_toggle(3);
},

Q2: (sel) => {
    let E = 0.15 * 9.81 + 0.135;
    let Ek = 0.96;
    let W = 0.96 - 0.135;
    svg = SVG2.ebg(sel, 1.8, 0.1, [
        ["E_k", (t) => 0.135 + W * t * t],
        ["E_g", true],
        ["–W", (t) => (E - Ek) * t * t, "red"],
    ], {E: E, unit: "kJ", duration: 3, margin: [40, 4, 40, 16], label: [1, "-6", 3]});
},

F2: (sel, Wg, dW, unit) => {
    if (unit == null) unit = "J";
    let svg = new SVG2(sel, {size: [420, 256], lrbt: [-4.5, 9.5]});
    let top = [0.5, 0];
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_g", [[-2.5, 0.3], top]],
            ["$E_k", [[2.5, 0.3], top]],
            ["Waste", [8, 0], "red"],
        ],
        arrows: [
            [3, [5, 0], 0, `${dW} ${unit}`, "red"],
            [3, null, 0, `${Wg} ${unit}`],
        ]
    });
},

Q3: (sel) => {
    let Ei = 0.2 * 9.81 * 27.6;
    let Ef = 0.1 * 18.4 * 18.4;
    svg = SVG2.ebg(sel, 60, 5, [
        ["E_k", (t) => Ef * t * t],
        ["E_g", true],
        ["–W", (t) => (Ei - Ef) * t * t, "red"],
    ], {E: Ei, unit: "J", duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 2]});
},

Q4: (sel) => {
    svg = SVG2.ebg(sel, 150, 5, [
        ["+W", (t) => 50 * (1 - t * t), "red"],
        ["E_k", true],
        ["–W", (t) => 15 * t * t, "red"],
    ], {E: 0.6 * sq(40 / 3.6) + 50, unit: "kJ", duration: 3, margin: [36, 4, 40, 16], label: [0, "-6", 5]});
},

F4: (sel) => {
    let svg = new SVG2(sel, {size: [420, 230], grid: 0, lrbt: [-5.75, 6.25]});
    svg.energy_flow({radius: 3,
        labels: [
            ["$E_k", [0, 0]],
            ["Fuel", [-4.5, 0], "red"],
            ["Waste", [5, 0], "red"],
        ],
        arrows: [
            [2.75, [-2.1, 0], 0, ["50.0 kJ", ["2", "-28"]], "red"],
            [2.75, [2.1, 0], 0, ["15.0 kJ", ["-8", "-28"]], "red"],
        ]
    });
},

});
