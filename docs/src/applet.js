/* © 2023-2024 by D.G. MacCarthy <sc8pr.py@gmail.com> */

const applet = {};

applet.graph = (sel, opt) => { // Draw a grid with labelled axes
    // Calculate margins and create SVG_Animation object
    let grid = opt.grid;
    let lrbt = opt.lrbt;
    if (!lrbt) {
        let [mx1, mx2, my1, my2] = opt.margin;
        let [x1, x2, dx] = grid[0];
        let [y1, y2, dy] = grid[1];
        dx = x2 - x1;
        dy = y2 - y1;
        lrbt = [x1 - mx1 * dx, x2 + mx2 * dx, y1 - my1 * dy, y2 + my2 * dy];
    }
    let svg = new SVG_Animation(sel, ...lrbt);

    // Draw grid and axes
    svg.grid(...grid);
    let g = svg.group().addClass("Axes");
    for (let i=0;i<2;i++) {
        let a = applet.graph.tick(svg, opt, grid, i);
        if (a) svg.axis(a, g);
    }
    return svg;
}

applet.graph.tick = (svg, opt, grid, i) => {
    let axis = i ? opt.y : opt.x;
    if (axis == null) return;
    let tick = axis[2];
    tick = tick ? {ticks: tick} : {};
    let gr = tick[i ? "y" : "x"] = [grid[i][0], grid[i][1]];
    let pos = [...axis[1]], c = pos[i], s = pos[1-i];
    if (typeof(c) == "string") {
        if (c == "^") pos[i] = (gr[0] + gr[1]) / 2;
        else if (c == "<") pos[i] = gr[0];
        else if (c == ">") pos[i] = gr[1];
    }
    if (typeof(s) == "string") pos[1-i] = parseFloat(s) * (i ? svg.pixelX : svg.pixelY);
    tick.title = {text: axis[0], position: pos};
    return tick;
}
