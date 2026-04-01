
SVG2.cache("s10/phys1/img/vel.js", {

uam: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 12], grid: 1, margin: [54, 12, 52, 12]});
    svg.ticks_xy([0, 8.1, 1], [0, 13, 2], {default: true});
    let g = svg.group("sans", 18);
    g.text("Time / s", [4, "-44", "b"]);
    g.text("Position / m", ["-32", 6, "b"], 90);
    svg.locus(quad([5, 11], [8, 7]).fn).css("none", "#0065fe@2");
},
    
});