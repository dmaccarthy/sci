SVG2.cache("p20/circ/img/appWt.js", {

roller: (sel) => {
    let cart = (g, size, pos) => {
        g = g.group();
        g.group("blue2", {fill: "lightgrey"}).rect([size, size / 2]);
        let wheels = g.group("black2", {fill: "white"});
        wheels.circle(size / 8, [-0.3 * size, -size / 4]);
        wheels.circle(size / 8, [0.3 * size, -size / 4]);
        return g.align(pos, 0.5, 1);
    }

    let svg = new SVG2(sel, {size: [480, 300], lrbt: [-9, 11, -3]}).css(".NoStyle", ".RollerCoaster");
    let g = svg.group("nofill", "black2");
    g.circle(3, [0, 6]);
    let y = 6 - root(5);
    let p = g.path([-10, 4]).arcTo([-4, 4], 4, 2).quadTo([2, y], [-1, 1.5]);
    p.quadTo([5, 3], [4, 5]).arcTo([13, 6], 4).update();

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    g = svg.group("arrow");
    let sym = svg.group("symbol", "red", "f28");
    for (let [x, y] of [[-7, 5.43], [9, 0.32], [0, 7.75]]) {
        let c = cart(svg, 1.5, [x, y]);
        let x1 = x == 0 ? 0.3 : x;
        g.arrow(3, {tail: "6"}).config({theta: -90, shift: [x1, y - 1.5]});
        sym.sym([x1 + 1.2, y - 1.5], 0, ["F", BD], arr, ["g", SM_IT, sub]);
        if (x == 0) {
            c.config({theta: 180});
            g.arrow(2, {tail: "6"}).config({theta: -90, shift: [-0.3, y - 1]});
            sym.sym([-1.75, y - 0.6], 0, ["F", BD], arr, ["n", SM_IT, sub]);
        }
        else {
            g.arrow(2, {tail: "6"}).config({theta: 90, shift: [x, y + 2.25]});
            sym.sym([x + 1.2, y + 2], 0, ["F", BD], arr, ["n", SM_IT, sub]);
        }
    }
},

loopy: (sel) => {
    let svg = new SVG2(sel, {size: [300, 420], lrbt: [-1, 1, -1.45], grid: 0, margin: 2}).css(".NoStyle");
    svg.group("nofill", "black1").circle(1);
    svg.group("black").circle("3");
    svg.group("text").text("C", [0.08, 0.08]);
    let red = svg.group("arrow");
    let sym = svg.group("symbol", "red", "f28");
    let g = svg.group("nofill", "black2");
    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    for (let y of [-1, 1]) {
        g.stickman(0.3).css({"stroke-opacity": 0.6}).config({shift: [0, y]});
        red.arrow({tail: [0, y - 0.02], tip: [0, y - 0.4]}, {tail: "5"});
        red.arrow({tail: [0, y + 0.02], tip: [0, y + (y < 0 ? 0.6: 0.2)]}, {tail: "5"});
        sym.sym([0.3, y - 0.19], 0, ["F", BD], arr, ["g", SM_IT, sub]);
        sym.sym([0.3, y + (y < 0 ? 0.24 : 0.14)], 0, ["F", BD], arr, ["n", SM_IT, sub]);
    }
},

car: (sel) => {
    let svg = new SVG2(sel, {size: [400, 168], lrbt: [-1, 1, -0.55]}).css(".NoStyle");
    let r = 3;
    svg.group("nofill", "black2").circle(r, [0, -r]);
    svg.image("media/car.svg", new RArray(2.95, 1).times(0.2), [0.05, 0.11]);
    svg.sym([0.15, -0.25], 0, ["F", 1], ["→", 5, [0, "20"]], ["g", 6, ["12", "-8"]]).css("symbol", "red", "f28");
    svg.arrow({tail: [0, 0.02], tip: [0, -0.5]}, {tail: "5"}).css("arrow");
},

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