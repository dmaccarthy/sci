SVG2.cache("p20/circ/img/helio.js", {

helio: (sel) => {
    let svg = new SVG2(sel, {size: [641, 641], margin: 0, lrbt: [-1.7, 1.7]});
    svg.create_child("defs").html(`<linearGradient id="grey1" x1="100%" y2="100%"><stop offset="0%" stop-color="black" /><stop offset="100%" stop-color="#232323"/></linearGradient>`);

    // Draw zodiac background
    svg.rect([3.41, 3.41]).css({fill: "black"});
    let names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    let zodiac = svg.group().addClass("Text Zodiac");
    for (let i=0;i<12;i++) {
        let g = zodiac.group().config({theta: 30 * i});
        if (i % 2 == 0) g.poly([[0, 0], vec2d(2.5, 75), vec2d(2.5, 105)], 1).css({fill: "url(#grey1)", stroke: "none"});
        g.text(names[i], [0, 1.3]);
    }

    // Draw timer, line-of-sight arrow and Sun
    let years = svg.text("", [1.6, 1.55]).addClass("Mono Bold").css({"font-size": "36px", "text-anchor": "end", fill: "white"});
    let sight = svg.arrow(0.4, {tail: "6"});
    svg.circle("12").css({fill: "yellow"});

    // Draw the inner planets
    let animate = [];
    let mercury = {period: 0.242, color: "#b0b0b0", size: "4"};
    let venus = {period: 0.617, color: "#ffffe0", size: "7"};
    let earth = {period: 1, color: "#4090ff", size: "8"};
    let mars = {period: 1.89, color: "#ff6060", size: "5"};
    for (let p of [mercury, venus, earth, mars]) {
        let T = p.period;
        p.orbit = Math.pow(T, 2/3);
        let g = p.g = svg.group().config({omega: 360/T, theta: uniform(0, 360)});
        g.circle(p.size, [p.orbit, 0]).css({fill: p.color});
        animate.push(g);
    }

    svg.beforeupdate = function() { // Update time
        years.html(`${this.time.toFixed(2)} yr`);
    }

    svg.afterupdate = function() { // Update Earth-Mars line of sight
        let earthXY = vec2d(earth.orbit, earth.g.theta);
        let s = new Segment(...earthXY, ...vec2d(mars.orbit, mars.g.theta));
        sight.config({theta: s.deg, shift: s.point(0.27)});
        zodiac.config({shift: earthXY});
    }

    // Styling
    svg.css_map("text", "arrow");
    zodiac.css({fill: "grey", "font-size": "17px"});

    // Run the animation
    svg.animate(...animate).play();
    svg.$.on("click", () => svg.toggle());
},

});