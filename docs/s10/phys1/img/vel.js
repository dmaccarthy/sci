SVG2.cache("s10/phys1/img/vel.js", {

uam: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 12], grid: 1, margin: [56, 12, 56, 12]}).css(".NoStyle");

    /* Label x-axis */
    let g = svg.group().css("text", "f16");
    // let t = svg.group("text");
    g.tick_label(0, [...range(0, 8.5, 1)], 0, "-6", "-20");
    g.text("Time / s", [4, "-44"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(0, 13, 2)], "-6", "-16");
    g = g.group().config({theta: 90, shift: ["-40", 6]});
    g.text("Position / m");

    /* Plot parabola through 3 points */
    let f = quadReg([0,0], [5,11], [8,7]).fn;
    svg.locus(f, [0, 8]).css("blue2");
},
    
});