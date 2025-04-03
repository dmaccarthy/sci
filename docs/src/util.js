const sleep = async(t) => await new Promise(r => setTimeout(r, t));

function jeval(a) {return JSON.parse(`{"a": ${a}}`).a}

function jeval_frac(s) {
    s = s.split("/");
    return jeval(s[0]) / (s.length > 1 ? jeval(s[1]) : 1);
}

function clickCycle(e, n, ...f) {
    e.cycleStatus = n;
    $(e).click((ev) => {
        let back = ev.ctrlKey;
        let n = f.length;
        e.cycleStatus += back ? -1 : 1;
        if (e.cycleStatus < 0) e.cycleStatus = n - 1;
        else if (e.cycleStatus >= n) e.cycleStatus = 0;
        let i = back ? 0 : e.cycleStatus;
        while (i <= e.cycleStatus) f[i++]();
    });
}

clickCycle.toggle = (items, show, ...n) => {
    let svg;
    try {svg = items instanceof SVG2 ? items : null}
    catch(err) {}
    for (let i of n) {
        let e = svg ? svg.$.find(`.Toggle${i}`) : $(items[i]);
        if (show) e.fadeIn();
        else if (show == null) e.fadeToggle();
        else e.fadeOut();
    }
}

function* range(x0, x1, dx) {
    // Generate a sequence like Python's range function
    if (x1 == null) {x1 = x0; x0 = 0}
    if (!dx) dx = x0 < x1 ? 1 : -1;
    while (dx > 0 && x0 < x1 || dx < 0 && x0 > x1) {
        yield x0;
        x0 += dx;
    }
}

function qsArgs(key, str) {
    // Parse query string
    if (str == null) str = location.search;
    let args = {};
    try {
        for (let [k, val] of new URLSearchParams(str))
            args[k.trim()] = val;       
    } catch(err) {
        console.error(err);
        let qs = str.split("?")[1];
        if (qs == null) return key ? null : {};
        qs = qs.split("&");
        for (let i=0;i<qs.length;i++) {
            let a = qs[i].split("=");
            args[a[0].trim()] = decodeURIComponent(a[1]);
        }
    }
    return key ? args[key] : args;
}

function itemAspect(ei, w) {
    // Adjust height(width) of element to maintain aspect ratio
    ei = $(ei);
    let a = jeval_frac(ei.attr("data-aspect"));
    if (w) {
        ei.css({width: ''});
        let w1 = Math.round(ei.height() * a);
        if (w1 != ei.width()) ei.width(w1);
    }
    else {
        ei.css({height: ''});
        let h = Math.round(ei.width() / a);
        if (h != ei.height()) ei.height(h);
    }
}

function aspect(w) {
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) itemAspect(e[i], w)
}

function isAfter(due, date) {
    // Check whether a date (today) is after the specified due date
    if (due == null) return true;
    else if (due == false) return false;
    if (date == null) date = new Date();
    if (!(due instanceof Date)) {
        due = due.split(".");
        if (due.length > 1) due[1] = parseInt(due[1]) - 1;
        due = new Date(...due);
    }
    return date >= due;
}

function randomString(n, allowNum) {
// allowNum = 1: numerals are allowed
// allowNum = 2: allowed except for first character
    let s = "";
    if (allowNum == 2) {
        s = randomString(1);
        n--;
    }
    while (n--) {
        let i = Math.floor((allowNum ? 62 : 52) * Math.random());
        i = (i < 26 ? 65 : (i < 52 ? 97 : 48)) + i % 26;
        s += String.fromCharCode(i);
    }
    return s;
}

function randomColor(digits) {
    // Create a random RGB hex code
    let s = "#";
    if (!digits) digits = 6;
    for (let i=0;i<digits;i++) {
        let r = Math.floor(15.9999 * Math.random());
        s += "0123456789abcdef".charAt(r);
    }
    return s;
}

function* _zip(x, y, rarray) {
    let xa = x instanceof Array;
    let ya = y instanceof Array;
    let n = xa ? x.length : y.length;
    for (let i=0;i<n;i++) {
        let xi = xa ? x[i] : x;
        let yi = ya ? y[i] : y;
        yield rarray ? new RArray(xi, yi) : [xi, yi];
    }
}

function zip(x, y, rarray) {return [..._zip(x, y, rarray)]}

function unzip(data, rarray) {
    let dim = data[0].length;
    let udata = new Array(dim);
    for (let i=0;i<udata.length;i++) udata[i] = rarray ? new RArray() : [];
    for (let j=0;j<data.length;j++)
        for (let i=0;i<dim;i++) udata[i].push(data[j][i]);
    return udata;
}


/*** Math rendering with MathJax or KaTeX ***/

function katex_render(e, opt) {
    // Render TeX math with KaTeX
    e = $(e ? e : ".TeX").removeClass("TeX");
    for (let ei of e) {
        let e$ = $(ei);
        let tex = e$.text();
        e$.attr("data-latex", tex);
        let options = {displayMode: e$.is("p, div, .Display"), throwOnError: false};
        if (opt) Object.assign(options, opt);
        katex.render(tex, ei, options);
    }
    if (katex_render.hideEqNum) $("[data-latex]:is(p, div) .eqn-num").hide();
}

katex_render.hideEqNum = true;
renderTeX = katex_render;

async function mjWait(t) {
    // Wait until MathJax.typesetPromise is available
    if ($("#MathJax-TeX-SVG").length == 0)
        $("head").append($("<script>").attr({
            type: "text/javascript",
            id: "MathJax-TeX-SVG",
            async: true,
            src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js",
    }));
    while (!MathJax.typesetPromise) await sleep(t ? t : 50);
    return new Promise((res) => res(0));
}

async function mjax_svg(tex) {
    return mjWait().then(() => {
        let p = $("<p>").appendTo("body").html(`$$${tex}$$`);
        return MathJax.typesetPromise(p).then(() => {
            let svg = p.find("svg")[0].outerHTML;
            p.remove();
            return svg;    
        });
    });
}

function mjax_render(e, interactive) {
    e = $(e ? e : ".TeX");
    for (let item of e) {    
        if ($(item).children().length) console.log(item);
        let ei = $(item);
        let [a, b] = ei.is("p, div, .Display") ? ["$$", "$$"] : ["\\(", "\\)"];
        let tex = ei.html();
        ei.attr("data-latex", tex);
        ei.html(`${a}${tex}${b}`);
    }
    mjWait().then(() => {
        try {
            MathJax.typesetPromise().then(() => {
                for (let item of $("[data-latex]")) {
                    let ei = $(item).removeClass("TeX");
                    if (!interactive) ei.html(ei.find("svg"));    
                }
            });
        }
        catch(err) {
            console.error(err);
        }  
    })
}


/*** HSV Color ***/

function RGBtoHSV(r, g, b) {
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let v = max / 2.55, h;
    let d = max - min;
    let s = (max === 0 ? 0 : 100 * d / max);
    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }
    return {h: 360 * h, s: s, v: v};
}

function HSVtoRGB(h, s, v) {return uHSVtoRGB(h/360, s/100, v/100)}

function uHSVtoRGB(h, s, v) {
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately#17243070
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/* Fetch images or other data as blobs or data URLs... 

loadBlobs("video.png", "print.svg").then(console.log);  
loadDataURLs("video.png", "print.svg").then(console.log);  

*/

async function loadOneBlob(url, dataURL) {
    return new Promise((resolve, reject) => {
        fetch(url).then(r => r.blob().then(b => {
            if (!r.ok) reject(b);
            else {
                if (dataURL) {
                    const reader = new FileReader();
                    reader.onloadend = r => resolve(r.target.result);
                    reader.readAsDataURL(b);            
                }
                else resolve(b);                
            }
        }));
    });  
}

async function _loadBlobs(dataURL, ...args) {
    let data = {}, promises = {};
    for (let a of args)
        promises[a] = loadOneBlob(a, dataURL).then(b => data[a] = b, () => data[a] = null);
    for (let a of args) await promises[a];
    return new Promise((resolve) => {resolve(data)});
}

async function loadBlobs(...args) {return _loadBlobs(0, ...args)}
async function loadDataURLs(...args) {return _loadBlobs(1, ...args)}
