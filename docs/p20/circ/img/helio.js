SVG2.cache("p20/circ/img/helio.js", {

helio: (sel) => {
    let svg = new SVG2(sel, {scale: 192, lrbt: [-1.7, 1.7, -1.7, 1.7]});

    // Draw zodiac background
    svg.gradient("grey1", "black", "#232323", 100, 0, 0, 100);
    svg.rect([3.41, 3.41]).css({fill: "black"});
    let names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    let zodiac = svg.group(".Zodiac", "grey", 16);

    for (let i=0;i<12;i++) {
        let g = zodiac.group().config({theta: 30 * i});
        if (i % 2 == 0) g.poly([[0, 0], vec2d(2.5, 75), vec2d(2.5, 105)], 1).css({fill: "url(#grey1)", stroke: "none"});
        g.gtext(names[i], [], [0, 1.3]);
    }

    // Draw animated timer
    let g = svg.gtext("yr", ["text", "mono", 36, "bold", "white", {"text-anchor": "end"}], [1.6, 1.5, 1, 0.5]);
    let years = g.content;
    g.config({animated: true}).beforeupdate = () => years.html(`${svg.time.toFixed(2)} yr`);

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

    // Run the animation
    svg.play().$.on("click", () => svg.toggle());
},

});