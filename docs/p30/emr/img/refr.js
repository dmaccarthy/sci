SVG2.cache("p30/emr/img/refr.js", {

tank: (sel) => {
    svg = new SVG2(sel, {size: [640, 640], lrbt: [-1, 1], margin: 4})
    let top = svg.group("none", "black@1");
    top.path([1, 0]).hor(-1).arc_to([1, 0], 1).update();
    top.line([0, 1], [0, -1]);
    let g = svg.group("sans", "black", "none@");
    for (let a=1;a<90;a+=1) {
        let r = a % 10 ? (a % 5 ? 0.96 : 0.93) : 0.9;
        // if (a % 5 == 0)
            top.line(vec2d(1, a), vec2d(r, a));
        top.line(vec2d(-1, a), vec2d(-r, a));
        if (a % 10 == 0) {
            g.gtext(90 - a, [], vec2d(0.85, a));
            g.gtext(90 - a, [], vec2d(0.85, a + 180));
        }
    }
    g = svg.group("sans", "black", "none@");
    g.gtext("Air", 36, vec2d(0.5, 135));
    g.gtext("Tank", 36, vec2d(0.5, -135));
    g.gtext("Boundary", [], [0.45, 0.02, "b"]);
    g.gtext("Normal", [], [0.02, 0.45, "t"], 90);
},

});