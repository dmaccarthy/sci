let _;

function nav_overflow(t) {
    clearTimeout(nav_overflow.timer);
    nav_overflow.timer = setTimeout(() => {
        let nav = $("#Top");
        let b = $("body").removeClass("NavOverflow");
        if (nav[0].scrollHeight > nav.height() + 12) b.addClass("NavOverflow");
    }, t ? t : 50);
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
    let post = typeof(id) == "number" ? $(posts[id]) : posts.filter(`[data-icon="${id}"]`);
    $("main, #Copy").css({visibility: "visible"});
    post.fadeIn();
    return posts;
}

function nav_icons(posts) {
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
    if (page_info.index[key] == null) {
        console.log(`Fetching index: ${key}`);
        await fetch(key + "/index.json").then(r => r.ok ? r.json() : {}).then(j => page_info.index[key] = j);
    }
}

async function fetch_page(id) {
    let h = fetch_page.cache[id];
    if (h) return h;
    console.log(`Fetching page: ${id}`);
    return fetch(`${id}.htm`).then(r => r.ok ? r.text() : null);
}

fetch_page.cache = {};

function load_page(id) {
    clear_page();
    let key = id.split("/")[0];
    fetch_index(key).then(() => fetch_page(id).then(h => {
        if (h == null) {
            if (!load_page.current) load_page("home");
            return;
        }
        if (!fetch_page.cache[id]) fetch_page.cache[id] = h;

        // Get page info
        let info = page_info.index[key][id.substring(key.length + 1)];
        if (info) Object.assign(page_info.data, info);
        info = page_info.data;

        // Update history
        load_page.current = id;
        id = `#${id}`;
        if (load_page.current) history.pushState({}, "", id);
        else history.replaceState({}, "", id);

        // Display page and remove unpublished elements
        let main = $("main").html(h);
        for (let e of main.find("[data-show]")) {
            e = $(e);
            let s = e.attr("data-show");
            if (!is_after(s == "1" ? info.s : s)) e.remove();
        }
        for (let e of main.find("[data-answer]")) {
            e = $(e);
            let s = e.attr("data-answer");
            if (!is_after(s == "1" ? info.a : s)) e.find(".Answer").remove();
        }

        // Set title
        let title = info.t ? info.t : "Mr. Mac’s Website";
        if (title.charAt(0) == "@") title = title.substring(1);
        $(".Title").html(title);
        document.title = $("h2.Title").text();

        // Run scripts
        if (info.scripts) scripts(info.scripts).then(console.log);
        if (info.run) {
            for (let r of info.run) r();
        }

        // Finish up
        nav_icons(show_section(0));
        nav_overflow();
        mjax_wait().then(mjax_render);
    }));
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

// async function get_script(url) {
//     console.log(`Fetching script: ${url}`);
//     return fetch(url).then(r => r.ok ? r.text() : null).then(t => {
//         if (t) eval(t);
//     });
// }

async function scripts(args) {
    let p = [];
    for (let a of args) if (!scripts.cache[a[1]]) {
        a = a[1];
        scripts.cache[a] = true;
        p.push(fetch(a + ".js").then(r => r.ok ? r.text() : null).then(t => t ? eval(t) : null));
    }
    for (let a of p) await a;
    for (let [s, js, key, a] of args) scripts.cache[js][key](s, a);
}

scripts.cache = {};

function page_svg2(...args) {page_info.data.scripts = args}
function page_run(...args) {page_info.data.run = args}

let css = SVG2.style;

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

    $(window).on("resize", nav_overflow).on("click", ev => {
        let feed = $(ev.target).attr("data-feed");
        if (feed) load_page(feed);
    });

    let page = location.hash.substring(1);
    load_page(page ? page : "home");
    setTimeout(nav_overflow, 2000);
});
