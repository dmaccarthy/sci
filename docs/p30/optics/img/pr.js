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
    let image = svg.arrow({tail: [x, 0], tip: [x, m]}, {tail: `${w2}`});
    if (di < 0) image.$.css({fill: "lightgrey"});
    else image.$.css({fill: "red"});
    image.$.addClass("Toggle4");

    // Ray groups
    let gv = svg.group();
    let gi = svg.group();
    let gr = svg.group();
    gi.$.css({stroke: "#0065FE", fill: "none"}).addClass("Toggle0");
    gr.$.css({stroke: "red", fill: "none"}).addClass("Toggle1");
    gv.$.css({stroke: "grey", fill: "none", "stroke-dasharray": "8,8"});

    let rayPt = (p1, dx, k) => [p1, new RArray(dx, k * dx).plus(p1)];
    let ray = (g, p1, p2) => g.ray(p1, p2, {size: "10", ratio: 0.5}, uniform(0.1, 0.4), uniform(0.6, 0.9));

    // Paraxial rays
    ray(gi, po, [0, 1]);
    ray(gr, [0, m], [lens ? x1 : x2, m]).$.addClass("Toggle2");
    gv.line([0, m], [lens ? x2 : x1, m]).addClass("Toggle2");

    if (lens) {
        ray(gi, po, [0, 0]);
        ray(gi, ...rayPt(po, -d, 1 / (d - f)));
        ray(gr, ...rayPt([0, 0], x1, -m / di)).$.addClass("Toggle3");
        ray(gr, ...rayPt([0, 1], x1, 1 / f));
        gv.line(...rayPt([0, 0], x2, -m / di)).addClass("Toggle3");
        gv.line(...rayPt([0, 1], x2, 1 / f)).addClass("Toggle1");
    }
    else {
        ray(gi, po, [0, m]);
        ray(gr, ...rayPt([0, 1], x2, -1 / f));
        let k = 1 / (d - 2 * f);
        if (isFinite(k)) {
            let pc = [0, -2 * f * k];
            ray(gi, ...rayPt(po, -d, k));
            ray(gr, ...rayPt(pc, x2, k)).$.addClass("Toggle3");
            gv.line(...rayPt(pc, x1, k)).addClass("Toggle3");
        }
        gv.line(...rayPt([0, 1], x1, -1 / f)).addClass("Toggle1");
    }
    if (di > 0) gv.$.remove();

    // Mirror/lens and principal axis
    let g = svg.group();
    g.$.css({stroke: "black", "stroke-width": "2px"});
    g.line([x1, 0], [x2, 0]);
    // g.line([0, -y2], [0, y2]).css({"stroke-width": "1px"});

    // Focus and centre
    let css = {fill: "white", stroke: "black"};
    svg.circle("4", [f, 0]).css(css);
    svg.circle("4", [lens ? -f : 2 * f, 0]).css(css);
    css = {"font-size": "20px", "font-weight": "bold"};
    svg.text(lens ? "F’": "F", [f, y2/10]).css(css);
    svg.text(lens ? "F" : "C", [lens ? -f : 2 * f, y2/10]).css(css);

    // Lens or mirror
    let h = 1.2 * Math.max(1, Math.abs(m));
    x = -Math.abs(f) / 12;
    let r = (h * h / x + x) / 2;
    let p;
    if (lens) {
        if (f > 0) p = svg.path([0, h]).arcTo([0, -h], r).arcTo([0, h], r);
        else {
            x *= 1.4;
            p = svg.path([x, h]).hor(-x).arcTo([-x, -h] , r).hor(x).arcTo([x, h], r);
        }
        p.close().update();
        p.$.css({stroke: "grey", fill: "lightgrey", "fill-opacity": 0.4});
    }
    else {
        x *= f > 0 ? -0.5 : 0.5;
        let c = f > 0 ? 0 : 2;
        p = svg.path([x, h]).arcTo([x, -h], r, c);
        p.update();
        p.$.css({stroke: "silver", "stroke-width": "5px", fill: "none"});
    }
    p.$.prependTo(svg.$);
    return svg;
},

diag_toggle: (sel, lens, f, d) => {
    let svg = SVG2.cache_run("p30/optics/img/pr.js", "diag", sel, lens, f, d);
    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2, 3, 4)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
        () => {t(svg, true, 4)},
    );
},

});
