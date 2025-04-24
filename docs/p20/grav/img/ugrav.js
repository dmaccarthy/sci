SVG2.cache("p20/grav/img/ugrav.js", {

tri: (sel) => {
    let svg = new SVG2(sel, {size: [400, 348], lrbt: [-14, 14, -1.5]}).css({stroke: "black", "stroke-width": "1px"});

    let h = 25 * cos(30), hA = 12.5 * tan(30);
    let rb = root(sq(12.5) + sq(h - 10));
    let rb_a = 90 + acos(12.5 / rb);
    let pA = new RArray(0, hA);
    let pB = new RArray(0, h - 10);
    svg.poly([[0, h], [-12.5, 0], [12.5, 0], [0, h], [0, 0]]).css({fill: "none"});
    svg.line([0, hA], [-12.5, 0]);
    svg.line([0, h - 10], [12.5, 0]);

    svg.circle(1, [-12.5, 0]).css({fill: "red"});
    svg.circle(1, [12.5, 0]).css({fill: "green"});
    svg.circle(1, [0, h]).css({fill: "#0065fe"});
    svg.circle("3", pA).css({fill: "black"});
    svg.circle("3", [0, h - 10]).css({fill: "black"});

    let delay = (t, a) => svg.delay(svg.group().addClass("Text"), a).text(t);
    delay("θ", {recenter: [10.5, 0.8]}).addClass("Ital");
    delay("A", {recenter: [1, hA]});
    delay("B", {recenter: [-1, h - 10]});
    delay("12.5 km", {recenter: [6.25, 1]});
    delay("12.5 km", {recenter: [-5, 1]});
    delay("10.0 km", {wrap: [{theta: 90}, [h - 6, 1]]});
    delay("25.0 km", {wrap: [{theta: 60, pivot: [-12.5, 0]}, [0, 1]]});
    delay("25.0 km", {wrap: [{theta: -60, pivot: [12.5, 0]}, [0, 1]]});

    for (let a of [15, 45]) delay("30°", {wrap: [{theta: a, pivot: [-12.5, 0]}, [-9, 0]]});
    delay("30°", {wrap: [{theta: -75, pivot: [0, h]}, [3.5, h]]});

    for (let [s, xy] of [["A", [-6, 6]], ["B", [4.5, 6]]])
        svg.delay(svg.symbol(["r", 2], [s, 6, ["10", "-10"]]).addClass("Large"), {recenter: xy});
    svg.delay(svg.symbol(["y", 2]).addClass("Large"), {recenter: [1, hA / 2]});

    let g = svg.group().css({"fill-opacity": 0.6}).addClass("Toggle0");
    g.$.hide();
    let arrA = (a, c) => svg.delay(g.arrow({tail: pA, tip: pA.plus([0, 4])}, {tail: "6"}, "tail").config({theta: a}), {css: {fill: c}});
    arrA(0, "#0065fe");
    arrA(120, "red");
    arrA(-120, "green");

    g = svg.group().css({"fill-opacity": 0.6}).addClass("Toggle1");
    g.$.hide();
    let l = 4 * sq(2 * hA / rb);
    let arrB = (a, c, l) => svg.delay(g.arrow({tail: pB, tip: pB.plus([0, l])}, {tail: "6"}, "tail").config({theta: a}), {css: {fill: c}});
    arrB(0, "#0065fe", 4 * sq(hA / 5));
    arrB(rb_a, "red", l);
    arrB(-rb_a, "green", l);

    svg.css_map().addClass("NoStyle").finalize();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, false, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0); t(svg, true, 1)},
    );
},

});
