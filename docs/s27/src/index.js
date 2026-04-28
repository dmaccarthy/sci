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


/*** Image library ***/

function get_image(key, element) {
    // Get image URL from @key
    if (key == "today") return calendar_icon.url();
    img = get_image.map[key];
    if (!img) {
        img = `../../media/${key}`;
        if (key.indexOf(".") == -1) img += ".svg";
    }
    if (element && img) img = $("<img>").attr({src: img, alt: key});
    return img;
}

get_image.map = {
    sal: "../../media/sal.webp",
    bs: "https://s.brightspace.com/lib/branding/1.0.0/brightspace/favicon.svg",
    ps: "https://powerschool.eips.ca/favicon-196x196.png",
    python: "https://www.python.org/static/favicon.ico",
};


/*** Miscellaneous functions ***/

// function go_current() {
//     let feed = $($("section.Post[data-action='cal'] tr[data-feed]:not(.Old)")[0]).attr("data-feed");
//     if (feed) page.load(feed);
// }

function font_size(s) {
    let b = $("body");
    let f = round(s * parseFloat(b.css("font-size")), 1)
    b.css("font-size", Math.min(64, Math.max(7, f)));
    metrics(1);
}

function msg(html, time) {
    /* Display a message to the user */
    if (!html) html = "Unable to load page."
    let b = $("body"), w = $(window);
    let e = $("<div>").addClass("Message").html(html).appendTo(b);
    let x = (w.width() - e.outerWidth()) / 2;
    e.css({left: `${x}px`});
    e.fadeIn(500);
    setTimeout(() => {
        e.fadeOut(1500);
        setTimeout(() => {e.remove()}, 1600);
    }, time ? time : 2500);
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
    page._data = {};
    page._run = [];
    $("#Top button").removeClass("Selected");
    $("main").css({visibility: "hidden"});
}

page.jump = n => {
    let feeds = page._tree.feed_list();
    i = feeds.indexOf(page._feed) + n;
    if (i >= 0 && i < feeds.length) page.load(feeds[i]);
}

page.load = (feed) => {
    if (page._cache[feed]) return page.onload(feed);
    console.log("Fetching page:", feed);
    fetch(feed + ".htm?_" + (new Date().getTime())).then(r => {
        if (r.ok) r.text().then(t => {
            page._cache[feed] = t;
            page.onload(feed);
        });
    });
}

page.onload = (feed) => {
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
    let title = data.title;
    document.title = $("#MainTitle").html(title ? title : "Page").text();

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

    let after = () => { // Actions to perform after SVG2 scripts have run

        // Run page scripts
        for (let f of page._run) f();

        // Render TeX using MathJax, then fix page metrics
        mjax_render(art.find(".TeX"), 0, "2px").then(() => {
            metrics(1);
            setTimeout(() => $("body, main").css({visibility: "visible"}), 10);
        });
    }

    // Load SVG2 animations
    if (data.svg2) scripts(data.svg2).then(after);
    else after();
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

/*

    // Page and site variables
    apply(".Var", (ei) => {
        let html = ei.html();
        html = data[html] ? data[html] : siteData[html];
        ei.html(html);
    });


    // Enable copy/open operation on .Code elements
    $(".IO").removeClass("IO").addClass("Code");
    $("pre.Code, pre.CodeScroll").attr({spellcheck: false});
    $("[data-echo=copy]").attr("data-echo", "text");
    apply("[data-echo]", copy_or_open);


*/



/*** Page scripts ***/

page.run = (...args) => {for (let a of args) page._run.push(a)}


/*** Initialize page and event handlers ***/

page.click = ev => {
    let e = $(ev.target);
    if (e.closest("nav").length || !page._feed) return;
    let keys = ["feed", "open", "gdrv"], actions = {};
    for (let k of keys) {
        let a = "data-" + k;
        a = e.closest(`[${a}]`).attr(a);
        if (a) actions[k] = a;
    }
    if (actions.feed) page.load(actions.feed);
    if (actions.open) window.open(actions.open);
    if (actions.gdrv) window.open("https://drive.google.com/file/d/" + actions.gdrv);
}


let courses = ["s10", "p20", "p30", "cs"];

$(() => {
    console.log("Teacher:", teacher());
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
    page.clear();
    let trees = [...fn_eval(x => x + "/tree", courses)];
    page._tree = new CourseTree("#Left > ul.TreeTop ul");
    page._tree.load(...trees).then(t => {
        let feed = location.hash.substring(1);
        if (!feed) feed = "home";
        t.select(feed);
        mjax_wait().then(() => page.load(feed));
    });
    let btns = $("#Top > p.BtnGrid > button").on("click", ev => {
        btns.removeClass("Selected");
        $(ev.currentTarget).addClass("Selected");
        arrange();
        metrics(1);
    });
});


/***  Swipe handler ***/

// function swipe(x, y) {
//     if (x * x > 20000 && Math.abs(x) > 2 * Math.abs(y)) page.jump(x > 0 ? -1 : 1);
// }

// swipe.event = ev => {
//     let coords = e => {
//         e = e.changedTouches[0];
//         return new RArray(e.screenX, e.screenY);
//     }
//     if (ev.type == "touchstart") swipe.xy = coords(ev);
//     else if (ev.type == "touchend") {
//         let delta = coords(ev).minus(swipe.xy);
//         swipe(...delta);
//         delete swipe.xy;
//     }
// }


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
    $("body").addClass("Present").css({margin: "8px"});
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
