SVG2.cache("p20/circ/img/kep.js", {

orbit: (sel) => {
    let svg = new SVG2(sel, {size: [401, 265], lrbt: [-1.12, 1.12]});

    let e = 0.7;
    let r = [1, e];
    let f = new RArray(-root(1 - sq(e)), 0);
    let pt = (a) => new RArray(r[0] * cos(a), r[1] * sin(a));

    let planet = pt(100);
    let g = svg.group("none@", "#0065fe", {"fill-opacity": 0.3});
    g.path(f).line_to(pt(30)).arc_to(pt(45), r).update();
    g.path(f).line_to(planet).arc_to(pt(130), r).update();
    g.path(f).line_to(pt(185)).arc_to(pt(230), r).update();
    let sector = g.$;

    svg.group("none", "black@2").ellipse(r);
    g = svg.group({stroke: "grey"});
    g.line([-1, 0], [1, 0]);
    g.line([0, -e], [0, e]);

    g = svg.group("sans", "grey");
    g.gtext("Major Axis", [], [0.5, 0.05, "b"]);
    g.gtext("Minor Axis", [], [-0.05, -0.35, "b"], 90);

    g = svg.group("black@1");
    g.circle("5", planet).css({fill: "#0065fe"});
    g.circle("5", f).css({fill: "orange"});

    g = svg.group("sans");
    for (let [t, p] of [
        ["A", [1.04, 0, "l"]],
        ["C", [0.04, 0, "tl"]],
        ["F", [f[0] + 0.04, 0, "tl"]],
        ["P", [-1.04, 0, "r"]]
    ]) g.gtext(t, [], p)

    svg.$.on("click", () => sector.fadeToggle());
},

});