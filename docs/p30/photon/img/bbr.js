SVG2.cache("p30/photon/img/bbr.js", {

planck: (sel, ...args) => {
    svg = new SVG2(sel, {size: [640, 480], lrbt: [0, 3, 0, 1.5], grid: [0.25, 0.1], margin: 6});
    svg.$.addClass("SVG2");

    // Planck-Wien Laws (using μm as wavelength unit)
    let a = 6.626e-34 * 2.998e8 / 1.381e-23 * 1e6;
    let planck = (w, T) => Math.pow(w, -5) / (Math.exp(a / (w * T)) - 1);
    let wien = (T) => {
        let w = 2897.772 / T;
        return [w, planck(w, T)];
    }

    let T0 = args[0] ? args[0] : 5778;
    svg.T0 = T0;
    let [w0, I0] = wien(T0);
    let f = (x, t, T) => x <= 0 ? 0 : planck(x * w0, T) / I0;

    svg.circle("5", [0.7 / w0, 0]).css({fill: "red"});
    svg.circle("5", [0.61 / w0, 0]).css({fill: "orange"});
    svg.circle("5", [0.58 / w0, 0]).css({fill: "yellow"});
    svg.circle("5", [0.53 / w0, 0]).css({fill: "lightgreen"});
    svg.circle("5", [0.475 / w0, 0]).css({fill: "blue"});
    svg.circle("5", [0.4 / w0, 0]).css({fill: "purple"});

    if (args.length < 2) args = [0, 5778];
    let colors = ["#0065fe", "red", "green", "gold", "violet"];
    for (let i=1;i<args.length;i++) {
        let T = args[i];
        let [w, I] = wien(T);
        let w1 = w / w0;
        I /= I0;
        let c = colors[(i - 1) % colors.length];
        svg.locus(f, [0, 3], T).$.css({"stroke-width": "2px", stroke: c});
        svg.text(`λ = ${w.toFixed(3)} μm`, [w1, I + 0.05]).css({fill: c});
        svg.circle("5", [w1, I]).css({stroke: c, fill: "white"});
    }
},

});
