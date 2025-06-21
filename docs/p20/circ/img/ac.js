SVG2.cache("p20/circ/img/ac.js", {

delta_v: (sel) => {
    let v = [vec2d(4, 120), vec2d(4, -90)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-3, 1, -1, 4], scale: 64, margin: 1, grid: 0.5});
    svg.$.find("g.Component").remove();

    let [BD, IT, SM] = [1, 2, 4];
    let arr = ["→", SM + BD, [0, "14"]];
    let sub = ["12", "-8"];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["θ", IT]).align([-1.75, 2.5]);
    g.symb(0, ["v", BD], arr, ["2", SM, sub]).align([-0.6, 2]);
    g.symb(0, ["–", 0, ["-18", "-2"]], ["v", BD], arr, ["1", SM, sub]).align([-2.6, 1.75]);
    g.group("blue").symb(0, ["v", BD], arr, ["Δ", 0, ["-18", 0]]).align([-0.9, -0.6]);
},

orbit: (sel) => {
    let a = 45;
    let p = vec2d(10, a);
    let svg = new SVG2(sel, {size: [306, 300], lrbt: [-1, 12, -2], grid: 0, margin: 3}).css(".NoStyle");
    svg.group("nofill", "black2").circle(10);
    let g = svg.group().css("nofill", "blue1");
    g.poly([[0, 0], [10, 0], p], 1);
    g = g.group("blue", "black1");
    g.circle("3");
    g.circle("3", p);
    g.circle("3", [10, 0]);

    let [BD, IT, SM] = [1, 2, 4];
    let arr = ["→", SM + BD, [0, "14"]];
    let sub = ["12", "-8"];
    g = svg.group("symbol", "blue", "f24");
    g.symb(0, ["r", IT]).align(p.times(0.5).plus([0, 1]));
    g.symb(0, ["r", IT]).align([5, -0.7]);
    g.symb(0, ["s", IT]).align([8.5, 2]);
    g.symb(0, ["θ", IT]).align([1.5, 0.6]);
    g.symb(0, ["C"]).align([-0.6, 0.6]);
    g.symb(0, ["P"], ["1", SM, sub]).align([11, 0]);
    g.symb(0, ["P"], ["2", SM, sub]).align(p.times(1.1));
    g = g.group("red");
    g.symb(0, ["v", BD], arr, ["1", SM, sub]).align([11.2, 2]);
    g.symb(0, ["v", BD], arr, ["2", SM, sub]).align(vec2d(11.3, a + 10));
    g.symb(0, ["v", BD], arr, ["Δ", 0, ["-16", 0]]).css(".Toggle0").align([7, 4.5]);

    L = root(32 * (1 - cos(a)))
    g = svg.group("arrow");
    g.arrow(L, {tail: "6"}, {anchor: "tail"}).config({theta: 180 + a / 2, shift: vec2d(8.3, a/2)}).css(".Toggle0");
    g.arrow(4, {tail: "6"}, {anchor: "tail"}).config({theta: 90, shift: [10, 2.2]});
    g = g.group().config({theta: a});
    g.arrow(4, {tail: "6"}, {anchor: "tail"}).config({theta: 90, shift: [10, 2.2]});
    svg.$.find(".Toggle0").hide();
},

car: (sel) => {
    let svg = new SVG2(sel, {size: [200, 332], lrbt: [-3, 7, -7]}).css(".NoStyle");
    svg.line([-4, 0], [8, 0]).css({stroke: "black", "stroke-width": "2px"});
    svg.image("p20/circ/img/car_front.svg", [4, 4], [0, 1.3]);

    let g = svg.group("arrow");
    let L = 6;
    g.arrow({tail: [0, -0.5], tip: [0, -0.5 - L]}, {tail: "7"});
    g.arrow({tail: [0, 3], tip: [0, 3 + L]}, {tail: "7"});
    g.arrow({tail: [2.5, 0.5], tip: [2.5 + L / 2, 0.5]}, {tail: "7"});

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([-1.5, -3]);
    g.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([-1.5, 5.5]);
    g.symb(0, ["F", BD], arr, ["f", SM_IT, sub]).align([4, 3]);
},

merry: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-10, 10, -0.5]}).css(".NoStyle");
    svg.line([-8, 2.7], [0, 2.7]).css({"stroke": "orange"});
    svg.rect([1, 8], [0, 4]);
    svg.rect([18, 0.6], [0, 1]);
    svg.$.find("rect").css({fill: "silver"});
    svg.stickman(2.7).align([-8, 1.3], "bottom");
    let g = svg.group("text");
    g.ctext(["Axis", [1.7, 6]], ["Icy Platform", [5, 2]], ["Bungee Cord", [-4, 3.3]]);
    svg.line([-10, 0], [10, 0]).css({stroke: "black", "stroke-width": "2px"});
},

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [360, 360], lrbt: [-1, 1], margin: 12});
    let g = svg.group("black1");
    g.line([0, -1], [0, 1]);
    g.line([-1, 0], [1, 0]);
    svg.circle(1).css({fill: "none", stroke: "black", "stroke-width": "3px"});

    let circ = svg.group("black1", "blue").config({omega: 60});
    let vert = g.line([1, 0], [1, 0]);
    circ.line([0, 0], [1, 0]);
    circ.circle(0.05, [1, 0]);

    let arrows = svg.group({fill: "#0065FE", "fill-opacity": 0.4});
    arrows.arrow({tip: [0, 0], tail: [-0.15, 0]}, {tail: "4"}, "tip");
    arrows.arrow({tip: [0, 0], tail: [0, -0.15]}, {tail: "4"}, "tip");
    arrows = arrows.findAll("g.Arrow");

    svg.beforeupdate = function() {
        let a = circ.theta;
        let [c, s] = [cos(a), sin(a)];
        g.line([c, s], [c, 0], vert);
        arrows[0].config({shift: [0, s]});
        arrows[1].config({shift: [c, 0]});
    };

    svg.$.on("click", () => svg.toggle());
    return svg.animate(circ).play();
},

});