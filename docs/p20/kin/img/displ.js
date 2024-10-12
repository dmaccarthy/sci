SVG2.cache("p20/kin/img/displ.js", {

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

});
