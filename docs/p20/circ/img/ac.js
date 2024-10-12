SVG2.cache("p20/circ/img/ac.js", {

merry: (sel) => {
    $(sel).attr({width: 400, height: 180, "data-aspect": "20/9"});
    let svg = new SVG_Animation(sel, -10, 10, -0.5);
    svg.line([-8, 2.7], [0, 2.7]).css({"stroke": "orange"});
    svg.rect([1, 8], [0, 4]);
    svg.rect([18, 0.6], [0, 1]);
    svg.$.find("rect").css({fill: "silver"});
    svg.stickMan(2.7, [-8, 4]).css({"stroke-width": "2px"});
    svg.axis({x: [-10, 10]});
    svg.$.find("line.AxisX").css({"stroke-width": "2px"});
    svg.text("Axis", [1.7, 6]);
    svg.text("Icy Platform", [5, 2]);
    svg.text("Bungee Cord", [-4, 3.3]);
    svg.final();
},

});