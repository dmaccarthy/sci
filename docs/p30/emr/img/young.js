SVG2.cache("p30/emr/img/young.js", {

laser: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-3.3, 3.3, -10, 2]});
    let [r, d, y] = [0.2, 0.75, -8.7];
    svg.text1("Whiteboard", [0, 1.1]);
    svg.text1("Laser", [-0.8, y]);
    svg.text1("Diffraction Grating", [1.6, -7]);
    let g = svg.group().css({stroke: "red"});
    for (let i=-3; i<=3; i++) {
        g.line([0, i ? -7 : y], [i, 0]);
        svg.text1(i < 0 ? -i : (i ? i : "C"), [i, 0.4]);        
    }
    svg.line([-4, 0], [4, 0]).css({stroke: "black", "stroke-width": "3px"});
    svg.line([-r, -7], [r, -7]).css({stroke: "black", "stroke-width": "2px"});
    let arc = [r, d / 2];
    let laser = svg.path([r, y-d]).ver(y+d).arc_to([-r, y+d], arc).ver(y-d).arc_to([r, y-d], arc);
    laser.close().update().css({stroke: "black", fill: "silver"});
},

geom: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-2, 3, -0.75, 4.25], margin: 4, grid: 0, scale: 60});
    css(svg.line([-2, 0], [2, 0]), "black@1");
    let pts = [[-1, 0], new RArray(2, 4), [1, 0]];
    css(svg.line(pts[0], [-1, 0.6]), ".Toggle4", "lightgrey@1").hide();

    let r = new Segment(...pts[1], ...pts[2]).length;
    let a = new Segment(...pts[0], ...pts[1]).deg;
    let p3 = pts[1].plus(vec2d(r, a + 180));
    css(svg.line(pts[2], p3), ".Toggle1", "black@1");
    css(svg.poly(pts), ".Toggle0", "none", "#0065fe@2");
    let g = svg.group("black@1", "#0054fe");
    g.circle("5", pts[0]); // S1
    g.circle("5", pts[2]); // S2
    g = g.group("red");
    css(g.circle("5", pts[1]), ".Toggle0");
    css(g.circle("5", p3), ".Toggle1");

    let s = {scale: 0.9};
    let [d, align] = [new RArray(0, -0.2), [0.5, 0]];
    svg.mjax("d", s, [d, align]);
    svg.mjax("\\rm S_1", s, [d.minus([1, 0]), align], "#0065fe");
    svg.mjax("\\rm S_2", s, [d.plus([1, 0]), align], "#0065fe");

    s = {scale: 0.7};
    svg.mjax("n\\lambda", s, [-1, 0.5]).then(g => g.css(".Toggle2"));
    svg.mjax("\\theta", s, [0.4, 0.13]).then(g => g.css(".Toggle3"));
    svg.mjax("\\theta", s, [-0.85, 0.4]).then(g => g.css(".Toggle4").$.hide());

    let t = click_cycle.toggle;
    click_cycle(svg.element, 4,
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
    svg.text1("Barrier", [-4, -0.5]);
    let tail = {tail: "8"};
    let opt = {double: 1, tail: "8"};
    g = svg.group();
    g.$.addClass("Toggle1");
    for (let i=-1;i<2;i++)
        g.arrow({tail: [3*i, -3.5], tip: [3*i, -0.5]}, i ? opt : tail);
    for (let i=1;i<4;i++)
        svg.arrow(3, tail).config({theta: 45*i, shift: vec2d(2, 45*i)}).$.addClass("Toggle2");
    svg.$.find("g.Arrow polygon").css({fill: "lightgrey"});

    let t = click_cycle.toggle;
    click_cycle(svg.element, 2,
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, false, 0, 1, 2)},
    );
},

});