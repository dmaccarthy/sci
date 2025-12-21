SVG2.cache("p20/vec2d/img/diag.js", {

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, -4]], {shift: [-3, 2],
        lrbt: [-4, 3, -3, 3], scale: 50, margin: 8, grid: 0.5, label: [1, 0]});
    let g = svg.group("#0065fe");
    g.$.insertBefore(svg.$.find(".TipToTail2D"));
    g.circle("5", [-3, 2]);
    g.circle("5", [2, -2]);
    svg.$.find(".Component").remove();
    svg.gtext("m", "sans", [2.5, 2.5]);
    let toggle = svg.group();
    toggle.group("black@2").line([-3, 2], [-1, 2]);
    toggle.gtext("θ", ["sans", "ital"], [-2.2, 1.75]);
    svg.$.on("click", () => toggle.$.fadeToggle());
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(35, 125)], {lrbt: [-25, 5, -5, 32.5],
        scale: 12, margin: 8, grid: 2.5, label: [5, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("m", "sans", [2.5, 30]);
},

Ex3: (sel) => {
    let F1 = vec2d(25, 62), F2 = vec2d(30, -70);
    let svg = SVG2.vec_diag(sel, [F1, F2], {lrbt: [-3, 24, -9, 24],
        scale: 12, margin: 8, grid: 1.5, label: [3, 0]});
    css(svg.line(F1, F1.plus([4, 0])), ".Toggle1", "black@1");
    svg.$.find(".Component").remove();
    svg.gtext("N", "sans", [1.5, 24]);
    let g = svg.$.find("g.Arrow");
    for (let i=0;i<g.length;i++) $(g[i]).addClass(`Toggle${i}`);
    svg.click_toggle(3);
},

Q1: (sel, comp) => {
    let svg = SVG2.vec_diag(sel, [[-2, 4]], {shift: [3, -2], lrbt: [0, 4.5, -3.5, 3.5],
        scale: 50, margin: [32, 10, 2, 2], grid: 0.5, label: [1, 0]});
    svg.$.find("g.LabelY text.Zero").removeClass("Zero");
    svg.gtext("m", "sans", [0.1, -3, "l"]);
    let diag = svg.$.find(".TipToTail2D");
    let yellow = diag.find(".Component");
    if (!comp) yellow.remove();

    svg.mjax("\\vec{\\bf d}_i", null, [3.2, -2.7], "#0065fe");
    svg.mjax("\\vec{\\bf d}_f", null, [1, 2.6], "#0065fe");
    svg.mjax("\\Delta\\vec{\\bf d}", null, [2.7, 0.5], "red");
    svg.mjax("\\theta", {scale: 0.9}, [3.3, -1.7]);

    let g = svg.group();
    g.line([3, -2], [4, -2]).css({stroke: "black"});
    g.circle("5", [3, -2]);
    g.circle("5", [1, 2]);
    g.$.insertBefore(diag).find("circle").css({fill: "#0065fe"});
    if (comp) svg.$.on("click", () => yellow.fadeToggle());
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(80, 148)], {lrbt: [-80, 0, -10, 50],
        scale: 5, margin: 8, grid: 5, label: [10, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("km/h", "sans", [-75, -10]);
    svg.gtext("32.0°", "sans", [-15, 3]);
},

Q3: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(15, -65)], {lrbt: [-2, 10, -15, 2],
        scale: 24, margin: 8, grid: 1, label: [2, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("kN", "sans", [9, 1]);
    svg.gtext("65.0°", "sans", [2.5, -1.75]);
},

Q4: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(25, 45), vec2d(35, 192)], {lrbt: [-18, 20, -6, 24],
        scale: 10, margin: 8, grid: 2, label: [4, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("m", "sans", [2, 24]);
    svg.mjax("\\Delta\\vec{\\bf d}_1", null, [11, 6], "red");
    svg.mjax("\\Delta\\vec{\\bf d}_2", null, [2, 18], "red");
    svg.mjax("\\Delta\\vec{\\bf d}", null, [-11, 3], "#0065fe");
},

Q5: (sel, mu) => {
    let Fg = 0.347 * 9.81;
    let Fn = Fg * cos(14);
    let vecs = [[0, -Fg], vec2d(Fn, 76)];
    if (mu) vecs.push(vec2d(mu * Fn, 166));
    let svg = SVG2.vec_diag(sel, vecs, {lrbt: [-1, 1.5, -4, 0.5],
        scale: 90, margin: 8, grid: 0.25, label: [1, 0]});
    svg.$.find(".Component").remove();
    svg.gtext("N", "sans", [1.25, -3.75]);
    svg.mjax("\\vec{\\bf F}_g", null, [-0.5, -1.5], "red");
    svg.mjax("\\vec{\\bf F}_n", null, [0.75, -2], "red");
    if (mu) svg.mjax("\\vec{\\bf F}_f", null, [0.8, 0.3], "red");
    svg.mjax("\\vec{\\bf F}_{net}", null, [0.2, 0.4], "#0065fe");
    css(svg.line([-1, tan(14)], [1.5, -1.5*tan(14)]), "lightgrey@1").insertBefore(svg.$.find(".TipToTail2D")[0]);
},

});
