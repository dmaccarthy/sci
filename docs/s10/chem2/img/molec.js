SVG2.cache("s10/chem2/img/molec.js", {

Cl2: (sel) => {
    let svg = new SVG2(sel, {size: [200, 100], lrbt: [-3, 3], grid: 0}).css(".NoStyle");
    let text = ["symbol", "f36"];
    let t3 = (x) => $(x.$.find("circle")[3]).addClass("Toggle");
    let black = svg.group("black").shiftBy([1.5, 0]);
    t3(black.edot(7).config({theta: -90}));
    black.gtext("Cl", text);
    let red = svg.group("red").shiftBy([-1.5, 0]);
    t3(red.edot(7).config({theta: 90}));
    red.gtext("Cl", text);
    svg.line([-0.5, 0], [0.5, 0]).addClass("Toggle").css(SVG2.css("black2")).hide();
    svg.$.on("click", () => {svg.$.find(".Toggle").fadeToggle()});
},

HCl: (sel) => {
    let svg = new SVG2(sel, {size: [200, 100], lrbt: [-2, 3], grid: 0}).css(".NoStyle");
    let text = ["symbol", "f36"];
    let Cl = svg.group("black").shiftBy([1.5, 0]);
    $(Cl.edot(7).config({theta: -90}).$.find("circle")[3]).addClass("Toggle");
    Cl.gtext("Cl", text);
    let H = svg.group("red").shiftBy([-1.5, 0]);
    H.edot(1).config({theta: 180}).$.find("circle").addClass("Toggle");
    H.gtext("H", text);
    svg.line([-0.5, 0], [0.5, 0]).addClass("Toggle").css(SVG2.css("black2")).hide();
    svg.$.on("click", () => {svg.$.find(".Toggle").fadeToggle()});
},

});
