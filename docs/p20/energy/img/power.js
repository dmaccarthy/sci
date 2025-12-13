SVG2.cache("p20/energy/img/power.js", {

sprint: (sel) => {
    let svg = new SVG2(sel, {size: [400, 330], lrbt: [-0.5, 2.9, -1.92]}).css(".NoStyle", "text");
    svg.circle(0.8, [2, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});

    svg.mjax("E_k", {scale: 1}, [2, 0], "#0065fe");
    let g = svg.group("red", 24);
    g.gtext("Waste", [], [0, -1.8]);
    g.gtext("Food");

    g = svg.group("red", "black@1");
    let text = {stroke: "none"}
    let a = g.arrow({tail: [0.5, 0], tip: [1.7, 0]}, {tail: "6"});
    a.label("1.92 kJ", ["-20", "-18"]).css(text);
    a = g.arrow({tail: [0, -0.3], tip: [1.2, -0.3]}, {tail: "6"}, "tail").config({theta: -90});
    a.label("5.08 kJ", ["-6", "18"]).css(text);
},

});