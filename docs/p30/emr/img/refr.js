SVG2.cache("p30/emr/img/refr.js", {

tank: (sel) => {
    svg = new SVG2(sel, {size: [640, 640], lrbt: [-1, 1], margin: 4});
    svg.$.addClass("SVG2");
    svg.path([1, 0]).hor(-1).arcTo([1, 0], 1).close().update();
    svg.line([0, 1], [0, -1]);
    for (let a=1;a<90;a+=1) {
        let r = a % 10 ? (a % 5 ? 0.96 : 0.93) : 0.9;
        if (a % 5 == 0) svg.line(vec2d(1, a), vec2d(r, a));
        svg.line(vec2d(-1, a), vec2d(-r, a));
        if (a % 10 == 0) {
            svg.text(90 - a, vec2d(0.85, a));
            svg.text(90 - a, vec2d(0.85, a+180));
        }
    }
},

});