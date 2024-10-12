SVG2.cache("p20/dyn/img/adv.js", {

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
    $(sel).attr({width: 225, height: 300, "data-aspect": "3/4"});
    let svg = new SVG_Animation(sel, -2.5, 72.5, 0, 100, 2); 
    let g = svg.group().css({stroke: "black", "stroke-width": 1});
    svg.line([20, 100], [70, 75], g);
    svg.rect([20, 100], [10, 50], g).css({fill: "tan"});
    svg.rect([50, 30], [45, 60], g).css({fill: "#D0D0FF"});
    g = svg.group();
    svg.arrow([45, 60], [45, 20], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "g"}, [52, 35], g).css({fill: "red"});
    svg.arrow([70, 75], [30, 95], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "t"}, [60, 92], g).css({fill: "red"});
    svg.arrow([20, 60], [40, 60], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "n"}, [27, 45], g).css({fill: "red"});
    svg.arrow([20, 65], [20, 85], {tail: "8"}, g).addClass("Vector");
    svg.symbol("F", {vec:1, q4: "f"}, [6, 75], g).css({fill: "red"});
    svg.final();

    let show = (n) => {
        let e = g.$.children();
        $(e[n]).fadeIn();
        $(e[n+1]).fadeIn();
    }

    clickCycle(svg.element, 4,
        () => g.$.children().fadeOut(),
        () => show(0),
        () => show(2),
        () => show(4),
        () => show(6),
    );
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
    $(sel).attr({width: 360, height: 180, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, -2, 2, -0.5, 1.5, 1);
    svg.line([-0.5, 0], [-2, 1.5]).css({stroke: "black", "stroke-width": 4});
    svg.line([0.5, 0], [2, 1.5]).css({stroke: "black", "stroke-width": 4});
    svg.rect([2, 1], [0, 0]).css({fill: "#E0E0E0", stroke: "black", "stroke-width": 2});
    let g = svg.group().css({"font-weight": "bold", fill: "#0065FE"});
    svg.text("Mr. Mac’s", [0, 0.12], g);
    svg.text("House of Physics", [0, -0.12], g);
    svg.final();    
},

sign_vec: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let Fg = 491, F = Fg / root(2);
    let svg = applet.vecDiagram.diagram(sel,
        [[0, -Fg], vec2d(F, 45), vec2d(F, 135)],
        {omitAxes: 1, resultant: 0}, 30, -210, -540,
    );
    let grid = svg.items[0];
    let attr = {interval: 60, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-210, 390], ticks: attr}, grid);
    attr.offset = ["-14", 0];
    svg.axis({y: [-540, 60], ticks: attr}, grid);
    svg.symbol("F", {vec:1, q4: "g"}, [-80, -250]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: 1}, [160, -400]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: 2}, [160, -91]).css({fill: "red"});
    let g = svg.group(grid);
    svg.text("N", [350, -510], g);
    svg.text("45°", [34, -86], g);
    svg.text("45°", [34, -405], g);
    svg.text("90°", [180, -240], g);
    g.$.find("text").css({"font-size": "24px"});
    svg.final();
},

sign_uneven: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let Fg = 491;
    let F1 = Fg / sin(105) * sin(45);
    let F2 = Fg / sin(105) * sin(30);
    let svg = applet.vecDiagram.diagram(sel,
        [[0, -Fg], vec2d(F1, 60), vec2d(F2, 135)],
        {omitAxes: 1, resultant: 0}, 30, -210, -540,
    );
    let grid = svg.items[0];
    let attr = {interval: 60, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
    svg.axis({x: [-210, 390], ticks: attr}, grid);
    attr.offset = ["-14", 0];
    svg.axis({y: [-540, 60], ticks: attr}, grid);
    svg.symbol("F", {vec:1, q4: "g"}, [-80, -250]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: 1}, [130, -360]).css({fill: "red"});
    svg.symbol("F", {vec:1, q4: 2}, [130, -91]).css({fill: "red"});
    svg.line([15, -491], [120, -491]).css({stroke: "black", "stroke-width": 2});
    let g = svg.group(grid);
    svg.text("N", [350, -510], g);
    svg.text("45°", [34, -86], g);
    svg.text("30°", [34, -390], g).config({theta: 60});
    svg.text("60°", [70, -470], g);
    svg.text("105°", [115, -180], g);
    g.$.find("text").css({"font-size": "24px"});
    svg.final();
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