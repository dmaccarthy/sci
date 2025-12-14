SVG2.cache("p30/mom/img/coll2d.js", {

Ex1: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 27], [-24, 0]], {lrbt: [-26, 6, -4, 34], scale: 12,
        margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    let g = svg.$.find("g.TipToTail2D > g.Arrow");
    for (let i=0;i<2;i++) $(g[i+1]).addClass(`Toggle${i}`);
    svg.gtext("kN·s", ["sans", 15], [-24, 2]);

    let s = {scale: 1.1};
    svg.mjax("\\vec{\\bf p}_{iA}", s, [4, 14], "red");
    svg.group(".Toggle0").mjax("\\vec{\\bf p}_{iB}", s, [-11, 30], "red");
    svg.group(".Toggle1").group(".Resultant").mjax("\\Sigma\\vec{\\bf p}", s, [-15, 12], "#0065fe");
    svg.click_toggle(2);
},

Ex2: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 27], vec2d(24, 210)], {lrbt: [-26, 6, -4, 34], scale: 12,
        margin: 8, grid: 2, tick: "-8", label: [4, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    let g = svg.$.find("g.TipToTail2D > g.Arrow");
    for (let i=0;i<2;i++) $(g[i+1]).addClass(`Toggle${i}`);
    svg.gtext("kN·s", ["sans", 15], [-24, 2]);

    let s = {scale: 1.1};
    svg.mjax("\\vec{\\bf p}_{iA}", s, [4, 14], "red");
    svg.group(".Toggle0").mjax("\\vec{\\bf p}_{iB}", s, [-12, 24], "red");
    svg.group(".Toggle1").group(".Resultant").mjax("\\Sigma\\vec{\\bf p}", s, [-12, 5], "#0065fe");
    svg.click_toggle(2);
},

Ex3: (sel) => {
    let [pa, pb] = vec2d(0.425, 35);
    let svg = SVG2.vec_diag(sel, [vec2d(pa, 35), vec2d(pb, -55)], {lrbt: [-0.05, 0.45, -0.1, 0.25], scale: 800,
        margin: 8, grid: 0.025, tick: "-8", label: [0.1, 1, "-12", "-20"]});
    svg.$.find(".Component").remove();
    let g = svg.$.find("g.TipToTail2D > g.Arrow");
    for (let i=0;i<2;i++) $(g[i]).addClass(`Toggle${i}`);
    svg.gtext("N·s", ["sans", 15], [0.025, 0.2]);

    let s = {scale: 1.1};
    svg.group(".Toggle0").mjax("\\vec{\\bf p}_{iA}", s, [0.1, 0.125], "red");
    svg.group(".Toggle1").mjax("\\vec{\\bf p}_{iB}", s, [0.38, 0.15], "red");
    svg.mjax("\\Sigma\\vec{\\bf p}", s, [0.23, -0.06], "#0065fe");
    svg.click_toggle(2);

}

});
