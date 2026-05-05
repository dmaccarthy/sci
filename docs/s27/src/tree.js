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
    this.top$.find("ul").removeClass("LeftBorder");
    let e = this.find(id).addClass("Selected");
    if (e.children("ul").addClass("LeftBorder").length == 0)
        e.closest("ul").addClass("LeftBorder");
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
