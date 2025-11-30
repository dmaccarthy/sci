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
    else if (BData.is_XML(data)) {
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

static is_XML(x) {
    if (x) {
        let parent;
        while (parent = x.parentNode) x = parent;          
    }
    return x instanceof XMLDocument;
    // if (x instanceof XMLDocument) return true;
    // if (x && x.parentNode) return BData.is_XML(x.parentNode);
    // return false;
}

static init(data, filename) {return new BData(data, filename)}
static find(selector, filename) {return new BData(document.querySelector(selector), filename)} 
}



function code_echo(e, action) {
    /** Preview code in browser or copy to clipboard **/
    let text = e.text();
    if (!action) {
        navigator.clipboard.writeText(text).then(() => {
            msg("Text copied to clipboard")
        }, () => {
            msg("Unable to copy text")
        });
    }
    else {
        let echo = e.attr("data-echo");
        let fileExt = echo.split(".");
        fileExt = fileExt[fileExt.length - 1];
        if (fileExt == "html" || fileExt == "htm") {
            if (text.search("</body>") == -1) text = `<body>\n${text}\n</body>`;
            if (text.search("</head>") == -1) text = `${code_echo.head}\n${text}\n`;
            if (text.search("</html>") == -1) text = `${code_echo.html}\n${text}\n</html>`;
        }
        let b = BData.init(text, echo);
        if (action == 1) b.open();
        else if (action == 2) b.save();
        // console.log(b);
    }
}

code_echo.html = `<!DOCTYPE html>
<html lang="en-ca">`;

code_echo.head = `<head>
<meta charset="utf8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>HTML Document</title>
<link rel="shortcut icon" type="image/svg+xml" href="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"/>
</head>`;
