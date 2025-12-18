SVG2.cache("p20/wave/img/harm.js", {

wave: (sel, t, y, wave) => {
    let [T, dt, dec_t] = t ? t : [1, 0.2, 1];
    let [ymax, dy, dec_y] = y ? y : [4, 1, 0];
    let [ux, uy, v] = wave;
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-dt, 9*dt, -5*dy, 5*dy], margin: [36, 16, 12, 12]});
    svg.graph({grid: [dt, dy],
        x: {tick: [dt, 9.1*dt, dt], dec: dec_t, title: [`Position / ${ux}`, [7.5*dt, "8"]], shift: [0, "-18"]},
        y: {tick: [-5*dy, 5.1*dy, dy], dec: dec_y, title: [`Displacement / ${uy}`, "-60"], shift: ["-20", 0]},
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

    svg.beforeupdate = function() {
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

longWave: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-1.6, 20.9, -3.6 , 3.8]});
    let w = 5, T = 4, v = w / T;

    // Particles
    let particles = svg.group("black");
    for (let i=0;i<51;i++) particles.group().rect([0.093, 1.5]);
    particles = particles.find_all("g");
    particles[12].css("red");

    // Velocities
    let text = svg.group("sans", 18, "black");
    text.gtext("Phase Velocity", [], [18, -3]);
    svg.arrow({tail: [16.25, -2], tip: [19.75, -2]}, {tail: "5"});
    let g = text.group("red");
    g.gtext("Particle Velocity", [], [3.5, -3]);
    g.arrow({tail: [1.75, -2], tip: [5.25, -2]}, {tail: "5", double: 1});

    // Compression/Rarefaction lables
    let blue = svg.group("sans", "none@", "#0065fe");
    let x = 1.25;
    blue.gtext("Compression", [], [x, 3.25]);
    orange = blue.group({fill: "orange"});
    orange.gtext("Rarefaction", [], [x + 1.5 * w, 3.25]);
    for (let i=-2;i<4;i++) {
        let x0 = x + i * w;
        blue.arrow({tail: [x0, 2.5], tip: [x0, 1]}, {tail: "4"});
        x0 += w / 2;
        orange.arrow({tail: [x0, 2.5], tip: [x0, 1]}, {tail: "4"});
    }

    svg.beforeupdate = function() {
        let t = svg.time;
        for (let i=0;i<particles.length;i++) {
            let x = (i - 5) / 2;
            x += 0.55 * Math.cos(twoPi * (x / w - t / T));
            particles[i].config({shift: [x, 0]});
        }
        blue.config({shift: [(v * t) % (2 * w), 0]});
    }

    svg.update(0).$.on("click", () => svg.toggle());
},

trWave: (sel) => {
    let svg = new SVG2(sel, {scale: [160, 80], lrbt: [0, 3, -2.5, 1.8], margin: [0, 0, 4, 4]});
    let travelingingWave = (x, t) => Math.sin(twoPi * (x - t / 2));

    let g = svg.group("arrow", "sans", 18, {stroke: "none"});
    let blue = g.group("#0065fe");
    let orange = g.group({fill: "orange"});
    blue.gtext("Crest", [], [0.25, 1.7]);
    orange.gtext("Trough", [], [0.75, -1.7]);
    for (let x = -1.75; x < 3; x += 1) {
        blue.arrow({tip: [x, 1.1], tail: [x, 1.5]}, {tail: "4"});
        orange.arrow({tip: [x + 0.5, -1.1], tail: [x + 0.5, -1.5]}, {tail: "4"});
    }
    svg.locus2(travelingingWave, [0, 3]).css("none", "#0065fe@3").config({animated: true});
    let red = svg.group("red", "black@1");
    red.circle("5");

    svg.beforeupdate = function() {
        let t = this.time;
        g.config({shift: [(t % 4) / 2, 0]});
        red.config({shift: [0.6, travelingingWave(0.6, t)]});
    }

    let text = svg.group("sans", 18, "black");
    text.gtext("Phase Velocity", [], [2.25, -2.4]);
    svg.arrow({tail: [2, -2.05], tip: [2.5, -2.05]}, {tail: "5"});
    let rot = text.group("red").shift_by([0.2, 0]).config({theta: 90});
    rot.gtext("Particle Velocity");
    rot.arrow({tail: [-0.25, -0.35], tip: [0.25, -0.35]}, {tail: "5", double: 1});

    svg.$.on("click", () => svg.toggle());
    svg.update(0);
},

Q6: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 6, -5, 5], margin: [60, 12, 10, 12]});
    svg.graph({grid: [0.2, 0.5],
        x: {tick: [0, 6.1, 1], title: ["Position / m", [5.2, "8"]], shift: [0, "-18"]},
        y: {tick: [-5, 5.1, 1], title: ["Displacement / cm", "-40"], shift: ["-20", 0]},
        data: [
            {locus: [(x) => 3 * sin(360 * x / 2.8), [0, 6]]},
            {locus: [(x, t) => 3 * sin(360 * (x - t / 4) / 2.8), [0, 6]]},
        ]
    });
    svg.$.find("g.LabelX text.Zero").remove();

    let g = svg.group("sans", "#0065fe", "bold");
    for (let [t, p] of [
        ["A", [0.4, 3.2]], ["B", [2.8, 1.5]], ["C", [4.45, -0.5]]
    ]) g.gtext(t, [], p);

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
    let g = svg.locus2(x => 2 * sin(360 / 5 * x)).css("none", "black@1");
    g.$.prependTo(svg.$.find("g.Series"));
},

Q7: (sel) => {
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [0.75, 0.2, 1], [6, 1.5, 1], ["m", "cm", 0.15]);
    let g = svg.locus2(x => 6 * sin(360 / 0.75 * x)).css("none", "black@1");
    g.$.prependTo(svg.$.find("g.Series"));
},

});
