Number.prototype.html = function(p, latex) {
    let s = this.toPrecision(p).toLowerCase().split("e");
    let n = s[1];
    n = s[0] + (s.length > 1 ?
        (latex ? `\times 10^{${n}}` : ` × 10<sup>${n}</sup>`) : "");
    if (!latex) n = n.replace("-", "–"); // hyphen -> endash
    return n;
}

Array.prototype.sum = function() {
    let n = this.length, s = 0;
    if (n) {
        s = this[0];
        for (let i=1; i<n; i++) s += this[i];
    }
    return s;
}
    
Array.prototype.extend = function(a) {
    this.push.apply(this, a);
    return this;
}

Array.prototype.remove = function(val, removeAll) {
    let loop = true;
    while (loop) {
        let i = this.indexOf(val);
        if (i >= 0) this.splice(i, 1);
        if ((i == -1) || (!removeAll)) loop = false;
    }
    return this;
}

Array.prototype.times = function(s) {
    let a = [];
    for (let i=0;i<this.length;i++) a.push(this[i] * s);
    return a;
}

Array.prototype.neg = function() {return this.times(-1)}
Array.prototype.plus = function(a) {return Array.add(this, a)}
Array.prototype.minus = function(a) {return Array.add(this, a.times(-1))}

Array.add = (...args) => {
    let a = [];
    let dim = args[0].length;
    for (let i=0;i<dim;i++) {
        let s = 0;
        for (let j=0;j<args.length;j++) s += args[j][i];
        a.push(s);
    }
    return a;
}

function arrow_points(L, opt) {
    /* Calculate the vertices of an arrow. See: www.desmos.com/calculator/kr61ws62tm
       opt = {tail, head, angle, shape} */
    if (!opt) opt = {};
    let A = Math.PI / 180 * (opt.angle ? opt.angle : 35);
    let T = opt.tail ? opt.tail : L/14;
    if (T < 0) T *= -L;
    let H = opt.head ? opt.head : 4 * T;
    let c = Math.cos(A), s = Math.sin(A);
    let T2 = T / 2;
    let x1 = -H * c, x2 = x1 - T * s;
    let y1 = H * s, y2 = y1 - T * c;
    let x3 = x2 - (T2 - y2) * c / s;
    if (x3 < x2 || opt.shape == 2) x3 = x2;
    if (y2 < T2) y2 = T2;
    let pts = [[0,0], [x1, y1], [x2, y2], [x3, T2], [-L, T2],
        [-L, -T2], [x3, -T2], [x2, -y2], [x1, -y1]];
    if (opt.shape || y1 < T2) {
        pts.splice(8, 1);
        pts.splice(1, 1);
    }
    L /= 2;
    for (let i=0;i<pts.length;i++) pts[i][0] += L;
    return pts;
}

function qsArgs(key, str) {
    if (str == null) str = location.search;
    let qs = str.split("?")[1];
    if (qs == null) return key ? null : {};
    qs = qs.split("&");
    let args = {};
    for (let i=0;i<qs.length;i++) {
        let a = qs[i].split("=");
        args[a[0]] = decodeURIComponent(a[1]);
    }
    return key ? args[key] : args;
}

function makeURL(path, search, hash) {
    if (path == true) path = location.pathname;
    if (search == null) search = {};
    else if (search == true) search = qsArgs();
    let s = "";
    for (let k in search) {
        if (s.length) s += "&";
        else s = "?";
        s += `${encodeURIComponent(k)}=${encodeURIComponent(search[k])}`;
    }
    hash = hash === true ? location.hash : (hash ? "#" + hash : "");
    return `${path}${s}${hash}`.replace("//", "/");
}

function objectInList(data, key, val) {
    for (i=0;i<data.length;i++) {
        let v = data[i][key];
        if (val != null && v == val || val == null && v != null) return data[i];
    }
}

function aspect(w) { // Requires jQuery [code.jquery.com/jquery-3.7.1.min.js]
/* Adjust height(width) of iframe/video tags to maintain aspect ratio */
    let e = $("[data-aspect]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let a = eval(ei.attr("data-aspect"));
        if (w) {
            w = Math.round(ei.height() * a);
            e.css({width:w});                        
        }
        else {
            let h = Math.round(ei.width() / a);
            e.css({height:h});
        }
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script");
        script.onload = () => {resolve(script)}
        script.onerror = () => {reject(Error(`Failed to load '${src}''`))}
        document.head.append(script);        
        script.src = src;
    });
}

function mjTypeset() {
/* Use MathJax to render equations */
    let err;
    clearTimeout(mjTypeset.retry);
    try {
        if (MathJax.typeset) MathJax.typeset();
        else MathJax.Hub.Typeset();
        // console.log("mjTypeset done!");
    }
    catch(err) {
        if (window.MathJax) console.error(err);
        else mjTypeset.retry = setTimeout(mjTypeset, 750);
    }
}

function isAfter(due, date) {
/* Check whether a date (today) is after the specified due date */
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

String.random = function(n, allowNum) {
// allowNum = 1: numerals are allowed
// allowNum = 2: allowed except for first character
    let s = "";
    if (allowNum == 2) {
        s = String.random(1);
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

Image.dataURL = (url, success, error) => {
    // Load images as dataURLs
    let img = new Image();
    img.onload = (ev) => {
        let img = ev.currentTarget;
        let cv = $("<canvas>").attr({width: img.width, height: img.height});
        cv[0].getContext("2d").drawImage(img, 0, 0);
        success(url, cv[0].toDataURL());
    }
    if (error) img.onerror = (ev) => {error(url, ev)};
    img.src = url;
}


class BData {

/** Convert data to a Blob for downloading as a file or opening in a browser window.

static BData.init(data, filename) --> bdata (instance of BData)...
    Converts data to a Blob. If data is a string, the MIME type will default to "text/plain".

    If data is an instance of HTMLElement or SVGElement:
    * The data type will be "image/png" for CANVAS tags.
    * Non-canvas tags will be converted to strings using the outerHTML attribute.
    * Default type will be "text/html" or "image/svg+xml".

    If data is an XMLDocument or an element node within an XML document, the MIME type
    will default to "application/xml". Text and comment nodes will default to "text/plain".

    If data is any other object:
    * It will be converted to a string using JSON.stringify.
    * The default type will be "application/json".
    * An exception will be thrown if the object cannot be converted to a JSON string.

    The filename argument specifies a file name to use when saving the data. The file extension
    overrides the default MIME type; for example, a filename "data.csv" will result in a Blob
    with type "text/csv" rather than "text/plain". If the data is not intended to be saved as a
    file, you can pass just the extension ("csv").

static find(selector, filename) --> bdata...
   Finds the first match to the selector and then passes the element to BData.init.
   Throws an exception if no matching elements are found.

bdata.url() --> Returns a URL string for the blob

bdata.open() --> bdata...
    Opens the blob in a new browser window or tab. The BData instance has an array attribute
    called windows. The new window in which the data is displayed will be prepended to the array.
    For canvas data, the conversion to PNG is asynchronous and the array entry will be null
    until the new window is actually opened.

bdata.save(filename) --> bdata...
    Saves the blob data as a downloaded file. The filename can be omitted if a filename was
    already specified when the BData instance was created. Some browsers may change the file
    name; for example, if the requested file extension does not match the MIME type of the data.

bdata.blob...     The data as a Blob instance.
bdata.filename... The filename (if any) associated with the data.
bdata.windows...  An array of browser windows created by calls to bdata.open.

Examples...

BData.init("Hello, world!", "hi.txt").open().save();
BData.init([1, 2, 3]).open();

BData.init("1, 2, 3", "num.csv").save();
BData.init([1, 2, 3], "num.json").save();

BData.find("#FooBar").open();
BData.find("body").save("body.html");
BData.find("canvas").save("drawing.png");
BData.find("svg", "drawing.svg").save();

**/

    constructor(data, type) {
        this.windows = [];
        if (type) {
            let t = type.split(".");
            if (t.length > 1) this.filename = type;
            type = t[t.length - 1].toLowerCase();
        }
        let elem = data instanceof HTMLElement ? 1 : (data instanceof SVGElement ? 2 : 0);
        if (elem) {
           if (data.tagName.toUpperCase() == "CANVAS") {
                let bd = this;
                data.toBlob((b) => {bd.blob = b});
                return;
            }
            if (!type) type = elem == 1 ? "html" : "svg";
            data = data.outerHTML;
        }
        else if (BData.isXML(data)) {
            if (!type) type = (data instanceof XMLDocument) || data.tagName ? "xml" : "txt";
            data = new XMLSerializer().serializeToString(data);
        }
        else if (typeof(data) != "string") {
            data = JSON.stringify(data);
            if (!type) type = "json";
        }
        type = {
            html: "text/html",
            htm: "text/html",
            css: "text/css",
            js: "text/javascript",
            json: "application/json",
            svg: "image/svg+xml",
            xml: "application/xml",
            csv: "text/csv",
            py: "text/x-python"
        }[type];
        this.blob = new Blob([data], {type:type ? type : "text/plain"});
    }

    url() {return URL.createObjectURL(this.blob)}

    save(filename) {
        if (this.blob) {
            let url = URL.createObjectURL(this.blob);
            if (!filename) filename = this.filename;
            let a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", filename);
            a.click();
        }
        else {
            let b = this;
            setTimeout(() => {b.save(filename)}, 25);
        }
        return this;
    }

    _open() {
        if (this.blob)
            this.windows[0] = window.open(URL.createObjectURL(this.blob));
        else {
            let b = this;
            setTimeout(() => {b._open()}, 25);
        }
    }

    open() {
        this.windows.splice(0, 0, null);
        this._open();
        return this;
    }

    static isXML(x) {
       if (x) {
            let parent;
            while (parent = x.parentNode) x = parent;          
        }
       return x instanceof XMLDocument;
        // if (x instanceof XMLDocument) return true;
        // if (x && x.parentNode) return BData.isXML(x.parentNode);
        // return false;
    }

    static init(data, filename) {return new BData(data, filename)}
    static find(selector, filename) {return new BData(document.querySelector(selector), filename)} 
}
