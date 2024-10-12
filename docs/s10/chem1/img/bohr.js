SVG2.cache("s10/chem1/img/bohr.js", {

bohr: (sel) => {
    let e = $(sel);
    let [elem, A, M, Q] = JSON.parse(e.attr("data-args"));
    let elec = A - Q;
    let capacity = [2, 8, 8, 18, 18];
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
    let w = 128, ymin = -1.2;
    let h = (w - 4) / 1 * (valence / 2 - ymin) + 4;
    e.attr({width: w, height: h, "data-aspect": `${w}/${h}`});
    let svg = new SVG_Animation(sel, -0.5, 0.5, ymin, valence / 2, 2);
    let r = 0.45;
    let g = svg.group().css({fill: "none", stroke: "black", "stroke-width": "2px"});
    let t = svg.group().css({fill: "black"});
    svg.circle(0.45, [0, r + ymin], g);
    for (let i=0;i<valence;i++) {
        let q = econfig[i];
        let y = i / 2;
        svg.line([-r, y], [r, y], g);
        if (q) svg.symbol(`${q} e`, {q1: "–"}, [0, y + 0.14], t);
    }
    svg.symbol(`${A} p`, {q1: "+"}, [0, ymin + r * (M > A ? 1.25 : 1)], t);
    if (M > A) svg.symbol(`${M - A} n`, {}, [0, ymin + 0.5 * r], t);
    svg.$.find("g.Symbol text").css({"font-family": `"Noto Serif", serif`});
    svg.final();
},

dot: (sel) => {
    let paired = 0;
    let [elem, q, val] = JSON.parse($(sel).attr("data-args"));
    if (val == -2) {val = 5; paired = 1}
    else if (val == -5) {val = 6; paired = 2}
    let svg;
    if (q) {
        $(sel).attr({width: 135, height: 125, "data-aspect": "27/25"});
        svg = new SVG_Animation(sel, -1.1, 1.6, -1.1, 1.4);
        let g = svg.group().css({fill: "none", stroke: "black", "stroke-width": "2px"});
        svg.poly([[-0.8, 1], [-1, 1], [-1, -1], [-0.8, -1]], 0, g);
        svg.poly([[0.8, 1], [1, 1], [1, -1], [0.8, -1]], 0, g);
        let t = svg.text(q > 0 ? `${q==1 ? "&nbsp;" : q}+` : `${q == -1 ? "&nbsp;" : -q}–`, [1.1, 1.1], g);
        t.css({"text-anchor": "start", stroke: "none", fill: "black", "font-size": "18px"});
    }
    else {
        $(sel).attr({width: 110, height: 110, "data-aspect": "1"});
        svg = new SVG_Animation(sel, -1.1, 1.1, -1.1, 1.1);        
    }
    let r = 0.7, dr = 0.18;
    let dots = [[0, r], [r, 0], [0, -r], [-r, 0]];
    for (let i=0;i<val;i++) {
        let pos = new RArray(...dots[i % 4]);
        if (i > 3 || i + 4 < val) {
            let dx = i % 2 == 0 ? (i > 3 ? dr : -dr) : 0;
            let dy = i % 2 == 0 ? 0 : (i > 3 ? dr : -dr);
            pos = pos.plus([dx, dy]);
        }
        if (!paired || (paired == 1 && (i == 0 || i == 4)) || (paired == 2 && i != 3)) svg.circle(0.07, pos);
    }
    // svg.grid([-1, 2, 0.2], [-1, 2, 0.2]);
    svg.text(elem, [0, 0]).css({"font-size": "28px"});
    svg.final();
},

carbon: (sel) => {
    $(sel).attr({width: 256, height: 256, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1, 1, -1, 1, 2);
    let a = 0.35, b = 0.04;
    // let g = svg.group();
    for (let [r, n] of [[0.35, 2], [0.62, 4], [0.95, 0]]) {
        svg.circle(r, [0, 0]).css({fill: "none", stroke: "green"});
        let angle = 360 * Math.random();
        let elec = (i) => vec2d(r, angle + 360 * i / n)
        for (let i=0;i<n;i++) 
            svg.circle(0.75 * b, elec(i)).css({fill: "green", stroke: "black", "stroke-width": "0.5px"});
    }
    // let elec = [a * sin(140), cos(140)];
    let pts = [[-0.0417, 0.0446], [0.0402, -0.0345], [-0.0178, -0.0509],
        [0.0481, 0.0360], [-0.0389, 0.0567], [-0.0475, 0.0403],
        [-0.0199, 0.0177], [-0.0613, -0.0053], [-0.0078, 0.0413],
        [-0.0048, -0.0071], [0.0207, 0.0021], [0.0284, -0.0517]];
    // let nuke = () => {
    //     let p = [0.15 * (Math.random() - 0.5), 0.12 * (Math.random() - 0.5)];
    //     pts += `[${p[0].toFixed(4)}, ${p[1].toFixed(4)}], `
    //     return p;
    // }
    for (let i=0;i<6;i++) {
        // let g = svg.group();
        // if (i) g.config({theta: 120 * i});
        // svg.ellipse(a, 1, [0, 0], g);
        // svg.circle(0.75 * b, elec, g).addClass("Electron");
        svg.circle(b, pts[2*i]).addClass("Neutron");
        svg.circle(b, pts[2*i+1]).addClass("Proton");
    }
    svg.$.find("ellipse").css({fill: "none", stroke: "green"});
    let attr = {stroke: "black", "stroke-width": "0.5px", fill: "green"};
    svg.$.find(".Electron").css(attr);
    attr.fill = "red";
    svg.$.find(".Proton").css(attr);
    attr.fill = "#0065FE";
    svg.$.find(".Neutron").css(attr);
    svg.final();

},

});
