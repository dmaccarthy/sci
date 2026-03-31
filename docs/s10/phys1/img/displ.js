SVG2.cache("s10/phys1/img/displ.js", {

sparker: (sel) => {
// Diagram for spark timer lab <svg data-svg2="s10/phys1/img/displ.js#sparker"></svg>

    let svg = new SVG2(sel, {scale: 24, margin: 2, lrbt: [-12, 10, -6, 2]});

    // Floor
    let g = svg.group("grey", "black@1");
    g.line([-12, -6], [10, -6]);

    // Table
    g.rect([1, 6], [-7, -3]);
    g.rect([1, 6], [7, -3]);
    g.rect([20, 1], [0, -0.5]);

    // Spark Tape
    g.line([-7.5, 0.5], [-3, 0.55]);
    css(g.path([-8.5, 0.5]).arc_to([-10, 0], 2).arc_to([-10.5, -5.75], 12).update(), "none");

    // Ruler
    let opt = {width: 0.5, big: 5, tickSmall: 0.4, tickBig: 0.6};
    svg.ruler(50, 0.2, opt).config({theta: 180}).shift_by([4, -5.75]).css("beige", "black@1");

    // Cart
    g = svg.group("silver", "black@1").shift_by([-1.5, 0.5]);
    css(g.rect([3, 0.4]), "#0065fe");
    g.circle(0.3, [-1, -0.2]);
    g.circle(0.3, [1, -0.2]);
    svg.group("arrow", "#0065fe").arrow({tail: [1, 0.625], length: 4}, {tail: "6"});

    // Timer
    g = svg.group("red", "black@1").shift_by([-8, 0.25]);
    css(g.rect([1.2, 0.2], [0, 0.35]), "lightgrey");
    g.rect([1.2, 0.5]);

    // Labels
    g = svg.group("sans", 16);
    g.text("Cart", [-1, 1.2, "b"]);
    g.text("Spark Timer", [-8, 1.2, "b"]);
    g.text("Spark Tape", [-11.2, -3.5, "b"], 90);
    g.text("Metre Stick", [4, -5, "b"]);
    g.text("Tape", [-3.5, 1.5, "b"]);
    css(svg.line([-3.25, 1.3], [-2.75, 0.75]), "black@1");
},

student: (sel, arrow) => {
    let svg = new SVG2(sel, {scale: 10, lrbt: [-15, 30, -3, 6], margin: [14, 14, 2, 6]});
    svg.line([-17, 0], [32, 0]).css({stroke: "black"});

    let opt = {anchor: true, css: ["sans", 15]}
    svg.ticks({x: [-15, 31, 1], ...opt, size: ["-6", 0]});
    svg.ticks({x: [-15, 31, 5], ...opt, label: 0});

    let text = svg.group("sans", 15);
    let disp = svg.group("arrow");
    let i = 0;
    let traj = [-10, 2, -3, 15, 30];
    while (i < traj.length) {
        x = traj[i++];
        svg.stickman(4).config({shift: [x, 0]});
        text.text(i, [x, 5]);
        if (arrow && i < traj.length) {
            let y = (i - 2);
            disp.arrow({tail: [x, y], tip: [traj[i], y]}, {tail: "7"});
        }
    }
},

patrol: (sel, x0) => {
    let x1 = x0 + 1400;
    let svg = new SVG2(sel, {size: [480, 100], lrbt: [x0-50, x1, -3, 6], margin: [30, 18, 6, 12]});
    svg.line([x0-50, 0], [x1+25, 0]).css({stroke: "black"});
    let start = 200 * Math.floor(x0 / 200);

    let opt = {anchor: true, size: ["-6", 0], label: 0, skip: 4, major: 1.8, shift: "-27", css: ["sans", 15]}
    svg.ticks({x: [start, x1+1, 50], ...opt});

    let cities = {500: "Swift Current", 0: "Calgary", 275: "Medicine Hat", 750: "Regina", 1325: "Winnipeg"};
    let lines = svg.group("black@1");
    let names = svg.group("sans", 14);
    for (let i in cities) {
        let y = i == 500 ? 4.5 : 3;
        x = x0 + parseFloat(i);
        names.text(cities[i], [x, y+0.9]);
        lines.line([x, 0], [x, y]);
    }
},

});