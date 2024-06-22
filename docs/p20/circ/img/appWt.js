save("p20/circ/img/appWt", {

stick: (sel) => {
    $(sel).attr({width: 390, height: 400, "data-aspect": "39/40"});
    let svg = new SVG_Animation(sel, -2, 2, -1.6);
    svg.stickMan(1, [0, 1]);
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).item().css({fill: "none", stroke: "black"});
    svg.arrow([0, 0], [0, -1.5], {tail: "8"}).addClass("Vector");
    svg.arrow([0, 1.2], [0, 1.2 + 1.5 * 504/638], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [0.25, -0.75]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [0.25, 1.6]).css({fill: "red"});
    svg.final();
},

astro: (sel) => {
    $(sel).attr({width: 390, height: 330, "data-aspect": "39/33"});
    let svg = new SVG_Animation(sel, -2, 2, -1.6);
    svg.stickMan(1, [0, 1]);
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).item().css({fill: "none", stroke: "black"});
    svg.arrow([0, 0], [0, -1.5], {tail: "8"}).addClass("Vector");
    svg.arrow([0, 1.2], [0, 1.2 + 1.5 * 200/736], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [0.4, -0.75]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [0.4, 1.3]).css({fill: "red"});
    svg.final();
},

loop: (sel) => {
    $(sel).attr({width: 400, height: 180, "data-aspect": "20/9"});
    let svg = new SVG_Animation(sel, -2, 2, -1.6);
    svg.stickMan(1, [0, 1]).anchor(0, 0).config({theta: 180});
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).item().css({fill: "none", stroke: "black"});
    svg.arrow([0.1, 0], [0.1, -1.5], {tail: "8"}).addClass("Vector");
    svg.arrow([-0.1, 0], [-0.1, -0.8], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "n"}, [0.4, -0.75]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "g"}, [-0.5, -0.4]).css({fill: "red"});
    svg.final();
},

rope: (sel) => {
    $(sel).attr({width: 512, height: 488, "data-aspect": "512/488"});
    let svg = new SVG_Animation(sel, -1, 1, -0.63);
    let g = svg.group().css({stroke: "black", "stroke-width": "3px"});
    svg.line([-0.5, 1], [-0.5, 0.4], g);
    svg.line([0.5, -0.1], [0.5, 0.5], g);
    g = svg.group().css({fill: "#0065FE", stroke: "black"});
    svg.circle(0.05, [-0.5, 1], g);
    svg.circle(0.05, [0.5, -0.1], g);
    svg.arrow([-0.45, 0.9], [-0.45, 0.5], {tail: "8"}).addClass("Vector");
    svg.arrow([-0.55, 0.9], [-0.55, 0.7], {tail: "8"}).addClass("Vector");
    svg.arrow([0.5, -0.2], [0.5, -0.6], {tail: "8"}).addClass("Vector");
    svg.arrow([0.55, 0.05], [0.55, 1.05], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [-0.3, 0.7]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "t"}, [-0.75, 0.85]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "t"}, [0.7, 0.5]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "g"}, [0.3, -0.3]).css({fill: "red"});
    g = svg.group().css({"font-size": "24px"});
    svg.text("Top", [-0.5, 1.2], g);
    svg.text("Bottom", [0.5, 1.2], g);
    svg.final();
},

book: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1.1, 1.1);
    let circ = {fill: "none", stroke: "black", "stroke-width": "3px"};
    svg.circle(0.625, [0, 0]).css(circ);
    let g = svg.group().config({theta: -20});
    svg.rect([0.12, 0.03], [0, -0.23], g).css({fill: "#32CD32", stroke: "black"});
    svg.rect([0.12, 0.03], [0, -0.98], g).css({fill: "#32CD32", stroke: "black"});
    svg.arrow([0, -0.94], [0, -0.4], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "n"}, [0.15, -0.75], g).css({fill: "red"});
    svg.circle(0.02, [0, 0]).css({fill: "black"});
    svg.circle(1, [0, 0]).css(circ);
    svg.circle(0.25, [0, 0]).css(circ);
    svg.final();
},

});