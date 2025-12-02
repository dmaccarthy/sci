SVG2.cache("p30/photon/img/bbr.js", {

planck: (sel, T0, ...args) => {
    // Set missing arguments to defaults
    if (!T0) T0 = 5772;
    let opt = {wMax: 3, iMax: 1.5, grid: true};
    if (typeof(T0) != "number") {
        opt = Object.assign(opt, T0);
        T0 = opt.T0;
    }
    if (opt.grid === true) opt.grid = [opt.wMax / 15, opt.iMax / 15];

    // Create diagram and store scale temperature
    let svg = new SVG2(sel, {size: [512, 384], lrbt: [0, opt.wMax, 0, opt.iMax], grid: opt.grid, margin: [28, 16, 28, 1]}).config({T0: T0});
    svg.css(".NoStyle", "text");

    // Locate peak and create scaled Planck Law function
    let w0 = wien(T0);
    let I0 = planck(w0, T0);
    let f = (x, t, T) => x <= 0 ? 0 : planck(x * w0, T) / I0;

    // Draw loci and peaks for specified temperatures
    if (args == null || args.length < 1) args = [T0];
    let colors = ["#0065fe", "red", "green", "gold", "violet", "cyan"];
    let txt = svg.group().addClass("Text Sans");
    let plot = svg.group().addClass("Plot");
    let loci = plot.group().addClass("Locus");
    for (let i=0;i<args.length;i++) {
        let T = args[i];
        if (T > 0) {
            let w = wien(T);
            let I = planck(w, T) / I0;
            let w1 = w / w0;
            let c = colors[i % colors.length];
            loci.locus(f, [0, opt.wMax], T).$.css({stroke: c});
            plot.circle("4", [w1, I]).css({stroke: c, fill: "white"}).addClass("Peak");
            txt.text(`${(1e9 * w).toFixed(0)} nm`, [w1, I + 0.04]).css({fill: c}).addClass("Peak");
        }
    }

    // Draw points to show visible wavelengths
    let g = svg.group().addClass("Visible").css({stroke: "black"});
    for (let [w, c] of [[740, "#900000"], [680, "red"], [610, "orange"], [580, "yellow"],
        [530, "lightgreen"], [490, "cyan"], [460, "#0065fe"], [400, "#9400d3"]]) 
            g.circle("4", [w * 1e-9 / w0, 0]).css({fill: c});

    // Label axes
    txt.text("Wavelength", [opt.wMax / 2, "-24"]);
    txt.group().config({theta: 90, shift: ["-12", opt.iMax / 2]}).text("Intensity");

    return svg;
},

r_j: (sel) => {
    let T = 300, wMax = 6;
    let opt = {T0: T, wMax: wMax, iMax: 1.1, grid: [7, 2]};
    let svg = SVG2.cache_run("p30/photon/img/bbr.js", "planck", sel, opt, T);
    let w0 = wien(T);
    let I0 = planck(w0, T);
    let w = 100 * w0;
    let rj_law = (w, T) => T / Math.pow(w, 4);
    let b = planck(w, T) / rj_law(w, T);
    let rj = svg.locus((x) => b * rj_law(x * w0, T) / I0, [2, wMax]);
    rj.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
    svg.$.find("text.Peak, g.Visible").remove();
    svg.$.find("g.Text")[0].graphic.text("Rayleigh-Jeans Law", [3.5, 1]).css({fill: "red"});
},

});
