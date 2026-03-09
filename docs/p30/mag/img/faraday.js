SVG2.cache("p30/mag/img/faraday.js", {

tube: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, lrbt: [-2.5, 6.7, -9.5, 8.5]});
    let silver = ["silver", "black@1"];
    let pg = svg.photogate_side(2).css(...silver).shift_by([0.2, -8]);
    pg.$.find("circle").css({fill: "white"});
    let cyl = svg.cylinder([0.5, 0.15], 14, 1).css("white", "black@1").shift_by([0, 7]);
    let mag = svg.group("black@1").shift_by([0, 0.1]);
    for (let y=0;y<5;y++) 
        mag.cylinder([0.4, 0.1], 0.3).css(["silver", "grey"][y % 2]).shift_by([0, 0.3*y]); 
    mag.$.insertAfter(cyl.$.find("ellipse"));

    let g = svg.group("sans", 16);
    g.text("Photogate", [1, -9, "bl"]);
    g.text("Slider", [1, 7.5, "bl"]);
    g.text("PVC or Aluminum", [1, 0, "bl"]);
    g.text("Tube", [2.75, -0.8, "bl"]);
},

ccw: (sel) => {
    let svg = new SVG2(sel, {scale: 24, grid: 0, lrbt: [-2, 4, -3.1, 6.5]});
    let silver = ["silver", "black@1"];
    let coil = svg.coil([2, 6], 15, 0, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), ...silver);
    coil.poly([[1.2, 2.9], [2.5, 2.9], [2.5, -2.9], [1.2, -2.9]]);

    let g = svg.group("white", "black@1");
    g.circle(0.65, [2.5, 0]);
    svg.text("A", [2.5, 0], 0, ["sans", 20]);

    svg.group("arrow", "forestgreen").arrow({tail: [-1, 4], tip: [2, 4]}, {tail: "6"});
    svg.mjax("\\va{B}", null, [0.25, 5.5], "forestgreen");
},

plunge: (sel) => {
    let silver = ["silver", "black@1"];
    let svg = new SVG2(sel, {scale: 24, lrbt: [-2, 4, -3.1, 10]});
    let coil = svg.coil([2, 6], 15, 0, 0, 0).css("none", {stroke: "#b87333"});
    css(coil.$.find("rect"), "#f0f0f0", "black@1");
    css(coil.$.find("circle"), ...silver);
    coil.poly([[1.2, 2.9], [2.5, 2.9], [2.5, -2.9], [1.2, -2.9]]);

    let g = svg.group("white", "black@1");
    g.circle(0.65, [2.5, 0]);
    svg.text("A", [2.5, 0], 0, ["sans", 20]);

    let bar = svg.group().shift_by([0, 8]);
    g = bar.group(...silver);
    g.rect([1.5, 3]);
    g = bar.group("sans", 16);
    g.text("N", [0, 1]);
    g.text("S", [0, -1]);
    g = bar.group("arrow");
    g.arrow({tail: [0, -1.7], tip: [0, -4]}, {tail: "6"});
    bar.mjax("\\va{v}", null, [1, -2.2], "red");
},

loop: (sel) => {
    let svg = new SVG2(sel, {scale: 32, grid: 0, lrbt: [-6, 6.5, -2, 3]});

    let g = svg.group("none", "forestgreen@2");
    let size = {size: "16", ratio: 0.5};
    for (let x of [6, 5.5, 5, 4.5, 3.5, 2, 0, -3]) g.ray([x, 4], [x, -3], size, 0.4);
    svg.mjax("\\va{B}", null, [-1.5, 2.5], "forestgreen");

    let coil = svg.group().shift_by([-3, -0.5]);
    g = coil.group("none", "black@4");
    g.ellipse([2.5, 0.5]);
    g = coil.group("arrow");
    g.arrow({tail: [2.7, 0], tip: [5, 0]}, {tail: "6"});
    coil.mjax("\\va{v}", null, [4, 1], "red");
},

moveable: (sel) => {
    let svg = new SVG2(sel, {scale: 32, lrbt: [-5, 6.2, -3, 4]});
    let g = svg.group("none", "black@1");
    g.poly([[4, 2], [-4, 2], [-4, -2], [4, -2]]);
    g.line([1.7, 3], [3, 2.5]);
    css(g.line([3, -3], [3, 3]), "@3");
    css(svg.rect([1, 2], [-4, 0]), "black@1", "silver");

    svg.vec_in_out("16", 1, "forestgreen@1");
    svg.mjax("\\va{B}", null, [-1.3, 0.2], "forestgreen");

    g = svg.group("arrow");
    g.arrow({tail: [3.2, 0], tip: [6, 0]}, {tail: "6"});
    svg.mjax("\\va{v}", null, [4.5, 1], "red");

    g = svg.group("sans", 20);
    g.text("Moveable Side", [1.5, 3, "br"]);
},

lenz_law: (sel) => {
    let svg = new SVG2(sel, {scale: 36, lrbt: [-4, 3, -3, 3]});
    loadFeed.final = svg;

    // Magnet
    let x = -2.65;
    let magnet = svg.path([x, 2.5]).lines_to([x, -2.5], [x - 1.3, -2.5]);
    for (let i=1;i<20;i++)
        magnet.line_to([-3.95 + 0.5 * Math.random(), i / 4 - 2.5]);
    magnet = magnet.line_to([x - 1.3, 2.5]).close().update();
    magnet.css({stroke: "black", fill: "lightgrey"});
    x -= 0.4;
    svg.text("N", [x, 0], 0, ["sans", 24]);

    // Coil
    let coil = svg.coil([2, 4], 11, 0, 0, "3").css("none", {stroke: "#b87333"});
    let c$ = coil.$.on("click", function(ev) {
        ev.stopPropagation();
        let svg = coil.svg;
        if (!svg.playing) {
            coil.config({omega: -25});
            svg.play();
        }
        else if (coil.omega < -10) coil.config({omega: -3});
        else svg.pause();
    });
    c$.find("rect").css({stroke: "black", fill: "#f8f8f8"});
    c$.find("circle").css({"stroke-width": "0.5px", stroke: "black", fill: "silver"});

    // Poles
    let g = coil.group("sans", 24, "#0065fe", {stroke: "none"}, ".Toggle1");
    let pole = 1.65;
    g.text("N", [0, -pole]);
    g.text("S", [0, pole]);
    g = g.group(".Toggle2");
    g.text("+", [1.45, -1.95]);
    g.text("–", [1.45, 1.95]);

    // Magnetic force vectors
    g = svg.group("arrow", ".Toggle0");
    let arrows = [g.arrow({length: 1}), g.arrow({length: 1})];

    // Fade in / out
    let tog = 3;
    svg.$.on("click", () => {
        let e = svg.$;
        if (tog == 3) e.find(".Toggle0, .Toggle1, .Toggle2").fadeOut();
        else e.find(`.Toggle${tog}`).fadeIn();
        tog = (tog + 1) % 4;
    })

    svg.beforeupdate = function() {
        // Poles
        let t = coil.theta;
        let i = t > 90 && t < 270 ? 1 : 0;
        let text = c$.find("text");
        if (t == 90 || t == 270) c.html("");
        else {
            $(text[i]).html("N");
            $(text[1 - i]).html("S");
            text[i + 2].innerHTML = "+";
            text[3 - i].innerHTML = "–";
        }

        // Magnetic force vectors
        let Fm = 1.5 * Math.abs(cos(t));
        t = t + 90;
        s = 2 * i - 1;
        let seg = new Segment(...vec2d(-pole, t), x, 0);
        arrows[0].reshape({tail: seg.point(0.5 * s), tip: seg.point((0.5 + Fm) * s)});
        seg = new Segment(...vec2d(pole, t), x, 0);
        s = -s;
        arrows[1].reshape({tail: seg.point(0.5 * s), tip: seg.point((0.5 + Fm) * s)});
    }

    svg.animate(coil).update(0);
},

});
