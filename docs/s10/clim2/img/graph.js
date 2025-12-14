SVG2.cache("s10/clim2/img/graph.js", {

london: (sel) => {
    // Precipitation and temperature data
    let prec = [59, 50, 47, 54, 57, 60, 59, 65, 51, 60, 67, 61];
    let temp = [4.8, 4.9, 6.7, 9.4, 12.7, 15.7, 17.8, 17.3, 15, 11.8, 7.8, 5.3];
    for (let i=0;i<temp.length;i++) // Convert to precipitation coordinates
        temp[i] *= 5;
    temp = zip([...range(0.5, 12)], temp);

    // Draw graph; add 'Toggle' classes
    let svg = new SVG2(sel, {size: [521, 360], lrbt: [0, 12, 0, 90], margin: [62, 62, 28, 12]});
    svg.graph({grid: [1, 5], css: true,
        y: {tick: [0, 91, 10], title: ["Precipitation / mm", "-44"], shift: ["-20", 0]},
        data: [{connect: temp}, {plot: [temp, "4"]}],
    });
    svg.$.find("g.Text, g.LabelY").addClass("Toggle0");
    let g = svg.$.find("g.Series").addClass("Toggle5");
    g.find("g.Locus").addClass("Toggle8");
    g = g.find("circle");
    for (let i=1;i<12;i++) $(g[i]).addClass(i == 1 ? "Toggle6" : "Toggle7");

    // Right-side axis
    // $(svg.$.find("g.Grid line")[12]).addClass("Axis").css({stroke: "black", "stroke-width": "1px"});
    svg.$.find("g.Grid line.Axis").appendTo(svg.$.find("g.Grid"));
    g = svg.tick_label((x, y) => (y/5).toFixed(0), 12, [...range(0, 91, 10)], "6", 12.5).$.find("g.LabelY")[1].graphic;
    g.config({shift: [0, 0]}).css(".Toggle4", {"text-anchor": "start"});
    svg.gtext("Temperature / °C", [".Toggle4", "sans"], [13.4, 45], 90)

    // Draw precipitation bars and month labels
    let months = "JFMAMJJASOND";
    let gm = svg.group().addClass("Text");
    let gp = svg.group().addClass("Toggle1").css({fill: "#0065fe", stroke: "black", "fill-opacity": 0.4});
    for (let i=0;i<12;i++) {
        gm.text1(months.charAt(i), [i + 0.5, "-20"]);
        let p = prec[i];
        p = gp.rect([1, p], [i + 0.5, p/2]);
        if (i) p.addClass(i == 1 ? "Toggle2" : "Toggle3");
    }

    // Layer temperature data over precipitation bars
    g = svg.$.find("g.Series").appendTo(svg.$);
    g.find("g.Locus").css({stroke: "red"});
    g.find("g.Plot").css({fill: "red"});

    // Toggle through graph
    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
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
