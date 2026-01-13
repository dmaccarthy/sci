SVG2.cache("s10/bio3/img/_exam.js", {

fov: (sel) => {
    let svg = new SVG2(sel, {scale: 32, lrbt: [-5, 5, -5, 5], margin: 2, grid: 0});
    let g = svg.group("none", "black@1");
    css(g.circle(5), "@2");
    css(g.rect([10/3, 2], [-3, 0.5]), "lightgrey");
    css(g.rect([1.8, 1.2], [-2.5, 0.7]), "white");
    css(g.circle("10", [-4.1, 0]), "#606060");
    let pos = [-4.1, 1];
    svg.group("green", "black@1").config({theta: 20, pivot: pos}).ellipse(["4", "8"], pos);
},

eugl: (sel) => {
    let r = 8;
    let svg = new SVG2(sel, {scale: 24, lrbt: [-r, r, -r, r], margin: 2, grid: 0});
    let g = svg.group("none", "none@1");
    css(g.circle(r), "black@2");
    g = svg.group("grey", "grey@1").config({shift: [3, 4]});
    g.cylinder([0.8, "7"], 2.5);
    css(g.locus(y => [y*y/5, y], [0, 1.5]), "none", "grey@2");
},

photo: (sel) => {
    let svg = new SVG2(sel, {size: [512, 360], lrbt: [-1, 10, -1, 6], grid: 12});
    let g = svg.group("sans", 16);
    g.text("Carbon Dioxide Concentration", [5, -0.45, "b"]);
    g.text("Rate of Photosynthesis", [-0.25, 3, "b"], 90);
    g = g.group("#0065fe");
    g.text("High Light Intensity", [8, 5.5]);
    g.text("Low Light Intensity", [8, 3.7]);
    g = svg.group("none", "#0065fe@2");
    g.locus(x => x * (9/8 - x / 16), [0, 10]);
    g.locus(x => x * (23/20 - 3 * x / 40), [0, 10]);
},

tubing: (sel) => {
    let svg = new SVG2(sel, {scale: 40, lrbt: [-3.1, 3.1, -0.1, 7.1], grid: 0});
    let dot = svg.group("none@", "black");
    let g = svg.group("none", "black@2");
    let f = x => 5.5 + x * x / 18
    g.locus(f, [-3, 3]);
    for (let i=0;i<200;i++) {
        let x = uniform(-3, 3);
        let y = uniform(0, f(x));
        dot.circle("2", [x, y]);
    }
    css(g.ellipse([1, 1.5], [0, 2.5]), "white");
    css(g.poly([[-3, 7], [-3, 0], [3, 0], [3, 7]]), "@4");
    dot = svg.group("none@", "black");
    for (let i=0;i<12;i++) {
        let r = 0.96 * Math.random();
        let a = uniform(0, 360);
        dot.circle("4", [r * cos(a), 2.5 + 1.5 * r * sin(a)]);
    }
    console.log(svg);
},

});