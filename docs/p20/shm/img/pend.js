SVG2.cache("p20/shm/img/pend.js", {

fbd: (sel) => {
    let a = -25;
    let p = vec2d(-3, 90 + a);

    let svg = new SVG2(sel, {size: [236, 383], lrbt: [-2, 0.5, -4]});
    let css = {stroke: "red", "stroke-width": "2px", fill: "white"};
    svg.line(p, [0, p[1]]).css(css);
    css.stroke = "#0065fe";
    svg.path(p).arc([0, 0], -90).update().css(css);
    css.stroke = "black";
    svg.line([0, 0], [0, -3]).css(css);
    svg.circle("12", [0, -3]).css(css);
    svg.arrow(0.9, {tail: "7"}).config({theta: -90, shift: p.plus([0, -0.67])});

    let g = svg.group().config({theta: a});
    g.line([0, 0], [0, -3]).css(css);
    g.circle("12", [0, -3]).css(css);
    g.arrow(0.9 * cos(a), {tail: "7"}).config({theta: 90, shift: [0, -2.35]});

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    svg.symbol(["x", IT], ["H", SM_IT, sub]).config({shift: [-0.6, -2.5]});
    svg.symbol(["F", BD], arr, ["t", SM_IT, sub]).config({shift: [-1.4, -2.1]});
    svg.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [-1.7, -3.3]});
    svg.symbol(["L", IT]).config({shift: [-0.8, -1.2]});
    svg.symbol(["θ", IT]).config({shift: [-0.115, -0.55]});
    let x = svg.symbol(["x", IT]).config({shift: [-0.65, -3.1]});

    let sym = svg.$.find("g.Symbol").addClass("Large");
    svg.css_map();
    sym.css({fill: "red"});
    x.$.css({fill: "#0065fe"});
},

vec: (sel) => {
    let v = [[0, -3], vec2d(3 * cos(25), 65)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-1, 2, -3.5, 0.5], scale: 95, margin: 1, grid: 0.25});
    svg.$.find("g.Component").remove();

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    svg.symbol(["F", BD], arr, ["t", SM_IT, sub]).config({shift: [0.9, -1.9]});
    svg.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [-0.35, -1.5]});
    sub[0] = "16";
    let Fnet = svg.symbol(["F", BD], arr, ["net", SM_IT, sub]).config({shift: [0.55, "-6"]});
    svg.symbol(["θ", IT]).config({shift: [0.15, -2.4]});
    let sym = svg.$.find("g.Symbol").addClass("Large");
    svg.css_map();
    sym.css({fill: "red"});
    Fnet.css({fill: "#0065fe"});
},

});