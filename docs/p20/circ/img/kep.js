scripts.cache["p20/circ/img/kep"] = {

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
    g.text("Major Axis", [0.5, 0.05, "b"]);
    g.text("Minor Axis", [-0.05, -0.35, "b"], 90);

    g = svg.group("black@1");
    g.circle("5", planet).css({fill: "#0065fe"});
    g.circle("5", f).css({fill: "orange"});

    g = svg.group("sans");
    for (let [t, p] of [
        ["A", [1.04, 0, "l"]],
        ["C", [0.04, 0, "tl"]],
        ["F", [f[0] + 0.04, 0, "tl"]],
        ["P", [-1.04, 0, "r"]]
    ]) g.text(t, p);

    svg.$.on("click", () => sector.fadeToggle());
},

helio: (sel) => {
    let svg = new SVG2(sel, {scale: 192, lrbt: [-1.7, 1.7, -1.7, 1.7]});

    // Draw zodiac background
    svg.gradient("grey1", "black", "#232323", 100, 0, 0, 100);
    svg.rect([3.41, 3.41]).css({fill: "black"});
    let names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    let zodiac = svg.group(".Zodiac", "sans", "grey", 16);

    for (let i=0;i<12;i++) {
        let g = zodiac.group().config({theta: 30 * i});
        if (i % 2 == 0) g.poly([[0, 0], vec2d(2.5, 75), vec2d(2.5, 105)], 1).css({fill: "url(#grey1)", stroke: "none"});
        g.text(names[i], [0, 1.3]);
    }

    // Draw animated timer
    let years = svg.text("yr", [1.6, 1.5, "r"], 0, ["mono", 36, "bold", "white"]);
    years.config({animated: true}).beforeupdate = () => {years.text = `${svg.time.toFixed(2)} yr`};

    // Draw line-of-sight arrow and Sun
    let sight = svg.arrow(0.4, {tail: "6"}).css("red", "none@");
    svg.circle("12").css({fill: "yellow"});

    // Draw the inner planets
    let mercury = {period: 0.242, color: "#b0b0b0", size: "4"};
    let venus = {period: 0.617, color: "#ffffe0", size: "7"};
    let earth = {period: 1, color: "#4090ff", size: "8"};
    let mars = {period: 1.89, color: "#ff6060", size: "5"};
    for (let p of [mercury, venus, earth, mars]) {
        let T = p.period;
        p.orbit = Math.pow(T, 2/3);
        let g = p.g = svg.group({fill: p.color}).config({animated: true, omega: 360/T, theta: uniform(0, 360)});
        g.circle(p.size, [p.orbit, 0]);
    }

    svg.afterupdate = function() {
    // Update Earth-Mars line of sight and recenter zodiac
        let earthXY = vec2d(earth.orbit, earth.g.theta);
        let s = new Segment(...earthXY, ...vec2d(mars.orbit, mars.g.theta));
        sight.config({theta: s.deg, shift: s.point(0.27)});
        zodiac.config({shift: earthXY});
    }

    // Ready the animation
    svg.update(0).$.on("click", () => svg.toggle());
},

};