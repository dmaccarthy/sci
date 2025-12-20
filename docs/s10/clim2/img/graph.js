SVG2.cache("s10/clim2/img/graph.js", {

london_uk: (sel) => {
    let svg = new SVG2(sel, {size: [521, 360], lrbt: [0, 12, 0, 90], grid: [1, 5], margin: [62, 62, 28, 12]});

    // Draw and label axes
    css(svg.find("g.Grid").line([12, 0], [12, 90]), "black@1");
    let opt = {size: ["-6", "6"], label: 0, shift: "-9", css: 15};
    svg.ticks({x: [0, 12.1, 1], css: 15, label: x => "JFMAMJJASOND".charAt(x), shift: [0.5, "-6"]}).css();
    svg.ticks({y: [0, 91, 10], ...opt}).css(".Toggle0");
    let g = svg.ticks({x: 12, y: [0, 91, 10], ...opt, label: x => (x/5).toFixed(0), shift: "9"}).css(".Toggle4");
    g.find("g.Labels").css({"text-anchor": "start"});
    g = svg.group("sans", 18);
    g.text("Precipitation / mm", [-1.2, 45, "b"], 90, ".Toggle0");
    g.text("Temperature / °C", [13, 45, "t"], 90, ".Toggle4");

    // Precipitation bars
    let prec = [59, 50, 47, 54, 57, 60, 59, 65, 51, 60, 67, 61];
    g = svg.group("#0065fe", "black@1", {"fill-opacity": 0.4});
    for (let i=0;i<prec.length;i++)
        css(g.rect([1, prec[i]], [i, 0, "bl"]), `.Toggle${i > 1 ? 3 : i+1}`);

    // Temperature data
    let temp = [4.8, 4.9, 6.7, 9.4, 12.7, 15.7, 17.8, 17.3, 15, 11.8, 7.8, 5.3];
    let x = range(0.5, 12);
    let data = zip([...x], [...fn_eval(t => 5*t, temp)]);
    css(svg.poly(data), "none", "red@2", ".Toggle8");
    let pts = svg.plot(data, "4").css("red").find_all("g");
    for (let i=0;i<pts.length;i++) pts[i].css(`.Toggle${i > 1 ? 7 : i+5}`);

    svg.click_toggle(9, 0);
},



});
