SVG2.cache("p20/dyn/img/weight.js", {

scale: (sel) => {
    let svg = new SVG2(sel, {scale: 90, lrbt: [-1.7, 1.5, -1.3, 3.3]});
    svg.image("p20/dyn/img/walking.svg", [1.952, 3], [0, 1.5]);
    svg.rect([1, 0.3], [-0.6, -0.15]).css({fill: "lightgrey", stroke: "black"});
    css(svg.line([-1.71, -0.3], [1.51, -0.3]), "black@3");

    let g = svg.group("arrow");
    g.arrow({tail: [-0.1, 1.5], tip: [-0.1, -1]}, {tail: "6"});
    g.arrow({tail: [-0.6, 0.1], tip: [-0.6, 3.1]}, {tail: "6"});

    svg.mjax("\\vec{\\bf F}_g", null, [0.3, -0.7], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [-1.1, 1.6], "red");
},

skydive: (sel) => {
    let svg = new SVG2(sel, {scale: 100, lrbt: [-0.85, 1.15, -1.4, 2.6]});
    svg.image("p20/dyn/img/parachute.svg", [1.1, 1.65], [0, 0.96]);
    let g = svg.group("arrow");
    g.arrow({tail: [0, 0], tip: [0, -1.3]}, {tail: "6"});
    g.arrow({tail: [0, 1.9], tip: [0, 2.5]}, {tail: "6"});
    svg.mjax("\\vec{\\bf F}_g", null, [0.3, -0.6], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [0.3, 2.1], "red");
},

});