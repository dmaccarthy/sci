SVG2.cache("cs_new/robo/img/hsv.js", {

wheel: (sel, h, s, v, tick) => {
/* Draw a color wheel with tick marks and hue/sat markers using SVG2 */
    if (tick == null) tick = 60;
    let hue, sat, val = v, r = 1.05;
    let svg = new SVG2(sel, {scale: 180, lrbt: [-1, 1, -1, 1], margin: (tick ? 10 : 1)});

    // Tick marks
    if (tick) {
        let g = svg.group("grey@2");
        for (let i=0;i<360;i+=tick) g.line(vec2d(r, i), vec2d(0.999, i))    
    }

    // Color wheel
    let url = (v) => SVG2.cache_run("cs_new/robo/img/hsv.js", "colorWheelURL", 180, v / 100);
    svg.image(url(v), [2, 2]);

    svg.set_v = (v) => { // Re-draw color wheel with different Val
        if (v != val) {
            svg.$.find("image").attr({href: url(v)});
            val = v;
        }
    }

    // Hue/Sat markers
    let hs = svg.group(".HueSat", "black@2", "none");

    svg.set_hs = (h, s) => {
        sat = hs.circle(s / 100, [0, 0], sat);
        hue = hs.line([0, 0], vec2d(r, h), hue);
    }

    svg.set_hs(h, s);
    return svg;
},

colorWheelImg: (r, v) => {
/* Render a color wheel as an ImageData instance */
    if (v == null) v = 1;
    let w = 2 * r + 1;
    let img = new ImageData(w, w);
    let data = img.data;
    for (let x=-r; x<=r; x++)
        for (let y=-r; y<=r; y++) {
            let i = 4 * ((x + r) + w * (y + r));
            let s = Math.sqrt(x * x + y * y) / r;
            let h = Math.atan2(-y, x) / twoPi;
            if (s <= 1) {
                let rgb = HSV.uHSVtoRGB(h < 0 ? h + 1 : h, s, v);
                data[i] = rgb.r;
                data[i + 1] = rgb.g;
                data[i + 2] = rgb.b;
                data[i + 3] = 255;
            }
        }
    return img;
},

colorWheelURL: (r, v) => {
/* Render a color wheel as a data URL */
    if (v == null) v = 1;
    let w = 2 * r + 1;
    let cv = $("<canvas>").attr({width: w, height: w})[0];
    let cx = cv.getContext("2d");
    let img = SVG2.cache_run("cs_new/robo/img/hsv.js", "colorWheelImg", r, v);
    cx.putImageData(img, 0, 0);
    return cv.toDataURL();
},

blue: (sel) => {
    let svg = SVG2.cache_run("cs_new/robo/img/hsv.js", "wheel", sel, 0, 0, 100);
    svg.$.children("g.HueSat").remove();
    let v = vec2d, r = 0.6, a = 205, b = 260;
    let p = svg.path(v(r, a)).arc_to(v(r, b), r).line_to(v(1, b)).arc_to(v(1, a), 1, 2).close().update();
    css(p, "none", "black@3"); 
},

});
