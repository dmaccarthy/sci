save("test/plot", {

plot: (sel) => {
    let svg = new SVG2(sel, {size: [640, 360], lrbt: [0, 10, 0, 7], margin: [56, 12, 56, 12]});
    svg.$.addClass("SVG2");
    svg.grid([0, 10, 1], [0, 7, 1]);

    /* Label x-axis */
    let g = svg.group();
    g.tick_label(0, [...range(0, 11, 1)], 0, "-6", "-20");
    g.text("Length / cm", [5, "-44"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(0, 8, 1)], "-6", "-16");
    g = g.group().config({theta: 90, shift: ["-40", 3.5]});
    g.text("Period / s");

    /* Plot equation and data points */
    let f = (x) => {return x * x / 16};
    let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = x.map((x) => f(x) * uniform(0.9, 1.1));
    svg.locus(f, [0, 10]);
    svg.plot({x:x, y:y}, ["10", "10"], null, 45).$.addClass("Red");
},
    
});