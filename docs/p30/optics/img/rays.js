SVG2.cache("p30/optics/img/rays.js", {

depth: (sel, n, x1, x2) => {
    if (!n) n = 1.4;
    if (!x1) x1 = -0.5;
    if (!x2) x2 = -x1;
    let font = ["sans", 24];

    let svg = new SVG2(sel, {scale: 200, lrbt: [-1.1, 1.1, -1.1, 1.1], margin: 0});
    let text = svg.group(...font);
    svg.ray_data = [x1, x2];
    css(svg.line([-1.2, 0], [1.2, 0]), "black@2");
    text.text("Air", [-0.9, 0.1]);
    text.text("Water", [-0.9, -0.1]);

    // Incident rays
    let g = svg.group();
    let obj = [0, -1], p1 = new RArray(x1, 0), p2 = new RArray(x2, 0);
    g.ray(obj, [0, 0], null, 0.8);
    g.ray(obj, p1);
    g.ray(obj, p2);
    text.text("Object", [0.07, -1, "l"]);
    g.circle("4", obj);
    g.$.find("circle, polygon").css({fill: "#0065fe"});
    g.$.find("line, polyline").css({stroke: "#0065fe"});

    // Refracted rays
    let gref = g.group();
    gref.ray([0, 0], [0, 1.1]);
    let snell = (x) => Math.tan(Math.asin(n * Math.sin(Math.atan(x))));
    let a1 = snell(x1);
    let a2 = snell(x2);
    let img1 = !isNaN(a1), img2 = !isNaN(a2);

    let pt = (x, a) => {
        let s = x < 0 ? -1 : 1;
        x *= s;
        let dx = 1.1 - x;
        let dy = s * dx / a;
        if (dy > 1.1) {
            dx *= 1.1 / dy;
            dy = 1.1;
        }
        return [s * (x + dx), dy];
    }

    if (img1) gref.ray(p1, pt(x1, a1));
    if (img2) gref.ray(p2, pt(x2, a2));
    gref.$.find("line, polyline").css({stroke: "red"});

    // Virtual rays and image
    let gimg = g.group();
    if (img1 || img2) {
        if (img1) {
            img1 = p1.minus([x1, x1 / a1]);
            gimg.line(p1, img1);
        }
        if (img2) {
            img2 = p2.minus([x2, x2 / a2]);
            gimg.line(p2, img2);
        }
        let img = !img1 ? img2 : (!img2 ? img1 : new Segment(...img1, ...img2).midpoint);
        gimg.circle("4", img);
        gimg.gtext("Image", font, [...img.plus([0.07, 0]), "l"]);
        gimg.$.find("text, circle").css({fill: "grey"});    
        gimg.$.find("line").css({stroke: "grey", "stroke-dasharray": "8,8"});
    }

    svg.$.find("line, polyline").css({"stroke-width": "2px", fill: "none"});
},

concave: (sel) => {
    svg = new SVG2(sel, {scale: 60, lrbt: [-1, 12, -4, 4], margin: 10, grid: 0.5});
    svg.tick_label(0, [...range(-1, 12.1, 1)], 0, "-6", "-16");
    svg.tick_label(0, 0, [...range(-4, 4.1, 1)], "-6", "-10");

    let c = vec(6, 0), a = asin(4/6);
    svg.path(vec2d(6, 180-a).plus(c)).arc_to(vec2d(6, 180+a).plus(c), 6).update().css({"stroke-width": "3px"});
    svg.arrow({tail: [4,0], tip: [4,2]}, {tail: "5"}).$.find("polygon").css({fill: "#0065fe"});
    let g = svg.group();
    g.circle("4");
    g.circle("4", c);
    g.text("Vertex", [0.55, 0.3]);
    g.text("Center", c.plus([0, 0.3]));
    g.$.find("text, circle").css({fill: "red"});

    let seg = new Segment(...vec2d(6, 165).plus(c), ...c);
    svg.line(seg.point1, seg.point(1.5)).css({"stroke-dasharray": "6,10"});
},

convex: (sel) => {
    svg = new SVG2(sel, {scale: 60, lrbt: [-7, 5, -4, 4], margin: 10, grid: 0.5});
    svg.tick_label(0, 0, [...range(-4, 4.1, 1)], "-6", "-10");

    let c = vec(-6, 0), a = asin(4/6);
    svg.path(vec2d(6, -a).plus(c)).arc_to(vec2d(6, a).plus(c), 6).update().css({"stroke-width": "3px"});
    svg.arrow({tail: [2,0], tip: [2,2]}, {tail: "5"}).$.find("polygon").css({fill: "#0065fe"});
    svg.tick_label(0, [...range(-7, 5.1, 1)], 0, "-6", "-16");
    let g = svg.group();
    g.circle("4");
    g.circle("4", c);
    g.text("Vertex", [0.55, 0.3]);
    g.text("Center", c.plus([0, 0.3]));
    g.$.find("text, circle").css({fill: "red"});

    let seg = new Segment(...vec2d(6, 22).plus(c), ...c);
    svg.line(seg.point1, seg.point(-1.5)).css({"stroke-dasharray": "6,10"});
},

plane: (sel) => {
    svg = new SVG2(sel, {scale: 30, lrbt: [-12, 12, -8, 8], margin: 10, grid: 1});
    $(svg.$.find("g.Grid line.Axis")[0]).css({"stroke-width": "3px"});
    svg.tick_label(0, [...range(-12, 12.1, 2)], 0, "-6", "-16");
    svg.arrow({tail: [10,0], tip: [10,2]}, {tail: "5"}).$.find("polygon").css({fill: "#0065fe"});
},

fish: (sel) => {
    svg = new SVG2(sel, {scale: 30, lrbt: [-8, 8, -12, 6], margin: 10, grid: 1});
    $(svg.$.find("g.Grid line.Axis")[1]).css({"stroke-width": "3px"});
    svg.tick_label(0, [...range(-4, 8.1, 2)], 0, "-6", "-16");
    svg.tick_label(0, 0, [...range(-12, 6.1, 2)], "-6", "-10");
    svg.circle("5", [0, -10]).css({fill: "red"});
    svg.text("Coin", [1, -10.5]).css({fill: "red"});
    svg.text("Air", [-7, 0.6]);
    svg.text("Water", [-7, -0.6]);
},

});
