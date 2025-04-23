SVG2.cache("p20/circ/img/ac.js", {

merry: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-10, 10, -0.5]});
    svg.line([-8, 2.7], [0, 2.7]).css({"stroke": "orange"});
    svg.rect([1, 8], [0, 4]);
    svg.rect([18, 0.6], [0, 1]);
    svg.$.find("rect").css({fill: "silver"});
    svg.stickman(2.7).config({shift: [-8, 1.3]}).css({"stroke-width": "2px"});
    let g = svg.group();
    svg.delay(g.group(), {recenter: [1.7, 6]}).text("Axis");
    svg.delay(g.group(), {recenter: [5, 2]}).text("Icy Platform");
    svg.delay(g.group(), {recenter: [-4, 3.3]}).text("Bungee Cord");
    g.$.children("g").addClass("Text");
    svg.line([-10, 0], [10, 0]).css({stroke: "black", "stroke-width": "2px"});
    svg.css_map().finalize();
},

});