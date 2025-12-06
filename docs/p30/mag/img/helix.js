SVG2.cache("p30/mag/img/helix.js", {

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.16, 1.16]});
    let tog = [css(svg.circle(1), "none", "black@1")];

    /* Magnetic field */
    svg.gtext("⨂", ["green", 32]);
    svg.mj("B", 1, [-0.2, 0], "green");

    let q = svg.group().config({omega: 20, animated: true});

    /* Velocity */
    let g = q.group();
    q.arrow({tail: [1, 0], tip: [1, 0.5]}, {tail: "6"}, "tail").css("red");
    let cfgv = {omega: -20, animated: true, pivot: [0.8, 0.27]};
    q.mj("v", 1, cfgv.pivot, "red").then(g => g.config(cfgv));

    /* Force */
    g = q.group();
    tog.push(g.$);
    g.arrow({tail: [1, 0], tip: [0.5, 0]}, {tail: "6"}, "tail").css("#0065fe");
    let cfgF = {...cfgv};
    cfgF.pivot = [0.8, -0.2];
    g.mj("Fm", 1, cfgF.pivot, "#0065fe").then(g => g.config(cfgF));

    /* Charge */
    css(q.circle("5", [1, 0]), "yellow", "black@1");

    // svg.blob().text().then(console.log);

    click_cycle(svg.element, 3,
        () => {click_cycle.toggle(tog, true, 1)},
        () => {svg.play()},
        () => {click_cycle.toggle(tog, true, 0)},
        () => {svg.pause()},
        () => {click_cycle.toggle(tog, false, 0, 1)},
    );

    // setTimeout(() => svg.save(), 2000); // Does not work until Promises resolved!

},

// linac: (sel) => {
//     let svg = new SVG2(sel, {size: [400, 200], lrbt: [-2, 10], grid: 1});

//     let L = [...fn_eval((E) => Math.sqrt(E), range(1, 5))];
//     console.log(L);
// },

});