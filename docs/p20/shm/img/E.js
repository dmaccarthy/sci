SVG2.cache("p20/shm/img/E.js", {

pend: (sel) => {
    let svg = new SVG2(sel, {size: [300, 400], lrbt: [-1.5, 1, -3.25]}).css(".NoStyle");
    let p = vec2d(3, 245);
    svg.line(p, [0.2, p[1]]).css(SVG2.css("red2"));
    svg.path(p).arcTo([0, -3], 3).update().css(SVG2.css("nofill", "blue2"));
    let g = svg.group("black2", {fill: "white"});
    g.poly([p, [0, 0], [0, -3]]).css(SVG2.css("nofill"));
    g.circle(0.1, p);
    g.circle(0.1, [0, -3]);

    let [IT, SM_IT] = [2, 6];
    g = svg.group("symbol", "f28", "red");
    g.symb(0, ["x", IT], ["H", SM_IT, ["16", "-8"]]).align([-0.6, -2.55]);
    g.symb(0, ["x", IT]).align([-0.72, -3.1]).css(SVG2.css("blue"));
    g.symb(0, ["θ", IT]).align([-0.1, -0.5]);
    g.symb(0, ["L", IT]).align([-0.8, -1.25]);
    g.symb(0, ["L", IT], ["cos", 0, ["32", 0]], ["θ", IT, ["64", 0]]).align([0.5, -1.5]);
    g.symb(0, ["h", IT]).align([0.25, -3.125]);
},

spring: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [0, 5.25, -0.77], margin: 2}).css(".NoStyle");
    let g = svg.group("nofill", "black2");
    let spring = g.group({stroke: "silver"});
    let poly = spring.poly([]);
    g.poly([[0, 1], [0, 0], [5.25, 0]]);

    let mass = svg.group();
    mass.rect([0.4, 0.4], [3, 0.2]).css(SVG2.css("blue", "black1"));
    svg.gtext("Eqm", ["text", "f20", "blue"], [3, -0.6]);
    svg.arrow({tail: [3, -0.4], tip: [3, 0]}, {tail: "4"}).css("arrow", "blue");

    g = svg.group("symbol", "red", "f28");
    g.symb(0, ["x", 1], SVG2.arr("15")).align([4.5, 0.6], 0, 0.6).css("blue");
    g.symb(0, ["F", 1], SVG2.arr("22"), ["elas", 6, ["20", "-8"]]).align([4.5, 1.1], 0, 0.6);
    g = svg.group("arrow");
    let arrows = [g.arrow(1), g.arrow(1).css("blue")];

    svg.beforeupdate = function() {
        let x = 1.25 * cos(60 * svg.time);
        mass.config({shift: [x, 0]});
        spring.poly([...SVG2.spring_points([0, 0.2], [2.799 + x, 0.2], 21, 0.2, 0.1)], poly);
        let tail = new RArray(3 + x, 1.1);
        arrows[0].reshape({tail: tail, tip: tail.plus([-1.4 * x, 0])});
        arrows[1].reshape({tail: [3, 0.6], tip: [3 + x, 0.6]});
    }

    svg.update().$.on("click", () => svg.toggle());
},

bar: (sel) => {
    SVG2.ebg(sel, 10, 1, [
        ["E_k", (t) => 6.75 * t * t],
        ["E_p", true],
    ], {E: 9, duration: 4, unit: "mJ", label: [0, "-6", 2]});
},

Q3: (sel, Ep) => {
    let dt = 120;
    if (Ep != null) {
        let a = acos(Math.sqrt((Ep) / 8.1));
        dt = a / 90;
    }
    SVG2.ebg(sel, 10, 1, [
        ["E_k", true],
        ["E_p", (t) => 8.1 * sq(cos(360*(dt*t/4)))],
    ], {E: 8.1, unit: "mJ", duration: dt, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

Q5: (sel) => {
    let Ek = sq(0.35) * 79 / 2;
    let Ep = sq(0.036) * 19000 / 2;
    let E = Ek + Ep;
    let a = atan(Math.sqrt(Ek/Ep));
    SVG2.ebg(sel, 18, 1, [
        ["E_k", true],
        ["E_p", (t) => E * sq(cos(a+360*(30*t)))],
    ], {E: E, unit: "mJ", duration: 120, margin: [40, 4, 40, 16], label: [0, "-6", 3]});
},

});