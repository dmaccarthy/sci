SVG2.cache("p30/mag/img/em.js", {

hall: (sel) => {
    let svg = new SVG2(sel, {scale: 20, grid: 0, lrbt: [-10, 7, -4, 5]});
    css(svg.line([-10, 0], [10, 0]), "black@4", "none");
    css(svg.rect([8, 4]), "black@1", "silver");
    let g = svg.group("none@", "black");
    for (let x=-3.5; x<4; x++) {
        g.plusminus(0.4).shift_by([x, 1.7]);
        g.plusminus(0.4, 1).shift_by([x, -1.7]);
    }
    g = svg.group("arrow");
    g.arrow({tail: [-9, -1], tip: [-5, -1]}, {tail: "6"});
    g.arrow({tail: [-6, 1], tip: [-6, 4]}, {tail: "6"}).css("#0065fe");
    svg.mjax("\\va{v}", null, [-7.5, -2], "red");
    svg.mjax("\\va{F}_m", null, [-8, 2.5], "#0065fe");
    svg.mjax("\\va{B}", null, [6, 4], "forestgreen");
    svg.vec_in_out("12", 0, "forestgreen@2").shift_by([4.5, 4]);
},

oersted: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, margin: 8, lrbt: [-1, 8.5, -1, 7]});
    svg.vec_in_out(0.5, 1, "black@2").$.find("polygon").addClass("Toggle1");
    let north = svg.group();
    let ccw = svg.group(".Toggle1");
    let a = 70;
    north.mag_compass(0.6).shift_by(vec2d(4.2, a));
    ccw.mag_compass(0.6).config({theta: a}).shift_by(vec2d(4.2, a));
    let g = svg.group("none", "black@1", ".Toggle0");
    g.line(vec2d(0.5, 10), vec2d(6.4, 25));
    g.line(vec2d(4.2, 70).plus(vec2d(0.6, 45)), [3.7, 6.2]);
    g = g.group("sans", 20, "none@", "black");
    g.text("Compass", [4, 6, "bl"]);
    g.text("Wire", [6.2, 2.5, "bl"]);

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 1), t(svg, true, 0)},
        () => {t(svg, true, 1), t(svg, false, 0)},
    );
},

});
