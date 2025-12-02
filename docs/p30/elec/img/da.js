SVG2.cache("p30/elec/img/da.js", {

pend: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 2.5, 0, 3.5], grid: [0.25, 0.5], margin: [60, 20, 50, 12]});
    svg.css(".NoStyle", "text");
    svg.tick_label(1, [...range(0, 2.6, 0.5)], 0, "-6", "-20");
    svg.tick_label(1, 0, [...range(0, 3.6, 0.5)], "-6").find("g.LabelY").config({shift: ["-10", "-5"]}).$.find(".Zero").remove();

    let txt = svg.group().addClass("Text");
    txt.text("Length / m", [1.25, "-44"]);
    txt.group().config({theta: 90, shift: ["-40", 1.75]}).text("Period / s");

    let x = [...range(0.25, 2.2501, 0.25)];
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let p = svg.group();
    let model = p.group().css(".Locus", "#0065fe@2");
    model.locus((x) => 0.965 * x + 0.947, [0, 2.5]).$.hide().addClass("Toggle0");
    model.locus((x) => twoPi * Math.sqrt(x / 9.81), [0, 2.5]).$.hide().addClass("Toggle1");
    p.plot({x:x, y:y}, "5");

    let t = click_cycle.toggle;
    click_cycle(svg.element, 2,
        () => {t(svg, true, 0)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1)},
    );
},

pend_lin: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 1.75, 0, 3.5], grid: [0.25, 0.5], margin: [60, 20, 62, 12]});
    svg.css(".NoStyle", "text");
    svg.tick_label(2, [...range(0, 1.8, 0.25)], 0, "-6", "-20");
    svg.tick_label(1, 0, [...range(0, 3.6, 0.5)], "-6").find("g.LabelY").config({shift: ["-10", "-5"]}).$.find(".Zero").remove();

    let txt = svg.group().addClass("Text");
    txt.group().config({theta: 90, shift: ["-40", 1.75]}).text("Period / s");
    txt = txt.group();
    txt.text("(Length / m)");
    txt.text("1/2", ["64", "10"]).addClass("Small");
    txt.align([0.875, "-44"]);

    let x = [...fn_eval(Math.sqrt, range(0.25, 2.2501, 0.25))];
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let p = svg.group();
    let line = p.group().css(".Locus", "#0065fe@2").locus((x) => 2.01 * x, [0, 1.75]).$.hide();
    p.plot({x:x, y:y}, "5");

    svg.$.on("click", () => line.fadeToggle());
},

});