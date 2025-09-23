SVG2.cache("p20/vec2d/img/trig.js", {

pretest: (sel) => {
    let svg = new SVG2(sel, {scale: 37, lrbt: [-1, 15, -1, 5], grid: 1}).css(".NoStyle", "nofill");
    svg.$.find("g.Grid line.Axis").css({stroke: "lightgrey", "stroke-width": "0.5px"});
    let text = svg.group("text");

    // PQR
    let r = vec2d(7, 35);
    let q = new RArray(r[0], 0);
    let l = 0.38;
    let blue = svg.group().css("blue2");
    blue.poly([[0, 0], q, r], 1);
    blue.poly([q.plus([0, l]), q.plus([-l, l]), q.plus([-l, 0])]);
    text.group().css("blue", {stroke: "none"}).ctext(["P", [-0.5, 0]], ["Q", [6.1, 0]], ["R", [6.1, 4]]);
    text.group().css({fill: "black"}).ctext(["7.00", [2.5, 2.5]], ["35.0°", [1.5, 0.3]]);

    // ABC
    let g = text.group().config({shift: [9, 4]});
    blue = g.group().css("blue2");
    blue.poly([[0, 0], [5, 0], [0, -4]], 1);
    blue.poly([[0, -l], [l, -l], [l, 0]]);
    g.group().css("blue", {stroke: "none"}).ctext(["A", [-0.5, -4]], ["B", [5.6, 0]], ["C", [-0.5, 0]]);
    g.group().css({fill: "black"}).ctext(["4.00", [-0.7, -2]], ["5.00", [2.5, 0.3]]);
},

similar: (sel) => {
    let p = root(75);
    let dx = 0.5;
    let svg = new SVG2(sel, {grid: 1, scale: 28, lrbt: [-1, 11, -1, 6]});
    let g = svg.group("nofill", "blue2");
    g.poly([[0, 0], [p, 0], [p, 5]], 1);
    g.poly([[p - dx, 0], [p  - dx, dx], [p, dx]]).css({"stroke-width": "1px"});
    g = svg.group("text", "blue");
    g.gtext("5", {}, [9.3, 2.5]);
    g.gtext("8.66", {}, [5, -0.5]);
    g.gtext("10", {}, [5, 3.6]);
    p /= 2;
    g = svg.group("nofill", "red2");
    g.poly([[0, 0], [p, 0], [p, 2.5]], 1);
    g.poly([[p - dx, 0], [p  - dx, dx], [p, dx]]).css({"stroke-width": "1px"});
    g = svg.group("text", "red");
    g.gtext("2.5", {}, [5, 1.25]);
    g.gtext("5", {}, [p/2, 1.9]);
    g.gtext("4.33", {}, [p/2, -0.5]);
    g = svg.group("text", "black", "f15");
    g.gtext("30°", {}, [1.5, 0.35]);
    g.gtext("60°", {}, [3.82, 1.7]);
    g.gtext("60°", {}, [8.15, 4.2]);
}, 

ramp: (sel) => {
    let x = root(2.25 - 1/16);
    let dx = 0.06;
    let svg = new SVG2(sel, {grid: 0.25, scale: 180, lrbt: [-0.25, 2, -0.25, 0.5]});
    let g = svg.group("nofill", "blue2");
    g.poly([[0, 0], [x, 0], [x, 0.25]], 1);
    g.poly([[x, dx], [x  - dx, dx], [x - dx, 0]]).css({"stroke-width": "1px"});
    g = svg.group("text", "black");
    g.gtext("1.50 m", {}, [x/2, 0.23]);
    g.gtext("0.250 m", {}, [1.7, 0.12]);
    g.gtext("θ", {}, [0.48, 0.04]).css("f15", {"font-style": "italic"});
    svg.$.find("line.Axis").css(SVG2.css("grid"));
},

ball8: (sel) => {
    let svg = new SVG2(sel, {grid: 5, scale: 7, lrbt: [30, 90, 30, 75]});
    let g = svg.group({fill: "grey"});
    g.label(0, 35, [...range(40, 71, 10)]);
    g.label(0, [...range(40, 81, 10)], 35);
    svg.poly([[80, 65], [80, 50], [40, 50]]).css(SVG2.css("nofill", "red2"));
    svg.arrow({tail: [80, 65], tip: [40, 50]}, {tail: "4"}).css("arrow", "blue");
    g = svg.group("text", "blue", "f24");
    g.gtext("I", {}, [82, 65]);
    g.gtext("F", {}, [40, 53]);
    g = svg.group("text", "red");
    g.gtext("40.0 cm", {}, [60, 47.5]);
    g.gtext("15.0 cm", {}, [82.5, 57.5]).config({theta: 90});
}, 

star: (sel) => {
    let svg = new SVG2(sel, {size: [480, 240], grid: 0, lrbt: [-1.5, 4.5, -0.25, 1.1]}).css(".NoStyle");
    let g = svg.group("nofill", "blue1");
    g.poly([[0, 0], [4, 1], [-1, 0], [1, 0]]);
    g.poly([[1, 0], [4, 0], [4, 1]]);
    svg.line([-1, 0.1], [-0.7, 0.03]).css(SVG2.css("black1"));
    g = svg.group("blue", "black1");
    g.circle("5", [-1, 0]);
    g.circle("5");
    g.circle("7", [4, 1]).css({fill: "orange"});
    g = svg.group("text", "f18", "blue");
    g.text("M", [-1, -0.14]);
    g.text("S", [0, -0.14]);
    g = svg.group("text", "f18", "black");
    g.gtext("18.00000°", {}, [-1, 0.1], 0.5, 1);
    g.gtext("18.00020°", {}, [0.45, 0.005], 0, 1);
    g = g.group("serif", {"font-style": "italic"});
    g.gtext("d", {}, [-0.5, -0.09]);
    g = g.group();
    g.gtext("r", {}, [1.9, 0.4]);
    g.gtext("x", {}, [2, -0.09]);
    g.gtext("y", {}, [4.2, 0.5]);
    // g.$.hide();
    svg.$.on("click", () => g.$.fadeToggle());
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, 0], [-5, 8]], {lrbt: [-2, 6, -1, 9],
        scale: 40, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    let g = svg.group("text", "f18");
    g.gtext("km", {}, [-2, "2"], 0, 1);
    g = g.group("f20", "bold");
    g.gtext("A", {}, [0.35, "2"], 0.5, 1);
    g.gtext("B", {}, [5.35, 0.35]);
    g.gtext("C", {}, [0.4, 8.25]);
},

});
