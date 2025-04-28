SVG2.cache("p20/circ/img/ac.js", {

delta_v: (sel) => {
    let v = [vec2d(4, 120), vec2d(4, -90)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-3, 1, -1, 4], scale: 64, margin: 1, grid: 0.5});
    svg.$.find("g.Component").remove();

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "14"]];
    let sub = ["12", "-8"];
    let g = svg.group().css("symbol", "f28", "red");
    g.sym([-1.75, 2.5], 0, ["θ", IT]);
    g.sym([-0.6, 2], 0, ["v", BD], arr, ["2", SM, sub]);
    g.sym([-2.6, 1.75], 0, ["–", 0, ["-18", "-2"]], ["v", BD], arr, ["1", SM, sub]);
    g.group().css("blue").sym([-0.9, -0.6], 0, ["v", BD], arr, ["Δ", 0, ["-18", 0]]);
},

orbit: (sel) => {
    let a = 45;
    let p = vec2d(10, a);
    let svg = new SVG2(sel, {size: [306, 300], lrbt: [-1, 12, -2], grid: 0, margin: 3}).css(".NoStyle");
    svg.group().css("nofill", "black2").circle(10);
    let g = svg.group().css("nofill", "blue1");
    g.poly([[0, 0], [10, 0], p], 1);
    g = g.group().css("blue", "black1");
    g.circle("3");
    g.circle("3", p);
    g.circle("3", [10, 0]);

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "14"]];
    let sub = ["12", "-8"];
    g = svg.group().css("symbol", "blue", "f24");
    g.sym(p.times(0.5).plus([0, 1]), 0, ["r", IT]);
    g.sym([5, -0.7], 0, ["r", IT]);
    g.sym([8.5, 2], 0, ["s", IT]);
    g.sym([1.5, 0.6], 0, ["θ", IT]);
    g.sym([-0.6, 0.6], 0, ["C"]);
    g.sym([11, 0], 0, ["P"], ["1", SM, sub]);
    g.sym(p.times(1.1), 0, ["P"], ["2", SM, sub]);
    g = g.group().css("red");
    g.sym([11.2, 2], 0, ["v", BD], arr, ["1", SM, sub]);
    g.sym(vec2d(11.3, a + 10), 0, ["v", BD], arr, ["2", SM, sub]);
    g.sym([7, 4.5], 0, ["v", BD], arr, ["Δ", 0, ["-16", 0]]).css(".Toggle0");

    L = root(32 * (1 - cos(a)))
    g = svg.group().css("arrow");
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

    let g = svg.group().css("arrow");
    let L = 6;
    g.arrow({tail: [0, -0.5], tip: [0, -0.5 - L]}, {tail: "7"});
    g.arrow({tail: [0, 3], tip: [0, 3 + L]}, {tail: "7"});
    g.arrow({tail: [2.5, 0.5], tip: [2.5 + L / 2, 0.5]}, {tail: "7"});

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    g = svg.group().css("symbol", "f28", "red");
    g.sym([-1.5, -3], 0, ["F", BD], arr, ["g", SM_IT, sub]);
    g.sym([-1.5, 5.5], 0, ["F", BD], arr, ["n", SM_IT, sub]);
    g.sym([4, 3], 0, ["F", BD], arr, ["f", SM_IT, sub]);
},

merry: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-10, 10, -0.5]}).css(".NoStyle");
    svg.line([-8, 2.7], [0, 2.7]).css({"stroke": "orange"});
    svg.rect([1, 8], [0, 4]);
    svg.rect([18, 0.6], [0, 1]);
    svg.$.find("rect").css({fill: "silver"});
    svg.stickman(2.7).config({shift: [-8, 1.3]}).css({fill: "none", stroke: "black", "stroke-width": "2px"});
    let g = svg.group().css("text");
    g.ctext(["Axis", [1.7, 6]], ["Icy Platform", [5, 2]], ["Bungee Cord", [-4, 3.3]]);
    svg.line([-10, 0], [10, 0]).css({stroke: "black", "stroke-width": "2px"});
},

ucm: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1.15, 1.15);
    svg.axis({x: [-1, 1]});
    svg.axis({y: [-1, 1]});
    svg.$.find("line").css({stroke: "grey"});
    let g = svg.group().css({stroke: "black"});
    svg.circle(1, [0, 0]).css({fill: "none", stroke: "black", "stroke-width": "3px"});
    svg.final();
    svg.circle(0.05, [1, 0]).anchor(0, 0).config({omega: 60}).css({fill: "#0065FE"});
    let arrow = {fill: "#0065FE", "fill-opacity": 0.4};
    svg.arrow([0, -0.15], [0, 0], {anchor: "tip", tail: "4"}).css(arrow);
    svg.arrow([-0.15, 0], [0, 0], {anchor: "tip", tail: "4"}).css(arrow);
    svg.line([0, 0], [1, 0], g);
    svg.line([0, 0], [0, 0], g);
    svg.line([0, 0], [1, 0], g);

    svg.beforeupdate = function() {
        let items = this.items;
        let a = items[0].theta + items[0].omega / this.frameRate;
        let [c, s] = [cos(a), sin(a)];
        items[1].config({position: [c, 0]});
        items[2].config({position: [0, s]});
        items[3].setPoints([[0, 0], [c, 0]], 1);
        items[4].setPoints([[c, s], [c, 0]], 1);
        items[5].setPoints([[c, s], [0, 0]], 1);
    };

    svg.play();
    svg.$.on("click", () => svg.toggle());
},

});