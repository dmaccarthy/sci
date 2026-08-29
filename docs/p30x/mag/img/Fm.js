SVG2.cache("p30/mag/img/Fm.js", {

hr3: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-6.8, 7.1, -4.5, 2]});
    let g = svg.group("silver", "black@1").shift_by([-4, 0]);
    g.rect([5, 2]);
    css(g.rect([2.5, 2], [1.25, 0]), "red");
    g = g.group("none@", "black", "sans", 20, "bold");
    g.text("S", [-1.9, -0.25, "b"]);
    g.text("N", [1.9, -0.25, "b"], 0, "white");
    svg.vec_in_out(0.6);
    svg.group("arrow", "#0065fe").arrow({tail: [0, -1], tip: [0, -4]}, {tail: "6"});
    svg.group("arrow", "forestgreen").arrow({tail: [1, 0], tip: [5, 0]}, {tail: "6"});
    svg.mjax("\\va{F}_m", {scale: 0.8}, [0.8, -3, "bl"], "#0065fe");
    svg.mjax("\\va{B}", {scale: 0.8}, [5.2, -1.8, "b"], "forestgreen");
    svg.mag_compass(1).config({theta: -90}).shift_by([2.75, 0]);
    g = svg.group("sans", 15);
    g.text("Magnet", [-4, 1.3, "b"]);
    g.text("Wire", [0, 1.3, "b"]);
    g.text("Compass", [2.75, 1.3, "b"]);
},

cap: (sel) => {
    let svg = new SVG2(sel, {scale: 32, margin: 4, lrbt: [-6, 5, -3, 3]});
    let g = svg.group("black@1", "silver");
    g.rect([10, 0.4], [0, 2.8]);
    g.rect([10, 0.4], [0, -2.8]);
    g = svg.group("black", "none@");
    g.plusminus(0.5, 1).shift_by([-5.5, 2.8]);
    g.plusminus(0.5).shift_by([-5.5, -2.8]);
    g = svg.group("#0065fe", "black@1");
    g.circle("6", [-5, 0]);
    g = svg.group("arrow");
    g.arrow({tail: [-4.5, 0], tip: [-2, 0]}, {tail: "6"});
},

parallel_r: (sel) => {
    let svg = new SVG2(sel, {scale: 20, margin: 2, lrbt: [-6, 9, -8.5, 8.5]});
    let green = "forestgreen";
    let g = svg.group("none", `${green}@1`);
    svg.vec_in_out(0.6).shift_by([-4, 0]);
    svg.vec_in_out(0.6, 1).shift_by([4, 0]).css("white");
    g.circle(8, [-4, 0]);
    for (let a=-150;a<150;a+=60)
        g.chevron(vec2d(8, a).plus([-4, 0]), a-90, {size: "10", ratio: 0.6});
    svg.group("arrow", green).arrow({tail: [4, -1], tip: [4, -4]}, {tail: "6"});
    svg.group("arrow", "#0065fe").arrow({tail: [5, 0], tip: [9, 0]}, {tail: "6"});
    svg.mjax("\\va{B}", {scale: 0.8}, [2, -2], green);
    svg.mjax("\\va{F}_m", {scale: 0.8}, [6, 1, "b"], "#0065fe");
},

parallel_l: (sel) => {
    let svg = new SVG2(sel, {scale: 20, margin: 2, lrbt: [-9, 6, -8.5, 8.5]});
    let green = "forestgreen";
    let g = svg.group("none", `${green}@1`);
    svg.vec_in_out(0.6).shift_by([-4, 0]).css("white");
    svg.vec_in_out(0.6, 1).shift_by([4, 0]);
    g.circle(8, [4, 0]);
    for (let a=90;a<300;a+=60)
        g.chevron(vec2d(8, a).plus([4, 0]), a+90, {size: "10", ratio: 0.6});
    svg.group("arrow", green).arrow({tail: [-4, -1], tip: [-4, -4]}, {tail: "6"});
    svg.group("arrow", "#0065fe").arrow({tail: [-5, 0], tip: [-9, 0]}, {tail: "6"});
    svg.mjax("\\va{B}", {scale: 0.8}, [-2, -2], green);
    svg.mjax("\\va{F}_m", {scale: 0.8}, [-6, 1, "b"], "#0065fe");
},

parallel: (sel) => {
    let svg = new SVG2(sel, {scale: 28, lrbt: [-5, 5, -1, 1]});
    svg.vec_in_out("12").shift_by([-4, 0]);
    svg.vec_in_out("12", 1).shift_by([4, 0]);
},

coil_wire_in: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 3, -4, 6]});
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
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 3, -4, 6]});
    let coil = svg.coil([2, 6], 15, 1, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), "silver", "black@1");
    let g = svg.group("none@", "black").config({theta: 180});
    g.plusminus(0.5).shift_by([1.8, -3]);
    g.plusminus(0.5, 1).shift_by([1.6, 3]);
    g = svg.group("none", "black@2");
    g.line([-3, 5], [3, 5]);
    g.chevron([0, 5], 0, {size: "12", ratio: 0.6});

    g = svg.group("sans", 18);
    g.text("Wire", [2, 4, "b"]);

    // g.text("Electron Flow", [0, 6.75, "b"], 0, "red");
    // g = svg.group("arrow");
    // g.arrow({tail: [-1.5, 6], tip: [1.5, 6]}, {tail: "5"});
},

});
