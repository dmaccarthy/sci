SVG2.cache("p20/dyn/img/adv.js", {

fbd1: (sel) => {
    let svg = new SVG2(sel, {size: [400, 240], lrbt: [-1.3, 1.7, -0.9]});
    let g = svg.group("black@2");
    let w = 0.15;
    g.line([-1.3, -w], [1.7, -w]);
    g.line([-1.3, w], [1.7, w]);
    g.rect([1.5, 4 * w]).css({fill: "lightgrey"});

    let v = vec2d(1.5, -30);
    g = svg.group("arrow");
    g.arrow({tip: [0, -v[1]]}, {tail: "7"});
    g.arrow({tip: v}, {tail: "7"});

    svg.mjax("\\vec{\\bf F}_1", null, [0.6, -0.6], "red");
    svg.mjax("\\vec{\\bf F}_2", null, [-0.3, 0.5], "red");

},

fbd2: (sel) => {
    let svg = new SVG2(sel, {size: [225, 300], lrbt: [-2.5, 72.5, 0, 100], margin: [0, 0, 2, 6]});
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

    data = [["g", [55, 38]], ["t", [56, 95]], ["n", [27, 52]], ["f", [10, 75]]];
    i = 0;
    for (let [c, xy] of data)
        svg.group(`.Toggle${i++}`).mjax(`\\vec{\\bf F}_${c}`, null, xy, "red");

    svg.click_toggle(4);
},

fbd3: (sel, a) => {
    let svg = new SVG2(sel, {size: [400, 300], lrbt: [-1, 1, -0.7], margin: 1});
    let applied = a == null;
    if (!a) a = 8;
    let p = new RArray(1, tan(a)), Fg = 0.6, Fn = Fg * cos(a), dy = 0.02;
    let Fa = Fg * (applied ? 5/9.81 : sin(a));
    css(svg.poly([p, [1, -p[1]], p.times(-1)]), "none", "black@1");
    let incline = svg.group("black@1").config({theta: a});
    incline.line([0, -1], [0, 1]).css({"stroke-dasharray": "8,8"});
    incline.rect([0.25, 0.16], [0, 0.08]).css({fill: "#d0d0ff"});
    css(incline.line([-2, 0], [2, 0]), "black@2");

    let g = incline.group();
    g.mjax("x", null, [0.9, 0.07]);
    g.mjax("y", null, [0.07, 0.75]);

    g = incline.group("arrow");
    let t6 = {tail: "6"};
    g.arrow({tail: [0.15, 0.08], tip: [Fa + 0.15, 0.08]}, t6);
    let fric = [g.arrow({tail: [-0.15, dy], tip: [-0.15 - Fn / 5, dy]}, {tail: "4"}).element];
    g.arrow({tail: [0, dy], tip: [0, Fn + dy]}, t6);

    g = incline.group();
    g.mjax("\\vec{\\bf F}_n", null, [-0.15, 0.35], "red");
    g.mjax(`\\vec{\\bf F}_${applied ? "a" : "f"}`, null, [0.4, 0.28], "red");
    g = g.group();
    fric.push(g.element);
    g.mjax("\\vec{\\bf F}_f", null, [-0.35, 0.18], "red");

    svg.mjax("\\vec{\\bf F}_g", null, [-0.15, -0.25], "red");
    svg.group("arrow").arrow({tail: [0, -dy], tip: [0, -dy - Fg]}, t6);

    if (applied) {
        fric = $(fric).hide();
        svg.$.on("click", () => fric.fadeToggle());
    }
    else $(fric).remove();

},

sign: (sel) => {
    let svg = new SVG2(sel, {size: [360, 180], lrbt: [-2, 2, -0.5, 1.5], margin: 1});
    let g = svg.group({stroke: "black", "stroke-width": 4});
    g.line([-0.5, 0], [-2, 1.5]);
    g.line([0.5, 0], [2, 1.5]);
    svg.rect([2, 1], [0, 0]).css({fill: "#E0E0E0", stroke: "black", "stroke-width": 2});
    g = svg.group("sans", "#0065fe", {"font-weight": "bold"});
    g.gtext("Mr. Mac’s", {}, [0, 0.12]);
    g.gtext("House of Physics", {}, [0, -0.12]);
   
},

sign_vec: (sel) => {
    let Fg = 491, F = Fg / root(2);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F, 45), vec2d(F, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, label: [60, 0]});
    svg.$.find(".Component, .Resultant").remove();
    svg.gtext("N", "sans", [270, -510]);
    svg.mjax("\\vec{\\bf F}_g", null, [40, -240], "red");
    svg.mjax("\\vec{\\bf F}_1", null, [150, -400], "red");
    svg.mjax("\\vec{\\bf F}_2", null, [160, -100], "red");
    let g = svg.group("sans", "red");
    g.gtext("45.0°", [], [30, -70], -67.5);
    g.gtext("90.0°", [], [180, -240]);
    g.gtext("45.0°", [], [30, 70 - Fg], 67.5);
},

sign_uneven: (sel) => {
    let Fg = 491;
    let F1 = Fg / sin(105) * sin(45);
    let F2 = Fg / sin(105) * sin(30);
    let svg = SVG2.vec_diag(sel, [[0, -Fg], vec2d(F1, 60), vec2d(F2, 135)], {lrbt: [-120, 300, -540, 30],
        scale: 0.75, margin: 12, grid: 30, label: [60, 0]});
    svg.$.find(".Component, .Resultant").remove();
    svg.gtext("N", "sans", [270, -510]);
    svg.mjax("\\vec{\\bf F}_g", null, [40, -240], "red");
    svg.mjax("\\vec{\\bf F}_1", null, [135, -330], "red");
    svg.mjax("\\vec{\\bf F}_2", null, [140, -80], "red");
    let g = svg.group("sans", "red");
    g.group().gtext("105.0°", {}, [120, -180]);
    g.group().config({theta: -67.5}).gtext("45.0°", {}, [75, 0]);
    g.group().config({theta: 75, pivot: [0, -Fg]}).gtext("30.0°", {}, [85, 1 - Fg]);
},
    
pulley: (sel, fbd) => {
    let h = fbd ? 420 : 276;
    let svg = new SVG2(sel, {size: [400, h], grid: 0, lrbt: [-12, 4, -10], margin: [0, 18, 1, 0]});

    let c = [1, 0.5];
    let a = 10;
    css(svg.line([0, 0], [0, -10]), "black@3");
    css(svg.line([-12, -10], [5, -10]), "black@2");

    let g = svg.group("black@1", "none").config({theta: a});
    g.circle(0.5, c).css({fill: "#d0d0ff"});
    g.line([-7, 1], [1, 1]);
    css(g.line([0, 0], c), "black@2");
    css(g.rect([4, 2], [-8, 1]), "lightgrey");
    css(g.line([0, 0], [-12, 0]), "black@3");

    c = transform({angle: a, deg:true}, c)[0].plus([0.5, 0]);
    let x = c[0];
    let y = c[1] - 3;

    let tail = {tail: "6"};
    if (fbd) {
        g.line([-8, -8], [-8, 10]).css({stroke: "black", "stroke-width": "1px", "stroke-dasharray": "7,5"}).prependTo(g.$);
        let v = g.group("arrow");
        v.arrow({tail: [-8, 2.2], length: 6*cos(10)}, tail, "tail").config({theta: 90});
        v.arrow({tail: [-10.2, 0.2], length: 1.5}, tail, "tail").config({theta: 180});
        v.arrow({tail: [-5.8, 1], length: 2}, tail, "tail");
        svg.mjax("\\vec{\\bf F}_n", null, [-7.5, 5], "red");
        svg.mjax("\\vec{\\bf F}_f", null, [-11, 0], "red");
        svg.mjax("\\vec{\\bf F}_t", null, [-5, 2], "red");
    }

    let small = {scale: 0.75};
    g.mjax("m_1", small, [-8, 1]);
    svg.mjax("y", null, [-7.5, 8.5]);
    svg.mjax("h", null, [4, (y - 11.5)/ 2]);

    g = svg.group("black@1");
    g.line(c, [x, y]);
    css(g.rect([1.5, 3], [x, y]), "lightgrey");
    g.line([3, y - 1.5], [3, -10]);
    svg.mjax("m_2", small, [x, y]);

    if (fbd) {
        svg.mjax("\\vec{\\bf F}_g", null, [-9, -4], "red");
        svg.mjax("\\vec{\\bf F}_g", null, [2, -8], "red");
        svg.mjax("\\vec{\\bf F}_t", null, [3, 1.5], "red");
        g = svg.group("arrow");
        g.arrow({tail: [-8, -1.6], length: 6}, tail, "tail").config({theta: -90});
        g.arrow({tail: [x, -4], length: 3}, tail, "tail").config({theta: -90});
        g.arrow({tail: [x, -0.7], length: 2}, tail, "tail").config({theta: 90});
    }

},

});