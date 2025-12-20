SVG2.cache("p20/kin/img/uam.js", {

vt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, 0, 24], grid: [0.5, 2], margin: [56, 14, 28, 12]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 5.1, 1], ...tick, label: 1});
    svg.ticks({y: [0, 25, 4], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [4.9, "8", "br"]);
    g.text("Velocity / (m/s)", ["-40", 12, "b"], 90);
    css(svg.poly([[0, 0], [0, 12], [5, 20], [5, 0]], 1), "#0065fe", {"fill-opacity": 0.2});
    css(svg.line([0, 12], [5, 20]), "#0065fe@2");
},

upDown: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 2.25, -12, 12], grid: [0.25, 2], margin: [52, 10, 12, 12]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0.5, 2.3, 0.5], ...tick, label: 1}).css(".Toggle0");
    svg.ticks({y: [-12, 13, 4], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [2, "8", "b"]);
    g.text("Velocity / (m/s)", ["-32", 0, "b"], 90);
    let t = 20 / 9.81;
    css(svg.poly([[0, 0], [0, 10], [t, -10], [t, 0]], 1), "#0065fe", {"fill-opacity": 0.2});
    css(svg.line([0, 10], [t, -10]), "#0065fe@2");
    svg.click_toggle(1, 1);
},

zag: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, -9, 9], grid: [0.5, 1.5], margin: [32, 10, 4, 4]});
    let g = svg.group("sans", 18);
    g.text("Time", [4.8, "8", "br"]);
    g.text("Velocity", ["-14", 0, "b"], 90);
    css(svg.poly([[0, 0], [1, -8], [3, 6], [4.5, -6], [5, -2.5]]), "none", "#0065fe@2");
},

});