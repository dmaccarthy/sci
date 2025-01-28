SVG2.cache("p20/kin/img/graph.js", {

bike: (sel) => {
    let pts = [[0, -5], [1, -2], [2, 1], [3, 4], [4, 7]];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -6, 8], margin: [54, 10, 10, 10]});
    svg.graph({grid: [0.5, 1], css: true,
        x: {tick: [0, 4.1, 1], title: ["Time / s", [3.5, "12"]], shift: [0, "-24"]},
        y: {tick: [-6, 8.1, 2], title: ["Position / m", "-36"], shift: ["-10", "-5"]},
        data: [
            {connect: [pts[0], pts[4]]},
            {plot: [pts, "5"]},
        ]
    });
    svg.$.find("g.LabelX text.Zero").remove();
},

dt: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 50], margin: [32, 2, 2, 2]});
    svg.graph({grid: [1, 5],
        x: {tick: [0, -1, 2], title: ["Time / s", [9, "12"]]},
        y: {tick: [0, -1, 2], title: ["Position / m", "-16"]},
        data: [
            {connect: [[0, 5], [10, 20]]},
            {connect: [[0, 10], [10, 50]]},
            {connect: [[0, 40], [10, 5]]},
            {connect: [[0, 28], [10, 28]]},
            {locus: [(x) => x * (2 + x / 2), [0, Math.sqrt(104) - 2]]},
            {locus: [(x) => 10 + x * (8 - x / 2), [0, 10]]},
        ]
    });
    svg.$.find("g.LabelX text.Zero, g.Ticks").remove();
    let g = svg.$.find("g.Series").css({fill: "none", "stroke-width": "3px"});
    let lines = g.find("g.Locus");
    let color = ["#0065fe", "red", "green", "cyan", "gold", "violet"];
    for (let i=0;i<lines.length;i++) {
        $(lines[i]).addClass(`Toggle${i}`).css({stroke: color[i]});
    }
    svg.addClass("NoStyle").css_map("grid", "text");

    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, true, 0, 1, 2, 3, 4, 5)},
        () => {t(svg, false, 1, 2, 3, 4, 5)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1); t(svg, true, 2)},
        () => {t(svg, false, 2); t(svg, true, 3)},
        () => {t(svg, false, 3); t(svg, true, 4)},
        () => {t(svg, false, 4); t(svg, true, 5)},
    );

},

vt: (sel) => { // Motion of an skydiver v-t graph
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 28], margin: [56, 10, 26, 12]});
    svg.graph({grid: [0.5, 2], css: true, appendAxes: 1,
        x: {tick: [0, 8.1, 1], title: ["Time / s", [7, "10"]], shift: [0, "-22"]},
        y: {tick: [0, 29, 4], title: ["Velocity / (m/s)", "-40"], shift: ["-10", "-4"]},
        data: [{connect: [[0, 8], [4, 24], [8, 24]]}],
    });
    svg.$.find("g.LabelX text.Zero").remove();
    let g = svg.group().css({stroke: "none", fill: "#0065fe", "fill-opacity": 0.3});
    g.$.insertBefore(svg.$.find("g.Grid line.Axis")[0]);
    g.poly([[0, 8], [1, 12], [1, 0], [0, 0]], 1).addClass("Toggle0");
    g.poly([[2, 16], [1, 12], [1, 0], [2, 0]], 1).addClass("Toggle1");
    g.poly([[2, 16], [3, 20], [3, 0], [2, 0]], 1).addClass("Toggle2");
    g.poly([[4, 24], [3, 20], [3, 0], [4, 0]], 1).addClass("Toggle3");
    g.rect([1, 24], [4.5, 12]).addClass("Toggle4");
    g.rect([3, 24], [6.5, 12]).addClass("Toggle5");
    g.$.find("*").hide();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, false, 0, 1, 2, 3, 4, 5)},
        () => {t(svg, true, 0, 1, 2, 3)},
        () => {t(svg, false, 1, 2, 3)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, false, 1); t(svg, true, 2)},
        () => {t(svg, false, 2); t(svg, true, 3)},
        () => {t(svg, false, 3); t(svg, true, 4, 5)},
        () => {t(svg, false, 5)},
    );

},

elevator: (sel) => { // Motion of an elevator d-t graph
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 50], margin: [56, 10, 28, 12]});
    svg.graph({grid: [1, 5], css: true,
        x: {tick: [0, 11, 2], title: ["Time / s", [9, "12"]], shift: [0, "-22"]},
        y: {tick: [0, 51, 10], title: ["Position / m", "-40"], shift: ["-10", "-4"]},
        data: [{locus: [(x) => x <= 5 ? x * x : 50 - (10 - x) * (10 - x), [0, 10]]}],
    });
},

skydive: (sel) => { // Motion of an skydiver v-t graph
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 15, -50, 0], margin: [60, 12, 10, 32]});
    svg.graph({grid: [1, 5], css: true,
        x: {tick: [0, 16, 3], title: ["Time / s", [13.5, "12"]], shift: [0, "-22"]},
        y: {tick: [-50, 1, 10], title: ["Velocity / (m/s)", "-44"], shift: ["-10", "-4"]},
        data: [{locus: [(x) => 50 * (Math.exp(-9.81 * x / 50) - 1), [0, 15]]}],
    });
    svg.$.find("g.LabelX text.Zero").remove();
},

});
