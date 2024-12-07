SVG2.cache("p30/atom/img/bohr.js", {

eld: (sel) => {
    let [w, E1, SM, IT] = [0.25, -13.6, 4, 2];
    let svg = new SVG2(sel, {scale: [160, 24], lrbt: [-1.2 * w, 6.2 * w, -14, 2.2]});
    let lines = svg.group().css({stroke: "#0065fe", "stroke-width": "2px"});
    let level = svg.group().addClass("Toggle0");
    let label = svg.group().addClass("Toggle0").css({stroke: "black", "stroke-width": "1px"});
    for (let n=1;n<8;n++) {
        let E = n == 7 ? 0 : E1 / (n * n);
        let xy = [0, n == 1 ? -13 : 1.5 * (n - 6)];
        lines.line([-w, E], [w, E]);
        label.line([1.2 * w, E], [2.6 * w, xy[1] + 0.1]);
        let s = level.symbol(["E", IT], [n == 7 ? "∞" : n, SM, ["12", "-8"]], [`= &nbsp;${E.toPrecision(3)} eV`, 0, ["28", 0]]).config({shift: [2.8 * w, 0]});
        svg.delay(s, {recenter_dim: [xy, 2]});
    }
    svg.arrow({tail: [0, E1/16], tip: [0, E1/4]}, {tail: "4"}).addClass("Toggle1");
    svg.addClass("NoStyle").css_map("grid", "text", "arrow").$.find("g.Symbol, g.Text").css({"text-anchor" : "start"});
    svg.finalize();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 2,
        () => {t(svg, false, 0, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
    );
},

});