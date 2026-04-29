class Tree {

constructor(sel, keys) {
    this._keys = keys ? keys : ["id", "data-id",  "data-feed"];
    this.home$ = $($(sel)[0]);
    this.top$ = this.home$.closest(".TreeTop").on("click", ev => this.onclick(ev));
}

async load(...args) {
    let req = [], data = {};
    for (let a of args) {
        console.log("Fetching tree:", a);
        let url = `${a}.htm?_${new Date().getTime()}`;
        req.push(fetch(url).then(r => r.text()).then(t => {data[a] = t}));
    }
    for (let r of req) await r;
    for (let a of args) this.home$.append(data[a]);
    return this;
}

find(id) {
    if (id instanceof HTMLElement) return id;
    for (let k of this._keys) {
        let e = this.top$.find(`[${k}='${id}']`);
        if (e.length) return e;
    }
    return this.top$.find(id);
}

parent(id) {
    let e = this.find(id).parent();
    return e[0] == this.top$[0] ? null : e.closest("li");
}

path(id) {
    let e = this.find(id);
    let p = [];
    while (e != null) {
        p.push(e);
        e = this.parent(e);
    }
    return p.reverse();
}

select(id) {
    this.top$.find("li").addClass("Collapsed").removeClass("Selected");
    let e = this.find(id).addClass("Selected");
    for (e of this.path(e)) e.removeClass("Collapsed");
}

onclick(event) {
    let e = $(event.target).closest("a").closest("li");
    this.select(e);
    this.onselect(e, event);
}

onselect(e, event) {
    console.log(e[0]);
}

feed_list() {
    let all = [];
    for (let e of this.home$.find("[data-feed]")) {
        e = $(e);
        if (e.closest(".Hidden").length == 0) all.push(e.attr("data-feed"));
    }
    return all;
}

}

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


/*** Appearance ***/

function metrics(force) {
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
        arrange();
    }
    else if (force) arrange();
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
        // console.log(e, e.scrollWidth, e.clientWidth);
        if (e.scrollWidth > e.clientWidth) $(e).addClass("AutoScroll");        
    }
}

function scroll_bottom(t) {
    let h = $("html");
    let y = h[0].scrollHeight - $(window).height();
    h.animate({scrollTop: y < 0 ? 0 : y}, t ? t : 500);
}
