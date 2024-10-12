SVG2.cache("p20/dyn/img/weight.js", {

scale: (sel) => {
    $(sel).attr({width: 280, height: 400, "data-aspect": "7/10"});
    let svg = new SVG_Animation(sel, -1.7, 1.5, -1.3);
    svg.image("p20/dyn/img/walking.svg", [1.952, 3], [0, 1.5]);
    svg.line([-4, -0.3], [4, -0.3]).attr({stroke: "black", "stroke-width": 3});
    svg.line([-4, -0.3], [4, -0.3]).attr({stroke: "black", "stroke-width": 3});
    svg.rect([1, 0.3], [-0.6, -0.15]).css({fill: "lightgrey", stroke: "black"});
    svg.arrow([-0.1, 1.5], [-0.1, -1], {tail: "6"}).addClass("Vector");
    svg.arrow([-0.6, 0.1], [-0.6, 3.1], {tail: "6"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [0.4, -0.8]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [-1.2, 1.6]).css({fill: "red"});
    svg.final();
},

skydive: (sel) => {
    $(sel).attr({width: 200, height: 400, "data-aspect": "1/2"});
    let svg = new SVG_Animation(sel, -0.85, 1.15, -1.4);
    svg.image("p20/dyn/img/parachute.svg", [1.1, 1.65], [0, 0.96]);
    svg.arrow([0, 0], [0, -1.3], {tail: "6"}).addClass("Vector");
    svg.arrow([0, 1.9], [0, 2.5], {tail: "6"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [0.3, -0.6]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "f"}, [0.3, 2.1]).css({fill: "red"});
    svg.final();
},
  
});