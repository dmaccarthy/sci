SVG2.cache("p20/vec2d/img/proj.js", {

Q1: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [0, 14, 0, 14], grid: 1, margin: [40, 10, 28, 10]});

    let opt = {size: ["-6", 0], label: 0, shift: "-8", css: 15};
    svg.ticks({x: [0, 15, 2], ...opt});
    svg.ticks({y: [0, 15, 2], ...opt});
    svg.text("m", [0.2, 14, "l"], 0, 15);
    css(svg.rect([2, 12.5], [0, 0, "br"]).prependTo(svg.$), "tan", "black@1");
    let land = root(25 / 9.81);
    svg.locus(t => [8*t, 12.5 - 9.81/2 * t * t], [0, land]).css("none", "black@2");

    let p2 = new RArray(8 * land, 0);
    let p1 = p2.plus([-4, 9.81 * land / 2]);
    let g = svg.group("arrow", {"fill-opacity": 0.4});
    let ar = (t, p, i) => g.arrow({tail: t, tip: p}, {tail: "8"}).css(`.Toggle${i}`);
    ar([0, 12.5], [4, 12.5], 0);
    ar([13, 11], [13, 7], 1).css("#0065fe");
    ar([0, 12.5], p2, 2).css("lime");
    ar(p1, p2, 3);

    let mj = (tex, posn, color, i) => svg.mjax(tex, null, posn, color).then(g => g.css(`.Toggle${i}`));
    mj("\\vec{\\bf v}_i", [1.8, 13, "b"], "red", 0);
    mj("\\vec{\\bf a}", [12, 9.5], "#0065fe", 1);
    mj("\\Delta\\vec{\\bf d}", [5, 5], "lime", 2);
    mj("\\vec{\\bf v}_f", [11.5, 5], "red", 3);

    svg.click_toggle(4);
},

});
