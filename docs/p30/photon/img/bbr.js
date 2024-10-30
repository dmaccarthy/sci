SVG2.cache("p30/photon/img/bbr.js", {

planck: (sel, ...args) => {
    svg = new SVG2(sel, {size: [512, 384], lrbt: [0, 3, 0, 1.5], grid: [0.2, 0.1], margin: [28, 2, 28, 1]});
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

    let g = svg.group();
    g.circle("4", [0.7 / w0, 0]).css({fill: "red"});
    g.circle("4", [0.61 / w0, 0]).css({fill: "orange"});
    g.circle("4", [0.58 / w0, 0]).css({fill: "yellow"});
    g.circle("4", [0.53 / w0, 0]).css({fill: "lightgreen"});
    g.circle("4", [0.475 / w0, 0]).css({fill: "blue"});
    g.circle("4", [0.4 / w0, 0]).css({fill: "purple"});

    if (args.length < 2) args = [0, 5778];
    let colors = ["#0065fe", "red", "green", "gold", "violet"];
    for (let i=1;i<args.length;i++) {
        let T = args[i];
        if (T > 0) {
            let [w, I] = wien(T);
            let w1 = w / w0;
            I /= I0;
            let c = colors[(i - 1) % colors.length];
            svg.locus(f, [0, 3], T).$.css({"stroke-width": "2px", stroke: c});
            svg.text(`${(1000 * w).toFixed(0)} nm`, [w1, I + 0.07]).css({fill: c});
            svg.circle("4", [w1, I]).css({stroke: c, fill: "white"});    
        }
    }

    g.$.appendTo(svg.$);
    svg.text("Wavelength", [2.5, "-16"]);
    g = svg.group().config({theta: 90, shift: ["-16", 0.75]});
    g.text("Intensity");
},

});
