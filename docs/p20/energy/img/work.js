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
	let svg = new SVG2(sel, {size: [360, 360], lrbt: [-1.5, 2.5]}).css(".NoStyle", "text");
    let g = svg.group().config({theta: 30});
    let tail = {tail: "6"};
    g.line([-4, "-4"], [4, "-4"]).css({stroke: "black", "stroke-width": "3px"});
    g.rect([1, 1], [0, 0.5]).css({"fill-opacity": "0.4", fill: "#0065fe", stroke: "black"});
    let f = g.group().css("arrow");
    f.arrow({tail: [0, 0], tip: [0, 2]}, tail);
    f.arrow({tail: [0.5, 0.5], tip: [1.5, 0.5]}, tail);
    f.arrow({tail: [-0.5, 0.2], tip: [-1.2, 0.2]}, tail);
    f.arrow({tail: [0, 0.5], tip: [0, -1.81]}, tail, "tail").config({theta: -30});
    f.arrow(2, tail).config({shift: [1, "-20"]}).css("blue");

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "24"]];
    let sub = ["14", "-8"];
    g = svg.group().css("red");
    g.sym([0.5, 1.4], 28, ["F", BD], arr, ["a", SM_IT, sub]);
    g.sym([-1.2, 0.15], 28, ["F", BD], arr, ["f", SM_IT, sub]);
    g.sym([-0.5, 1.5], 28, ["F", BD], arr, ["n", SM_IT, sub]);
    g.sym([0.05, -1], 28, ["F", BD], arr, ["g", SM_IT, sub]);
    g.sym([1.25, 0.1], 28, ["d", BD], arr, ["Δ", 0, ["-20", 0]]).css("blue");
},

flow2: (sel) => {
    let svg = new SVG2(sel, {size: [400, 260], lrbt: [-8.5, 4.5]});
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_k", [-2.5, 0]],
            ["$E_g", [2.5, 0]],
            ["Food", [-7, 2.8], "red"],
            ["Waste", [-7, -2.5], "red"],
        ],
        arrows: [
            [3, [-4.5, 1.25], -35, "9.0 J", "red"],
            [3, null, 0, "5.0 J"],
            [-3, [-4.5, -1.25], 35, "1.0 J", "red"],
        ]
    });
    let i = 0;
    for (let e of svg.$.find("g.Arrow > text")) $(e).addClass(`Toggle${i++}`);

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );
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
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_g", [-2.5, 0]],
            ["$E_k", [2.5, 0]],
            ["Waste", [8, -0], "red"],
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