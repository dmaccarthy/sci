scripts.cache["img/general"] = {

expDes2: (sel) => {
    let svg = new SVG2(sel, {size: [640, 480], lrbt: [0, 6, 0, 7], grid: 1, margin: [64, 10, 54, 10]});
    let e = svg.find("g.Grid").$;
    css($(e.find("line")[30]), "black@1").appendTo(e);

    let y = [...range(1, 8.1, 1)];
    let x = [0.08, 0.34, 0.76, 1.36, 2.12, 3.06, 4.16, 5.44];
    let pts = zip(x, y);

    // Tick marks and labels
    svg.ticks_xy([0, 6.1, 1], [0, 7.1, 1], {default: true});
    let opt = {size: ["-6", 0], label: 0, shift: "-8", css: 15};
    svg.ticks({x: [0, 31, 3], ...opt}).shift_by([0, 77]);
    svg.ticks({y: [77, 82.1, 1], ...opt});
    let g = svg.group("sans", 18);
    g.text("Distance Travelled", [5, 0.2, "b"]);

    y = $("svg g.TicksY g.Labels g");
    for (let i=5;i<8;i++) $(y[i]).children("text").html(4 + 2 * (i - 4));
    for (let i=4;i<8;i++) pts[i][1] = 2.5 + i / 2;
    for (let i of [5, 3]) $($("svg g.TicksX g.Labels g")[i]).remove();

    css(svg.poly([[0, 0], ...pts]), "none", "#0065fe@1");
    svg.plot(pts, "5").css("#0065fe", "black@1");
},

expDes1: (sel) => {
    let svg = new SVG2(sel, {scale: 24, lrbt: [-3, 11, -4, 3]});
    let y = 0.75;
    let parab = x => 0.1 * (25 - sq(x - 5));
    css(svg.locus(parab, [0, 10.7]), "none", "#0065fe@2");
    css(svg.line([1, -y], [11, -y]), "black@1");
    let g = svg.group().config({theta: 45}).shift_by(vec2d(0.75, 225));
    css(g.poly([...SVG2.spring_points([-3, 0], [0, 0], 12, 0.5, 0.5)]), "none", "red@2");
    g.rect([0.2, 1.2]);
    css(g.circle(0.6, [y, 0]), "#0065fe", "black@1");
    css(g.line([1, -0.7], [-4, -0.7]), "black@1");

},

anim_icon: (sel) => {
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

list_icon: (sel) => {
/* Draw the animation icon */
    let svg = new SVG2(sel, {scale: 28, grid: 0, lrbt: [-1.2, 4, -2.6, 2.6]});
    let g = svg.group("none@", "#0065fe");
    let h = 0.4;
    for (let y = -2; y < 2.1; y += 4/3) {
        g.rect_round([3.5, h], "3", [2, y]);
        g.rect_round([h, h], "3", [-0.75, y]);
    }
},

};
