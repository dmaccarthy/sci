SVG2.cache("p30/elec/img/eq.js", {

eq: (sel) => {
    let svg = new SVG2(sel, {size: [400, 240], margin: [24, 24, 16, 16], lrbt: [-1, 1]}).css(".NoStyle");
    let g = svg.group("symbol", 28);
    let arr = ["→", 5, [0, "20"]];
    g.symb(["a", 1], arr).align([-1, 0.5]);
    g.symb(["F", 1], arr, ["e", 6, ["14", "-8"]]).align([0, 0.5]);
    g.symb(["E", 1], arr).align([1, 0.5]);
    g.symb(["v", 1], arr).align([-1, -0.5]);
    g.symb(["W", 2]).align([0, -0.5]);
    g.symb(["V", 2], ["Δ", 0, ["-16", 0]]).align([1, -0.5]);

    g = svg.group("arrow");
    let data = [[-0.5, 0.5, 0, "red"], [0.5, 0.5, 0, "green"], [-0.5, -0.5, 0, "gold"],
        [0.5, -0.5, 0, "violet"], [-1, 0, 1, "grey"], [0, 0, 1, "tan"], [1, 0, 1, "#0065fe"]];
    for (let [x, y, v, c] of data) {
        let a = g.arrow(0.65, {tail: "7", "double": 1}).config({shift: [x, y]}).css({fill: c});
        if (v) a.config({theta: 90});
    }
},

});