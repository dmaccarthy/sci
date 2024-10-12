SVG2.cache("p20/da/img/eqn.js", {

scatter: (sel) => {
    $(sel).attr({width: 480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        grid: [[0, 5, 0.5], [0, 12, 1], 1],
        margin: [0.16, 0.03, 0.12, 0.05],
        x: ["Current / A", [">", "12"], {interval: 1, length: "8", fixed: 0, offset: [0, "-24"]}],
        y: ["Voltage / V", ["-48", ">"], {interval: 2, length: "8", fixed: 0, offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let x = [...range(0, 5.01, 0.5)];
    let y = [11.3, 11.1, 9.0, 8.8, 8.1, 5.8, 6.1, 4.9, 4.6, 2.5, 1.8];
    svg.line([0, 11.4], [5, 2]);
    svg.plot({x:x, y:y}, "6");
    svg.final();

    svg.$.on("click", (ev) => {
        $(ev.currentTarget).find("g.Plot").fadeToggle();
    });
},

});