SVG2.cache("p30/emr/img/diff.js", {

huygens: (sel) => {
    svg = new SVG2(sel, {size: [500, 300], lrbt: [-0.8, 0.8, -0.35], grid: 0, margin: 4});
    svg.$.addClass("SVG2");

    // Barrier
    let d = 0.2, w = 0.03;
    svg.line([-1, 0], [-d-w, 0]);
    svg.line([1, 0], [d+w, 0]);
    svg.line([-d+w, 0], [d-w, 0]).addClass("Toggle2").hide();
    svg.$.find("line").css({"stroke-width": "3px"});

    // Incident waves
    let g = svg.group();
    for (let i=1;i<4;i++) {
        let y = -0.11 * i;
        g.line([-1, y], [1, y]).css({stroke: (i % 2 ? "#0065fe" : "red")});
    }

    // End point sources
    g = svg.group();
    g.$.addClass("Toggle0");
    g.circle(w/2, [-d, 0]);
    g.circle(w/2, [d, 0]);
    g.$.find("circle").css({fill: "red"});

    // Diffracted wavelets
    g = svg.group();
    g.$.addClass("Toggle1");
    for (let i=1;i<8;i++) {
        let r = 0.11 * i;
        let c = i % 2 ? "#0065fe" : "red";
        g.path([r-d, 0]).arcTo([-r-d, 0], r).update().css({stroke: c});
        g.path([r+d, 0]).arcTo([d-r, 0], r).update().css({stroke: c});
    }
 
    // All sources
    g = svg.group();
    g.$.addClass("Toggle3");
    for (let i=1;i<10;i++) g.circle(w/2, [d * (0.2 * i - 1), 0]);
    g.$.find("circle").css({fill: "#0065fe"});

    let t = clickCycle.toggle;
    clickCycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 3); t(svg, true, 2)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, false, 2)},
        () => {t(svg, true, 3)},
    );

},

});