SVG2.cache("p20/circ/img/ac.js", {

delta_v: (sel) => {
    let v = [vec2d(4, 120), vec2d(4, -90)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-3, 1, -1, 4], scale: 64, margin: 1, grid: 0.5});
    svg.$.find("g.Component").remove();

    let s = {scale: 1};
    svg.mjax("\\Delta\\vec{\\bf v}", s, [-0.9, -0.6], "#0065fe");
    svg.mjax("-\\vec{\\bf v}_1", s, [-2.6, 1.75], "red");
    svg.mjax("\\vec{\\bf v}_2", s, [-0.6, 2], "red");
    svg.mjax("\\theta", s, [-1.75, 2.5], "red");
},

orbit: (sel) => {
    let a = 45;
    let p = vec2d(10, a);
    let svg = new SVG2(sel, {size: [306, 300], lrbt: [-1, 12, -2], grid: 0, margin: 3});
    svg.group("none", "black@2").circle(10);
    let g = svg.group("none", "#0065fe@1");
    g.poly([[0, 0], [10, 0], p], 1);
    g = g.group("#0065fe", "black@1");
    g.circle("3");
    g.circle("3", p);
    g.circle("3", [10, 0]);

    let c = "#0075fe", s;
    svg.mjax("\\rm C", s, [-0.6, 0.6], c);
    svg.mjax("\\rm P_1", s, [11, 0], c);
    svg.mjax("\\rm P_2", s, p.times(1.1), c);
    svg.mjax("\\theta", s, [1.5, 0.6], c);
    svg.mjax("r", s, p.times(0.5).plus([0, 1]), c);
    svg.mjax("r", s, [5, -0.7], c);
    svg.mjax("s", s, vec2d(8.5, a/2), c);
    c = "red";
    svg.mjax("\\vec{\\bf v}_1", s, [11.2, 2], c);
    svg.mjax("\\vec{\\bf v}_2", s, vec2d(11.3, a + 10), c);

    L = root(32 * (1 - cos(a)))
    g = svg.group("arrow");
    g.arrow(L, {tail: "6"}, {anchor: "tail"}).config({theta: 180 + a / 2, shift: vec2d(8.3, a/2)}).css(".Toggle0", "#0065fe");
    g.arrow(4, {tail: "6"}, {anchor: "tail"}).config({theta: 90, shift: [10, 2.2]});
    g = g.group().config({theta: a});
    g.arrow(4, {tail: "6"}, {anchor: "tail"}).config({theta: 90, shift: [10, 2.2]});
    svg.$.find(".Toggle0").hide();
},

car: (sel) => {
    let svg = new SVG2(sel, {size: [200, 332], lrbt: [-3, 7, -7]});
    css(svg.line([-4, 0], [8, 0]), "black@2");
    svg.image("p20/circ/img/car_front.svg", [4, 4], [[0, 0], [0.5, 0.85]]);

    let g = svg.group("arrow");
    let L = 6;
    g.arrow({tail: [0, -0.5], tip: [0, -0.5 - L]}, {tail: "7"});
    g.arrow({tail: [0, 3], tip: [0, 3 + L]}, {tail: "7"});
    g.arrow({tail: [2.5, 0.5], tip: [2.5 + L / 2, 0.5]}, {tail: "7"});

    svg.mjax("\\vec{\\bf F}_g", null, [-1.5, -3], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [-1.5, 5.5], "red");
    svg.mjax("\\vec{\\bf F}_f", null, [4, 3], "red");
},

merry: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-10, 10, -0.5]});
    css(svg.line([-8, 2.7], [0, 2.7]), "orange@");
    let g = svg.group("silver");
    g.rect([1, 8], [0, 4]);
    g.rect([18, 0.6], [0, 1]);
    svg.stickman(2.7).ralign([-8, 1.3, 0.5, 1]);
    g = svg.group("text");
    g.gtext("Icy Platform", [], [5, 2]);
    g.gtext("Bungee Cord", [], [-4, 3.3]);
    g.gtext("Axis", [], [1.7, 6]);
    css(svg.line([-10, 0], [10, 0]), "black@2");
},

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [360, 360], lrbt: [-1, 1], margin: 12});
    let g = svg.group("black@1");
    g.line([0, -1], [0, 1]);
    g.line([-1, 0], [1, 0]);
    css(svg.circle(1), "none", "black@3");

    let circ = svg.group("black@1", "#0065fe").config({animated: true, omega: 60});
    let vert = g.line([1, 0], [1, 0]);
    circ.line([0, 0], [1, 0]);
    circ.circle(0.05, [1, 0]);

    let arrows = svg.group({fill: "#0065FE", "fill-opacity": 0.4});
    arrows.arrow({tip: [0, 0], tail: [-0.15, 0]}, {tail: "4"}, "tip");
    arrows.arrow({tip: [0, 0], tail: [0, -0.15]}, {tail: "4"}, "tip");
    arrows = arrows.find_all("g.Arrow");

    svg.beforeupdate = function() {
        let a = circ.theta;
        let [c, s] = [cos(a), sin(a)];
        g.line([c, s], [c, 0], vert);
        arrows[0].config({shift: [0, s]});
        arrows[1].config({shift: [c, 0]});
    };

    svg.$.on("click", () => svg.toggle());
    return svg.play();
},

});