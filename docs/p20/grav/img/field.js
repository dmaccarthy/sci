SVG2.cache("p20/grav/img/field.js", {

binstar: (sel) => {
    let svg = new SVG2(sel, {scale: 4.8, lrbt: [-10, 90, -10, 30], grid: 10});

    let g = svg.group().css({stroke: "black", "stroke-width": 1});
    let ship = [70, 20];
    g.line(ship, [0, 0]);
    g.line(ship, [80, 0]);
    g.line(ship, [70, 0]);

    svg.circle(4, [0, 0]).css({fill: "#0065FE", stroke: "black"});
    svg.circle(2.5, [80, 0]).css({fill: "red", stroke: "black"});
    svg.image("media/rocket.svg", [12, 12], ship);
    svg.text("10", [73, -5]);
    svg.text("70", [33, -5]);
    svg.text("20", [64, 7]);

    g = svg.group().css({"font-style": "italic"});
    g.text("α", [13, "5"]).css({"font-family": SVG2.symbol});
    g.text("β", [75, "5"]).css({"font-family": SVG2.symbol});
    g.symbol(["r"], ["P", 6, ["8", "-8"]]).config({shift: [34, 14]});
    g.symbol(["r"], ["S", 6, ["8", "-8"]]).config({shift: [78, 10]});

    svg.css_map().$.addClass("NoStyle");
    g.$.find("g.Symbol > text:not(.Small)").css({"font-size": "28px"});
},

});
