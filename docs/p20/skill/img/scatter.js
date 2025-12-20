SVG2.cache("p20/skill/img/scatter.js", {

wtLoss: (sel, tog) => {
    let svg = new SVG2(sel, {size: [640, 400], lrbt: [0, 30, 77, 82], grid: [1, 0.25], margin: [64, 10, 54, 10]});
    let e = svg.find("g.Grid").$;
    css($(e.find("line")[30]), "black@1").appendTo(e);

    // Tick marks and labels
    let opt = {size: ["-6", 0], label: 0, shift: "-8", css: 15};
    svg.ticks({x: [0, 31, 3], ...opt}).shift_by([0, 77]).css(".Toggle0");
    svg.ticks({y: [77, 82.1, 1], ...opt}).css(".Toggle1");
    let g = svg.group("sans", 18);
    g.text("Time / days", [15, 76.5, "t"], 0, ".Toggle0");
    g.text("Mass / kg", ["-36", 79.5, "b"], 90, ".Toggle1");

    // Data
    let x = [...range(3, 28, 3)];
    let y = [80.8, 80.8, 80, 79.8, 80, 79.7, 79.1, 79.3, 78.5];
    let eq = lin_reg_xy(x, y).fn;
    css(svg.line([0, eq(0)], [30, eq(30)]), ".Toggle3", "#0065fe@2");
    svg.plot({x: x, y: y}, "5").css(".Toggle2", "#0065fe", "black@1");

    if (tog) svg.click_toggle(4, 0);
},

});