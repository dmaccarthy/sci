SVG2.cache("p30/elec/img/oildrop.js", {

distr: (sel) => {
    let svg = new SVG2(sel, {size: [512, 160], lrbt: [0, 20, 0, 2], grid: 2, margin: [8, 16, 60, 8]});
    svg.css(".NoStyle", "text");
    svg.tick_label(0, [...range(0, 21, 2)], 0, "-6", "-20");
    $(svg.$.find("g.Grid line.Axis")[0]).removeClass("Axis");

    let txt = svg.group().addClass("Text");
    // txt.text("Charge / 10^-19 C", [10, "-44"]);
    txt.text("Charge / 10");
    txt.text("–19", ["62", "12"]).addClass("Small");
    txt.text("C", ["84", 0]);
    txt.align([10, "-44"]);

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