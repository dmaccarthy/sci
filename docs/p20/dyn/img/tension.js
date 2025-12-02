SVG2.cache("p20/dyn/img/tension.js", {

hor: (sel) => {
    let svg = new SVG2(sel, {size: [400, 72], lrbt: [-2, 1.5, 0], margin: [0, 0, 6, 0]}).css(".NoStyle");

    let g = svg.group("black@2", {fill: "white"});
    let h = 0.5;
    g.line([-2, 0], [1.5, 0]);
    g.line([-1.5, h/2], [0.8, h/2]);
    g.rect([1, h], [0, h/2]);
    g.rect([0.7, h], [-1.5, h/2]);

    let a = svg.arrow({tail: [0.9, h/2], length: 0.5}, {tail: "6"}).css("text", 15, "arrow");
    a.label("100 N", ["-18", "12"]).css({stroke: "none"});
    svg.gtext("20.0 kg", "text", [0, h/2]);
    svg.gtext("10.0 kg", "text", [-1.5, h/2]);
},

ver: (sel) => {
    let svg = new SVG2(sel, {size: [400, 312], lrbt: [-1.9, 0.4, -1.5], grid: 0, margin: 0}).css(".NoStyle");
    let g = svg.group("black@2", {fill: "white"});
    let h = 0.5;
    let y = h / 5;
    g.line([-2, 0], [0, 0]);
    g.line([-2*y, 0], [-2*y, -1.5]);
    g.line([-1.5, y], [0, y]);
    g.line([y, 0], [y, -1]);
    g.rect([h, h/2], [-1.5, h/4]);
    g.rect([0.8*h, 1.4 * h], [y, -1]);
    g.circle(y).css({"stroke-width": "1px"});
    svg.gtext("1.00 kg", "text", [-1.5, h/4]);

    g = svg.group();
    g.gtext("1.50 kg", "text");
    g.config({theta: 90}).align([y, -1]);
},

});