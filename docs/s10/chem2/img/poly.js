SVG2.cache("s10/chem2/img/poly.js", {

H2O: (sel) => {
    $(sel).attr({width: 200, height: 200, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -0.6, 0.7, -0.4);
    let g = svg.group().css({"font-size": "36px"});
    let x = 0.35, r = 0.03, dx = 0.05, y = 0.25;
    svg.text("H", [-x, 0], g).css({fill: "red"});
    svg.text("H", [x, 2 * x], g).css({fill: "red"});
    svg.text("O", [x, 0], g);
    g.$.find("text").css({"font-family": '"Noto Serif", serif'});
    let bond = x - 0.24;
    let pt = [x, y + 2 * bond];

    let tog = [];
    tog.push(svg.line([bond, 0], [-bond, 0]).css({stroke: "black", "stroke-width": "2px"}).$);
    tog.push(svg.circle(r, [bond, 0]).$.hide());
    tog.push(svg.circle(r, [-bond, 0]).css({fill: "red"}).$.hide());

    tog.push(svg.line([x, y], pt).css({stroke: "black", "stroke-width": "2px"}).$);
    tog.push(svg.circle(r, [x, y]).$.hide());
    tog.push(svg.circle(r, pt).css({fill: "red"}).$.hide());

    svg.circle(r, [x - dx, -y]);
    svg.circle(r, [x + dx, -y]);
    svg.circle(r, [2 * x - bond, dx]);
    svg.circle(r, [2 * x - bond, -dx]);
    svg.final();

    let toggle = clickCycle.toggle;

    clickCycle(svg.element, 1,
        () => {toggle(tog, true, 0); toggle(tog, false, 1, 2)},
        () => {toggle(tog, true, 3); toggle(tog, false, 4, 5)},
        () => {toggle(tog, true, 1, 2, 4, 5); toggle(tog, false, 0, 3)},
    );

},

OH: (sel) => {
    $(sel).attr({width: 206, height: 103, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.52, 0.81);
    // svg.grid([-1, 1, 0.1], [-1, 1, 0.1]);
    let g = svg.group().css({"font-size": "36px"});
    let x = 0.35, r = 0.03, dx = 0.05, y = 0.25;
    svg.text("H", [-x, 0], g).css({fill: "red"});
    svg.text("O", [x, 0], g);
    g.$.find("text").css({"font-family": '"Noto Serif", serif'});
    let bond = x - 0.24;

    let tog = [];
    tog.push(svg.line([bond, 0], [-bond, 0]).css({stroke: "black", "stroke-width": "2px"}).$.hide());
    tog.push(svg.circle(r, [bond, 0]).$);
    tog.push(svg.circle(r, [-bond, 0]).css({fill: "red"}).$);

    g = svg.group();
    tog.push(g.$.hide());

    svg.circle(r, [x + dx, y], g).css({fill: "red"});
    svg.text("—", [0.78, 0.3], g).css({"font-size": "18px"});
    g = svg.group(g).css({fill: "none", stroke: "black", "stroke-width": "2px"});
    svg.poly([[0.6, 0.3], [0.7, 0.3], [0.7, -0.3], [0.6, -0.3]], 0, g);
    svg.poly([[-0.4, 0.3], [-0.5, 0.3], [-0.5, -0.3], [-0.4, -0.3]], 0, g);

    svg.circle(r, [x - dx, y]);
    svg.circle(r, [x - dx, -y]);
    svg.circle(r, [x + dx, -y]);
    svg.circle(r, [2 * x - bond, dx]);
    svg.circle(r, [2 * x - bond, -dx]);
    svg.final();

    let toggle = clickCycle.toggle;

    clickCycle(svg.element, 2,
        () => {toggle(tog, true, 0); toggle(tog, false, 1, 2)},
        () => {toggle(tog, true, 3)},
        () => {toggle(tog, true, 1, 2); toggle(tog, false, 0, 3)},
    );
},


});
