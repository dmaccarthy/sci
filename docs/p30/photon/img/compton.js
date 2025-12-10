SVG2.cache("p30/photon/img/compton.js", {

pCons: (sel) => {
    let ps = vec2d(9.8, 30);
    let pe = vec(10, 0).minus(ps);
    let svg = SVG2.vec_diag(sel, [ps, pe], {lrbt: [-1, 11, -1.5, 5.5], scale: 32});
    svg.$.find(".Component").remove();

    let s = {scale: 1.1};
    svg.mjax("\\vec{\\bf p}_i", s, [5, -0.7], "#0065fe");
    svg.mjax("\\vec{\\bf p}_e", s, [10, 3], "red");
    svg.mjax("\\vec{\\bf p}_s", s, [3.5, 3], "red");
    svg.mjax("\\theta", s, [2, 0.6]);
},


});