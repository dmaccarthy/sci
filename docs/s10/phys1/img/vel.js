SVG2.cache("s10/phys1/img/vel.js", {

uam: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 12], grid: 1, margin: [56, 12, 56, 12]});

    /* Label x-axis */
    let g = svg.group("text", 16);
    g.tick_label(0, [...range(0, 8.5, 1)], 0, "-6", "-20");
    g.text1("Time / s", [4, "-44"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(0, 13, 2)], "-6", "-16");
    g = g.group().config({theta: 90, shift: ["-40", 6]});
    g.text1("Position / m");

    /* Plot a parabola */
    svg.locus(x => (x * (529 - 50 * x)) / 120, [0, 8]).css("#0065fe@2");
},
    
});