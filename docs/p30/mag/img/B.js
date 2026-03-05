SVG2.cache("p30/mag/img/B.js", {

ring: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-4, 4, -2, 2]});
    let wire = ["none", "#b87333@1"];
    let coil = svg.coil([2, 6], 8, 0, 0).css(...wire).config({theta: 90});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    coil.$.find("line.Wire").remove();
    let x = coil.$.find("g.Wire");
    for (let i=3;i<6;i++) $(x[i]).remove();

    let r = 0.1875;
    let w = 0.4;
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
    svg.mjax("\\vec{\\bf B}", null, [0, 5.75, "b"], "forestgreen");
},

coil_wire_in: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 3, -4, 7.6]});
    let coil = svg.coil([2, 6], 15, 0, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = svg.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([1.8, -3]);
    g.plusminus(0.5).shift_by([1.6, 3]);

    svg.vec_in_out("12", 1).shift_by([0, 5]);
    g = svg.group("sans", 18);
    g.text("Wire", [1.75, 4.75, "b"]);
},

coil_wire: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 3, -4, 7.6]});
    let coil = svg.coil([2, 6], 15, 1, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = svg.group("none@", "black").config({theta: 180});
    g.plusminus(0.5).shift_by([1.8, -3]);
    g.plusminus(0.5, 1).shift_by([1.6, 3]);
    g = svg.group("none", "black@2");
    g.line([-3, 5], [3, 5]);

    g = svg.group("sans", 18);
    g.text("Wire", [2, 4, "b"]);
    g.text("Electron Flow", [0, 6.75, "b"], 0, "red");

    g = svg.group("arrow");
    g.arrow({tail: [-1.5, 6], tip: [1.5, 6]}, {tail: "5"});

},

});
