SVG2.cache("p20/skill/img/trig.js", {

pretest: (sel) => {
    let svg = new SVG2(sel, {scale: 37, lrbt: [-1, 15, -1, 5], grid: 1});
    svg.$.find("g.Grid line.Axis").removeClass("Axis");

    // PQR
    let r = vec2d(7, 35);
    let q = new RArray(r[0], 0);
    let l = 0.38;
    let text = svg.group().addClass("Text");
    let blue = svg.group().css({fill: "none", stroke: "#0065fe", "stroke-width": "2px"});
    let g = blue.group();
    g.poly([[0, 0], q, r], 1);
    g.poly([q.plus([0, l]), q.plus([-l, l]), q.plus([-l, 0])]).css({"stroke-width": "1px"});
    svg.delay(text.group(), {recenter: [2.5, 2.5]}).text("7.00");
    svg.delay(text.group(), {recenter: [1.5, 0.3]}).text("35.0°");
    g = text.group().css({fill: "#0065fe"});
    svg.delay(g.group(), {recenter: [-0.5, 0]}).text("P");
    svg.delay(g.group(), {recenter: [6.1, 0]}).text("Q");
    svg.delay(g.group(), {recenter: [6.1, 4]}).text("R");

    // ABC
    text = svg.group().addClass("Text").config({shift: [9, 4]});
    g = blue.group().config({shift: [9, 4]});
    g.poly([[0, 0], [5, 0], [0, -4]], 1);
    g.poly([[0, -l], [l, -l], [l, 0]]).css({"stroke-width": "1px"});
    svg.delay(text.group(), {recenter: [2.5, 0.3]}).text("5.00");
    svg.delay(text.group(), {recenter: [-0.7, -2]}).text("4.00");
    g = text.group().css({fill: "#0065fe"});
    svg.delay(g.group(), {recenter: [-0.5, -4]}).text("A");
    svg.delay(g.group(), {recenter: [5.6, 0]}).text("B");
    svg.delay(g.group(), {recenter: [-0.5, 0]}).text("C");

    svg.addClass("NoClass").css_map("grid", "text").finalize();
},

similar: (sel) => {
    $(sel).attr({width: 326, height: 191, "data-aspect": "326/191"});
    let svg = new SVG_Animation(sel, -1, 11, -1, 6, 1);
    svg.grid([-1, 11, 1], [-1, 6, 1]);
    let p = root(75);
    let x = 0.5;
    let g = svg.group().css({fill: "none", stroke: "#0065FE"});
    svg.poly([[0, 0], [p, 0], [p, 5]], 1, g).css({"stroke-width": "2px"});
    svg.poly([[p, x], [p-x, x], [p-x, 0]], 0, g);
    g = svg.group().css({fill: "none", stroke: "red"});
    p /= 2;
    svg.poly([[0, 0], [p, 0], [p, 2.5]], 1, g).css({"stroke-width": "2px"});
    svg.poly([[p, x], [p-x, x], [p-x, 0]], 0, g);
    g = svg.group().css({stroke: "none", fill: "red"});
    svg.text("2.5", [5, 1.25], g);
    svg.text("5", [2, 1.7], g);
    svg.text("4.33", [2.1, -0.6], g);
    g = svg.group().css({stroke: "none", fill: "#0065FE"});
    svg.text("5", [9.25, 2.5], g);
    svg.text("10", [5, 3.5], g);
    svg.text("8.66", [5, -0.6], g);
    svg.$.find("text").css({"font-size": "18px"});
    g = svg.group().css({"font-size": "15px"});
    svg.text("30°", [1.5, 0.3], g);
    svg.text("60°", [8.1, 4.1], g);
    svg.text("60°", [3.8, 1.6], g);
    svg.final();
},

ramp: (sel) => {
    $(sel).attr({width: 401, height: 135, "data-aspect": "401/135"});
    let svg = new SVG_Animation(sel, -0.25, 2, -0.25, 0.5, 1);
    svg.grid([-0.25, 2, 0.25], [-0.25, 0.5, 0.25]);
    svg.$.find("line.Axis").removeClass("Axis");
    let p = root(2.1875);
    let x = 0.06;
    let g = svg.group().css({fill: "none", stroke: "#0065FE"});
    svg.poly([[0, 0], [p, 0.25], [p, 0]], 1, g).css({"stroke-width": "2px"});
    svg.poly([[p, x], [p-x, x], [p-x, 0]], 0, g);
    svg.text("0.250 m", [1.72, 0.125]);
    svg.text("1.50 m", [0.75, 0.2]);
    svg.$.find("text").css({"font-size": "18px"});
    svg.text("θ", [0.46, 0.03]).css({"font-size": "14px"});
    svg.final();
},

/*
abc: (sel) => {
    $(sel).attr({width: 320, height: 320, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -7, 2, -8, 1, 1);
    svg.grid([-7, 2, 1], [-8, 1, 1]);
    svg.$.find("line.Axis").removeClass("Axis");
    let p = -5 * tan(57);
    let x = 0.4;
    let g = svg.group().css({fill: "none", stroke: "#0065FE"});
    svg.poly([[0, 0], [-5, 0], [0, p]], 1, g).css({"stroke-width": "2px"});
    svg.poly([[-x, 0], [-x, -x], [0, -x]], 0, g);
    g = svg.group().css({stroke: "none", fill: "#0065FE"});
    svg.text("A", [0.5, p], g);
    svg.text("B", [-5.5, 0], g);
    svg.text("C", [0.5, 0], g);
    let ital = {"font-style": "italic"};
    svg.text("<tspan>a</tspan> = 5.00", [-2.5, 0.4]);
    svg.text("b", [0.5, p/2]).css(ital);
    svg.text("c", [-3, -4]).css(ital);
    svg.text("57.0°", [-4, -0.4]);
    svg.$.find("tspan").css(ital);
    svg.$.find("text").css({"font-size": "18px"});
    svg.final();
},

pqr: (sel) => {
    $(sel).attr({width: 320, height: 320, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -7, 4, -1, 10, 1);
    svg.grid([-7, 4, 1], [-1, 10, 1]);
    svg.$.find("line.Axis").removeClass("Axis");
    let q = root(84);
    let x = 0.5;
    let g = svg.group().css({fill: "none", stroke: "#0065FE"});
    svg.poly([[0, 0], [-4, 0], [0, q]], 1, g).css({"stroke-width": "2px"});
    svg.poly([[-x, 0], [-x, x], [0, x]], 0, g);
    g = svg.group().css({stroke: "none", fill: "#0065FE"});
    svg.text("P", [0.5, q], g);
    svg.text("Q", [-4.5, 0], g);
    svg.text("R", [0.5, 0], g);
    let ital = {"font-style": "italic"};
    svg.text("<tspan>p</tspan> = 4.00", [-2, -0.6]);
    svg.text("<tspan>r</tspan> = 10.0", [-3.5, q/2]);
    svg.text("q", [0.5, q/2]).css(ital);
    svg.$.find("tspan").css(ital);
    svg.$.find("text").css({"font-size": "18px"});
    svg.final();
},
*/

ball8: (sel) => {
    $(sel).attr({width: 402, height: 302, "data-aspect": "402/302"});
    let svg = new SVG_Animation(sel, 30, 90, 30, 75, 1);
    let g = svg.grid([30, 90, 5], [30, 75, 5], 1);
    let attr = {interval: 10, fixed: 0, offset: [0, 35]};
    svg.axis({x: [40, 80], ticks: attr}, g);
    attr.offset = [35, 0];
    svg.axis({y: [40, 70], ticks: attr}, g);
    g.$.find("text").css({fill: "lightgrey"});
    let x = 2;
    g = svg.group().css({fill: "none", stroke: "red"});
    svg.poly([[40, 50], [80, 50], [80, 65]], 0, g).css({"stroke-width": "2px"});
    svg.poly([[80, 50+x], [80-x, 50+x], [80-x, 50]], 0, g);
    g = svg.group().css({stroke: "none", fill: "#0065FE"});
    svg.arrow([80, 65], [40, 50], {tail: "3"}, g);
    svg.text("F", [37.5, 50], g);
    svg.text("I", [82.5, 65], g);
    g = svg.group().css({stroke: "none", fill: "red"});
    svg.text("15.0 cm", [83, 57.5], g).config({theta: 90});
    svg.text("40.0 cm", [60, 47], g);
    svg.$.find("text").css({"font-size": "18px"});
    svg.final();
},

});
