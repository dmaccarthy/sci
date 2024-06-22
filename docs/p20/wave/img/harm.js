save("p20/wave/img/harm", {

long: (sel) => {
    $(sel).attr({width: 480, height: 160, "data-aspect": "3"});
    let svg = new SVG_Animation(sel, -1.5, 21);
    let g = svg.group().css({fill: "red"});
    let attr = {tail: "4"};
    svg.arrow([2.8, -2], [4.5, -2], attr, g);
    svg.arrow([3.2, -2], [1.5, -2], attr, g);
    svg.text("Particle Velocity", [3, -3], g);
    g = svg.group();
    svg.arrow([14.5, -2], [17.5, -2], attr, g);
    svg.text("Phase Velocity", [16, -3], g);
    svg.final();

    g = svg.group().addClass("Particles");
    for (let i=0;i<51;i++) svg.rect([0.093, 1.5], [0, 0], g);
    svg.items[12].css({fill: "red"});
    g = svg.group().addClass("CompRare");
    let w = 5, x = 1.25;
    let g1 = svg.group(g).css({fill: "#0065FE"});
    let g2 = svg.group(g).css({fill: "orange"});
    for (let n=-2;n<4;n++) {
        svg.arrow([x + n * w, 2.5], [x + n * w, 1], attr, g1);
        svg.arrow([x + (n + 0.5) * w, 2.5], [x + (n + 0.5) * w, 1], attr, g2);
        
    }
    svg.text("Compression", [x, 3.25], g1);
    svg.text("Rarefaction", [x + 1.5 * w, 3.25], g2);
    svg.$.css({"font-size": "18px"});
    // svg.$.find("text").css({"font-size": "18px"});

    svg.beforeupdate = function() {
        let r = this.$.find("g.Particles > rect");
        let A = 0.55, t = svg.time, T = 4, w = 5;
        let v = w / T;
        for (let i=0;i<r.length;i++) {
            let x = (i - 5) / 2;
            r[i].graphic.config({position: [x + A * cos(360 * (x / w - t / T)), 0]});
        }
        this.$.find("g.CompRare")[0].graphic.config({position: [(v * t) % (2 * w), 0]});
    }
    
    svg.update(0);
    svg.$.on("click", () => svg.toggle());
},

tr: (sel) => {
    $(sel).attr({width: 480, height: 360, "data-aspect": "4/3"});
    let svg = new SVG_Animation(sel, 0, 3, -2.5, 1.8, 2);
    svg.axis({x: [0, 3]});
    let attr = {tail: "4"};
    let css = {fill: "black", stroke: "none"};
    let g = svg.group();
    svg.arrow([1.78, -2], [2.22, -2], attr, g).css(css);
    svg.text("Phase Velocity", [2, -2.35], g);
    g = svg.group().css({fill: "red"}).config({theta: 90, position: [0.4, 0]});
    css.fill = "red";
    svg.arrow([-0.1, 0], [0.22, 0], attr, g).css(css);
    svg.arrow([0.1, 0], [-0.22, 0], attr, g).css(css);
    svg.text("Particle Velocity", [0, 0.35], g);

    svg.final();

    let travelingingWave = (x, t) => Math.sin(twoPi * (x - t / 2));
    svg.locus(travelingingWave, [0, 3], {}).css({fill: "none", stroke: "#0065FE", "stroke-width": "3px"});

    svg.circle(0.04, [0, 0]).css({fill: "red"}).beforeupdate = function() {
        this.config({position: [0.6, travelingingWave(0.6, this.svg.time)]});
    };

    g = svg.group();
    let g1 = svg.group(g).css({fill: "#0065FE"});
    let g2 = svg.group(g).css({fill: "orange"});
    for (let n=-2;n<3;n++) {
        svg.arrow([n + 0.25, 1.5], [n + 0.25, 1.1], attr, g1);
        svg.arrow([n + 0.75, -1.5], [n + 0.75, -1.1], attr, g2);
    }
    svg.text("Crest", [0.25, 1.65], g1);
    svg.text("Trough", [0.75, -1.65], g2);

    g.beforeupdate = function() {
        let t = this.svg.time / 2;
        this.config({position: [t % 2, 0]})
    }

    svg.$.css({"font-size": "18px"});
    svg.update(0);
    svg.$.on("click", () => svg.toggle());
},

Q6: (sel) => {
    let t = 20 / 9.81;
    let svg = applet.graph(sel, {
        grid: [[0, 6, 0.2], [-5, 5, 0.5], 1],
        margin: [0.15, 0.02, 0.05, 0.05],
        x: ["Position / m", [">", "12"], {interval: 1, minor: 5, offset: [0, "-22"], omitZero: 1, fixed: 0, length: "8"}],
        y: ["Displacement / cm", ["-48", "^"], {interval: 1, minor: 2, offset: ["-12", 0], fixed: 0, length: "8"}],        
    });
    svg.$.find(".TitleX").addClass("End");
    svg.locus((x) => 3 * sin(360 * x / 2.8), [0, 6]).css({stroke: "black", "stroke-width": "1px"});
    let g = svg.group().css({fill: "#0065FE", "font-weight": "bold"});
    svg.text("A", [0.5, 3.3], g);
    svg.text("B", [2.8, 1.5], g);
    svg.text("C", [4.4, -0.5], g);
    svg.final();
    let wave = (x, t) => {
        t /= 4;
        if (t > 0.4) {
            t = 0.4;
            svg.pause();
        }
        return 3 * sin(360 * (x - t) / 2.8);
    }
    svg.locus(wave, [0, 6]);
    svg.$.on("click", () => {
        if (svg.time >= 1.6 && !svg.playing) {
            svg.time = 0;
            svg.update(0);
        }
        else svg.toggle();
    });
    svg.update(0);
},

});
