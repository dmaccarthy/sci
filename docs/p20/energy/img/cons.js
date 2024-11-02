SVG2.cache("p20/energy/img/cons.js", {

bar: (sel) => {
    svg = SVG2.ebg(sel, 18, 3, [
        ["E_k", (t) => 5/7 * 16.5 * t * t],
        ["E_g", true],
        ["E_rotn", (t) => 2/7 * 16.5 * t * t],
    ], {E: 16.5, duration: 4, label: [0, "-6"]});
},

Ex1: (sel) => {
    let E = 0.24 * 9.81;
    svg = SVG2.ebg(sel, 2.5, 0.25, [
        ["E_k", (t) => E * t * t],
        ["E_g", true],
    ], {E: E, margin: [44, 4, 40, 16], duration: 4, label: [1, "-6", 2]});
},

Ex2: (sel) => {
    let E = 0.24 * 9.81;
    svg = SVG2.ebg(sel, 2.5, 0.25, [
        ["E_k", 7/12 * E],
        ["E_g", true],
    ], {E: E, margin: [44, 4, 40, 16], label: [1, "-6", 2]});
},

Ex3: (sel) => {
    svg = SVG2.ebg(sel, 11, 1, [
        ["E_k", (t) => t < 0.05 ? 1000 * t / 7 : 5/7 * (10 - svg.Eg(t))],
        ["E_elas", (t) => t < 0.05 ? 10 - 200 * t : 0],
        ["E_rotn", true],
        ["E_g", (t) =>  t < 0.05 ? 0 : svg.Eg(t)],
    ], {E: 10, margin: [4, 4, 40, 4], duration: 6});
    svg.Eg = (t) => 10 * Math.pow((t - 0.05) / 0.95, 2);
},

});