save("p20/energy/img/power", {

Q4: (sel) => {
    let s = $(sel).attr({width: 300, height: 228, "data-aspect": "25/19"});
    let svg = new SVG_Animation(sel, -0.27, 1.45, -0.85);
    svg.circle(0.4, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let g = svg.group().css({fill: "red"});
    let css = {"font-size": "24px"};
    svg.text("Food", [0, 0], g).css(css);
    svg.text("Waste", [0, -0.8], g).css(css);
    svg.arrow([0.25, 0], 0.6, {tail: "6"}, g);
    svg.text("1.92 kJ", [0.45, -0.1], g);
    g = svg.group(g).config({theta: -90});
    svg.arrow([0.1, 0], 0.6, {tail: "6"}, g);
    svg.text("5.08 kJ", [0.35, 0.1], g);
    svg.symbol("E", {q4: "k", scale: 1}, [0.96, 0]).css({fill: "#0065FE"});
    svg.final();
},

});