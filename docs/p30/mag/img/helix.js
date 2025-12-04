

SVG2.cache("p30/mag/img/helix.js", {

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], grid: 0, lrbt: [-1.16, 1.16]});
    let tog = [css(svg.circle(1), "none", "black@1")];

    /* Magnetic field */
    css(svg.circle(0.1), "none", "green@1");
    svg.gtext("×", ["green", 28], ["-1", "1"])
    svg.mjax("\\color{green}\\vec{\\bf B}", "36").then(g => g.shift_by([-0.25, 0]));

    let q = svg.group().config({omega: 20, animated: true});

    /* Velocity */
    let g = q.group();
    q.arrow({tail: [1, 0], tip: [1, 0.5]}, {tail: "6"}, "tail").css("red");
    q.mjax("\\color{red}\\vec{\\bf v}", "29").then(g => g.config({shift: [0.8, 0.27], omega: -20, animated: true}));

    /* Force */
    g = q.group();
    tog.push(g.$);
    g.arrow({tail: [1, 0], tip: [0.5, 0]}, {tail: "6"}, "tail").css("#0065fe");
    g.mjax("\\color{#0065fe}\\vec{\\bf F}_m", "42").then(g => g.config({shift: [0.8, -0.2], omega: -20, animated: true}));

    /* Charge */
    css(q.circle("5", [1, 0]), "yellow", "black@1");

    click_cycle(svg.element, 3,
        () => {click_cycle.toggle(tog, true, 1)},
        () => {svg.play()},
        () => {click_cycle.toggle(tog, true, 0)},
        () => {svg.pause()},
        () => {click_cycle.toggle(tog, false, 0, 1)},
    );

},

// linac: (sel) => {
//     let svg = new SVG2(sel, {size: [400, 200], lrbt: [-2, 10], grid: 1});

//     let L = [...fn_eval((E) => Math.sqrt(E), range(1, 5))];
//     console.log(L);
// },

});