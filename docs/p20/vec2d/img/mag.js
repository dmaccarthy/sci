SVG2.cache("p20/vec2d/img/mag.js", { // Solutions for Magnitude & Direction assignment

hiker: (sel) => {
    let svg = SVG2.vec_diag(sel, [[7, -4]], {lrbt: [-3, 6, -1, 6], scale: 40,
        margin: 8, grid: 0.5, shift: [-2, 5], label: [1, 0, -0.3, -0.3]});
    svg.$.find(".Component").remove();
    svg.text("km", [5.5, 5.5]);
    let g = svg.group();
    g.$.addClass("Symbol F125").insertBefore(svg.$.find(".TipToTail2D"));
    g.line([1, 5], [-2, 5]).css({stroke: "black", "stroke-width": 2});
    g.text("θ", [-0.6, 4.56]);
    g.plot([[5, 1], [-2, 5]], "5").$.css({"fill-opacity": 0.7});
    g.text('Δ<tspan class="Bold">d</tspan><tspan class="F80" dx="-18" dy="-18">→</tspan>', [2, 3.5]).css({fill: "red"});
    let d = '<tspan class="Bold">d</tspan><tspan class="F80 Ital" dy="8">#</tspan><tspan class="F80" dx="-24" dy="-26">→</tspan>';
    g.text(d.replace("#", "i"), [-2.6, 5.2]).css({fill: "#0065fe"});
    g.text(d.replace("#", "f"), [5.6, 1.1]).css({fill: "#0065fe"});
},

soccer: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120)], {lrbt: [-12, 2, -2, 20],
        scale: 20, margin: 8, grid: 1, label: [2, 0, -0.5, -0.5]});
    svg.$.find(".Component").remove();
    svg.circle(20).css({"stroke-width": "0.5px", stroke: "grey"});
    svg.text("m", [-11, 19]);
},
 
});
