SVG2.cache("p20/vec2d/img/arith.js", {

ship: (sel) => {
    let svg = new SVG2(sel, {size: [400, 300], lrbt: [-0.06, 1.04, -0.06], margin: 4}).css(".NoStyle");
    let pt = vec2d(sin(60) / sin(70), 50);
    let g = svg.group("black1", "blue");
    g.circle(0.05);
    g.circle(0.03, [1, 0]);
    g.circle("3", pt).css({fill: "red"});
    g = svg.group("text", "f24", "blue");
    g.gtext("P", {}, [0, 0.1]);
    g.gtext("M", {}, [1, 0.1]);
    g.gtext("S", "red", pt.plus([0.07, 0.03]));

    g = svg.group("arrow");
    let scale = 0.5;
    let arrow = (L, a) => {
        L *= scale;
        let pivot = new RArray(-L/2 - 0.04, 0);
        return g.arrow(L, {tail: "6"}).config({pivot: pivot, theta: a}).shift_by(pt.minus(pivot));
    }
    let fields = [[0.462, 230], [0.594, 300]];
    let a = vec2d(0, 0);
    for (let f of fields) {
        arrow(...f);
        a = a.plus(vec2d(...f));
    }
    arrow(-a[1], -90).css("blue");

    let [BD, SM] = [1, 4];
    let arr = ["→", 5, [0, "14"]];
    let sub = ["15", "-10"];
    g = svg.group("symbol", "f28", "red");
    g.symb(0, ["g", BD], arr, ["P", SM, sub]).align([0.4, 0.65]);
    g.symb(0, ["g", BD], arr, ["M", SM, sub]).align([0.77, 0.6]);
    g.symb(0, ["a", BD], arr).align([0.52, 0.4]).css("blue");
},

Ex1_init: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(50, 60), vec2d(40, 340)], {lrbt: [-10, 70, -10, 50], scale: 5,
        margin: 8, grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]}).css(".NoStyle");
    svg.gtext("m", "text", [3, 50]);

    let [BD, SM] = [1, 4];
    let arr = ["→", 5, [0, "22"]];
    let sub = ["15", "-10"];
    let delta = ["Δ", 0, ["-20", 0]];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["d", BD], arr, delta).align([35, 10]).css("blue");
    g.symb(0, ["d", BD], arr, delta, ["1", SM, sub]).align([6, 27]);
    g.symb(0, ["d", BD], arr, delta, ["2", SM, sub]).align([42, 30]);
    return svg;
},

Ex1: (sel) => {
    let svg = SVG2.cache_run("p20/vec2d/img/arith.js", "Ex1_init", sel);
    svg.vec_cycle(svg.$.find("g.TipToTail2D"), 1);
    return svg;
},

trig: (sel) => {
    let svg = SVG2.cache_run("p20/vec2d/img/arith.js", "Ex1_init", sel);
    svg.$.find(".Component, .Symbol").remove();
    let [x, y] = vec2d(50, 60);
    svg.line([x-15, y], [x+15, y]).css({stroke: "black"});
    let g = svg.group("text");
    g.gtext("60°", {}, [17, 40]);
    g.gtext("20°", {}, [40, 41]);
    g.gtext("100°", {}, [28, 36]);
    g = g.group("red");
    g.gtext("50 m", {}, [8, 27]);
    g.gtext("40 m", {}, [51, 38]);
},

Ex2: (sel) => {
    let Fg = 98.1, Fn = Fg * cos(10);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(Fn, 80), vec2d(8, 170)], {lrbt: [-30, 30, -105, 10],
        scale: 4, cycle: 1, margin: [12, 12, 6, 16], grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]}).css(".NoStyle");
    svg.gtext("N", "text", [25, -100]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "22"]];
    let sub = ["10", "-10"];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["net", SM_IT, ["16", "-10"]]).css("blue").align([5, 9]);
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([-15, -45]);
    g.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([20, -50]);
    g.symb(0, ["F", BD], arr, ["f", SM_IT, sub]).align([20, 5]);
},

Ex3: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(7.25, 75), vec2d(6.5, -60)], {lrbt: [-1, 6, -1, 8],
        scale: 50, cycle: 1, margin: [12, 12, 6, 16], grid: 1, tick: "-8", label: [1, 0, "-12", "-20"]}).css(".NoStyle");
    svg.gtext("m/s", "text", [0.1, 8], 0, 0.5);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "15"]];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["v", BD], arr, ["Δ", 0, ["-18", 0]]).css("blue").align([2.7, 1.4]);
    g.symb(0, ["v", BD], arr, ["f", SM_IT, ["10", "-10"]]).align([0.5, 4.2]);
    arr[2][0] = "8";
    g.symb(0, ["–v", BD], arr, ["i", SM_IT, ["16", "-10"]]).align([4, 4.5]);
},

tri: (sel) => {
    let svg = new SVG2(sel, {size: [400, 348], lrbt: [-14, 14, -1.5]}).css(".NoStyle");

    // Calculate point locations
    let h = 25 * cos(30), hA = 12.5 * tan(30);
    let rb = root(sq(12.5) + sq(h - 10));
    let rb_a = 90 + acos(12.5 / rb);
    let pA = new RArray(0, hA);
    let pB = new RArray(0, h - 10);

    // Segments and circles
    let g = svg.group().css("nofill", "black1");
    g.poly([[0, h], [-12.5, 0], [12.5, 0], [0, h], [0, 0]]);
    g.line([0, hA], [-12.5, 0]);
    g.line([0, h - 10], [12.5, 0]);
    g.circle(1, [-12.5, 0]).css({fill: "red"});
    g.circle(1, [12.5, 0]).css({fill: "green"});
    g.circle(1, [0, h]).css({fill: "#0065fe"});
    g.circle("3", pA).css({fill: "black"});
    g.circle("3", [0, h - 10]).css({fill: "black"});

    // Labels
    g = svg.group().css("text");
    g.ctext(["A", [1, hA]], ["B", [-1, h - 10]], ["θ", [10.5, 0.8], "ital"],
        ["12.5 km", [6.25, 1]], ["12.5 km", [-5, 1]]);
    let wrap = (cfg, txt, xy) => g.group().config(cfg).ctext([txt, xy]);
    wrap({theta: 90}, "10.0 km", [h - 6, 1]);
    wrap({theta: 60, pivot: [-12.5, 0]}, "25.0 km", [0, 1]);
    wrap({theta: -60, pivot: [12.5, 0]}, "25.0 km", [0, 1]);
    wrap({theta: 15, pivot: [-12.5, 0]}, "30°", [-9, 0]);
    wrap({theta: 45, pivot: [-12.5, 0]}, "30°", [-9, 0]);
    wrap({theta: -75, pivot: [0, h]}, "30°", [3.5, h]);
    g = g.group("symbol", "f28");
    g.symb(0, ["r", 2], ["A", 6, ["10", "-10"]]).align([-6, 6]);
    g.symb(0, ["r", 2], ["B", 6, ["10", "-10"]]).align([4.5, 6]);
    g.symb(0, ["y", 2]).align([1, hA / 2]);

    // Forces at point A
    g = svg.group().css("black1", {"fill-opacity": 0.6}).addClass("Toggle0");
    g.$.hide();
    let arr = (p, l, a, c) => g.arrow({tail: p, tip: p.plus([0, l])}, {tail: "6"}, "tail").config({theta: a}).css({fill: c});
    arr(pA, 4, 0, "#0065fe");
    arr(pA, 4, 120, "red");
    arr(pA, 4, -120, "green");

    // Forces at point B
    g = svg.group().css("black1", {"fill-opacity": 0.6}).addClass("Toggle1");
    g.$.hide();
    let l = 4 * sq(2 * hA / rb);
    arr(pB, 4 * sq(hA / 5), 0, "#0065fe");
    arr(pB, l, rb_a, "red");
    arr(pB, l, -rb_a, "green");

    // Click sequence
    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, false, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0); t(svg, true, 1)},
    );
},

});