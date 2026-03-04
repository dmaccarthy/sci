SVG2.cache("p30/mag/img/B.js", {

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
    let svg = new SVG2(sel, {scale: 24, grid: 1, margin: 1, lrbt: [-4, 4, -4, 5]});
    let coil = svg.group().config({theta: 90, shift: [0, 4]});
    coil.coil([2, 6], 15, 1, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = coil.group("none@", "black");
    g.plusminus(0.5, 1).shift_by([-1.8, 3]);
    g.plusminus(0.5).shift_by([-1.6, -3]);
},

});