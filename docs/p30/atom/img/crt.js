SVG2.cache("p30/atom/img/crt.js", {

_crt: (sel) => {
    let svg = new SVG2(sel, {size: [512, 300], lrbt: [-1.1, 11], margin: [4, 4, 6, 0]});

    // Label cathode and anode
    let g = svg.group().css({stroke: "black"});
    g.line([0, 0.5], [-0.5, 1.3]);
    g.line([1, 0.5], [2, 1.3]);
    svg.delay(svg.group().addClass("Text"), {recenter: [-0.25, 1.6]}).text("Cathode");
    svg.delay(svg.group().addClass("Text"), {recenter: [2, 1.6]}).text("Anode");

    // Electron beam
    let beam = svg.group().css({fill: "none", stroke: "black", "stroke-dasharray": "2 6"});
    beam.line([0, 0], [6, 0]);
    beam.line([6, 0], [11, 0]).addClass("Toggle2").hide();
    beam.path([6, 0]).arc([6, -9], 59, 2).update().addClass("Toggle1");
    beam.path([6, 0]).arc([6, 9], -59, 0).update().addClass("Toggle3").hide();

    // Electrodes and wires
    let plates = svg.group().css({stroke: "none", fill: "brown"});
    let wires = svg.group().css({stroke: "brown", fill: "none"});
    plates.rect([0.1, 1.6]);
    plates.rect([0.1, 0.7], [1, 0.45]);
    plates.rect([0.1, 0.7], [1, -0.45]);
    let x = 8.4;
    plates.rect([2.5, 0.1], [x, 1]).addClass("Deflect");
    plates.rect([2.5, 0.1], [x, -1]).addClass("Deflect");
    wires.line([x, 3], [x, 1]).addClass("Deflect");
    wires.line([x, -3], [x, -1]).addClass("Deflect");
    wires.poly([[0, -0.6], [-0.6, -0.6], [-0.6, -2]]);
    wires.poly([[1, -0.6], [1.6, -0.6], [1.6, -2]]);

    // Label electrode wires
    g = svg.delay(svg.group().addClass("Text"), {css: {"font-size": "28px", "text-anchor": "middle", "dominant-baseline": "middle"}});
    g.text("+", [1.6, -2.4]);
    g.text("–", [-0.6, -2.4]);
    g.text("+", [x, -3.5]).addClass("Toggle0");
    g.text("–", [x, 3.3]).addClass("Toggle0");

    // Cathode ray tube
    let tube = svg.path([6, 1]).hor(0).arcTo([0, -1], 1).hor(6).arcTo([6, 1], 2.6, 1);
    tube.close().update().css({fill: "none", stroke: "black"});

    // Label magnetic field
    let mag = svg.group().config({shift: [x, -0.5]}).addClass("Toggle4");
    mag.$.hide();
    let [BD, SM_BD] = [1, 5];
    let arr = [0, "20"];
    mag.circle(0.3).css({fill: "none", stroke: "green"});
    mag.circle(0.05).css({fill: "green", stroke: "none"});
    let sym = mag.symbol(["B", BD], ["→", SM_BD, arr]).config({shift: [0.75, -0.2]}).$;
    sym.addClass("Large").find("text").css({fill: "green"});

    svg.addClass("NoStyle").css_map("text");
    return svg.finalize();
},

crt_no_field: (sel) => {
    let svg = SVG2.cache_run("p30/atom/img/crt.js", "_crt", sel);
    svg.$.find(".Toggle0, .Toggle1, .Toggle4, .Deflect").remove();
    svg.$.find(".Toggle2").show();
},

crt: (sel) => {
    let svg = SVG2.cache_run("p30/atom/img/crt.js", "_crt", sel);

    let t = clickCycle.toggle;
    clickCycle(svg.element, 0,
        () => {t(svg, false, 2, 3, 4); t(svg, true, 0, 1)},
        () => {t(svg, false, 1), t(svg, true, 2, 4)},
        () => {t(svg, false, 0, 2), t(svg, true, 3)},
    );
},

});