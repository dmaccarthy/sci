save("p20/vec2d/img/arith", {

Ex1: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(50, 60), vec2d(40, 340)],
        {omitAxes: 1, component: 1, resultant: 1, res_component: 1}, 5, -25, -30,
    );
    let e = svg.items[0].element;
    let attr = {interval: 20, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-25, 75], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-30, 70], ticks: attr}, e);
    let c1 = svg.$.find(".Component").hide();
    let c2 = svg.$.find(".Res_Component").hide();
    let r = svg.$.find(".Resultant");
    let g = svg.group();
    svg.symbol("d", {vec:1, delta:1, q4: 1}, [5, 30], g).css({fill: "red"});
    svg.symbol("d", {vec:1, delta:1, q4: 2}, [45, 45], g).css({fill: "red"});
    svg.symbol("d", {vec:1, delta:1}, [35, 6], g).css({fill: "#0065FE"});
    svg.text("m", [65, 65]).addClass("Annotate");
    svg.final();

    clickCycle(svg.element, 0,
        () => {c2.fadeOut(); g.$.fadeIn()},
        () => {c1.fadeIn(); g.$.fadeOut(); r.fadeOut()},
        () => {c2.fadeIn()},
        () => {c1.fadeOut()},
        () => {r.fadeIn()},
    );
},

Trig: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = applet.vecDiagram.diagram(sel,
        [vec2d(50, 60), vec2d(40, 340)],
        {omitAxes: 1, resultant: 1}, 5, -25, -30,
    );
    let e = svg.items[0].element;
    let attr = {interval: 20, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-25, 75], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-30, 70], ticks: attr}, e);
    svg.text("50 m", [7, 29]).addClass("Annotate").css({fill: "red"});
    svg.text("40 m", [50, 39]).addClass("Annotate").css({fill: "red"});
    let g = svg.group();
    svg.text("60°", [14, 39], g);
    svg.text("20°", [40, 41], g);
    svg.text("100°", [30, 36], g);
    g.$.find("text").addClass("Annotate").css({"font-size": "16px"});
    let y = 50 * sin(60);
    svg.line([5, y], [45, y]).css({stroke: "black"});
    svg.final();
},

Ex2: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let Fg = 98.1, Fn = Fg * cos(10);
    let svg = applet.vecDiagram.diagram(sel,
        [[0, -Fg], vec2d(Fn, 80), vec2d(8, 170)],
        {omitAxes: 1, component: 1, resultant: 1, arrow: {shape: 2, tail: 2, head: 6}}, 7.5, -67.5, -127.5,
    );
    let e = svg.items[0].element;
    let attr = {interval: 15, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-67.5, 82.5], ticks: attr}, e);
    attr.offset = ["-14", 0];
    svg.axis({y: [-127.5, 22.5], ticks: attr}, e);
    let c = svg.$.find(".Component").hide();
    svg.$.on("click", () => c.fadeToggle());
    svg.symbol("F", {vec:1, q4: "g"}, [-18, -50]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [20, -50]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "f"}, [18, 10]).css({fill: "red"});
    svg.text("N", [75, -120]).addClass("Annotate");
    svg.final();
},

});