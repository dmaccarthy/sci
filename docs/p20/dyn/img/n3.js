SVG2.cache("p20/dyn/img/n3.js", {

bus: (sel) => {
    let svg = new SVG2(sel, {scale: 30, grid: 1, lrbt: [-10, 10, -5, 5]});
    svg.image("media/car_left.svg", [3, 1], [6, 0, "b"]);
    console.log(svg);
},

lamppost: (sel) => {
    let svg = new SVG2(sel, {scale: 32, lrbt: [-5, 4, -5, 6]});
    css(svg.rect([0.2, 5], [0, 2.5]), "black@1", "lightgrey");
    css(svg.line([-5, 0], [4, 0]), "black@3");
    css(svg.circle(0.6, [0, 5]), "black@1", "yellow");
    svg.stickman(3).shift_by([-1, 0]);
    let g = svg.group("arrow", "red");
    let t = {tail: "6"};
    g.arrow({tail: [-1, -0.2], tip: [-1, -4]}, t);
    g.arrow({tail: [-1, 0.2], tip: [-1, 4]}, t);
    g.arrow(-2.5, t).shift_by([-3, 2]);
    g.arrow(2.5, t).shift_by([1.8, 2]).css("#0065fe");
    svg.mjax("\\va{F}_g", null, [-2, -2], "red");
    svg.mjax("\\va{F}_n", null, [-2.2, 4], "red");
    svg.mjax("\\va{F}_a", null, [-2.5, 1], "red");
    svg.mjax("\\va{F}_a", null, [2, 1], "#0065fe");
},

n3: (sel) => {
    let svg = new SVG2(sel, {size: [400, 172], lrbt: [-4, 4, -0.2]});
    svg.line([-4, 0], [4, 0]).css({stroke: "black", "stroke-width": 3});
    svg.image("p20/dyn/img/walking.svg", {scale: 0.1}, [0, 0, 0.12, 1]);
    let g = svg.group("arrow");
    g.arrow(-3.4, {tail: "6"}).config({shift: [-2, 0.2]}).css("#0065fe");
    g.arrow(3.4, {tail: "6"}).config({shift: [2, 0.2]}).css("red");
    svg.mjax("\\va{F}_f", null, [2.5, 0.4, 0.5, 1], "red");
    svg.mjax("\\va{F}_f", null, [-2, 0.4, 0.5, 1], "#0065fe");
},

pool: (sel) => {
    let svg = new SVG2(sel, {size: [450, 350], lrbt: [-3.5, 5.5, 0]});
    let g = svg.group("black@2");
    g.line([-3.5, 4.5], [5.5, 4.5]);
    g.line([-3.5, 0.5], [5.5, 0.5]);

    let circ = svg.group("black@1", {"fill-opacity": 0.4});
    g = circ.group("red");
    g.circle(1, [-2.4, 5.5]);
    g.circle(1, [0, 1.5]);
    g = circ.group("#0065fe");
    g.circle(1, [2, 1.5]);
    g.circle(1, [2, 5.5]);

    g = svg.group("arrow");
    g.arrow({tail: [3.2, 1.5], tip: [5, 1.5]}, {tail: "6"}).css("#0065fe");
    g.arrow({tail: [-1.2, 1.5], tip: [-3, 1.5]}, {tail: "6"}).css("red");
    g.arrow({tail: [-1.3, 5.5], tip: [0.3, 5.5]}, {tail: "6"}).css("limegreen");
    svg.mjax("\\va{v}_i", null, [-0.5, 5.7, 0.5, 1], "limegreen");
    svg.mjax("\\va{F}_a", null, [-2.1, 1.7, 0.5, 1], "red");
    svg.mjax("\\va{F}_a", null, [4.1, 1.7, 0.5, 1], "#0065fe");
},

rocket: (sel) => {
    let svg = new SVG2(sel, {scale: 36, lrbt: [-1.5, 1.5, -3.6, 5.1]});
    svg.group().config({theta: 45}).image("media/rocket.svg", [4, 4]);
    let g = svg.group("arrow");
    g.arrow({tail: [0, 3], tip: [0, 5]}, {tail: "6"});
    g.arrow({tail: [0, -1.5], tip: [0, -3.5]}, {tail: "6"}).css("#0065fe");
    svg.mjax("\\va{F}_a", null, [-0.25, 3.8, 1, 0.5], "red");
    svg.mjax("\\va{F}_a", null, [0.4, -2.3, 0, 0.5], "#0065fe");
},
    
});