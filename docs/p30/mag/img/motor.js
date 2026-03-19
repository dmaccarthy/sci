SVG2.cache("p30/mag/img/motor.js", {

ring: (sel, brush) => {
    let [w, h] = brush ? [3, 4] : [4, 2];
    let svg = new SVG2(sel, {scale: 24, grid: 0, lrbt: [-w, w, -h, h]});
    let wire = ["none", "#b87333@1"];
    let coil = svg.coil([2, 6], 8, 0, 0).css(...wire).config({theta: (brush ? 0 : 90)});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    coil.$.find("line.Wire").remove();
    let x = coil.$.find("g.Wire");
    for (let i=3;i<6;i++) $(x[i]).remove();

    let r = 0.1875;
    w = 0.4;
    let g = coil.group(...wire).shift_by([0, 3 * r]);
    let p = g.path([1, 4 * r]);
    p.arc([1, 3 * r], -90);
    p.line_to([w, 2 * r * w]);
    p.update();

    g = coil.group(...wire).shift_by([0, -3 * r]);
    p = g.path([-w, -2 * r * w]);
    p.line_to([-1, -2 * r]);
    p.arc([-1, -r], 90, 2);
    p.update();

    g = coil.group("green@4", "none");
    p = g.path(vec2d(0.8, 8));
    p.arc([0, 0], 172);
    p.update();

    g = coil.group("red@4", "none");
    p = g.path(vec2d(0.8, -8));
    p.arc([0, 0], -172);
    p.update();

    if (brush) {
        g = svg.group("brown", "black@1");
        let r = [1.5, 0.12];
        let p = new RArray(0.8, 0);
        let b1 = g.group().config({shift: p});
        b1.rect(r, p);
        p = p.neg();
        let b2 = g.group().config({shift: p});
        b2.rect(r, p);
        svg.$.on("click", () => {
            let t = b1.theta;
            t = t < 10 ? 25 : (t < 40 ? 45 : 0);
            b1.config({theta: t});
            b2.config({theta: t});
        });
    }
},

coil_rotate: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 3, -4, 7.6]});
    let coil = svg.coil([2, 6], 15, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = svg.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([1.8, -3]);
    g.plusminus(0.5).shift_by([1.6, 3]);

    g = svg.group("arrow", "forestgreen");
    g.arrow({tail: [-1.5, 5], tip: [1.5, 5]}, {tail: "5"});
    svg.mjax("\\va{B}", null, [0, 5.75, "b"], "forestgreen");
},

});
