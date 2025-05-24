SVG2.cache("p20/vec2d/img/diag.js", {

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, -4]], {shift: [-3, 2],
        lrbt: [-4, 3, -3, 3], scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.group("text").text("m", [2.5, 2.5]);
    let toggle = svg.group();
    toggle.group("black2").line([-3, 2], [-1, 2]);
    toggle.gtext("θ", ["text", {"font-style": "italic"}], [-2.2, 1.75]);
    svg.$.on("click", () => toggle.$.fadeToggle());
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(35, 125)], {lrbt: [-25, 5, -5, 32.5],
        scale: 12, margin: 8, grid: 2.5, tick: "-8", label: [5, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("m", "text", [2.5, 30]);
},

Ex3: (sel) => {
    let F1 = vec2d(25, 62), F2 = vec2d(30, -70);
    let svg = SVG2.vec_diag(sel, [F1, F2], {lrbt: [-3, 24, -9, 24],
        scale: 12, margin: 8, grid: 1.5, tick: "-8", label: [3, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("N", "text", [1.5, 24]);
    let g = svg.$.find("g.Arrow");
    for (let i=0;i<g.length;i++) $(g[i]).addClass(`Toggle${i}`);
    svg.clickToggle(3);
},

Q1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-2, 4]], {shift: [3, -2], lrbt: [0, 4.5, -3.5, 3.5],
        scale: 50, margin: [32, 10, 2, 2], grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find("g.LabelY text.Zero").removeClass("Zero");
    svg.gtext("m", "text", [4.5, 3]);
    let diag = svg.$.find(".TipToTail2D");
    diag.find(".Component").remove();

    let sym = svg.group("symbol", "f28", "blue");
    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "21"]];
    let sub = ["14", "-8"];
    sym.symb(0, ["d", BD], arr, ["Δ", 0, ["-20", 0]]).align([2.7, 0.5]).css("red");
    sym.symb(0, ["d", BD], arr, ["i", SM_IT, sub]).align([3.2, -2.7]);
    sym.symb(0, ["d", BD], arr, ["f", SM_IT, sub]).align([1, 2.6]);

    let g = svg.group();
    g.line([3, -2], [4, -2]).css({stroke: "black"});
    g.circle("5", [3, -2]);
    g.circle("5", [1, 2]);
    g.$.insertBefore(diag).find("circle").css({fill: "#0065fe"});
    g.gtext("θ", ["text", {"font-style": "italic"}], [3.3, -1.7]);
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(80, 148)], {lrbt: [-80, 0, -10, 50],
        scale: 5, margin: 8, grid: 5, tick: "-8", label: [10, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("km/h", "text", [-75, -10]);
    svg.gtext("32.0°", "text", [-15, 3]);
},

Q3: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(15, -65)], {lrbt: [-2, 10, -15, 2],
        scale: 24, margin: 8, grid: 1, tick: "-8", label: [2, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("kN", "text", [9, 1]);
    svg.gtext("65.0°", "text", [2.5, -1.75]);
},

Q4: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(25, 45), vec2d(35, 192)], {lrbt: [-18, 20, -6, 24],
        scale: 10, margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("m", "text", [2, 24]);

    let [BD, SM] = [1, 4];
    let arr = ["→", SM + BD, [0, "21"]];
    let sub = ["14", "-8"];
    let delta = ["Δ", 0, ["-20", 0]];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["d", BD], arr, delta, ["1", SM, sub]).align([11, 6]);
    g.symb(0, ["d", BD], arr, delta, ["2", SM, sub]).align([2, 18]);
    g.symb(0, ["d", BD], arr, delta).align([-11, 3]).css("blue");
},

Q5: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, -3.5], vec2d(3.4, 76)], {lrbt: [-1, 1.5, -4, 0.5],
        scale: 90, margin: 8, grid: 0.25, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.gtext("N", "text", [1.25, -3.75]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "21"]];
    let sub = ["14", "-8"];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([-0.5, -1.5]);
    g.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([0.75, -2]);
    g.symb(0, ["F", BD], arr, ["net", SM_IT, sub]).align([0.5, 0.3]).css("blue");
},

});
