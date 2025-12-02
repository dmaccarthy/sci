SVG2.cache("p30/mom/img/impulse.js", {

bat: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.3, 0, 110], grid: [0.01, 5], margin: [60, 20, 48, 4]});
    svg.css(".NoStyle", "text");
    svg.tick_label(2, [...range(0, 0.31, 0.05)], 0, "-6", "-20");
    svg.tick_label(0, 0, [...range(0, 101, 20)], "-6").find("g.LabelY").config({shift: ["-10", "-5"]}).$.find(".Zero").remove();

    let txt = svg.group().addClass("Text");
    txt.text("Time / s", [0.15, "-44"]);
    txt.group().config({theta: 90, shift: ["-40", 55]}).text("Force / N");

    svg.group().css(".Locus", "nofill", "#0065fe@2").poly([[0, 0], [0.08, 100], [0.18, 100], [0.3, 0]]);
},

});