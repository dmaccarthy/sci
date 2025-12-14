SVG2.cache("s10/clim1/img/latent.js", {

water: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 3.25, -50, 125], margin: [64, 4, 12, 12]});
    svg.graph({grid: [0.25, 12.5],
        x: {tick: [0, 3.3, 0.5], dec: 1, tickSize: "-6", title: ["Heat Added / MJ", [1.75, "-44"]], shift: [0, "-17"]},
        y: {tick: [-50, 126, 25], title: ["Temperature / °C", "-44"], shift: ["-20", 0]},
        data: [{connect: [[0, -50], [0.1, 0], [0.434, 0], [0.853, 100], [3.108, 100], [3.159, 125]]}]
    });
    let g = svg.group("sans", "ital", "#0065fe");
    g.gtext("a", [], [0.15, -25]);
    g.gtext("b", [], [0.3, 8]);
    g.gtext("c", [], [0.52, 50]);
    g.gtext("d", [], [1.9, 90]);
    g.gtext("e", [], [3, 112]);
    svg.$.find("g.LabelX .Zero").remove();
},

});