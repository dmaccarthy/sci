SVG2.cache("p20/circ/img/kep.js", {

orbit: (sel) => {
    let svg = new SVG2(sel, {size: [401, 265], lrbt: [-1.12, 1.12]});
    svg.$.find(".Axis").removeClass("Axis");

    let e = 0.7;
    let r = [1, e];
    let f = new RArray(-root(1 - sq(e)), 0);
    let pt = (a) => new RArray(r[0] * cos(a), r[1] * sin(a));

    let planet = pt(100);
    let g = svg.group().css({stroke: "none", fill: "#0065fe", "fill-opacity": 0.3});
    g.path(f).lineTo(pt(30)).arcTo(pt(45), r).update();
    g.path(f).lineTo(planet).arcTo(pt(130), r).update();
    g.path(f).lineTo(pt(185)).arcTo(pt(230), r).update();
    let sector = g.$;

    svg.ellipse(r).css({fill: "none", stroke: "black", "stroke-width": "2px"});
    g = svg.group().css({stroke: "grey"});
    g.line([-1, 0], [1, 0]);
    g.line([0, -e], [0, e]);
    g = svg.delay(svg.group().addClass("Text"), {css: {fill: "grey"}});
    svg.delay(g.group(), {recenter: [0.7, 0.06]}).text("Major Axis");
    svg.delay(g.group().config({theta: 90}), {recenter: [-0.06, -0.4]}).text("Minor Axis");

    g = svg.group().addClass("Text");
    let c = [0.06, -0.07];
    for (let [t, xy] of [
        ["A", [1.05, 0]],
        ["C", c],
        ["F", f.plus(c)],
        ["P", [-1.05, 0]],
    ]) svg.delay(g.group(), {recenter: xy}).text(t);

    svg.circle("5", planet).css({fill: "red"});
    svg.circle("5", f).css({fill: "orange"});

    svg.css_map().finalize();
    svg.$.on("click", () => sector.fadeToggle());
},

});