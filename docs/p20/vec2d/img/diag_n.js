SVG2.cache("p20/vec2d/img/diag_n.js", {

Ex1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [[5, -4]],
        {omitAxes: 1, shift: [-3, 2]},
        0.5, -5, -5
    );
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-5, 5], ticks: attr});
    attr.offset = ["-14", 0];
    svg.axis({y: [-5, 5], ticks: attr});
    svg.line([-3, 2], [-1, 2]).addClass("ZeroDeg").css({stroke: "black", "stroke-width": 2});
    svg.final();

    clickCycle(svg.element, 2,
        () => svg.$.find(".Vector, .ZeroDeg").fadeOut(),
        () => svg.$.find(".ZeroDeg").fadeIn(),
        () => svg.$.find(".Vector").fadeIn(),
    );
},

Ex2: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(35, 125)],
        {omitAxes: 1},
        2.5, -30, -10
    );
    let attr = {interval: 5, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-30, 20], ticks: attr});
    attr.offset = ["-14", 0];
    svg.axis({y: [-10, 40], ticks: attr});
    svg.final();
    svg.$.on("click", () => svg.$.find(".Vector").fadeToggle());
},

Ex3: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let p = vec2d(25, 62);
    $(sel).attr({width: 400, height: 400, "data-aspect": 1});
    let svg = applet.vecDiagram.diagram(sel,
        [p, vec2d(30, -70)],
        {omitAxes: 1, resultant: 1}, 1.5, -4.5, -7.5
    );
    let attr = {interval: 3, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-4.5, 25.5], ticks: attr});
    attr.offset = ["-14", 0];
    svg.axis({y: [-7.5, 22.5], ticks: attr});
    svg.line(p, p.plus([5,0])).after("g.Grid").addClass("ZeroDeg").css({stroke: "black", "stroke-width": 2});
    svg.final();

    clickCycle(svg.element, 4,
        () => svg.$.find(".ZeroDeg, .Resultant, .Vector").fadeOut(),
        () => $(svg.$.find(".Vector")[0]).fadeIn(),
        () => svg.$.find(".ZeroDeg").fadeIn(),
        () => $(svg.$.find(".Vector")[1]).fadeIn(),
        () => svg.$.find(".Resultant").fadeIn(),
    );
},

});
