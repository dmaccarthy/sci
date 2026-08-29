SVG2.cache("p20/energy/img/rev.js", {

Q1: (sel) => {
    let Ei = 28 * 9.81 * 4.8 / 1000;
    let Ef = 14 * 3.2 * 3.2 / 1000;
    let W = Ei - Ef;
    SVG2.ebg(sel, 1.5, 0.1, [
        ["E_k", (t) => Ef * t * t],
        ["E_g", true],
        ["–W", (t) => W * t * t, "red"],
    ], {E: Ei, duration: 3, unit: "kJ", margin: [32, 4, 40, 16], label: [1, "-6", 3]});
},

Q6: (sel) => {
    let Ei = 75 * 0.35;
    let W = 0.3 * Ei;
    let Ek = 0.7 * Ei - 3;
    SVG2.ebg(sel, 30, 3, [
        ["E_k", (t) => Ek * t * t],
        ["E_g", true],
        ["–W", (t) => t > 0 ? W + 3 * t : 0, "red"],
    ], {E: Ei, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 1]});
},

Q8: (sel) => {
    SVG2.ebg(sel, 105, 5, [
        ["E_k", true],
        ["E_g", (t) => (t < 1/3 ? 100 * (1 - 3*t) : (t < 2/3 ? 0 : 80 * (t - 2/3)))],
        ["–W", (t) => 20 * t, "red"],
    ], {E: 100, duration: 10, margin: [32, 4, 40, 16], labelx: [0, "-6", 1]});
},

});