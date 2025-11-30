SVG2.cache("p30/mom/img/coll2d.js", {

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 27], [-24, 0]], {lrbt: [-26, 6, -4, 34], scale: 12,
        margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("kN·s", [-24, 2]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "14"]];
    let sub = ["18", "-10"];
    g = svg.group();
    g.symbol(["p", BD], arr, ["Σ", 0, ["-20", 0]]).config({shift: [-16, 12]}).$.addClass("Resultant");
    g.symbol(["p", BD], arr, ["iA", SM_IT, sub]).config({shift: [3, 14]});
    let tog = g.symbol(["p", BD], arr, ["iB", SM_IT, sub]).config({shift: [-12, 30]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find(".Resultant text").css({fill: "#0065fe"});

    tog = [[tog.element, svg.$.find("g.Arrow")[1]], svg.$.find(".Resultant")];
    click_cycle(svg.element, 1,
        () => {click_cycle.toggle(tog, true, 0)},
        () => {click_cycle.toggle(tog, true, 1)},
        () => {click_cycle.toggle(tog, false, 0, 1)},
    );
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 27], vec2d(24, 210)], {lrbt: [-26, 6, -4, 34], scale: 12,
        margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("kN·s", [-24, 2]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "14"]];
    let sub = ["18", "-10"];
    g = svg.group();
    g.symbol(["p", BD], arr, ["Σ", 0, ["-20", 0]]).config({shift: [-14, 6]}).$.addClass("Resultant");
    g.symbol(["p", BD], arr, ["iA", SM_IT, sub]).config({shift: [3, 14]});
    let tog = g.symbol(["p", BD], arr, ["iB", SM_IT, sub]).config({shift: [-12, 24]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find(".Resultant text").css({fill: "#0065fe"});

    tog = [[tog.element, svg.$.find("g.Arrow")[1]], svg.$.find(".Resultant")];
    click_cycle(svg.element, 1,
        () => {click_cycle.toggle(tog, true, 0)},
        () => {click_cycle.toggle(tog, true, 1)},
        () => {click_cycle.toggle(tog, false, 0, 1)},
    );
},

Ex3: (sel) => {
    let [pa, pb] = vec2d(0.425, 35);
    let svg = SVG2.vec_diag(sel, [vec2d(pa, 35), vec2d(pb, -55)], {lrbt: [-0.05, 0.45, -0.1, 0.25], scale: 800,
        margin: 8, grid: 0.025, tick: "-8", label: [0.1, 1, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("N·s", [0.025, 0.2]);

    let [BD, SM_IT] = [1, 6];
    let arr = ["→", 5, [0, "14"]];
    let sub = ["18", "-10"];
    g = svg.group();
    g.symbol(["p", BD], arr, ["Σ", 0, ["-20", 0]]).config({shift: [0.225, -0.06]}).$.addClass("Resultant");
    pa = g.symbol(["p", BD], arr, ["iA", SM_IT, sub]).config({shift: [0.1, 0.125]});
    pb = g.symbol(["p", BD], arr, ["iB", SM_IT, sub]).config({shift: [0.36, 0.15]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find(".Resultant text").css({fill: "#0065fe"});

    pa = [pa.element, svg.$.find("g.Arrow")[0], g.text("35°", [0.07, 0.018])[0]];
    pb = [pb.element, svg.$.find("g.Arrow")[1], g.text("55°", [0.37, 0.018])[0]];
    tog = [pa, pb, g.text("90°", [0.275, 0.15])[0]];
    click_cycle(svg.element, 2,
        () => {click_cycle.toggle(tog, true, 0)},
        () => {click_cycle.toggle(tog, true, 1)},
        () => {click_cycle.toggle(tog, true, 2)},
        () => {click_cycle.toggle(tog, false, 0, 1, 2)},
    );
}

});