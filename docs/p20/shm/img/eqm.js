SVG2.cache("p20/shm/img/eqm.js", {

mass: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 3, -0.2, 0.5], margin: [62, 16, 12, 12]});
    svg.graph({grid: [0.25, 0.05],
        x: {tick: [0, 3.1, 0.5], dec: 1, title: ["Time / s", [2.25, "-44"]], shift: [0, "-20"]},
        y: {tick: [-0.2, 0.51, 0.1], dec: 1, title: ["Position / cm", "-44"], shift: ["-10", "-5"]},
        data: [{locus: [(x) => 0.3 * sin(240 * x - 60) + 0.15, [0, 3]]}]
    });
    svg.$.find("g.LabelX text.Zero").remove();
    svg.$.find("g.Locus").css({stroke: "red"});
    let v = pi / 2.5;
    let g = svg.group().css("black2");
    g.line([0, 0.15], [3, 0.15]);
    g.line([1.75 + 0.35 / v, 0.5], [1.75 - 0.4 / v, -0.25]).css({stroke: "#0065fe"});
    g.circle("5", [1.75, 0.15]).css({fill: "#0065fe", "stroke-width": "1px"});
    g.$.hide().addClass("Toggle");
},

pend: (sel, a) => {
    if (!a) a = 0;
    let x = -0.4 - 0.02 * a;
    let svg = new SVG2(sel, {scale: 140, lrbt: [x, 0.4, -3, 0], margin: 2});
    svg.line([-0.4, 0], [0.4, 0]).css(SVG2.css("black1"));
    let pend = svg.group().config({theta: -a});
    pend.line([0, 0], [0, -2]).css(SVG2.css("black3"));
    pend.circle(0.1, [0, -2]).css(SVG2.css("blue", "black1"));
    let g = pend.group("arrow", {"fill-opacity": 0.8});
    let t7 = {tail: "7"};
    g.arrow({tail: [0, -1.8], tip: [0, -1]}, t7);
    g.group().config({pivot: [0, -2], theta: a}).arrow({tail: [0, -2.2], tip: [0, -3]}, t7);
    g = pend.group("symbol", "f28", "red");
    let arr = SVG2.arr("20");
    let sub = [6, ["12", "-8"]];
    g.symb(0, ["F", 1], arr, ["t", ...sub]).align([0.2, -1.5]);
    g = svg.group("symbol", "f28", "red").symb(0, ["F", 1], arr, ["g", ...sub]);
    let pt = transform({angle: -a, deg: true}, [0, -2])[0].plus([0.2, -0.5])
    g.align(pt);
},

eqm: (sel) => {
    let svg = new SVG2(sel, {size: [480, 384], lrbt: [-1.1, 0.9, -0.25], grid: 0.1});
    let land = (x) => sq(sin(-100 * (x - 0.3)));
    svg.locus(land, [-1.1, 0.9]).css("nofill", "black1");

    let r = 0.03;
    let balls = [
        [0, [0.3, r]],
        [0, [-0.6, r + 1]],
        [50, [-0.9, r + land(-0.9) + 0.024]],
        [50, [0.6, r + land(0.6) + 0.024]]];
    let g = svg.group("blue", "black1");
    let a = svg.group("arrow");
    let s = svg.group("symbol", "f28", "red");
    let p0 = new RArray(0, -0.05);
    let p1 = new RArray(0, -0.2);
    for (let b of balls) {
        let c = new RArray(...b[1]);
        g.circle(r, c);
        for (let f of [1, -1]) {
            let vec = a.arrow({tail: p0.times(f).plus(c), tip: p1.times(f).plus(c)}, {tail: "4"});
            let sym = s.group();
            sym.symb(0, ["F", 1]).align(c.plus([0.12, -0.12 * f]));
            if (b[0] && f == -1) {
                let rotate = {pivot: c, theta: b[0]};
                vec.config(rotate);
                sym.config(rotate);
            }
        }
    }
},

eqm0: (sel) => {
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