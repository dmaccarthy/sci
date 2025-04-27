SVG2.cache("p20/skill/img/sciNot.js", {

au: (sel) => {
    let [x, y, dy] = [-0.79, -0.1, 0.17];
    let svg = new SVG2(sel, {size: [180, 40], lrbt: [-1, 1, -0.3]});
    SVG2.style(svg.delay(svg.group(), {recenter: [0, 0]}).text("149 600 000 000 m"), "text");
    svg.poly([[0.65, y], [0.65, y - dy], [x, y - dy], [x, y]]);
    let g = svg.group().config({theta: -135, shift: [x, y]});
    g.poly([[0.1, 0], [0, 0], [0, 0.1]]);
    svg.css(".NoStyle").finalize();
    svg.$.find("polyline").css({fill: "none", stroke: "red", "stroke-width": "2px"});
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

qe: (sel) => {
    let [x, y, dy] = [1.02, -0.1, 0.17];
    let svg = new SVG2(sel, {size: [324, 40], grid: 0, lrbt: [-324/180, 324/180, -0.3]});
    SVG2.style(svg.delay(svg.group(), {recenter: [0, 0]}).text("0.000 000 000 000 000 000 160 2 C"), "text");
    svg.poly([[-1.48, y], [-1.48, y - dy], [x, y - dy], [x, y]]);
    let g = svg.group().config({theta: -135, shift: [x, y]});
    g.poly([[0.1, 0], [0, 0], [0, 0.1]]);
    svg.css(".NoStyle").finalize();
    svg.$.find("polyline").css({fill: "none", stroke: "red", "stroke-width": "2px"});
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

});