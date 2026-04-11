SVG2.cache("cs_new/web1/img/tree.js", {

nhl: (sel) => {
    let svg = new SVG2(sel, {scale: 180, lrbt: [-0.5, 3.5, -0.3, 3.3]});

    // Draw arrows
    let g = svg.group("black@1", "black");
    for (let a of [
        [[2, 2.75], [2, 2.5], [1, 2.5], [1, 2.25]],
        [[2, 2.5], [3, 2.5], [3, 2.25]],
        [[1, 1.75], [1, 1.5], [0.5, 1.5], [0.5, 1.25]],
        [[1, 1.5], [1.5, 1.5], [1.5, 1.25]],
        [[0.5, 0.75], [0.5, 0.5], [0, 0.5], [0, 0.25]],
        [[0.5, 0.5], [1, 0.5], [1, 0.25]],
    ]) g.poly_arrow(0.09, 0, ...a);

    // Draw nodes
    let node = svg.group("sans", 14).make_node();
    node("Team", 'city = "Edmonton"\\nname = "Oilers"');
    node("Team", 'city = "Vancouver"\\nname = "Canucks"').shift_by([1, 0]);
    node("Division", 'name = "Pacific"').shift_by([0.5, 1]);
    node("Division", 'name = "Central"').shift_by([1.5, 1]);
    node("Conference", 'name = "Western"').shift_by([1, 2]);
    node("Conference", 'name = "Eastern"').shift_by([3, 2]);
    node("League", 'sport = "Ice Hockey"\\nname = "NHL"').shift_by([2, 3]);
},

canada: (sel) => {
    let svg = new SVG2(sel, {scale: 180, lrbt: [-1.5, 1.5, -1.3, 2.3]});

    // Draw arrows
    let g = svg.group("black@1", "black");
    for (let a of [
        [[0.25, 1.75], [0.25, 1.5], [-0.5, 1.5], [-0.5, 1.25]],
        [[0.25, 1.5], [1, 1.5], [1, 1.25]],
        [[1, 0.75], [1, 0.25]],
        [[-0.5, 0.75], [-0.5, 0.5], [-1, 0.5], [-1, 0.25]],
        [[-0.5, 0.5], [0, 0.5], [0, 0.25]],
        [[0, -0.25], [0, -0.5], [-0.5, -0.5], [-0.5, -0.75]],
        [[0, -0.5], [0.5, -0.5], [0.5, -0.75]],
    ]) g.poly_arrow(0.09, 0, ...a);

    // Draw nodes
    let node = svg.group("sans", 14).make_node({shape: [0.85, 0.5]});
    node("Country", 'name = "Canada"\\ncapital = "Ottawa"').shift_by([0.25, 2]);
    node("Province", 'name = "Alberta"\\ncapital = "Edmonton"').shift_by([-0.5, 1]);
    node("Province", 'name = "Ontario"\\ncapital = "Toronto"').shift_by([1, 1]);
    node("Municipality", 'type = "County"\\nname = "Strathcona"');
    node("Municipality", 'type = "City"\\nname = "Edmonton"').shift_by([-1, 0]);
    node("Municipality", 'type = "Town"\\nname = "Grimsby"').shift_by([1, 0]);
    node("Community", 'name =\\n"Sherwood Heights"').shift_by([-0.5, -1]);
    node("Community", 'name =\\n"Lakeland Ridge"').shift_by([0.5, -1]);
},

});