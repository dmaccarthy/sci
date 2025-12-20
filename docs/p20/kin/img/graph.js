SVG2.cache("p20/kin/img/graph.js", {

bike: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -6, 8], grid: [0.5, 1], margin: [54, 10, 10, 10]});

    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 4.1, 1], ...opt});
    svg.ticks({y: [-6, 9, 2], ...opt});
    let g = svg.group("sans", 18);
    g.text("Time / s", [4, "8", "br"]);
    g.text("Position / m", ["-32", 1, "b"], 90);

    let pts = [[0, -5], [1, -2], [2, 1], [3, 4], [4, 7]];
    css(svg.line(pts[0], pts.item(-1)), "#0065fe@2");
    svg.plot(pts, "5");
    svg.$.find("g.TicksX g.Zero").remove();
},

dt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 50], grid: [1, 5], margin: [32, 2, 2, 2]});
    let g = svg.group("sans", 18);
    g.text("Time / s", [10, "8", "br"]);
    g.text("Position / m", ["-12", 25, "b"], 90);

    g = svg.group("none", "#0065fe@2");
    css(g.line([0, 5], [10, 20]), ".Toggle0");
    css(g.line([0, 10], [10, 50]), ".Toggle1", "red@");
    css(g.line([0, 40], [10, 5]), ".Toggle2", "green@");
    css(g.line([0, 28], [10, 28]), ".Toggle3", "cyan@");
    g.locus(x => x * (2 + x / 2), [0, Math.sqrt(104) - 2]).css(".Toggle4", "gold@");
    g.locus(x => 10 + x * (8 - x / 2), [0, 10]).css(".Toggle5", "violet@");

    svg.click_toggle(6, 1, null, 1, true);
},

vt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 28], grid: [0.5, 2], margin: [56, 10, 26, 12]});

    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 8.1, 1], ...opt});
    svg.ticks({y: [0, 29, 4], ...opt});
    let g = svg.group("sans", 18);
    g.text("Time / s", [8, "8", "br"]);
    g.text("Velocity / (m/s)", ["-34", 14, "b"], 90);

    let v = t => t > 4 ? 24 : 8 + 4 * t;
    svg.locus(v, [0, 8, 8]).css("none", "#0065fe@2");

    g = svg.group("#0065fe", {"fill-opacity": 0.3}, "none@");
    g.$.insertBefore(svg.$.find("g.Locus"));
    let poly = [1, 1, 1, 1, 1, 3];
    let t0 = 0;
    for (let i=0;i<poly.length;i++) {
        let t1 = t0 + poly[i];
        g.poly([[t0, v(t0)], [t1, v(t1)], [t1, 0], [t0, 0]]).addClass(`Toggle${i}`);
        t0 = t1;
    }
    g.$.find("*").hide();

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, false, 0, 1, 2, 3, 4, 5)},
        () => {t(svg, true, 0, 1, 2, 3)},
        () => {t(svg, false, 1, 2, 3)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1); t(svg, true, 2)},
        () => {t(svg, false, 2); t(svg, true, 3)},
        () => {t(svg, false, 3); t(svg, true, 4, 5)},
        () => {t(svg, false, 5)},
    );

},

elevator: (sel) => { // Motion of an elevator d-t graph
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 50], grid: [1, 5], margin: [56, 10, 28, 12]});
    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 11, 2], ...opt});
    svg.ticks({y: [0, 51, 10], ...opt});
    let g = svg.group("sans", 18);
    g.text("Time / s", [10, "8", "br"]);
    g.text("Position / m", ["-32", 25, "b"], 90);
    svg.locus(t => t <= 5 ? t * t : 50 - (10 - t) * (10 - t), [0, 10]).css("none", "#0065fe@2");
    g = css(svg.line([2.5, 0], [7.5, 50]), "red@1").hide();
    svg.$.on("click", () => g.fadeToggle());
},

skydive: (sel) => { // Motion of an skydiver v-t graph
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 15, -50, 0], grid: [1, 5], margin: [60, 12, 10, 32]});
    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [3, 16, 3], ...opt});
    svg.ticks({y: [-50, 1, 10], ...opt});
    let g = svg.group("sans", 18);
    g.text("Time / s", [15, "8", "br"]);
    g.text("Velocity / (m/s)", ["-36", -25, "b"], 90);

    let v = t => 50 * (Math.exp(-9.81 * t / 50) - 1);
    let t = [...range(3, 16, 3)];
    svg.locus(v, [0, 15]).css("none", "#0065fe@2");
    g = svg.group("#0065fe@1");
    for (let ti of t) g.line([ti, v(ti)], [ti, 0]);
    g.plot({x: t, y: v}, "5").css("#0065fe", "black@1");
    g = g.$.hide();
    svg.$.on("click", () => g.fadeToggle());
},

});
