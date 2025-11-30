SVG2.cache("p30/optics/img/mirror.js", {

deriv: (sel) => {
    let svg = new SVG2(sel, {size: [702, 352], lrbt: [-0.2, 3.2, -2.2, 1.2]});
    svg.$.addClass("SVG2");
    let tri = svg.group();
    svg.line([-0.2, 0], [3.2, 0]).css({"stroke-width": "3px"});
    svg.line([0, -2.2], [0, 1.2]).css({"stroke-width": "3px"});
    let f = [1, 0], d = [1.5, 1], di = [3, -2];
    let b = svg.group(), r = svg.group();
    let ray = (g, p1, p2) => {g.ray(p1, p2, {size: "8", ratio: 0.6})}

    b.arrow({tail: [1.5, 0], tip: d}, {tail: "3"});
    ray(b, d, [0, 1]);
    ray(b, d, [0, -2]);
    ray(b, d, [1.4, 1.2]);
    b.$.find("line, polyline").css({stroke: "#0065fe"});
    b.$.find("polygon").css({fill: "#0065fe"});

    r.arrow({tail: [3, 0], tip: di}, {tail: "6"});
    ray(r, [1.4, 1.2], [3.2, -2.4]);
    ray(r, [0, 1], [3.2, -2.2]);
    ray(r, [0, -2], [3.2, -2]);
    r.$.find("line, polyline").css({stroke: "red"});
    r.$.find("polygon").css({fill: "red"});

    let g = tri.group();
    g.$.addClass("Toggle0");
    g.poly([d, [0, 1], f], 1);
    g.poly([di, [0, -2], f], 1);
    g.$.css({"fill-opacity": 0.2}).find("polygon").css({fill: "green", stroke: "none"});

    g = tri.group();
    g.$.addClass("Toggle1");
    g.poly([d, [1.5, 0], f], 1);
    g.poly([[0, -2], [0, 0], f], 1);
    g.$.css({"fill-opacity": 0.2}).find("polygon").css({fill: "#0065fe", stroke: "none"});

    g = tri.group();
    g.$.addClass("Toggle2");
    g.poly([di, [3, 0], f], 1);
    g.poly([[0, 1], [0, 0], f], 1);
    g.$.css({"fill-opacity": 0.2}).find("polygon").css({fill: "red", stroke: "none"});

    svg.circle("4", f);
    svg.circle("4", [2, 0]);
    svg.$.find("circle").css({fill: "white"});

    let t = click_cycle.toggle;
    click_cycle(svg.element, -1,
        () => {t(svg, false, 0, 1, 2)},
        () => {t(svg, true, 0)},
        () => {t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );

},

});
