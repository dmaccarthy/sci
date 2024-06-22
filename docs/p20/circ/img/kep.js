save("p20/circ/img/kep", {

orbit: (sel) => {
    $(sel).attr({width: 400, height: 300, "data-aspect": "4/3"});
    let svg = new SVG_Animation(sel, -1.12, 1.12);

    // Eccentricity and focus
    let e = 0.8;
    let f = new RArray(-root(1 - sq(e)), 0);

    // Axes
    let r = [1, e];
    svg.line([-1, 0], [1, 0]);
    svg.line([0, -e], [0, e]);
    svg.$.find("line").css({stroke: "grey"});

    // Orbit and sectors
    let g = svg.group().css({fill: "#0065FE", "fill-opacity": 0.4, stroke: "none"});
    svg.ellipse(...r, [0, 0]).css({fill: "none", stroke: "black", "stroke-width": "2px"});
    let pt = (a) => new RArray(r[0] * cos(a), r[1] * sin(a));
    let planet = pt(100);
    svg.path(f).lineTo(pt(30)).arcTo(pt(45), r).item(g);
    svg.path(f).lineTo(planet).arcTo(pt(130), r).item(g);
    svg.path(f).lineTo(pt(185)).arcTo(pt(230), r).item(g);
    let sectors = g.$.find("path");

    // Sun and planet
    svg.circle(0.03, f).css({fill: "orange"});
    svg.circle(0.025, planet).css({fill: "red"});

    // Labels
    let d = new RArray(0.06, -0.06);
    svg.text("Major Axis", [0.65, 0.06]).addClass("Grey");
    svg.text("Minor Axis", [-0.06, -0.5]).config({theta: 90}).addClass("Grey");
    svg.text("C", d);
    svg.text("F", f.plus(d));
    svg.text("P", [-1.06, 0]);
    svg.text("A", [1.06, 0]);
    svg.$.find("text.Grey").css({fill: "grey"});
    svg.$.find("text").css({"font-size": "18px"});

    // Finish up
    svg.final();
    svg.$.on("click", () => sectors.fadeToggle());
},

});