SVG2.cache("p30/elec/img/static.js", {

escope: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, margin: 4, lrbt: [-5, 5, 0, 14.25]});
    let g = svg.group("none", "black@2");
    let neck = svg.group("none@", "brown");
    g.rect([10, 10], [0, 5]);
    let leaf = svg.group({fill: "silver"}, "black@1");
    g.line([-2, 8], [2, 8]);
    leaf.rect([0.3, 7], [-1.5, 4.5]);
    leaf.rect([0.3, 7], [1.5, 4.5]);
    leaf.rect([0.5, 5], [0, 10.5]);
    leaf.circle(1.25, [0, 13]);
    neck.rect([0.2, 0.3], [0.35, 10]);
    neck.rect([0.2, 0.3], [-0.35, 10]);
},

induct: (sel) => {
    let svg = new SVG2(sel, {scale: 24, margin: 4, lrbt: [-9, 11, -3, 5.5]});
    let plus = svg.plusminus(2.4, 1).css("black@3", "black").config({shift: [-7, 0]});
    plus.rect([4, 4]).css({fill: "none"});
    let red = svg.group("red", ".Toggle0");
    red.gtext("Electron Flow", ["sans", 22, "none@"], [4.25, 5]);
    let g = svg.group("black@1").config({shift: [1, 0]});
    g.line([2.5, 0], [4.5, 0]);
    let circ = g.group("black@3", "none");
    circ.circle(2.5);
    circ.circle(2.5, [7, 0]);
    let chg = g.group("black", ".Toggle1");
    chg.plusminus(1.5).css("black");
    chg.plusminus(1.5, 1).css("black").config({shift: [7, 0]});
    g = red.group("arrow");
    g.arrow({tail: [6, 3.5], tip: [1, 3.5]}, {tail: "8"});
    svg.click_toggle(2);
},

pole: (sel, reverse) => {
    let svg = new SVG2(sel, {scale: 24, margin: 4, lrbt: [-9, 11, -3, 3]});
    let plus = svg.plusminus(2.4, !reverse).css("black@3", "black").config({shift: [-7, 0]});
    plus.rect([4, 4]).css({fill: "none"});
    let g = svg.group().config({shift: [5, 0]});
    let circ = g.group("black@3", "none");
    circ.circle(2.5);
    let chg = g.group("sans", 20, "black", "none@");
    if (reverse) chg.config({theta: 180});
    let t = 2;
    for (let a=-1; a<2; a++) {
        chg.gtext("+", [], vec2d(t, 30 * a));
        chg.gtext("–", [], vec2d(t, 30 * a+180));
    }
    g = g.group("arrow");
    g.arrow({tail: [-3, 0], tip: [-8, 0]}, {tail: "8"});
    g.arrow({tail: [3, 0], tip: [6, 0]}, {tail: "8"});
},

balloon: (sel) => {
    let svg = new SVG2(sel, {scale: 28, margin: 2, grid: 10, lrbt: [-4, 4, -5, 5]});
    css(svg.circle(1), "lightgrey", "black@1");
    let g = svg.group("arrow");
    let arr = {tail: "6"};
    g.arrow({tail: [0, 1.5], tip: [0, 1.5 + 3.5 / cos(25)]}).config({pivot: [0, 0], theta: -25});
    g.arrow({tail: [0, -1.5], tip: [0, -5]}, arr);
    g.arrow({tail: [-1.5, 0], tip: [-1.5 - 3.5 * tan(25), 0]}, arr);
    svg.mjax("\\vec{\\bf F}_g", null, [0.8, -3, "l"], "red");
    svg.mjax("\\vec{\\bf F}_e", null, [-2, 1, "b"], "red");
    svg.mjax("\\vec{\\bf F}_t", null, [2, 2.5, "l"], "red");
    // css(svg.line([1.5, 0], [3.5, 0]), "black@1");
    svg.text("65°", [1.5, 0.75]);
}

});