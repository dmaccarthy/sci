SVG2.cache("p20/dyn/img/adv.js", {

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [400, 240], lrbt: [-1.3, 1.7, -0.9]}).css(".NoStyle");
    let g = svg.group("black@2");
    let w = 0.15;
    g.line([-1.3, -w], [1.7, -w]);
    g.line([-1.3, w], [1.7, w]);
    g.rect([1.5, 4 * w]).css({fill: "lightgrey"});

    let v = vec2d(1.5, -30);
    g = svg.group("arrow");
    g.arrow({tip: [0, -v[1]]}, {tail: "7"});
    g.arrow({tip: v}, {tail: "7"});

    g = svg.group("symbol", 28, "red");
    let F = [["F", 1], SVG2.arr("20")];
    let sub = [4, ["11", "-8"]];
    g.symb(0, ...F, ["1", ...sub]).align([0.6, -0.6]);
    g.symb(0, ...F, ["2", ...sub]).align([-0.3, 0.5]);

},

fbd2: (sel) => {
    let svg = new SVG2(sel, {size: [225, 300], lrbt: [-2.5, 72.5, 0, 100], margin: [0, 0, 2, 6]}).css(".NoStyle");
    let g = svg.group("black@1");
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
    g = svg.group("symbol", 28, "red");
    data = [["g", [55, 38]], ["t", [56, 95]], ["n", [27, 52]], ["f", [10, 75]]];
    i = 0;
    for (let [c, xy] of data)
        g.symb(0, ["F", BD], ["→", SM + BD, [0, "20"]], [c, SM_IT, ["10", "-6"]]).align(xy).css(`.Toggle${i++}`);

    svg.click_toggle(4);
},

fbd3: (sel, a) => {
    let svg = new SVG2(sel, {size: [400, 300], lrbt: [-1, 1, -0.7], margin: 1}).css(".NoStyle");
    let applied = a == null;
    if (!a) a = 8;
    let p = new RArray(1, tan(a)), Fg = 0.6, Fn = Fg * cos(a), dy = 0.02;
    let Fa = Fg * (applied ? 5/9.81 : sin(a));
    css(svg.poly([p, [1, -p[1]], p.times(-1)]), "nofill", "black@1");
    let incline = svg.group("black@1").config({theta: a});
    incline.line([0, -1], [0, 1]).css({"stroke-dasharray": "8,8"});
    incline.rect([0.25, 0.16], [0, 0.08]).css({fill: "#d0d0ff"});
    css(incline.line([-2, 0], [2, 0]), "black@2");
    let g = incline.group("symbol", 24, {stroke: "none"});
    g.symb(0, ["x", 2]).align([0.9, 0.07]);
    g.symb(0, ["y", 2]).align([0.07, 0.75]);

    g = incline.group("arrow");
    let t6 = {tail: "6"};
    let arr = SVG2.arr("22");
    let sub = [6, ["11", "-8"]];
    g.arrow({tail: [0.15, 0.08], tip: [Fa + 0.15, 0.08]}, t6);
    let fric = [g.arrow({tail: [-0.15, dy], tip: [-0.15 - Fn / 5, dy]}, {tail: "4"}).element];
    g.arrow({tail: [0, dy], tip: [0, Fn + dy]}, t6);
    g = incline.group("symbol", 28, "red", {stroke: "none"});
    g.symb(0, ["F", 1], arr, ["n", ...sub]).align([-0.15, 0.35]);
    g.symb(0, ["F", 1], arr, [applied ? "a" : "f", ...sub]).align([0.4, 0.28]);
    fric.push(g.symb(0, ["F", 1], arr, ["f", ...sub]).align([-0.35, 0.18]).element);

    svg.group("symbol", 28, "red").symb(0, ["F", 1], arr, ["g", ...sub]).align([-0.15, -0.25]);
    svg.group("arrow").arrow({tail: [0, -dy], tip: [0, -dy - Fg]}, t6);

    if (applied) {
        fric = $(fric).hide();
        svg.$.on("click", () => fric.fadeToggle());
    }
    else $(fric).remove();

},

sign: (sel) => {
    let svg = new SVG2(sel, {size: [360, 180], lrbt: [-2, 2, -0.5, 1.5], margin: 1}).css(".NoStyle");
    let g = svg.group({stroke: "black", "stroke-width": 4});
    g.line([-0.5, 0], [-2, 1.5]);
    g.line([0.5, 0], [2, 1.5]);
    svg.rect([2, 1], [0, 0]).css({fill: "#E0E0E0", stroke: "black", "stroke-width": 2});
    g = svg.group("text", "#0065fe", {"font-weight": "bold"});
    g.gtext("Mr. Mac’s", {}, [0, 0.12]);
    g.gtext("House of Physics", {}, [0, -0.12]);
   
},

sign_vec: (sel) => {
    let Fg = 491, F = Fg / root(2);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F, 45), vec2d(F, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, tick: "-8", label: [60, 0, "-12", "-20"]}).css(".NoStyle");
    svg.$.find(".Component, .Resultant").remove();
    svg.gtext("N", "text", [270, -510]);

    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let g = svg.group("symbol", 28, "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([30, -240]);
    g.symb(0, ["F", BD], arr, ["1", SM, sub]).align([150, -400]);
    g.symb(0, ["F", BD], arr, ["2", SM, sub]).align([150, -100]);
    g = svg.group("text", "red");
    g.group().gtext("90.0°", {}, [180, -240]);
    g.group().config({theta: -67.5}).gtext("45.0°", {}, [75, 0]);
    g.group().config({theta: 67.5, pivot: [0, -Fg]}).gtext("45.0°", {}, [75, -Fg]);
},

sign_uneven: (sel) => {
    let Fg = 491;
    let F1 = Fg / sin(105) * sin(45);
    let F2 = Fg / sin(105) * sin(30);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F1, 60), vec2d(F2, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, tick: "-8", label: [60, 0, "-12", "-20"]}).css(".NoStyle");
    svg.$.find(".Component, .Resultant").remove();
    svg.gtext("N", "text", [270, -510]);
    let [BD, SM, SM_IT] = [1, 4, 6];
    let arr = ["→", SM + BD, [0, "20"]];
    let sub = ["14", "-8"];
    let g = svg.group("symbol", 28, "red");
    g.symb(0, ["F", BD], arr, ["g", SM_IT, sub]).align([30, -240]);
    g.symb(0, ["F", BD], arr, ["1", SM, sub]).align([135, -330]);
    g.symb(0, ["F", BD], arr, ["2", SM, sub]).align([140, -80]);
    g = svg.group("text", "red");
    g.group().gtext("105.0°", {}, [120, -180]);
    g.group().config({theta: -67.5}).gtext("45.0°", {}, [75, 0]);
    g.group().config({theta: 75, pivot: [0, -Fg]}).gtext("30.0°", {}, [85, 1 - Fg]);
},
    
pulley: (sel, fbd) => {
    let h = fbd ? 420 : 276;
    let svg = new SVG2(sel, {size: [400, h], lrbt: [-12, 4, -10], margin: [0, 18, 1, 0]}).css(".NoStyle");

    let c = [1, 0.5];
    let a = 10;
    let black2 = {stroke: "black", "stroke-width": 2};
    let black3 = {stroke: "black", "stroke-width": 3};
    svg.line([0, 0], [0, -10]).css(black3);
    svg.line([-12, -10], [5, -10]).css(black2);

    let g = svg.group("black@1", "nofill").config({theta: a});
    g.circle(0.5, c).css({fill: "#d0d0ff"});
    g.line([-7, 1], [1, 1]);
    g.line([0, 0], c).css(black2);
    g.rect([4, 2], [-8, 1]).css({fill: "lightgrey"});
    g.line([0, 0], [-12, 0]).css(black3);

    let tail = {tail: "6"};
    if (fbd) {
        g.line([-8, -8], [-8, 10]).css({stroke: "black", "stroke-width": "1px", "stroke-dasharray": "7,5"}).prependTo(g.$);
        let v = g.group("arrow");
        v.arrow({tail: [-8, 2.2], length: 6*cos(10)}, tail, "tail").config({theta: 90});
        v.arrow({tail: [-10.2, 0.2], length: 1.5}, tail, "tail").config({theta: 180});
        v.arrow({tail: [-5.8, 1], length: 2}, tail, "tail");
    }

    let [BD, IT, SM] = [1, 2, 4];
    let sub = ["15", "-6"];
    let subv = ["12", "-6"];
    let arr = ["→", SM+BD, [0, "22"]];
    g = g.group("symbol", 24, "black", {stroke: "none"});
    g.symb(0, ["y", IT]).align([-7.5, 8.5]);
    g.symb(0, ["m", IT], ["1", SM, sub]).align([-8, 1]);
    if (fbd) {
        g = g.group(28, "red");
        g.symb(0, ["F", BD], arr, ["n", SM+IT, subv]).align([-9, 5]);
        g.symb(0, ["F", BD], arr, ["f", SM+IT, subv]).align([-11, 2]);
        g.symb(0, ["F", BD], arr, ["t", SM+IT, subv]).align([-5, 2.7]);
    }
    
    c = transform({angle: a, deg:true}, c)[0].plus([0.5, 0]);
    let x = c[0];
    let y = c[1] - 3;

    g = svg.group("black@1");
    g.line(c, [x, y]);
    g.rect([1.5, 3], [x, y]).css({fill: "lightgrey"});
    g.line([3, y - 1.5], [3, -10]);

    g = svg.group("symbol", 24);
    g.symb(0, ["h", IT]).align([4, (y - 11.5)/ 2]);
    g.symb(0, ["m", IT], ["2", SM, sub]).align([x, y]);
    if (fbd) {
        g = g.group(28, "red");
        g.symb(0, ["F", BD], arr, ["g", SM+IT, subv]).align([-9, -4]);
        g.symb(0, ["F", BD], arr, ["g", SM+IT, subv]).align([2, -8]);
        g.symb(0, ["F", BD], arr, ["t", SM+IT, subv]).align([2, 2]);
    }

    if (fbd) {
        g = svg.group("arrow");
        g.arrow({tail: [-8, -1.6], length: 6}, tail, "tail").config({theta: -90});
        g.arrow({tail: [x, -4], length: 3}, tail, "tail").config({theta: -90});
        g.arrow({tail: [x, -0.7], length: 2}, tail, "tail").config({theta: 90});
    }

},

});