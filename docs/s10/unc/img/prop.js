SVG2.cache("s10/unc/img/prop.js", {

ebar: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 90, 0, 70], grid: [5, 5], margin: [64, 12, 56, 12]});
    let x = [...range(10, 81, 10)];
    let y = [62.6, 51.2, 43.8, 37.4, 33, 23.6, 18.2, 6.8]; // [...fn_eval((x) => randint(66, 70) - 0.74 * x, x)]
    let f = lin_reg_xy(x, y).fn;

    let tick = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 91, 10], ...tick});
    svg.ticks({y: [0, 71, 10], ...tick});
    let g = svg.group("sans", 18);
    g.text("Mass / g", [60, "8", "b"]);
    g.text("Final Temperature / °C", ["-40", 35, "b"], 90);
    svg.plot({x: x, y: y}, "4").css("#0065fe", "black@1");
    css(svg.line([0, f(0)], [90, f(90)]), "#0065fe@2");

    // Min-max lines
    let minmax = svg.group().addClass("Toggle1").css({stroke: "red"});
    minmax.$.prependTo(svg.$.find("g.Series"));
    minmax.line([2.4, 70], [86.4, 0]);
    minmax.line([0, 66], [90, 4]).addClass("Toggle2");

    // Error bars
    let bars = svg.group().addClass("Toggle0").css({stroke: "#0065fe"});
    bars.$.prependTo(svg.$.find("g.Series"));
    let dx = 5, dy = 3;
    for (let i=0;i<x.length;i++) {
        let xi = x[i], yi = y[i];
        bars.error_bar_x(xi - dx, xi + dx, yi, "8");
        bars.error_bar_y(xi, yi - dy, yi + dy, "8");
    }

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );

},

});