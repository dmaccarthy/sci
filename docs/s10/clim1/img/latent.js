SVG2.cache("s10/clim1/img/latent.js", {

water: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 3.25, -50, 125], grid: [0.25, 12.5], margin: [64, 4, 12, 12]});

    // Tick marks and labels
    let g = svg.group("sans", 18);
    let opt = {size: ["-6", 0], label: 1, shift: "-8", css: 15};
    g.ticks({x: [0, 3.1, 0.5], ...opt});
    g.ticks({y: [-50, 126, 25], ...opt, label: 0});
    g.text("Heat Added / MJ", [1.625, -25, "b"]);
    g.text("Temperature / °C", ["-36", 37.5, "b"], 90);
    g.$.find("g.TicksX g.Zero").remove();

    // Data
    svg.group("none", "#0065fe@2").poly([[0, -50], [0.1, 0], [0.434, 0], [0.853, 100], [3.108, 100], [3.159, 125]]);
    g = svg.group("sans", "ital", "#0065fe");
    g.text("a", [0.15, -25]);
    g.text("b", [0.3, 8]);
    g.text("c", [0.52, 50]);
    g.text("d", [1.9, 90]);
    g.text("e", [3, 112]);
},

});