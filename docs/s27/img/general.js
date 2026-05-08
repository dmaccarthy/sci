scripts.cache["img/general"] = {

anim_icon: (sel) => {
/* Draw the animation icon */
    let svg = new SVG2(sel, {scale: 32, lrbt: [-4, 3, -4.1, 2.9], grid: 0, margin: 0});
    svg.rect_round(5, 5, 0.5).css("white", "red@10").config({theta: 15}).shift_by([-0.5, -1]);
    svg.rect_round(5, 5, 0.5).css("white", "#0065fe@10");
    let r = 1.8;
    let c = new RArray(-0.35, 0);
    let pts = [];
    for (let i=0;i<3;i++) pts.push(c.plus(vec2d(r, 120*i)));
    css(svg.poly(pts, 1), "none@", "#0065fe");
},

};