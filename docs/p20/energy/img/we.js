SVG2.cache("p20/energy/img/we.js", {

work: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 20, -400, 400], margin: [68, 12, 12, 12]});
    svg.graph({grid: [1, 50],
        x: {tick: [0, 21, 5], title: ["Position / m", [17, 25]], shift: [0, "-22"]},
        y: {tick: [-400, 401, 100], title: ["Force / N", "-50"], shift: ["-10", "-4"]},
        data: [
            {connect: [[0, 0], [5, 400], [10, 400], [20, -400]]},
        ]
    });
    svg.$.find("g.LabelX text.Zero").remove();
    let shade = svg.group();
    let g = shade.group().addClass("Toggle0");
    g.poly([[0, 0], [5, 400], [5, 0]], 1);
    g.line([5, 400], [5, 0]);
    g.ctext(["1000 J", [3, 75]]);

    g = shade.group().addClass("Toggle1");
    g.rect([5, 400], [7.5, 200]);
    g.line([10, 400], [10, 0]);
    g.ctext(["2000 J", [7.5, 200]]);

    g = shade.group().addClass("Toggle2");
    g.poly([[10, 400], [10, 0], [15, 0]], 1);
    g.ctext(["1000 J", [12, 75]]);

    g = shade.group().addClass("Toggle3");
    g.poly([[20, -400], [20, 0], [15, 0]], 1);
    g.ctext(["–1000 J", [18, -75]]);

    g = shade.$.insertBefore("g.Series").css({fill: "#0065fe", "fill-opacity": 0.2, stroke: "none"});
    g.find("line").css({stroke: "#0065fe"});
    g.find("text").css({"fill-opacity": 1});

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2, 3)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
    );

},

tennis: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 80, 0, 90], margin: [58, 12, 54, 12]});
    svg.graph({grid: [5, 5],
        x: {tick: [0, 81, 10], title: ["Position / cm", [40, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 91, 10], title: ["Force / N", "-40"], shift: ["-10", "-4"]},
        data: [{connect: [[0, 0], [40, 80], [50, 80], [75, 0]]}],
    });
},

F1: (sel) => {
    $(sel).attr({width: 512, height: 256, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.5, 2.75);
    svg.circle(0.8, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    let g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.text("Waste", [2.4, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.arrow([1.25, 0], 0.8, {tail: "6"}, g);
    let css = {"font-size": "18px"};
    svg.text("75.0 J", [0.45, -0.15], g).css(css);
    svg.text("30.0 J", [1.55, -0.15], g).css(css);
    svg.final();
},

Q1: (sel) => {
    SVG2.ebg(sel, 80, 10, [
        ["+W", (t) => 75 * (1 - t * t), "red"],
        ["E_k", true],
        ["–W", (t) => 30 * t * t, "red"],
    ], {E: 75, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

F2: (sel) => {
    $(sel).attr({width: 360, height: 256, "data-aspect": "360/256"});
    let svg = new SVG_Animation(sel, -0.5, 1.9);
    svg.circle(0.8, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    let g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.text("4.46 kJ", [0.45, -0.15], g).css({"font-size": "18px"});
    svg.final();
},

Q2: (sel) => {
    let Ei = 0.075 * 12.5;
    let W = 5.4 - Ei;
    SVG2.ebg(sel, 6, 1, [
        ["+W", (t) => W * (1 - t * t), "red"],
        ["E_k", true],
    ], {E: 5.4, unit: "kJ", duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

F4: (sel) => {
    $(sel).attr({width: 512, height: 256, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.5, 2.75, -0.3);
    svg.circle(0.75, [1.05, 0.55]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    svg.symbol("E", {q4: "g", scale: 1}, [1, 1.1]).css({fill: "#0065FE"});

    let g = svg.group().css({fill: "#0065FE"}).config({position: [1.05, 0.55], theta: 90});
    svg.arrow([-0.4, 0], 0.8, {tail: "6"}, g);
    let css = {"font-size": "18px"};
    svg.text("13.7 J", [-0.1, 0.1], g).css(css);
    
    g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.text("Waste", [2.4, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.arrow([1.25, 0], 0.8, {tail: "6"}, g);
    svg.text("20.0 J", [0.4, -0.1], g).css(css);
    svg.text("6.35 J", [1.7, -0.1], g).css(css);
    svg.final();
},

Q4: (sel) => {
    let Eg = 98.1 * sin(8);
    SVG2.ebg(sel, 24, 2, [
        ["+W", (t) => 20 * (1 - t), "red"],
        ["E_k", (t) => 1 - 2 * Math.abs(t - 0.5)],
        ["E_g", (t) => Eg * t],
        ["–W", true, "red"],
    ], {E: 20, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6", 2]});
},

ramp : (sel) => {
    svg = new SVG2(sel, {size: [480, 80], lrbt: [0, 2.15, -0.02], margin: 2});
    svg.$.addClass("SVG2");
    let pt = vec2d(2, 8);
    svg.poly([pt, [pt[0], 0], [0, 0]], 1).css({"stroke-width": "2px"});
    svg.text("8.00°", [0.22, 0.1]);

    let [BD, IT, SM] = [1, 2, 4];
    let arr = ["→", SM + BD, [0, "20"]];
    let g = svg.group().config({shift: [0.75, 0.18], theta: 8});
    g.symbol(["d", BD], arr, ["Δ", 0, ["-20", 0]]).$.addClass("Large");
    g.text("= +2.00 m", [0.37, 0]).addClass("Large Symbol");
    svg.symbol(["h", IT], ["f", SM + IT, ["12", "-12"]]).config({shift: [2.05, 0.12]}).$.addClass("Large");
},

});