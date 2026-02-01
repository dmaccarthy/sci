function chapRev() {
    let f = loadFeed.referer;
    if (f) {
        f = f.split("/");
        if (["rev", "home"].indexOf(f.item(-1)) > -1 || f.item(-2) == "units") return true;
    }
    return false;
}

function assign() {
    $(".Answer, hr, nav, #Copy").remove();
    $("section:not([data-answers])").remove();
    $("span.Action, img.Icon, img.Chevron").remove();
    $("div.Collapse").addClass("Expand").show();
}

mediaURL.urls = {
    python: "https://www.python.org/static/favicon.ico",
    thonny: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thonny_logo.png/120px-Thonny_logo.png",
    replit: "https://replit.com/public/images/about/logo.png",
    amoeba: "media/amoeba.webp",
    crash: "media/crash.webp",
    sc8pr: "media/sc8pr.svg",
    ide: "media/vscode.svg",
    sal: "media/sal.webp",
    bs: "https://s.brightspace.com/lib/branding/1.0.0/brightspace/favicon.svg",
    ps: "https://powerschool.eips.ca/favicon-196x196.png",
    desmos: "https://www.desmos.com/favicon.ico",
    phet: "https://phet.colorado.edu/favicon.ico",
    print: data_images.print,
    html5: data_images.html,
    xml: data_images.xml,
    simulation: data_images.sim,
    help: "media/help.svg",
    gdrv: data_images.gdrv,
    svg: data_images.svg,
    gdoc: "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png",
    gsheet: "https://ssl.gstatic.com/docs/spreadsheets/spreadsheets_2023q4.ico",
    slides: data_images.slides,
    video: "media/video.svg",
    correct: data_images.correct,
}

function is_after(due, date) {
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

function calendar(cal) {
/** Draw the course calendar **/
    if (!cal) return;
    let today = new Date();
    let isToday = (d) => {
        d = new Date(d).toString();
        let t = new Date(today).toString();
        return d.substring(0, 15) == t.substring(0, 15);
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let tb = $("table.Calendar");
    for (let ev of cal) {
        let [date, text, attr, css] = ev;
        if (text.charAt(0) == "@") text = "Lesson: " + text.substring(1);
        let tr = $("<tr>").appendTo(tb);
        if (is_after(date) && !isToday(date)) tr.hide().addClass("PastDue");
        let [w, m, d] = date.split(".");
        m = months[parseInt(m) - 1];
        w = days[new Date(date).getDay()];
        $("<td>").html(`${w}, ${m} ${d}`).appendTo(tr);
        if (attr) {
            text = $("<a>").html(text).attr(attr);
            // if (attr.href) {}
        }
        $("<td>").html(text).css(css ? css : {}).appendTo(tr);
    }
    $("#ShowOld").on("change", (ev) => {
        let tr = $("table.Calendar tr.PastDue");
        if (ev.currentTarget.checked) tr.show();
        else tr.hide();
    })[0].checked = false;
}

function handouts(data) {
/** Generate handouts post **/
    if (data) {
        if (typeof(data) == "string") data = [data];
        let s = $("#Main section.Handouts");
        if (s.length == 0) s = $("<section>").appendTo("#Main");
        s.removeClass("Handouts").addClass("Post NoPrintIcon").attr({"data-show": "1", "data-icon": "gdrv"});
        let h2 = $("<h2>").addClass("Collapse").html("Handouts / Links").appendTo(s);
        let div = $("<div>").addClass("Collapse").appendTo(s);
        let html = $("<p>").html(siteData.handouts).appendTo(div);
        let p = $("<p>").addClass("BtnGrid").appendTo(div);
        for (let item of data) {
            let [title, info] = typeof(item) == "string" ? ["Assignment", {gdrv: item}] : item;
            if (typeof(info) == "string") info = {gdrv: info};
            if (title) {
                let btn = $("<button>").html(title).appendTo(p);
                if (info.gdrv) btn.attr({"data-icon": "gdrv"});
                for (let k in info) btn.attr(`data-${k}`, info[k]);
            }
            else {
                if (info.title) h2.html(info.title);
                if (info.html) html.html(info.html);
            }
        }
    }
}

function video(s) {
/** Embed a <video> or YouTube <iframe> **/
    s = $(s);
    let opt = s.attr("data-opt");
    opt = opt ? JSON.parse(opt.replaceAll("'", '"')) : {};
    let border = opt.border? opt.border : 0;

    let w = opt.width;
    let r = opt.aspect;
    if (!r) r = 16 / 9;
    let ar = typeof(r) == "number" ? r : jeval_frac(r);
    if (!w) w = 405 * ar;
    let id = s.attr("data-yt"), v;
    if (id) {
        let c = id.charAt(0);
        if (c == "#") id = "videoseries?list=" + id.slice(1);
        v = $("<iframe>").attr({frameborder: border, allowfullscreen:1,
            src:"https://www.youtube.com/embed/" + id});
    }
    else {
        id = s.attr("data-video");
        v = $("<video>").attr({controls: 1, src: id});
    }
    v.attr({width: w, "data-aspect": r});
    $("<p>").addClass("Center Collapse").html(v).appendTo(s);
}

teacher = (t, init) => {
/** Set/get teacher mode **/
    teacher.mode = false;
    if (t != null) localStorage.setItem("teacher_mode", t);
    if (parseInt(localStorage.getItem("teacher_mode")))
        if (btoa(localStorage.getItem("teacher_code")) == teacher.access)
            teacher.mode = true;
    console.log("Teacher", teacher.mode);
    if (teacher.mode) if (location.hostname == "dmaccarthy.github.io")
            serverUTC().then(a => a.json()).then(console.log);
    if (!init) loadFeed();
}

teacher.access = "Qnpya1I0cDd3bFFITThIbA==";

siteData = {lesson: "", email: "david.maccarthy@eips.ca"};

function serverUTC() {return fetch(serverUTC.url)}
serverUTC.url = "https://dmaccarthy.vercel.app/utc.json";


// Printing 

function beforePrint() {
    let b = $("body");
    if (!b.hasClass("Present")) {
        beforePrint.hide = $("#Top, .NoPrint:visible").hide();
        b.prepend($("<h1>").attr({id: "PrintTitle"}).html(document.title));    
    }
}

window.addEventListener("beforeprint", beforePrint);

window.addEventListener("afterprint", () => {
    if (!$("body").hasClass("Present")) {
        try {
            $("#PrintTitle").remove();
            beforePrint.hide.show();
            loadFeed();
        }
        catch(err) {}    
    }
});


// Slideshow functions

function showOnly(sel) {
    sel = $($(sel)[0]);
    for (let e of $("body *")) {
        e = $(e);
        let d = e.closest(sel).length > 0;
        let a = sel.closest(e).length > 0;
        if (!d && !a) e.hide();
    }
}

function embed(e) {
    /* Move problems from other sections into slideshow */
    let divs = e.find("[data-embed]");
    for (let div of divs) {
        div = $(div);
        div.replaceWith($("#" + div.attr("data-embed")));
    }
}

function slideShow(e) {
    $("body").addClass("Present");
    e = $($(e)[0]).addClass("TopLevel");
    e.find(".NoPresent").remove();
    embed(e);
    showOnly(e);
    slideShow.sections = e.children(".Slide");
    if (slideShow.sections.length == 0) slideShow.sections = e;
    while (e[0].tagName.toUpperCase() != "BODY") e = e.parent().show();
    goSlide();
    layoutWidth();
    $(window).on("keydown", (ev) => {
        let a = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(ev.key);
        if (a >= 0) {
            let t = ["INPUT", "TEXTAREA"].indexOf(ev.target.tagName.toUpperCase());
            let n = ev.ctrlKey ? 10 : 1;
            if (t == -1) {
                if (a < 2) {
                    while (n--) (a ? prevCue : nextCue)();
                }
                else if (a == 2) goSlide();
                else if (a == 3) goPrev();
                layoutWidth();
                scrollToBottom(t);
            }
        }
    })
}

function goSlide(n) {
    if (n == null) n = goSlide.n == null ? 0 : goSlide.n + 1;
    if (n > slideShow.sections.length) n = slideShow.sections.length;
    goSlide.n = n;
    slideShow.sections.hide();
    let s = $(slideShow.sections[n]).fadeIn();
    let c = s.find("div, p, ol, ul, li, h1, h2, h3, h4, table, *[data-cue]");
    goSlide.cues = [];
    for (let e of c) {
        e = $(e);
        let cue = e.attr("data-cue");
        if (cue == "prev")
            goSlide.cues[goSlide.cues.length-1].push(e.hide()[0]);
        else if (cue == "wait" || !e.is(":first-child") && cue != "none")
            goSlide.cues.push([e.hide()[0]]);
        else e.show();
    }
    goSlide.cueNum = -1;
}

function goPrev() {goSlide(goSlide.n ? goSlide.n - 1 : 0)}

function nextCue() {
    let cues = goSlide.cues;
    let n = ++goSlide.cueNum;
    if (n >= cues.length) goSlide();
    else $(cues[n]).fadeIn();
}

function prevCue() {
    let cues = goSlide.cues;
    let n = goSlide.cueNum--;
    if (n >= 0) $(cues[n]).fadeOut();
    else {
        goPrev();
        let cues = goSlide.cues;
        let n = cues.length;
        for (let i=0;i<n;i++) $(cues[i]).show();
        goSlide.cueNum = n - 1;    
    }
}

function scrollToBottom(t) {
    let h = $("html");
    let y = h[0].scrollHeight - $(window).height();
    h.animate({scrollTop: y < 0 ? 0 : y}, t ? t : 500);
}


// Other event handlers

$(window).on("keydown", ev => {
    if (ev.ctrlKey && ev.altKey) {
        let k = ev.key.toLowerCase();
        if (k == "n") window.open(location.href);
        else if (k == "t") teacher(teacher.mode ? 0 : 2);
        else if (k == "p" && teacher.mode) assign();
    }
}).on("click", open_on_click);

function open_on_click(ev) {
    /* Create and open an HTML blob displaying the image */
    let k = (ev.ctrlKey ? 1 : 0) + (ev.altKey ? 2 : 0);
    if (k) {
        let svg = $(ev.target).closest("svg:not(.NoOpen)");
        if (svg.length) {
            let opt = k & 2 ? {type: "png"} : {};
            if (k == 3) {
                let s = parseFloat(prompt("Scale factor?", 2));
                if (!isNaN(s)) opt.scale = s;
            }
            SVG2.open(svg[0], opt).then(console.log);
        }
    }
}

function process_loadData(feed) {
    /* Add titles and due date from index.json */
    let data = Object.assign({up: "home"}, loadFeed.index[feed]);
    if (data.title) {
        if (data.title.charAt(0) == "@") data.title = data.title.substring(1);
        if (data.num) data.title = `${data.num} — ${data.title}`;
    }
    return Object.assign(data, loadFeed.data);
}

function make_cal(crs) {
    /* Generate course calendar */
    let cal = [];
    for (let feed in loadFeed.index) {
        let feedArray = feed.split("/")
        if (feedArray[0] == crs) {
            let data = loadFeed.index[feed];
            if (!data.hide && data.title && data.showDate && data.showDate.split(".").length > 2) {
                let attr = feedArray[feedArray.length - 1] == "@" ? {} : {"data-feed": feed.split("#")[0]};
                if (data.attr) attr = Object.assign(attr, data.attr);
                cal.push([data.showDate, data.title, attr, data.css]);
            }
        }
    }
    return cal.toSorted((a, b) => {
        f = (x) => {
            x = x.split(".");
            if (x.length > 1) x[1] = parseInt(x[1]) - 1;
            return new Date(...x);
        }
        [a, b] = [f(a[0]), f(b[0])];
        return a > b ? 1 : (a < b ? -1 : 0);
    });
}

function initPage(latex) {
    /* Initialize page */
    if (!latex) latex = "svg";
    renderTeX = {
        svg: e => mjax_render(e).then(layoutWidth),
        mjax: e => mjax_render(e, true).then(layoutWidth),
        katex: katex_render,
        none: e => $(e ? e : ".TeX").css({visibility: "visible"}),
    }[latex];
    console.log(`latex-renderer = ${latex}`);
    teacher(null, true);
    loadHash(true);
    document.getElementById("TopTitle").addEventListener("click", goUp);
}

$(async () => {
    /* Load index.json and then initialize page */
    mjax_wait().then(() => {
    fetch("index.json", {cache: "reload"}).then(a => (a.ok ? a.json() : {})).then((a) => {
        let index = loadFeed.index = {};
        for (let crs in a) {
            let data = a[crs];
            for (let k in data)
                index[`${crs}/${k}`] = data[k];
        }
        let keys = {t: "title", s: "showDate", a: "answerDate", n: "num", h: "handouts"}
        for (let i in index) {
            let x = index[i];
            for (let k in keys) {
                if (x[k]) {
                    x[keys[k]] = x[k];
                    delete x[k];
                }
            }
        }
        initPage();
        });
    });
});



/*** Load and run SVG2 scripts ***/

const svg2_load = async function(cb) {
/* Fetch SVG2 scripts */
    let svgs = $("svg[data-svg2]");
    let pending = {};
    let ts = Date.now();
    for (let svg of svgs) {
        let [url, id, args] = $(svg).attr("data-svg2").split("#");
        url = new URL(url, SVG2.url).href;
        svg.info = [url, id, args];
        if (pending[url] == null && svg2_load._cache[url] == null)
            pending[url] = fetch(`${url}?_=${ts}`).then((a) => a.text()).then(eval);
    }
    for (let p in pending) await pending[p];
    for (let svg of svgs) {
        let [url, id, args] = svg.info;
        delete svg.info;
        let data = `${url}#${id}`;
        if (args) data += `#${args}`;
        $(svg).removeAttr("data-svg2").attr("data-svg2x", data);
        if (args) {
            try {args = jeval(args)}
            catch(err) {console.warn(err)}
            if (!(args instanceof Array)) args = [args];
        }
        else args = [];
        try {svg2_load._cache[url][id](svg, ...args)}
        catch(err) {console.warn(err)}
    }
    return cb ? cb() : null;
}

svg2_load._cache = {};

SVG2.cache_run = function(url, id, ...arg) {
    let js = svg2_load._cache[new URL(url, SVG2.url).href];
    return js[id](...arg);
}

SVG2.cache = function(url, obj) {
/* Load SVG2 JavaScript into cache */
    svg2_load._cache[new URL(url, SVG2.url).href] = obj;
}

// SVG2.cached = function(url) {return svg2_load._cache[new URL(url, SVG2.url).href]}
// SVG2.load.pending = [];


// svgn(0).submit_img({action: "http://localhost:8002", method: "POST", target: "_blank"}, {scale: 2, bg: "yellow"});

