SVG2.cache("s10/chem1/img/atomic.js", {
 
bun: (sel) => {
    let svg = new SVG2(sel, {size: [300, 256], lrbt: [-1.2, 1.2], margin: 2});
    svg.$.addClass("SVG2");
    svg.circle(1, [0, 0]).css({fill: "#F1B9A1", stroke: "black"});
    let a = 0.15, b = 0.75;
    svg.poly([[a, b], [a, a], [b, a], [b, -a], [a, -a], [a, -b], [-a, -b], [-a, -a],
        [-b, -a], [-b, a], [-a, a], [-a, b]], 1).css({fill: "red", "fill-opacity": 0.2});
    let attr = {stroke: "black", "stroke-width": "0.5px"};
    let pts = [[0.4243, 0.4243], [-0.28, 0.65], [-0.51, -0.07],
        [-0.15, -0.55], [0.1707, -0.1062], [0.5, -0.3]];
    svg.line(pts[0], [0.85, 0.78]).css({stroke: "green"});
    let g = svg.group();
    for (let i=0;i<pts.length;i++) g.circle(0.04, pts[i]).css(attr);
    g.text("Electron", [0.86, 0.9]);
    g.$.find("text, circle").css({fill: "green"});
    return svg;
},

rutherford: (sel) => {
    let svg = new SVG2(sel, {size: [300, 256], lrbt: [-1.2, 1.2], margin: 2});
    svg.config({electron: 140}).$.addClass("SVG2");
    let a = 0.35, b = 0.04;
    let elec = (x) => [a * sin(x), cos(x)];
    let n = [[0.0374, 0.019], [-0.0383, -0.0237], [-0.0558, 0.0394], [0.0516, -0.0361]];
    let p = [[-0.0138, 0.0375], [-0.0025, -0.0422], [0.0521, 0.0135]];
    let hide = svg.group();
    let gn = hide.group();
    let gp = hide.group();
    let elecs = [];
    for (let i=0;i<3;i++) {
        let g = svg.group();
        if (i) g.config({theta: 120 * i});
        g.ellipse([a, 1]).css({stroke: "green"});
        let ge = g.group().config({shift: elec(140)});
        elecs.push(ge);
        ge.circle(0.75 * b, [0, 0]).css({fill: "green"});
        gn.circle(b, n[i]);
        gp.circle(b, p[i]);
    }
    gn.circle(b, n[3]);
    hide.text("Electron", [0.55, 0.75]).css({fill: "green"});
    gp.line(vec2d(b, -60).plus(p[1]), [0.6, -0.7]).css({stroke: "red"});
    gn.line(n[2], [-0.6, 0.7]).css({stroke: "#0065FE"});
    gn.text("Neutron", [-0.7, 0.8]);
    gp.text("Proton", [0.7, -0.8]);
    gn.$.find("circle, text").css({fill: "#0065fe"});
    gp.$.find("circle, text").css({fill: "red"});

    svg.beforeupdate = function() {
        let label = hide.$.find("text, line");
        if (this.playing) label.fadeOut();
        else label.fadeIn();
        this.electron = this.playing ? this.electron + 6 : 140;
        let xy = elec(this.electron);
        for (let e of elecs) e.config({shift: xy});    
    }

    return svg;
},

nuclear: (sel) => {
    let svg = SVG2.cache_run("s10/chem1/img/atomic.js", "rutherford", sel);
    svg.$.on("click", () => svg.toggle().update(0));
},

nuclear_alpha: (sel) => {
    let svg = SVG2.cache_run("s10/chem1/img/atomic.js", "rutherford", sel);
    svg.$.find("text, line").remove();
    let g = svg.group();
    for (let y of [-0.5, -0.83, 0.3, 0.65, 0.8]) {
        g.ray([-1.2, y], [1.2, y], null, 1);
    }
    g.line([-1.2, -0.05], [-0.1, -0.05]);
    g.ray([-0.1, -0.05], [-1.2, -0.7], null, 1);
    g.$.find("*").css({stroke: "#0065fe", "stroke-width": "2px"});
    let t = g.$.find("polyline, line");
    svg.$.on("click", () => {
        svg.toggle();
        t.fadeToggle();
    });
},

bun_alpha: (sel) => {
    let svg = SVG2.cache_run("s10/chem1/img/atomic.js", "bun", sel);
    svg.$.find("line, text").remove();
    let g = svg.group();
    for (let y of [-0.1, -0.5, -0.83, 0.1, 0.3, 0.65, 0.8]) {
        g.ray([-1.2, y], [1.2, y], null, 1);
    }
    g.$.find("*").css({stroke: "#0065fe", "stroke-width": "2px"});
    let t = g.$.find("polyline, line");
    svg.$.on("click", () => t.fadeToggle());
},

});
