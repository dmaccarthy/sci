save("p20/kin/img/acc", {

vt: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 4, 0.5], [-45, 0, 5], 1],
        margin: [0.18, 0.02, 0.03, 0.12],
        x: ["Time / s&nbsp;", [">", -3], {interval: 1, length: "-8", fixed: 0, offset: [0, 3]}],
        y: ["Velocity / (m/s)", ["-54", "^"], {interval: 5, length: "8", fixed: 0, offset: [-0.15, 0]}],
    });
    svg.$.find(".TitleX").addClass("End");
    let g = -9.81;
    let t = 2.5;
    let v = g * t;
    let d = v * t / 2;
    let shade = svg.poly([[0, 0], [t, v], [t, 0]]).$.addClass("Shade").hide();
    svg.line([0, 0], [4, g * 4]);
    let blue = svg.circle(0.08, [t, v]).$.hide();
    svg.final();
    clickCycle(svg.element, 0,
        () => {shade.hide(); blue.fadeOut()},
        () => {shade.fadeIn(); blue.fadeIn()},
        () => {shade.fadeOut()},
    );
},

dt: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 4, 0.5], [-80, 0, 5], 1],
        margin: [0.18, 0.02, 0.03, 0.12],
        x: ["Time / s", [4, -5], {interval: 1, length: "-8", fixed: 0, offset: [0, 5]}],
        y: ["Position / m", ["-54", "^"], {interval: 10, length: "8", fixed: 0, offset: [-0.15, 0]}],
    });
    svg.$.find(".TitleX").addClass("End");
    let g = -9.81;
    let t = 2.5;
    let v = g * t;
    let d = v * t / 2;
    svg.locus((t) => -9.81 / 2 * t * t, [0, 4]);
    let tang = svg.line([d/v, 0], [4, d+v*(4-t)]).$.addClass("Tangent").hide();
    let red = svg.circle(0.08, [t, d]).$.addClass("Tangent").hide();
    svg.final();
    clickCycle(svg.element, 0,
        () => {tang.hide(); red.hide()},
        () => {red.fadeIn()},
        () => {tang.fadeIn()},
    );
},

});