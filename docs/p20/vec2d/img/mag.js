SVG2.cache("p20/vec2d/img/mag.js", {

dir2d: (sel) => {
    let svg = new SVG2(sel, {scale: 48, lrbt: [-3.5, 4.5, -2.5, 2.5], grid: 0, margin: [0, 0, 12, 12]});
    let g = svg.group("arrow", {fill: "#202020"});
    let attr = {tail: "4", double: 1};
    g.arrow(4, attr);
    g.arrow(4, attr).config({theta: 90});
    g.arrow({tip: vec2d(4, -14)}, {tail: "6"}).css("arrow", ".Toggle5");
    g = svg.group("sans", 20);
    let i = 1;
    for (let [t, x, y, a] of [
        ["0° or ±360°", 2.2, 0, "l"],
        ["+90° or –270°", 0, 2.2, "b"],
        ["±180°", -2.2, 0, "r"],
        ["+270° or –90°", 0, -2.2, "t"],
        ["–14° or +346°", 3.2, -1.5, ""],
    ]) {
        let text = g.group(`.Toggle${i < 5 ? i : 6}`);
        text.gtext(t, [], [x, y, a]);
        i++;
    }
    g.$.find("g.Toggle6").css({fill: "red"});
    g = g.group("#0065fe", "bold", ".Toggle0");
    g.gtext("Q1", [], [1, 1]);
    g.gtext("Q2", [], [-1, 1]);
    g.gtext("Q3", [], [-1, -1]);
    g.gtext("Q4", [], [1, -1]);
    svg.click_toggle(7);
},

hiker: (sel) => {
    let svg = SVG2.vec_diag(sel, [[7, -4]], {lrbt: [-3, 6, -1, 6], scale: 40,
        margin: [8, 8, 8, 12], grid: 0.5, shift: [-2, 5], label: [1, 0, "-6", "-12"]});
    svg.$.find(".Component").remove();

    svg.gtext("km", "sans", [0.5, 6]);
    let g = svg.group();
    g.$.insertBefore(svg.$.find(".TipToTail2D"));
    css(g.line([1, 5], [-2, 5]), "black@2", "#0065fe"); //.css({stroke: "black", "stroke-width": 2});
    g.plot([[5, 1], [-2, 5]], "5").css({"fill-opacity": 0.7});

    svg.mjax("\\theta", {scale: 0.8}, [-0.8, 4.8]);
    svg.mjax("\\vec{\\bf d}_i", null, [-2.7, 5.75], "#0065fe");
    svg.mjax("\\vec{\\bf d}_f", null, [5.5, 1.5], "#0065fe");
    svg.mjax("\\Delta\\vec{\\bf d}", null, [2.5, 3.5], "red");
},

soccer: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120)], {lrbt: [-12, 2, -2, 20],
        scale: 20, margin: 8, grid: 1, label: [2, 0, "-6", "-12"]});
    svg.$.find(".Component").remove();
    css(svg.circle(20), "none", "grey@0.5");
    svg.gtext("m", "sans", [1, 20]);
},
 
});
