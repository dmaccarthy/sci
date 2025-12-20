SVG2.cache("s10/phys2/img/we.js", {

pend: (sel) => { // Illustration for Pendulum Lab handout
    let svg = new SVG2(sel, {scale: 16, lrbt: [-12, 12, -24, 1], margin: 2});
    let g = svg.ruler(60, "5", {big: 5}).css("#ffcd82", "black@1");
    g.config({theta: 90, shift: [-10, g.rulerLength/2 - 24]});
    let r = 20;
    let pts = [vec2d(r, -120), vec2d(r, -105), [0, -r], vec2d(r, -75), vec2d(r, -60)];
    let g1 = svg.group("black@1");
    let g2 = svg.group("sans", 18, "bold");
    let c = 0;
    for (let pt of pts) {
        let [x, y] = pt;
        g1.line([0, 0], pt);
        g2.gtext(String.fromCharCode(65+c), {}, [x + (x > 0 ? 1 : -1), y + 1]);
        c++;
    }
    css(g1.line([-12, -24], [12, -24]), "@2");
    svg.plot(pts, "10").css("#0065fe");
    // svg.save();
},

tennis: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 40], grid: [1, 5], margin: [58, 12, 54, 12]});
    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 11, 1], ...opt});
    svg.ticks({y: [0, 41, 5], ...opt});
    let g = svg.group("sans", 18);
    g.text("Position / cm", [5, "-24", "t"]);
    g.text("Force / N", ["-36", 20, "b"], 90);
    let poly = [[0,0], [5, 35], [7, 35], [10, 0]];
    let color = ["#0065fe", "red", "yellow"];
    g = svg.group("none@", {"fill-opacity": 0.2});
    css(svg.poly(poly), "none", "#0065fe@2");
    for (let i=0;i<3;i++) {
        let p0 = poly[i];
        let p1 = poly[i + 1];
        let pts = [p0, p1, [p1[0], 0]];
        if (p0[1]) pts.push([p0[0], 0]);
        css(g.poly(pts, 1), color[i], `.Toggle${i}`);
    }
    svg.click_toggle(3, 1);
},

// truck: (sel) => {
//     let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 80], margin: [58, 12, 54, 12]});
//     svg.graph({grid: [1, 5],
//         x: {tick: [0, 11, 1], title: ["Position / m", [5, "-44"]], shift: [0, "-18"]},
//         y: {tick: [0, 81, 10], title: ["Force / N", "-40"], shift: ["-20", 0]},
//         data: [{connect: [[0, 0], [5, 70], [10, 30]]}],
//     });

//     let g = svg.group({"fill-opacity": 0.2});
//     g.$.insertBefore(svg.$.find("g.Series"));
// },

bump: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.4, 0, 400], grid: [0.02, 20], margin: [64, 16, 50, 12]});
    let opt = {size: ["-6", 0], css: 15, label: 0, shift: "-8"};
    svg.ticks({x: [0, 0.41, 0.1], ...opt, label: 1});
    svg.ticks({y: [0, 401, 40], ...opt});
    let g = svg.group("sans", 18);
    g.text("Position / m", [0.2, "-26", "t"]);
    g.text("Force / N", ["-44", 180, "b"], 90);
    css(svg.poly([[0, 0], [0.3, 360], [0.4, 0]]), "none", "#0065fe@2");
},

});