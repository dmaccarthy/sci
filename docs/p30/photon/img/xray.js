SVG2.cache("p30/photon/img/xray.js", {

brem: (sel) => {
    svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 0.6, 0, 0.9], grid: [1, 1], margin: [28, 1, 40, 1]});
    svg.$.addClass("SVG2");
    let wMin = 0.05;
    let char = [[0.281, 0.4, 0.00015], [0.43, 0.3, 0.0002]];
    let f = (w) => {
        let x = w / wMin;
        let y = w > wMin ? 3 * (x - 1) / (x * x) : 0;
        for (let i=0;i<char.length;i++) {
            let [w0, A, b] = char[i];
            y += A * Math.exp(-sq(w/w0 - 1) / b);
        }
        return y;
    }
    let opt = {tail: "5"};
    svg.line([wMin, 0], [wMin, "-10"]);
    svg.symbol(["λ", 0], ["min", 6, ["18", "-8"]]).config({shift: [0.045, "-24"]});
    svg.locus(f, [wMin, 0.6, 600], 0).$.css({"stroke-width": "1.5px"});
    svg.arrow({tail: [0.3, 0.25], tip: [0.34, 0.36]}, opt);
    svg.arrow({tail: [0.35, 0.76], tip: [0.29, 0.69]}, opt);
    svg.arrow({tail: [0.43, 0.76], tip: [0.43, 0.62]}, opt);
    svg.text("Bremsstrahlung", [0.3, 0.2]);
    svg.text("Characteristic X-Rays", [0.42, 0.8]);
    svg.text("Wavelength", [0.3, "-16"]);
    svg.group().config({theta: 90, shift: ["-16", 0.45]}).text("Intensity");
},


});
