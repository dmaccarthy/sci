SVG2.cache("p30/elec/img/volt.js", {

c_ray: (sel) => {
    let svg = new SVG2(sel, {scale: 16, grid: 0, lrbt: [-10, 10, -7, 7]});
    let g = svg.group("lightgrey", "black@1");
    let r = new RArray(1.3, 4);
    g.ellipse(r, [-5, 0]);
    g.ellipse(r, [-3, 0]);
    css(g.ellipse(r.times(0.2), [-3, 0]), "white");
    g = svg.group("#0065fe", "black@1");
    for (let x=-5; x<8; x+=1) if (x != -4) g.circle("3", [x, 0]);
    g = svg.group("sans", 18);
    g.text("Cathode (–)", [-6, -6]);
    g.text("Anode (+)", [-1, 6]);
    g.text("Electron Beam", [5, -3]);
    g.text("(Cathode Ray)", [5, -4.5]);
    g = svg.group("black@1");
    g.line([-6, -5], [-5, -3]);
    g.line([-1, 5], [-3, 3]);
    g.line([5, -2], [6, 0]);
},

});