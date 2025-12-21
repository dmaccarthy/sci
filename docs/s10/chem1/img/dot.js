const element_data = [/* 0 = solid, 1 = liquid, 2 = gas, 3 = synth / 4 * (0 = metal, 1 = non, 2 = metalloid, 3 = unknown) */
    ["H", 6, "hydrogen"], ["He", 6, "helium"],
    ["Li"], ["Be"], ["B", 8], ["C", 4], ["N", 6], ["O", 6], ["F", 6], ["Ne", 6],
    ["Na"], ["Mg"], ["Al"], ["Si", 8], ["P", 4], ["S", 4], ["Cl", 6], ["Ar", 6],
    ["K"], ["Ca"], ["Sc"], ["Ti"], ["V"], ["Cr"], ["Mn"], ["Fe"], ["Co"], ["Ni"], ["Cu"], ["Zn"], ["Ga"], ["Ge", 8], ["As", 8], ["Se", 4], ["Br", 5], ["Kr", 6],
    ["Rb"], ["Sr"], ["Y"], ["Zr"], ["Nb"], ["Mo"], ["Tc", 3], ["Ru"], ["Rh"], ["Pd"], ["Ag"], ["Cd"], ["In"], ["Sn"], ["Sb", 8], ["Te", 8], ["I", 4], ["Xe", 6],
    ["Cs"], ["Ba"],
    ["La"], ["Ce"], ["Pr"], ["Nd"], ["Pm", 3], ["Sm"], ["Eu"], ["Gd"], ["Tb"], ["Dy"], ["Ho"], ["Er"], ["Tm"], ["Yb"], ["Lu"],
    ["Hf"], ["Ta"], ["W"], ["Re"], ["Os"], ["Ir"], ["Pt"], ["Au"], ["Hg", 1], ["Tl"], ["Pb"], ["Bi"], ["Po"], ["At", 4], ["Rn", 6, "radon"],
    ["Fr"], ["Ra"],
    ["Ac"], ["Th"], ["Pa"], ["U"], ["Np"], ["Pu"], ["Am"], ["Cm"], ["Bk"], ["Cf"], ["Es"], ["Fm"], ["Md"], ["No"], ["Lr"],
    ["Rf"], ["Db"], ["Sg"], ["Bh"], ["Hs"], ["Mt"], ["Ds"], ["Rg"],  ["Cn", 3], ["Nh"], ["Fl"], ["Mc"], ["Lv"], ["Ts"], ["Og"],
];

SVG2.cache("s10/chem1/img/dot.js", {

pt: (sel, diatomic) => {
    let centred = SVG2.parse_anchor("", 1)
    let svg = new SVG2(sel, {scale: [42, 48], lrbt: [-0.8, 18, -9.2, 0.7], grid: 0, margin: [2, 2, 2, 0]});
    let data = element_data;
    let elements = [];
    let r = 0, c = 0;
    let skip = {1: 16, 4: 10, 12: 10, 56: 36, 71: -50, 88: 36, 103: -50};
    let main = svg.group("sans", 15, centred, "none@");
    for (let i=1;i<=data.length;i++) {
        let [sym, code] = data[i-1];
        if (!code) code = i < 92 ? 0 : (i < 109 ? 3 : 15);
        let g = main.group();
        elements.push(g);
        let color = c > 1 && c < 12 & code < 12 ? "#b0b0ff" : ["#d0cfff", "yellow", "#a0ff9f", "lightgrey"][(code & 28) / 4];
        if (diatomic) {
            color = [15, 16, 1, 7, 8, 9, 17, 35, 53, 85].indexOf(i);
            color = color == -1 ? "white" : (color < 2 ? "#d0cfff" : "yellow");
        }
        else if ((i > 57 && i < 72) || (i > 89 && i <104)) color = "#e0afe0"
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
    let gt = main.group("black");
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
    // svg.save("pt.svg");
}

});