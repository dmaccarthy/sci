SVG2.cache("p20/grav/img/field.js", {

binstar: (sel) => {
    let svg = new SVG2(sel, {scale: 4.8, lrbt: [-10, 90, -10, 30], grid: 10}).css(".NoStyle");

    let g = svg.group().css({stroke: "black", "stroke-width": 1});
    let ship = [70, 20];
    g.line(ship, [0, 0]);
    g.line(ship, [80, 0]);
    g.line(ship, [70, 0]);

    svg.circle(4, [0, 0]).css({fill: "#0065FE", stroke: "black"});
    svg.circle(2.5, [80, 0]).css({fill: "red", stroke: "black"});
    svg.image("media/rocket.svg", [12, 12], ship);

    g = svg.group("text");
    for (let [t, p] of [
        ["10", [74, -3]], ["70", [35, -3]], ["20", [66, 10]]
    ]) g.gtext(t, [], p);

    g = svg.group();
    let s = {scale: 0.8};
    g.mjax("\\alpha", s, [13, 2]);
    g.mjax("\\beta", s, [76, 2]);
    s.scale = 1;
    g.mjax("r_{\\scriptsize P}", s, [34, 14]);
    g.mjax("r_{\\scriptsize S}", s, [79, 10]);
},

quiz_wr: (sel) => {
    let svg = new SVG2(sel, {scale: 48, lrbt: [-1, 9, -1, 4], grid: 0}).css(".NoStyle");
    let g = svg.group("black@1");
    g.line([0.5, 0], [9, 0]);
    g.line([0, 0.5], [0, 4]);

    g.circle(0.3, [0, 3]).css({fill: "#0065fe"});
    g.circle(0.6, [8, 0]).css({fill: "orange"});
    svg.group("arrow").arrow({tail: vec2d(0.5, 20), tip: vec2d(3.5, 20)}, {tail: "8"});
    svg.gtext("S", ["text", 24]);
}

});
