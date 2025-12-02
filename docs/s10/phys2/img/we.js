SVG2.cache("s10/phys2/img/we.js", {

pend: (sel) => { // Illustration for Pendulum Lab handout
    let svg = new SVG2(sel, {scale: 16, lrbt: [-12, 12, -24, 1], margin: 2});
    let g = svg.ruler(60, "5", {big: 5}).css({fill: "#ffcd82"}, "black@1");
    g.config({theta: 90, shift: [-10, g.rulerLength/2 - 24]});
    let r = 20;
    let pts = [vec2d(r, -120), vec2d(r, -105), [0, -r], vec2d(r, -75), vec2d(r, -60)];
    let g1 = svg.group("black@1");
    let g2 = svg.group("text", 18, "bold");
    let c = 0;
    for (let pt of pts) {
        let [x, y] = pt;
        g1.line([0, 0], pt);
        g2.gtext(String.fromCharCode(65+c), {}, [x + (x > 0 ? 1 : -1), y + 1]);
        c++;
    }
    g1.line([-12, -24], [12, -24]).css({"stroke-width": "2px"});
    svg.plot(pts, "10").css("#0065fe");
    // svg.save();
},

tennis: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 10, 0, 40], margin: [58, 12, 54, 12]}).css(".NoStyle");
    svg.graph({grid: [1, 5],
        x: {tick: [0, 11, 1], title: ["Position / cm", [5, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 41, 5], title: ["Force / N", "-40"], shift: ["-10", "-4"]},
        data: [{connect: [[0, 0], [5, 35], [7, 35], [10, 0]]}],
    });

    let g = svg.group({"fill-opacity": 0.2});
    g.$.insertBefore(svg.$.find("g.Series"));
    g.poly([[0, 0], [5, 35], [5, 0]], 1).css({fill: "#0065fe"}).addClass("Toggle0");
    g.poly([[5, 0], [5, 35], [7, 35], [7, 0]], 1).css({fill: "red"}).addClass("Toggle1");
    g.poly([[7, 0], [7, 35], [10, 0]], 1).css({fill: "yellow"}).addClass("Toggle2");
    svg.click_toggle(3, 1, 3);
},

bump: (sel) => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.4, 0, 380], margin: [68, 16, 54, 4]}).css(".NoStyle");
    svg.graph({grid: [0.02, 20],
        x: {tick: [0, 0.41, 0.1], dec:1, title: ["Position / m", [0.2, "-44"]], shift: [0, "-22"]},
        y: {tick: [0, 361, 40], title: ["Force / N", "-48"], shift: ["-10", "-4"]},
        data: [{connect: [[0, 0], [0.3, 360], [0.4, 0]]}],
    });
    // svg.save();
},

});