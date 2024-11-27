SVG2.cache("s10/clim1/img/latent.js", {

water: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 3.25, -50, 125], margin: [64, 4, 12, 12]});
    svg.graph({grid: [0.25, 12.5], css: true,
        x: {tick: [0, 3.3, 0.5], dec: 1, tickSize: "-6", title: ["Heat Added / MJ", [1.75, "-44"]], shift: [0, "-20"]},
        y: {tick: [-50, 126, 25], title: ["Temperature / °C", "-44"], shift: ["-10", "-5"]},
        data: [{connect: [[0, -50], [0.1, 0], [0.434, 0], [0.853, 100], [3.108, 100], [3.159, 125]]}]
    });
    let g = svg.group().addClass("Text Ital");
    g.text("a", [0.12, -27]);
    g.text("b", [0.26, 5]);
    g.text("c", [0.5, 50]);
    g.text("d", [1.9, 88]);
    g.text("e", [3, 110]);
    svg.$.addClass("NoStyle").find("g.LabelX .Zero").remove();
    svg.css_map("grid", "text", "plot");
    g.css({fill: "#0065fe"});
},

});