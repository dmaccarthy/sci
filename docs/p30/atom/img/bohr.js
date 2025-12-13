SVG2.cache("p30/atom/img/bohr.js", {

eld: (sel) => {
    let [w, E1] = [0.25, -13.6];
    let svg = new SVG2(sel, {scale: [160, 24], lrbt: [-1.2 * w, 6.2 * w, -14, 2.2]});
    let lines = svg.group("#0065fe@2");
    let level = svg.group(".Toggle0");
    let label = svg.group(".Toggle0", "black@1");
    for (let n=1;n<8;n++) {
        let E = n == 7 ? 0 : E1 / (n * n);
        let xy = [0, n == 1 ? -13 : 1.5 * (n - 6)];
        lines.line([-w, E], [w, E]);
        label.line([1.2 * w, E], [2.6 * w, xy[1] + 0.1]);
        let s = `${E.toPrecision(3)}`.replace("-", "–");
        level.mjax(`E_{${n == 7 ? "\\infty" : n}} = \\rm ${s}\\ eV`, {scale: 0.6}, [0.7, xy[1], 0, 0.5]);
    }
    svg.arrow({tail: [0, E1/16], tip: [0, E1/4]}, {tail: "4"}).css(".Toggle1", "arrow");

    let t = click_cycle.toggle;
    click_cycle(svg.element, 2,
        () => {t(svg, false, 0, 1)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
    );
},

});