SVG2.cache("p20/wave/img/harm.js", {

wave: (sel, t, y, wave) => {
    let [T, dt, dec_t] = t ? t : [1, 0.2, 1];
    let [ymax, dy, dec_y] = y ? y : [4, 1, 0];
    let [ux, uy, v] = wave;
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-dt, 9*dt, -5*dy, 5*dy], margin: [36, 16, 12, 12]});
    svg.graph({grid: [dt, dy],
        x: {tick: [dt, 9.1*dt, dt], dec: dec_t, title: [`Position / ${ux}`, [7.5*dt, "8"]], shift: [0, "-22"]},
        y: {tick: [-5*dy, 5.1*dy, dy], dec: dec_y, title: [`Displacement / ${uy}`, "-60"], shift: ["-10", "-4"]},
        data: [{locus: [(x, t, v) => ymax * sin(360 / T * (x - v * t)), null, v]}]
    });
    svg.$.find("text.Zero").remove();
    svg.animate(svg.series[0].find(".Locus"));
    svg.$.on("click", () => svg.toggle());
    return svg;
},

ray: (sel) => {
    let svg = new SVG2(sel, {scale: 20, lrbt: [-10, 10, -10, 10], margin: 1});
    svg.time = 16;
    let w = svg.group().addClass("Wavefronts").css({fill: "none", stroke: "#0065fe", "stroke-width": "3px"});
    let r = svg.group().addClass("Rays");
    let css = {fill: "none", stroke: "red", "stroke-width": "2px"};
    for (let i=0;i<8;i++) {
        r.ray([0, 0], vec2d(15, 45*i), {size: "12", ratio: 0.75}, 0.6).css(css);
        w.circle(2*i);
    }

    svg.beforeupdate = function(a) {
        let t = w.svg.time;
        let waves = w.$.find("circle");
        for (let c of waves) {
            let r = t % 16;
            if (r > 0) w.circle(r, null, c).show();
            t -= 2;
        }
    }

    svg.$.on("click", (ev) => {
        if (ev.ctrlKey) {
            svg.time = 0;
            w.$.find("circle").hide();
        }
        else svg.toggle();
    });

    svg.$.addClass("NoStyle").css({"background-color": "#f8f8ff"});
},

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
    svg.$.find("text").css({"font-size": "18px"});

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

trWave: (sel) => {
    let svg = new SVG2(sel, {scale: [160, 80], lrbt: [0, 3, -2.5, 1.8], margin: [0, 0, 4, 4]});
    let travelingingWave = (x, t) => Math.sin(twoPi * (x - t / 2));

    let g = svg.group("arrow", "text", "f18", {stroke: "none"});
    let blue = g.group("blue");
    let orange = g.group({fill: "orange"});
    blue.gtext("Crest", [], [0.25, 1.7]);
    orange.gtext("Trough", [], [0.75, -1.7]);
    for (let x = -1.75; x < 3; x += 1) {
        blue.arrow({tip: [x, 1.1], tail: [x, 1.5]}, {tail: "4"});
        orange.arrow({tip: [x + 0.5, -1.1], tail: [x + 0.5, -1.5]}, {tail: "4"});
    }
    svg.animate(svg.locus(travelingingWave, [0, 3], {}).css("blue3"));
    let red = svg.group("red", "black1");
    red.circle("5");

    svg.beforeupdate = function() {
        let t = this.time;
        g.config({shift: [(t % 4) / 2, 0]});
        red.config({shift: [0.6, travelingingWave(0.6, t)]});
    }

    let text = svg.group("text", "f18", "black");
    text.gtext("Phase Velocity", [], [2.25, -2.4]);
    svg.arrow({tail: [2, -2.05], tip: [2.5, -2.05]}, {tail: "5"});
    let rot = text.group("red").shiftBy([0.2, 0]).config({theta: 90});
    rot.gtext("Particle Velocity", []);
    rot.arrow({tail: [-0.25, -0.35], tip: [0.25, -0.35]}, {tail: "5", double: 1});

    svg.$.on("click", () => svg.toggle());
    svg.update(0);
},

Q6: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 6, -5, 5], margin: [60, 12, 10, 12]});
    svg.graph({grid: [0.2, 0.5],
        x: {tick: [0, 6.1, 1], title: ["Position / m", [5.2, "8"]], shift: [0, "-22"]},
        y: {tick: [-5, 5.1, 1], title: ["Displacement / cm", "-40"], shift: ["-10", "-4"]},
        data: [
            {locus: [(x) => 3 * sin(360 * x / 2.8), [0, 6]]},
            {locus: [(x, t) => 3 * sin(360 * (x - t / 4) / 2.8), [0, 6]]},
        ]
    });
    svg.$.find("g.LabelX text.Zero").remove();

    let g = svg.group().css({"font-family": SVG2.sans, "font-size": "18px", fill: "#0065FE", "font-weight": "bold"});
    g.ctext(["A", [0.4, 3.2]], ["B", [2.8, 1.5]], ["C", [4.4, -0.5]]);

    let loci = svg.series;

    svg.afterupdate = function() {
        if (svg.time >= 1.6) {
            svg.pause();
            svg.time = 1.6;
        }
    }

    svg.animate(loci[1].find(".Locus")).$.on("click", () => {
        if (svg.time >= 1.6) {
            svg.time = 0;
            svg.update(0);
        }
        else svg.toggle();
    });

    loci[0].$.find("polyline").css({stroke: "black", "stroke-width": "1px"});
    loci[1].$.find("polyline").css({"stroke-width": "3px"});
},

Q1: (sel) => {
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [5, 1, 1], [2, 0.5, 1], ["cm", "cm", 1]);
    let g = svg.locus((x) => 2 * sin(360 / 5 * x));
    g.$.prependTo(svg.$.find("g.Series")).css({fill: "none", stroke: "black", "stroke-width": "1px"});    
},

Q7: (sel) => {
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [0.75, 0.2, 1], [6, 1.5, 1], ["m", "cm", 0.15]);
    let g = svg.locus((x) => 6 * sin(360 / 0.75 * x));
    g.$.prependTo(svg.$.find("g.Series")).css({fill: "none", stroke: "black", "stroke-width": "1px"});    
},

});
