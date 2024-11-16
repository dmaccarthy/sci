SVG2.cache("p20/shm/img/eqm.js", {

mass: (sel) => {
    $(sel).attr({width: 480, height: 300, "data-aspect": "8/5"});
    let svg = applet.graph(sel, {
        grid: [[0, 3, 0.25], [-0.25, 0.5, 0.05], 1],
        margin: [0.18, 0.05, 0.01, 0.04],
        x: ["Time / s", [">", "18"], {fixed: 1, omitZero: 1, interval: 0.5, length: "8", offset: [0, "-24"]}],
        y: ["Position / cm", ["-54", ">"], {fixed: 1, interval: 0.1, length: "8", offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let v = pi / 2.5;
    svg.locus((t) => 0.3 * sin(240 * t - 60) + 0.15, [0, 3]);
    let g = svg.group().addClass("MassHide");
    svg.line([0, 0.15], [3, 0.15], g).css({stroke: "black", "stroke-width": "2px"});
    svg.line([1.75 + 0.35 / v, 0.5], [1.75 - 0.4 / v, -0.25], g).css({"stroke-width": "2px"});
    svg.circle(0.015, [1.75, 0.15], g);
    svg.$.find("polyline").css({stroke: "red"});
    g.$.hide();
    svg.final();
},

pend_eq: (sel) => {
    $(sel).attr({width: 120, height: 400, "data-aspect": "3/10"});
    let svg = new SVG_Animation(sel, -0.5, 0.5, -3.1);
    svg.line([0, 0], [0, -2]).css({stroke: "black", "stroke-width": "3px"});
    svg.line([-0.5, 0], [0.5, 0]).css({stroke: "black"});
    svg.circle(0.1, [0, -2]).css({fill: "#0065FE", stroke: "black"});
    svg.arrow([0, -2.2], [0, -3], {tail: "8"}).addClass("Vector");
    svg.arrow([0.1, -1.8], [0.1, -1], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "t"}, [0.3, -1.5]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "g"}, [0.2, -2.5]).css({fill: "red"});
    svg.final();
},

pend: (sel) => {
    $(sel).attr({width: 180, height: 400, "data-aspect": "18/40"});
    let svg = new SVG_Animation(sel, -0.8, 0.7, -3.1);
    svg.line([-0.5, 0], [0.5, 0]).css({stroke: "black"});
    let g = svg.group().config({theta: -15});
    svg.line([0, 0], [0, -2], g).css({stroke: "black", "stroke-width": "3px"});
    svg.circle(0.1, [0, -2], g).css({fill: "#0065FE", stroke: "black"});
    svg.arrow([-0.5, -2.2], [-0.5, -3], {tail: "8"}).addClass("Vector");
    svg.arrow([0.1, -1.8], [0.1, -1], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "t"}, [0.3, -1.5], g).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "g"}, [-0.3, -2.5]).css({fill: "red"});
    svg.final();
},

eqm: (sel) => {
    $(sel).attr({width: 480, height: 384, "data-aspect": "5/4"});
    let svg = new SVG_Animation(sel, -1.1, 0.9, -0.25);
    let land = (x) => sq(sin(-100 * (x - 0.3)));
    svg.locus(land, [-1.1, 0.9]).css({fill: "none", stroke: "black"});

    let g0 = svg.group().addClass("Eqm").css({fill: "red"});
    let g1 = svg.group().addClass("Unstable").css({fill: "red"});
    let g2 = svg.group().addClass("Stable").css({fill: "red"});

    let r = 0.03;
    let arrow = [[0, r + 0.02], [0, r + 0.2], [0, r + 0.02 + 0.18 * cos(50)]];
    let balls = [[0.3, r], [-0.6, r + 1], [-0.9, r + land(-0.9) + 0.024], [0.6, r + land(0.6) + 0.024]];
    for (let i=0;i<balls.length;i++) {
        let pt = new RArray(...balls[i]);
        let g = i == 3 ? g2 : (i == 2 ? g1 : g0);
        svg.circle(r, pt, g);
        let a = svg.arrow(pt.plus(arrow[0]), pt.plus(arrow[i < 2 ? 1 : 2]), {tail: "4"}, g);
        if (i > 1) a.anchor(...pt).config({theta: 50});
        svg.symbol("F", {q4: "g", vec: 1}, pt.plus([0.1, -0.15]), g);
        a = svg.arrow(pt.minus(arrow[0]), pt.minus(arrow[1]), {tail: "4"}, g);
        pt = pt.plus(i == 0 ? [-0.15, 0.1] : (i == 1 ? [0.1, 0.1] : [-0.08, 0.17]));
        svg.symbol("F", {q4: "n", vec: 1}, pt, g);
    }

    svg.text("Unstable", [-0.15, 1.1], g1).css({fill: "black", "font-size": "20px"});
    svg.text("Stable", [-0.1, 0], g2).css({fill: "black", "font-size": "20px"});

    svg.$.find("circle").css({fill: "#0065FE"});
    svg.final();

    clickCycle(svg.element, 0,
        () => {svg.$.find("g").fadeIn()},
        () => {g2.$.fadeOut(); g1.$.fadeOut()},
        () => {g0.$.fadeOut(); g1.$.fadeIn()},
        () => {g1.$.fadeOut(); g2.$.fadeIn()},
    );
},

});