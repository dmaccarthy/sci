SVG2.cache("s10/phys1/img/displ.js", {

student: (sel, arrow) => {
    let svg = new SVG2(sel, {scale: 10, lrbt: [-15, 30, -3, 6], margin: [14, 14, 2, 6]}).css(".NoStyle");
    svg.line([-17, 0], [32, 0]).css({stroke: "black"});
    svg.label(["-8", "0"], [...range(-15, 31, 1)], 0);
    svg.label(0, [...range(-15, 31, 5)], -2.5);

    let text = svg.group("text", 15);
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
    let shift = x0 ? true : false;
    let x1 = x0 + 1400;
    let svg = new SVG2(sel, {size: [480, 100], lrbt: [x0, x1, -3, 6], margin: [30, 18, 6, 12]}).css(".NoStyle");
    svg.line([x0-25, 0], [x1+25, 0]).css({stroke: "black"});
    let ticks = svg.label(["-4", "0"], [...range(x0, x1+1, 50)], 0).$.find("line");
    let i = shift ? 3 : 0;
    while (i < ticks.length) {
        $(ticks[i]).remove();
        i += 4;
    }
    let x = 200 * Math.ceil(x0 / 200);
    svg.label(["-8", "0"], [...range(x, x+1401, 200)], 0);
    svg.label(0, [...range(x, x+1401, 200)], -2.75);

    let cities = {500: "Swift Current", 0: "Calgary", 275: "Medicine Hat", 750: "Regina", 1325: "Winnipeg"};
    let lines = svg.group("black@1");
    let names = svg.group("text", 14);
    for (let i in cities) {
        let y = i == 500 ? 4.5 : 3;
        x = x0 + parseFloat(i);
        names.text(cities[i], [x, y+0.9]);
        lines.line([x, 0], [x, y]);
    }
},

});