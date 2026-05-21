SVG2.cache("p30/nuke/img/rn.js", {

chain: (sel) => {
    let svg = new SVG2(sel, {scale: [48, 12], lrbt: [81, 89, 206, 226], grid: 1, margin: [40, 32, 26, 26]});
    let opt = {default: true};
    svg.ticks({x: [81, 89.1, 1], ...opt, shift: 204.4});
    svg.ticks({y: [206, 227, 4], ...opt, shift: [80.8, -0.5]});
    svg.$.find("g.Grid").css({stroke: "black"});
    let g = svg.group("arrow");
    opt = {tail: "4"};
    g.arrow({tail: [84, 210], tip: [82, 206]}, opt);
    g.arrow({tail: [83, 210], tip: [84, 210]}, opt);
    g.arrow({tail: [82, 210], tip: [83, 210]}, opt);
    g.arrow({tail: [84, 214], tip: [82, 210]}, opt);
    g.arrow({tail: [86, 218], tip: [84, 214]}, opt);
    g.arrow({tail: [85, 218], tip: [86, 218]}, opt);
    g.arrow({tail: [84, 218], tip: [85, 218]}, opt);
    g.arrow({tail: [86, 222], tip: [84, 218]}, opt);
    g.arrow({tail: [88, 226], tip: [86, 222]}, opt);
    g = svg.group("serif", "ital", 18);
    g.text("Z", [89.4, 205.4, "b"]);
    g.text("A", [81, 226.6, "b"]);
},

});