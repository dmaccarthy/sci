SVG2.cache("p20/vec2d/img/mag.js", { // Solutions for Magnitude & Direction assignment

hiker: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": 1});
    let svg = applet.vecDiagram.diagram(sel,
        [[7, -4]],
        {omitAxes: 1, shift: [-2, 5]}, 0.5, -3.5, -2,
    );
    let e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-3.5, 6.5], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-2, 8], ticks: attr}, e);
    svg.line([1, 5], [-2, 5], "5").css({stroke: "black", "stroke-width": 2}).after("g.Grid");
    svg.plot([[5, 1], [-2, 5]], "5").after("g.Grid").css({"fill-opacity": 0.7, stroke: "black"});

    svg.symbol("d", {vec:1, delta:1}, [2, 3.5]).css({fill: "red"});
    svg.symbol("d", {vec:1, q4: "i"}, [-2.7, 5]).css({fill: "#0065FE"});
    svg.symbol("d", {vec:1, q4: "f"}, [5.7, 1]).css({fill: "#0065FE"});
    svg.text("θ", [-0.6, 4.6]).addClass("Annotate");
    svg.text("km", [0.5, -1.5]).addClass("Annotate");
    svg.final();
},

soccer: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": 1});
    let svg = applet.vecDiagram.diagram(sel,
        [[-10, 17.3]],
        {omitAxes: 1}, 1, -15, -2,
    );
    let e = svg.items[0].element;
    let attr = {interval: 2, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-15, 5], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-2, 18], ticks: attr}, e);
    svg.text("m", [0.7, 17]).addClass("Annotate");
    svg.final();
}
 
});
