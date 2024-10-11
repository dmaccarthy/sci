save("p20/skill/img/scatter", {

wtLoss: (sel) => {
    $(sel).attr({width: 640, height: 400, "data-aspect": "1.6"});

    let x = [...range(3, 28, 3)];
    let y = [80.8, 80.8, 80, 79.8, 80, 79.7, 79.1, 79.3, 78.5];
    let svg = new SVG_Animation(sel, -4, 31, 76, 82.25);
    svg.grid([0, 30, 1], [77, 82, 0.25]);
    svg.find("line.Axis").$.removeClass("Axis");
    let axes = svg.group().attr({id: "Axes"});
    svg.axis({y: [77, 82],
        title: {text: "Mass / kg", position: [-2.85, 81.9]},
        ticks: {interval: 1, length: "12", fixed: 0, offset: [-1, 0]},
    }, axes);
    svg.axis({x: [0, 30], y: 77,
        title: {text: "Time / days", position: [30, 76.25]},
        ticks: {interval: 3, length: "12", fixed: 0, offset: [0, -0.4]},
    }, axes);
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let bestfit = svg.line([0, 81.1], [30, 78.5]);
    let marks = svg.plot({x:x, y:y}, "6");
    let title = svg.$.closest("p").children("span");
    svg.final();

    if (svg.$.attr("data-interact")) clickCycle(svg.element, -1,
        () => {axes.$.fadeOut(); marks.$.fadeOut(); bestfit.$.fadeOut(); title.fadeOut()},
        () => {title.fadeIn()},
        () => {axes.$.fadeIn()},
        () => {marks.$.fadeIn()},
        () => {bestfit.$.fadeIn()},
    );
},

});