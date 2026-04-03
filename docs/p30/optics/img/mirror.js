SVG2.cache("p30/optics/img/mirror.js", {

candle: (sel) => {
    let svg = new SVG2(sel, {scale: 32, lrbt: [-10, 0.5, -4, 4], grid: 0, margin:2});
    css(svg.line([-10, 0], [0, 0]), "black@1");
    let g = svg.group("black@2", "none");
    g.path(vec2d(10, 195)).arc_to(vec2d(10, 165), 10, 2).update();
    g.line([0, 4], [0, -4]);

    g = svg.group("#0065fe@1", "none");
    for (let [p1, p2] of [
        [[-10, 0.5], [-8.2, 0.5]],
        [[-5, 0.5], [-6.8, 0.5]],
        [[-5, 0.5], [-4, 0.5]],
        [[0, 0.5], [-1, 0.5]],
        [[0, -0.75], [-4.3, -0.75]],
        [[-10, -0.75], [-5.7, -0.75]],
    ]) g.line(p1, p2);

    let candle = (g, f) => {
        g = g.group("black@1", "yellow");
        g.cylinder([f/4, f/10], f/2).css("lightgrey");
        g.line([0, 0], [0, f/4]);
        g.flame(f/2).shift_by([0, f/6]);
        return g;
    }

    candle(svg, 1).shift_by([-5, 0.5]);
    candle(svg, 2).config({theta: 180}).shift_by([-0.1, -1]);

    g = svg.group("sans", 18);
    g.text("Screen", [-0.3, 2.5, "b"], 90);
    g.text("Mirror", [-9.2, 1.5, "b"], 80);
    g.text("Object", [-5, 1.5, "b"]);
    g.text("Image", [-0.7, -2, "br"]);

    let sz = {scale: 0.8};
    svg.mjax("\\rm 2.00\\ m", sz, [-2.5, 0.5], "#0065fe");
    svg.mjax("d_o", sz, [-7.5, 0.5], "#0065fe");
    svg.mjax("d_i", sz, [-5, -0.75], "#0065fe");
},

deriv: (sel) => {
    let svg = new SVG2(sel, {size: [702, 352], lrbt: [-0.2, 3.2, -2.2, 1.2]});
    let tri = svg.group({"fill-opacity": 0.2}, "none@");
    let g = svg.group("black@3");
    g.line([-0.2, 0], [3.2, 0]);
    g.line([0, -2.2], [0, 1.2]);
    let f = [1, 0], d = [1.5, 1], di = [3, -2];
    let b = svg.group(), r = svg.group();
    let ray = (g, p1, p2) => {g.ray(p1, p2, {size: "8", ratio: 0.6})}

    b.arrow({tail: [1.5, 0], tip: d}, {tail: "3"});
    ray(b, d, [0, 1]);
    ray(b, d, [0, -2]);
    ray(b, d, [1.4, 1.2]);
    b.$.find("line, polyline").css({stroke: "#0065fe"});
    b.$.find("polygon").css({fill: "#0065fe"});

    r.arrow({tail: [3, 0], tip: di}, {tail: "6"});
    ray(r, [1.4, 1.2], [3.2, -2.4]);
    ray(r, [0, 1], [3.2, -2.2]);
    ray(r, [0, -2], [3.2, -2]);
    r.$.find("line, polyline").css({stroke: "red"});
    r.$.find("polygon").css({fill: "red"});

    g = tri.group(".Toggle0", "green");
    g.poly([d, [0, 1], f], 1);
    g.poly([di, [0, -2], f], 1);

    g = tri.group(".Toggle1", "#0065fe");
    g.poly([d, [1.5, 0], f], 1);
    g.poly([[0, -2], [0, 0], f], 1);

    g = tri.group(".Toggle2", "red");
    g.poly([di, [3, 0], f], 1);
    g.poly([[0, 1], [0, 0], f], 1);

    g = svg.group("white", "black@1");
    g.circle("4", f);
    g.circle("4", [2, 0]);

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );

},

});
