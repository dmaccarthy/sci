SVG2.cache("p20/skill/img/scatter.js", {

wtLoss: (sel) => {
    let x = [...range(3, 28, 3)];
    let y = [80.8, 80.8, 80, 79.8, 80, 79.7, 79.1, 79.3, 78.5];
    let eq = lin_reg_xy(x, y).fn;
    let svg = new SVG2(sel, {size: [640, 400], lrbt: [0, 30, 77, 82], margin: [64, 10, 54, 10]});
    svg.graph({grid: [1, 0.25],
        x: {tick: [3, 31, 3], y: 77, title: ["Time / days", [15, "-48"]], shift: [0, "-24"]},
        y: {tick: [77, 82.1, 1], title: ["Mass / kg", "-44"], shift: ["-10", "-5"]},
        data: [
            {connect: [[0, eq(0)], [30, eq(30)]]},
            {plot: [{x: x, y: y}, "6"]},
        ]
    });
    $(svg.$.find("g.Grid line")[30]).css({stroke: "black", "stroke-width": "1px"});
    svg.$.find("g.Ticks, g.Labels, g.AxisTitle").addClass("Toggle0");
    svg.$.find("g.Series").addClass("Toggle1");
    svg.$.find("g.Series g.Locus").addClass("Toggle2");
    let title = svg.$.closest("p").children("span");

    let t = click_cycle.toggle;
    if (svg.$.attr("data-interact")) click_cycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2); title.css({visibility: "hidden"})},
        () => {title.css({visibility: "visible"})},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );
},

});