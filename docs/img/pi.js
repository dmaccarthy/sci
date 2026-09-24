scripts.cache["img/pi"] = {

circle: sel => {
    let svg = new SVG2(sel, {scale: 256, grid: 0.1, margin: 2, lrbt: [-0.2, 1.1, -0.7, 1.1]});
    svg.ticks_xy([0, 1.01, 0.2], [-0.6, 1.01, 0.2], {default: true, label: 1, removeZero: true});
    let x = cos(30);
    let vert = [[0, 0], [x, 0.5], [x, -0.5]];
    css(svg.poly(vert, 1), "none", "red@1");
    css(svg.circle(1), "none", "#0065fe@2");
    vert.push([x, 0]);
    svg.plot(vert, "4").css("red", "none@");
},

};
