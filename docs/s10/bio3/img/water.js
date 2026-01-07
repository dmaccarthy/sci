SVG2.cache("s10/bio3/img/water.js", {

tree: (sel) => {
    let svg = new SVG2(sel, {size: [361, 481]});
    svg.image("https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/October_2020_tree_in_Maryland.jpg/360px-October_2020_tree_in_Maryland.jpg", [360, 480], [180, 240]);
    let t = {tail: 12};
    let g = svg.group("red", "black@1");
    g.arrow({tail: [340, 440], tip: [220, 420]}, t);
    g.arrow({tail: [175, 370], tip: [175, 190]}, t);
    g.arrow({tail: [215, 90], tip: [330, 25]}, t);
},

});