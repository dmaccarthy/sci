scripts.cache["cs/oop/img/oop"] = {

dateobj: (sel) => {
    let svg = new SVG2(sel, {scale: 64, lrbt: [-3, 3, -1, 1], grid: 1});
    let g = svg.group("black@1", "white");
    box(g, 1.6, 1, 0.2, "lightgrey", "grey").shift_by([-2, 0]);
    box(g, 1.6, 1, 0.2, "lightgrey", "grey");
    box(g, 1.6, 1, 0.2, "lightgrey", "grey").shift_by([2, 0]);
    g = svg.group("black@1", "none");
    box(g, 6.4, 1.6, 0.4, "lightgrey", "grey");
},

};

function box(g, w, h, d, top, right) {
    g = g.group();
    let size = new RArray(w, h);
    css(g.path([-w/2, h/2]).lines([d, d], [w, 0], [-d, -d], [-w, 0]).update(), top);
    css(g.path([w/2, h/2]).lines([d, d], [0, -h], [-d, -d], [0, h]).update(), right);
    g.rect(size);
    return g;
}
