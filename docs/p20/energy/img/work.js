SVG2.cache("p20/energy/img/work.js", {

ex2: (sel) => {
    svg = SVG2.ebg(sel, 10, 1, [
        ["+W", true, "red"],
        ["E_k", (t) => 3 * t],
        ["E_g", (t) => 5 * t],
        ["–W", (t) => t, "red"],
    ], {E: 9, duration: 4, label: [0, "-6"]});
},

flow2: (sel) => {
    let s = $(sel).attr({width: 400, height: 240, "data-aspect": "40/24"});
    let svg = new SVG_Animation(sel, -3.8, 4);
    let css = {fill: "#0065FE"};
    svg.circle(2.3, [1.5, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [0, 0], g);
    svg.symbol("E", {q4: "g", scale: 1}, [3, 0]).css(css);
    svg.arrow([0.7, 0], 2, {tail: "6"}, g);
    css = {"font-size": "24px"};
    svg.text("5.0 J", [1.6, 0.3], g).addClass("joules");
    g = svg.group().css({fill: "red"});
    svg.text("Food", [-2.8, 1.3], g).css(css);
    svg.text("Waste", [-2.9, -1.3], g).css(css);
    let w = svg.group(g).anchor(-1.2, 0.7).config({theta: -30});
    svg.arrow([-2.2, 0.7], 2, {tail: "6"}, w);
    svg.text("9.0 J", [-1.4, 1], w).addClass("joules");
    w = svg.group(g).anchor(-1.2, -0.7).config({theta: 210});
    svg.arrow([-2.2, -0.7], 2, {tail: "6"}, w);
    svg.text("1.0 J", [-1.2, -1], w).config({theta: 180}).addClass("joules");
    svg.$.find(".joules").css({"font-size": "20px"});
    svg.final();

    clickCycle(svg.element, 3,
        () => svg.$.find(".joules").fadeOut(),
        () => $(svg.$.find(".joules")[1]).fadeIn(),
        () => $(svg.$.find(".joules")[0]).fadeIn(),
        () => $(svg.$.find(".joules")[2]).fadeIn(),
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

F2: (sel) => {
    $(sel).attr({width: 400, height: 260, "data-aspect": "20/13"});
    let svg = new SVG_Animation(sel, -0.25, 2.5);
    let css = {fill: "#0065FE"};
    svg.circle(0.8, [0.6, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "g", scale: 1}, [0, 0]).css(css);
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0], g);
    svg.arrow([0.25, 0], 0.6, {tail: "6"}, g);
    svg.text("1472 J", [0.5, -0.15], g);
    g = svg.group().css({fill: "red"});
    svg.text("Waste", [2.2, 0], g).css({"font-size": "24px"});
    svg.arrow([1.25, 0], 0.6, {tail: "6"}, g);
    svg.text("647 J", [1.55, -0.15], g);
    svg.final();
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

F3: (sel) => {
    $(sel).attr({width: 400, height: 260, "data-aspect": "20/13"});
    let svg = new SVG_Animation(sel, -0.25, 2.5);
    let css = {fill: "#0065FE"};
    svg.circle(0.8, [0.6, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "g", scale: 1}, [0, 0]).css(css);
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0], g);
    svg.arrow([0.25, 0], 0.6, {tail: "6"}, g);
    svg.text("54.2 J", [0.5, -0.15], g);
    g = svg.group().css({fill: "red"});
    svg.text("Waste", [2.2, 0], g).css({"font-size": "24px"});
    svg.arrow([1.25, 0], 0.6, {tail: "6"}, g);
    svg.text("20.3 J", [1.55, -0.15], g);
    svg.final();
},

Q4: (sel) => {
    svg = SVG2.ebg(sel, 150, 5, [
        ["+W", (t) => 50 * (1 - t * t), "red"],
        ["E_k", true],
        ["–W", (t) => 15 * t * t, "red"],
    ], {E: 0.6 * sq(40 / 3.6) + 50, unit: "kJ", duration: 3, margin: [36, 4, 40, 16], label: [0, "-6", 5]});
},

F4: (sel) => {
    $(sel).attr({width: 512, height: 256, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.5, 2.75);
    svg.circle(0.8, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    let g = svg.group().css({fill: "red"});
    svg.text("Fuel", [-0.25, 0], g).css({"font-size": "24px"});
    svg.text("Waste", [2.4, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.arrow([1.25, 0], 0.8, {tail: "6"}, g);
    svg.text("50.0 kJ", [0.5, -0.15], g);
    svg.text("15.0 kJ", [1.55, -0.15], g);
    svg.final();
},

});