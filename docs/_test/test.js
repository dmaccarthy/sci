SVG2.cache("_test/test.js", {

pole: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-1, 2.3, 0, 6], grid: 0, scale: 64});
    let top = vec2d(6, 90);
    let pt = vec2d(5, -70).plus(top);
    let g = svg.group("black@2");
    g.line(pt, top);
    css(g.line(pt, [-1, pt[1]]), "@1");
    g = svg.group("black", "none@");
    g.circle("12", pt);
    g.rect([0.15, 6], [0, 3]);
    svg.mjax("\\theta", null, top.plus(vec2d(1.2, -80)));
    svg.mjax("r", null, [pt[0] / 2, pt[1] + 0.25]);
    svg.mjax("y", null, [-0.4, 3 + pt[1] / 2]);
    g = svg.group("sans", 24);
    g.text("20.0 kg", pt.plus([0, -0.5]));
    g = g.group().config({pivot: top, theta: -70});
    g.text("5.00 m", [2.5, 6.2]);
},


});