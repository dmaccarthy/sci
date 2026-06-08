/*** Miscellaneous functions ***/

// Date.prototype.days_since = function(d0) {
//     d0 = d0 == null ? new Date() : new Date(d0);
//     let t = this - d0;
//     return t / (24000 * 3600);
// }

function teacher() {
    return btoa(localStorage.getItem("teacher_code")) == teacher.code &&
        parseInt(localStorage.getItem("teacher_mode")) > 0;
}

teacher.code = 'Qnpya1I0cDd3bFFITThIbA==';

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

function svg_aspect() {
    let svg = $("[data-aspect]:is(svg, iframe)");
    for (let e of svg) {
        e = $(e);
        let h = Math.round(parseFloat(e.css("width")) / jeval_frac(e.attr("data-aspect")));
        if (h) e.css({height: `${Math.round(h)}px`});
    }
}

function font_size(s) {
    /* Adjust the font size */
    let b = $("body");
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
    page.metrics();
}

function scroll_mjax() {
    for (let e of $("section.Post:visible p[data-latex]:visible").removeClass("AutoScroll")) {
        if (e.scrollWidth > e.clientWidth) $(e).addClass("AutoScroll");        
    }
}


/*** SVG2 animations ***/

const css = SVG2.style;

let _eval = (t) => {
    let s = $("<script>").attr({type: "text/javascript"}).html(t);
    s.appendTo("head").remove();
}

async function scripts(args) {
    let p = [];
    let url = x => `../s27/${x}.js?_${new Date().getTime()}`;
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


/*** Navigation tree ***/

let _, home = {page: "home", title: "Mr. Mac’s Website", data: {}};

home.find = id => {
    if (id == "home") return home;
    let node = home;
    let path = id.split("/");
    for (let p of path) {
        let next;
        for (let item of node.items) if (item.page == p) next = item;
        if (next) node = next;
        else return;
    }
    return node;
}

home.item = (id, item) => {
    let node = home.find(id);
    if (node.items == null) node.items = [];
    node.items.push(item);
}

home.crumbs = id => {
    let p = $("<p>").html($("<a>").html("Home").attr("href", "#home")).addClass("Crumbs");
    if (id != "home") {
        let path = "";
        for (let item of id.split("/")) {
            path = path.length ? `${path}/${item}` : item;
            let pg = home.find(path);
            p.append(" / ");
            let a = $("<a>").html(pg.title).appendTo(p);
            // if (path != id)
            a.attr("href", "#" + path);
        }
    }
    $("#Top").html(p).append($("<p>").addClass("Icons"));
}

home.go = (id) => {
    let args;
    id = id.split('@');
    [id, args] = id;
    args = args == null ? {} : qs_args(args);
    if (page._cache[id]) {
        page.onload(id, args);
        return;
    }
    console.log("Fetching page:", id);
    fetch("../s27/" + id + ".htm?_" + (new Date().getTime())).then(r => {
        if (r.ok) r.text().then(t => {
            page._cache[id] = t;
            page.onload(id, args);
        });
        else {
            if (page.onload._current) page.onload(...page.onload._current);
            else home.go("home");
            msg(`Unable to load page:<br/>${id}`);
        }
    });
}

home.path = node => {
    if (typeof(node) == "string") node = home.find(node);
    if (node.page == "home") return "home";
    let p = "";
    while (node != home) {
        p = p.length ? `${node.page}/${p}` : node.page;
        node = node._parent;
    }
    return p;
}

home.sequence = () => {
    /* Link and sequence the tree of page nodes */

    let link = (node) => {
        if (node.items) for (let item of node.items) {
            item._parent = node;
            link(item);
        }
    }

    let next = (node) => {
        if (typeof(node) == "string") node = home.find(node);
        let items = node.items;
        if (items && items.length) return items[0];
        return next_sib(node);
    }

    let next_sib = (node) => {
        let p = node._parent;
        if (p) {
            let items = p.items;
            let i = items.indexOf(node);
            return i < items.length - 1 ? items[i + 1] : next_sib(p);
        }
    }

    link(home);
    home._seq = [];
    node = home;
    while (node) {
        home._seq.push(home.path(node));
        node = next(node);
    }
};


/*** Page rendering ***/

function page(data) {Object.assign(page._data, data)}

page._cache = {};
page.cal = {};

page.get = (k) => page._data[k]; 
page.run = (...args) => {for (let a of args) page._run.push(a)}
page.final = (...args) => {for (let a of args) page._final.push(a)}

page.clear = () => {
    if (page._final) for (let f of page._final) {
        try {f()} catch(err) {console.warn(err)};
    }
    delete page.init;
    page._run = [];
    page._final = [];
    page._data = {s: "9999.1.1", a: 1};
    $("div.Message").remove();
    $("main *:is(article, #MainTitle)").html("x");
}

page.unpublish = art => {
    /* Remove posts with future publication date */
    let t = new Date();
    for (let post of art.find("section.Post[data-show]")) {
        post = $(post);
        let s = post.attr("data-show");
        if (new Date(s == '1' ? page._data.s : s) > t) post.remove();
    }
    let a = page._data.a;
    if (a && new Date(a) > t) art.find(".Answer").remove();
}

page.onload = (id, args) => {
    clog(id, "page.onload...");
    /* Initialize a page when HTML content is loaded */

    // Update browser history
    page.onload._current = [id, args];
    let hash = location.hash.substring(1);
    if (hash != id) {
        let url = "./#" + id;
        if (hash) history.pushState({}, "", url);
        else history.replaceState({}, "", url);
    }

    // Clear old page and get new page data
    page.clear();
    let data = page._data;
    let feed = home.find(id);
    if (feed.data) Object.assign(data, feed.data);

    // Show location
    document.title = $("#MainTitle").html(feed.title).text();
    home.crumbs(id);

    // Add HTML content to DOM
    let hide = {visibility: "hidden"};
    $("#MainTitle").css(hide);
    let art = $("main > article").css(hide).html(page._cache[id]);
    if (!teacher()) page.unpublish(art);
    page.posts(art);

    // Run initialization function
    if (page.init) {
        try {page.init()} catch(err) {console.warn(err)};
    }

    // Embed YouTube videos
    page.video("main > article *[data-yt]");

    // Create calendar
    for (let e of art.find("[data-cal]")) page.calendar(e);

    // Render SVG2 and TeX
    mjax_wait().then(() => {
        let after_svg = () => {
            let show = () => {
                let vis = {visibility: "visible"};
                $("#MainTitle").css(vis);
                art.css(vis);
                page.show_post(0);
            }
            mjax_render(art.find(".TeX"), 0, "2px").then(() => {
                show();
                if (page._run) for (let f of page._run) {
                    try {f()} catch(err) {console.warn(err)};
                }
            clog("onload Done!");
            });
        }
        if (data.svg2) scripts(data.svg2).then(after_svg);
        else after_svg();
    });
}

page.calendar = e => {
    /* Render the course calendar*/

    e = $(e);
    let crse = e.attr("data-cal");
    let cal = [];
    for (let item of page.cal[crse]) { // Non-lesson items
        let a = [...item];
        if (a.length == 2) a.push({});
        a[0] = new Date(a[0]);
        cal.push(a);
    }
    for (let item of home._seq) if (item.split("/")[0] == crse) { // Lessons
        let node = home.find(item);
        let data = node.data;
        let t = data ? (data.cal ? data.cal : data.s) : null;
        if (t) {
            let a = [new Date(t), node.title, {f: "./#" + item}];
            if (node.data) Object.assign(a[2], node.data);
            cal.push(a);
        }
    }
    cal.sort((a, b) => {
        a = a[0]; b = b[0];
        return a == b ? 0 : (a < b ? -1 : 1);
    });

    // Create the table
    let tbl = $("<table>").addClass("Calendar").appendTo(e);
    let tr = $("<tr>").appendTo($("<thead>").appendTo(tbl));
    tr.append($("<th>").html("Date"));
    tr.append($("<th>").html("Description"));
    tbl = $("<tbody>").appendTo(tbl);

    let old = x => new Date(x[0]) <= new Date();
    let show = teacher() ? x => 1 : x => new Date(x[0]) < new Date("9000");
    let date = d => {
        let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
        let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
        return `${day}, ${mon} ${d.getDate()}`;
    }

    for (let item of cal) if (show(item)) {
        tr = $("<tr>").appendTo(tbl);
        if (old(item)) tr.addClass("Old").hide();
        $("<td>").html(date(item[0])).appendTo(tr);
        let t = item[1];
        if (t.charAt(0) == '@') t = "Lesson: " + t.substring(1);
        let data = item[2];
        let link = data.f;
        t = (link ? $("<a>").attr({href: link}) : $("<span>")).html(t);
        $("<td>").html(t).appendTo(tr);
        if (data.class) t.addClass(data.class);
        if (data.css) t.css(data.css);
        if (data.attr) t.attr(data.attr);
    }
    let a = $("<a>").addClass("Link").html("Show / Hide Past Events").on("click", () => tbl.find("tr.Old").toggle());
    $("<p>").addClass("Center").append(a).appendTo(e);
}

page.icon = k => {
    if (k == "Calendar") return calendar_icon();
    if (k.split(' ')[0] == "Coding") k = "vscode";
    let img = {notes: "slides", assignment: "assign"}[k.toLowerCase()];
    if (!img) {
        console.warn(`Guessing icon: '${k}'`);
        img = k;
    }
    if (img.indexOf('.') == -1) img += ".svg";
    return $("<img>").attr({src: `../media/${img}`});
}

page.posts = (art) => {
    /* Create links to individual posts */
    let e = $("#Top > p.Icons");
    let posts = page._posts = art.children("section.Post");
    if (posts.length < 2) {
        e.hide();
        return;
    }
    for (let p of posts) {
        p = $(p);
        let a0 = p.attr("data-action");
        let a = {slides: "Notes", correct: "Assignment", anim: "Animation"}[a0];
        if (!a) a = a0;
        a = a.charAt(0).toUpperCase() + a.substring(1);
        let btn = $("<button>").attr("data-action", a0).appendTo(e);
        btn.html(page.icon(a)).append(a);
    }
    e.show();
}

page.video = s => {
    /* Embed a <video> or YouTube <iframe> */
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
    // aspect();
}

page.metrics = () => {
    let h = $("#Top").height();
    $("body").css("margin-top", `${h + 24}px`);
    svg_aspect();
    scroll_mjax();
}

page.show_post = n => {
    clog(n, "page.show_post...");
    try {
    let i = 0;
    for (let p of page._posts.hide()) {
        p = $(p);
        if (i == n || p.attr("data-action") == n) {
            p.fadeIn();
            $($("#Top > p.Icons > button").removeClass("Selected")[i]).addClass("Selected");
        }
        i++;
    }
    page.metrics();
    $(window).scrollTop(0);
    }
    catch(err) {$("body").html(err)}
    clog("show_post Done!");
}

page.menu = (u, menu) => {
    /* Create a menu in a <ul> */
    let ul = $("main > article").find(menu ? menu : "ul.Menu");
    for (let item of home.find(u).items) {
        let a = $("<a>").html(item.title).attr({href: '#' + (u == "home" ? '' : `${u}/`) + item.page});
        let li = $("<li>").html(a).appendTo(ul);
    }
}

page.jump = n => {
    n += home._seq.indexOf(home.path(page.onload._current[0]));
    if (n >= 0 && n < home._seq.length) home.go(home._seq[n]);
}

$(() => {
    console.log("Teacher:", teacher());
    home.sequence();
    home.go(location.hash.substring(1));
    $("#Top").on("click", ev => {
        let a = $(ev.target).attr("data-action");
        if (a) page.show_post(a);
    })
});

$(() => {
    let w = $(window).on("popstate", ev => home.go(location.hash.substring(1)));
    w.on("resize", page.metrics);
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
    w.on("click", ev => {
        let feed = $(ev.target).closest("[data-feed]").attr("data-feed");
        if (feed) home.go(feed);
    });
});

function clog(x) {
    $("#Cons").append($("<p>").html(x));
}
