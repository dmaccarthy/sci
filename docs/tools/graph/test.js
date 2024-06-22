Object.assign({

vec: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [[-2, 4]],
        {omitAxes: 1, shift: [3, -2], component: 1}, 0.5, -3, -5,
    );
    let e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-3, 7], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-5, 5], ticks: attr}, e);
    let prev = `${sel} g.Grid`;
    svg.line([3, -2], [5, -2]).$.css({stroke: "black", "stroke-width": 2}).insertAfter(prev);
    svg.plot([[3, -2], [1, 2]], "5").$.insertAfter(prev);
    let s = 1.2;
    svg.mpl("\\Delta\\vec{\\bf d}&color=red", [s * 143 / 118, s], [2.7, 0.5]);
    s *= 131 / 118;
    svg.mpl("\\Delta\\vec{\\bf d}_x&color=%23FF6060", [s * 170 / 131, s], [2, -3]).addClass("Hide");
    s *= 139 / 131;
    svg.mpl("\\Delta\\vec{\\bf d}_y&color=%23FF6060", [s * 168 / 139, s], [0, 0]).addClass("Hide");
    s = 1.33;
    svg.mpl("\\vec{\\bf d}_i&color=%230065FE", [s * 103/131, s], [3.3, -2.7]);
    s *= 139 / 131;
    svg.mpl("\\vec{\\bf d}_f&color=%230065FE", [s * 115/139, s], [1, 2.7]);
    svg.text("θ", [3.3, -1.7]).addClass("Annotate");
    svg.text("m", [0.5, 4.5]).addClass("Annotate");
    svg.$.find("polygon.Component").addClass("Hide");
    svg.final();
},

graph: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 10, 1], [0, 50, 5], 1],
        margin: [0.15, 0.03, 0.09, 0.03],
        x: ["Time / s&nbsp;", [">", "12"], {length: "8", interval: 2, fixed: 0, offset: [0, "-20"]}],
        y: ["Position / m", ["-48", ">"], {length: "8", interval: 10, fixed: 0, offset: ["-12", 0]}],   
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let g = svg.group().addClass("Data");
    svg.line([0, 5], [10, 20], g);
    svg.line([0, 10], [10, 50], g).$.css({stroke: "red"});
    svg.line([0, 40], [10, 5], g).$.css({stroke: "green"});
    svg.line([0, 28], [10, 28], g).$.css({stroke: "cyan"});
    svg.locus((t) => t * (2 + t / 2), [0, Math.sqrt(104) - 2], 0, 0, g).$.css({stroke: "gold"});
    let parab = (t) => 10 + t * (8 - t / 2);
    svg.locus(parab, [0, 10], 0, 0, g).$.css({stroke: "violet"});
    svg.plot({x: [...range(0, 10)], y: parab}, {cross: "6", config: {theta:45}, css: {fill: "violet"}});
    svg.final();
},

});
