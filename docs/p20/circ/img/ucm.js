SVG2.cache("p20/circ/img/ucm.js", {

earth: (sel) => {
    let [x1, x2] = [0.06, 0.32];
    let angle = 45;
    let earth = vec2d(1, angle);
    let tail = {tail: "6"};
	let svg = new SVG2(sel, {scale: 300, lrbt: [-0.1, 1.05, -0.1, 1.05], margin: 1}).css(".NoStyle");
    svg.circle(1).css({fill: "none", stroke: "#0065fe", "stroke-width": "2px"});
    svg.image("media/sun.svg", [0.16, 0.16], [0, 0]);
    svg.image("media/earth.svg", [0.075, 0.075], earth);
    let g = svg.group().config({theta: angle, shift: earth}).css("red", "black1");
    g.arrow({tail: [x1, 0], tip: [x2, 0]}, tail);
    g.arrow({tail: [-x1, 0], tip: [-x2, 0]}, tail);
    g.arrow({tail: [0, x1], tip: [0, x2]}, tail);
    g.arrow({tail: [0, -x1], tip: [0, -x2]}, tail);
    svg.group().css("text").ctext(
        ["Centre", [0.2, 0]],
        ["Radial", [0.93, 0.99]],
        ["Centripetal", [0.5, 0.43]],
        ["Tangential", [0.9, 0.43]],
        ["Tangential", [0.5, 0.99]],
    );
},

});