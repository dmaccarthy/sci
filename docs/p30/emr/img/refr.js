SVG2.cache("p30/emr/img/refr.js", {

tank: (sel) => {
    svg = new SVG2(sel, {size: [640, 640], lrbt: [-1, 1], margin: 4}).css(".NoStyle", "nofill", "black@1");
    svg.path([1, 0]).hor(-1).arc_to([1, 0], 1).close().update();
    svg.line([0, 1], [0, -1]);
    let g = svg.group().css("text", {stroke: "none", fill: "black"});
    for (let a=1;a<90;a+=1) {
        let r = a % 10 ? (a % 5 ? 0.96 : 0.93) : 0.9;
        // if (a % 5 == 0)
            svg.line(vec2d(1, a), vec2d(r, a));
        svg.line(vec2d(-1, a), vec2d(-r, a));
        if (a % 10 == 0) g.ctext([90 - a, vec2d(0.85, a)], [90 - a, vec2d(0.85, a + 180)]);
    }
    let css = {"font-size": "36px"};
    g.ctext(
        ["Boundary", [0.45, 0.05]],
        ["Normal", [0.03, 0.45], {config: {theta: - 90}}],
        ["Tank", vec2d(0.5, -135), {css: css}],
        ["Air", vec2d(0.5, 135), {css: css}],
    );
},

});