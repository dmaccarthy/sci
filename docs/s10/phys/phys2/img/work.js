scripts.cache["s10/phys/phys2/img/work"] = {

hill: (sel) => {
    let svg = new SVG2(sel, {scale: 8, lrbt: [0, 55, 0, 39], margin: [48, 0, 8, 0]});
    css(svg.line([0, 0], [0, 35]), "black@2");
    let g = svg.group("black@1");
    let pts = [[12.2, 30], [19.98, 25], [25.54, 20], [30.34, 15], [35, 10], [39.91, 5], [50, 0]]
    for (let [x, y] of pts) {
        g.line([x, y], [0, y]);
    }
    let p5 = x => 34 + x * (-0.255 + x * (0.00352 + x * (-0.000947 + 0.0000141 * x)));
    css(svg.line([50, 0], [60, 0]), "#0065fe@3");
    svg.locus(p5, [0, 50]).css("none", "#0065fe@3");
    svg.ticks({y: [0, 35, 5], default: 1});
    pts = [[0, 34], [35, 10], [50, 0]];
    svg.plot(pts, "5").css("#0065fe");
    g = svg.group("sans", 20, "#0065fe").shift_by([2, 2]);
    for (let i=0;i<3;i++) g.text("ABC".charAt(i), pts[i]);
},

};