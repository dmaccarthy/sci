SVG2.cache("p30/mom/img/impulse.js", {

bat: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.3, 0, 110], grid: [0.02, 10], margin: [60, 20, 48, 4]});
    let tick = {size: ["-6", 0], css: ["sans", 15], label: 0, shift: "-8"};
    svg.ticks({x: [0, 0.31, 0.06], ...tick, label: 2});
    svg.ticks({y: [0, 101, 20], ...tick});
    let txt = svg.group("sans", 18);
    txt.text("Time / s", [0.15, "-44"]);
    txt.text("Force / N", ["-40", 55], 90);
    css(svg.poly([[0, 0], [0.08, 100], [0.18, 100], [0.3, 0]]), ".Locus", "none", "#0065fe@2");
},

});