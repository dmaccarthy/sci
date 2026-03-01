SVG2.cache("p30/elec/img/Efield.js", {

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [364, 338], lrbt: [-1, 13, -1], grid: 1, noAxes: 1});
    let g = svg.group("none", "grey@1", ".Toggle3");
    g.poly([[0, 6], [0, 0], [12, 0], [0, 6], [3, 6]]);
    g = svg.group("#0065fe", "black@1");
    g.circle(0.6);
    g.circle(0.6, [12, 0]);
    g = g.group("green");
    g.circle(0.2, [6, 0]).addClass("Toggle0");
    g.circle(0.2, [0, 6]).addClass("Toggle3");

    g = svg.group("sans", 28, "bold", {fill: "white"});
    g.gtext("+", {});
    g.gtext("–", {}, [12, "3"]);
    g = svg.group("sans", 18, "ital", ".Toggle3");
    g.gtext("θ", {}, [2, 5.55]);
    g.gtext("θ", {}, [10, 0.4]);

    let t7 = {tail: "7"};
    let E1 = 12.49, E2 = 7.492, E3 = 1.5;
    let s = 2.4, y = 0.2, p = 6.25, a = -26.565;
    g = svg.group("arrow", {"fill-opacity": 0.5});
    g.arrow({tail: [p, -y], tip: [p + E1 / s, -y]}, t7).css(".Toggle1");
    g.arrow({tail: [p, y], tip: [6.2 + E2 / s, y]}, t7).css(".Toggle2");
    g.arrow({tail: [0, p], tip: [0, p + E1 / s]}, t7).css(".Toggle4");
    g.arrow({angle: a, length: E3/s, tail: [0, 0]}, {tail: "2"}).shift_by(vec2d(0.3, a).plus([0, 6])).css(".Toggle5");

    svg.click_toggle(6);
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
        scale: 30, margin: 8, grid: 1, cycle: 1, label: [2, 0]});
    svg.gtext("kN/C", ["sans", 15], [4, 14, "r"]);
    let g = svg.group();
    let s = {scale: 1};
    g.mjax("\\vec{\\bf E}_1", s, [-1, 7], "red");
    g.mjax("\\vec{\\bf E}_2", s, [1.5, 13.2], "red");
    g.mjax("\\vec{\\bf E}", s, [1.8, 7], "#0065fe");
},

proj: (sel) => {
    let a = -0.370406, b = tan(70.2);
    let svg = new SVG2(sel, {scale: 16, grid: 2, margin: [28, 28, 32, 12], lrbt: [0, 20, 0, 12]});
    let tick = {size: ["-8", 0], css: ["sans", 14], label: 0, anchor: true};
    svg.ticks({x: [0, 11, 2], ...tick, size: ["-14", 0], shift: "-29"});
    svg.ticks({y: [0, 7, 2], ...tick});
    let f = x => 6 + x * (b + a * x);
    css(svg.locus(f, [0, 9.25]), "none", "#0065fe@2");
    let g = svg.group("black@1", "silver");
    g.rect([20, "8"], [10, "-4"]);
    g.rect([20, "8"], [10, 12]);
    g = svg.group("none@", "black");
    svg.plusminus(1).shift_by([21, "-4"]);
    svg.plusminus(1, 1).shift_by([21, 12]);
    css(svg.circle("4", [0, 6]), "black@1", "#0065fe");
},

});