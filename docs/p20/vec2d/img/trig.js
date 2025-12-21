SVG2.cache("p20/vec2d/img/trig.js", {

pretest: (sel) => {
    let svg = new SVG2(sel, {scale: 37, lrbt: [-1, 15, -1, 5], grid: 1});
    svg.$.find("g.Grid line.Axis").css({stroke: "lightgrey", "stroke-width": "0.5px"});
    let text = svg.group("sans", "#0065fe");

    // PQR
    let r = vec2d(7, 35);
    let q = new RArray(r[0], 0);
    let l = 0.38;
    let blue = svg.group("none", "#0065fe@2");
    blue.poly([[0, 0], q, r], 1);
    blue.poly([q.plus([0, l]), q.plus([-l, l]), q.plus([-l, 0])]);
    text.text("P", [-0.5, 0]);
    text.text("Q", [6.1, 0]);
    text.text("R", [6.1, 4]);
    text.text("7.00", [2.5, 2.5], 0, "black");
    text.text("35.0°", [1.5, 0.3], 0, "black");

    // ABC
    let g = text.group().config({shift: [9, 4]});
    blue = g.group("none", "#0065fe@2");
    blue.poly([[0, 0], [5, 0], [0, -4]], 1);
    blue.poly([[0, -l], [l, -l], [l, 0]]);
    text = g.group("sans", "#0065fe");
    text.text("A", [-0.5, -4]);
    text.text("B", [5.6, 0]);
    text.text("C", [-0.5, 0]);
    text.text("4.00", [-0.7, -2], 0, "black");
    text.text("5.00", [2.5, 0.3], 0, "black");
},

similar: (sel) => {
    let p = root(75);
    let dx = 0.5;
    let svg = new SVG2(sel, {grid: 1, scale: 28, lrbt: [-1, 11, -1, 6]});
    let g = svg.group("none", "#0065fe@2");
    g.poly([[0, 0], [p, 0], [p, 5]], 1);
    g.poly([[p - dx, 0], [p  - dx, dx], [p, dx]]).css({"stroke-width": "1px"});
    g = svg.group("sans", "#0065fe");
    g.text("5", [9.3, 2.5]);
    g.text("8.66", [5, -0.5]);
    g.text("10", [5, 3.6]);
    p /= 2;
    g = svg.group("none", "red@2");
    g.poly([[0, 0], [p, 0], [p, 2.5]], 1);
    g.poly([[p - dx, 0], [p  - dx, dx], [p, dx]]).css({"stroke-width": "1px"});
    g = svg.group("sans", "red");
    g.text("2.5", [5, 1.25]);
    g.text("5", [p/2, 1.9]);
    g.text("4.33", [p/2, -0.5]);
    g = svg.group("sans", "black", 15);
    g.text("30°", [1.5, 0.35]);
    g.text("60°", [3.82, 1.7]);
    g.text("60°" [8.15, 4.2]);
}, 

ramp: (sel) => {
    let x = root(2.25 - 1/16);
    let dx = 0.06;
    let svg = new SVG2(sel, {grid: 0.25, scale: 180, lrbt: [-0.25, 2, -0.25, 0.5]});
    let g = svg.group("none", "#0065fe@2");
    g.poly([[0, 0], [x, 0], [x, 0.25]], 1);
    g.poly([[x, dx], [x  - dx, dx], [x - dx, 0]]).css({"stroke-width": "1px"});
    g = svg.group("sans", "black");
    g.text("1.50 m", [x/2, 0.23]);
    g.text("0.250 m", [1.7, 0.12]);
    g.text("θ", [0.48, 0.01, "b"], 0, [15, "ital"]);
    css(svg.$.find("line.Axis"), "grid");
},

ball8: (sel) => {
    let svg = new SVG2(sel, {grid: 5, scale: 7, lrbt: [30, 90, 30, 75]});
    let g = svg.group({fill: "grey"});
    g.label(0, 35, [...range(40, 71, 10)]);
    g.label(0, [...range(40, 81, 10)], 35);
    css(svg.poly([[80, 65], [80, 50], [40, 50]]), "none", "red@2");
    svg.arrow({tail: [80, 65], tip: [40, 50]}, {tail: "4"}).css("arrow", "#0065fe");
    g = svg.group("sans", "#0065fe", 24);
    g.text("I", [82, 65]);
    g.text("F", [40, 53]);
    g = svg.group("sans", "red");
    g.text("40.0 cm", [60, 47.5]);
    g.text("15.0 cm", [82.5, 57.5]).config({theta: 90});
}, 

star: (sel) => {
    let svg = new SVG2(sel, {size: [480, 240], grid: 0, lrbt: [-1.5, 4.5, -0.25, 1.1]});
    let g = svg.group("none", "#0065fe@1");
    g.poly([[0, 0], [4, 1], [-1, 0], [1, 0]]);
    g.poly([[1, 0], [4, 0], [4, 1]]);
    css(svg.line([-1, 0.1], [-0.7, 0.03]), "black@1");
    g = svg.group("#0065fe", "black@1");
    g.circle("5", [-1, 0]);
    g.circle("5");
    g.circle("7", [4, 1]).css({fill: "orange"});
    g = svg.group("sans", 18, "#0065fe");
    g.text("M", [-1, -0.14]);
    g.text("S", [0, -0.14]);
    g = svg.group("sans", 18, "black");
    g.text("18.00000°", [-1, 0.1, "b"]);
    g.text("18.00020°", [0.45, 0.005, "b"]);
    g = g.group("serif", {"font-style": "italic"});
    g.text("d", [-0.5, -0.09]);
    g = g.group();
    g.text("r", [1.9, 0.4]);
    g.text("x", [2, -0.09]);
    g.text("y", [4.2, 0.5]);
    // g.$.hide();
    svg.$.on("click", () => g.$.fadeToggle());
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, 0], [-5, 8]], {lrbt: [-2, 6, -1, 9],
        scale: 40, margin: 8, grid: 0.5, label: [1, 0]});
    svg.$.find(".Component").remove();
    let g = svg.group("sans", 18);
    g.text("km", {}, [-2, "2", "bl"]);
    g = g.group(20, "bold");
    g.text("A", [0.35, 0.35]);
    g.text("B", [5.35, 0.35]);
    g.text("C", [0.4, 8.25]);
},

});
