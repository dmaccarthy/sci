SVG2.cache("p30/elec/img/Efield.js", {

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [364, 338], lrbt: [-1, 13, -1], grid: 1, noAxes: 1});
    let g = svg.group("nofill", "grey1", ".Toggle3");
    g.poly([[0, 6], [0, 0], [12, 0], [0, 6], [3, 6]]);
    g = svg.group("blue", "black1");
    g.circle(0.6);
    g.circle(0.6, [12, 0]);
    g = g.group("green");
    g.circle(0.2, [6, 0]).addClass("Toggle0");
    g.circle(0.2, [0, 6]).addClass("Toggle3");

    g = svg.group("text", "f28", "bold", {fill: "white"});
    g.gtext("+", {}, [0, 0]);
    g.gtext("–", {}, [12, "3"]);
    g = svg.group("text", "f18", "ital", ".Toggle3");
    g.gtext("θ", {}, [2, 5.55]);
    g.gtext("θ", {}, [10, 0.4]);

    let t7 = {tail: "7"};
    let E1 = 12.49, E2 = 7.492, E3 = 1.5;
    let s = 2.4, y = 0.2, p = 6.25, a = -26.565;
    g = svg.group("arrow", {"fill-opacity": 0.5});
    g.arrow({tail: [p, -y], tip: [p + E1 / s, -y]}, t7).css(".Toggle1");
    g.arrow({tail: [p, y], tip: [6.2 + E2 / s, y]}, t7).css(".Toggle2");
    g.arrow({tail: [0, p], tip: [0, p + E1 / s]}, t7).css(".Toggle4");
    g.arrow({angle: a, length: E3/s, tail: [0, 0]}, {tail: "2"}).shiftBy(vec2d(0.3, a).plus([0, 6])).css(".Toggle5");

    svg.clickToggle(6);
    svg.$.on("click", () => {
        if (svg.element.cycleStatus == 4) {
            let c = "";
            for (let i=0;i<3;i++) c += (c.length ? ", " : "") + `.Toggle${i}`;
            $(c).fadeOut();
        }
    });

},

ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 12.486], vec2d(1.4983, -26.565)], {lrbt: [-4, 4, -2, 14],
        scale: 30, margin: 8, grid: 1, cycle: 1, label: [2, 0, "-12", "-12"]});
    svg.text("kN/C", [-3, 13]);

    let [BD, SM] = [1, 4];
    let g = svg.group();
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    g.symbol(["E", BD], arr, ["1", SM, sub]).config({shift: [-1.5, 6]});
    g.symbol(["E", BD], arr, ["2", SM, sub]).config({shift: [1, 13]});
    E = g.symbol(["E", BD], arr).config({shift: [1.75, 7]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    E.$.find("text").css({fill: "#0065fe"});
},

});