/*** SVG2 animations ***/

const css = SVG2.style;

let _eval = (t) => {
    let s = $("<script>").attr({type: "text/javascript"}).html(t);
    s.appendTo("head").remove();
}

async function scripts(args) {
    let p = [];
    let url = x => `${x}.js?_${new Date().getTime()}`;
    for (let a of args) if (!scripts.cache[a[1]]) {
        a = a[1];
        scripts.cache[a] = true;
        console.log(`Fetching: ${a}.js`);
        p.push(fetch(url(a)).then(r => r.ok ? r.text() : null).then(t => t ? _eval(t) : null));
    }
    for (let a of p) await a;
    for (let [s, js, key, a] of args) {
        try {scripts.cache[js][key](s, a)}
        catch(err) {console.warn(err)}
    }
}

scripts.cache = {};

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


/*** Image library ***/

function get_image(key, element) {
    // Get image URL from @key
    // if (key == "today") return calendar_icon.url();
    img = key.indexOf("://") == -1 ? get_image.map[key] : key;
    if (!img) {
        img = `../media/${key}`;
        if (key.indexOf(".") == -1) img += ".svg";
    }
    if (element && img) img = $("<img>").attr({src: img, alt: key});
    return img;
}

get_image.map = {
    sal: "../media/sal.webp",
    bs: "https://s.brightspace.com/lib/branding/1.0.0/brightspace/favicon.svg",
    ps: "https://powerschool.eips.ca/favicon-196x196.png",
    python: "https://www.python.org/static/favicon.ico",
};


/*** Miscellaneous functions ***/

function font_size(s) {
    /* Adjust the font size */
    let f, b = $("body");
    if (s === false) {
        b.css("font-size", "");
        localStorage.removeItem("font-size");
    }
    else {
        let f;
        if (s === true) f = parseFloat(localStorage.getItem("font-size"));
        if (f == null || isNaN(f)) f = round(s * parseFloat(b.css("font-size")), 1);
        f = Math.min(64, Math.max(7, f));
        localStorage.setItem("font-size", f);
        b.css("font-size", f + "px");
    }
    metrics(1);
}

function msg(html, time) {
    /* Display a message to the user */
    if (!html) html = "Unable to load page."
    let b = $("body"), w = $(window);
    let e = $("<div>").addClass("Message").html(html).appendTo(b);
    let x = (w.width() - e.outerWidth()) / 2;
    e.css({left: `${x}px`}).on("click", () => e.remove()).fadeIn(500);
    setTimeout(() => {
        e.fadeOut(1500);
        setTimeout(() => {e.remove()}, 1600);
    }, time ? time : 2500);
}

function copy_or_open(ei) {
    // Enable copy/open operation on [data-echo] elements
    let echo = ei.attr("data-echo");
    let p = $("<p>").addClass("EchoControl").insertBefore(ei);
    let title  = ei.attr("data-title");
    if (title == "1") title = echo;
    echo = echo.split(".");
    echo = echo[echo.length - 1];
    if (!title) title = {
        html: "HTML Code",
        htm: "HTML Code",
        xml: "XML Code",
        py: "Python Code",
        text: "Plain Text",
        css: "CSS Code",
        js: "Javascript Code",
        json: "JSON Data",
        svg: "SVG Code",
        csv: "CSV Data",
        io: "Program Output",
    }[echo];
    if (!title) title = "Plain Text";
    p.html($("<span>").html(title).addClass("CodeTitle"));

    let span = $("<span>").addClass("Buttons").appendTo(p);
    title = {copy: "Copy to clipboard", new_tab: "Open in new browser tab", download: "Download"};
    for (let b of ["copy", "new_tab", "download"]) {
        $("<img>").attr({"data-echo": b, alt: b, title: title[b], src: `../media/${b}.svg`}).appendTo(span);
    }
}


/*** Navigation tree ***/

class CourseTree extends Tree {

onselect(e, event) {
    let feed = e.attr("data-feed");
    if (feed) page.load(feed);
}

}


/*** Page loading ***/

function page(data) {Object.assign(page._data, data)}

page._cache = {}

page.clear = () => {
    if (page._final) for (let f of page._final) {
        try {f()} catch(err) {console.warn(err)};
    }
    $("div.Message").remove();
    page._data = {};
    page._run = [];
    page._final = [];
    $("#Top button").removeClass("Selected");
    $("main").css({visibility: "hidden"});
}

page.jump = n => {
    let feeds = page._tree.feed_list();
    i = feeds.indexOf(page._feed) + n;
    if (i >= 0 && i < feeds.length) page.load(feeds[i]);
}

page.load = (feed, args) => {
    if (args == null) {
        [feed, args] = feed.split("@");
        if (args) args = qs_args(null, args);
    }
    if (page._cache[feed]) return page.onload(feed);
    console.log("Fetching page:", feed);
    fetch(feed + ".htm?_" + (new Date().getTime())).then(r => {
        if (r.ok) r.text().then(t => {
            page._cache[feed] = t;
            page.onload(feed, args);
        });
        else msg(`Unable to load page:<br/>${feed}`);
    });
}

page.onload = (feed, args) => {
    page.clear();

    // Update navigation tree
    let top = $("#Left ul.TreeTop > li > ul > li").removeClass("Hidden");
    page._tree.select(feed);
    if (feed.split("/").length > 1) top.filter(".Collapsed").addClass("Hidden");

    // Update browser history
    page._feed = feed;
    let hash = location.hash.substring(1);
    if (hash != feed) {
        let url = "./#" + feed;
        if (hash) history.pushState({}, "", url);
        else history.replaceState({}, "", url);
    }

    // Add page content to DOM and set page title
    let art = $("main > article").html(page._cache[feed]);
    let data = page._data;

    // Enable copy/open operation on .Code elements
    $(".IO").removeClass("IO").addClass("Code");
    $("pre.Code, pre.CodeScroll").attr({spellcheck: false});
    for (let e of $("[data-echo]")) copy_or_open($(e));

    // Append handouts section and remove teacher-only preview
    page.handouts(data);
    if (!teacher()) page.unpublish(art, data);

    // Embed YouTube videos
    page.video("main > article [data-yt]");

    // Draw icons
    for (let e of art.find("[data-icon]")) {
        e = $(e);
        e.prepend("<br/>").prepend(get_image(e.attr("data-icon"), 1));
    }

    args = args ? args.action : null;
    let after = () => { // Actions to perform after SVG2 scripts have run

        // Run page scripts
        for (let f of page._run) {
            try {f()} catch(err) {console.warn(err)};
        }
        page.vars();

        // Render TeX using MathJax, then fix page metrics
        mjax_render(art.find(".TeX"), 0, "2px").then(() => {
            metrics(1, args);
            setTimeout(() => {
                $("body, main").css({visibility: "visible"});
                metrics(1, args);
            }, 10);
        });
    }

    // Load SVG2 animations
    if (data.svg2) scripts(data.svg2).then(after);
    else after();
}

page.tab = () => $("#Top button.Selected").attr("data-action");
page.post = () => $("main article > section.Post").filter(`[data-action='${page.tab()}']`);

page.set_title = () => {
    let title = page.post().attr("data-title");
    if (!title) title = page._data.title;
    document.title = $("#MainTitle").html(title ? title : "Page").text();
}

page.unpublish = (art, data) => {
    /* Remove teacher-only content */

    // Midnight this morning
    let due, today = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Remove [data-show]
    if (data.s) art.find("[data-show='1']").attr("data-show", data.s);
    for (let e of art.find("[data-show]"))  {
        e = $(e);
        let due = new Date(e.attr("data-show"));
        if (due > today) e.remove();
    }
    // Remove [data-answers]
    if (data.a) {
        if (typeof(data.a) == "number") {
            let [y, m, d] = [today.getFullYear(), today.getMonth(), today.getDate()];
            data.a = `${y}.${m + 1}.${d + data.a}`;
        }
        art.find("[data-answers='1']").attr("data-answers", data.a);
    }
    for (let e of art.find("[data-answers]"))  {
        e = $(e);
        due = new Date(e.attr("data-answers"));
        if (due > today) e.find(".Answer").remove();
    }
}

page.handouts = data => {
    let [h, tab] = [data.handout, data.htab];
    if (!h) return;
    if (!(h instanceof Array)) h = [h];
    let p = $("<section>").addClass("Post").attr("data-action", tab ? tab : "links").appendTo("main > article");
    if (data.s || data.hshow) p.attr("data-show", data.hshow ? data.hshow : data.s);
    p = $("<p>").addClass("BtnGrid BtnLink").appendTo(p);
    let icons = {gdrv: 1, gdoc: 1, open: "link"};
    for (let item of h) {
        let [title, action] = item instanceof Array ? item : ["Assignment", item];
        if (typeof(action) == "string") action = {gdrv: action};
        if (!action.icon) for (let a in icons) if (action[a])
            action.icon = icons[a] == 1 ? a : icons[a];
        let btn = $("<button>").html(title).appendTo(p);
        for (let a in action) btn.attr("data-" + a, action[a]);
    }
}

page.video = s => {
/** Embed a <video> or YouTube <iframe> **/
    for (s of $(s)) {
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
        $("<p>").addClass("Center").html(v).appendTo(s);
    }
    aspect();
}

page.vars = () => {
    for (let e of $(".Var")) {
        e = $(e);
        e.html(page.vars.map[e.html()]);
    }
}

page.vars.map = {
    email: "david.maccarthy@eips.ca",
    currentYear: (new Date().getFullYear()),
}


/*** Page scripts ***/

page.run = (...args) => {for (let a of args) page._run.push(a)}
page.final = (...args) => {for (let a of args) page._final.push(a)}


/*** Initialize page and event handlers ***/

page.click = ev => {
    let e = $(ev.target);
    if (e.closest("nav").length || !page._feed) return;
    open_on_click(ev);
    let keys = ["feed", "open", "gdrv"], actions = {};
    for (let k of keys) {
        let a = "data-" + k;
        a = e.closest(`[${a}]`).attr(a);
        if (a) actions[k] = a;
    }
    if (actions.feed) page.load(actions.feed);
    if (actions.open) window.open(actions.open);
    if (actions.gdrv) window.open("https://drive.google.com/file/d/" + actions.gdrv);
    let echo = e.closest("[data-echo]");
    if (echo.length) code_echo(
        e.closest("p.EchoControl").next("pre[data-echo]"),
        ["copy", "new_tab", "download"].indexOf(echo.attr("data-echo"))
    );
    return true;
}


let courses = ["s10", "p20", "p30", "cs"];


$(() => {
    console.log("Teacher:", teacher());

    document.addEventListener("touchstart", swipe.event, {passive: true});
    document.addEventListener("touchend", swipe.event, {passive: true});

    let w = $(window).on("resize", metrics).on("click", page.click);
    w.on("popstate", ev => page.load(location.hash.substring(1)));
    // w.on("touchstart", swipe.event).on("touchend", swipe.event);
    w.on("keydown", ev => {
        ev = ev.originalEvent;
        let [key, code] = [ev.key, ev.code];
        let mod = (ev.shiftKey ? 1 : 0) + (ev.ctrlKey ? 2 : 0) + (ev.altKey ? 4 : 0);
        if ($("body").hasClass("Present")) slideshow.key(code, mod);
        else if (ev.ctrlKey) {
            if (ev.altKey) {
                if (key == 'n') window.open(location.href);
                else if (key == 'p') slideshow();
                else if (key == 't') {
                    let mode = 2 - parseInt(localStorage.getItem("teacher_mode"));
                    localStorage.setItem("teacher_mode", mode);
                    location.reload();
                };
            }
            else {
                if (code == "BracketLeft") page.jump(-1);
                else if (code == "BracketRight") page.jump(1);
            }
        }
    });

    $("#Top button[data-action='cal']").prepend(calendar_icon());
    // $("#Top button[data-action='review']").prepend(calendar_icon("←"));
    page.clear();
    let trees = [...fn_eval(x => x + "/tree", courses)];
    page._tree = new CourseTree("#Left > ul.TreeTop ul");
    page._tree.load(...trees).then(t => {
        let feed = location.hash.substring(1);
        if (feed) feed = feed.replace("cs_new/", "cs/");
        else feed = "home";
        t.select(feed.split('@')[0]);
        mjax_wait().then(() => {
            font_size(true);
            page.load(feed);
        });
    });
    let btns = $("#Top > p.BtnGrid > button").on("click", ev => {
        btns.removeClass("Selected");
        metrics(1, $(ev.currentTarget).attr("data-action"));
    });
});


/*** Appearance ***/

function wide() {return $("#Left").css("position") == "fixed"}

function arrange(sel) {
    let posts = $("main > article > section.Post").hide();
    let top = $("#Top > p.BtnGrid");
    let btns = top.children("button").hide();
    if (!sel) sel = btns.filter(".Selected").attr("data-action");
    for (let p of posts) {
        let a = $(p).attr("data-action");
        btns.filter(`[data-action='${a}']`).appendTo(top).show();
    }
    let noleft = !wide();
    if (!sel) sel = $(top.children("button").filter(":visible")[0]).attr("data-action");
    if (noleft) btns.filter(`[data-action='tree']`).prependTo(top).show();
    btns.removeClass(".Selected");
    btns.filter(`[data-action='${sel}']`).addClass("Selected");
    posts.filter(`[data-action='${sel}']`).show();
    let e = $("#Left");
    if (noleft && sel != "tree") e.hide();
    else e.show();
    e = $("#MainTitle");
    if (noleft && sel == "tree") e.hide();
    else e.show();
}

function metrics(force, sel) {
    /* Adjust margins, image sizes, etc. */
    if ($("body").hasClass("Present")) return;
    let fixed = wide();
    let left = $("#Left");
    let top = $("#Top");
    let w = fixed ? left.outerWidth() : 0;
    let wTop = $(window).width() - w;
    top.css({"margin-left": w, width: wTop + "px"});
    if (fixed != metrics.wide) {
        if (fixed && page._tree.find(page._feed).children("ul").length)
            $("#Top button[data-action='tree']").removeClass("Selected");
        metrics.wide = fixed;
        arrange(sel);
    }
    else if (force) arrange(sel);
    page.set_title();
    $("body").css({"margin-left": (w + 8) + "px", "margin-top" : (top.outerHeight() + 20) + "px"});
    svg_aspect();
    scroll_mjax();
    $(window).scrollTop(0);
}

function svg_aspect() {
    let svg = $("svg[data-aspect]");
    for (let e of svg) {
        e = $(e);
        let h = Math.round(parseFloat(e.css("width")) / jeval_frac(e.attr("data-aspect")));
        if (h) e.css({height: `${Math.round(h)}px`});
    }
}

function scroll_mjax() {
    for (let e of $("section.Post:visible p[data-latex]:visible").removeClass("AutoScroll")) {
        if (e.scrollWidth > e.clientWidth) $(e).addClass("AutoScroll");        
    }
}

function scroll_bottom(t) {
    let h = $("html");
    let y = h[0].scrollHeight - $(window).height();
    h.animate({scrollTop: y < 0 ? 0 : y}, t ? t : 500);
}


/*** Swipe handlers ***/

// console.warn("Swipe active!!");

function swipe(delta) {
    /* Go to next or previous page on horizontal swipe */
    let r = delta.mag(), a = delta.dir(), w = $(window).width();
    if (r > Math.min(150, 0.6 * w) && Math.abs(sin(a)) < 0.5) {
        let left = Math.abs(a) > 90;
        // $("main article").append(left ? "Next" : "Prev");
        page.jump(left ? 1 : -1);
    }
}

swipe.event = ev => {
    /* Record touchstart and dispatch touchend events */
    let coords = e => {
        e = e.changedTouches[0];
        return new RArray(e.clientX, e.clientY);
    }
    if (ev.type == "touchstart") swipe.xy = coords(ev);
    else if (ev.type == "touchend") {
        let [x, y] = coords(ev);
        swipe(coords(ev).minus(swipe.xy));
        delete swipe.xy;
    }
}


/*** Printing ***/

$(window).on("beforeprint", () => {
    window.printHide = $("#Top, #Left, .NoPrint:visible").hide();
    $("body").css({margin: "4px"});
}).on("afterprint", () => {
    window.printHide.show();
    metrics(1);
});


/*** Slideshow functions ***/

function slideshow() {
    $("#Top, #Left, #MainTitle, section.Post:not(:visible)").remove();
    $("body").addClass("Present").css({margin: "8px", "font-size": ""});
    let all_cues = slideshow.cues = [];
    let cues = $("main").css({"max-width": "100%"}).find("section.Post:visible").find(slideshow.select).hide();
    for (let c of cues) {
        if ($(c).attr("data-cue") == "prev") all_cues[all_cues.length - 1].push(c);
        else all_cues.push([c]);
    }
    let sections = slideshow.sections = [-1];
    for (let i=0;i<all_cues.length;i++) {
        let e = all_cues[i][0];
        if (e.tagName == "SECTION" || $(e).hasClass("SlideBreak")) sections.push(i);
    }
    sections.push(all_cues.length);
    slideshow.next_cue = 0;
    svg_aspect();
}

slideshow.select = "[data-cue=true], *:is(p, h2, h3, table, ol, ul, li, div, section):not([data-cue=none], :first-child)";

slideshow.scroll = (s) => {
    svg_aspect();
    scroll_mjax();
    if (s) scroll_bottom();
}

slideshow.next = (prev, t) => {
    if (t == null) t = 500;
    let i = slideshow.next_cue;
    let scroll = true;
    if (prev && i > 0) {
        let cues = slideshow.cues[--slideshow.next_cue];
        for (let c of cues) $(c).fadeOut(t);
    }
    else if (!prev && i < slideshow.cues.length) {
        let cues = slideshow.cues[slideshow.next_cue++];
        for (let c of cues) $(c).fadeIn(t);
    }
    else scroll = false;
    if (t) slideshow.scroll(scroll);
    console.log(`Cue: ${slideshow.next_cue - 1}`);
}

slideshow.goto = (n) => {
    n = Math.min(Math.max(0, n), slideshow.cues.length - 1);
    while (slideshow.next_cue > n+1) slideshow.next(1, 0);
    while (slideshow.next_cue <= n) slideshow.next(0, 0);
    slideshow.scroll(1);
}

slideshow.key = (key, mod) => {
    if (!mod) {
        let down = 1 + ["PageDown", "ArrowDown"].indexOf(key);
        let up = 1 + ["PageUp", "ArrowUp"].indexOf(key);
        let n = down ? 0 : (up ? 1 : -1);
        let sections = slideshow.sections;
        if (n > -1) {
            let i = slideshow.next_cue - 1;
            let s = 0;
            while (s < sections.length && i >= sections[s]) s++;
            if (s && up == 1) s -= 1;
            s = sections[n ? s - 1 : s];
            if (down == 2) s -= 1;
            slideshow.goto(s);
        }
        else if (key == "ArrowRight") slideshow.next();
        else if (key == "ArrowLeft") slideshow.next(1);
    }
}
