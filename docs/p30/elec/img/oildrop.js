SVG2.cache("p30/elec/img/oildrop.js", {

distr: (sel) => {
    let svg = new SVG2(sel, {size: [512, 160], lrbt: [0, 20, 0, 2], grid: 2, margin: [8, 16, 60, 8]});
    svg.ticks({x: [0, 21, 2], size: ["-6", 0], label: 0, css: ["mono", 15], shift: "-8"});
    svg.mjax("\\rm Charge / (10^{-19}\\ C)", {scale: 0.7}, [10, "-44"]);

    let makeData = () => {
        let err = makeData.err;
        makeData.err = err == 0 ? 30 : (err == 30 ? 4 : 0);
        err /= 100;
        let x = [];
        for (let i=0;i<50;i++) {
            let q = 1.6 * (1 + randint(11));
            x.push(q * (1 - err / 2 + err * Math.random()))
        }
        let y = [];
        for (let i=0;i<50;i++) y.push(2 * Math.random());
        svg.$.find("g.Plot").remove();
        svg.group().addClass("Plot").plot({x:x, y:y}, "6");
    }

    makeData.err = 5;
    makeData();
    svg.$.on("click", makeData);
},

});