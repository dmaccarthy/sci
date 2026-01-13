SVG2.cache("p20/wave/img/harm.js", {

wave: (sel, t, y, wave) => {
    let [T, dt, dec_t] = t ? t : [1, 0.2, 1];
    let [ymax, dy, dec_y] = y ? y : [4, 1, 0];
    let [ux, uy, v] = wave;
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-dt, 9*dt, -5*dy, 5*dy], grid: [dt, dy], margin: [36, 16, 12, 12]});
    let opt = {size: ["-6", 0], css: ["sans", 15], shift: "-8"};
    svg.ticks({x: [dt, 9.1*dt, dt], label: dec_t, ...opt});
    svg.ticks({y: [-5*dy, 5.1*dy, dy], label: dec_y, ...opt});
    let g = svg.group(".AxisTitles", "sans", 18);
    g.text(`Position / ${ux}`, [8.9 * dt, "8", "br"], 0);
    g.text(`Displacement / ${uy}`, ["-44", 4.9 * dy, "br"], 90);
    svg.locus((x, t) => ymax * sin(360 / T * (x - v * t))).config({animated: true}).css("none", "#0065fe@3");
    svg.$.on("click", () => svg.toggle()).find("g.Zero").remove();
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
    svg.locus(travelingingWave, [0, 3]).css("none", "#0065fe@3").config({animated: true});
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
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [2.8, 0.8, 1], [3, 1, 0], ["m", "cm", 0.2]);
    svg.find(".AxisTitles > g", 1).shift_by(["14", 0]);
    let eq = x => 3 * sin(360 / 2.8 * x);
    let g = svg.locus(eq).css("none", "black@1");
    g.$.insertBefore(svg.$.find("g.Locus"));
    g = svg.group("red", "black@1");
    for (let x of [0.5, 3.1, 4.3]) g.circle("4", [x, eq(x)]);
    g = svg.group("sans", 24, "bold", "red");
    g.text("A", [0.2, 2.8]);
    g.text("B", [2.8, 1.8]);
    g.text("C", [4.6, -0.8]);

    svg.afterupdate = function() {
        if (svg.time >= 1.6) {
            svg.pause();
            svg.time = 1.6;
        }
    }
},

Q1: (sel) => {
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [5, 1, 1], [2, 0.5, 1], ["cm", "cm", 1]);
    let g = svg.locus(x => 2 * sin(360 / 5 * x)).css("none", "black@1");
    g.$.insertBefore(svg.$.find("g.Locus"));
},

Q7: (sel) => {
    let svg = SVG2.cache_run("p20/wave/img/harm.js", "wave", sel, [0.75, 0.2, 1], [6, 1.5, 1], ["m", "cm", 0.15]);
    let g = svg.locus(x => 6 * sin(360 / 0.75 * x)).css("none", "black@1");
    g.$.insertBefore(svg.$.find("g.Locus"));
},

});
