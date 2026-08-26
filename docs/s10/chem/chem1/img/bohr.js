scripts.cache["s10/chem/chem1/img/bohr"] = {

bohr: (sel, args) => {
    let [p, m, q, color] = args;
    if (!color) color = "black";
    let e = [];
    let n = p - (q ? q : 0);
    let cap = [2, 8, 8, 18, 18, 32, 32];
    for (let c of cap) if (n >= c) {e.push(c); n -= c}
    let i = e.length - 1;
    if (n || (q > 0 && e[i] == cap[i])) e.push(n);

    let svg = new SVG2(sel, {scale: 48, margin: 2, grid: 0, lrbt: [-1, 1, -0.5, e.length + 1.65]});
    let size = {scale: 0.9};
    let g = svg.group("none", color + "@2");
    g.circle(1, [0, 0.5]);
    for (let i=0; i<e.length;i++) {
        y = 2 + i;
        g.line([-0.8, y], [0.8, y]);
        if (e[i]) g.mjax(`${e[i]}\\,e^{-}`, size, [0.1, y + 0.1, "b"], color);
    }
    g.mjax(`${p}\\,p^{+}`, size, [0.1, 0.5, "b"], color);
    g.mjax(`${m-p}\\,n`, size, [0, 0.3, "t"], color);
},

dot: (sel, args) => {
    let [sym, q, dots, c] = args;
    let svg = new SVG2(sel, {scale: 72, lrbt: q ? [-0.6, 1, -0.6, 0.7]: [-0.6, 0.6, -0.6, 0.6]});
    let m = svg.molecule(c);
    m.atoms(sym, [0, 0]);
    m.text.css(28);
    if (dots) m.dots(null, [0, 0, dots]);
    if (q) {
        m.brackets([0, 0, 1, 1]);
        let s = q < 0 ? '–' : '+';
        if (q < 0) q = -q;
        if (q > 1) s = `${q}${s}`;
        m.text.text(s, [0.6, 0.5, "l"], 0, 20);
    }
},

carbon: (sel) => {
    let svg = new SVG2(sel, {size: [256, 256], lrbt: [-1, 1]});
    let b = 0.04;

    // Electrons
    let g = svg.group("none", "green@1");
    for (let [r, n] of [[0.35, 2], [0.62, 4], [0.95, 0]]) {
        g.circle(r, [0, 0]);
        let angle = 360 * Math.random();
        let elec = (i) => vec2d(r, angle + 360 * i / n)
        for (let i=0;i<n;i++)
            css(svg.circle(0.75 * b, elec(i)), "limegreen", "black@1");
    }

    // Nucleons
    g = svg.group("black@1", "red");
    let proton = true;
    for (let pt of [[-0.0417, 0.0446], [0.0402, -0.0345], [-0.0178, -0.0509], [0.0481, 0.0360],
        [-0.0389, 0.0567], [-0.0475, 0.0403], [-0.0199, 0.0177], [-0.0613, -0.0053],
        [-0.0078, 0.0413], [-0.0048, -0.0071], [0.0207, 0.0021], [0.0284, -0.0517]]) {
            g.circle(b, pt).css(proton ? {fill: "#0065fe"} : {});
            proton = !proton;
    }

},

};
