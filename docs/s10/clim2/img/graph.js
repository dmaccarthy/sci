SVG2.cache("s10/clim2/img/graph.js", {

london: (sel) => {
    let prec = [59, 50, 47, 54, 57, 60, 59, 65, 51, 60, 67, 61];
    let temp = [4.8, 4.9, 6.7, 9.4, 12.7, 15.7, 17.8, 17.3, 15, 11.8, 7.8, 5.3];
    for (let i=0;i<temp.length;i++) temp[i] *= 5;
    temp = zip([...range(0.5, 12)], temp);

    let yAx = "Toggle4";
    let svg = new SVG2(sel, {size: [521, 360], lrbt: [0, 12, 0, 90], margin: [62, 62, 28, 12]});
    svg.graph({grid: [1, 5], css: true,
        y: {tick: [0, 91, 10], title: ["Precipitation / mm", "-44"], shift: ["-10", "-5"]},
        data: [
            {connect: temp},
            {plot: [temp, "5"]},
        ],
    });
    svg.$.find("g.Text, g.LabelY").addClass("Toggle0");
    temp = svg.$.find("g.Series").addClass("Toggle5");
    temp.find("g.Locus").addClass("Toggle8");
    temp = temp.find("circle");
    for (let i=1;i<12;i++) $(temp[i]).addClass(i == 1 ? "Toggle6" : "Toggle7");

    $(svg.$.find("g.Grid line")[12]).addClass("Axis");
    let T = svg.group().addClass(yAx + " Text");
    T.group().config({theta: 90}).text("Temperature / °C");
    let g = svg.tick_label((x, y) => (y/5).toFixed(0), 12, [...range(0, 91, 10)], "6", 12.3).$.find("g.LabelY")[1].graphic;

    let months = "JFMAMJJASOND";
    let gm = svg.group().addClass("Text");
    let gp = svg.group().addClass("Toggle1");
    for (let i=0;i<12;i++) {
        gm.text(months.charAt(i), [i + 0.5, "-20"]);
        let p = prec[i];
        p = gp.rect([0.8, p], [i + 0.5, p/2]);
        if (i) p.addClass(i == 1 ? "Toggle2" : "Toggle3");
    }

    svg.css_map("grid", "text");
    g.addClass(yAx).config({shift: [0, "-5"]}).css({"text-anchor": "start"});
    gp.css({fill: "#0065fe", stroke: "black", "fill-opacity": 0.4});
    T.recenter([13.5, 45]);
    g = svg.$.find("g.Series").appendTo(svg.$);
    g.find("polyline").css({stroke: "red"});
    g.find("circle").css({fill: "red"});

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2, 3, 4, 5, 6, 7, 8)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
        () => {t(svg, true, 4)},
        () => {t(svg, true, 5)},
        () => {t(svg, true, 6)},
        () => {t(svg, true, 7)},
        () => {t(svg, true, 8)},
    );

},

});
