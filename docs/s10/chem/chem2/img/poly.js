scripts.cache["s10/chem/chem2/img/poly"] = {

H2O: sel => {
    let svg = new SVG2(sel, {scale: 64, lrbt: [-1.25, 0.75, -0.5, 1.5]});
    let m = Molecule.H2O(svg);
    let i = 2;
    for (let bond of m.line.$.children()) $(bond).addClass(`Toggle${i++}`).hide();
    m.dots(null, [0, 0, "2112"]);
    css(m.dots(null, [0, 1, "0001"]), "red", ".Toggle1");
    css(m.dots(null, [-1, 0, "1000"]), "red", ".Toggle0");
    let atoms = m.text.$.children();
    css([atoms[1], atoms[2]], "red");
    let circ = m.circ.$.find("circle");
    for (i of [2, 3]) $(circ[i]).addClass(`Toggle${3-i}`);

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, true, 0, 1); t(svg, false, 2, 3)},
        () => {t(svg, false, 0); t(svg, true, 2)},
        () => {t(svg, false, 1); t(svg, true, 3)},
    );
},

OH: sel => {
    let svg = new SVG2(sel, {scale: 64, lrbt: [-1, 1.5, -0.65, 0.65]});
    let m = Molecule.OH(svg);

    // Make H red
    let text = m.text.$.children();
    css(text[0], "red");

    // Brackets and charge
    m.brac.css(".Toggle2").$.hide();
    $(text[2]).addClass("Toggle2").hide();

    // Bond
    $(m.line.$.children()[0]).hide().addClass("Toggle1");

    // Electron dots
    m.dots(null, [0.5, 0, "2212"]);
    css(m.dots(null, [-0.5, 0, "1000"]), "red", ".Toggle0");
    let circ = m.circ.$.find("circle");
    $(css(circ[2], "#0065fe", ".Toggle2")).hide();
    css(circ[4], ".Toggle0");

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, true, 0); t(svg, false, 1, 2)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );
},

H_bond: sel => {
    let svg = new SVG2(sel, {scale: 80, grid: 0, lrbt: [-1.25, 2.9, -0.4, 1.25]});
    Molecule.H2O(svg, 1);
    Molecule.H2O(svg, 1).shift_by([2.5, 0]);
    let h = css(svg.line([0.55, 0], [1.2, 0]), "red@2", {"stroke-dasharray": "3,3"});
    svg.$.on("click", () => h.fadeToggle());
},

};
