SVG2.cache("s10/phys2/img/we.js", {

tennis: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 40], grid: [1, 5], margin: [60, 16, 50, 12]});
    svg.$.addClass("SVG2");

    /* Label x-axis */
    let g = svg.group();
    g.tick_label(0, [...range(0, 10.1)], 0, "-6", "-16");
    g.text("Position / cm", [5, "-36"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(0, 41, 5)], "-6", "-10");
    g.$.find(".Zero").removeClass("Zero");
    g = g.group().config({theta: 90, shift: ["-44", 20]});
    g.text("Force / N");

    /* Plot data */
    g = svg.group();
    let tog = [
        g.poly([[0, 0], [5, 35], [5, 0]], 1).css({fill: "#0065fe"})[0],
        g.poly([[5, 0], [5, 35], [7, 35], [7, 0]], 1).css({fill: "red"})[0],
        g.poly([[7, 0], [7, 35], [10, 0]], 1).css({fill: "yellow"})[0]
    ];
    $(tog).hide();
    g.poly([[0, 0], [5, 35], [7, 35], [10, 0]]).addClass("Locus");
    g.$.find("polygon").css({"fill-opacity": 0.2, stroke: "none"});
    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(tog, true, 0)},
        () => {t(tog, true, 1)},
        () => {t(tog, true, 2)},
        () => {t(tog, false, 0, 1, 2)},
    );
},

bumper: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.4, 0, 380], grid: [0.02, 20], margin: [60, 16, 50, 4]});
    svg.$.addClass("SVG2");

    /* Label x-axis */
    let g = svg.group();
    g.tick_label(1, [...range(0, 0.41, 0.1)], 2, "-6", "-16");
    g.text("Position / m", [0.2, "-36"]);

    /* Label y-axis */
    g.tick_label(0, 0, [...range(0, 361, 40)], "-6", "-10");
    g.$.find(".Zero").removeClass("Zero");
    g = g.group().config({theta: 90, shift: ["-44", 180]});
    g.text("Force / N");

    /* Plot data */
    svg.poly([[0, 0], [0.3, 360], [0.4, 0]]).addClass("Locus");
}
    
});