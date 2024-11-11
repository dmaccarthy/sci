SVG2.cache("cs_new/robo/img/hsv.js", {

wheel: (sel, h, s, v) => {
    let svg = new SVG2(sel, {scale: 180, lrbt: [-1, 1, -1, 1], margin: [12, 12, 1, 1]});
    let url = (v) => SVG2.cache_run("cs_new/robo/img/hsv.js", "colorWheelURL", 180, v / 100);
    let hue, sat, val = v, r = 1.05;
    let g = svg.group().css({stroke: "grey", "stroke-width": "2px"});
    for (let i=0;i<3;i++) g.line(vec2d(r, 60*i), vec2d(r, 180+60*i))
    svg.image(url(v), [2, 2]);
    let hs = svg.group().addClass("HueSat").css({stroke: "black", "stroke-width": "2px", fill: "none"});

    svg.set_v = (v) => {
        if (v != val) {
            svg.$.find("image").attr({href: url(v)});
            val = v;
        }
    }

    svg.set_hs = (h, s) => {
        sat = hs.circle(s / 100, null, sat);
        hue = hs.line([0, 0], vec2d(r, h), hue);
    }

    svg.set_hs(h, s);
    return svg.addClass("NoStyle");
},

colorWheelImg: (r, v) => {
    if (v == null) v = 1;
    let w = 2 * r + 1;
    let img = new ImageData(w, w);
    let data = img.data;
    let pi2 = 2 * Math.PI;
    for (let x=-r; x<=r; x++)
        for (let y=-r; y<=r; y++) {
            let i = 4 * ((x + r) + w * (y + r));
            let s = Math.sqrt(x * x + y * y) / r;
            let h = Math.atan2(-y, x) / pi2;
            if (s <= 1) {
                let rgb = uHSVtoRGB(h < 0 ? h + 1 : h, s, v);
                data[i] = rgb.r;
                data[i + 1] = rgb.g;
                data[i + 2] = rgb.b;
                data[i + 3] = 255;
            }
        }
    return img;
},
    
colorWheelURL: (r, v) => {
    if (v == null) v = 1;
    let w = 2 * r + 1;
    let cv = $("<canvas>").attr({width:w, height:w})[0];
    let cx = cv.getContext("2d");
    let img = SVG2.cache_run("cs_new/robo/img/hsv.js", "colorWheelImg", r, v);
    cx.putImageData(img, 0, 0);
    return cv.toDataURL();
},

blue: (sel) => {
    let svg = SVG2.cache_run("cs_new/robo/img/hsv.js", "wheel", sel, 0, 0, 100);
    svg.$.children("g.HueSat").remove();
    let v = vec2d;
    svg.path(v(0.6, 205)).arcTo(v(0.6, 260), 0.6).lineTo(v(1, 260)).arcTo(v(1, 205), 1, 2).close().update().css({fill: "none", stroke: "black", "stroke-width": "3px"});
},

});
