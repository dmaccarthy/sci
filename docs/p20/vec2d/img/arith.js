SVG2.cache("p20/vec2d/img/arith.js", {

Ex1_init: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(50, 60), vec2d(40, 340)], {lrbt: [-10, 70, -10, 50], scale: 5,
        margin: 8, grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]});
    svg.text("m", [5, 45]);

    let [BD, SM] = [1, 4];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["15", "-10"];
    let delta = ["Δ", 0, ["-20", 0]];
    g = svg.group();
    g.symbol(["d", BD], arr, delta).config({shift: [35, 8]}).$.addClass("Resultant");
    g.symbol(["d", BD], arr, delta, ["1", SM, sub]).config({shift: [8, 27]});
    g.symbol(["d", BD], arr, delta, ["2", SM, sub]).config({shift: [40, 30]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find("g.Resultant text").css({fill: "#0065fe"});
    return svg;
},

Ex1: (sel) => {
    let svg = SVG2.cache_run("p20/vec2d/img/arith.js", "Ex1_init", sel);
    svg.$.find(".Component").remove();
},

Ex1p: (sel) => {
    let svg = SVG2.cache_run("p20/vec2d/img/arith.js", "Ex1_init", sel);
    svg.vec_cycle(svg.$.find("g.TipToTail2D"), 1);
},

trig: (sel) => {
    let svg = SVG2.cache_run("p20/vec2d/img/arith.js", "Ex1_init", sel);
    svg.$.find(".Component, .Symbol").remove();
    let [x, y] = vec2d(50, 60);
    svg.line([x-15, y], [x+15, y]);
    svg.text("60°", [17, 40]);
    svg.text("20°", [40, 41]);
    svg.text("100°", [28, 36]);
    let g = svg.group();
    g.text("50 m", [8, 27]);
    g.text("40 m", [51, 38]);
    g.$.find("text").css({fill: "red"});
},

Ex2: (sel) => {
    let Fg = 98.1, Fn = Fg * cos(10);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(Fn, 80), vec2d(8, 170)], {lrbt: [-30, 30, -105, 10],
        scale: 4, cycle: 1, margin: 8, grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]});
    svg.text("N", [25, -100]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "20"]];
    let sub = ["10", "-10"];
    g = svg.group();
    g.symbol(["F", BD], arr, ["net", SM_IT, ["16", "-10"]]).config({shift: [5, 8]}).$.addClass("Resultant");
    g.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [-15, -45]});
    g.symbol(["F", BD], arr, ["n", SM_IT, sub]).config({shift: [20, -50]});
    g.symbol(["F", BD], arr, ["f", SM_IT, sub]).config({shift: [20, 5]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find("g.Resultant text").css({fill: "#0065fe"});
}

});