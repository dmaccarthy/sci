SVG2.cache("p20/grav/img/field.js", {
 
binstar: (sel) => {
    $(sel).attr({width: 402, height: 202, "data-aspect": "201/101"});
    let svg = new SVG_Animation(sel, -10, 90, -10, 40, 1);
    svg.grid([-10, 90, 10], [-10, 40, 10]);
    let g = svg.group().css({stroke: "black", "stroke-width": 1});
    let ship = [70, 20];
    svg.line(ship, [0, 0], g);
    svg.line(ship, [80, 0], g);
    svg.line(ship, [70, 0], g);
    svg.circle(4, [0, 0]).css({fill: "#0065FE", stroke: "black"});
    svg.circle(2.5, [80, 0]).css({fill: "red", stroke: "black"});
    svg.image("/media/rocket.svg", [12, 12], ship);
    svg.text("10", [75, -4]);
    svg.text("70", [35, -4]);
    svg.text("20", [66, 8]);
    g = svg.group().css({"font-style": "italic"});
    svg.symbol("r", {q4: "P"}, [34, 15], g);
    svg.symbol("r", {q4: "S"}, [78, 12], g);
    svg.text("α", [14, 2], g).css({"font-family": "KaTeX_Math"});
    svg.text("β", [76, 2], g).css({"font-family": "KaTeX_Math"});
    svg.final();
},

});
