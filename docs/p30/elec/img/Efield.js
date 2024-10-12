SVG2.cache("p30/elec/img/Efield.js", {

ex1: (sel) => {
    $(sel).attr({width: 364, height: 338, "data-aspect": "14/13"});
    let svg = new SVG_Animation(sel, -1, 13, -1);
    svg.grid([-1, 13, 1], [-1, 12, 1]).$.find(".Axis").removeClass("Axis");
    let g = svg.group();
    let tog = [
        svg.circle(0.2, [6, 0], g).$,
        svg.poly([[0, 6], [0, 0], [12, 0], [0, 6], [3, 6]], 1).css({fill: "none", stroke: "black"}).before(g.$).$,
        svg.circle(0.2, [0, 6], g).$,
    ];
    g.$.children().css({fill: "green"});

    g = svg.group();
    let E1 = 12.49, E2 = 7.492, E3 = 1.5;
    let s = 2.4, y = 0.2, p = 6.25;
    tog = tog.concat([
        svg.arrow([p, -y], [p + E1 / s, -y], {tail: "8"}, g).$,
        svg.arrow([p, y], [6.2 + E2 / s, y], {tail: "8"}, g).$,
        svg.arrow([0, p], [0, p + E1 / s], {tail: "8"}, g).$,
        svg.arrow([0, 0], E3 / s, {tail: "2", anchor: "tail"}, g).config({theta: -26.565, position: [0.3, 5.85]}).$,
    ]);
    g.$.children().addClass("Vector");

    svg.circle(0.6, [0, 0]);
    svg.circle(0.6, [12, 0]);
    g = svg.group().css({"font-size": "24px", fill: "white", "font-weight": "bold"});
    svg.text("+", [0, -0.05], g);
    svg.text("–", [12, 0], g);

    g = svg.group().css({"font-size": "18px"});
    tog.push(g.$);
    svg.text("θ", [9.8, 0.5], g);
    svg.text("θ", [1.7, 5.55], g);
    svg.final().$.addClass("VDiag");

    let t = clickCycle.toggle;

    clickCycle(svg.element, -1,
        () => {t(tog, false, 0, 1, 2, 3, 4, 5, 6, 7)},
        () => {t(tog, true, 0)},
        () => {t(tog, true, 3)},
        () => {t(tog, true, 4)},
        () => {t(tog, false, 0, 3, 4); t(tog, true, 1, 2, 7)},
        () => {t(tog, true, 5)},
        () => {t(tog, true, 6)},
    );
},

});