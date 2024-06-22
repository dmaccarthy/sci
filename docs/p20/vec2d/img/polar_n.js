save("p20/vec2d/img/polar_n", { // Polar & Cartesian notes

Ex1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [[8, -2.5]],
        {omitAxes: 1, component: 1}, 0.5, -1.5, -6,
    );
    let e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-1.5, 8.5], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-6, 4], ticks: attr}, e);
    svg.symbol("v", {vec:1}, [4, -2]).css({fill: "red"});
    svg.symbol("v", {vec:1, q4: "x"}, [4, 0.8]).css({fill: "#FF6060"});
    svg.symbol("v", {vec:1, q4: "y"}, [7.2, -1.2]).css({fill: "#FF6060"});
    svg.text("θ", [2.5, -0.5]).addClass("Annotate");
    svg.text("m/s", [1, 3]).addClass("Annotate");
    svg.final();
},

Ex2: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(50, 160)],
        {omitAxes: 1, component: 1}, 3, -51, -27,
    );
    let e = svg.items[0].element;
    let attr = {interval: 6, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-51, 9], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-27, 33], ticks: attr}, e);
    svg.symbol("F", {vec:1}, [-24, 14]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "x"}, [-24, -7]).css({fill: "#FF6060"});
    svg.symbol("F", {vec:1, q4: "y"}, [-42, 7]).css({fill: "#FF6060"});
    svg.text("θ", [1, 3]).addClass("Annotate");
    svg.text("N", [3, 30]).addClass("Annotate");
    svg.final();
},

});