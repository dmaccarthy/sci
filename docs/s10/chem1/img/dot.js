const element_data = [
    ["H", "hydrogen", 6],
    ["He", "helium", 6],
    ["Li", "", 0],
    ["Be", "", 0],
    ["B", "", 8],
    ["C", "", 4],
    ["N", "", 6],
    ["O", "", 6],
    ["F", "", 6],
    ["Ne", "", 6],
    ["Na", "", 0],
    ["Mg", "", 0],
    ["Al", "", 0],
    ["Si", "", 8],
    ["P", "", 4],
    ["S", "", 4],
    ["Cl", "", 6],
    ["Ar", "", 6],
    ["K", "", 0],
    ["Ca", "", 0],
    ["Sc", "", 0],
    ["Ti", "", 0],
    ["V", "", 0],
    ["Cr", "", 0],
    ["Mn", "", 0],
    ["Fe", "", 0],
    ["Co", "", 0],
    ["Ni", "", 0],
    ["Cu", "", 0],
    ["Zn", "", 0],
    ["Ga", "", 0],
    ["Ge", "", 8],
    ["As", "", 8],
    ["Se", "", 4],
    ["Br", "", 5],
    ["Kr", "", 6],
    ["Rb", "", 0],
    ["Sr", "", 0],
    ["Y", "", 0],
    ["Zr", "", 0],
    ["Nb", "", 0],
    ["Mo", "", 0],
    ["Tc", "", 3],
    ["Ru", "", 0],
    ["Rh", "", 0],
    ["Pd", "", 0],
    ["Ag", "", 0],
    ["Cd", "", 0],
    ["In", "", 0],
    ["Sn", "", 0],
    ["Sb", "", 8],
    ["Te", "", 8],
    ["I", "", 4],
    ["Xe", "", 6],
    ["Cs", "", 0],
    ["Ba", "", 0],
    ["La", "", 0],
    ["Ce", "", 0],
    ["Pr", "", 0],
    ["Nd", "", 0],
    ["Pm", "", 3],
    ["Sm", "", 0],
    ["Eu", "", 0],
    ["Gd", "", 0],
    ["Tb", "", 0],
    ["Dy", "", 0],
    ["Ho", "", 0],
    ["Er", "", 0],
    ["Tm", "", 0],
    ["Yb", "", 0],
    ["Lu", "", 0],
    ["Hf", "", 0],
    ["Ta", "", 0],
    ["W", "", 0],
    ["Re", "", 0],
    ["Os", "", 0],
    ["Ir", "", 0],
    ["Pt", "", 0],
    ["Au", "", 0],
    ["Hg", "", 1],
    ["Tl", "", 0],
    ["Pb", "", 0],
    ["Bi", "", 0],
    ["Po", "", 0],
    ["At", "", 4],
    ["Rn", "radon", 6],
    ["Fr", "", 0],
    ["Ra", "", 0],
    ["Ac", "", 0],
    ["Th", "", 0],
    ["Pa", "", 0],
    ["U", "", 0],
    ["Np", "", 3],
    ["Pu", "", 3],
    ["Am", "", 3],
    ["Cm", "", 3],
    ["Bk", "", 3],
    ["Cf", "", 3],
    ["Es", "", 3],
    ["Fm", "", 3],
    ["Md", "", 3],
    ["No", "", 3],
    ["Lr", "", 3],
    ["Rf", "", 3],
    ["Db", "", 3],
    ["Sg", "", 3],
    ["Bh", "", 3],
    ["Hs", "", 3],
    ["Mt", "", 15],
    ["Ds", "", 15],
    ["Rg", "", 15],
    ["Cn", "", 3],
    ["Nh", "", 15],
    ["Fl", "", 15],
    ["Mc", "", 15],
    ["Lv", "", 15],
    ["Ts", "", 15],
    ["Og", "", 15],
];

/*
0 = solid, 1 = liq, 2 = gas, 3 = synth
0 = metal, 1 = non, 2 = metalloid, 3 = unknown
*/

SVG2.cache("s10/chem1/img/dot.js", {

pt: (sel) => {
    let svg = new SVG2(sel, {scale: [42, 48], lrbt: [-0.8, 18, -9.2, 0.7], grid: 0, margin: [2, 2, 2, 0]});
    let data = element_data;
    let elements = [];
    let r = 0, c = 0;
    let skip = {1: 16, 4: 10, 12: 10, 56: 36, 71: -50, 88: 36, 103: -50};
    let main = svg.group("sans", 15, SVG2.parse_anchor("", 1));
    for (let i=1;i<=data.length;i++) {
        let [sym, name, code] = data[i-1];
        let g = main.group();
        elements.push(g);
        let color = c > 1 && c < 12 & code < 12 ? "#b0b0ff" : ["#d0cfff", "yellow", "#a0ff9f", "lightgrey"][(code & 28) / 4];
        if ((i > 57 && i < 72) || (i > 89 && i <104)) color = "#e0afe0"
        css(g.rect([1, 1]), color);
        g.text(i, [-0.42, 0.45, "tl"]);
        g.text(sym, [0, -0.2, false]).css(24, ["black", "blue", "red", "salmon"][code & 3]);
        g.align([c++, r < -6 ? r - 0.2 : r, "tl"]);
        if (skip[i]) c += skip[i];
        while (c < 0) {c += 18; r++}
        while (c > 17) {c -= 18; r--}
    }
    css(svg.$.find("rect"), "black@1");
    let gr = svg.group("none", "black@1");
    let gt = svg.group("black", "none@", 15, SVG2.parse_anchor("", 1));
    for (r=-9;r<0;r++) {
        let pt = [-0.5, r + 0.5];
        if (r < -7) {
            pt[1] -= 0.2;
            gt.text(-r - 2, [...pt, false]);
        }
        else gt.text(-r, [...pt, false]);
        gr.rect(["24", 1], pt);
    }
    for (c=1;c<=18;c++) {
        let pt = [c - 0.5, 0.4];
        gt.text(c, [...pt, false]);
        gr.rect([1, 0.5], pt);
    }
    let stairs = [];
    c = 12; r = -1;
    while (c < 17) {
        stairs.push([c, r--]);
        stairs.push([c++, r]);
    }
    css(svg.poly(stairs), "none", "red@3");
}

});