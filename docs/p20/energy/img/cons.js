SVG2.cache("p20/energy/img/cons.js", {

pulley: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-5, 7, -12.1, 2]});
    let g = svg.group("black@1", "none");
    g.circle(1.5).css({"stroke-width": "2px"});
    g.line([-1.5, 0], [-1.5, -2.5]); // m1
    g.line([1.5, 0], [1.5, -10]);    // m2
    g.line([0, 2], [0, 0]);          // Pulley support
    g.line([-5, 2], [5, 2]);         // Ceiling
    g.line([-5, -12], [5, -12]);     // Floor
    g.line([-3, -12], [-3, -5.5]);   // h

    g = svg.group("black@1", {fill: "lightgrey"});
    g.rect([1.5, 3], [-1.5, -4]);    // m1
    g.rect([1.5, 2], [1.5, -11]);    // m2

    svg.mjax("h", null, [-4, -9]);
    let s = {"scale": 0.9};
    svg.mjax("m_1", s, [-3.2, -4]);
    svg.mjax("m_2", s, [3.3, -11]);
    svg.gtext("Ideal Pulley", ["sans", 20], [4.5, 0]);
},

bar: (sel) => {
    SVG2.ebg(sel, 18, 1, [
        ["E_k", (t) => 5/7 * 16.5 * t * t],
        ["E_g", true],
        ["E_{rotn}", (t) => 2/7 * 16.5 * t * t],
    ], {E: 16.5, duration: 4, label: [0, "-6", 3]});
},

Ex1: (sel) => {
    let E = 0.24 * 9.81;
    SVG2.ebg(sel, 2.5, 0.25, [
        ["E_k", (t) => E * t * t],
        ["E_g", true],
    ], {E: E, margin: [44, 4, 40, 16], duration: 4, label: [1, "-6", 2]});
},

Ex2: (sel) => {
    let E = 0.24 * 9.81;
    SVG2.ebg(sel, 2.5, 0.25, [
        ["E_k", 7/12 * E],
        ["E_g", true],
    ], {E: E, margin: [44, 4, 40, 16], label: [1, "-6", 2]});
},

Ex3: (sel) => {
    let Eg = (t) => 10 * Math.pow((t - 0.05) / 0.95, 2);
    SVG2.ebg(sel, 11, 1, [
        ["E_k", (t) => t < 0.05 ? 1000 * t / 7 : 5/7 * (10 - Eg(t))],
        ["E_{elas}", (t) => t < 0.05 ? 10 - 200 * t : 0],
        ["E_{rotn}", true],
        ["E_g", (t) =>  t < 0.05 ? 0 : Eg(t)],
    ], {E: 10, margin: [4, 4, 40, 4], duration: 6});
},

Q1a: (sel) => {
    SVG2.ebg(sel, 0.5, 0.1, [
        ["E_k", true],
        ["E_g", (t) =>  0.14715 * t],
        ["E_{elas}", (t) => t < 0.05 ? 0.45 / 0.05 * (0.05 - t) : 0],
    ], {E: 0.45, duration: 4, margin: [40, 4, 40, 16], label: [1, "-6"]});
},

Q1b: (sel) => {
    SVG2.ebg(sel, 0.5, 0.1, [
        ["E_k", true],
        ["E_g", (t) =>  0.45 * t],
        ["E_{elas}", (t) => t < 0.05 ? 0.45 / 0.05 * (0.05 - t) : 0],
    ], {E: 0.45, duration: 5, margin: [40, 4, 40, 16], label: [1, "-6"]});
},

Q2: (sel) => {
    let E = 49 * 0.225 / 2;
    SVG2.ebg(sel, 6, 1, [
        ["E_k", (t) => E * t * t],
        ["E_{elas}", true],
    ], {E: E, duration: 0.5, label: [0, "-6"]});
},

Q3a: (sel) => {
    let E = 7.5 * 9.81;
    SVG2.ebg(sel, 80, 5, [
        ["E_k", (t) => E * t * t],
        ["E_g", true],
    ], {E: E, duration: 3, label: [0, "-6", 2]});
},

Q3b: (sel) => {
    let Ek = 7.5 * 9.81 / 2;
    SVG2.ebg(sel, 80, 5, [
        ["E_k", (t) => Ek * t * t],
        ["E_g", true],
    ], {E: 2 * Ek, duration: 1.5, label: [0, "-6", 2]});
},

Q4a: (sel) => {
    let E = 1.2 * 9.81;
    let Ek = 5 / 7 * E;
    SVG2.ebg(sel, 14, 1, [
        ["E_k", (t) => Ek * t * t],
        ["E_g", true],
        ["E_{rotn}", (t) => 0.4 * Ek * t * t],
    ], {E: E, unit: "J/kg", duration: 4, label: [0, "-6", 2]});
},

Q4b: (sel) => {
    let E = 1.2 * 9.81;
    let Ek = 2 / 3 * E;
    SVG2.ebg(sel, 14, 1, [
        ["E_k", (t) => Ek * t * t],
        ["E_g", true],
        ["E_{rotn}", (t) => 0.5 * Ek * t * t],
    ], {E: E, unit: "J/kg", duration: 4, label: [0, "-6", 2]});
},

Q5: (sel) => {
    let E = 45 * 9.81;
    let Ek = 6.5/15 * E;
    SVG2.ebg(sel, 500, 50, [
        ["E_{k1}", (t) => 15/23.5 * Ek * t * t],
        ["E_{k2}", (t) => 8.5/23.5 * Ek * t * t],
        ["E_{g1}", (t) => E * (1 - t * t)],
        ["E_{g2}", true],
    ], {E: E, unit: "J", duration: 4, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

});
