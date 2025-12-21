SVG2.cache("p20/dyn/img/fbd.js", {

fbd: (sel) => {
    let svg = new SVG2(sel, {size: [288, 360], lrbt: [-5/8, 1.04, -1.07]});
    svg.gradient("gradFBD", "#d0d0ff", "royalblue", 80, 0, 0, 100);
    let g = svg.group("black@1");
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD)"});
    css(g.line([-0.7, -0.125], [1.05, -0.125]), "@3");

    svg.mjax("\\vec{\\bf F}_g", null, [0.18, -0.6], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [0.18, 0.4], "red");
    svg.mjax("\\vec{\\bf F}_a", null, [0.6, 0.15], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [-0.4, 0.15], "red");
    svg.mjax("\\vec{\\bf a}", null, [0.6, 0.6], "#0065fe");

    let t7 = {tail: "7"};
    g = svg.group("arrow", "red");
    g.arrow({tail: [0, -0.16], tip: [0, -1.02]}, t7);
    g.arrow({tail: [0, -0.1], tip: [0, 0.76]}, t7);
    g.arrow({tail: [0.3, -0.08], tip: [1, -0.08]}, t7);
    g.arrow({tail: [-0.3, -0.08], tip: [-0.6, -0.08]}, t7);
    g.arrow({tail: [0.4, 0.75], tip: [0.9, 0.75]}, t7).css("#0065fe");
},

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [275, 400], grid: 0.1, lrbt: [-5/8, 5/8, -1.07]});
    svg.gradient("gradFBD1", "#d0d0ff", "royalblue", 80, 0, 0, 100);

    let a = 25;
    let g = svg.group("black@1").config({theta: -a});
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD1)"});
    css(g.line([-0.7, -1/8], [0.7, -1/8]), "@3");

    let t7 = {tail: "7"};
    let arrow = g.group("arrow", "red");
    arrow.arrow({tail: [0, -1/8], tip: [0, cos(a) - 1/8]}, t7);
    let tail = new RArray(-0.25, -1/8);
    arrow.arrow({tail: tail, tip: tail.minus([0.6 * sin(a), 0])}, t7);

    g.mjax("\\vec{\\bf F}_n", null, [0.15, 0.4], "red");
    g.mjax("\\vec{\\bf F}_f", null, [-0.4, 0.08], "red");
    svg.mjax("\\vec{\\bf F}_g", null, [0.15, -0.6], "red");
    svg.arrow({tail: [0, -0.03], tip: [0, -1.03]}, t7).css("arrow", "red");
    svg.circle("5").css({fill: "black"});
},

vec1: (sel) => {
    let a = 25, Fg = 60, Fn = Fg * cos(a), Ff = Fg * sin(a) / 2;
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(Fn, 90-a), vec2d(Ff, 180-a)], {lrbt: [-16, 32, -64, 8],
        scale: 6, margin: 8, grid: 4, label: [8, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("N", 18, [28, -60]);
    svg.mjax("\\vec{\\bf F}_g", null, [-8, -29], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [16, -38], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [21, -4], "red");
    svg.mjax("\\vec{\\bf F}_{net}", null, [6, 4], "#0065fe");
},

Q1f: (sel) => {
    let svg = new SVG2(sel, {size: [160, 403], lrbt: [-15, 22, -72.5], margin: 1});
    svg.gradient("gradQ1", "#d0d0ff", "royalblue", 80, 0, 0, 100);
    svg.rect([10, 10]).css({fill: "url(#gradQ1)", stroke: "black"});
    let g = svg.group("arrow");
    g.arrow({tail: [0, -7.5], tip: [0, -7.5 - 63.8]}, {tail: "7"});
    g.arrow({tail: [0, 7.5], tip: [0, 20]}, {tail: "7"});
    g.arrow({tail: [10, 0], tip: [10, -30]}, {tail: "7"}).css("#0065fe");
    svg.mjax("\\vec{\\bf F}_g", null, [-9, -30], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [-9, 12], "red");
    svg.mjax("\\vec{\\bf a}", null, [17, -10], "#0065fe");
},

Q1v: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-3, 0], [0, -63.8], [3, 0], [0, 12.5]], {shift: [1.5, 0],
        lrbt: [-15, 15, -75, 5], scale: 5, margin: 1, grid: 5, label: [10, 0]});
    svg.$.find(".Component").remove();
    let a = svg.$.find("g.Arrow").css({"fill-opacity": 0.6});
    $([a[0], a[2]]).remove();
    svg.mjax("\\vec{\\bf F}_g", null, [-10, -30], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [8, -57], "red");
    svg.mjax("\\vec{\\bf F}_{net}", null, [8, -25], "#0065fe");
},

Q3: (sel) => {
    let Fg = -567, Ff = 725;
    let svg = SVG2.vec_diag(sel, [[0, Fg], [30, 0], [0, Ff], [-30, 0]], {shift: [-15, 0],
        lrbt: [-150, 150, -575, 175], scale: 0.5, margin: 1, grid: 50, label: [100, 0]});
    svg.$.find(".Component").remove();
    let a = svg.$.find("g.Arrow").css({"fill-opacity": 0.6});
    $([a[1], a[3]]).remove();
    svg.mjax("\\vec{\\bf F}_g", null, [-80, -250], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [80, -225], "red");
    svg.mjax("\\vec{\\bf F}_{net}", null, [-90, 50], "#0065fe");
},

Q7: (sel) => {
    let svg = new SVG2(sel, {size: [360, 250], lrbt: [-4, 5, -2.8]});
    css(svg.line([-4.1, 0], [5.1, 0]), "black@3");
    svg.cylinder([1, 0.2], 0.5).css("grey", "black@1").align([0, 0.25]);
    let g = svg.group("arrow");
    let t7 = {tail: "7"};
    g.arrow({tail: [0, 1], tip: [0, 3]}, t7);
    g.arrow({tail: [0, -0.5], tip: [0, -2.5]}, t7);
    g.arrow({tail: [-1.3, 0.2], tip: [-2.7, 0.2]}, t7);
    g.arrow({tail: [2, 1], tip: [4, 1]}, t7).css("limegreen");
    svg.mjax("\\vec{\\bf F}_g", null, [0.8, -1.25], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [0.8, 1.75], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [-1.5, 1.25], "red");
    svg.mjax("\\vec{\\bf v}_i", null, [2.75, 2], "limegreen");
},

});