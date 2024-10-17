SVG2.cache("s10/phys1/img/acc.js", {

vt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 480], lrbt: [0, 2, -21, 0], grid: [0.25, 1], margin: [60, 16, 12, 36]});
    svg.$.addClass("SVG2");

    /* Label x-axis */
    let g = svg.group();
    g.tick_label(1, [...range(0, 2.1, 0.5)], 0, "-6", "-16");
    g.text("Time / s", [1.75, "20"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(-21, -1, 3)], "-6", "-10");
    g = g.group().config({theta: 90, shift: ["-44", -10.5]});
    g.text("Velocity / (m/s)");

    /* Plot data */
    let a = -9.75;
    let x = [...range(0, 2.1, 0.25)];
    let y = [...fn_eval((x) => a * x, x)];
    svg.line([0, 0], [2, 2 * a]);
    svg.plot({x: x, y: y}, "5");
},
    
});