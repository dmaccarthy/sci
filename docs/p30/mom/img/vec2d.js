SVG2.cache("p30/mom/img/vec2d.js", {

p2d: (sel) => {
    let F1 = vec2d(20, 15), F2 = vec2d(30, 75);
    let svg = SVG2.vec_diag(sel, [F1, F2], {lrbt: [-3, 30, -3, 38], scale: 14,
        margin: 0, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"], cycle: -1});
    svg.gtext("N·s", "text", [2, 36]);

    let [BD, SM] = [1, 4];
    let arr = ["→", SM + BD, [0, "16"]];
    let sub = ["14", "-10"];
    let g = svg.group("symbol", "red", 32);
    g.symb(0, ["p", BD], arr, ["1", SM, sub]).align([14, 1.75]);
    g.symb(0, ["p", BD], arr, ["2", SM, sub]).align([25, 17]);
    g.symb(0, ["p", BD], arr, ["Σ", 0, ["-24", 0]]).align([11, 19]).css("#0065fe");
},

F: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(8, 30)], {lrbt: [-1, 8, -1.5, 5], scale: 40,
        margin: 8, grid: 0.5, label: [1, 0, "-6", "-12"]});
    svg.gtext("N", ["text", 15], [0.4, 5]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    let g = svg.group("symbol", "red", 24);
    g.symb(0, ["F", BD], arr).align([3.25, 2.75]).css(".Resultant");
    g.symb(0, ["F", BD], arr, ["x", SM_IT, sub]).align([3.5, -1]);
    g.symb(0, ["F", BD], arr, ["y", SM_IT, sub]).align([7.75, 2]);

    svg.$.on("click", () => {
        svg.$.find("g.TipToTail2D > g.Component").fadeToggle();
        g.$.find("g.Symbol:not(.Resultant)").fadeToggle();
    });
},

boat: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120), vec2d(5, 200)], {lrbt: [-16, 4, -2, 20], scale: 20, margin: [12, 8, 8, 8], grid: 2, cycle: 1, label: [2, 0, "-6", "-12"]});
    svg.gtext("m/s", ["text", 15], [1, 20]);

    let [BD, SM] = [1, 4];
    let arr = ["→", SM + BD, [0, "16"]];
    let sub = ["14", "-10"];
    let g = svg.group("symbol", "red", 32);
    g.symb(0, ["v", BD], arr, ["1", SM, sub]).align([-4, 10]);
    g.symb(0, ["v", BD], arr, ["2", SM, sub]).align([-12.5, 18.5]);
    g.symb(0, ["v", BD], arr).align([-10, 8]).css("#0065fe");
},

});
