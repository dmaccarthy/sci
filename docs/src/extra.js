// From util

function file_ext(url) {
    url = new URL(url, location.href);
    let path = url.pathname.split("/");
    path = path.item(-1).split(".");
    return path.item(-1).toLowerCase();
}

function random_color(digits) {
    // Create a random RGB hex code
    let s = "#";
    if (!digits) digits = 6;
    for (let i=0;i<digits;i++) {
        let r = Math.floor(15.9999 * Math.random());
        s += "0123456789abcdef".charAt(r);
    }
    return s;
}


// From math

function number_HTML(p, latex) {
    let s = this.toPrecision(p).toLowerCase().split("e");
    let n = s[1];
    n = s[0] + (s.length > 1 ?
        (latex ? `\times 10^{${n}}` : ` × 10<sup>${n}</sup>`) : "");
    if (!latex) n = n.replace("-", "–"); // hyphen -> endash
    return n;
}

