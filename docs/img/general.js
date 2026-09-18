scripts.cache["img/general"] = {

anim_icon: sel => {
/* Draw the animation icon */
    let svg = new SVG2(sel, {scale: 32, lrbt: [-4, 3, -4.1, 2.9]});
    svg.group("white", "red@10").config({theta: 15}).shift_by([-0.5, -1]).rect_round([5, 5], 0.5);
    css(svg.rect_round([5, 5], 0.5), "white", "#0065fe@10");
    let r = 1.8;
    let c = new RArray(-0.35, 0);
    let pts = [];
    for (let i=0;i<3;i++) pts.push(c.plus(vec2d(r, 120*i)));
    css(svg.poly(pts, 1), "none@", "#0065fe");
},

list_icon: sel => {
/* Draw the animation icon */
    let svg = new SVG2(sel, {scale: 28, lrbt: [-1.2, 4, -2.6, 2.6]});
    let g = svg.group("none@", "#0065fe");
    let h = 0.4;
    for (let y = -2; y < 2.1; y += 4/3) {
        g.rect_round([3.5, h], "3", [2, y]);
        g.rect_round([h, h], "3", [-0.75, y]);
    }
},

molecule: sel => {
    let svg = new SVG2(sel, {scale: 64, grid: 0.5, lrbt: [-1, 1, -0.5, 0.5]});
    let m = svg.molecule();
    m.atoms('Cl', [-0.5, 0], [0.5, 0])[0].css("red");
    m.dots(null, [-0.5, 0, "1222"], [0.5, 0, "2212"])[0].css("red");
    let b = m.bonds([0, 0]);
    b[0].addClass("Toggle").$.hide();
    let c = m.circ.$.find("circle");
    for (let i of [0, 11]) $(c[i]).addClass("Toggle");
    svg.$.on("click", () => svg.$.find(".Toggle").fadeToggle())
},

};
