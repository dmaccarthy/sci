SVG2.cache("s10/chem1/img/classify.js", {

chart: (sel) => {
    let svg = new SVG2(sel, {size: [640, 240], lrbt: [-0.5, 3.5, -0.25]});
    let g = svg.group("none", "black@1");
    let t = svg.group("text", 17);
    let labels = ["Element", "Compound", "Homogeneous", "Heterogeneous", "Pure Substance", "Mixture", "Matter"];
    let h = 0.26;
    for (let i=0;i<labels.length;i++) {
        let [x, y, w] = [i, 0, 0.85];
        if (i > 5) [x, y, w] = [1.5, 1, 3.85];
        else if (i > 3) [x, y, w] = [2 * i - 7.5, 0.5, 1.85];
        if (i < 6) g.line([x, y + 0.5 - h / 2], [x, y + h / 2]);
        g.rect([w, h], [x, y]);
        t.text1(labels[i], [x, y - 0.015]);      
    }
},

});
