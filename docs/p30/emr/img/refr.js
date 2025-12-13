SVG2.cache("p30/emr/img/refr.js", {

tank: (sel) => {
    svg = new SVG2(sel, {size: [640, 640], lrbt: [-1, 1], margin: 4}).css("none", "black@1");
    svg.path([1, 0]).hor(-1).arc_to([1, 0], 1).close().update();
    svg.line([0, 1], [0, -1]);
    let g = svg.group("text", "black", "none@");
    for (let a=1;a<90;a+=1) {
        let r = a % 10 ? (a % 5 ? 0.96 : 0.93) : 0.9;
        // if (a % 5 == 0)
            svg.line(vec2d(1, a), vec2d(r, a));
        svg.line(vec2d(-1, a), vec2d(-r, a));
        if (a % 10 == 0) {
            g.gtext(90 - a, [], vec2d(0.85, a));
            g.gtext(90 - a, [], vec2d(0.85, a + 180));
        }
    }
    g = svg.group("text", "black", "none@");
    g.gtext("Air", 36, vec2d(0.5, 135));
    g.gtext("Tank", 36, vec2d(0.5, -135));
    g.gtext("Boundary", [], [0.45, 0, 0.5, 1.1]);
    g.gtext("Normal", [], [0, 0.45, 0.5, 1.1], 90);
},

});