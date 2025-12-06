SVG2.cache("p20/circ/img/ucm.js", {

earth: (sel) => {
    let [x1, x2] = [0.06, 0.32];
    let angle = 45;
    let earth = vec2d(1, angle);
    let tail = {tail: "6"};
	let svg = new SVG2(sel, {scale: 300, lrbt: [-0.1, 1.05, -0.1, 1.05], margin: 1}).css(".NoStyle");
    css(svg.circle(1), "none", "#0065fe@2");
    svg.image("media/sun.svg", [0.16, 0.16], [0, 0]);
    svg.image("media/earth.svg", [0.075, 0.075], earth);
    let g = svg.group("red", "black@1").config({theta: angle, shift: earth});
    g.arrow({tail: [x1, 0], tip: [x2, 0]}, tail);
    g.arrow({tail: [-x1, 0], tip: [-x2, 0]}, tail);
    g.arrow({tail: [0, x1], tip: [0, x2]}, tail);
    g.arrow({tail: [0, -x1], tip: [0, -x2]}, tail);
    svg.group("text").ctext(
        ["Centre", [0.1, 0, 0, 0.5]],
        ["Radial", [0.93, 0.99]],
        ["Centripetal", [0.5, 0.43]],
        ["Tangential", [0.9, 0.43]],
        ["Tangential", [0.5, 0.99]],
    );
},

});