SVG2.cache("s10/chem1/img/bohr.js", {

bohr: (sel, A, M, Q) => {
    if (!Q) Q = 0;
    let elec = A - Q;
    if (elec > 36) {
        console.warn("Energy level diagrams not supported for more than 36 electrons");
        return;
    }

    let capacity = [2, 8, 8, 18];
    let valence = 0;
    let econfig = [];
    while (elec) {
        econfig.push(Math.min(elec, capacity[valence]));
        elec -= econfig[econfig.length - 1];
        valence++;
    }
    if (Q > 0 && econfig[valence-1] == capacity[valence-1]) {
        econfig.push(0);
        valence++;
    }
    if (econfig.length == 0) econfig = [0];
    valence = econfig.length;

    let svg = new SVG2(sel, {grid: 0, margin:2, scale: 40, lrbt: [-1, 1, -1.6, valence + 1]});
    let color = svg.$.closest(".Answer").length ? "red" : "black";
    let g = svg.group(`${color}@2`, "none");
    let text = svg.group("symbol", 20, color);
    g.circle(1, [0, -0.6]);
    let s = {scale: 0.75};
    for (let y=1;y<=valence;y++) {
        g.line([-1, y], [1, y]);
        let e = econfig[y - 1];
        if (e) svg.mjax(`{\\rm ${e}}\\,e^{-}`, s, [0, y + 0.1, 0.5, 1], color);
    }
    svg.mjax(`{\\rm ${A}}\\,p^{+}`, s, [0, -0.2], color);
    svg.mjax(`{\\rm ${M-A}}\\,n`, s, [0, -1], color);
},

dot: (sel, elem, q, val) => {
    let paired = 0;
    if (val == -2) {val = 5; paired = 1}
    else if (val == -5) {val = 6; paired = 2}
    let svg;
    let color = $(sel).closest(".Answer").length ? "red" : "black";
    if (q) {
        svg = new SVG2(sel, {scale: 36, lrbt: [-1.1, 1.6, -1.1, 1.4]}).css(".NoStyle");
        let g = svg.group("none", `${color}@2`);
        g.poly([[-0.8, 1], [-1, 1], [-1, -1], [-0.8, -1]]);
        g.poly([[0.8, 1], [1, 1], [1, -1], [0.8, -1]]);
        svg.gtext(q > 0 ? `${q==1 ? "&nbsp;" : q}+` : `${q == -1 ? "&nbsp;" : -q}–`, ["sans", color, 18], [1.1, 1.1, "l"]);
    }
    else svg = new SVG2(sel, {scale: 36, lrbt: [-1.1, 1.1, -1.1, 1.1]});
    let g = svg.group(color);
    let r = 0.7, dr = 0.18;
    let dots = [[0, r], [r, 0], [0, -r], [-r, 0]];
    for (let i=0;i<val;i++) {
        let pos = new RArray(...dots[i % 4]);
        if (i > 3 || i + 4 < val) {
            let dx = i % 2 == 0 ? (i > 3 ? dr : -dr) : 0;
            let dy = i % 2 == 0 ? 0 : (i > 3 ? dr : -dr);
            pos = pos.plus([dx, dy]);
        }
        if (!paired || (paired == 1 && (i == 0 || i == 4)) || (paired == 2 && i != 3)) g.circle(0.07, pos);
    }
    svg.gtext(elem, ["sans", color, 24]);
},

carbon: (sel) => {
    let svg = new SVG2(sel, {size: [256, 256], lrbt: [-1, 1]}).css(".NoStyle");
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

});
