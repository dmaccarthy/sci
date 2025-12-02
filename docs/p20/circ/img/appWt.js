SVG2.cache("p20/circ/img/appWt.js", {

roller: (sel) => {
    let cart = (g, size, pos) => {
        g = g.group();
        g.group("#0065fe@2", {fill: "lightgrey"}).rect([size, size / 2]);
        let wheels = g.group("black@2", {fill: "white"});
        wheels.circle(size / 8, [-0.3 * size, -size / 4]);
        wheels.circle(size / 8, [0.3 * size, -size / 4]);
        return g.align(pos, 0.5, 1);
    }

    let svg = new SVG2(sel, {size: [480, 300], lrbt: [-9, 11, -3]}).css(".NoStyle", ".RollerCoaster");
    let g = svg.group("nofill", "black@2");
    g.circle(3, [0, 6]);
    let y = 6 - root(5);
    let p = g.path([-10, 4]).arc_to([-4, 4], 4, 2).quad_to([2, y], [-1, 1.5]);
    p.quad_to([5, 3], [4, 5]).arc_to([13, 6], 4).update();

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    g = svg.group("arrow");
    let sym = svg.group("symbol", "red", 28);
    for (let [x, y] of [[-7, 5.43], [9, 0.32], [0, 7.75]]) {
        let c = cart(svg, 1.5, [x, y]);
        let x1 = x == 0 ? 0.3 : x;
        g.arrow(3, {tail: "6"}).config({theta: -90, shift: [x1, y - 1.5]});
        sym.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([x1 + 1.2, y - 1.5]);
        if (x == 0) {
            c.config({theta: 180});
            g.arrow(2, {tail: "6"}).config({theta: -90, shift: [-0.3, y - 1]});
            sym.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([-1.75, y - 0.6]);
        }
        else {
            g.arrow(2, {tail: "6"}).config({theta: 90, shift: [x, y + 2.25]});
            sym.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([x + 1.2, y + 2]);
        }
    }
},

loopy: (sel) => {
    let svg = new SVG2(sel, {size: [300, 420], lrbt: [-1, 1, -1.45], grid: 0, margin: 2}).css(".NoStyle");
    svg.group("nofill", "black@1").circle(1);
    svg.group("black").circle("3");
    svg.group("text").text("C", [0.08, 0.08]);
    let red = svg.group("arrow");
    let sym = svg.group("symbol", "red", 28);
    let g = svg.group("nofill", "black@2");
    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["12", "-8"];
    for (let y of [-1, 1]) {
        g.stickman(0.3).css({"stroke-opacity": 0.6}).config({shift: [0, y]});
        red.arrow({tail: [0, y - 0.02], tip: [0, y - 0.4]}, {tail: "5"});
        red.arrow({tail: [0, y + 0.02], tip: [0, y + (y < 0 ? 0.6: 0.2)]}, {tail: "5"});
        sym.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([0.25, y - 0.19]);
        sym.symb(0, ["F", BD], arr, ["n", SM_IT, sub]).align([0.25, y + (y < 0 ? 0.24 : 0.14)]);
    }
},

car: (sel) => {
    let svg = new SVG2(sel, {size: [400, 168], lrbt: [-1, 1, -0.55]}).css(".NoStyle");
    let r = 3;
    svg.group("nofill", "black@2").circle(r, [0, -r]);
    svg.image("media/car.svg", new RArray(2.95, 1).times(0.2), [0.05, 0.11]);
    svg.symb(0, ["F", 1], ["→", 5, [0, "20"]], ["g", 6, ["12", "-8"]]).align([0.15, -0.25]).css("symbol", "red", 28);
    svg.arrow({tail: [0, 0.02], tip: [0, -0.5]}, {tail: "5"}).css("arrow");
},

stick: (sel) => {
    let svg = new SVG2(sel, {size: [390, 400], lrbt: [-2, 2, -1.6]}).css(".NoStyle");
    svg.stickman(1).align([0, 0], 0.5, 1);
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).update().css({fill: "none", stroke: "black"});
    let g = svg.group().css("arrow");
    g.arrow({tail: [0, 0], tip: [0, -1.5]}, {tail: "8"});
    g.arrow({tail: [0, 1.2], tip: [0, 1.2 + 1.5 * 504/638]}, {tail: "8"});
    g = svg.group().css("symbol", "red", 28);
    let [arr, sub] = [["→", 4, [0, "20"]], ["12", "-8"]];
    g.symb(0, ["F", 1], arr, ["g", 6, sub]).align([0.25, -0.75]);
    g.symb(0, ["F", 1], arr, ["n", 6, sub]).align([0.25, 1.6]);
},

astro: (sel) => {
    let svg = new SVG2(sel, {size: [390, 330], lrbt: [-2, 2, -1.6]}).css(".NoStyle");
    svg.stickman(1).align([0, 0], 0.5, 1);
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).update().css({fill: "none", stroke: "black"});
    let g = svg.group().css("arrow");
    g.arrow({tail: [0, 0], tip: [0, -1.5]}, {tail: "8"});
    g.arrow({tail: [0, 1.2], tip: [0, 1.2 + 1.5 * 200/736]}, {tail: "8"});
    let [arr, sub] = [["→", 4, [0, "20"]], ["12", "-8"]];
    g = svg.group().css("symbol", "red", 28);
    g.symb(0, ["F", 1], arr, ["g", 6, sub]).align([0.4, -0.75]);
    g.symb(0, ["F", 1], arr, ["n", 6, sub]).align([0.4, 1.3]);
},

loop: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-2, 2, -1.6]}).css(".NoStyle");
    svg.stickman(1).config({theta: 180});
    let c = [0, -4];
    svg.path(vec2d(4, 45).plus(c)).arc(c, 135).update().css({fill: "none", stroke: "black"});
    let g = svg.group().css("arrow", "red", {"fill-opacity": 0.8});
    g.arrow({tail: [0.1, 0], tip: [0.1, -1.5]}, {tail: "8"});
    g.arrow({tail: [-0.1, 0], tip: [-0.1, -0.8]}, {tail: "8"});
    let [arr, sub] = [["→", 4, [0, "20"]], ["12", "-8"]];
    g = svg.group().css("symbol", "red", 28);
    g.symb(0, ["F", 1], arr, ["n", 6, sub]).align([0.4, -0.75]);
    g.symb(0, ["F", 1], arr, ["g", 6, sub]).align([-0.5, -0.4]);
},

rope: (sel) => {
    let svg = new SVG2(sel, {size: [512, 488], lrbt: [-1, 1, -0.63]}).css(".NoStyle");
    let g = svg.group().css("black@3");
    g.line([-0.5, 1], [-0.5, 0.4]);
    g.line([0.5, -0.1], [0.5, 0.5]);
    g = svg.group().css("#0065fe", "black@1");
    g.circle(0.05, [-0.5, 1]);
    g.circle(0.05, [0.5, -0.1]);
    g = svg.group().css("arrow", "red");
    let t8 = {tail: "8"};
    g.arrow({tail: [-0.45, 0.9], tip: [-0.45, 0.5]}, t8);
    g.arrow({tail: [-0.55, 0.9], tip: [-0.55, 0.7]}, t8);
    g.arrow({tail: [0.5, -0.2], tip: [0.5, -0.6]}, t8);
    g.arrow({tail: [0.55, 0.05], tip: [0.55, 1.05]}, t8);

    let [arr, sub] = [["→", 4, [0, "20"]], ["12", "-8"]];
    g = svg.group().css("symbol", "red", 28);
    g.symb(0, ["F", 1], arr, ["g", 6, sub]).align([-0.3, 0.7]);
    g.symb(0, ["F", 1], arr, ["t", 6, sub]).align([-0.75, 0.85]);
    g.symb(0, ["F", 1], arr, ["g", 6, sub]).align([0.3, -0.3]);
    g.symb(0, ["F", 1], arr, ["t", 6, sub]).align([0.7, 0.5]);

    g = svg.group().css("text", 24);
    g.text("Top", [-0.5, 1.15]);
    g.text("Bottom", [0.5, 1.15]);
},

book: (sel) => {
    let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.1, 1.1]}).css(".NoStyle");
    let a = -20;

    let books = svg.group().config({theta: a}).css("black@1", {fill: "#32cd32"});
    books.rect(["20", "5"], [0, -1]);
    books.rect(["20", "5"], [0, -0.25]);
    books.align([0, -0.99], 0.5, 1);

    let g = svg.group().css("nofill", "black@3");
    g.circle(0.25);
    g.circle(0.625);
    g.circle(1);
    svg.circle("3").css({fill: "black"});

    let Fn = svg.group().config({theta: a}).css("arrow", "red");
    Fn.arrow({tail: [0, -0.90], tip: [0, -0.4]}, {tail: "8"});
    g = Fn.symb(0, ["F", 1], ["→", 4, [0, "20"]], ["n", 6, ["12", "-8"]]);
    g.css("symbol", 28, {stroke: "none"}).align([0.15, -0.75]);
},


});