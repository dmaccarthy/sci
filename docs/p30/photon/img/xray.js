SVG2.cache("p30/photon/img/xray.js", {

brem: (sel) => {
    svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.6, 0, 0.9], grid: 1, margin: [36, 4, 36, 1]});
    let wMin = 0.05;
    let spectrum = (w, char) => {
        let x = w / wMin;
        let y = w > wMin ? 3 * (x - 1) / (x * x) : 0;
        for (let i=0;i<char.length;i++) {
            let [w0, A, b] = char[i];
            y += A * Math.exp(-sq(w/w0 - 1) / b);
        }
        return y;
    }
    let brem = (w) => spectrum(w, []);
    let comb = (w) => spectrum(w, [[0.281, 0.4, 0.00015], [0.43, 0.3, 0.0002]])
    css(svg.line([wMin, 0], [wMin, "-10"]), "black@1");
    svg.mjax("\\lambda_{min}", {scale: 0.7}, [0.065, -0.06]);
    svg.locus(brem, [wMin, 0.6, 600], 0).css("lightgrey@1");
    svg.locus(comb, [wMin, 0.6, 600], 0).css("#0065fe@2");
    let g = svg.group("arrow");
    let opt = {tail: "5"};
    g.arrow({tail: [0.3, 0.25], tip: [0.34, 0.36]}, opt);
    g.arrow({tail: [0.35, 0.76], tip: [0.29, 0.69]}, opt);
    g.arrow({tail: [0.43, 0.76], tip: [0.43, 0.62]}, opt);
    g = svg.group("text", "red");
    g.gtext("Bremsstrahlung", [], [0.3, 0.2]);
    g.gtext("Characteristic X-Rays", [], [0.42, 0.8]);
    svg.gtext("Wavelength", [], [0.3, "-16"]);
    let pt = ["-16", 0.45]
    svg.gtext("Intensity", ["text"]).config({theta: 90, shift: pt, zpivot: pt});
},


});
