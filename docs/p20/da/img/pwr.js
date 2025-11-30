SVG2.cache("p20/da/img/pwr.js", {

lightbulb: (sel, linear) => {
    let x = [...range(0.75, 3.01, 0.25)];
    let y = [1.6, 0.846, 0.585, 0.395, 0.28, 0.217, 0.17, 0.134, 0.111, 0.098];
    let data, lrbt;
    if (linear) {
        for (let i=0;i<x.length;i++) x[i] = Math.pow(x[i], -2);
        let lin = lin_reg_xy(x, y).fn;
        data = {connect: [[0, lin(0)], [2, lin(2)]]};
        lrbt = [0, 2, 0, 2];
    }
    else {
        let pwr = pwr_reg_xy(x, y);
        let x0 = Math.pow(2 / pwr.a, 1 / pwr.n);
        data = {locus: [pwr.fn, [x0, 3]]};
        lrbt = [0, 3, 0, 2];
    }

    let xLabel = "Separation / m";
    if (linear) xLabel = `(${xLabel}) &nbsp;`;
    let svg = new SVG2(sel, {size: [480, 360], lrbt: lrbt, margin: [60, 10, 56, 12]});
    svg.graph({grid: [0.25, 0.25],
        x: {tick: [0, lrbt[1] + 0.1, 0.5], dec: 1, title: [xLabel, "-44"], shift: [0, "-22"]},
        y: {tick: [0, 2.1, 0.5], dec: 1, title: ["Intensity / (W/m &nbsp; )", "-40"], shift: ["-10", "-4"]},
        data: [data, {plot: [zip(x, y), "5"]}],
    });
    let x0 = linear ? -0.22 : -0.32;
    svg.ctext(["2", [x0, 1.47], {css: "f14", config: {theta: 90}}]);
    if (linear) svg.ctext(["–2", [1.36, -0.2], {css: "f14"}]);

    svg.$.find("g.Locus").addClass("Toggle0"); //.hide();
    svg.click_toggle(1, 1);
},
    
});