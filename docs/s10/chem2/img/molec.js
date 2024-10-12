SVG2.cache("s10/chem2/img/molec.js", {

HCl: (sel) => {
    $(sel).attr({width: 200, height: 100, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -0.6, 0.7);
    let g = svg.group().css({"font-size": "36px"});
    let x = 0.35, r = 0.03, dx = 0.05, y = 0.25;
    svg.text("H", [-x, 0], g).css({fill: "red"});
    svg.text("Cl", [x, 0], g);
    g.$.find("text").css({"font-family": '"Noto Serif", serif'});
    let bond = x - 0.24;
    g = svg.group();
    svg.line([bond, 0], [-bond, 0], g).css({stroke: "black", "stroke-width": "2px"}).$.hide();
    svg.circle(r, [-bond, 0], g).css({fill: "red"});
    svg.circle(r, [bond, 0], g);
    svg.circle(r, [x - dx, y]);
    svg.circle(r, [x + dx, y]);
    svg.circle(r, [x - dx, -y]);
    svg.circle(r, [x + dx, -y]);
    svg.circle(r, [2 * x - bond, dx]);
    svg.circle(r, [2 * x - bond, -dx]);
    svg.final();
    g = g.$.children();
    svg.$.on("click", () => g.fadeToggle())
},

Cl2: (sel) => {
    $(sel).attr({width: 215, height: 100, "data-aspect": "2.15"});
    let svg = new SVG_Animation(sel, -0.7, 0.7);
    let g = svg.group().css({"font-size": "36px"});
    let x = 0.35, r = 0.03, dx = 0.05, y = 0.25;
    svg.text("Cl", [-x, 0], g).css({fill: "red"});
    svg.text("Cl", [x, 0], g);
    g.$.find("text").css({"font-family": '"Noto Serif", serif'});
    let bond = x - 0.24;
    g = svg.group();
    svg.line([bond, 0], [-bond, 0], g).css({stroke: "black", "stroke-width": "2px"}).$.hide();
    let electron = [
        [x - dx, y], [x + dx, y], [x - dx, -y], [x + dx, -y],
        [2 * x - bond, dx], [2 * x - bond, -dx]
    ];
    for (let [xe, ye] of electron) {
        svg.circle(r, [xe, ye]);
        svg.circle(r, [-xe, ye]).css({fill: "red"});
    }
    svg.circle(r, [-bond, 0], g).css({fill: "red"});
    svg.circle(r, [bond, 0], g);
    svg.final();
    g = g.$.children();
    svg.$.on("click", () => g.fadeToggle())
},

});
