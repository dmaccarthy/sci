save("p20/skill/img/sciNot", {

au: (sel) => {
    $(sel).attr({width: 180, height: 40, "data-aspect": "4.5"});
    let svg = new SVG_Animation(sel, -1, 1, -0.2);
    let x0 = -0.77, x1 = 0.65;
    svg.text("149 600 000 000 m", [0, 0.03]).addClass("Serif").css({"font-size": "20px", "dominant-baseline": "auto"});
    svg.poly([[x1, 0], [x1, -0.15], [x0, -0.15], [x0, 0]]);
    svg.poly([[x0 + 0.1, 0], [x0, 0], [x0, -0.1]]).anchor(x0, 0).config({theta: -45});
    svg.$.find("polyline").css({fill: "none", stroke: "red", "stroke-width": "2px"});
    svg.final();
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

qe: (sel) => {
    $(sel).attr({width: 324, height: 40, "data-aspect": "8.1"});
    let svg = new SVG_Animation(sel, -1.8, 1.8, -0.2);
    // svg.grid([-2, 2, 0.1], [-1, 1, 0.1]);
    let x0 = 1, x1 = -1.48;
    svg.text("0.000 000 000 000 000 000 160 2 C", [0, 0.03]).addClass("Serif").css({"font-size": "20px", "dominant-baseline": "auto"});
    svg.poly([[x1, 0], [x1, -0.15], [x0, -0.15], [x0, 0]]);
    svg.poly([[x0 + 0.1, 0], [x0, 0], [x0, -0.1]]).anchor(x0, 0).config({theta: -45});
    svg.$.find("polyline").css({fill: "none", stroke: "red", "stroke-width": "2px"});
    svg.final();
    svg.$.on("click", () => svg.$.find("polyline").toggle());
},

});