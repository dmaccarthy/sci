SVG2.cache("test/shm_unused.js", {

Q1x: (sel) => {
    $(sel).attr({width: 480, height: 300, "data-aspect": "8/5"});
    let svg = applet.graph(sel, {
        grid: [[0, 0.8, 0.1], [-5, 5, 1], 1],
        margin: [0.18, 0.06, 0.05, 0.05],
        x: ["Time / s", [">", "18"], {interval: 0.1, fixed: 1, omitZero: 1, length: "8", offset: [0, "-24"]}],
        y: ["Position / cm", ["-48", ">"], {interval: 1, fixed: 0, length: "8", offset: ["-18", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.locus((t) => 4 * sin(360 * t / 0.36), [0, 0.72]).css({stroke: "red"});
    svg.final();
},

Q1v: (sel) => {
    console.log(67);
    $(sel).attr({width: 480, height: 300, "data-aspect": "8/5"});
    let svg = applet.graph(sel, {
        grid: [[0, 0.8, 0.1], [-0.8, 0.8, 0.2], 1],
        margin: [0.18, 0.06, 0.05, 0.05],
        x: ["Time / s", [">", "18"], {interval: 0.1, fixed: 1, omitZero: 1, length: "8", offset: [0, "-24"]}],
        y: ["Velocity / (m/s)", ["-60", ">"], {interval: 0.2, fixed: 1, length: "8", offset: ["-18", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.locus((t) => 0.7 * cos(360 * t / 0.36), [0, 0.72]); //.css({stroke: "red"});
    svg.final();
},

Q1a: (sel) => {
    $(sel).attr({width: 480, height: 300, "data-aspect": "8/5"});
    let svg = applet.graph(sel, {
        grid: [[0, 0.8, 0.1], [-15, 15, 3], 1],
        margin: [0.18, 0.06, 0.05, 0.05],
        x: ["Time / s", [">", "18"], {interval: 0.1, fixed: 1, omitZero: 1, length: "8", offset: [0, "-24"]}],
        y: ["Acceleration / (m/s^2)", ["-54", ">"], {interval: 3, fixed: 0, length: "8", offset: ["-18", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.locus((t) => -12 * sin(360 * t / 0.36), [0, 0.72]).css({stroke: "purple"});
    svg.final();
},

});
