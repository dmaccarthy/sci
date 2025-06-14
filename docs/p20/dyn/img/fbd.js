SVG2.cache("p20/dyn/img/fbd.js", {

fbd: (sel) => {
    let svg = new SVG2(sel, {size: [288, 360], lrbt: [-5/8, 1.04, -1.07]}).css(".NoStyle");
    svg.gradient("gradFBD", "#D0D0FF", "royalblue", 80, 0, 0, 100);
    let g = svg.group("black1");
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD)"});
    g.line([-0.7, -0.125], [1.05, -0.125]).css({"stroke-width": 3});

    g = svg.group("symbol", "f28", "red");
    let [arr, sub] = [["→", 5, [0, "20"]], [6, ["14", "-8"]]];
    g.symb(0, ["F", 1], arr, ["g", ...sub]).align([0.15, -0.6]);
    g.symb(0, ["F", 1], arr, ["n", ...sub]).align([0.15, 0.4]);
    g.symb(0, ["F", 1], arr, ["a", ...sub]).align([0.6, 0.15]);
    g.symb(0, ["F", 1], arr, ["f", ...sub]).align([-0.4, 0.15]);
    arr[2][1] = "16";
    g.symb(0, ["a", 1], arr).align([0.6, 0.6]).css("blue");

    let t7 = {tail: "7"};
    g = svg.group("arrow", "red");
    g.arrow({tail: [0, -0.16], tip: [0, -1.02]}, t7);
    g.arrow({tail: [0, -0.1], tip: [0, 0.76]}, t7);
    g.arrow({tail: [0.3, -0.08], tip: [1, -0.08]}, t7);
    g.arrow({tail: [-0.3, -0.08], tip: [-0.6, -0.08]}, t7);
    g.arrow({tail: [0.4, 0.75], tip: [0.9, 0.75]}, t7).css("blue");
},

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [275, 400], lrbt: [-5/8, 5/8, -1.07]}).css(".NoStyle");
    svg.gradient("gradFBD1", "#D0D0FF", "royalblue", 80, 0, 0, 100);

    let a = 25;
    let g = svg.group("black1").config({theta: -a});
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD1)"});
    g.line([-0.7, -1/8], [0.7, -1/8]).css({"stroke-width": 3});

    let t7 = {tail: "7"};
    let [arr, sub] = [["→", 5, [0, "20"]], [6, ["14", "-8"]]];
    let arrow = g.group("arrow", "red");
    arrow.arrow({tail: [0, -1/8], tip: [0, cos(a) - 1/8]}, t7);
    let tail = new RArray(-0.25, -1/8);
    arrow.arrow({tail: tail, tip: tail.minus([0.6 * sin(a), 0])}, t7);
    g = g.group("symbol", "f28", "red", {stroke: "none"});
    g.symb(0, ["F", 1], arr, ["n", ...sub]).align([1/8, 0.4]);
    g.symb(0, ["F", 1], arr, ["f", ...sub]).align([-0.45, 0.08]);

    svg.arrow({tail: [0, -0.03], tip: [0, -1.03]}, t7).css("arrow", "red");
    svg.symb(0, ["F", 1], arr, ["g", ...sub]).align([1/8, -0.6]).css("f28", "red");
    svg.circle("5").css({fill: "black"});
},

vec1: (sel) => {
    let a = 25, Fg = 60, Fn = Fg * cos(a), Ff = Fg * sin(a) / 2;
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(Fn, 90-a), vec2d(Ff, 180-a)], {lrbt: [-16, 32, -64, 8],
        scale: 6, margin: 8, grid: 4, label: [8, 0, "-4", "-12"]});
    svg.$.find(".Component").remove();
    svg.ctext(["N", [28, -60]]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];

    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([-8, -29]);
    g.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([16, -38]);
    g.symb(0, ["F", BD], arr, ["f", SM_IT, sub]).align([21, -4]);
    g.symb(0, ["F", BD], arr, ["net", SM_IT, ["16", "-8"]]).css("blue").align([6, 4]);
},

Q1f: (sel) => {
    let svg = new SVG2(sel, {size: [160, 403], lrbt: [-15, 22, -72.5], margin: 1}).css(".NoStyle");
    svg.gradient("gradQ1", "#D0D0FF", "royalblue", 80, 0, 0, 100);
    svg.rect([10, 10]).css({fill: "url(#gradQ1)", stroke: "black"});
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["12", "-8"]]];
    let g = svg.group("arrow");
    g.arrow({tail: [0, -7.5], tip: [0, -7.5 - 63.8]}, {tail: "7"});
    g.arrow({tail: [0, 7.5], tip: [0, 20]}, {tail: "7"});
    g.arrow({tail: [10, 0], tip: [10, -30]}, {tail: "7"}).css("blue");

    g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", ...sub]).align([-9, -30]);
    g.symb(0, ["F", BD], arr, ["f", ...sub]).align([-9, 12]);
    g.symb(0, ["a", BD], arr).align([17, -10]).css("blue");
},

Q1v: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-3, 0], [0, -63.8], [3, 0], [0, 12.5]], {shift: [1.5, 0],
        lrbt: [-15, 15, -75, 5], scale: 5, margin: 1, grid: 5, tick: "-8", label: [10, 0, "-14", "-18"]});
    svg.$.find(".Component").remove();
    let a = svg.$.find("g.Arrow").css({"fill-opacity": 0.6});
    $([a[0], a[2]]).remove();
    svg.$.find("g.Labels").css(SVG2.css("mono",{fill: "grey"}));
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["12", "-8"]]];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", ...sub]).align([-10, -30]);
    g.symb(0, ["F", BD], arr, ["f", ...sub]).align([8, -57]);
    g.symb(0, ["F", BD], arr, ["net", ...sub]).align([8, -25]).css("blue");
},

Q3: (sel) => {
    $(sel).attr({width: 150, height: 375, "data-aspect": "2/5"});
    let svg = new SVG_Animation(sel, -150, 150, -575, 175);
    let Fg = -567, Ff = 725;
    let F = Fg + Ff, dx = 15;
    svg.grid([-150, 150, 50], [-600, 175, 50], 1);
    let attr = {interval: 100, minor: 2, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-125, 125], ticks: attr});
    attr.offset = ["-12", 0];
    svg.axis({y: [-600, 175], ticks: attr});
    svg.arrow([-dx, 0], [-dx, Fg], {tail: "8"}).addClass("Vector");
    svg.arrow([dx, Fg],[dx, F],  {tail: "8"}).addClass("Vector");
    svg.arrow([-dx, 0],[-dx, F],  {tail: "8"}).addClass("Resultant");
    svg.symbol("F", {vec:1, q4: "g"}, [-90, -250]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "f"}, [70, -250]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "net"}, [-110, 50]).css({fill: "#0065FE"});
    svg.final();
},

Q7: (sel) => {
    $(sel).attr({width: 360, height: 250, "data-aspect": "36/25"});
    let svg = new SVG_Animation(sel, -4, 5, -2.8);
    svg.line([-5, 0], [-1, 0]).css({stroke: "black", "stroke-width": 3});
    svg.line([1, 0], [5, 0]).css({stroke: "black", "stroke-width": 3});

    let r = 1, h = r/2;
    let p1 = [-r, h];
    let p2 = [r, h];
    let rp = [r, 0.4 * h];
    let puck = svg.path(p1).lineTo([-r, 0]).arcTo([r, 0], rp).lineTo(p2).arcTo(p1, rp).arcTo(p2, rp);
    puck.item().css({fill: "grey", stroke: "black"});

    svg.arrow([0, -0.5], [0, -2.5], {tail: "6"}).css({fill: "red"});
    svg.arrow([0, 1], [0, 3], {tail: "6"}).css({fill: "red"});
    svg.arrow([-1.5, 0.2], [-3, 0.2], {tail: "6"}).css({fill: "red"});
    svg.arrow([2, 1], [4, 1], {tail: "6"}).css({fill: "limegreen"});
    svg.symbol("F", {vec:1, q4: "g"}, [0.8, -1.3]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "n"}, [0.8, 1.8]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: "f"}, [-2.1, 1.2]).css({fill: "red"});
    svg.symbol("v", {vec:1, q4: "i"}, [2.7, 2]).css({fill: "limegreen"});

    svg.final();
},

});