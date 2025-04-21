SVG2.cache("p20/skill/img/eqn.js", {

scatter: (sel) => {
    let x = [...range(0, 5.01, 0.5)];
    let y = [11.3, 11.1, 9.0, 8.8, 8.1, 5.8, 6.1, 4.9, 4.6, 2.5, 1.8];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, 0, 12], margin: [56, 10, 28, 12]});
    svg.graph({grid: [0.5, 1], css: true,
        x: {tick: [0, 5.1, 1], title: ["Current / A", [4.4, "10"]], shift: [0, "-20"]},
        y: {tick: [0, 13, 2], title: ["Voltage / V", ["-36", 10]], shift: ["-10", "-5"]},
        data: [
            {connect: [[0, 11.4], [5, 2]]},
            {plot: [zip(x, y), "6"]}
        ]
    });

    svg.$.on("click", (ev) => {
        $(ev.currentTarget).find("g.Plot").fadeToggle();
    });

},

});
