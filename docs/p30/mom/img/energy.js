SVG2.cache("p30/mom/img/energy.js", {

ball: (sel) => {
    let E = 0.2 * 25 * 9.81;
    SVG2.ebg(sel, 60, 5, [
        ["E_k", (t) => E / 2 * t * t],
        ["E_g", true],
    ], {E: E, unit: "J", duration: 2, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

ramp: (sel) => {
    let Fg = 12.5 * 9.81;
    let E = 12.5 / 2 * 6.25;
    let hf = E / (Fg + 5 / sin(10))
    let Ef = Fg * hf;
    d = t => hf * (1 - sq(t - 1));
    SVG2.ebg(sel, 45, 3, [
        ["E_k", true],
        ["E_g", t => Fg * d(t)],
        ["-W", t => t * (E - Ef), "red"],
    ], {E: E, unit: "J", duration: 4, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

pulley: (sel) => {
    let E = 12 * 1.5 * 9.81;
    let Ek = E / 3;
    SVG2.ebg(sel, 200, 20, [
        ["E_{k1}", (t) => 0.6 * Ek * t * t],
        ["E_{k2}", (t) => 0.4 * Ek * t * t],
        ["E_{g1}", (t) => E * (1 - t * t)],
        ["E_{g2}", true],
    ], {E: E, unit: "J", duration: 4, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

});
