let _;
const home_folder = ".";

function nav_overflow(t) {
    // Add 'NavOverflow' class to <body> if content overflows #Top <nav>
    clearTimeout(nav_overflow.timer);
    if (!t) t = 5;
    let nav = $("#Top");
    let b = $("body").removeClass("NavOverflow");
    if (nav[0].scrollHeight > nav.height() + 12) b.addClass("NavOverflow");
    if (t < 5000) {
        t *= 2;
        nav_overflow.timer = setTimeout(() => nav_overflow(t), t);
    }
}

function page_info(info) {
    Object.assign(page_info.data, info);
}

page_info.index = {};

function clear_page() {
    let hide = {visibility: "hidden"};
    $("main").css(hide).html("");
    $("#Copy").css(hide);
    page_info.data = {};
}

function show_section(id) {
    let posts = $("main > section.Post").hide();
    if (typeof(id) == "number") id = $(posts[id]).attr("data-icon");

    let icons = $("#Top span.Right span[data-action]").removeClass("Selected");
    icons.filter(`[data-action=${id}]`).addClass("Selected");

    $("main, #Copy").css({visibility: "visible"});
    posts.filter(`[data-icon="${id}"]`).fadeIn();
    scroll_mjax();
    return posts;
}

function nav_icons(posts) {
    // Initialize navigation icons in #Top <nav>
    let info = page_info.data;
    let spans = $("#Top span.Left span[data-action]").addClass("Inactive");
    for (let k of ["up", "prev", "next"]) {
        if (info[k.charAt(0)]) spans.filter(`[data-action="${k}"]`).removeClass("Inactive");
    }
    spans = $("#Top span.Right span[data-action]").addClass("Inactive");
    for (let span of spans) {
        span = $(span);
        let action = span.attr("data-action");
        if (posts.filter(`[data-icon="${action}"]`).length) span.removeClass("Inactive");
    }
}

async function fetch_index(key) {
    // Load course index into page_info.index object
    if (page_info.index[key] == null) {
        console.log(`Fetching: ${home_folder}/${key}/index.json`);
        await fetch(`${home_folder}/${key}/index.json`).then(r => r.ok ? r.json() : {}).then(j => page_info.index[key] = j);
    }
}

async function fetch_page(id) {
    // Get HTML for requested page
    let h = fetch_page.cache[id];
    if (h) return h;
    console.log(`Fetching: ${home_folder}/${id}.htm`);
    return fetch(`${home_folder}/${id}.htm`).then(r => r.ok ? r.text() : null);
}

fetch_page.cache = {};

function load_images() {
    // Add @src to <img> elements
    let imgs = $("[data-img]");
    for (let img of imgs) {
        img = $(img);
        let src = img.attr("data-img");
        img.removeAttr("data-img");
        if (img[0].tagName != "IMG") img = $("<img>").attr({alt: src}).appendTo(img);
        img.attr({src: get_image(src)})
    }
}

function get_image(key) {
    // Get image URL from @key
    let img = data_images[key];
    if (!img) {
        img = `../media/${key}`;
        if (key.indexOf(".") == -1) img += ".svg";
    }
    return img;
}

function teacher() {
    // Check for teacher mode
    let c = localStorage.getItem("disable_teacher") ? false : localStorage.getItem("teacher_code") == atob("Qnpya1I0cDd3bFFITThIbA==");
    console.log(`Teacher: ${c}`);
    return c;
}

function unpublish(h, info) {
    // Remove elements with future publish dates
    h = $("<div>").html(h);
    for (let e of h.find("[data-show]")) {
        e = $(e);
        let s = e.attr("data-show");
        if (!is_after(s == "1" ? info.s : s)) e.remove();
    }
    for (let e of h.find("[data-answer]")) {
        e = $(e);
        let s = e.attr("data-answer");
        if (!is_after(s == "1" ? info.a : s)) e.find(".Answer").remove();
    }
    return h[0].innerHTML;
}

function load_page(id, pop) {
    clear_page();
    let key = id.split("/")[0];
    fetch_index(key).then(() => fetch_page(id).then(h => {
        if (h == null) {
            if (!load_page.current) load_page("home");
            return;
        }

        // Get page info
        let info = page_info.index[key][id.substring(key.length + 1)];
        if (info) Object.assign(page_info.data, info);
        info = page_info.data;

        // Display page
        if (!teacher()) h = unpublish(h, info);
        if (!fetch_page.cache[id]) fetch_page.cache[id] = h;
        $("main").html(h);
        $("#Top span.Right").css({visibility: "visible"})

        // Update history
        load_page.current = id;
        id = `#${id}`;
        if (!pop) {
            if (load_page.current) history.pushState({}, "", id);
            else history.replaceState({}, "", id);
        }

        // Set title
        let title = info.t ? info.t : "Mr. Mac’s Website";
        if (title.charAt(0) == "@") title = title.substring(1);
        $(".Title").html(title);
        document.title = $("h2.Title").text();

        // Run scripts
        if (info.scripts) scripts(info.scripts).then(svg_aspect);
        if (info.run) {
            for (let r of info.run) r();
        }

        // Finish up
        load_images();
        $("._Present").removeClass("_Present").addClass("Present");
        nav_icons(show_section(0));
        nav_overflow();
        mjax_wait().then(mjax_render).then(scroll_mjax);
    }));
}

function scroll_mjax() {
    for (let e of $("section.Post p[data-latex]").filter(":visible").removeClass("AutoScroll"))
        if (e.scrollWidth > e.clientWidth) $(e).addClass("AutoScroll");        
}

function svg_aspect() {
    let svg = $("svg[data-aspect]");
    for (let e of svg) {
        e = $(e);
        let h = Math.round(parseFloat(e.css("width")) / jeval_frac(e.attr("data-aspect")));
        e.css({height: `${Math.round(h)}px`});
    }
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

async function scripts(args) {
    let p = [];
    for (let a of args) if (!scripts.cache[a[1]]) {
        a = a[1];
        scripts.cache[a] = true;
        console.log(`Fetching: ${home_folder}/${a}.js`);
        p.push(fetch(`${home_folder}/${a}.js`).then(r => r.ok ? r.text() : null).then(t => t ? eval(t) : null));
    }
    for (let a of p) await a;
    for (let [s, js, key, a] of args) scripts.cache[js][key](s, a);
}

scripts.cache = {};

function page_svg2(...args) {page_info.data.scripts = args}
function page_run(...args) {page_info.data.run = args}

let css = SVG2.style;

function key_mod(ev) {
    return (ev.shiftKey ? 1 : 0) + (ev.ctrlKey ? 2 : 0) + (ev.alttKey ? 4 : 0);
}

$(() => {
    $("#Top").on("click", ev => {
        let e = $(ev.target);
        if (!e.hasClass("Inactive")) {
            let a = e.attr("data-action");
            let n = a ? ["up", "prev", "next"].indexOf(a) : -2;
            if (n == -1) {
                if (!$(`main section.Post[data-icon='${a}']`).is(":visible")) show_section(a);
            }
            else {
                let pg = page_info.data["upn".charAt(n)];
                if (pg) load_page(pg);
            }
        }
    });

    $(window).on("popstate", () => {
        load_page(location.hash.substring(1), true);
    }).on("resize", () => {
        nav_overflow();
        svg_aspect();
        scroll_mjax();
    }).on("click", ev => {
        let feed = $(ev.target).closest("[data-feed]");
        if (feed.length) {
            load_page(feed.attr("data-feed"));
        }
    }).on("keydown", ev => {
        let mod = key_mod(ev);
        if (mod && 6) { // Ctrl + Alt
            let key = ev.originalEvent.key;
            if (key == "t") {
                let t = localStorage.getItem("disable_teacher");
                if (t) localStorage.removeItem("disable_teacher");
                else localStorage.setItem("disable_teacher", 1);
                location.reload();
            }
        }
    });

    let page = location.hash.substring(1);
    load_page(page ? page : "home");
    nav_overflow();
});

window.onbeforeprint = () => {
    $("#Top, #Copy").hide();
    $("h2.Title").show();
}

window.onafterprint = () => location.reload();
