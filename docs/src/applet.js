/* © 2023-2024 by D.G. MacCarthy <sc8pr.py@gmail.com> */

const applet = {}; //style: (name, id) => applet.style[name].replaceAll("$", id)};

applet.graph = (sel, opt) => { // Draw a grid with labelled axes
    // Calculate margins and create SVG_Animation object
    let grid = opt.grid;
    let lrbt = opt.lrbt;
    if (!lrbt) {
        let [mx1, mx2, my1, my2] = opt.margin;
        let [x1, x2, dx] = grid[0];
        let [y1, y2, dy] = grid[1];
        dx = x2 - x1;
        dy = y2 - y1;
        lrbt = [x1 - mx1 * dx, x2 + mx2 * dx, y1 - my1 * dy, y2 + my2 * dy];
    }
    let svg = new SVG_Animation(sel, ...lrbt);

    // Draw grid and axes
    svg.grid(...grid);
    let g = svg.group().addClass("Axes");
    for (let i=0;i<2;i++) {
        let a = applet.graph.tick(svg, opt, grid, i);
        if (a) svg.axis(a, g);
    }
    return svg;
}

applet.graph.tick = (svg, opt, grid, i) => {
    let axis = i ? opt.y : opt.x;
    if (axis == null) return;
    let tick = axis[2];
    tick = tick ? {ticks: tick} : {};
    let gr = tick[i ? "y" : "x"] = [grid[i][0], grid[i][1]];
    let pos = [...axis[1]], c = pos[i], s = pos[1-i];
    if (typeof(c) == "string") {
        if (c == "^") pos[i] = (gr[0] + gr[1]) / 2;
        else if (c == "<") pos[i] = gr[0];
        else if (c == ">") pos[i] = gr[1];
    }
    if (typeof(s) == "string") pos[1-i] = parseFloat(s) * (i ? svg.pixelX : svg.pixelY);
    tick.title = {text: axis[0], position: pos};
    return tick;
}


applet.energygraph = {

graph: (sel, opt) => { // Draw a bar graph in the SVG element
    opt = Object.assign({yTitle: "Energy / J", fixed: 0, dE: 1, minor: 1, total: 1}, opt);
    if (!opt.interval) opt.interval = opt.dE;
    let n = 2 * opt.sym.length;
    let lrbt = [opt.xMargin[0], n + opt.xMargin[1], opt.yMargin[0], opt.Emax + opt.yMargin[1]];
    let svg = new SVG_Animation(sel, ...lrbt);
    svg.grid([0, n], [0, opt.Emax, opt.dE/ opt.minor]);
    let axes = svg.group().addClass("Axes");
    svg.axis({x: [0, n]}, axes);
    svg.axis({y: [0, opt.Emax],
        title: {text: opt.yTitle, position: [lrbt[0] + 4 * svg.pixelX / 2, opt.Emax]},
        ticks: {interval: opt.interval, length: "8", fixed: opt.fixed, offset: ["-12", 0]},
    }, axes);
    svg.opt = opt;
    if (opt.calc) {
        svg.duration = opt.duration ? opt.duration : 5;
        svg.barData = new RArray(opt.sym.length); //...opt.calc(0));
    }
    else svg.barData = new RArray(...opt.data);
    applet.energygraph.initBars(svg);
    svg.$.find("text.TitleY").css("dominant-baseline", "hanging");

    let metrics = (text) => {
        // Estimate subscript width to centre label
        let s = $("<span>").addClass("SymbolMetrics").html(text);
        let attr = {"font-size": `${0.8 * 18}px`};
        if (typeof(text) != "number") attr["font-style"] = "italic";
        s.css(attr).appendTo("body");
        let sz = [s.width(), s.height()];
        s.remove();
        return sz;
    }
    
    let sym = svg.group().addClass("Labels");
    let y = -18 * svg.pixelY;
    for (let i=0;i<opt.sym.length;i++) {
        let s = opt.sym[i].replaceAll("-", "–").split("_");
        let w = 0;
        let attr = {scale: 0.8};
        if (s.length > 1) {
            attr.q4 = s[1];
            w = metrics(s[1], 1)[0] / 2;
        }
        let g = svg.symbol(s[0], attr, [2 * i + 1 - w * svg.pixelX, y], sym);
        attr = opt.colors && opt.colors[i] ? {fill: opt.colors[i]} : {};
        g.$.find("text").addClass("Symbol").css(attr);
    }
    
    svg.beforeupdate = function() {
        if (this.opt.calc) {
            let t = this.time / this.duration;
            if (t > 1) {
                this.pause();
                t = 1;
                this.time = this.duration;
            }
            this.barData = new RArray(...this.opt.calc(t));
        }
        applet.energygraph.barSize(this);
    }

    return svg.update(0);
},

initBars: (svg) => {
    let g = svg.group().addClass("Bars").after("g.Grid");
    let n = svg.barData.length;
    let c = svg.opt.colors;
    for (let i=0;i<n;i++) {
        let bar = svg.rect([1, 20], [1 + 2 * i, 0], g);
        if (c && c[i]) bar.attr({style: `fill: ${c[i]}`});
    }
    svg.final().line([0, 0], [2 * n, 0], g).addClass("TotalEnergy");
},

barSize: (svg) => {
    let data = new RArray(...svg.barData);
    if (svg.opt.total) {
        let E = data.sum();
        svg.items[0].setPoints([[0, E], [2 * data.length, E]], 1);
    }
    let bars = svg.$.find("g.Bars rect");
    let zero = svg.a2p(0, 0)[1];
    let f = svg._f;
    for (let i=0;i<data.length;i++) {
        let h = data[i];
        let b = $(bars[i]);
        if (h <= 0) b.hide();
        else {
            h *= Math.abs(svg.scaleY);
            b.attr({height: f(h), y: f(zero-h)}).show();
        }
    }
},

click: (sel) => {
    $(sel).on("click", () => {
        let svg = $(sel)[0].graphic;
        if (svg.time < svg.duration) svg.toggle();
        else {
            svg.pause();
            svg.time = 0;
            svg.update(0);
        }
    })
},

};

ebgCalc = (id) => ebgCalc.fn[id];


applet.vecDiagram = {

vectors: function (svg, vectors, opt, parent) { // Draw a sequence of vector addends
    // opt = {arrow: {tail, head, angle, shape}, shift, vector, resultant, component, res_component}
    if (!opt) opt = {};
    let arrow = Object.assign({tail: 8 * svg.pixelX}, opt.arrow);
    let shift = opt.shift ? opt.shift : [0, 0];
    let tail = new RArray(...shift);
    for (let v of vectors) {
        if (v[0] || v[1]) {
            v = tail.plus(v);
            if (v[0] || v[1]) {
                if (opt.component) {
                    let pt = [v[0], tail[1]];
                    if (v[0]) svg.arrow(tail, pt, arrow, parent).addClass("Component");
                    if (v[1]) svg.arrow(pt, v, arrow, parent).addClass("Component");
                }
            }
            if (opt.vector != false) svg.arrow(tail, v, arrow, parent).addClass("Vector");                
        }
        tail = v;
    }
    if (vectors.length > 1 && (tail[0] || tail[1])) {
        if (opt.res_component) {
            let pt = [tail[0], shift[1]];
            svg.arrow(shift, pt, arrow, parent).addClass("Res_Component");
            svg.arrow(pt, tail, arrow, parent).addClass("Res_Component");
        }
        if (opt.resultant) svg.arrow(shift, tail, arrow, parent).addClass("Resultant");
    }
},

diagram: function(sel, vectors, options, scale, x1, y1) {
    let ar = $(sel);
    ar = ar.attr("width") / ar.attr("height");
    let grid = options.grid ? options.grid : 20;
    // if (scale == null) [scale, x1, y1] = applet.vecDiagram.auto(vectors, grid, options);
    let x2 = x1 + grid * scale;
    let y2 = y1 + grid / ar * scale;
    let svg = new SVG_Animation(sel, x1, x2, y1, y2, 1);
    svg.grid([x1, x2, scale], [y1, y2, scale], options.omitAxes);
    applet.vecDiagram.vectors(svg, vectors, options, svg.group());
    let n = Math.floor(log(scale, 10));
    if (scale >= Math.pow(10, n + 1)) n++;
    let p = Math.pow(10, n);
    svg.scaleInfo = {interval: scale, x: [x1, x2], y: [y1, y2],
        intervalSci: [scale / p, n, p]};
    return svg.update(0);
},

// minmax: function(vectors, shift) {
//     if (shift == null) shift = [0, 0];
//     let tail = new RArray(...shift);
//     let [x1, y1] = shift;
//     let [x2, y2] = shift;
//     for (let v of vectors) {
//         tail = tail.plus(v);
//         let [x, y] = tail;
//         if (x < x1) x1 = x;
//         if (x > x2) x2 = x;
//         if (y < y1) y1 = y;
//         if (y > y2) y2 = y;
//     }
//     return [x1, y1, x2, y2];
// },

// auto: function(v, grid, options) {
//     let [x1, y1, x2, y2] = applet.vecDiagram.minmax(v, options.shift);
//     if (!options.allowNoOrigin) {
//         x1 = Math.min(x1, -Math.abs(x2) / 10);
//         y1 = Math.min(y1, -Math.abs(y2) / 10);
//         x2 = Math.max(x2, Math.abs(x1) / 20);
//         y2 = Math.max(y2, Math.abs(y1) / 20);
//     }
//     let s = Math.max(x2 - x1, y2 - y1) / grid * (options.padFactor ? options.padFactor : 1.1);
//     if (!s) s = 1;
//     let n = Math.floor(log(s, 10));
//     let p = Math.pow(10, n);
//     let interval = applet.vecDiagram.interval;
//     let i = 0;
//     while (s > interval[i] * p) i++;
//     s = interval[i] * p;
//     let cx = Math.round((x1 + x2) / (2 * s) - grid / 2);
//     let cy = Math.round((y1 + y2) / (2 * s) - grid / 2);
//     return [s, cx * s, cy * s];
// },

interval: [1, 1.25, 1.5, 2, 2.5, 3, 5, 7.5, 10]

};


function loadAllSVG(callback) {
    let svg = $("svg[data-js]");
    if (svg.length == 0) {
        if (callback) callback();
        return;
    }
    let maps = {}, n = 0;
    for (let i=0;i<svg.length;i++) {
        let e = $(svg[i]);
        let [js, id] = e.attr("data-js").split("#");
        if (maps[js] == null) {
            maps[js] = [{}, 1, e.attr("data-keep") != null];
            n++;
        }
        // e.removeAttr("data-js data-keep");
        maps[js][0]["#" + elementId(e, "SVG_")] = id;
    }
    // console.log(maps);
    for (let u in maps) {
        loadSVG(u, maps[u][0], (map, js) => {
            maps[u][1] = 0;
            let n = 0;
            for (let m in maps) n += maps[m][1];
            if (callback && n == 0) callback(map, js);
        }, maps[u][2]);
    }
}

function loadSVG(key, map, callback, keep) {
    if (key.indexOf("//") == -1) {
        if (save.cache[key]) loadSVG.success(key, map, callback, keep);
        else {
            $.getScript({url: "/" + key + ".js", success:() => loadSVG.success(key, map, callback, keep)});
        }
    }
}

loadSVG.init = (key, keep) => {
    let e = $(key);
    if (!keep) e.html(e.children("style, defs"));
    let [w, h, r] = [e.attr("width"), e.attr("height"), e.attr("data-aspect")];
    w = w == null ? 480 : parseFloat(w);
    h = h == null ? 360 : parseFloat(h);
    if (r == null) r = `${w}/${h}`;
    e.attr({width: w, height: h, "data-aspect": r});
    return e;
}

loadSVG.success = (key, map, callback, keep) => {
    let js = save.cache[key];
    let map1 = map;
    if (typeof(map) == "string") {
        map1 = {};
        map1[map] = true;
    }
    for (let key in map1) {
        let e = loadSVG.init(key, keep);
        if (e.length != 1) console.warn(`Selector '${key}' matches ${e.length} nodes!`);
        let tmp = map1[key];
        let item = tmp === true ? js : js[tmp];
        let plot = (o) => {return applet.graph(key, o)};
        if (item) (item instanceof Array ? item[0] : item)(key);
    }
    aspect();
    if (callback) callback(map, js);
}

/*
function loadScriptSVG(url, map, callback, keep) {
    if (url.indexOf("//") == -1) {
        $.ajax(url, {success:(js) => {
            let map1 = map;
            if (typeof(map) == "string") {
                map1 = {};
                map1[map] = true;
            }
            js = eval(js);
            for (let key in map1) {
                let e = loadSVG.init(key, keep);
                if (e.length != 1) console.warn(`Selector '${key}' matches ${e.length} nodes!`);
                let tmp = map1[key];
                let item = tmp === true ? js : js[tmp];
                let plot = (o) => {return applet.graph(key, o)};
                if (item) (item instanceof Array ? item[0] : item)(key);
            }
            aspect();
            if (callback) callback(map, js);
        }});
    }
}
*/