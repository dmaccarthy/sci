scripts.cache["cs/cs10/web/img/form"] = {

lib: (sel) => {
    let fill = "#444444";
    let stroke = fill + "@2";

    // Draw text
    let svg = new SVG2(sel, {scale: 54, margin: 2, lrbt: [-5, 5, -0.6, 5]});
    svg.text("Library Catalogue Search", [0, 4], 0, ["serif", 36, "bold"]);
    let g = svg.group("sans", 15);
    g.text("Search For:", [-2.8, 3, "r"]);
    g.text("Search In:", [-2.8, 2, "r"]);
    g.text("Title", [-2, 2, "l"]);
    g.text("Subject", [-0.6, 2, "l"]);
    g.text("Author", [1.15, 2, "l"]);
    g.text("Keywords", [2.85, 2, "l"]);
    g.text("Media Type:", [-2.5, 1, "r"]);
    g.text("Print", [-1.7, 1, "l"]);
    g.text("DVD/CD", [0.1, 1, "l"]);
    g.text("Internet", [2.3, 1, "l"]);

    // Draw boxes with shadow effect

    let shadow = (g, w, h, c) => {
        g = g.group();
        w /= 2; h /= 2;
        g.poly([[w, h], [w, -h], [-w, -h]], 0);
        css(g.poly([[-w, -h], [-w, h], [w, h]], 0), stroke);
        if (c) {
            w *= 0.7; h *= 0.7;
            css(g.poly([[-w, 0], [-w/5, -h], [w, h]], 0), "black@3");
        }
        return g;
    }

    g = svg.group("none", "grey@1");
    shadow(g, 6.7, 0.45).shift_by([0.8, 3]);
    shadow(g, 0.25, 0.25, 1).shift_by([-2.25, 2]);
    shadow(g, 0.25, 0.25).shift_by([-0.85, 2]);
    shadow(g, 0.25, 0.25).shift_by([0.9, 2]);
    shadow(g, 0.25, 0.25).shift_by([2.6, 2]);

    // Draw search button
    css(svg.rect([1.6, 0.6]), "none@", "lightgrey");
    shadow(g, 1.6, 0.6).config({theta: 180});
    svg.text("Search");

    // Draw radio buttons

    let circle = (g, r, c) => {
        g = g.group();
        g.path(vec2d(r, 225)).arc_to(vec2d(r, 45), r).update();
        css(g.path(vec2d(r, 45)).arc_to(vec2d(r, 225), r).update(), stroke);
        if (c) {
            css(g.circle(r/2), "none@", fill);
        }
        return g;
    }

    circle(g, 0.125).shift_by([-1.95, 1]);
    circle(g, 0.125).shift_by([-0.15, 1]);
    circle(g, 0.125, 1).shift_by([2.05, 1]);

    // Draw border
    css(svg.rect([10, 5.6], [0, 2.2]), "none", "black@2");
},

};
