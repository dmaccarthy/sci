save("p20/kin/img/displ", {

Q1a: (sel) => {
    $(sel).attr({width: 400, height: 120, "data-aspect": "40/12"});
    let svg = applet.vecDiagram.diagram(sel,
        [[7.2, 0]], {shift: [-4, 0], omitAxes: 1}, 0.5, -5, -1.5,
    );
    let e = svg.items[0].element;
    svg.axis({y: [-1.5, 1.5]}, e);
    svg.axis({x: [-5, 5],
        ticks: {interval: 2, fixed: 0, omitZero: 1, length: "8", offset: [0, -0.4]},
    }, e);
    svg.final();
},

Q1b: (sel) => {
    $(sel).attr({width: 400, height: 120, "data-aspect": "40/12"});
    let svg = applet.vecDiagram.diagram(sel,
        [[0, -0.25], [7.2, 0], [0, 0.25], [-2.2, 0]],
        {shift: [-4, 0.25], omitAxes: 1, resultant: 1},
        0.5, -5, -1.5
    );
    e = svg.items[0].element;
    svg.axis({y: [-1.5, 1.5]}, e);
    svg.axis({x: [-5, 5],
        ticks: {interval: 2, fixed: 0, omitZero: 1, length: "8", offset: [0, -0.4]},
    }, e);
    e = svg.$.find("g:not(.Grid) polygon");
    $(e[0]).remove();
    $(e[2]).remove();
    svg.final();
},

Q2: (sel) => {
    $(sel).attr({width: 400, height: 120, "data-aspect": "40/12"});
    let svg = applet.vecDiagram.diagram(sel,
        [[5, 0], [0, 0.25], [-5, 0]],
        {omitAxes: 1}, 0.5, -2, -1.5);
    e = svg.items[0].element;
    svg.axis({y: [-1.5, 1.5]}, e);
    svg.axis({x: [-2, 8],
        ticks: {interval: 1, fixed: 0, omitZero: 1, length: "8", offset: [0, -0.4]},
    }, e);
    $(svg.$.find("g:not(.Grid) polygon")[1]).remove();
    svg.final();
},

Q3: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": 1});
    let svg = applet.vecDiagram.diagram(sel,
        [[0, 6], [5, 0]],
        {omitAxes: 1, resultant: 1}, 0.5, -3, -2,
    );
    e = svg.items[0].element;
    let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, -0.5]};
    svg.axis({x: [-3, 7], ticks: attr}, e);
    attr.offset = [-0.3, 0];
    svg.axis({y: [-2, 8], ticks: attr}, e);
    svg.final();
},

bike: (sel) => {
	let svg = new SVG2(sel, {size: [560, 210], lrbt: [-7, 10, -1.5]});
    svg.$.addClass("SVG2").html(`<filter id="gray"><feColorMatrix type="saturate" values="0.2"/></filter>`);
    svg.rect([20, 0.6], [1, 0.3]).css({fill: "#c4b6a6"});
    let bike = "p20/kin/img/bike.svg";
    svg.image("p20/kin/img/tree2.svg", [2, 4], [0, 2.4]);
    for (let x=-5;x<9;x+=3) {
        let b = svg.image(bike, [2, 2], [x, 1.1]);
        if (x < 6) b.attr({filter: "url(#gray)"});
    }
    svg.label(0, [...range(-6, 9, 2)], -1.25);
    svg.text("m", [8.7, -1.25]);
    svg.label(["-2", "-18"], [...range(-6, 9, 1)], 0);
    svg.arrow({tail: [-5, "-10"], tip: [7, "-10"]}, {tail: "8"});
    svg.$.find("text").addClass("Mono");
},

soccer: (sel) => {
	let svg = new SVG2(sel, {size: [512, 312], lrbt: [-5, 5, -3, 3], margin: 6});
    svg.$.addClass("SVG2");
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
    svg.arrow({tail: [-4, -2], tip: [-1.5, 2]}, {tail: "8"});
    svg.arrow({tip: [3, 0], tail: [-1.5, 2]}, {tail: "8"});
    let r = svg.arrow({tail: [-4, -2], tip: [3, 0]}, {tail: "8"}).$.addClass("Resultant");
    svg.$.on("click", () => {r.fadeToggle()});
},

});
