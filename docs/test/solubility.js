svgDraw((sel) => {

    // Set up graph...
    $(sel).attr({width: 480, height: 360, "data-aspect": "4/3"});
    let svg = applet.graph(sel, {
        grid: [[0, 80, 2], [0, 700, 20], true],
        margin: [0.15, 0.03, 0.18, 0.04],
        x: ["Temperature / °C", ["^", "-44"], {interval: 10, offset: [0, "-22"], omitZero: 0, fixed: 0, length: "8"}],
        y: ["Solubility / (g/L)", ["-50", "^"], {interval: 100, offset: ["-12", 0], fixed: 0, length: "8"}],  
        // styleSel: "#Graph", style: false,
    });
    svg.title = "Solubility";

    // Data...
    let T = [...range(10, 71, 10)];
    let NaCl = [370, 373, 378, 380, 382, 387, 390];
    let KClO3 = [50, 70, 110, 150, 210, 270, 340];
    let NH4Cl = [320, 370, 410, 460, 500, 550, 600];

    // Plot curves...
    let eq = linRegXY(T, NaCl).fn;
    svg.line([0, eq(0)], [80, eq(80)]).addClass("Medium").css({stroke: "green"});
    svg.locus(quadRegXY(T, KClO3).fn, [0, 80]).addClass("Medium").css({stroke: "red"});
    eq = linRegXY(T, NH4Cl).fn;
    svg.line([0, eq(0)], [80, eq(80)]).addClass("Medium").css({stroke: "#0065FE"});

    // Plot data points...
    svg.plot({x:T, y:NaCl}, {radius: "4", css: {fill: "green"}});
    svg.plot({x:T, y:KClO3}, {rect: "7", css: {fill: "red"}});
    svg.plot({x:T, y:NH4Cl}, {rect: "7", config: {theta: 45}});

    // Legend...
    let g = svg.group().addClass("Legend");
    svg.text("NaCl", [5, 400], g).css({fill: "green"});
    svg.text("KClO<tspan class='Small' dy='7'>3</tspan>", [60, 200], g).css({fill: "red"});
    svg.text("NH<tspan dy='7' class='Small'>4</tspan><tspan dy='-7'>Cl</tspan>", [52, 585], g).css({fill: "#0065FE"});


    let circ = svg.mpl("25", [10, 100], [20, 0]).anchor(40, 0).config({omega: 10});
    
    // Custom styles...
    svg.$.find("style").append(`#Graph text {font-size: 14px}
tspan.Small {font-size:75%}
g.Legend text {text-anchor: start; font-family: serif}`);

    return svg.play();
});
