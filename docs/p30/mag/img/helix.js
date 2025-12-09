SVG2.cache("p30/mag/img/helix.js", {

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.16, 1.16]});
    let tog = [css(svg.circle(1), "none", "black@1")];
    let mj_size = {scale: 1.2}; 

    /* Magnetic field */
    svg.gtext("⨂", ["green", 32]);
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

// linac: (sel) => {
//     let svg = new SVG2(sel, {size: [400, 200], lrbt: [-2, 10], grid: 1});

//     let L = [...fn_eval((E) => Math.sqrt(E), range(1, 5))];
//     console.log(L);
// },

});