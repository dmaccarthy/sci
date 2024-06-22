save("p20/shm/img/pend", {

pend: (sel) => {
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