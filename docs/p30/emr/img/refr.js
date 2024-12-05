SVG2.cache("p30/emr/img/refr.js", {

tank: (sel) => {
    svg = new SVG2(sel, {size: [640, 640], lrbt: [-1, 1], margin: 4});
    svg.addClass("NoStyle");
    svg.path([1, 0]).hor(-1).arcTo([1, 0], 1).close().update();
    svg.line([0, 1], [0, -1]);
    let g = svg.group().addClass("Text");
    for (let a=1;a<90;a+=1) {
        let r = a % 10 ? (a % 5 ? 0.96 : 0.93) : 0.9;
        // if (a % 5 == 0)
            svg.line(vec2d(1, a), vec2d(r, a));
        svg.line(vec2d(-1, a), vec2d(-r, a));
        if (a % 10 == 0) {
            svg.delay(g.group(), {recenter: vec2d(0.85, a)}).text(90 - a);
            svg.delay(g.group(), {recenter: vec2d(0.85, a + 180)}).text(90 - a);
        }
    }
    let font = {"font-size": "36px"};
    svg.delay(g.group(), {recenter: [0.45, 0.05]}).text("Boundary");
    svg.delay(g.group(), {recenter: [0.05, 0.45]}).group().config({theta: -90}).text("Normal");
    svg.delay(g.group(), {recenter: vec2d(0.5, -135), css: font}).text("Tank");
    svg.delay(g.group(), {recenter: vec2d(0.5, 135), css: font}).text("Air");
    svg.css_map("text");
    g.css({stroke: "none", fill: "black"});
    svg.css({fill: "none", stroke: "black"}).finalize();
},

});