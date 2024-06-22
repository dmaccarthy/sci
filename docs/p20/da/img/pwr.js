save("p20/da/img/pwr", {

lightbulb: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 3, 0.25], [0, 2, 0.25], 1],
        margin: [0.2, 0.03, 0.24, 0.05],
        x: ["Separation / m", [">", "-48"], {interval: 0.5, length: "8", fixed: 1, offset: [0, "-24"]}],
        y: ["Intensity / (W/m &nbsp; )", ["-54", ">"], {interval: 0.5, length: "8", fixed: 1, offset: ["-12", 0]}],
    });
    svg.text("2", [-0.44, 1.91]).config({theta: 90}).addClass("Sup");
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let x = [...range(0.75, 3.01, 0.25)];
    let y = [1.6, 0.846, 0.585, 0.395, 0.28, 0.217, 0.17, 0.134, 0.111, 0.098];
    let reg = pwrRegXY(x, y);
    svg.locus(reg.fn, [Math.exp(log(2/reg.a)/reg.n), 3]).$.hide();
    svg.plot({x:x, y:y}, "6");
    svg.final();

    svg.$.on("click", (ev) => {
        $(ev.currentTarget).children("polyline").fadeToggle();
    });
},

linear: (sel) => {
    let svg = applet.graph(sel, {
        grid: [[0, 2, 0.25], [0, 2, 0.25], 1],
        margin: [0.2, 0.03, 0.24, 0.05],
        x: ["Separation &nbsp; &nbsp; /&nbsp;m", [1.9, "-48"], {interval: 0.5, length: "8", fixed: 1, offset: [0, "-24"]}],
        y: ["Intensity / (W/m &nbsp; )", ["-54", ">"], {interval: 0.5, length: "8", fixed: 1, offset: ["-12", 0]}],
    });
    svg.text("2", [-0.3, 1.91]).config({theta: 90}).addClass("Sup");
    svg.text("–2", [1.68, -0.3]).addClass("Sup");
    svg.text("–2", [1.95, -0.3]).addClass("Sup");
    svg.$.find(".TitleX, .TitleY").addClass("End");
    let x = [...range(0.75, 3.01, 0.25)];
    for (let i=0;i<x.length;i++) x[i] = Math.pow(x[i], -2);
    let y = [1.6, 0.846, 0.585, 0.395, 0.28, 0.217, 0.17, 0.134, 0.111, 0.098];
    let reg = linRegXY(x, y);
    svg.line([0, reg.b], [2, reg.b + 2 * reg.m]).$.hide();
    svg.plot({x:x, y:y}, "6");
    svg.final();

    svg.$.on("click", (ev) => {
        $(ev.currentTarget).children("line").fadeToggle();
    });
},
    
});