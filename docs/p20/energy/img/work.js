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
    let g = svg.group().config({theta: 30});
    let tail = {tail: "6"};
    g.line([-4, "-4"], [4, "-4"]).css({stroke: "black", "stroke-width": "3px"});
    g.rect([1, 1], [0, 0.5]).css({"fill-opacity": "0.4", fill: "#0065fe", stroke: "black"});
    let f = g.group();
    f.arrow({tail: [0, 0], tip: [0, 2]}, tail);
    f.arrow({tail: [0.5, 0.5], tip: [1.5, 0.5]}, tail);
    f.arrow({tail: [-0.5, 0.2], tip: [-1.2, 0.2]}, tail);
    f.arrow({tail: [0, 0.5], tip: [0, -1.81]}, tail, "tail").config({theta: -30});
    let blue = [g.arrow(2, tail).config({shift: [1, "-20"]}).element];

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "24"]];
    let sub = ["14", "-8"];
    svg.symbol(["F", BD], arr, ["a", SM_IT, sub]).config({shift: [0.5, 1.4]});
    svg.symbol(["F", BD], arr, ["f", SM_IT, sub]).config({shift: [-1.2, 0.15]});
    svg.symbol(["F", BD], arr, ["n", SM_IT, sub]).config({shift: [-0.5, 1.5]});
    svg.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [0.05, -1]});
    blue.push(svg.symbol(["d", BD], arr, ["Δ", 0, ["-20", 0]]).config({shift: [1.25, -0.2]}).element);

    let sym = svg.$.find("g.Symbol").addClass("Large");
    svg.css_map().addClass("NoStyle");
    sym.css({fill: "red"});
    $(blue).css({fill: "#0065fe"});
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
            [3, [-4.5, 1.75], -35, "9.0 J", "red"],
            [3, [0, "12"], 0, "5.0 J"],
            [-3, [-4.5, -1], 35, "1.0 J", "red"],
        ]
    }).finalize();
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
    let svg = new SVG2(sel, {size: [400, 256], lrbt: [-1, 5]});
    svg.circle(1.7, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let css = {fill: "#0065fe", "font-size": "28px"};
    svg.delay(svg.symbol(["E", 2], ["g", 6, ["16", "-6"]]), {recenter: [0, -0.07], css: css});
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [2, -0.07], css: css});
    svg.group("Text", {recenter: [4.3, 0], css: {fill: "red", "font-size": "24px"}}).text("Waste");
    let dx = 0.4;
    let a1 = svg.delay(svg.arrow({tail: [dx, 0], tip: [2-dx, 0]}, {tail: "6"}), {css: {fill: "#0065fe"}});
    let a2 = svg.arrow({tail: [2+dx, 0], tip: [4-dx, 0]}, {tail: "6"});
    if (unit == null) unit = "J";
    a1.label(`${Wg} ${unit}`, ["-12", "-24"]);
    a2.label(`${dW} ${unit}`, ["4", "-32"]);
    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
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
    let svg = new SVG2(sel, {size: [480, 256], lrbt: [-3.6, 3.8]});
    svg.circle(1.9).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [0, "-6"], css: {fill: "#0065fe", "font-size": "28px"}});
    let css = {fill: "red", "font-size": "24px"};
    svg.group("Text", {recenter: [3.1, 0], css: css}).text("Waste");
    svg.group("Text", {recenter: [-3, 0], css: css}).text("Fuel");
    svg.delay(svg.arrow({tip: [-0.5, 0], tail: [-2.3, 0]}, {tail: "6"})).label("50.0 kJ", ["8", "-32"]);
    svg.arrow({tail: [0.5, 0], tip: [2.3, 0]}, {tail: "6"}).label("15.0 kJ", ["-8", "-32"]);
    svg.addClass("NoStyle").css_map().finalize().$.find("text.Small").css({"font-size": "18px"});
},

});