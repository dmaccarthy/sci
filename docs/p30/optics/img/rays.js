SVG2.cache("p30/optics/img/rays.js", {

depth: (sel, n, x1, x2) => {
    if (!n) n = 1.4;
    if (!x1) x1 = -0.5;
    if (!x2) x2 = -x1;

    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.1, 1.1], margin: 0});
    svg.ray_data = [x1, x2];
    svg.line([-1.2, 0], [1.2, 0]);
    svg.text("Air", [-0.95, 0.08]);
    svg.text("Water", [-0.95, -0.08]);

    // Incident rays
    let g = svg.group();
    let obj = [0, -1], p1 = new RArray(x1, 0), p2 = new RArray(x2, 0);
    g.ray(obj, [0, 0], null, 0.8);
    g.ray(obj, p1);
    g.ray(obj, p2);
    g.text("Object", [0.07, -1]).css({"text-anchor": "start"});
    g.circle("4", obj);
    g.$.find("text, circle, polygon").css({fill: "#0065fe"});
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
        gimg.text("Image", img.plus([0.07, 0])).css({"text-anchor": "start"});
        gimg.$.find("text, circle").css({fill: "grey"});    
        gimg.$.find("line").css({stroke: "grey", "stroke-dasharray": "8,8"});
    }

    svg.$.addClass("SVG2").find("line, polyline").css({"stroke-width": "2px"});
},

});
