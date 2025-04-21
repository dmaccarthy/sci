SVG2.cache("p20/vec2d/img/proj.js", {

Q1: (sel) => {
    let land = root(25 / 9.81);
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [0, 14, 0], margin: [40, 10, 28, 10]});
    svg.graph({grid: [1, 1], css: true,
        x: {tick: [0, 15, 2], shift: [0, "-20"]},
        y: {tick: [0, 15, 2], shift: ["-10", "-5"]},
        data: [{locus: [(t) => [8*t, 12.5 - 9.81/2 * t * t], [0, land]]}]
    });
    svg.delay(svg.group().addClass("Text"), {recenter: [13, 13]}).text("m");
    svg.rect([2, 12.5], [-1, 6.25]).css({fill: "tan", stroke: "black"}).prependTo(svg.$);

    let p2 = new RArray(8 * land, 0);
    let p1 = p2.plus([-4, 9.81 * land / 2]);
    let g = svg.group().css({"fill-opacity": 0.4, fill: "red", stroke: "black"});
    let tail = {tail: "8"};
    g.arrow({tail: [0, 12.5], tip: [4, 12.5]}, tail).addClass("Toggle0");
    g.arrow({tail: [13, 11], tip: [13, 7]}, tail).css({fill: "#0065fe"}).addClass("Toggle1");
    g.arrow({tail: [0, 12.5], tip: p2}, tail).css({fill: "lime"}).addClass("Toggle2");
    g.arrow({tail: p1, tip: p2}, tail).addClass("Toggle3");

    svg.$.find(".LabelY .Zero").remove();
    svg.addClass("NoClass").css_map("text").finalize();
    svg.$.find("g.Series g.Locus").css({stroke: "black"});

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2, 3)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
    );

},

});
