SVG2.cache("p30/photon/img/pe.js", {

metal: (sel) => {
    let svg = new SVG2(sel, {size: [640, 480], lrbt: [0, 10, 0, 3.2], grid: [1, 0.4], margin: [72, 10, 64, 10]});

    // Tick marks and labels
    let opt = {default: true};
    svg.ticks({x: [0, 10.1, 1], ...opt});
    svg.ticks({y: [0, 3.3, 0.4], ...opt, label: 1});
    svg.mjax("\\rm Frequency\\ /\\ (10^{14}\\ Hz)", {scale: 0.7}, [5, -0.35]);
    svg.mjax("\\rm Stopping Voltage\\ /\\ V", {scale: 0.7}, [-1, 1.6], null, 90);

    // Data

    let metals = [[0.5, 4.5], [0.414, 3], [0.35, 5]];

    // let scatter = x => x + 0.03 * uniform(-1, 1);
    // let x = [];
    // let y = [];
    // for (let [h, f0] of metals) {
    //     let xi = [...fn_eval(() => round(uniform(f0, 10), 2), range(0, 12 - f0))]
    //     let yi = [...fn_eval(f => round(scatter(h*(f-f0)), 2), xi)];
    //     x.push(xi);
    //     y.push(yi);
    // }
    // console.log(x);
    // console.log(y);

    let x = [
        [5.99, 9.76, 8.41, 5.55, 4.69, 5.22, 7.5, 9.49],
        [9.64, 8.83, 5.19, 9.29, 7.99, 4.37, 6.96, 8.67, 6.28],
        [5.86, 7.12, 9.61, 9.81, 6.78, 7.45, 9.08]
    ];
    let y = [
        [0.74, 2.65, 1.93, 0.53, 0.08, 0.38, 1.47, 2.48],
        [2.75, 2.42, 0.94, 2.63, 2.07, 0.55, 1.66, 2.33, 1.38],
        [0.31, 0.72, 1.6, 1.68, 0.61, 0.84, 1.43]
    ];

    let color = [["red", "6"], ["#0065fe", ["10", "10"]], ["grey", ["10", "10"]]];
    for (let i=0;i<3;i++) {
        let c = color[i];
        let [h, f0] = metals[i];
        css(svg.line([f0, 0], [10, h * (10 - f0)]), c[0] + "@1");
        css(svg.plot({x: x[i], y: y[i]}, c[1], null, i == 1 ? 45 : 0), c[0]);
    }

    let g = svg.group().shift_by([3, 2.4]);
    css(g.rect([2.5, 1]), "white", "black@2");
    let t = g.group("black", "sans", 18);
    let m = g.group("black@1");
    t.text("Metal A", [-0.4, 0.3, "l"]);
    t.text("Metal B", [-0.4, 0, "l"]);
    t.text("Metal C", [-0.4, -0.3, "l"]);
    css(m.circle("6", [-0.8, 0]), color[0][0]);
    css(m.rect(["10", "10"], [-0.8, -0.3]), color[2][0]);
    m.group(color[1][0]).config({theta: 45, shift: [-0.8, 0.3]}).rect(["10", "10"]);
},


});
