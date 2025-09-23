SVG2.cache("p20/vec2d/img/polar.js", {

rev: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-6, 4]], {lrbt: [-7, 2, -1, 6], scale: 40,
        margin: [32, 10, 2, 2], grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    let p = svg.path([0.5, 0]).arcTo(vec2d(0.5, 146.3), 0.5);
    p = p.update().addClass("Toggle0");
    p.css({fill: "none", stroke: "black"}).insertAfter(svg.$.find("g.Grid"));
    svg.gtext("m", "text", [1.5, 5.5]);
    svg.group("text", "f18", ".Toggle0").symb(0, ["θ", 2]).align([0.5, 0.6]);
    svg.$.find("g.TipToTail2D g.Arrow:not(.Component)").addClass("Toggle0");
    svg.$.on("click", () => svg.$.find(".Toggle0").fadeToggle());
},

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[8, -2.5]], {lrbt: [-1, 9, -3.5, 2], scale: 40,
        margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.gtext("m/s", "text", [0.8, -3]);

    let [BD, IT, SM_IT] = [1, 2, 6];
    let arr = ["→", 5, [0, "16"]];
    let sub = ["12", "-8"];
    let g = svg.group("symbol", "f28", "black");
    g.symb(0, ["v", BD], arr).align([4, -2]).css("red");
    g.symb(0, ["v", BD], arr, ["x", SM_IT, sub]).align([4, 0.7]);
    g.symb(0, ["v", BD], arr, ["y", SM_IT, sub]).align([8.6, -1.2]);
    g.symb(0, ["θ", IT]).align([2.4, -0.36]).css("f24");
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(50, 160)], {lrbt: [-54, 6, -10, 24], scale: 7,
        margin: 8, grid: 2, tick: "-8", label: [10, 0, "-12", "-20"]});
    let arc = {fill: "none", stroke: "black"};
    svg.path([2.5, 0]).arc([0, 0], 160).update().css(arc).insertAfter(svg.$.find("g.Grid"));
    svg.gtext("N", "text", [2, 20]);

    let [BD, IT, SM_IT] = [1, 2, 6];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["12", "-8"];
    let g = svg.group("symbol", "f28", "black");
    g.symb(0, ["F", BD], arr).align([-23, 13]).css("red");
    g.symb(0, ["F", BD], arr, ["x", SM_IT, sub]).align([-25, -5]);
    g.symb(0, ["F", BD], arr, ["y", SM_IT, sub]).align([-52, 8]);
    g.symb(0, ["θ", IT]).align([3, 4]).css("f24");
}

});