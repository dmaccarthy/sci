SVG2.cache("p30/elec/img/da.js", {

pend: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 2.5, 0, 3.5], grid: [0.25, 0.5], margin: [64, 20, 54, 12]});
    svg.ticks({x: [0, 2.6, 0.5], label: 1}, true);
    svg.ticks({y: [0, 3.6, 0.5], label: 1}, true);

    let s = {scale: 0.7};
    let pt = ["-48", 1.75];
    svg.mjax("\\rm Length / m", s, [1.25, "-40"]);
    svg.group().config({theta: 90, pivot: pt}).mjax("\\rm Period / s", s, pt);

    let x = [...range(0.25, 2.2501, 0.25)];
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let p = svg.group();
    let model = p.group(".Locus", "none", "#0065fe@2");
    model.locus(x => 0.965 * x + 0.947, [0, 2.5]).$.hide().addClass("Toggle0");
    model.locus(x => twoPi * Math.sqrt(x / 9.81), [0, 2.5]).$.hide().addClass("Toggle1");
    p.plot({x:x, y:y}, "5");

    let t = click_cycle.toggle;
    click_cycle(svg.element, 2,
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1)},
    );
},

pend_lin: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 1.75, 0, 3.5], grid: [0.25, 0.5], margin: [64, 20, 62, 12]});
    svg.ticks({x: [0, 1.8, 0.25], label: 2}, true);
    svg.ticks({y: [0, 3.6, 0.5], label: 1}, true);

    let s = {scale: 0.7};
    let pt = ["-48", 1.75];
    svg.mjax("\\rm (Length / m)^{1/2}", s, [0.875, "-40"]);
    svg.group().config({theta: 90, pivot: pt}).mjax("\\rm Period / s", s, pt);

    let x = fn_eval(Math.sqrt, range(0.25, 2.2501, 0.25));
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let p = svg.group();
    let line = p.group(".Locus", "none", "#0065fe@2").locus(x => 2.01 * x, [0, 1.75]).$.hide();
    p.plot({x:x, y:y}, "5");

    svg.$.on("click", () => line.fadeToggle());
},

});