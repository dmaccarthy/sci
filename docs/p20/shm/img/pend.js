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

// Not done!!!

    let v = [[0, -3], vec2d(3 * cos(25), 65)];
    let svg = SVG2.vec_diag(sel, v, {lrbt: [-1, 2, -3.5, 0.5], scale: 95, margin: 1, grid: 0.25, label: [8, 0, "-4", "-12"]});
    svg.$.find("g.Component").remove();

},

pend0: (sel) => {
    $(sel).attr({width: 480, height: 400, "data-aspect": "6/5"});
    let svg = new SVG_Animation(sel, -1.5, 3.4, -3.9);
    svg.$.css({"font-size": "24px"});
    let p = vec2d(3, 245);
    svg.line([0, p[1]], p).css({stroke: "red", "stroke-width": "2px"});
    let g = svg.group().addClass("Serif").css({stroke: "none", fill: "red"});
    svg.text("L", [-0.8, -1.25], g).css({"font-style": "italic"});
    svg.text("θ", [-0.1, -0.5], g);
    let arc = svg.path([0, -3]).arcTo(p, 3, 2);
    arc.item().css({fill: "none", stroke: "#0065FE", "stroke-width": "3px"});
    g = svg.group().css({stroke: "black", "stroke-width": "2px"});
    svg.line([0, 0], p, g);
    svg.line([0, 0], [0, -3], g);
    svg.circle(0.1, p, g);
    svg.circle(0.1, [0, -3], g);
    g.$.find("circle").css({fill: "white"});
    g = svg.group().addClass("Serif").css({"font-style": "italic", fill: "#0065FE"});
    svg.text("x", [-0.65, -3.1], g);
    svg.symbol("x", {q4: 'H'}, [-0.65, -2.5]).css({fill: "red"});

    let attr= {tail: "6"};
    g = svg.group().css({fill: "red"});
    svg.arrow(p.plus([0, -0.2]), p.plus([0, -1]), attr, g);
    svg.symbol("F", {q4: 'g', vec:1}, [-1, -3.3], g);
    svg.symbol("F", {q4: 't', vec:1}, [-1.3, -2.1], g);
    g = svg.group().css({fill: "red"}).anchor(...p).config({theta: -25});
    svg.arrow(p.plus([0, 0.2]), p.plus([0, 0.2 + 0.8 * cos(25)]), attr, g);
    svg.final();

    svg = new SVG_Animation(sel, -5.75, 2.25, -5);
    svg.grid([-0.75, 2, 0.25], [-3.5, 0.75, 0.25]);
    g = svg.group().css({fill: "red"});
    svg.arrow([0, 0], [0, -3], attr, g);
    p = vec2d(3 * sin(25), -25);
    svg.arrow([0, -3], p, attr, g);
    svg.symbol("F", {q4: 'g', vec:1}, [-0.5, -1.5], g);
    svg.symbol("F", {q4: 't', vec:1}, [1.2, -1.7], g);

    g = svg.group().addClass("Serif").css({fill: "red"});
    svg.text("θ", [0.22, -2], g);

    g = svg.group().css({fill: "#0065FE"});
    svg.arrow([0, 0], p, attr, g);
    svg.symbol("F", {q4: 'net', vec:1}, [0.5, 0.3], g);
    svg.final();
},

});