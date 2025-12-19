SVG2.cache("p20/da/img/pwr.js", {

lightbulb: (sel, linear) => {
    let x1 = linear ? 2 : 3;
    let svg = new SVG2(sel, {size: [512, 384], lrbt: [0, x1, 0, 2], grid: [0.25, 0.25], margin: [68, 14, 64, 14]});

    // Data
    let x = [...range(0.75, 3.1, 0.25)];
    if (linear) x = [...fn_eval(x => Math.pow(x, -2), x)];
    let y = [1.6, 0.846, 0.585, 0.395, 0.28, 0.217, 0.17, 0.134, 0.111, 0.098];

    // Axes
    let opt = {size: ["-6", "6"], label: 1, shift: "-9", css: 15};
    svg.ticks({x: [0, x1 + 0.1, 0.5], ...opt});
    svg.ticks({y: [0, 2.1, 0.5], ...opt});
    let s = {scale: 0.7};
    let tex = "Separation / m";
    if (linear) tex = `(${tex})^{-2}`;
    svg.mjax("\\rm " + tex, s, [x1 / 2, "-32", "t"]);
    svg.mjax("\\rm Intensity / (W/m^2)", s, ["-36", 1, "b"], null, 90);

    // Plot data and model equation
    if (linear) {
        let lin = lin_reg_xy(x, y).fn;
        css(svg.line([0, lin(0)], [2, lin(2)]), ".Toggle0", "#0065fe@2");
    }
    else {
        let pwr = pwr_reg_xy(x, y);
        let x0 = Math.pow(2 / pwr.a, 1 / pwr.n);
        css(svg.locus(pwr.fn, [x0, 3]), ".Toggle0", "none", "#0065fe@2");
    }
    svg.plot({x:x, y:y}, "5");

    svg.click_toggle(1, 1);
},
    
});