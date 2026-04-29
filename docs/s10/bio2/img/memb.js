SVG2.cache("s10/bio2/img/memb.js", {

bilayer: (sel) => {
	let svg = new SVG2(sel, {scale: 32, lrbt: [-8.5, 8.5, -2.5, 2.5], grid: 0});
    let phospho = () => {
        let p = svg.group();
        let g = p.group("none", "black@3");
        g.line([-0.125, 0], [-0.125, -0.9]);
        g.poly([[0.125, 0], [0.125, -0.5], [0.2, -0.9]]);
        css(p.circle(0.3), "#ffa0a0", "black@1");
        return p;
    }
    for (let x=-8;x<8.1;x+=0.8) {
        phospho().shift_by([x, 0.9]);
        phospho().config({theta: 180}).shift_by([x, -1]);
    }
    let g = svg.group("sans", 18, "#0065fe");
    g.text("Water", [0, 2.1]);
    g.text("Water", [0, -2.2]);
},

});