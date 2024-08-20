function colorWheel(r, v) {
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
}

function colorWheelURL(r, v) {
    if (v == null) v = 1;
    let w = 2 * r + 1;
    let cv = $("<canvas>").attr({width:w, height:w})[0];
    let cx = cv.getContext("2d");
    cx.putImageData(colorWheel(r, v), 0, 0);
    return cv.toDataURL();
}
