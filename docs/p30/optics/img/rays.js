SVG2.cache("p30/optics/img/rays.js", {

depth: (sel, n, x1, x2, grid) => {
    if (!n) n = 1.5;
    if (!x1) x1 = -0.5;
    if (!x2) x2 = -x1;
    let font = ["sans", 24];

    let svg = new SVG2(sel, {scale: 200, lrbt: [-1.1, 1.1, -1.1, 1.1], grid: grid ? grid: 0});
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

concave: (sel, soln) => {
    svg = new SVG2(sel, {scale: 60, lrbt: [-1, 12, -4, 4], margin: 10, grid: (soln ? 15 : 0.5)});
    svg.ticks({x: [-1, 12.1, 1], default: true});
    svg.ticks({y: [-4, 4.1, 1], default: true});
    svg.$.find("g.Labels g.Zero").remove();

    let c = vec(6, 0), a = asin(4/6);
    css(svg.path(vec2d(6, 180-a).plus(c)).arc_to(vec2d(6, 180+a).plus(c), 6).update(), "none", "black@3");
    svg.arrow({tail: [4,0], tip: [4,2]}, {tail: "5"}).$.find("polygon").css({fill: "#0065fe"});
    let g = svg.group("red");
    g.circle("4");
    g.circle("4", c);
    g = svg.group("red", "sans", 18);
    g.text("Vertex", [0.55, 0.3]);
    g.text("Center", c.plus([0, 0.3]));

    let seg = new Segment(...vec2d(6, 165).plus(c), ...c);
    let p1 = seg.point1;
    let dash = ["black@1", {"stroke-dasharray": "6,10"}];
    svg.group(...dash).line(p1, seg.point(1.5));

    if (soln) {
        let g = svg.group(".Toggle");
        g = g.group("none", "#0065fe@1");
        g.ray([4, 2], p1);
        g.ray([4, 2], [0, 0]);
        let da = atan(new Segment(...p1, 4, 2).slope);
        g.group().config({pivot: p1, theta: -2 * (15 + da)}).ray(p1, [8.5, p1[1]]).css("red@");
        g.ray([0, 0], [8, -4], null, 0.4).css("red@");

        seg = new Segment(...vec2d(6, 205).plus(c), ...c);
        p1 = seg.point1;
        da = acos(seg.unitVector.dot(new Segment(...p1, 4, 2).unitVector));
        svg.group(...dash).line(p1, seg.point(1.5));
        g.ray([4, 2], p1);
        g.group().config({pivot: p1, theta: 25 - da}).ray(p1, [8.5, p1[1]], null, 0.4).css("red@");

        svg.$.on("click", ev => $(ev.currentTarget).children("g.Toggle").fadeToggle());
    }
},

convex: (sel, soln) => {
    svg = new SVG2(sel, {scale: 60, lrbt: [-7, 5, -4, 4], margin: 10, grid: (soln ? 8 : 0.5)});
    svg.ticks({x: [-7, 5.1, 1], default: true});
    svg.ticks({y: [-4, 4.1, 1], default: true});
    svg.$.find("g.Labels g.Zero").remove();

    let c = vec(-6, 0), a = asin(4/6);
    css(svg.path(vec2d(6, -a).plus(c)).arc_to(vec2d(6, a).plus(c), 6).update(),  "none", "black@3");
    svg.arrow({tail: [2,0], tip: [2,2]}, {tail: "5"}).$.find("polygon").css({fill: "#0065fe"});

    let p1 = vec2d(6, 22).plus(c);
    let p2 = vec2d(6, atan(0.25)).plus(c);
    let seg = new Segment(...p1, ...c);
    svg.group("black@1", {"stroke-dasharray": "6,10"}).line(seg.point(-1), seg.point(1));

    if (soln) {
        let tog = svg.group(".Toggle");
        let a = acos(seg.unitVector.dot(new Segment(2, 2, ...p1).unitVector));
        let g = tog.group("none", "#0065fe@1");
        g.ray([2, 2], p1);
        g.ray([2, 2], p2);
        g.ray([2, 2], [0, 0]);
        g = tog.group("none", "red@1");
        g.ray([0, 0], [4, -4]);
        g.ray([2, 2], [5, 2.75]); 
        let rot = g.group().config({theta: 22+a}).shift_by(p1);
        rot.ray([0, 0], [2.3, 0]);
        css(rot.line([0, 0], [-8.25, 0]), "lightgrey@1");
        g = tog.group("none", "lightgrey@1");
        g.line(p2, c);
        g.line([0, 0], [-4, 4]);
    
        svg.$.on("click", ev => $(ev.currentTarget).children("g.Toggle").fadeToggle());
    }

    let g = svg.group("red");
    g.circle("4");
    g.circle("4", c);
    g = svg.group("red", "sans", 18);
    g.text("Vertex", [0.55, 0.3]);
    g.text("Center", c.plus([0, 0.3]));
    // g.$.find("text, circle").css({fill: "red"});
},

plane: (sel, soln) => {
    svg = new SVG2(sel, {scale: 30, lrbt: [-12, 12, -8, 8], margin: 10, grid: 1});
    $(svg.$.find("g.Grid line.Axis")[0]).css({"stroke-width": "3px"});
    svg.ticks({x: [-12, 12.1, 2], default: true});
    svg.ticks({y: [-8, 8.1, 2], default: true});
    svg.$.find("g.Labels g.Zero").remove();
    svg.group("#0065fe").arrow({tail: [10, 0], tip: [10, 2]}, {tail: "5"});
    if (soln) {
        let g = svg.group(".Toggle");
        g.group("lightgrey").arrow({tail: [-10, 0], tip: [-10, 2]}, {tail: "5"});
        let dash = {"stroke-dasharray": "8, 8"};
        g = g.group("none", "#0065fe@1");
        for (let [p1, p2, p3] of [[4, 6.4, 1.6], [0, -2.4, 2.4], [-3, -8, 3]]) {
            g.ray([10, 2], [0, p1]);
            g.ray([0, p1], [12, p2]).css("red@");
            css(g.line([0, p1], [-12, p3]), "grey@", dash);
        }
        svg.$.on("click", ev => $(ev.currentTarget).children("g.Toggle").fadeToggle());
    }
},

fish: (sel, soln) => {
    svg = new SVG2(sel, {scale: 30, lrbt: [-8, 8, -12, 6], margin: 10, grid: (soln ? 15 : 0.5)});
    $(svg.$.find("g.Grid line.Axis")[1]).css({"stroke-width": "3px"});
    svg.ticks({x: [-4, 8.1, 2], default: true});
    svg.ticks({y: [-12, 6.1, 2], default: true});
    svg.$.find("g.Labels g.Zero").remove();
    let g;
    if (soln) {
        g = svg.group("none", "#0065fe@1");
        g.ray([0, -10], [2, 0]);
        g.ray([0, -10], [-2, 0]);
        g = svg.group("none", "red@1");
        let a = asin(1.33 * sin(atan(0.2)));
        let x = 6 * tan(a) + 2;
        g.ray([2, 0], [x, 6]);
        g.ray([-2, 0], [-x, 6]);
        g = svg.group("none", "lightgrey@1");
        let y = -2 / tan(a);
        g.line([2, 0], [0, y]);
        g.line([-2, 0], [0, y]);
        css(svg.circle("5", [0, y]), "lightgrey", "black@1");
    }
    svg.circle("5", [0, -10]).css({fill: "red"});
    g = svg.group("sans", 18);
    g.text("Coin", [1, -10.2, "b"]).css({fill: "red"});
    g.text("Air", [-7, 0.4, "b"]);
    g.text("Water", [-7, -0.8, "b"]);
},

});
