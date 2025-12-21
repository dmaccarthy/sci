
SVG2.cache("s10/phys1/img/vel.js", {

uam: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 12], grid: 1, margin: [54, 12, 52, 12]});
    svg.ticks({x: [0, 8.1, 1]}, true);
    svg.ticks({y: [0, 13, 2]}, true);
    let g = svg.group("sans", 18);
    g.text("Time / s", [4, "-28", "t"]);
    g.text("Position / m", ["-36", 6, "b"], 90);
    svg.locus(t => (t * (529 - 50 * t)) / 120).css("none", "#0065fe@2");
},
    
});