SVG2.cache("p20/energy/img/mech.js", {

Baseball: (sel) => {
    let Eg = 0.25 * 9.81 * 9.25;
    let Ek = 72;
    svg = SVG2.ebg(sel, 100, 10, [
        ["E_k", true],
        ["E_g", Eg],
    ], {E: Eg+Ek, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

Q2: (sel) => {
    let Ee = 100 * 0.65 * 0.65;
    let Eg = 0.055 * 9.81 * 1.6;;
    svg = SVG2.ebg(sel, 50, 5, [
        ["E_k", 0],
        ["E_g", Eg],
        ["E_{elas}", Ee],
    ], {E: Eg+Ee, label: [0, "-6", 2]});
},

ToyCar: (sel) => {
    svg = SVG2.ebg(sel, 20, 2, [
        ["E_k", 0],
        ["E_{elas}", 16],
    ], {E: 16, unit: "mJ", label: [0, "-6", 2]});
},

CarHill: (sel) => {
    svg = SVG2.ebg(sel, 150, 25, [
        ["E_k", true],
        ["E_g", (t) => 125 * t * t],
    ], {E: 125, unit: "kJ", duration: 4, margin: [40, 4, 40, 16], label: [0, "-6"]});
},

Pinball: (sel) => {
    svg = SVG2.ebg(sel, 1.5, 0.1, [
        ["E_k", (t) => 1.35 * t * t],
        ["E_{elas}", true],
    ], {E: 1.35, duration: 0.5, margin: [40, 4, 40, 16], label: [1, "-6", 3]});
},

Q6: (sel) => {
    let E = 1.12;
    let Eg = (t) => E / 2 * (2 - t * t);
    let Ek = (t) => 5/7 * (E - Eg(t));
    svg = SVG2.ebg(sel, 1.2, 0.1, [
        ["E_k", Ek],
        ["E_g", Eg],
        ["E_{rotn}", true],
    ], {E: E, duration: 4, margin: [40, 4, 40, 16], label: [1, "-6", 2]});
},

});
