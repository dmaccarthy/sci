SVG2.cache("p30/mag/img/helix.js", {

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.16, 1.16]});
    let tog = [css(svg.circle(1), "none", "black@1")];
    let mj_size = {scale: 1.2}; 

    /* Magnetic field */
    svg.text("⨂", null, 0, ["green", 32]);
    svg.mjax("\\vec{\\bf B}", mj_size, [-0.2, 0], "green");

    let q = svg.group().config({omega: 20, animated: true});

    /* Arrows */
    q.arrow({tail: [1, 0], tip: [1, 0.5]}, {tail: "6"}, "tail").css("red");
    tog.push(q.arrow({tail: [1, 0], tip: [0.5, 0]}, {tail: "6"}, "tail").css("#0065fe").$);

    /* Charge */
    css(q.circle("5", [1, 0]), "yellow", "black@1");

    /* Velocity */
    let cfg = {omega: -20, animated: true, pivot: [0.8, 0.27]};
    let v = q.group().config(cfg);
    v.mjax("\\vec{\\bf v}", mj_size, cfg.pivot, "red");

    // /* Force */
    cfg.pivot = [0.8, -0.2];
    let F = q.group().config(cfg);
    F.mjax("\\vec{\\bf F}_m", mj_size, cfg.pivot, "#0065fe"); 
    tog.push(F.$);

    click_cycle(svg.element, 3,
        () => {click_cycle.toggle(tog, true, 1, 2)},
        () => {svg.play()},
        () => {click_cycle.toggle(tog, true, 0)},
        () => {svg.pause()},
        () => {click_cycle.toggle(tog, false, 0, 1, 2)},
    );

},

cyclo: (sel) => {
    let svg = new SVG2(sel, {scale: 192, grid: 0, lrbt: [-1.2, 1.5, -1.2, 1.2], margin: 1});
    css(svg.circle(1.02), "#f0f0f0", "none@");
    svg.text("⨂", [0.4, 0.45, "r"], 0, ["green", 32]);
    svg.mjax("\\vec{\\bf B}", {scale: 1}, [0.5, 0.5], "green");
    let proton_init = {shift: [0, 0], vel: [0, 1e-2], upper_D: true};
    let proton = svg.group("#0065fe", "black@1").config({animated: true, ...proton_init});
    proton.circle("4");

    let dy = 0.03, w = 2 * root(1 - dy * dy);
    let g = svg.group("none", "black@1");
    g.poly([[0.9, dy], [0.9, 0.2], [1.2, 0.2]]);
    g.poly([[0.9, -dy], [0.9, -0.2], [1.2, -0.2]]);
    g = svg.group("tan", "black@1");
    g.rect([w, dy / 2], [0, dy]);
    g.rect([w, -dy / 2], [0, -dy]);

    let x = 1.3;
    let emf = svg.group("black", "none@").config({pivot: [x, 0]});;
    css(emf.rect([0.2, 0.5], [x, 0]), "silver", "black@1");
    emf.plusminus(0.1, 1).shift_by([x, -0.15]);
    emf.plusminus(0.1).shift_by([x, 0.15]);

    proton.beforeupdate = function() {
        let a, v = this.vel;
        [v, a] = [v.mag(), v.dir()];
        emf.config({theta: (a < 0 ? 180 : 0)});
        let r = this.shift.mag();
        if (r > 1.02) {
            this.config({acc: [0, 0]});
            return;
        }
        let flip = this.shift[1] >= 0;
        if (flip != this.upper_D) {
            this.upper_D = !this.upper_D;
            v = vec2d(Math.sqrt(v * v + 1e-3), a);
            this.config({vel: v});
            v = v.mag();
        }
        this.config({acc: vec2d(v, a + 90)});
    }

    proton.afterupdate = function() {
        if (this.shift.mag() > 2) {
            this.config(proton_init);
            this.svg.pause();
        }
    }

    svg.$.on("click", () => svg.toggle());
},

// linac: (sel) => {
//     let svg = new SVG2(sel, {size: [400, 200], lrbt: [-2, 10], grid: 1});

//     let L = [...fn_eval((E) => Math.sqrt(E), range(1, 5))];
//     console.log(L);
// },

});