SVG2.cache("p30/mom/img/vec2d.js", {

p2d: (sel) => {
    let F1 = vec2d(20, 15), F2 = vec2d(30, 75);
    let svg = SVG2.vec_diag(sel, [F1, F2], {lrbt: [-3, 30, -3, 38], scale: 14,
        margin: 0, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"], cycle: -1});
    svg.gtext("N·s", "sans", [2, 36]);
    svg.mjax("\\vec{\\bf p}_1", null, [14, 1.75], "red");
    svg.mjax("\\vec{\\bf p}_2", null, [25, 17], "red");
    svg.mjax("\\Sigma\\vec{\\bf p}", null, [11, 19], "#0065fe");
},

F: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(8, 30)], {lrbt: [-1, 8, -1.5, 5], scale: 40,
        margin: 8, grid: 0.5, label: [1, 0, "-6", "-12"]});
    svg.gtext("N", ["sans", 15], [0.4, 5]);
    let g = svg.group();
    g.mjax("\\vec{\\bf F}_x", null, [3.5, -1], "red");
    g.mjax("\\vec{\\bf F}_y", null, [7.75, 2], "red");
    g.group(".Resultant").mjax("\\vec{\\bf F}", null, [3.25, 2.75], "red");

    svg.$.on("click", () => {
        svg.$.find("g.TipToTail2D > g.Component").fadeToggle();
        g.$.children("g:not(.Resultant)").fadeToggle();
    });
},

boat: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120), vec2d(5, 200)], {lrbt: [-16, 4, -2, 20], scale: 20, margin: [12, 8, 8, 8], grid: 2, cycle: 1, label: [2, 0, "-6", "-12"]});
    svg.gtext("m/s", ["sans", 15], [1, 20]);
    svg.mjax("\\vec{\\bf v}_1", null, [-4, 10], "red");
    svg.mjax("\\vec{\\bf v}_2", null, [-12.5, 18.5], "red");
    svg.mjax("\\vec{\\bf v}", null, [-10, 8], "#0065fe");
},

});
