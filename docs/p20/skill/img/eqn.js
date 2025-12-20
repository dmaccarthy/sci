SVG2.cache("p20/skill/img/eqn.js", {

scatter: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, 0, 12], grid: [0.5, 1], margin: [56, 10, 28, 12]});

    // Tick marks and labels
    let g = svg.group("sans", 18);
    let opt = {size: ["-6", 0], label: 0, shift: "-8", css: 15};
    g.ticks({x: [0, 5.1, 1], ...opt});
    g.ticks({y: [0, 13, 2], ...opt});
    g.text("Current / A", [4.9, "8", "br"]);
    g.text("Voltage / V", ["-36", 6], 90);

    // Data
    let x = [...range(0, 5.01, 0.5)];
    let y = [11.3, 11.1, 9.0, 8.8, 8.1, 5.8, 6.1, 4.9, 4.6, 2.5, 1.8];
    css(svg.line([0, 11.4], [5, 2]), "#0065fe@2");
    g = svg.plot({x: x, y: y}, "5").$;

    svg.$.on("click", () => g.fadeToggle());
},

});
