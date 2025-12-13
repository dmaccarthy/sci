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
    let g = svg.group().css("black@2");
    g.line([0, 0.15], [3, 0.15]);
    g.line([1.75 + 0.35 / v, 0.5], [1.75 - 0.4 / v, -0.25]).css({stroke: "#0065fe"});
    g.circle("5", [1.75, 0.15]).css({fill: "#0065fe", "stroke-width": "1px"});
    g.$.hide().addClass("Toggle");
},

pend: (sel, a) => {
    if (!a) a = 0;
    let x = -0.4 - 0.02 * a;
    let svg = new SVG2(sel, {scale: 140, lrbt: [x, 0.4, -3, 0], margin: 2});
    css(svg.line([-0.4, 0], [0.4, 0]), "black@1");
    let pend = svg.group().config({theta: -a});
    css(pend.line([0, 0], [0, -2]), "black@3");
    css(pend.circle(0.1, [0, -2]), "#0065fe", "black@1");
    let g = pend.group("arrow", {"fill-opacity": 0.8});
    let t7 = {tail: "7"};
    g.arrow({tail: [0, -1.8], tip: [0, -1]}, t7);
    g.group().config({pivot: [0, -2], theta: a}).arrow({tail: [0, -2.2], tip: [0, -3]}, t7);

    let s = {scale: 1};
    let pt = transform({angle: -a, deg: true}, [0, -2])[0].plus([0.2, -0.5]);
    svg.mjax("\\vec{\\bf F}_g", s, pt, "red");
    pt = vec2d(1.5, -a - 90).plus([0.2, 0]);
    svg.mjax("\\vec{\\bf F}_t", s, pt, "red");
},

eqm: (sel) => {
    let svg = new SVG2(sel, {size: [480, 384], lrbt: [-1.1, 0.9, -0.25]});
    let land = (x) => sq(sin(-100 * (x - 0.3)));
    svg.locus(land, [-1.1, 0.9]).css("none", "black@1");

    let r = 0.03, i = 0;
    let balls = [
        [0, [0.3, r]],
        [0, [-0.6, r + 1]],
        [50, [-0.9, r + land(-0.9) + 0.024]],
        [50, [0.6, r + land(0.6) + 0.024]]];
    let g = svg.group("#0065fe", "black@1");
    let a = svg.group("arrow");
    let p0 = new RArray(0, -0.05);
    let p1 = new RArray(0, -0.2);
    for (let b of balls) {
        let toggle = `.Toggle${[0, 0, 1, 2][i++]}`;
        let c = new RArray(...b[1]);
        css(g.circle(r, c), toggle);
        for (let f of [1, -1]) {
            let vec = a.arrow({tail: p0.times(f).plus(c), tip: p1.times(f).plus(c)}, {tail: "4"}).css(toggle);
            let cb = () => {};
            if (b[0] && f == -1) {
                vec.config({pivot: c, theta: b[0]});
                cb = g => g.shift_by([-0.15, 0.1]);
            }
            let tex = `\\vec{\\bf F}_${f == -1 ? "n" : "g"}`;
            svg.group(toggle).mjax(tex, {scale: 0.9}, c.plus([0.12, -0.12 * f]), "red").then(cb);
        }
    }
    g = svg.group("text", 20);
    g.gtext("Stable", ".Toggle2", [-0.05, -0.05]);
    g.gtext("Unstable", ".Toggle1", [-0.1, 1.1]);

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, true, 0, 1, 2)},
        () => {t(svg, false, 1, 2)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1); t(svg, true, 2)},
    );
},

});