SVG2.cache("p20/kin/img/acc.js", {

vt: (sel) => {
    let pt = [2.5, -9.81 * 2.5];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -45, 0], grid: [0.5, 5], margin: [62, 12, 12, 28]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [1, 4.1, 1], ...tick});
    svg.ticks({y: [-45, 1, 5], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [3.8, "8", "br"]);
    g.text("Velocity / (m/s)", ["-40", -22.5, "b"], 90);
    g = svg.group("#0065fe", "black@1", ".Toggle0");
    css(g.poly([[0, 0], pt, [pt[0], 0]], 1), "none@", {"fill-opacity": 0.2});
    g.circle("5", pt);
    css(svg.line([0, 0], [4, -9.81 * 4]), "#0065fe@2");
    svg.click_toggle(1, 1);
},

dt: (sel) => {
    let t = 2.5, v = -9.81 * t, d = v * t / 2;
    let pt = new RArray(t, v * t / 2);
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -80, 0], grid: [0.5, 10], margin: [62, 12, 12, 28]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [1, 4.1, 1], ...tick});
    svg.ticks({y: [-80, 1, 10], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [3.8, "8", "br"]);
    g.text("Position / m", ["-40", -40, "b"], 90);
    svg.locus(t => -9.81 / 2 * t * t, [0, 4]).css("none", "#0065fe@2");
    g = svg.group("red", "black@1", ".Toggle0");
    css(g.line([d/v, 0], pt.plus([1.5, 1.5*v])), "red@");
    g.circle("5", pt);
    svg.click_toggle(1, 1);
},

vt_radar: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 140], grid: [0.5, 10], margin: [62, 12, 52, 12]});
    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 8.1, 1], ...tick});
    svg.ticks({y: [0, 141, 20], ...tick});
    let g = svg.group("sans", 18);
    g.text("Time / s", [4, "-28", "t"]);
    g.text("Velocity / (km/h)", ["-40", 70, "b"], 90);
    css(svg.poly([[0, 125], [3, 125], [8, 0]]), "none", "#0065fe@2");
},

});