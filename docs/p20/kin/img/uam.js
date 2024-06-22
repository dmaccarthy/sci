save("p20/kin/img/uam", {

vt: (sel) => {
    let svg = applet.graph(sel, {
    margin: [0.16, 0.03, 0.12, 0.06],
    grid: [[0, 5, 0.5], [0, 24, 2], 1],
    x: ["Time / s&nbsp;", [">", "12"], {interval: 1, offset: [0, "-22"], fixed: 0, length: "8"}],
    y: ["Velocity / (m/s)", ["-48", "^"], {interval: 4, offset: ["-12", 0], fixed: 0, length: "8", omitZero: 1}],        
    });
    svg.poly([[0, 0], [0, 12], [5, 20], [5,0]]).addClass("Shade");
    svg.line([0, 12], [5, 20]);
    svg.final();
    svg.$.find(".TitleX").addClass("End");
},

upDown: (sel) => {
    let t = 20 / 9.81;
    let svg = applet.graph(sel, {
        grid: [[0, 2.25, 0.25], [-12, 12, 2], 1],
        margin: [0.15, 0.02, 0.05, 0.05],
        x: ["Time / s&nbsp;", [">", "12"], {interval: 0.5, offset: [0, "-22"], omitZero: 1, fixed: 1, length: "8"}],
        y: ["Velocity / (m/s)", ["-48", "^"], {interval: 4, offset: ["-12", 0], fixed: 0, length: "8"}],        
    });
    svg.poly([[0, 10], [t, -10], [t, 0], [0, 0]]).addClass("Shade");
    svg.line([0, 10], [t, -10]);
    svg.final();
    svg.$.find(".TitleX").addClass("End");
    svg.$.find(":is(.Shade, .TickX, .TickLabelX)").hide();
    svg.$.on("click", () => {
        $(sel).find(".Shade, .TickX, .TickLabelX").toggle();    
    });
    svg.final();
},

zag: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 5, 0.5], [-9, 9, 1.5], 1],
        margin: [0.09, 0.02, 0.02, 0.02],
        x: ["Time&nbsp;", [">", "12"]],
        y: ["Velocity", ["-20", "^"]],     
    });
    svg.poly([[0, 0], [1, -8], [3, 6], [4.5, -6], [5, -2.5]], 0);
    svg.final();
    svg.$.find(".TitleX").addClass("End");
},

});