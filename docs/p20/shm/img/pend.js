SVG2.cache("p20/shm/img/pend.js", {

fbd: (sel) => {
    let a = -25;
    let p = vec2d(-3, 90 + a);
    let svg = new SVG2(sel, {size: [236, 383], lrbt: [-2, 0.5, -4]});

    css(svg.line(p, [0, p[1]]), "red@2");
    css(svg.path(p).arc([0, 0], -90).update(), "none", "#0065fe@2");

    let g = svg.group("black@2");
    g.line([0, 0], [0, -3]);
    css(g.circle("12", [0, -3]), "white");
    g.arrow(0.9, {tail: "7"}).config({theta: -90, shift: p.plus([0, -0.67])}).css("red", "black@1");

    g = svg.group().config({theta: a}).css("black@2");
    g.line([0, 0], [0, -3]);
    g.circle("12", [0, -3]).css({fill: "white"});
    g.arrow(0.9 * cos(a), {tail: "7"}).config({theta: 90, shift: [0, -2.35]}).css("red", "black@1");

    svg.mjax("x", null, [-0.65, -3.1], "#0065fe");
    svg.mjax("\\theta", null, [-0.12, -0.55], "red");
    svg.mjax("L", null, [-0.8, -1.2], "red");
    svg.mjax("x_{↡ H}", null, [-0.5, -2.55], "red");
    svg.mjax("\\vec{\\bf F}_g", null, [-1.7, -3.3], "red");
    svg.mjax("\\vec{\\bf F}_t", null, [-1.4, -2.1], "red");
},

vec: (sel) => {
    let v = [[0, -3], vec2d(3 * cos(25), 65)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-1, 2, -3.5, 0.5], scale: 95, margin: 1, grid: 0.25});
    svg.$.find("g.Component").remove();

    svg.mjax("\\theta", null, [0.15, -2.3], "red");
    svg.mjax("\\vec{\\bf F}_g", null, [-0.35, -1.5], "red");
    svg.mjax("\\vec{\\bf F}_t", null, [0.9, -1.9], "red");
    svg.mjax("\\vec{\\bf F}_{net}", null, [0.65, 0.07], "#0065fe");
},

});