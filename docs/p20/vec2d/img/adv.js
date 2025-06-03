SVG2.cache("p20/vec2d/img/adv.js", {

fbd1: (sel) => {
    $(sel).attr({width: 400, height: 240, "data-aspect": "5/3"});
    let svg = new SVG_Animation(sel, -1.3, 1.7, -0.9);
    let g = svg.group().css({stroke: "black", "stroke-width": 2});
    let w = 0.15;
    svg.line([-1.3, -w], [1.7, -w], g);
    svg.line([-1.3, w], [1.7, w],g);
    let v = vec2d(1.5, -30);
    svg.rect([1.5, 4 * w], [0, 0], g).css({fill: "lightgrey"});
    svg.arrow([0, 0], v, {tail: "8"}).addClass("Vector");
    svg.arrow([0, 0], [0, -v[1]], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: 1}, [0.45, -0.6]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: 2}, [-0.4, 0.5]).css({fill: "red"});    
    svg.final();
},

fbd2: (sel) => {
    let svg = new SVG2(sel, {size: [225, 300], lrbt: [-2.5, 72.5, 0, 100], margin: [0, 0, 2, 6]}).css(".NoStyle");
    let g = svg.group("black1");
    g.line([20, 100], [70, 75]);
    g.rect([20, 100], [10, 50]).css({fill: "tan"});
    g.rect([50, 30], [45, 60]).css({fill: "#D0D0FF"});
    g = svg.group("arrow");
    let attr = {tail: "6"};
    let data = [
        [[45, 60], [45, 20]], [[70, 75], [30, 95]],
        [[20, 60], [40, 60]], [[20, 65], [20, 85]]
    ];
    let i = 0;
    for (let [tail, tip] of data) g.arrow({tail: tail, tip: tip}, attr).css(`.Toggle${i++}`);

    let [BD, SM, SM_IT] = [1, 4, 6];
    g = svg.group("symbol", "f28", "red");
    data = [["g", [55, 38]], ["t", [56, 95]], ["n", [27, 52]], ["f", [10, 75]]];
    i = 0;
    for (let [c, xy] of data)
        g.symb(0, ["F", BD], ["→", SM + BD, [0, "20"]], [c, SM_IT, ["10", "-6"]]).align(xy).css(`.Toggle${i++}`);

    svg.clickToggle(4);
},


fbd3: (sel) => {
    $(sel).attr({width: 400, height: 300, "data-aspect": "4/3"});
    let svg = new SVG_Animation(sel, -1, 1, -0.7);
    let Fg = 0.6, a = 8, Fn = Fg * cos(a), Fa = 5/9.81 * Fg;
    let rot = svg.group().config({theta: a});
    let attr = {stroke: "black", "stroke-width": 1};
    let p1 = vec2d(1, a);
    let p2 = [p1[0], -p1[1]]
    svg.line(p1, p2).css(attr);
    svg.line(p1.neg(), p2).css(attr);
    let g = svg.group(rot).css(attr);
    attr["stroke-width"] = 2;
    svg.line([-1, 0], [1, 0], g).css(attr); 
    svg.line([0, -1], [0, 1], g);
    attr = {"font-size": 18, "font-style": "italic", stroke: "none"};
    svg.text("x", [0.9, 0.03], g).css(attr);
    svg.text("y", [0.03, 0.65], g).css(attr);
    svg.rect([0.25, 0.16], [0, 0.08], g).css({fill: "#D0D0FF"});
    g = svg.group(rot);
    svg.arrow([0, 0], [0, Fn], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "n"}, [-0.15, 0.35], g).css({fill: "red"});
    svg.arrow([0.15, 0], [0.15 + Fa, 0], {tail: "8"}, g).addClass("Vector Applied");
    svg.symbol("F", {vec:1, q4: "a"}, [0.4, 0.14], g).addClass("Applied").css({fill: "red"});
    svg.arrow([-0.15, 0], [-0.15 - Fn / 5, 0], {tail: "4"}, g).addClass("Vector Friction");
    svg.symbol("F", {vec:1, q4: "f"}, [-0.4, 0.1], g).addClass("Friction").css({fill: "red"});
    svg.arrow([0, 0], [0, -Fg], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [-0.2, -0.3]).css({fill: "red"});
    svg.final();
    svg.$.find(".Friction").hide();
    svg.$.on("click", () => svg.$.find(".Friction").fadeToggle());
},

sign: (sel) => {
    let svg = new SVG2(sel, {size: [360, 180], lrbt: [-2, 2, -0.5, 1.5], margin: 1}).css(".NoStyle");
    let g = svg.group({stroke: "black", "stroke-width": 4});
    g.line([-0.5, 0], [-2, 1.5]);
    g.line([0.5, 0], [2, 1.5]);
    svg.rect([2, 1], [0, 0]).css({fill: "#E0E0E0", stroke: "black", "stroke-width": 2});
    g = svg.group("text", "blue", {"font-weight": "bold"});
    g.gtext("Mr. Mac’s", {}, [0, 0.12]);
    g.gtext("House of Physics", {}, [0, -0.12]);
   
},

sign_vec: (sel) => {
    let Fg = 491, F = Fg / root(2);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F, 45), vec2d(F, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, tick: "-8", label: [60, 0, "-12", "-20"]});
    svg.$.find(".Component, .Resultant").remove();
    svg.gtext("N", "text", [270, -510]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let g = svg.group("symbol", "f28", "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([30, -240]);
    g.symb(0, ["F", BD], arr, ["1", SM, sub]).align([150, -400]);
    g.symb(0, ["F", BD], arr, ["2", SM, sub]).align([150, -100]);
},

sign_uneven: (sel) => {
    let Fg = 491;
    let F1 = Fg / sin(105) * sin(45);
    let F2 = Fg / sin(105) * sin(30);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F1, 60), vec2d(F2, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, tick: "-8", label: [60, 0, "-12", "-20"]});
    svg.$.find(".Component, .Resultant").remove();
    svg.text("N", [270, -510]);
    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let g = svg.group();
    g.symbol(["F", BD], arr, ["g", SM_IT, sub]).config({shift: [30, -240]});
    g.symbol(["F", BD], arr, ["1", SM, sub]).config({shift: [135, -330]});
    g.symbol(["F", BD], arr, ["2", SM, sub]).config({shift: [150, -100]});
    g.$.addClass("Large").find("text").css({fill: "red"});
},

pulley: (sel) => {
    $(sel).attr({width: 400, height: 300, "data-aspect": "4/3"});
    let svg = new SVG_Animation(sel, -12, 4, -10, 2, 1);
    let a = 10;
    svg.line([0, 0], [0, -11]).css({stroke: "black", "stroke-width": 3});
    let g = svg.group().config({theta: a});
    let c = [1, 0.5];
    svg.circle(0.5, c, g).css({fill: "#D0D0FF", stroke: "black"});
    svg.line([-6.1, 1], [1, 1], g).css({stroke: "black", "stroke-width": 1});
    svg.line([0, 0], c, g).css({stroke: "black", "stroke-width": 2});
    svg.rect([4, 2], [-8, 1], g);
    c = transform({angle: a, deg:true}, c)[0].plus([0.5, 0]);
    let x = c[0];
    let y = c[1] - 3;
    svg.line(c, [x, y]).css({stroke: "black", "stroke-width": 1});
    svg.rect([1.5, 3], [x, y]);
    svg.symbol("m", {q4: 1}, [-8.25, 1], g);
    svg.symbol("m", {q4: 2}, [x-0.25, y]);
    svg.symbol("h", {}, [2, -7]);
    x += 1.5;
    svg.line([x, -10], [x, y - 1.5]).css({stroke: "black", "stroke-width": 1});
    svg.$.find("rect").css({fill: "lightgrey", stroke: "black"});
    svg.line([0, 0], [-12, 0], g).css({stroke: "black", "stroke-width": 3});
    svg.line([4, -10], [-12, -10]).css({stroke: "black", "stroke-width": 2});
    svg.final();
},

Q3: (sel) => {
    $(sel).attr({width: 400, height: 300, "data-aspect": "4/3"});
    let svg = new SVG_Animation(sel, -1, 1, -0.7);
    let Fg = 0.6, a = 8, Fn = Fg * cos(a), Fa = 5/9.81 * Fg;
    let rot = svg.group().config({theta: a});
    let attr = {stroke: "black", "stroke-width": 1};
    let p1 = vec2d(1, a);
    let p2 = [p1[0], -p1[1]]
    svg.line(p1, p2).css(attr);
    svg.line(p1.neg(), p2).css(attr);
    let g = svg.group(rot).css(attr);
    attr["stroke-width"] = 2;
    svg.line([-1, 0], [1, 0], g).css(attr); 
    svg.line([0, -1], [0, 1], g);
    attr = {"font-size": 18, "font-style": "italic", stroke: "none"};
    svg.text("x", [0.9, 0.03], g).css(attr);
    svg.text("y", [0.03, 0.65], g).css(attr);
    svg.rect([0.25, 0.16], [0, 0.08], g).css({fill: "#D0D0FF"});
    g = svg.group(rot);
    svg.arrow([0, 0], [0, Fn], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "n"}, [-0.15, 0.35], g).css({fill: "red"});
    svg.arrow([0.15, 0], [0.15 + Fa, 0], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "f"}, [0.4, 0.14], g).css({fill: "red"});
    svg.arrow([0, 0], [0, -Fg], {tail: "8"}).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [-0.2, -0.3]).css({fill: "red"});
    svg.final();
},
    
});