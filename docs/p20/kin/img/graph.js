SVG2.cache("p20/kin/img/graph.js", {

bike: (sel) => {
    let pts = [[0, -5], [1, -2], [2, 1], [3, 4], [4, 7]];
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 4, -6, 8], margin: [54, 10, 10, 10]});
    svg.graph({grid: [0.5, 1], css: true,
        x: {tick: [0, 4.1, 1], title: ["Time / s", [3.5, "8"]], shift: [0, "-24"]},
        y: {tick: [-6, 8.1, 2], title: ["Position / m", "-36"], shift: ["-10", "-5"]},
        data: [
            {connect: [pts[0], pts[4]]},
            {plot: [pts, "5"]},
        ]
    });
    svg.$.find("g.LabelX text.Zero").remove();
},

dt: (sel) => { // Linear & parabolic motion graphs
    $(sel).attr({width:480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        margin: [0.09, 0.02, 0.02, 0.02],
        grid: [[0, 10, 1], [0, 50, 5], 1],
        x: ["Time / s&nbsp;", [">", 2], {}],
        y: ["Position / m", [-0.5, ">"], {}],   
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let g = svg.group().addClass("Data");
    svg.line([0, 5], [10, 20], g);
    svg.line([0, 10], [10, 50], g).$.css({stroke: "red"});
    svg.line([0, 40], [10, 5], g).$.css({stroke: "green"});
    svg.line([0, 28], [10, 28], g).$.css({stroke: "cyan"});
    svg.locus((t) => t * (2 + t / 2), [0, Math.sqrt(104) - 2], 0, 0, g).$.css({stroke: "gold"});
    svg.locus((t) => 10 + t * (8 - t / 2), [0, 10], 0, 0, g).$.css({stroke: "violet"});
    svg.final();

    let vt = (n) => {
        let e = svg.$.find("g.Data *");
        if (n) {
            e.hide();
            $(e[n - 1]).fadeIn();
        }
        else e.fadeIn();
    }
    clickCycle(svg.element, 0,
        () => {vt(0)},
        () => {vt(1)},
        () => {vt(2)},
        () => {vt(3)},
        () => {vt(4)},
        () => {vt(5)},
        () => {vt(6)}
    );
},

vt: (sel) => { // Area under a v-t graph
    $(sel).attr({width:480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        grid: [[0, 8, 0.5], [0, 28, 2], 1],
        margin: [0.19, 0.02, 0.15, 0.05],
        x: ["Time / s&nbsp;", [">", 1.5], {interval: 1, length: "8", fixed: 0, offset: [0, -2.8]}],
        y: ["Velocity / (m/s)", [-1.2, "^"], {interval: 4, length: "8", fixed: 0, offset: [-0.3, 0]}],
    });
    svg.$.find(".TitleX").addClass("End");
    svg.poly([[0, 8], [1, 12], [1, 0], [0, 0]], 1).addClass("Shade");
    svg.poly([[2, 16], [1, 12], [1, 0], [2, 0]], 1).addClass("Shade");
    svg.poly([[2, 16], [3, 20], [3, 0], [2, 0]], 1).addClass("Shade");
    svg.poly([[4, 24], [3, 20], [3, 0], [4, 0]], 1).addClass("Shade");
    svg.rect([1, 24], [4.5, 12]).addClass("Shade");
    svg.rect([3, 24], [6.5, 12]).addClass("Shade");
    svg.$.find(".Shade").hide();
    svg.poly([[0, 8], [4, 24], [8, 24]]);
    svg.final();

    let shade = (n, m) => {
        if (m == null) m = n;
        let s = svg.$.find(".Shade").hide();
        while (n <= m) $(s[n++]).fadeIn();
    }
    clickCycle(svg.element, 0,
        () => {shade(0, -1)},
        () => {shade(0, 3)},
        () => {shade(0)},
        () => {shade(1)},
        () => {shade(2)},
        () => {shade(3)},
        () => {shade(4, 5)},
        () => {shade(4)},
    );
},

elevator: (sel) => { // Motion of an elevator d-t graph
    $(sel).attr({width:480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        grid: [[0, 10, 1], [0, 50, 5], 1],
        margin: [0.18, 0.04, 0.15, 0.05],
        x: ["Time / s&nbsp;", [">", 2], {interval: 2, length: "8", fixed: 0, offset: [0, -4.5]}],
        y: ["Position / m", ["-48", ">"], {interval: 10, length: "8", fixed: 0, offset: [-0.3, 0]}],        
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.locus((t) => t <= 5 ? t * t : 50 - (10 - t) * (10 - t), [0, 10]);
    svg.final();
},

skydive: (sel) => { // Motion of an elevator d-t graph
    $(sel).attr({width:480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        grid: [[0, 15, 3], [-50, 0, 5], 1],
        margin: [0.2, 0.05, 0.05, 0.12],
        x: ["Time / s&nbsp;", [">", 3], {interval: 3, length: "8", fixed: 0, offset: [0, -4.5], omitZero: 1}],
        y: ["Velocity / (m/s)", [-2.2, "^"], {interval: 10, length: "8", fixed: 0, offset: [-0.6, 0]}], 
    });
    svg.$.find(".TitleX").addClass("End");
    svg.locus((t) => 50 * (Math.exp(-9.81 * t / 50) - 1), [0, 15]);
    svg.final();
}

});
