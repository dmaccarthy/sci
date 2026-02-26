SVG2.cache("p30/elec/img/coulomb.js", {

pm: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, lrbt: [-4, 14, -1.5, 1.5]});
    css(svg.line([-4, 0], [14, 0]), "black@2");
    let g = svg.group("white", "black@2");
    g.circle(1);
    g.circle(1, [10, 0]);
    svg.plusminus(1, 1);
    svg.plusminus(1).shift_by([10, 0]);
},

cork: (sel) => {
    let svg = new SVG2(sel, {scale: 18, grid: 2, margin: 1, lrbt: [-2, 22, -2, 10]});
    let tick = {size: ["-8", 0], css: ["sans", 14], label: 0, anchor: true};
    svg.ticks({x: [2, 21, 2], ...tick});
    svg.ticks({y: [2, 9, 2], ...tick});
    let g = svg.group("#0065fe", "black@1");
    g.circle("8", [18, 0]);
    g.circle("8");
    g.circle("4", [0, 6]);
    svg.text("Cork", [0.5, 6.2, "bl"], 0, ["sans", 16, "#0065fe"]);
},

});