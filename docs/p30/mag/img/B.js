SVG2.cache("p30/mag/img/B.js", {

HR1: (sel) => {
    let svg = new SVG2(sel, {scale: 20, grid: 0, margin: 8, lrbt: [-7, 8.5, -7, 7]});
    let size = {size: 0.5, ratio: 0.5};
    let green = ["none", "forestgreen@1", ".Toggle3"];
    let g = svg.group(...green);
    g.mjax("\\vec{\\bf B}", null, [-1, 5.8], "forestgreen");
    svg.vec_in_out(0.5, 1, "black@2").$.find("polygon").addClass("Toggle1");
    for (let r of [0.7, 1, 1.6, 2.5, 4.2, 7]) {
        let g1 = r == 4.2 ? g.group(".Toggle2", ...green) : g;
        g1.circle(r);
        if (r > 1.2) for (let i=0;i<6;i++) {
            let a = 60 * i + 50;
            g1.chevron(vec2d(r, a), a + 90, size);
        }
    }
    let north = svg.group();
    let ccw = svg.group(".Toggle1");
    for (let i=0;i<6;i++) {
        let a = 60 * i + 10;
        north.mag_compass(0.6).shift_by(vec2d(4.2, a));
        ccw.mag_compass(0.6).config({theta: a}).shift_by(vec2d(4.2, a));
    }
    g = svg.group("none", "black@1", ".Toggle0");
    g.line(vec2d(0.5, 10), vec2d(6.4, 25));
    g.line(vec2d(4.2, 70).plus(vec2d(0.6, 45)), [3.7, 6.2]);
    g = g.group("sans", 20, "none@", "black");
    g.text("Compass", [4, 6, "bl"]);
    g.text("Wire", [6.2, 2.5, "bl"]);

    svg.$.find(".Toggle2").prependTo(svg.$);

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 1, 2, 3), t(svg, true, 0)},
        () => {t(svg, true, 1), t(svg, false, 0)},
        () => {t(svg, true, 2)},
        () => {t(svg, true, 3)},
    );
},

Q1: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-6, 6, -3, 3]});
    let g = svg.group("none", "black@4");
    g.line([-7, 0], [7, 0]);
    g.chevron([0, 0], 180, {size: "16", ratio: 0.6});
    g = svg.group("sans", 24);
    g.text("P", [-1, 2, "b"]);
    g.text("Q", [-1, -2.7, "b"]);
},

Q3: (sel) => {
    let svg = new SVG2(sel, {scale: 36, lrbt: [-3, 3, -4, 4]});
    let g = svg.group().config({theta: -90});
    g.image("p30/mag/img/2HR.svg", [8, 6]);
    
},

atom: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, margin: 3, lrbt: [-5, 5, -1.2, 1]});
    let g = svg.group("none", "red@2").shift_by([0, -0.3]);
    g.ellipse([5, 0.6]);
    let size = {size: "12", ratio: 0.6};
    g.chevron([2.5, 0.5], 180, size);
    g.chevron([-2.5, -0.5], 0, size);
    g = svg.group("none@", "#0065fe");
    g.circle("12");
    g.circle("5", [4, -0.7]);
},

coil: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, margin: 0, lrbt: [-2, 4, -4, 5]});
    let coil = svg.coil([2, 6], 15, 0, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = svg.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([1.8, 3]);
    g.plusminus(0.5).shift_by([1.6, -3]);
    g = svg.group("sans", 20);
    g.text("P", [3, -0.2, "b"]);
    g.text("Q", [0, 4, "b"]);
},

coil2: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-10, 2, -10, 2]});
    let coil = svg.group().config({theta: 90, shift: [-6, 0]});
    coil.coil([2, 6], 15, 1, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = coil.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([-1.8, 3]);
    g.plusminus(0.5).shift_by([-1.6, -3]);

    coil = svg.group().config({shift: [0, -6]});
    coil.coil([2, 6], 15, 0, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    g = coil.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([1.8, 3]);
    g.plusminus(0.5).shift_by([1.6, -3]);
    svg.text("P", [0, -0.25, "b"], 0, ["sans", 20]);
},

});
