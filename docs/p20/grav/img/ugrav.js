SVG2.cache("p20/grav/img/ugrav.js", {

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
    g = g.group().css("symbol", "f28");
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
    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, false, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0); t(svg, true, 1)},
    );
},

});
