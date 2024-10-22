SVG2.cache("p20/vec2d/img/proj.js", {

Q1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.graph(sel, {
        grid: [[0, 14, 1], [0, 14, 1], 1],
        margin: [0.11, 0.04, 0.11, 0.04],
        x: ["", [">", "12"], {interval: 2, length: "8", fixed: 0, offset: [0, "-24"]}],
        y: ["", ["-48", ">"], {interval: 2, length: "8", fixed: 0, offset: ["-12", 0], omitZero: 1}],        
    });
    svg.$.find(".TitleX, .TitleY").css({"text-anchor": "end"});
    let parab = (t) => {
        let x = 8 * t;
        let y = 12.5 - 9.81 / 2 * t * t;
        return [x, y];
    }
    svg.rect([2, 12.5], [-1, 6.25]).css({fill: "tan"}).$.prependTo(svg.$);
    svg.locus(parab, [0, 1.6], 0, 0).css({stroke: "black"});
    let arrow = {tail: 8 * svg.pixelX};
    svg.arrow([13, 11], [13, 7], arrow).addClass("Acc");
    svg.arrow([0, 12.5], [12.8, 0], arrow).addClass("Disp");
    svg.arrow([0, 12.5], [4, 12.5], arrow).addClass("Vel");
    let v = new RArray(12.8, 0);
    svg.arrow(v.minus(vec2d(17.6/2, -62.9)), v, arrow).addClass("Vel");
    svg.text("m", [13, 13]).addClass("Annotate");
    svg.final();

    clickCycle(svg.element, 4,
        () => svg.$.find(".Vel, .Acc, .Disp").fadeOut(),
        () => $(svg.$.find(".Vel")[0]).fadeIn(),
        () => svg.$.find(".Acc").fadeIn(),
        () => svg.$.find(".Disp").fadeIn(),
        () => $(svg.$.find(".Vel")[1]).fadeIn(),
    );
},

});
