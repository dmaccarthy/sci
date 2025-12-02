SVG2.cache("p30/elec/img/static.js", {

escope: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, margin: 4, lrbt: [-5, 5, 0, 14.25]}).css(".NoStyle");
    let g = svg.group("nofill", "black@2");
    let neck = svg.group("nostroke", {fill: "brown"});
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
    let svg = new SVG2(sel, {scale: 24, margin: 4, lrbt: [-9, 11, -3, 5.5]}).css(".NoStyle");
    let plus = svg.pm(2.4, 1).css("black@3", "black").config({shift: [-7, 0]});
    plus.rect([4, 4]).css({fill: "none"});
    let red = svg.group("red", ".Toggle0");
    red.gtext("Electron Flow", ["text", 22, "nostroke"], [4.25, 5]);
    let g = svg.group("black@1").config({shift: [1, 0]});
    g.line([2.5, 0], [4.5, 0]);
    let circ = g.group("black@3", "nofill");
    circ.circle(2.5);
    circ.circle(2.5, [7, 0]);
    let chg = g.group("black", ".Toggle1");
    chg.pm(1.5).css("black")
    chg.pm(1.5, 1, [7, 0]).css("black")
    g = red.group("arrow");
    g.arrow({tail: [6, 3.5], tip: [1, 3.5]}, {tail: "8"});
    svg.click_toggle(2);
},

pole: (sel) => {
    let svg = new SVG2(sel, {scale: 24, margin: 4, lrbt: [-9, 11, -3, 3]}).css(".NoStyle");
    let plus = svg.pm(2.4, 1).css("black@3", "black").config({shift: [-7, 0]});
    plus.rect([4, 4]).css({fill: "none"});
    let g = svg.group().config({shift: [5, 0]});
    let circ = g.group("black@3", "nofill");
    circ.circle(2.5);
    let chg = g.group("text", 20, "black", "nostroke");
    let t = 2;
    for (let a=-1; a<2; a++) {
        chg.text("+", vec2d(t, 30 * a));
        chg.text("–", vec2d(t, 30 * a+180));
    }
    chg.align([0, 0]);
    g = g.group("arrow");
    g.arrow({tail: [-3, 0], tip: [-8, 0]}, {tail: "8"});
    g.arrow({tail: [3, 0], tip: [6, 0]}, {tail: "8"});
},

});