SVG2.cache("p20/vec2d/img/polar.js", { // Polar & Cartesian notes

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[8, -2.5]], {lrbt: [-1, 9, -3.5, 2], scale: 40,
        margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.text("m/s", [0.8, -3]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "14"]];
    let sub = ["12", "-10"];
    g = svg.group();
    g.symbol(["v", BD], arr).config({shift: [4, -2]});
    g.symbol(["v", BD], arr, ["x", SM_IT, sub]).config({shift: [4, 0.7]});
    g.symbol(["v", BD], arr, ["y", SM_IT, sub]).config({shift: [8.5, -1.2]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.text("θ", [1.6, -0.28]);
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(50, 160)], {lrbt: [-54, 6, -10, 24], scale: 7,
        margin: 8, grid: 2, tick: "-8", label: [10, 0, "-12", "-20"]});
    svg.path([2.5, 0]).arc([0, 0], 160).update().insertAfter(svg.$.find("g.Grid"));
    svg.text("N", [0.8, -3]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["12", "-10"];
    g = svg.group();
    g.symbol(["F", BD], arr).config({shift: [-25, 12]});
    g.symbol(["F", BD], arr, ["x", SM_IT, sub]).config({shift: [-25, -5]});
    g.symbol(["F", BD], arr, ["y", SM_IT, sub]).config({shift: [-52, 8]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.text("θ", [3, 4]);
}

});