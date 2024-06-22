save("p20/energy/img/we", {

work: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 20, 1], [-400, 400, 50], 1],
        margin: [0.2, 0.06, 0.04, 0.05],
        x: ["Position / m", [">", "12"], {interval: 5, length: "8", omitZero: 1, offset: [0, "-22"]}],
        y: ["Force / N", ["-60", ">"], {interval: 100, length: "8", offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let g = svg.group().before("g.Axes");
    svg.poly([[0, 0], [5, 400], [5, 0]], 1, g).addClass("Shade");
    svg.rect([5, 400], [7.5, 200], g).addClass("Shade");
    svg.poly([[10, 0], [10, 400], [15, 0]], 1, g).addClass("Shade");
    svg.poly([[20, 0], [20, -400], [15, 0]], 1, g).addClass("Shade");
    svg.poly([[0, 0], [5, 400], [10, 400], [20, -400]], 0, g);
    g = svg.group().css({fill: "#0065FE"}).before("g.Axes");
    svg.text("1000 J", [3, 75], g).addClass("Label");
    svg.text("2000 J", [7.5, 200], g).addClass("Label");
    svg.text("1000 J", [12, 75], g).addClass("Label");
    svg.text("-1000 J", [18, -75], g).addClass("Label");
    svg.$.find(".Shade").css({stroke: "#0065FE", "stroke-width": 1});
    svg.final();

    let shade = (n) => {
        let s = svg.$.find(".Shade, .Label");
        for (let i=0;i<4;i++) {
            let [p, t] = [$(s[i]), $(s[i+4])];
            if (i > n) {p.hide(); t.hide()}
            else if (i == n || n == 4) {
                p.css({fill: "#0065FE", stroke: "#0065FE"}).fadeIn();
                t.css({fill: "#0065FE"}).fadeIn();
            }
            else {
                p.css({fill: "lightgrey", stroke: "grey"});
                t.css({fill: "grey"});
            }
        }
    }
    clickCycle(svg.element, -1,
        () => {shade(-1)},
        () => {shade(0)},
        () => {shade(1)},
        () => {shade(2)},
        () => {shade(3)},
        () => {shade(4)},
    );
},

tennis: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 80, 5], [0, 90, 5], 1],
        margin: [0.18, 0.06, 0.1, 0.05],
        x: ["Position / cm", [69, "12"], {interval: 10, minor: 2, length: "8", offset: [0, "-22"]}],
        y: ["Force / N", ["-48", ">"], {interval: 10, minor: 2, length: "8", offset: ["-12", 0]}],
    });
    svg.$.find(".TitleX, .TitleY").addClass("End");
    svg.poly([[0, 0], [40, 80], [50, 80], [75, 0]], 0);
    svg.final();
},

Q1: (sel) => {
    let s = $(sel).attr({width: 512, height: 256, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.5, 2.75);
    svg.circle(0.8, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    let g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.text("Waste", [2.4, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.arrow([1.25, 0], 0.8, {tail: "6"}, g);
    svg.text("75.0 J", [0.45, -0.15], g);
    svg.text("30.0 J", [1.55, -0.15], g);
    svg.final();
},

Q2: (sel) => {
    let s = $(sel).attr({width: 360, height: 256, "data-aspect": "360/256"});
    let svg = new SVG_Animation(sel, -0.5, 1.9);
    svg.circle(0.8, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    let g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.text("4.46 kJ", [0.45, -0.15], g);
    svg.final();
},

Q4: (sel) => {
    let s = $(sel).attr({width: 512, height: 256, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.5, 2.75, -0.3);
    svg.circle(0.75, [1.05, 0.55]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0]).css({fill: "#0065FE"});
    svg.symbol("E", {q4: "g", scale: 1}, [1, 1.1]).css({fill: "#0065FE"});

    let g = svg.group().css({fill: "#0065FE"}).config({position: [1.05, 0.55], theta: 90});
    svg.arrow([-0.4, 0], 0.8, {tail: "6"}, g);
    svg.text("13.7 J", [-0.1, 0.1], g);
    
    g = svg.group().css({fill: "red"});
    svg.text("Food", [-0.25, 0], g).css({"font-size": "24px"});
    svg.text("Waste", [2.4, 0], g).css({"font-size": "24px"});
    svg.arrow([0.05, 0], 0.8, {tail: "6"}, g);
    svg.arrow([1.25, 0], 0.8, {tail: "6"}, g);
    svg.text("20.0 J", [0.4, -0.1], g);
    svg.text("6.35 J", [1.7, -0.1], g);
    svg.final();
},

});