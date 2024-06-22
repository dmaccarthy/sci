/* Usage...

$.getScript({url: "/svg_js/protractor.js", success: () => {
    let p = save.cache.protractor;
    p.create(svg, 10).$.on("wheel", p.wheel);
}});

*/

save("protractor", {

create: (svg, r) => { // Create an SVG_Item instance (<g> node) to contain the protractor
    let id = svg.element.id, tick;
    let r7 = r / 7, r4 = 1.04 * r, r8 = 0.877 * r;
    let g = svg.group().addClass("Protractor").css({"font-size": `${(10 * r).toFixed(1)}%`});
    svg.path(vec2d(r4, -2.5)).arcTo(vec2d(r4, 182.5), r4, 0, 0, 1).item(g).addClass("Plastic");
    svg.path([r, 0]).arcTo([-r, 0], r).item(g);
    svg.path([r7, 0]).arcTo([-r7, 0], r7).item(g);
    svg.path([r8, 0]).arcTo([-r8, 0], r8).item(g);
    svg.line([-r7, 0], [r7, 0], g);
    svg.line([0, 0], [0, r7], g);
    for (let i=0;i<181;i++) {
        if (i % 5 == 0) {
            tick = 0.93;
            svg.text(i, vec2d(0.9 * r, i), g).config({theta: i - 90});
            if (i != 90) svg.text(180 - i, vec2d(0.845 * r, i), g).config({theta: i - 90});
            if (i % 10 == 0) svg.line(vec2d(r7, i), vec2d((i == 90 ? 0.877 : 0.825) * r, i), g);
        }
        else tick = 0.96;
        svg.line(vec2d(r, i), vec2d(tick * r, i), g);
    }
    return g.config({dwheel: [2, 0.1]});
},

wheel: (ev) => { // Event handler to rotate protractor with the mouse wheel
    let dy = ev.originalEvent.deltaY;
    let g = ev.currentTarget.graphic;
    let d = g.dwheel;
    if (typeof(d) != "number") d = d[ev.shiftKey ? 1 : 0];
    g.theta += (dy > 0 ? -d: d);
    g.update(0);
    return false;
},
  
});