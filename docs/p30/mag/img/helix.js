SVG2.cache("p30/mag/img/helix.js", {

ucm: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.16, 1.16]});
    svg.$.addClass("SVG2");
    let tog = [svg.circle(1)];

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = [0, "20"];

    /* Magnetic field */
    let c = {fill: "green"};
    svg.circle(0.1).css({fill: "none", stroke: c.fill});
    svg.text("×", [0, "-3"]).css(c);
    let sym = svg.symbol(["B", BD], ["→", SM, arr]).config({shift: [-0.25, -0.05]}).$;
    sym.addClass("Large").find("text").css(c);

    let q = svg.group().config({omega: 20});

    /* Velocity */
    let g = q.group();
    c.fill = "red";
    q.arrow({tail: [1, 0], tip: [1, 0.5]}, {tail: "6"}, "tail").$.children().css(c);
    sym = svg.symbol(["v", BD], ["→", SM, arr]).config({shift: [0.8, 0.25]}).$;
    sym.addClass("Large").find("text").css(c);

    /* Force */
    g = q.group();
    tog.push(g.$);
    c.fill = "#0065fe";
    g.arrow({tail: [1, 0], tip: [0.5, 0]}, {tail: "6"}, "tail").$.children().css(c);
    sym = svg.symbol(["F", BD], ["→", SM, arr], ["m", SM_IT, ["14", "-8"]]).config({shift: [0.8, -0.25]}).$;
    sym.addClass("Large").find("text").css(c);

    /* Charge */
    q.circle("5", [1, 0]).css({fill: "yellow"});

    // svg.$.find("text").css({ "font-size": "28px"});    
    svg.animate(q);

    clickCycle(svg.element, 3,
        () => {clickCycle.toggle(tog, true, 1)},
        () => {svg.play()},
        () => {clickCycle.toggle(tog, true, 0)},
        () => {svg.pause()},
        () => {clickCycle.toggle(tog, false, 0, 1)},
    );

},

linac: (sel) => {
    let svg = new SVG2(sel, {size: [400, 200], lrbt: [-2, 10], grid: 1});
    svg.$.addClass("SVG2");

    let L = [...fn_eval((E) => Math.sqrt(E), range(1, 5))];
    console.log(L);

},

});