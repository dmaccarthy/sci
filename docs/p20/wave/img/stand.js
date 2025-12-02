SVG2.cache("p20/wave/img/stand.js", {

stand: (sel, n, closed) => {
    if (!n) n = 1;
    let c = closed ? 2 : 1;
    let svg = new SVG2(sel, {size: [480, 240], lrbt: [0, 1, -1, 1], margin: [5, 5, 2, 2]});
    css(svg.line([0, 0], [1, 0]), "black@2");
    let wave = svg.locus((x, t) => Math.cos(t * n / 2) * Math.sin(pi / c * x * n), [0, 1]).css("#0065fe@3");

    //  Nodes and anti-nodes
    let g = svg.group("black@1", "#0065fe");
    let dx = c / n;
    let x = closed && n == 1 ? new RArray([0]) : new RArray(...range(0, 1 + dx / 2, dx));
    g.plot({x: x, y: 0}, "4");
    x = n == 1 ? new RArray([closed ? 1 : 0.5]) : new RArray(...range(dx/2, 1 + dx/2, dx));
    g.plot({x: x, y: 0}, "4").css("red");        

    svg.animate(wave).$.on("click", () => svg.toggle());
},

});
