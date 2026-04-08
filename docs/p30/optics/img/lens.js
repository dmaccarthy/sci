SVG2.cache("p30/optics/img/lens.js", {

glow: (sel) => {
    let svg = new SVG2(sel, {scale: 64, lrbt: [-2, 3, -2.5, 2], grid: 0, margin: 4});
    css(svg.line([-2, 0], [3, 0]), "black@1");
    css(svg.line([2.5, 2], [2.5, -2.5]), "black@3");
    css(svg.line([0, 1], [2.5, 1]), "#0065fe@1");
    svg.lens(1.5, 0.15);
    svg.candle(1, 0.125, 0.5).shift_by([-1.5, 0.375]);
    svg.candle(2, 0.25, 1).config({theta: 180}).shift_by([2.5, -.75]);

    let g = svg.group("sans", 18, "black");
    g.text("Object", [-1.5, 1.2, "b"]);
    g.text("Image", [2.1, -1.5, "br"]);
    g = g.group("#0065fe");
    g.text("2.50 m", [1.25, 1.2, "b"]);
},

});
