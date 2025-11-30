SVG2.cache("s10/chem2/img/poly.js", {

H2O: (sel) => {
    let svg = new SVG2(sel, {scale: 34, lrbt: [-2.25, 3.6, -3.5, 1.5]}).css(".NoStyle");
    let text = ["symbol", "f36"];
    let O = svg.group("black").shift_by([1.5, 0]);
    let elec = O.edot(6).config({theta: -90}).$.find("circle");
    for (let i of [2, 3]) $(elec[i]).addClass(`Toggle${3-i}`);
    O.gtext("O", text);

    let H = svg.group("red").shift_by([-1.5, 0]);
    H.edot(1).config({theta: 180}).$.find("circle").addClass("Toggle0");
    H.gtext("H", text);
    svg.line([-0.5, 0], [0.5, 0]).addClass("Toggle2").css(SVG2.css("black2")).hide();

    H = svg.group("red").shift_by([1.5, -3]);
    H.edot(1).config({theta: -90}).$.find("circle").addClass("Toggle1");
    H.gtext("H", text);
    svg.line([1.5, -2], [1.5, -1]).addClass("Toggle3").css(SVG2.css("black2")).hide();

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, true, 0, 1); t(svg, false, 2, 3)},
        () => {t(svg, false, 0); t(svg, true, 2)},
        () => {t(svg, false, 1); t(svg, true, 3)},
    );

},

OH: (sel) => {
    let svg = new SVG2(sel, {scale: 34, lrbt: [-2.25, 3.6, -1.4, 1.4]}).css(".NoStyle");
    let text = ["symbol", "f36"];
    let O = svg.group("black").shift_by([1.5, 0]);
    let elec = O.edot(7).config({theta: -90}).$.find("circle");
    $(elec[3]).addClass("Toggle0");
    $(elec[2]).addClass("Toggle2").css({fill: "red"}).hide();
    O.gtext("O", text);
    let H = svg.group("red").shift_by([-1.5, 0]);
    H.edot(1).config({theta: 180}).$.find("circle").addClass("Toggle0");
    H.gtext("H", text);
    svg.line([-0.5, 0], [0.5, 0]).addClass("Toggle1").css(SVG2.css("black2")).hide();
    let g = svg.group(".Toggle2", "nofill", "black2");
    g.$.hide();
    let [x, dx, y] = [-2.1, 0.3, 1.2];
    g.poly([[3-dx, y], [3, y], [3, -y], [3-dx, -y]]);
    g.poly([[x+dx, y], [x, y], [x, -y], [x+dx, -y]]);
    svg.gtext("–", "text", [3.4, 1.2]).css(".Toggle2").$.hide();

    let t = click_cycle.toggle;
    click_cycle(svg.element, 0,
        () => {t(svg, true, 0); t(svg, false, 1, 2)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );

},

});
