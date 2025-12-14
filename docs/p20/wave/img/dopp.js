SVG2.cache("p20/wave/img/dopp.js", {

Q1: (sel) => {
    let svg = new SVG2(sel, {size: [480, 120], lrbt: [-2.6, 2.4, -0.2]});
    svg.line([-2.6, 0], [2.4, 0]).css({stroke: "black"});
    svg.stickman(0.6).ralign([2, 0, 0.5, 1]);
    svg.rect([0.9, 0.4], [-2, 0.3]).css({fill: "red", stroke: "black"});
    let g = svg.group({fill: "black", stroke: "none"});
    g.circle(0.1, [-2.25, 0.1]);
    g.circle(0.1, [-1.75, 0.1]);

    g = svg.group("arrow", "red");
    let t6 = {tail: "6"};
    g.arrow({tail: [-1.4, 0.25], tip: [-0.4, 0.25]}, t6);
    g.arrow({tail: [1.7, 0.25], tip: [1, 0.25]}, t6);
    g.arrow({tail: [-0.1, 0.8], tip: [0.9, 0.8]}, t6).css("#0065fe");
    svg.mjax("\\vec{\\bf v}_s", null, [-1, 0.6], "red");
    svg.mjax("\\vec{\\bf v}_o", null, [1.45, 0.6], "red");
    svg.mjax("\\vec{\\bf v}", null, [0.4, 0.55], "#0065fe");
},

Q2: (sel) => {
    let svg = new SVG2(sel, {size: [480, 120], lrbt: [-2.2, 2.6, -0.3]});
    css(svg.line([-2.2, 0], [2.6, 0]), "black@2");
    svg.stickman(0.6).ralign([1.35, 0, 0.5, 1]);
    svg.image("p20/wave/img/guitar.svg", [1, 0.42], [-1.5, 0.3]);
    let g = svg.group("arrow");
    let t6 = {tail: "6"};
    g.arrow({tail: [1.6, 0.3], length: 0.8}, t6);
    g.arrow({tail: [-0.6, 0.3], length: 1.2}, t6).css("#0065fe");
    svg.mjax("\\vec{\\bf v}_o", null, [1.9, 0.8, 0.5, 0], "red");
    svg.mjax("\\vec{\\bf v}", null, [0, 0.8, 0.5, 0], "#0065fe");
},

Q3: (sel) => {
    let svg = new SVG2(sel, {size: [480, 144], lrbt: [-2.6, 2.4, -0.25]});
    css(svg.line([-2.6, 0], [2.4, 0]), "black@2");
    svg.stickman(0.8).ralign([2, 0, 0.5, 1]);
    svg.stickman(0.8).ralign([-1.9, 0, 0.5, 1]);
    css(svg.line([-1.75, 0.1], [-1.75, 0.94]), "black@1");
    let g = svg.group("black@1", {fill: "skyblue"});
    g.circle("6", [-1.75, 0.1]);
    g.circle("6", [-1.75, 0.94]);
    g = svg.group("arrow");
    let t6 = {tail: "6"};
    g.arrow({tail: [-1.6, 0.1], length: 0.5}, t6);
    g.arrow({tail: [-1.9, 0.94], length: -0.5}, t6);
    g.arrow({tail: [0, 0.3], length: 1}, t6).css("#0065fe");
    svg.mjax("\\vec{\\bf v}_s", null, [-1.6, 0.8, 0, 0], "red");
    svg.mjax("\\vec{\\bf v}", null, [0.5, 0.8, 0.5, 0], "#0065fe");
},

});
