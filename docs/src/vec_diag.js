function vector_diagram(vecs, opt) {
    /*** Create a vector diagram as an SVG2 instance: 
    /* opt = {shift, origin, margin, scale, squares, cycle, arrow[shape, tail, etc.]}
    ***/
    let shift = opt.shift;
    if (shift == true) {
        shift = vecs[0];
        vecs = vecs.slice(1);
    }
    else if (!shift) shift = [0, 0];
    return vector_diagram.draw(vecs, {...opt, shift: shift});
}

vector_diagram.grid = (x0, x1, y0, y1, n) => {
    /* Calculate optimal grid size */

    let lims = (x0, x1, dx) => {
        /* Calculate lower and upper limit as multiples of grid step */
        x0 = dx * Math.floor(x0 / dx - 0.25);
        x1 = dx * Math.ceil(x1 / dx + 0.25);
        return [x0, x1];
    }

    let grid_x = (x0, x1, n) => {
        /* Calculate optimal step size*/
        let steps = vector_diagram.steps;
        let dx = (x1 - x0) / (n - 1);
        if (dx == 0) return 0;
        let exp = Math.floor(Math.log10(Math.abs(dx)));
        let pow = Math.pow(10, exp);
        dx /= pow;
        let i = 0;
        while (dx > steps[i]) i++;
        return parseFloat((steps[i] * pow).toPrecision(2));
    }

    // Calculate step size
    let gx = grid_x(x0, x1, n);
    let gy = grid_x(y0, y1, n);
    let dx = Math.max(gx, gy);
    if (dx == 0) throw "Grid size is zero!";

    // Calculate coordinate system viewport
    [x0, x1] = lims(x0, x1, dx);
    [y0, y1] = lims(y0, y1, dx);
    let s = 600 / Math.max(x1 - x0, y1 - y0);
    return {lrbt: [x0, x1, y0, y1], scale: s, grid: dx};
}

vector_diagram.steps = [1, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10];

vector_diagram.draw = (vecs, opt) => {
    // Get drawing viewport
    let shift = opt.shift;
    let sum = new RArray(...shift);
    let x = [shift[0]], y = [shift[1]];
    if (opt.origin) {x.push(0); y.push(0)}
    for (let i = 0; i < vecs.length; i++) {
        sum = sum.plus(vecs[i]);
        x.push(sum[0]);
        y.push(sum[1]);
    }

    // Create SVG2 instance
    let n = opt.squares ? opt.squares : 20;
    let grid = vector_diagram.grid(Math.min(...x), Math.max(...x), Math.min(...y), Math.max(...y), n);
    for (let k of ["scale", "margin"]) if (opt[k] != null) grid[k] = opt[k];
    let svg = opt.svg ? new SVG2(opt.svg, grid) : SVG2.create(grid);
    let [x0, x1, y0, y1] = grid.lrbt;
    grid = grid.grid;

    // Axis labelling function
    let exp = Math.floor(Math.log10(Math.abs(grid)));
    if (Math.abs(exp) < 3) exp = 0;
    svg.vector_scale = exp;
    grid *= 2;
    let fixed = (grid / Math.pow(10, exp)).toFixed(3).split('.')[1];
    while (fixed.charAt(fixed.length - 1) == '0')
        fixed = fixed.substring(0, fixed.length - 1);
    fixed = fixed.length;
    let label = x => {
        if (exp) x /= Math.pow(10, exp);
        return x.toFixed(grid > 9e99 ? 0 : fixed).replace('-', '–');
    }

    // Label axes
    x0 = grid * Math.ceil(x0 / grid);
    y0 = grid * Math.ceil(y0 / grid);
    svg.ticks_xy([x0, x1, grid], [y0, y1, grid], {label: label, default: true, removeZero: opt.removeZero});

    // Draw vectors
    let g = svg.group().config({shift: shift});
    g.tip_to_tail(vecs, opt.arrow);
    if (opt.cycle == -1) g.$.find(".Component").hide();
    else if (opt.cycle) svg.vec_cycle(g.$, vecs.length > 1);
    return svg;
}

vector_diagram.table = (sym, vecs, prec) => { // scale
    /* Compose a table showing vector addition */
    let tbl = $("<table>").addClass("VectorTable");
    let thead = $("<thead>").appendTo(tbl);
    let tr = $("<tr>").appendTo(thead);
    let v = sym.charAt(0) == "Δ" ? `\\Delta\\va{${sym.substring(1)}}` : `\\va{${sym}}`;
    for (let x of [`|${v}|`, `\\theta`, `${v}_x`, `${v}_y`])
        tr.append($("<th>").addClass("TeX").html(x));
    tr = $("<tr>").appendTo(thead);
    for (let x of [`\\sqrt{(${v}_x)^2 + (${v}_y)^2}`, `\\tan^{-1}\\frac{${v}_y}{${v}_x}`, `|${v}| \\cos\\theta`, `|${v}| \\sin\\theta`])
        tr.append($("<th>").html($("<span>").html(x).addClass("TeX")));
    let tbody = $("<tbody>").appendTo(tbl);
    let pt = new RArray(0, 0);
    for (let v of vecs) {
        // if (scale) v = new RArray(...v).times(scale);
        pt = pt.plus(v);
        tbody.append(new RArray(...v).tr(prec ? prec : 4));
    }
    tbody.append(new RArray(...pt).tr(prec ? prec : 4).addClass("Resultant"));
    renderTeX(thead.find(".TeX"));
    return tbl;
}
