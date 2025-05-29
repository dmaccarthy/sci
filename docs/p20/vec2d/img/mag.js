SVG2.cache("p20/vec2d/img/mag.js", { // Solutions for Magnitude & Direction assignment

dir2d: (sel) => {
    let svg = new SVG2(sel, {scale: 48, lrbt: [-3.5, 4.5, -2.5, 2.5], grid: 0, margin: [0, 0, 12, 12]}).css(".NoStyle");
    let g = svg.group("arrow", {fill: "#202020"});
    let attr = {tail: "4", double: 1};
    g.arrow(4, attr);
    g.arrow(4, attr).config({theta: 90});
    g.arrow({tip: vec2d(4, -14)}, {tail: "6"}).css("arrow", ".Toggle5");
    g = svg.group("text", "f20");
    let i = 1;
    for (let [t, x, y, ax, ay] of [
        ["0° or ±360°", 2.2, 0, 0, 0.5],
        ["+90° or –270°", 0, 2.2, 0.5, 1],
        ["±180°", -2.2, 0, 1, 0.5],
        ["+270° or –90°", 0, -2.2, 0.5, 0],
        ["–14° or +346°", 3.2, -1.5],
    ]) {
        let text = g.group(`.Toggle${i < 5 ? i : 6}`);
        text.text(t);
        text.align([x, y], ax, ay);
        i++;
    }
    $(g.$.find("g")[4]).css({fill: "red"});
    g = g.group("blue", {"font-weight": "bold"}, ".Toggle0");
    g.text("Q1", [1, 1]);
    g.text("Q2", [-1, 1]);
    g.text("Q3", [-1, -1]);
    g.text("Q4", [1, -1]);
    g.align([0, 0]);
    svg.clickToggle(7);
},

hiker: (sel) => {
    let svg = SVG2.vec_diag(sel, [[7, -4]], {lrbt: [-3, 6, -1, 6], scale: 40,
        margin: [8, 8, 8, 12], grid: 0.5, shift: [-2, 5], label: [1, 0, "-6", "-12"]});
    svg.css(".NoStyle").$.find(".Component").remove();

    svg.gtext("km", "text", [0.5, 6]);
    let g = svg.group();
    g.$.insertBefore(svg.$.find(".TipToTail2D"));
    g.line([1, 5], [-2, 5]).css({stroke: "black", "stroke-width": 2});
    g.plot([[5, 1], [-2, 5]], "5").$.css({"fill-opacity": 0.7});

    let [BD, IT, SM, SM_IT] = [1, 2, 4, 6];
    let arr = ["→", SM + BD, [0, "22"]];
    let sub = ["12", "-8"];
    g = svg.group("symbol", "f28", "blue");
    g.symb(0, ["d", BD], arr, ["i", SM_IT, sub]).align([-2.7, 5.75]);
    g.symb(0, ["d", BD], arr, ["f", SM_IT, sub]).align([5.5, 1.5]);
    g.symb(0, ["d", BD], arr, ["Δ", 0, ["-20", 0]]).align([2.5, 3.5]).css("red");
    g.symb(0, ["θ", IT]).align([-0.8, 4.8]).css("black", "f18");

},

soccer: (sel) => {
    let svg = SVG2.vec_diag(sel, [vec2d(20, 120)], {lrbt: [-12, 2, -2, 20],
        scale: 20, margin: 8, grid: 1, label: [2, 0, "-6", "-12"]});
    svg.css(".NoStyle").$.find(".Component").remove();
    svg.circle(20).css({"stroke-width": "0.5px", stroke: "grey", fill: "none"});
    svg.gtext("m", "text", [1, 20]);
},
 
});
