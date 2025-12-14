SVG2.cache("p30/elec/img/eq.js", {

eq: (sel) => {
    let svg = new SVG2(sel, {size: [400, 240], margin: [24, 24, 16, 16], lrbt: [-1, 1]});
    svg.mjax("\\vec{\\bf a}", null, [-1, 0.5]);
    svg.mjax("\\vec{\\bf F}_e", null, [0, 0.5, 0.5, 0.55]);
    svg.mjax("\\vec{\\bf E}", null, [1, 0.5]);
    svg.mjax("\\vec{\\bf v}", null, [-1, -0.5]);
    svg.mjax("W", null, [0, -0.5]);
    svg.mjax("\\Delta V", null, [1, -0.5]);

    let g = svg.group("arrow");
    let data = [[-0.5, 0.5, 0, "red"], [0.5, 0.5, 0, "green"], [-0.5, -0.5, 0, "gold"],
        [0.5, -0.5, 0, "violet"], [-1, 0, 1, "grey"], [0, 0, 1, "tan"], [1, 0, 1, "#0065fe"]];
    for (let [x, y, v, c] of data) {
        let a = g.arrow(0.65, {tail: "7", "double": 1}).config({shift: [x, y]}).css({fill: c});
        if (v) a.config({theta: 90});
    }
},

});