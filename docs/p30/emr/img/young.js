SVG2.cache("p30/emr/img/young.js", {

laser: (sel) => {
    let svg = $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    svg = new SVG_Animation(svg, -3.3, 3.3, -10, 2);
    let [r, d, y] = [0.2, 0.75, -8.7];
    svg.text("Whiteboard", [0, 1.1]);
    svg.text("Laser", [-0.8, y]);
    svg.text("Diffraction Grating", [1.6, -7]);
    let arc = [r, d / 2];
    let g = svg.group().css({stroke: "red"});
    for (let i=-3; i<=3; i++) {
        svg.line([0, i ? -7 : y], [i, 0], g);
        svg.text(i < 0 ? -i : (i ? i : "C"), [i, 0.4]);        
    }
    svg.line([-4, 0], [4, 0]).css({stroke: "black", "stroke-width": "3px"});
    svg.line([-r, -7], [r, -7]).css({stroke: "black", "stroke-width": "2px"});
    let laser = svg.path([r, y-d]).ver(y+d).arcTo([-r, y+d], arc).ver(y-d).arcTo([r, y-d], arc);
    laser.close().item(svg).css({stroke: "black", fill: "silver"});
    svg.final();
},

geom: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-2, 3, -0.75, 4.25], margin: 4, scale: 60});
    svg.$.addClass("SVG2");
    svg.line([-2, 0], [2, 0]);
    let pts = [[-1, 0], new RArray(2, 4), [1, 0]];
    svg.line(pts[0], [-1, 0.6]).css({stroke: "lightgrey"}).addClass("Toggle4").hide();

    let r = new Segment(...pts[1], ...pts[2]).length;
    let a = new Segment(...pts[0], ...pts[1]).deg;
    let p3 = pts[1].plus(vec2d(r, a + 180));
    svg.line(pts[2], p3).addClass("Toggle1"); // QS2
    svg.poly(pts).addClass("Toggle0"); // PS1 & PS2
    svg.circle("5", pts[0]); // S1
    svg.circle("5", pts[2]); // S2

    let sub = ["15", "-10"];
    svg.symbol(["S", 0], ["1", 4, sub]).config({shift: [-1, -0.5]}).$.addClass("Resultant");
    svg.symbol(["S", 0], ["2", 4, sub]).config({shift: [1, -0.5]}).$.addClass("Resultant");
    svg.$.find("circle, text").css({fill: "#0065fe"});

    let g = svg.group();
    g.circle("5", pts[1]).addClass("Toggle0"); // P
    g.circle("5", p3).addClass("Toggle1"); // Q
    g.symbol(["P", 0]).config({shift: [2.5, 4]}).$.addClass("Toggle0");
    g.symbol(["Q", 0]).config({shift: [-0.8, 1]}).$.addClass("Toggle1");
    g.$.find("text, circle").css({fill: "red"});
    svg.$.find("g.Symbol").addClass("Large");

    g = svg.group();
    g.text("nλ", [-1.05, 0.4]).addClass("Toggle2");
    g.text("d", [0, -0.3]);
    g.$.addClass("Symbol Large").find("text").addClass("Ital");
    g.text("θ", [0.35, 0.1]).addClass("Small Toggle3");
    g.text("θ", [-0.85, 0.375]).addClass("Small Toggle4").hide();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 4,
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
        () => {t(svg, true, 4), t(svg, false, 2)},
        () => {t(svg, false, 0, 1, 2, 3, 4)},
    );

},

single: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-5, 5, -4, 4], margin: 1, scale: 40});
    svg.$.addClass("SVG2");
    svg.line([-5, 0], [-0.1, 0]).css({"stroke-width": "3px"});
    svg.line([0.1, 0], [5, 0]).css({"stroke-width": "3px"});
    for (let i=-4;i<0;i++)
        svg.line([-4, i], [4, i]).css({stroke: (i % 2 ? "red" : "#0065fe")});
    let g = svg.group();
    g.$.addClass("Toggle0");
    for (let i=1;i<5;i++)
        g.path([i, 0]).arc([0, 0], 180, 0).update().css({stroke: (i % 2 ? "red" : "#0065fe")});
    svg.text("Barrier", [-4, -0.5]);
    let tail = {tail: "8"};
    let opt = {double: 1, tail: "8"};
    g = svg.group();
    g.$.addClass("Toggle1");
    for (let i=-1;i<2;i++)
        g.arrow({tail: [3*i, -3.5], tip: [3*i, -0.5]}, i ? opt : tail);
    for (let i=1;i<4;i++)
        svg.arrow(3, tail).config({theta: 45*i, shift: vec2d(2, 45*i)}).$.addClass("Toggle2");
    svg.$.find("g.Arrow polygon").css({fill: "lightgrey"});

    let t = clickCycle.toggle;
    clickCycle(svg.element, 2,
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, false, 0, 1, 2)},
    );
},

});