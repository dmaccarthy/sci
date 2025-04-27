SVG2.cache("p20/grav/img/field.js", {

binstar: (sel) => {
    let svg = new SVG2(sel, {scale: 4.8, lrbt: [-10, 90, -10, 30], grid: 10}).css(".NoStyle", "text");

    let g = svg.group().css({stroke: "black", "stroke-width": 1});
    let ship = [70, 20];
    g.line(ship, [0, 0]);
    g.line(ship, [80, 0]);
    g.line(ship, [70, 0]);

    svg.circle(4, [0, 0]).css({fill: "#0065FE", stroke: "black"});
    svg.circle(2.5, [80, 0]).css({fill: "red", stroke: "black"});
    svg.image("media/rocket.svg", [12, 12], ship);
    svg.ctext(["10", [74, -3]], ["70", [35, -3]], ["20", [66, 10]]);

    g = svg.group().css("ital");
    g.sym([13, 2], 18, ["α"]);
    g.sym([76, 2], 18, ["β"]);
    g.sym([34, 14], 28, ["r"], ["P", 4, ["8", "-8"]]);
    g.sym([79, 10], 28, ["r"], ["S", 4, ["8", "-8"]]);
},

});
