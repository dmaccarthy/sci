SVG2.cache("p20/shm/img/pend.js", {

fbd: (sel) => {
    let a = -25;
    let p = vec2d(-3, 90 + a);
    let svg = new SVG2(sel, {size: [236, 383], lrbt: [-2, 0.5, -4]}).css("none");

    svg.line(p, [0, p[1]]).css({stroke: "red", "stroke-width": "2px"});
    svg.path(p).arc([0, 0], -90).update().css({stroke: "#0065fe", "stroke-width": "2px"});

    let g = svg.group().css("black@2");
    g.line([0, 0], [0, -3]);
    g.circle("12", [0, -3]).css({fill: "white"});
    let css = {fill: "red", stroke: "black", "stroke-width": "1px"}
    g.arrow(0.9, {tail: "7"}).config({theta: -90, shift: p.plus([0, -0.67])}).css(css);

    g = svg.group().config({theta: a}).css("black@2");
    g.line([0, 0], [0, -3]);
    g.circle("12", [0, -3]).css({fill: "white"});
    g.arrow(0.9 * cos(a), {tail: "7"}).config({theta: 90, shift: [0, -2.35]}).css(css);

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    g = svg.group().css("symbol", 28, "red");
    g.symb(["θ", IT]).align([-0.12, -0.55]);
    g.symb(["L", IT]).align([-0.8, -1.2]);
    g.symb(["x", IT], ["H", SM_IT, sub]).align([-0.6, -2.5]);
    g.symb(["x", IT]).align([-0.65, -3.1]).css("#0065fe");
    g.symb(["F", BD], arr, ["t", SM_IT, sub]).align([-1.4, -2.1]);
    g.symb(["F", BD], arr, ["g", SM_IT, sub]).align([-1.7, -3.3]);
},

vec: (sel) => {
    let v = [[0, -3], vec2d(3 * cos(25), 65)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-1, 2, -3.5, 0.5], scale: 95, margin: 1, grid: 0.25});
    svg.$.find("g.Component").remove();

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    let g = svg.group().css("symbol", 28, "red");
    g.symb(["F", BD], arr, ["t", SM_IT, sub]).align([0.9, -1.9]);
    g.symb(["F", BD], arr, ["g", SM_IT, sub]).align([-0.35, -1.5]);
    sub[0] = "16";
    g.symb(["F", BD], arr, ["net", SM_IT, sub]).align([0.65, 0.07]).css("#0065fe");
    g.symb(["θ", IT]).align([0.15, -2.3]);
},

});