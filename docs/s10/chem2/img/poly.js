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
    let svg = new SVG2(sel, {size: [200, 100], lrbt: [-2.25, 3.6], margin: 0}).css(".NoStyle");
    let text = ["symbol", "f36"];
    let O = svg.group("black").shiftBy([1.5, 0]);
    let elec = O.edot(7).config({theta: -90}).$.find("circle");
    $(elec[3]).addClass("Toggle0");
    $(elec[2]).addClass("Toggle2").css({fill: "red"}).hide();
    O.gtext("O", text);
    let H = svg.group("red").shiftBy([-1.5, 0]);
    H.edot(1).config({theta: 180}).$.find("circle").addClass("Toggle0");
    H.gtext("H", text);
    svg.line([-0.5, 0], [0.5, 0]).addClass("Toggle1").css(SVG2.css("black2")).hide();
    let g = svg.group(".Toggle2", "nofill", "black2");
    g.$.hide();
    let [x, dx, y] = [-2.1, 0.3, 1.2];
    g.poly([[3-dx, y], [3, y], [3, -y], [3-dx, -y]]);
    g.poly([[x+dx, y], [x, y], [x, -y], [x+dx, -y]]);
    svg.gtext("–", "text", [3.4, 1.2]).css(".Toggle2").$.hide();

    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, true, 0); t(svg, false, 1, 2)},
        () => {t(svg, false, 0); t(svg, true, 1)},
        () => {t(svg, true, 2)},
    );


},

});
