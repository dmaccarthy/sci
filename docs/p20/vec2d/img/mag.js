SVG2.cache("p20/vec2d/img/mag.js", { // Solutions for Magnitude & Direction assignment

hiker: (sel) => {
    let svg = SVG2.vec_diag(sel, [[7, -4]], {lrbt: [-3, 6, -1, 6], scale: 40,
        margin: 8, grid: 0.5, shift: [-2, 5], label: [1, 0, "-6", "-12"]});
    svg.$.find(".Component").remove();

    svg.text("km", [5.5, 5.5]);
    let g = svg.group();
    g.$.insertBefore(svg.$.find(".TipToTail2D"));
    g.line([1, 5], [-2, 5]).css({stroke: "black", "stroke-width": 2});
    g.text("θ", [-0.7, 4.65]);
    g.plot([[5, 1], [-2, 5]], "5").$.css({"fill-opacity": 0.7});

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    g = svg.group();
    g.symbol(["d", BD], arr, ["i", SM_IT, sub]).config({shift: [-2.5, 5.5]});
    g.symbol(["d", BD], arr, ["f", SM_IT, sub]).config({shift: [5.6, 1.1]});
    g.$.find("text").css({fill: "#0065fe"});
    let sym = g.symbol(["d", BD], arr, ["Δ", 0, ["-20", 0]]).config({shift: [2, 3.5]});
    sym.$.find("text").css({fill: "red"});
    g.$.find("g.Symbol").addClass("Large")
},

soccer: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120)], {lrbt: [-12, 2, -2, 20],
        scale: 20, margin: 8, grid: 1, label: [2, 0, "-6", "-12"]});
    svg.$.find(".Component").remove();
    svg.circle(20).css({"stroke-width": "0.5px", stroke: "grey"});
    svg.text("m", [-11, 19]);
},
 
});
