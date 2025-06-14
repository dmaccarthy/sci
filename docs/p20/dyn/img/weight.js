SVG2.cache("p20/dyn/img/weight.js", {

scale: (sel) => {
    let svg = new SVG2(sel, {scale: 90, lrbt: [-1.7, 1.5, -1.3, 3.3]});
    svg.image("p20/dyn/img/walking.svg", [1.952, 3], [0, 1.5]);
    svg.rect([1, 0.3], [-0.6, -0.15]).css({fill: "lightgrey", stroke: "black"});
    svg.line([-1.71, -0.3], [1.51, -0.3]).css(SVG2.css("black3"));

    let g = svg.group("arrow");
    g.arrow({tail: [-0.1, 1.5], tip: [-0.1, -1]}, {tail: "6"});
    g.arrow({tail: [-0.6, 0.1], tip: [-0.6, 3.1]}, {tail: "6"});

    let [BD, SM_IT, arr, sub] = [1, 6, SVG2.arr(), ["12", "-8"]];
    g = svg.group("symbol", "red", "f28");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([0.3, -0.7]);
    g.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([-1.1, 1.6]);
},

skydive: (sel) => {
    let svg = new SVG2(sel, {scale: 100, lrbt: [-0.85, 1.15, -1.4, 2.6]});
    svg.image("p20/dyn/img/parachute.svg", [1.1, 1.65], [0, 0.96]);
    let g = svg.group("arrow");
    g.arrow({tail: [0, 0], tip: [0, -1.3]}, {tail: "6"});
    g.arrow({tail: [0, 1.9], tip: [0, 2.5]}, {tail: "6"});

    let [BD, SM_IT, arr, sub] = [1, 6, SVG2.arr(), ["12", "-8"]];
    g = svg.group("symbol", "red", "f28");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([0.3, -0.6]);
    g.symb(0, ["F", BD], arr, ["f", SM_IT, sub]).align([0.3, 2.1]);
},

});