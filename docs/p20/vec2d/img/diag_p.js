SVG2.cache("p20/vec2d/img/diag_p.js", { // Solutions for Vector Diagrams assignment

Q1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [[-2, 4]],
        {omitAxes: 1, shift: [3, -2], component: 1}, 0.5, -3, -5,
    );
    let e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-3, 7], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-5, 5], ticks: attr}, e);
    let prev = svg.$.find("g.Grid");
    svg.line([3, -2], [5, -2], "5").$.css({stroke: "black", "stroke-width": 2}).insertAfter(prev);
    svg.plot([[3, -2], [1, 2]], "5").$.insertAfter(prev);
    svg.symbol("d", {vec:1, delta:1}, [2.7, 0.5]).css({fill: "red"});
    svg.symbol("d", {vec:1, delta:1, q4: "x"}, [2, -3]).css({fill: "#FF6060"}).addClass("HideX");
    svg.symbol("d", {vec:1, delta:1, q4: "y"}, [0, 0]).css({fill: "#FF6060"}).addClass("HideY");
    svg.symbol("d", {vec:1, q4: "i"}, [3.3, -2.7]).css({fill: "#0065FE"});
    svg.symbol("d", {vec:1, q4: "f"}, [1, 2.7]).css({fill: "#0065FE"});
    svg.text("θ", [3.3, -1.7]).addClass("Annotate");
    svg.text("m", [0.5, 4.5]).addClass("Annotate");
    let xy = svg.$.find("polygon.Component").addClass("HideX");
    $(xy[1]).removeClass("HideX").addClass("HideY");
    svg.final();

    clickCycle(svg.element, 3,
        () => svg.$.find(".HideX, .HideY").fadeOut(),
        () => svg.$.find(".HideX").fadeIn(),
        () => svg.$.find(".HideY").fadeIn(),
    );
},

Q2: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let attr = {interval: 10, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(80, 180-32)],
        {omitAxes: 1}, 5, -85, -30,
    );
    let e = svg.items[0].element;
    svg.axis({x: [-85, 15], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-30, 70], ticks: attr}, e);
    svg.text("32.0°", [-18, 3]).addClass("Annotate");
    svg.text("km/h", [7, 60]).addClass("Annotate");
    svg.final();
},

Q3: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(15, -65)],
        {omitAxes: 1}, 1, -7, -17,
    );
    let attr = {interval: 2, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    let e = svg.items[0].element;
    svg.axis({x: [-7, 13], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-17, 3], ticks: attr}, e);
    svg.text("65.0°", [3, -2]).addClass("Annotate");
    svg.text("kN", [12, 0.7]).addClass("Annotate");
    svg.final();
},

Q4: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let attr = {interval: 4, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(25, 45), vec2d(35, 192)],
        {omitAxes: 1, resultant: 1}, 2, -18, -10,
    );
    let e = svg.items[0].element;
    svg.axis({x: [-18, 22], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-10, 30], ticks: attr}, e);
    svg.text("m", [2, 28]).addClass("Annotate");
    svg.symbol("d", {vec:1, delta:1}, [-10, 2]).css({fill: "#0065FE"});
    svg.symbol("d", {vec:1, delta:1, q4: 1}, [10, 5]).css({fill: "red"});
    svg.symbol("d", {vec:1, delta:1, q4: 2}, [2, 18]).css({fill: "red"});
    svg.final();

},

Q5: (sel) => { // Solution for #5 of Vector Diagrams assignment
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [[0, -3.5], vec2d(3.4, 76)],
        {omitAxes: 1, resultant: 1}, 0.25, -2.25, -4.25,
    );
    let e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-2.25, 2.75], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-4.25, 0.75], ticks: attr}, e);
    svg.text("N", [2.6, 0.2]).addClass("Annotate");
    svg.symbol("F", {vec:1, q4: "g"}, [-0.5, -1.5]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [0.8, -2]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "net"}, [0.5, 0.4]).css({fill: "#0065FE"});
    svg.final();
}

});
