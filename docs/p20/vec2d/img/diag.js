SVG2.cache("p20/vec2d/img/diag.js", {

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, -4]], {shift: [-3, 2],
        lrbt: [-4, 3, -3, 3], scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("m", [2.5, 2.5]);
    let g = svg.group();
    g.line([-3, 2], [-1, 2]);
    g.text("θ", [-2.2, 1.7]);
    svg.$.on("click", () => g.$.fadeToggle());
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(35, 125)], {lrbt: [-25, 5, -5, 32.5],
        scale: 12, margin: 8, grid: 2.5, tick: "-8", label: [5, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("m", [2.5, 30]);
},

Ex3: (sel) => {
    let F1 = vec2d(25, 62), F2 = vec2d(30, -70);
    let svg = SVG2.vec_diag(sel, [F1, F2], {lrbt: [-3, 24, -9, 24],
        scale: 12, margin: 8, grid: 1.5, tick: "-8", label: [3, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("N", [1.5, 24]);
    let g = svg.$.find("g.Arrow");
    let tog = [...fn_eval((i) => g[i], [0, 1, 2])];
    tog.push(svg.line(F1, F1.plus([5, 0]))[0]);

    let t = clickCycle.toggle;
    clickCycle(svg.element, 3,
        () => {t(tog, true, 0)},
        () => {t(tog, true, 3)},
        () => {t(tog, true, 1)},
        () => {t(tog, true, 2)},
        () => {t(tog, false, 0, 1, 2, 3)},
    );
},

Q1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-2, 4]], {shift: [3, -2], lrbt: [0, 4.5, -3.5, 3.5],
        scale: 50, margin: [32, 10, 2, 2], grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find("g.LabelY text.Zero").removeClass("Zero");
    svg.text("m", [4.5, 3]);
    let diag = svg.$.find(".TipToTail2D");
    diag.find(".Component").remove();

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    svg.symbol(["d", BD], arr, ["Δ", 0, ["-20", 0]]).config({shift: [2.8, 0.3]}).$.addClass("Large").find("text").css({fill: "red"});

    let g = svg.group();
    g.line([3, -2], [4, -2]);
    g.circle("5", [3, -2]);
    g.circle("5", [1, 2]);
    g.symbol(["d", BD], arr, ["i", SM_IT, sub]).config({shift: [3.3, -2.7]});
    g.symbol(["d", BD], arr, ["f", SM_IT, sub]).config({shift: [1, 2.5]});
    g.$.insertBefore(diag).find("text, circle").css({fill: "#0065fe"});
    g.$.find("g.Symbol").addClass("Large");
    g.text("θ", [3.2, -1.6]);
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(80, 148)], {lrbt: [-80, 0, -10, 50],
        scale: 5, margin: 8, grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("km/h", [-75, -10]);
    svg.text("32.0°", [-15, 3]);
},

Q3: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(15, -65)], {lrbt: [-2, 10, -15, 2],
        scale: 24, margin: 8, grid: 1, tick: "-8", label: [2, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("kN", [9, 1]);
    svg.text("65.0°", [2.5, -1.75]);
},

Q4: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(25, 45), vec2d(35, 192)], {lrbt: [-18, 20, -6, 24],
        scale: 10, margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("m", [2, 24]);

    let [BD, SM] = [1, 4];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let delta = ["Δ", 0, ["-20", 0]];
    let g = svg.group();
    g.symbol(["d", BD], arr, delta, ["1", SM, sub]).config({shift: [11, 6]});
    g.symbol(["d", BD], arr, delta, ["2", SM, sub]).config({shift: [3, 17]});
    let d = g.symbol(["d", BD], arr, delta).config({shift: [-11, 3]});
    g.$.addClass("Large").find("text").css({fill: "red"});
    d.$.find("text").css({fill: "#0065fe"});
},

Q5: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, -3.5], vec2d(3.4, 76)], {lrbt: [-1, 1.5, -4, 0.5],
        scale: 90, margin: 8, grid: 0.25, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("N", [1.25, -3.75]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let g = svg.group();
    g.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [-0.5, -1.5]});
    g.symbol(["F", BD], arr, ["n", SM_IT, sub]).config({shift: [0.75, -2]});
    let F = g.symbol(["F", BD], arr, ["net", SM_IT, sub]).config({shift: [0.6, 0.25]});
    g.$.addClass("Large").find("text").css({fill: "red"});
    F.$.find("text").css({fill: "#0065fe"});
},

});