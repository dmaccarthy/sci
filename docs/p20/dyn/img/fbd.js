SVG2.cache("p20/dyn/img/fbd.js", {

fbd: (sel) => {
    let svg = new SVG2(sel, {size: [288, 360], lrbt: [-5/8, 1.04, -1.07]});
    svg.gradient("gradFBD", "#d0d0ff", "royalblue", 80, 0, 0, 100);
    let g = svg.group("black@1");
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD)"});
    css(g.line([-0.7, -0.125], [1.05, -0.125]), "@3");

    g = svg.group("symbol", 28, "red");
    let [arr, sub] = [["→", 5, [0, "20"]], [6, ["14", "-8"]]];
    g.symb(["F", 1], arr, ["g", ...sub]).align([0.15, -0.6]);
    g.symb(["F", 1], arr, ["n", ...sub]).align([0.15, 0.4]);
    g.symb(["F", 1], arr, ["a", ...sub]).align([0.6, 0.15]);
    g.symb(["F", 1], arr, ["f", ...sub]).align([-0.4, 0.15]);
    arr[2][1] = "16";
    g.symb(["a", 1], arr).align([0.6, 0.6]).css("#0065fe");

    let t7 = {tail: "7"};
    g = svg.group("arrow", "red");
    g.arrow({tail: [0, -0.16], tip: [0, -1.02]}, t7);
    g.arrow({tail: [0, -0.1], tip: [0, 0.76]}, t7);
    g.arrow({tail: [0.3, -0.08], tip: [1, -0.08]}, t7);
    g.arrow({tail: [-0.3, -0.08], tip: [-0.6, -0.08]}, t7);
    g.arrow({tail: [0.4, 0.75], tip: [0.9, 0.75]}, t7).css("#0065fe");
},

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [275, 400], lrbt: [-5/8, 5/8, -1.07]});
    svg.gradient("gradFBD1", "#d0d0ff", "royalblue", 80, 0, 0, 100);

    let a = 25;
    let g = svg.group("black@1").config({theta: -a});
    g.rect([0.5, 0.25]).css({fill: "url(#gradFBD1)"});
    css(g.line([-0.7, -1/8], [0.7, -1/8]), "@3");

    let t7 = {tail: "7"};
    let [arr, sub] = [["→", 5, [0, "20"]], [6, ["14", "-8"]]];
    let arrow = g.group("arrow", "red");
    arrow.arrow({tail: [0, -1/8], tip: [0, cos(a) - 1/8]}, t7);
    let tail = new RArray(-0.25, -1/8);
    arrow.arrow({tail: tail, tip: tail.minus([0.6 * sin(a), 0])}, t7);
    g = g.group("symbol", 28, "red", "none@");
    g.symb(["F", 1], arr, ["n", ...sub]).align([1/8, 0.4]);
    g.symb(["F", 1], arr, ["f", ...sub]).align([-0.45, 0.08]);

    svg.arrow({tail: [0, -0.03], tip: [0, -1.03]}, t7).css("arrow", "red");
    svg.symb(["F", 1], arr, ["g", ...sub]).align([1/8, -0.6]).css(28, "red");
    svg.circle("5").css({fill: "black"});
},

vec1: (sel) => {
    let a = 25, Fg = 60, Fn = Fg * cos(a), Ff = Fg * sin(a) / 2;
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(Fn, 90-a), vec2d(Ff, 180-a)], {lrbt: [-16, 32, -64, 8],
        scale: 6, margin: 8, grid: 4, label: [8, 0, "-4", "-12"]});
    svg.$.find(".Component").remove();
    svg.ctext(["N", [28, -60], {css: 18}]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];

    let g = svg.group("symbol", 28, "red");
    g.symb(["F", BD], arr, ["g", SM_IT, sub]).align([-8, -29]);
    g.symb(["F", BD], arr, ["n", SM_IT, sub]).align([16, -38]);
    g.symb(["F", BD], arr, ["f", SM_IT, sub]).align([21, -4]);
    g.symb(["F", BD], arr, ["net", SM_IT, ["16", "-8"]]).css("#0065fe").align([6, 4]);
},

Q1f: (sel) => {
    let svg = new SVG2(sel, {size: [160, 403], lrbt: [-15, 22, -72.5], margin: 1}).css(".NoStyle");
    svg.gradient("gradQ1", "#d0d0ff", "royalblue", 80, 0, 0, 100);
    svg.rect([10, 10]).css({fill: "url(#gradQ1)", stroke: "black"});
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["12", "-8"]]];
    let g = svg.group("arrow");
    g.arrow({tail: [0, -7.5], tip: [0, -7.5 - 63.8]}, {tail: "7"});
    g.arrow({tail: [0, 7.5], tip: [0, 20]}, {tail: "7"});
    g.arrow({tail: [10, 0], tip: [10, -30]}, {tail: "7"}).css("#0065fe");

    g = svg.group("symbol", 28, "red");
    g.symb(["F", BD], arr, ["g", ...sub]).align([-9, -30]);
    g.symb(["F", BD], arr, ["f", ...sub]).align([-9, 12]);
    g.symb(["a", BD], arr).align([17, -10]).css("#0065fe");
},

Q1v: (sel) => {
    let svg = SVG2.vec_diag(sel, [[-3, 0], [0, -63.8], [3, 0], [0, 12.5]], {shift: [1.5, 0],
        lrbt: [-15, 15, -75, 5], scale: 5, margin: 1, grid: 5, tick: "-8", label: [10, 0, "-14", "-18"]});
    svg.$.find(".Component").remove();
    let a = svg.$.find("g.Arrow").css({"fill-opacity": 0.6});
    $([a[0], a[2]]).remove();
    css(svg.$.find("g.Labels"), "mono", "grey");
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["12", "-8"]]];
    let g = svg.group("symbol", 28, "red");
    g.symb(["F", BD], arr, ["g", ...sub]).align([-10, -30]);
    g.symb(["F", BD], arr, ["f", ...sub]).align([8, -57]);
    g.symb(["F", BD], arr, ["net", ...sub]).align([8, -25]).css("#0065fe");
},

Q3: (sel) => {
    let Fg = -567, Ff = 725;
    let svg = SVG2.vec_diag(sel, [[0, Fg], [30, 0], [0, Ff], [-30, 0]], {shift: [-15, 0],
        lrbt: [-150, 150, -575, 175], scale: 0.5, margin: 1, grid: 50, tick: "-8", label: [100, 0, "-14", "-18"]});
    svg.$.find(".Component").remove();
    let a = svg.$.find("g.Arrow").css({"fill-opacity": 0.6});
    $([a[1], a[3]]).remove();
    css(svg.$.find("g.Labels"), "mono", "grey");
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["10", "-6"]]];
    let g = svg.group("symbol", 28, "red");
    g.symb(["F", BD], arr, ["g", ...sub]).align([-80, -250]);
    g.symb(["F", BD], arr, ["f", ...sub]).align([80, -225]);
    sub[1][0] = "16";
    g.symb(["F", BD], arr, ["net", ...sub]).align([-90, 50]).css("#0065fe");
},

Q7: (sel) => {
    let svg = new SVG2(sel, {size: [360, 250], lrbt: [-4, 5, -2.8]});
    css(svg.line([-4.1, 0], [5.1, 0]), "black@3");
    svg.cylinder([1, 0.2], 0.5).css("black@1", {fill: "grey"}).align([0, 0.25]);
    let g = svg.group("arrow");
    let t7 = {tail: "7"};
    g.arrow({tail: [0, 1], tip: [0, 3]}, t7);
    g.arrow({tail: [0, -0.5], tip: [0, -2.5]}, t7);
    g.arrow({tail: [-1.3, 0.2], tip: [-2.7, 0.2]}, t7);
    g.arrow({tail: [2, 1], tip: [4, 1]}, t7).css("limegreen");
    let [BD, arr, sub] = [1, SVG2.arr(), [6, ["10", "-6"]]];
    g = svg.group("symbol", 28, "red");
    g.symb(["F", BD], arr, ["g", ...sub]).align([0.8, -1.25]);
    g.symb(["F", BD], arr, ["n", ...sub]).align([0.8, 1.75]);
    g.symb(["F", BD], arr, ["f", ...sub]).align([-1.5, 1.25]);
    arr[2][1] = "12";
    g.symb(["v", BD], arr, ["i", ...sub]).align([2.75, 2]).css("limegreen");
},

});