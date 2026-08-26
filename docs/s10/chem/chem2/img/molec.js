scripts.cache["s10/chem/chem2/img/molec"] = {

Cl2: sel => {
    let svg = new SVG2(sel, {scale: 64, lrbt: [-1, 1, -0.5, 0.5]});
    let m = svg.molecule();
    m.atoms('Cl', [-0.5, 0], [0.5, 0])[0].css("red");
    m.dots(null, [-0.5, 0, "1222"], [0.5, 0, "2212"])[0].css("red");
    m.bonds([0, 0])[0].addClass("Toggle").$.hide();
    let c = m.circ.$.find("circle");
    for (let i of [0, 11]) $(c[i]).addClass("Toggle");
    svg.$.on("click", () => svg.$.find(".Toggle").fadeToggle());
    return svg;
},

HCl: sel => {
    let svg = scripts.cache["s10/chem/chem2/img/molec"].Cl2(sel);
    svg.$.find("text")[0].innerHTML = 'H';
    let c = svg.$.find("circle");
    for (let i=1;i<7;i++) $(c[i]).remove();
},

};
