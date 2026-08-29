SVG2.cache("p30/optics/img/pr.js", {

diag: (sel, lens, f, d) => {
    if (!f) f = 1;
    if (!d) d = 3;
    let di = 1 / (1 / f - 1 / d);
    let m = -di / d;

    // Calculate drawing scale
    let x1 = Math.min(0, 2 * f, di);
    let x2 = Math.max(2 * f, d, di);
    if (lens) {
        x1 = Math.min(f, -f, -di);
        x2 = Math.max(f, -f, d, -di);
    }
    let y2 = 1.25 * Math.max(1, m, -m);
    let dx = (x2 - x1) / 10;
    x1 -= dx; x2 += dx;

    // Create drawing
    let svg = new SVG2(sel, {size: [702, 352], lrbt: [x1, x2, -y2, y2]});
    svg.element.cycleStatus = -1;
    svg.element.data = [f, d, di, m];

    // Calculate arrow widths
    let width = Math.sqrt(Math.abs(m));
    let w1 = Math.min(20, Math.max(4, 8 / width));
    let w2 = Math.min(20, Math.max(4, 8 * width));

    // Object and image
    let po = [d, 1];
    svg.arrow({tail: [d, 0], tip: po}, {tail: `${w1}`}).$.css({fill: "#0065FE"});
    let x = lens ? -di : di;
    svg.arrow({tail: [x, 0], tip: [x, m]}, {tail: `${w2}`}).css(".Toggle4", di < 0 ? "lightgrey" : "red");

    // Ray groups
    let gv = svg.group("none", "grey@1", {"stroke-dasharray": "8,8"});
    let gi = svg.group(".Toggle0", "none", "#0065fe@1");
    let gr = svg.group(".Toggle1", "none", "red@1");

    let rayPt = (p1, dx, k) => [p1, new RArray(dx, k * dx).plus(p1)];
    let ray = (g, p1, p2) => g.ray(p1, p2, {size: "10", ratio: 0.5}, uniform(0.1, 0.4), uniform(0.6, 0.9));

    // Paraxial rays
    ray(gi, po, [0, 1]);
    ray(gr, [0, m], [lens ? x1 : x2, m]).css(".Toggle2");
    css(gv.line([0, m], [lens ? x2 : x1, m]), ".Toggle2");

    if (lens) {
        ray(gi, po, [0, 0]);
        ray(gi, ...rayPt(po, -d, 1 / (d - f)));
        ray(gr, ...rayPt([0, 0], x1, -m / di)).css(".Toggle3");
        ray(gr, ...rayPt([0, 1], x1, 1 / f));
        css(gv.line(...rayPt([0, 0], x2, -m / di)), ".Toggle3");
        css(gv.line(...rayPt([0, 1], x2, 1 / f)), ".Toggle1");
    }
    else {
        ray(gi, po, [0, m]);
        ray(gr, ...rayPt([0, 1], x2, -1 / f));
        let k = 1 / (d - 2 * f);
        if (isFinite(k)) {
            let pc = [0, -2 * f * k];
            ray(gi, ...rayPt(po, -d, k));
            ray(gr, ...rayPt(pc, x2, k)).css(".Toggle3");
            css(gv.line(...rayPt(pc, x1, k)), ".Toggle3");
        }
        css(gv.line(...rayPt([0, 1], x1, -1 / f)), ".Toggle1");
    }
    if (di > 0) gv.$.remove();

    // Principal axis
    css(svg.line([x1, 0], [x2, 0]), "black@2");

    // Focus and centre
    let g = svg.group("white", "black@1");
    g.circle("4", [f, 0]);
    g.circle("4", [lens ? -f : 2 * f, 0]);

    // Lens or mirror
    let h = 1.2 * Math.max(1, Math.abs(m));
    let p;
    if (lens) {
        x = (x1 - x2) / 50;
        let r = ["20", "200"];
        if (f > 0) p = svg.path([0, h]).arc_to([0, -h], r).arc_to([0, h], r);
        else p = svg.path([x, h]).hor(-x).arc_to([-x, -h] , r).hor(x).arc_to([x, h], r);
        css(p.close().update(), "lightgrey", "grey@1");
    }
    else {
        x = -Math.abs(f) / 12;
        let r = (h * h / x + x) / 2;
        x *= f > 0 ? -0.5 : 0.5;
        let c = f > 0 ? 0 : 2;
        p = svg.path([x, h]).arc_to([x, -h], r, c);
        css(p.update(), "none", "silver@5");
    }
    p.$.prependTo(svg.$);
    y2 /= -10;
    g = svg.group("sans", 20, "bold");
    g.gtext(lens ? "F’": "F", [], [f, y2]);
    g.gtext(lens ? "F" : "C", [], [lens ? -f : 2 * f, y2]);
    return svg;
},

diag_toggle: (sel, lens, f, d) => {
    let svg = SVG2.cache_run("p30/optics/img/pr.js", "diag", sel, lens, f, d);
    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2, 3, 4)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
        () => {t(svg, true, 4)},
    );
},

});
