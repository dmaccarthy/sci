class Molecule extends SVG2group {

constructor(g, c) {
    super(g);
    if (!c) c = "black";
    this.text = this.group("serif", c, "none@", 30);
    this.line = this.group("none", c + "@2");
    this.brac = this.group("none", c + "@1");
    this.circ = this.group("none@", c);
}

dots(cfg, ...args) {
    let [c, r] = cfg ? cfg : ["3", [0.32, 0.2]];
    let s, groups = [];
    if (r instanceof Array) [r, s] = r;
    else s = r / 1.6;
    s /= 2;
    for (let [x, y, d, a] of args) {
        let g = this.circ.group().shift_by([x, y]);
        groups.push(g);
        if (a) g.config({theta: a});
        for (let i=0;i<4;i++) {
            let n = d.charCodeAt(i) - 48;
            if (n > 0 && n < 3) {
                let pt = vec2d(r, 90 * i);
                if (n == 2) {
                    g.circle(c, pt.plus(vec2d(s, i % 2 ? 0 : 90)));
                    g.circle(c, pt.plus(vec2d(s, i % 2 ? 180 : 270)));
                }
                else g.circle(c, pt);
            }
        }
    }
    return groups;
}

bonds(...args) {
    let groups = [];
    for (let [x, y, r, n, a] of args) {
        let b = this.line.group().shift_by([x, y]);
        groups.push(b);
        if (a) b.config({theta: a});
        if (!n) n = 1;
        if (!r) r = 0.38;
        // if (!a) a = 0;
        let s = r / 4;
        if (n instanceof Array) [n, s] = n;
        y = s / 2 * (n - 1);
        for (let i=0;i<n;i++) {
            b.line([-r / 2, y], [r / 2, y]);
            y -= s;
        }
    }
    return groups;
}

atoms(sym, ...xya) {
    let groups = [];
    if (xya.length == 0) xya = [[0, 0]];
    for (let [x, y, a] of xya)
        groups.push(this.text.text(sym, [x, y], a));
    return groups;
}

brackets(...args) {
    let groups = [], f = 0.8;
    for (let [x, y, w, h, a] of args) {
        let g = this.brac.group().shift_by([x, y]);
        groups.push(g);
        if (a) g.config({theta: a});
        w /= 2; h /= 2;
        g.poly([[-f * w, h], [-w, h], [-w, -h], [-f * w, -h]]);
        g.poly([[f * w, h], [w, h], [w, -h], [f * w, -h]]);
    }
    return groups;

}

static H2O(g, dots) {
    let m = new Molecule(g);
    m.atoms('O');
    m.atoms('H', [-1, 0], [0, 1]);
    m.bonds([-0.5, 0], [0, 0.5, 0.38, 1, 90]);
    if (dots) m.dots(null, [0, 0, "2002", 0]);
    return m;
}

static OH (g, dots) {
    let m = new Molecule(g);
    m.atoms('H', [-0.5, 0]);
    m.atoms('O', [0.5, 0]);
    m.bonds([0, 0, 0, 1]);
    if (dots) m.dots(null, [0.5, 0, "2202"]);
    m.brackets([0.1, 0, 1.9, 1]);
    m.text.text('–', [1.4, 0.5]);
    return m;
}

static diatomic(g, sym, n, dots) {
    let m = new Molecule(g);
    m.atoms(sym, [-0.5, 0], [0.5, 0]);
    m.bonds([0, 0, 0, n]);
    if (dots) {
        let e = [["2202", "0222"], ["0202", "0202"], ["2000", "0020"]][n - 1];
        m.dots(null, [0.5, 0, e[0]], [-0.5, 0, e[1]]);
    }
    return m;
}

static HCl(g, dots) {
    let m = new Molecule(g);
    m.atoms('H', [-0.5, 0]);
    m.atoms('Cl', [0.5, 0]);
    m.bonds([0, 0, 0, 1]);
    if (dots) m.dots(null, [0.5, 0, "2202"]);
    return m;
}

}

SVG2.prototype.molecule = function(c) {return new Molecule(this, c)}

Molecule.H2 = g => Molecule.diatomic(g, 'H', 1);
Molecule.N2 = (g, dots) => Molecule.diatomic(g, 'N', 3, dots);
Molecule.O2 = (g, dots) => Molecule.diatomic(g, 'O', 2, dots);
Molecule.F2 = (g, dots) => Molecule.diatomic(g, 'F', 1, dots);
Molecule.Cl2 = (g, dots) => Molecule.diatomic(g, 'Cl', 1, dots);
Molecule.Br2 = (g, dots) => Molecule.diatomic(g, 'Br', 1, dots);

Molecule.HF = (g, dots) => {
    let m = Molecule.HCl(g, dots);
    m.text.$.find("text")[1].html('F');
    return m;
}
