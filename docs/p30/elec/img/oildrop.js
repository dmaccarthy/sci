SVG2.cache("p30/elec/img/oildrop.js", {

distr: (sel) => {
    $(sel).addClass("Graph").attr({width: 512, height: 160, "data-aspect": "512/160"});
    let svg = applet.graph(sel, {
        grid: [[0, 20, 2], [0, 2, 2], 1],
        margin: [0.05, 0.05, 0.65, 0.07],
        x: ["Charge / 10^-19 C", [">", "-48"], {interval: 2, length: "8", fixed: 0, offset: [0, "-24"]}],
    });
    let g = svg.$.find("g.Grid")[0].graphic;
    svg.line([0, 0], [0, 2], g);
    svg.$.find(".TitleX, .TitleY").addClass("End");
    // svg.final();

    let makeData = () => {
        let err = makeData.err;
        makeData.err = err == 0 ? 30 : (err == 30 ? 4 : 0);
        err /= 100;
        let x = [];
        for (let i=0;i<50;i++) {
            let q = 1.6 * (1 + randint(12));
            x.push(q * (1 - err / 2 + err * Math.random()))
        }
        let y = [];
        for (let i=0;i<50;i++) y.push(2 * Math.random());
        svg.$.find("g.Plot").remove();
        svg.plot({x:x, y:y}, "6");
        svg.final();
    }

    makeData.err = 5;
    makeData();

    svg.$.on("click", makeData);
},

});