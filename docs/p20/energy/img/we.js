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

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
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
    let svg = new SVG2(sel, {size: [500, 256], lrbt: [-1.5, 1.6]}).css(".NoStyle");
    let L = 0.75;
    svg.energy_flow({radius: 0.75,
        labels: [
            ["$E_k", [0, 0]],
            ["Food", [-1.25, 0], "red"],
            ["Waste", [1.3, 0], "red"],
        ],
        arrows: [
            [L, [-0.6, 0], 0, ["75.0 J", ["6", "-24"]], "red"],
            [L, [0.6, 0], 0, ["30.0 J", ["-6", "-24"]], "red"],
        ]
    });
},

Q1: (sel) => {
    SVG2.ebg(sel, 80, 10, [
        ["+W", (t) => 75 * (1 - t * t), "red"],
        ["E_k", true],
        ["–W", (t) => 30 * t * t, "red"],
    ], {E: 75, duration: 3, margin: [32, 4, 40, 16], label: [0, "-6"]});
},

F2: (sel) => {
    let svg = new SVG2(sel, {size: [400, 260], lrbt: [-8.5, 4.5]}).css(".NoStyle");
    svg.energy_flow({radius: 4,
        labels: [
            ["$E_k", [0, 0]],
            ["Food", [-7, 0], "red"],
        ],
        arrows: [
            [4, [-3, 0], 0, ["4.46 kJ", ["6", "-24"]], "red"],
        ]
    });
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
    let svg = new SVG2(sel, {size: [500, 256], lrbt: [-1.5, 1.5]}).css(".NoStyle");
    let L = 0.7;
    svg.energy_flow({radius: 0.75,
        labels: [
            ["$E_k", [0, -0.5]],
            ["$E_g", [0, 0.5]],
            ["Food", [-1.15, -0.5], "red"],
            ["Waste", [1.15, -0.5], "red"],
        ],
        arrows: [
            [L, [0, 0], 90, ["13.7 J", ["-12", "-24"]]],
            [L, [-0.5, -0.5], 0, ["20.0 J", ["6", "14"]], "red"],
            [L, [0.5, -0.5], 0, ["6.35 J", ["-18", "14"]], "red"],
        ]
    });
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
    svg = new SVG2(sel, {size: [480, 80], lrbt: [0, 2.15, -0.02], margin: 2}).css(".NoStyle");
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