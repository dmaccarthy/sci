SVG2.cache("p20/da/img/pwr.js", {

lightbulb: (sel, linear) => {
    let x = [...range(0.75, 3.01, 0.25)];
    let y = [1.6, 0.846, 0.585, 0.395, 0.28, 0.217, 0.17, 0.134, 0.111, 0.098];
    let data, lrbt;
    if (linear) {
        for (let i=0;i<x.length;i++) x[i] = Math.pow(x[i], -2);
        let lin = linRegXY(x, y).fn;
        data = [{connect: [[0, lin(0)], [2, lin(2)]]}, {plot: [zip(x, y), "5"]}];
        lrbt = [0, 2, 0, 2];
    }
    else {
        let pwr = pwrRegXY(x, y);
        let x0 = Math.pow(2 / pwr.a, 1 / pwr.n);
        data = [{locus: [pwr.fn, [x0, 3]]}, {plot: [zip(x, y), "5"]}];
        lrbt = [0, 3, 0, 2];
    }

    let svg = new SVG2(sel, {size: [480, 360], lrbt: lrbt, margin: [56, 10, 56, 12]});
    svg.graph({grid: [0.25, 2], css: true, appendAxes: 1,
        x: {tick: [0, lrbt[1] + 0.1, 0.5], dec: 1, title: ["Separation / m", "-44"], shift: [0, "-22"]},
        y: {tick: [0, 2.1, 0.5], dec: 1, title: ["Intensity / (W/m &nbsp; )", "-40"], shift: ["-10", "-4"]},
        data: data,
    });
    svg.delay(svg.group().config({theta: 90}), {recenter: [-0.3, 1.45]}).text("2").css({"font-size": "14px"});

    svg.css_map().finalize();
    svg.$.find("g.Locus").addClass("Toggle0").hide();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 1,
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0)},
    );
},
    
});