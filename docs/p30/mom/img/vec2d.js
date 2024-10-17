SVG2.cache("p30/mom/img/vec2d.js", {

F: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(8, 30)], {lrbt: [-1, 8, -2, 5], scale: 40,
        margin: 8, grid: 0.5, label: [1, 0, "-6", "-12"]});
    svg.text("N", [0.4, 5]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["14", "-8"];
    g = svg.group();
    g.symbol(["F", BD], arr).config({shift: [3.5, 2.7]}).$.addClass("Resultant");
    g.symbol(["F", BD], arr, ["x", SM_IT, sub]).config({shift: [3.5, -1]});
    g.symbol(["F", BD], arr, ["y", SM_IT, sub]).config({shift: [7.5, 2]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});

    svg.$.on("click", () => {
        svg.$.find("g.TipToTail2D > g.Component").fadeToggle();
        g.$.find("g.Symbol:not(.Resultant)").fadeToggle();
    });
},

boat: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120), vec2d(5, 200)], {lrbt: [-16, 4, -2, 20], scale: 20, margin: 8, grid: 2, cycle: 1, label: [2, 0, "-6", "-12"]});
    svg.text("m/s", [1.5, 18]);

    let [BD, SM] = [1, 4];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["14", "-8"];
    g = svg.group();
    g.symbol(["v", BD], arr, ["1", SM, sub]).config({shift: [-4, 10]});
    g.symbol(["v", BD], arr, ["2", SM, sub]).config({shift: [-13, 18]});
    let v = g.symbol(["v", BD], arr).config({shift: [-9, 7]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    v.$.find("text").css({fill: "#0065fe"});
},

});
