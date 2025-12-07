SVG2.cache("p20/kin/img/bike.js", {

bike: (sel) => {
	let svg = new SVG2(sel, {scale: 32, lrbt: [-7, 10, -1.7, 4.2]});
    svg.$.prepend(`<filter id="gray"><feColorMatrix type="saturate" values="0.2"/></filter>`);
    svg.rect([20, 0.6], [1, 0.3]).css({fill: "#c4b6a6"});
    let bike = "p20/kin/img/bike.svg";
    svg.image("p20/kin/img/tree2.svg", [2, 4], [0, 2.4]);
    for (let x=-5;x<9;x+=3) {
        svg.image(bike, [2, 2], [x, 1.1]).then(b => {
            if (x < 6) b.attr({filter: "url(#gray)"});
        });
    }
    svg.label(0, [...range(-6, 9, 2)], -1);
    let font = ["mono", 18];
    svg.gtext("m",font, [8.7, -0.9, 0.5, 0]);
    svg.label(["-2", "-18"], [...range(-6, 9, 1)], 0);
    svg.group("arrow").arrow({tail: [-5, "-10"], tip: [7, "-10"]}, {tail: "8"});
    let g = svg.find("g.Labels");
    g.css(...font).ralign([0, -0.9, 0, 0], "y");
},

soccer: (sel) => {
	let svg = new SVG2(sel, {size: [512, 312], lrbt: [-5, 5, -3, 3], margin: 6});
    svg.rect([11, 7]).css({stroke: "none", fill: "#28a058"});
    for (let x=-4.5;x<5;x+=2)
        svg.rect([1, 6], [x, 0]).css({stroke: "none", fill: "#40b070"});
    let g = svg.group();
    g.rect([1.2, 3.5], [-4.4, 0]);
    g.rect([1.2, 3.5], [4.4, 0]);
    g.rect([10, 6]);
    g.line([0, -3], [0, 3]);
    g.circle(1.2);
    g.$.children().css({fill: "none", stroke: "white"});
    g.circle(0.04).css({fill: "white", stroke: "white"});
    g = svg.group("arrow");
    g.arrow({tail: [-4, -2], tip: [-1.5, 2]}, {tail: "8"});
    g.arrow({tip: [3, 0], tail: [-1.5, 2]}, {tail: "8"});
    let r = g.group("#0065fe").arrow({tail: [-4, -2], tip: [3, 0]}, {tail: "8"}).$;
    svg.$.on("click", () => {r.fadeToggle()});
},

});
