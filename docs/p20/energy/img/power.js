SVG2.cache("p20/energy/img/power.js", {

sprint: (sel) => {
    let svg = new SVG2(sel, {size: [400, 330], lrbt: [-0.5, 2.9, -1.92]});
    svg.circle(0.8, [2, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.delay(svg.symbol(["E", 2], ["k", 6, ["16", "-6"]]), {recenter: [2, -0.07], css: {fill: "#0065fe", "font-size": "28px"}});
    let css = {fill: "red", "font-size": "24px"};
    svg.group("Text", {recenter: [0, -1.8], css: css}).text("Waste");
    svg.group("Text", {recenter: [0, 0], css: css}).text("Food");
    svg.arrow({tail: [0.5, 0], tip: [1.7, 0]}, {tail: "6"}).label("1.92 kJ", ["-20", "-24"]);
    let a = svg.arrow({tail: [0, -0.3], tip: [1.2, -0.3]}, {tail: "6"}, "tail").config({theta: -90});
    a.label("5.08 kJ", [0, "12"]);
    svg.addClass("NoStyle").css_map().finalize();
    svg.$.find("text.Small").css({"font-size": "18px"});
},

});