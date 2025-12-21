SVG2.cache("s10/phys1/img/acc.js", {

vt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 480], lrbt: [0, 2, -21, 0], grid: [0.25, 1], margin: [60, 16, 12, 36]});
    svg.ticks({x: [0.5, 2.1, 0.5], label: 1}, true);
    svg.ticks({y: [-21, 1, 3]}, true);
    let g = svg.group("sans", 18);
    g.text("Time / s", [1.9, "8", "br"]);
    g.text("Velocity / (m/s)", ["-40", -10.5, "b"], 90);
    let a = -9.75;
    css(svg.line([0, 0], [2, 2 * a]), "#0065fe@2");
    svg.plot({x: range(0, 2.1, 0.25), y: t => a * t}, "5");
},
    
});