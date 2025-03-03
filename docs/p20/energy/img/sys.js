SVG2.cache("p20/energy/img/sys.js", {

bar: (sel) => {
    let E = 11.772;
    svg = SVG2.ebg(sel, 14, 1, [
        ["E_k", (t) => 7.35 * t * t],
        ["E_g", (t) => E * (1 - t * t)],
        ["–W", true, "red"],
    ], {E: E, duration: 4, label: [0, "-6", 2]});
},

flow1: (sel, label) => {
    let svg = new SVG2(sel, {size: [400, 256], lrbt: [-1, 5]});
    svg.circle(1.7, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let css = {fill: "#0065fe", "font-size": "28px"};
    svg.delay(svg.symbol(["E", 2], ["g", 6, ["16", "-6"]]), {recenter: [0, -0.07], css: css});
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [2, -0.07], css: css});
    svg.group("Text", {recenter: [4.3, 0], css: {fill: "red", "font-size": "24px"}}).text("Waste");
    let dx = 0.4;
    let a1 = svg.delay(svg.arrow({tail: [dx, 0], tip: [2-dx, 0]}, {tail: "6"}), {css: {fill: "#0065fe"}});
    let a2 = svg.arrow({tail: [2+dx, 0], tip: [4-dx, 0]}, {tail: "6"});
    if (label) {
        a1.label("9.81 J", ["-12", "-24"]);
        a2.label("3.56 J", ["4", "-32"]);
    }
    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
},

flow2: (sel) => {
    let svg = new SVG2(sel, {size: [400, 330], lrbt: [-0.5, 2.9, -1.92]});
    svg.circle(0.8, [2, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [2, -0.07], css: {fill: "#0065fe", "font-size": "28px"}});
    let css = {fill: "red", "font-size": "24px"};
    svg.group("Text", {recenter: [0, -1.8], css: css}).text("Waste");
    svg.group("Text", {recenter: [0, 0], css: css}).text("Food");
    svg.arrow({tail: [0.5, 0], tip: [1.7, 0]}, {tail: "6"}).label("59.6 J", ["-20", "-24"]);
    svg.arrow({tail: [0, -0.3], tip: [0, -1.5]}, {tail: "6"});
    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
},

flow3: (sel) => {
    let svg = new SVG2(sel, {size: [400, 256], lrbt: [-2.85, 3.05]});
    svg.circle(1.8, [-0.9, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});

    let css = {fill: "#0065fe", "font-size": "28px"};
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [0.2, -0.07], css: css});
    svg.delay(svg.symbol(["E", 2], ["g", 6, ["16", "-6"]]), {recenter: [-1.8, 1], css: css});
    svg.delay(svg.symbol(["E", 2], ["elas", 6, ["24", "-6"]]), {recenter: [-1.8, -1], css: css});

    css = {fill: "red", "font-size": "24px"};
    svg.group("Text", {recenter: [2.5, 0], css: css}).text("Waste");

    let g = svg.group();
    g.arrow({tail: [0.6, 0], tip: [1.8, 0]}, {tail: "6"}).label("3.00 J", ["6", "-32"]);

    let shift = ["-6", "-24"];
    css = {fill: "#0065fe"};
    g = svg.group().config({theta: -30, shift: [-0.8, 0.55]});
    svg.delay(g.arrow(1.4, {tail: "6"}), {css: css}).label("0.26 J", shift);
    g = svg.group().config({theta: 30, shift: [-0.8, -0.55]});
    svg.delay(g.arrow(1.4, {tail: "6"}), {css: css}).label("8.00 J", shift);

    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
},

flow4: (sel) => {
    let svg = new SVG2(sel, {size: [400, 256], lrbt: [-2.85, 3.05]});
    svg.circle(1.8, [-0.9, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});

    let css = {fill: "#0065fe", "font-size": "28px"};
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [0.2, -0.07], css: css});
    svg.delay(svg.symbol(["E", 2], ["g", 6, ["16", "-6"]]), {recenter: [-2, -0.07], css: css});

    css = {fill: "red", "font-size": "24px"};
    svg.group("Text", {recenter: [2.5, 0], css: css}).text("Waste");
    let g = svg.group();
    g.arrow({tail: [0.6, 0], tip: [1.8, 0]}, {tail: "6"}).label("1.68 J", ["6", "-32"]);

    css = {fill: "#0065fe"};
    g = svg.group().config({shift: [-1, 0]});
    svg.delay(g.arrow(-1.4, {tail: "6"}), {css: css}).label("6.13 J", ["12", "-20"]);

    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
},

Q1: (sel) => {
    SVG2.ebg(sel, 12, 1, [
        ["E_k", (t) => 6.25 * t * t],
        ["E_g", true],
        ["–W", (t) => 3.56 * t * t, "red"],
    ], {E: 9.81, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 2]});
},

Q2: (sel) => {
    let Ei = 16 * 1.25 * 1.25;
    let W = 16 * 2.3 * 2.3 - Ei;
    SVG2.ebg(sel, 100, 10, [
        ["+W", true, "red"],
        ["E_k", (t) => Ei + W * t * t],
    ], {E: Ei + W, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 2]});
},

Q3: (sel) => {
    let Egi = 0.06 * 9.81 * 1.25;
    let dEg = 0.06 * 9.81 * 0.45;
    SVG2.ebg(sel, 10, 1, [
        ["E_k", true],
        ["E_g", (t) => Egi - dEg * t * t],
        ["E_elas", (t) => t == 0 ? 8 : 0],
        ["–W", (t) => 3 * t * t, "red"],
    ], {E: Egi + 8, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

Q4: (sel) => {
    let Ei = Math.pow(2.5, 3) / 2;
    let W = Ei - 2.5 * 9.81 * 0.25;
    SVG2.ebg(sel, 10, 1, [
        ["E_k", (t) => Ei * (1 - t * t)],
        ["E_g", true],
        ["–W", (t) => W * t * t, "red"],
    ], {E: Ei, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

Q5: (sel, W) => {
    let Ei = 0.625 * 9.81 * 15;
    if (!W) W = 0;
    let h = (t) => t < 0.25 ? 60 * (0.25 - t) : (t < 0.5 ? 28 * (t - 0.25) : (t < 0.75 ? 2 + 20 * (0.75 - t) : 2 + 4 * (t - 0.75)));
    let svg = SVG2.ebg(sel, 100, 10, [
        ["E_k", true],
        ["E_g", (t) => 0.625 * 9.81 * h(t)],
        ["–W", (t) => W * t * t, "red"],
    ], {E: Ei, unit: "kJ", duration: 6, margin: [40, 4, 40, 16], label: [0, "-6"]});
    return svg;
},

});