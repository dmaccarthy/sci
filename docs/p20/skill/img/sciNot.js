SVG2.cache("p20/skill/img/sciNot.js", {

au: (sel) => {
    let [x, y, dy] = [-0.79, -0.1, 0.17];
    let svg = new SVG2(sel, {size: [180, 40], lrbt: [-1, 1, -0.3]});
    svg.gtext("149 600 000 000 m", ["text"]);
    let g = svg.group("none", "red@2");
    g.poly([[0.65, y], [0.65, y - dy], [x, y - dy], [x, y]]);
    g = g.group().config({theta: -135, shift: [x, y]});
    g.poly([[0.1, 0], [0, 0], [0, 0.1]]);
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

qe: (sel) => {
    let [x, y, dy] = [1.02, -0.1, 0.17];
    let svg = new SVG2(sel, {size: [324, 40], grid: 0, lrbt: [-324/180, 324/180, -0.3]});
    svg.gtext("0.000 000 000 000 000 000 160 2 C", "text");
    let g = svg.group().css("none", "red@2");
    g.poly([[-1.48, y], [-1.48, y - dy], [x, y - dy], [x, y]]);
    g = g.group().config({theta: -135, shift: [x, y]});
    g.poly([[0.1, 0], [0, 0], [0, 0.1]]);
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

});