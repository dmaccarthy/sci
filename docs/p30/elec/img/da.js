save("p30/elec/img/da", {

pend: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 2.5, 0.25], [0, 3.5, 0.5], 1],
        margin: [0.2, 0.03, 0.24, 0.05],
        x: ["Length / m", [">", "-48"], {interval: 0.5, length: "8", fixed: 1, offset: [0, "-24"]}],
        y: ["Period / s", ["-54", ">"], {interval: 0.5, length: "8", fixed: 1, offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let x = [...range(0.25, 2.2501, 0.25)];
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let tog = [
        svg.locus((x) => 0.965 * x + 0.947, [0, 2.5]).$.hide(),
        svg.locus((x) => twoPi * Math.sqrt(x / 9.81), [0, 2.5]).$.hide()
    ];
    svg.plot({x:x, y:y}, "6");
    svg.final();

    clickCycle(svg.element, 2,
        () => {clickCycle.toggle(tog, true, 0)},
        () => {clickCycle.toggle(tog, false, 0), clickCycle.toggle(tog, true, 1)},
        () => {clickCycle.toggle(tog, false, 1)},
    );
},

pend_lin: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 1.75, 0.25], [0, 3.5, 0.5], 1],
        margin: [0.2, 0.03, 0.27, 0.05],
        x: ["(Length / m)", [1.58, "-60"], {interval: 0.5, length: "8", fixed: 1, offset: [0, "-24"]}],
        y: ["Period / s", ["-54", ">"], {interval: 0.5, length: "8", fixed: 1, offset: ["-12", 0]}],
    });
    svg.text("1/2", [1.65, -0.6]);
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let x = [0.5, 0.707, 0.866, 1, 1.118, 1.225, 1.323, 1.414, 1.5];
    let y = [1.01, 1.43, 1.74, 2.01, 2.24, 2.45, 2.65, 2.85, 3.0];
    let tog = svg.locus((x) => 2.01 * x, [0, 1.75]).$.hide();
    svg.plot({x:x, y:y}, "6");
    svg.final();

    svg.$.on("click", () => tog.fadeToggle());
},

});