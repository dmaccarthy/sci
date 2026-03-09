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
    svg.mjax("\\vec{\\bf v}", null, [-7.5, -2], "red");
    svg.mjax("\\vec{\\bf F}_m", null, [-8, 2.5], "#0065fe");
    svg.mjax("\\vec{\\bf B}", null, [6, 4], "forestgreen");
    svg.vec_in_out("12", 0, "forestgreen@2").shift_by([4.5, 4]);
},


});
