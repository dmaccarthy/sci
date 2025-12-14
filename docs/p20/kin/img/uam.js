SVG2.cache("p20/kin/img/uam.js", {

vt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, 0, 24], margin: [56, 10, 28, 12]});
    svg.graph({grid: [0.5, 2],
        x: {tick: [0, 5.1, 1], title: ["Time / s", [4.5, "10"]], shift: [0, "-20"]},
        y: {tick: [0, 25, 4], title: ["Velocity / (m/s)", ["-36", 12]], shift: ["-20", 0]},
        data: [{connect: [[0, 12], [5, 20]]}]
    });
    svg.poly([[0, 0], [0, 12], [5, 20], [5,0]]).css({fill: "#0065fe", "fill-opacity": 0.2}).insertAfter(svg.$.find("g.Grid"));
},

upDown: (sel) => {
    let t = 20 / 9.81;
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 2.25, -12, 12], margin: [56, 10, 12, 12]});
    svg.graph({grid: [0.25, 2],
        x: {tick: [0, 2.3, 0.5], dec: 1, title: ["Time / s", [2, "10"]], shift: [0, "-20"]},
        y: {tick: [-12, 13, 4], title: ["Velocity / (m/s)", ["-36", 0]], shift: ["-20", 0]},
        data: [{connect: [[0, 10], [t, -10]]}]
    });
    svg.$.find("g.LabelX .Zero").remove();
    svg.poly([[0, 10], [t, -10], [t, 0], [0, 0]]).css({fill: "#0065fe", "fill-opacity": 0.2}).insertAfter(svg.$.find("g.Grid"));
    let hide = [svg.$.children("polyline")[0], svg.$.find("g.LabelX")[0]];
    for (let e of hide) $(e).hide();

    svg.$.on("click", () => {
        for (let e of hide) $(e).fadeToggle();
    });
},

zag: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 5, -9, 9], margin: [32, 10, 4, 4]});
    svg.graph({grid: [0.5, 1.5],
        x: {title: ["Time", [4.5, "10"]], shift: [0, "-20"]},
        y: {title: ["Velocity", ["-12", 0]], shift: ["-20", 0]},
        data: [{connect: [[0, 0], [1, -8], [3, 6], [4.5, -6], [5, -2.5]]}]
    });
},

});