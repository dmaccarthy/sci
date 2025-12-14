SVG2.cache("p20/vec2d/img/polar.js", {

rev: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-6, 4]], {lrbt: [-7, 2, -1, 6], scale: 40,
        margin: [32, 10, 2, 2], grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    let p = svg.path([0.5, 0]).arc_to(vec2d(0.5, 146.3), 0.5);
    p = p.update().addClass("Toggle0");
    p.css({fill: "none", stroke: "black"}).insertAfter(svg.$.find("g.Grid"));
    svg.gtext("m", "sans", [1.5, 5.5]);
    svg.group(".Toggle0").mjax("\\theta", {scale: 0.8}, [0.5, 0.65]);
    svg.$.find("g.TipToTail2D g.Arrow:not(.Component)").addClass("Toggle0");
    svg.$.on("click", () => svg.$.find(".Toggle0").fadeToggle());
},

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[8, -2.5]], {lrbt: [-1, 9, -3.5, 2], scale: 40,
        margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.gtext("m/s", "sans", [0.8, -3]);
    svg.mjax("\\theta", {scale: 0.8}, [2.4, -0.36]);
    svg.mjax("\\vec{\\bf v}_x", null, [4, 0.7], "red");
    svg.mjax("\\vec{\\bf v}_y", null, [8.6, -1.2], "red");
    svg.mjax("\\vec{\\bf v}", null, [4, -2], "red");
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(50, 160)], {lrbt: [-54, 6, -10, 24], scale: 7,
        margin: 8, grid: 2, tick: "-8", label: [10, 0, "-12", "-20"]});
    let arc = {fill: "none", stroke: "black"};
    svg.path([2.5, 0]).arc([0, 0], 160).update().css(arc).insertAfter(svg.$.find("g.Grid"));
    svg.gtext("N", "sans", [2, 20]);
    svg.mjax("\\theta", {scale: 0.8}, [3, 4]);
    svg.mjax("\\vec{\\bf F}_x", null, [-25, -5], "red");
    svg.mjax("\\vec{\\bf F}_y", null, [-52, 8], "red");
    svg.mjax("\\vec{\\bf F}", null, [-23, 13], "red");
}

});