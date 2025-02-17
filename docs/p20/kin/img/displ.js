SVG2.cache("p20/kin/img/displ.js", {

Q1a: (sel) => {
    let svg = SVG2.vec_diag(sel, [[7.2, 0]], {shift: [-4, 0],
        lrbt: [-5, 5, -1, 1], scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, 0, "-20"]});
    svg.$.find(".Component, .LabelY, .TickY").remove();
    svg.text("km", [4.5, -0.85]).css({"font-size": "18px"});
},

Q1b: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, -0.25], [7.2, 0], [0, 0.25], [-2.2, 0]], {shift: [-4, 0.25],
        lrbt: [-5, 5, -1, 1], scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, 0, "-20"]});
    svg.$.find(".Component, .LabelY, .TickY").remove();
    let g = svg.$.find("g.Arrow");
    $([g[0], g[2]]).remove();
    svg.text("km", [4.5, -0.85]).css({"font-size": "18px"});
},

Q2: (sel) => {
    let svg = SVG2.vec_diag(sel, [[5, 0], [0, 0.25], [-5, 0], [0, -0.25]], {lrbt: [-2, 7, -1, 1],
        scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, 0, "-20"]});
    svg.$.find(".Component, .Resultant, .LabelY, .TickY").remove();
    let g = svg.$.find("g.Arrow");
    $([g[1], g[3]]).remove();
    svg.text("km", [6.5, -0.85]).css({"font-size": "18px"});
},

Q3: (sel) => {
    let svg = SVG2.vec_diag(sel, [[0, 6], [5, 0]], {lrbt: [-2, 6, -1, 7],
        scale: 50, margin: 8, grid: 0.5, tick: "-8", label: [1, 0, "-12", "-20"]});
    svg.$.find(".Component").remove();
    svg.text("km", [5.5, -0.85]).css({"font-size": "18px"});
},

});
