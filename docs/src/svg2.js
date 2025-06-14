/**
Simple JavaScript animations rendered in an <svg> element
(c) 2023-2025 by D.G. MacCarthy <sc8pr.py@gmail.com>
**/


class SVG2g {

constructor(parent, g) {
    if (parent) {
        this.element = g ? $(g)[0] : document.createElementNS(SVG2.nsURI, "g");
        this.element.graphic = this;
        this.$ = $(this.element);
        this.$.appendTo(g ? g.$ : parent.$);
        this.svg = parent.svg;
        this._pivot = new RArray(0, 0);
        this._shift = new RArray(0, 0);
        this._vel = new RArray(0, 0);
        this._acc = new RArray(0, 0);
        this._theta = 0;
        this.omega = 0;
        this.alpha = 0;
    }
}

find(sel, n) {
    let e = this.$.find(sel)[n ? n : 0];
    return e ? e.graphic : null;
}

findAll(selector) {
    let g = [];
    for (let e of this.$.find(selector))
        if (e.graphic instanceof SVG2g) g.push(e.graphic);
    return g;
}

config(attr) {
/* Encapsulate multiple attributes */
    for (let k in attr) this[k] = attr[k];
    return this.update_transform();
}

addClass(...args) {
/* Call jQuery.addClass */
    this.$.addClass(...args);
    return this;
}

css(...rules) {
/* Apply CSS rules to <g> */
    for (let r of rules) {
        let s = typeof(r) == "string";
        if (s) {
            if (r.charAt(0) == ".") this.$.addClass(r.substring(1));
            else if (SVG2._style[r]) {
                r = SVG2._style[r];
                s = false;
            }
        }
        if (!s) this.$.css(r);
    }
    return this;
}

align(xy, x, y) {
/* Align the element based on its bounding box */
    if (!this.$.is(":visible")) {
        console.log(this);
        throw("Cannot align hidden elements");
    }
    if (typeof(xy) == "number") xy = [xy, xy];
    if (y == null) {
        if (x == null) x = y = 0.5;
        else if (typeof(x) == "string")
            [x, y] = {top: [0.5, 0], bottom: [0.5, 1], left: [0, 0.5], right: [1, 0.5]}[x];
    }
    let nx = x == null;
    let ny = y == null;
    let box = this.element.getBBox();
    let dxy = this.svg.p2a(box.x + (nx ? 0 : x) * box.width, box.y + (ny ? 0 : y) * box.height).plus(this._shift);
    dxy = this._cs(xy).minus(dxy);
    if (nx) dxy[0] = 0;
    if (ny) dxy[1] = 0;
    this._shift = this._shift.plus(dxy);
    return this.update_transform();
}


/** Kinematics getters and setters **/

get pivot() {return this._pivot};
get shift() {return this._shift};
get vel() {return this._vel}
get acc() {return this._acc}
get theta() {return this._theta}

set pivot(xy) {this._pivot = new RArray(...this._cs(xy))}
set shift(xy) {this._shift = new RArray(...this._cs(xy))}
set vel(xy) {this._vel = new RArray(...this._cs(xy))}
set acc(xy) {this._acc = new RArray(...this._cs(xy))}

set theta(a) {
    while (a >= 360) a -= 360;
    while (a < 0) a += 360;
    this._theta = a;
}

shiftBy(xy) {
    this._shift = this._shift.plus(this._cs(xy));
    return this.update_transform();
}


/** Clipping **/

clipPath(id, clone) {
/* Clone or move the <g> content to a <clipPath> */
    let e = this.$;
    let cp = $(document.createElementNS(SVG2.nsURI, "clipPath")).attr({id: id});
    cp.appendTo(this.svg.defs[0]);
    if (clone) cp.html(e.html());
    else e.children().appendTo(cp);
    let tr = e.attr("transform");
    if (tr) cp.children().attr({"transform": tr});
    return cp;
}

clip(id) {
/* Set the clip-path attribute */
    this.$.attr({"clip-path": `url(#${id})`});
    return this;
}


/** Coordinate transformations **/

get parent() {
    let p = this.$.parent().closest("g, svg");
    return p.length ? p[0].graphic : null;
}

gpath() {
/* Return a path array from the <svg> element to the current <g> */
    let p = this.parent;
    let a = [this];
    return p ? p.gpath().concat(a) : a;
}

coord_from_parent(xy) {
/* Apply rotation and shift to convert parent <g> coordinates xy relative to child */
    let a = this.theta * this.svg.angleDir;
    xy = this._shift.neg().plus(xy);
    return transform({angle: a, deg: true, center: this._pivot}, xy)[0];
}
    
coord_to_parent(xy) {
/* Apply rotation and shift to convert child <g> coordinates xy relative to parent */
    let a = this.theta * this.svg.angleDir;
    return transform({angle: -a, deg: true, center: this._pivot, shift: this._shift}, xy)[0];
}

coord_to_svg(xy) {
/* Apply rotation and shift to convert <g> coordinates xy relative to <svg> */
    let g = this;
    while (g.parent) {
        xy = g.coord_to_parent(xy);
        g = g.parent;
    }
    return xy;
}

coord_from_svg(xy) {
/* Apply rotation and shift to convert <svg> coordinates xy relative to <g> */
    let p = this.gpath();
    for (let i=1;i<p.length;i++) {
        xy = p[i].coord_from_parent(xy);
    }
    return xy;
}


/** Update animated <g> elements **/

update_transform() {
/* Calculate and set the transform attribute */
    let svg = this.svg;
    let a = this.theta * svg.angleDir;
    let [x, y] = svg.scale.times(this.shift);
    let f = (x) => x.toFixed(svg.decimals);
    let t = x || y ? `translate(${f(x)} ${f(y)})` : "";
    if (a) {
        let [px, py] = svg.a2p(...this.pivot);
        t += ` rotate(${f(a)} ${f(px)} ${f(py)})`;
    }
    t = t.trim();
    if (t.length) this.$.attr("transform", t);
    else this.$.removeAttr("transform");
    return this;
}

update(dt) {
/* Update kinematics */
    let alpha = this.alpha;
    let omega = this.omega;
    if (alpha) {
        this.omega += dt * alpha;
        omega += dt / 2 * alpha;
    }
    if (omega) this.theta = this.theta + dt * omega;
    let v = this._vel;
    let a = this._acc;
    if (v || a) {
        let dv = a.times(dt / 2);
        v = v.plus(dv);
        this._vel = v.plus(dv);
        this._shift = this._shift.plus(v.times(dt));
    }
    return this.update_transform();
}


/** Create child elements within <svg> or <g> element **/

create_child(tag, attr) {
/* Create a child element of the <g> element */
    let c = $(document.createElementNS(SVG2.nsURI, tag));
    return c.attr(attr ? attr : {}).appendTo(this.element);
}

group(...css) {
    let g = new SVG2g(this.svg, this.create_child("g"));
    if (css) g.css(...css);
    return g;
}

scaled(s) {return new SVG2scaled(this.svg, this.create_child("g"), s)}

_px(x, i) {return Math.abs(typeof(x) == "string" ? parseFloat(x) : x * this.svg.scale[i])}

_cs(xy) {
    let [x, y] = xy == null ? [0, 0] : xy;
    let svg = this.svg;
    let [sx, sy] = svg.scale;
    if (typeof(x) == "string") x = parseFloat(x) / Math.abs(sx);
    if (typeof(y) == "string") y = parseFloat(y) / Math.abs(sy);
    return new RArray(x, y);
}

circle(r, center, selector) {
/* Modify or append a <circle> to the <g> element */
    let e = selector ? $(selector) : this.create_child("circle");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = svg.a2p(...this._cs(center));
    // r = typeof(r) == "string" ? parseFloat(r) : r * svg.unit;
    r = this._px_size(r);
    return e.attr({r: f(r), cx: f(x), cy: f(y)});
}

ellipse(r, center, selector) {
/* Modify or append an <ellipse> to the <g> element */
    let e = selector ? $(selector) : this.create_child("ellipse");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let rx = this._px(r[0], 0);
    let ry = this._px(r[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return e.attr({rx: f(rx), ry: f(ry), cx: f(x), cy: f(y)});
}

rect(size, center, selector) {
/* Modify or append a <rect> to the <g> element */
    let e = selector ? $(selector) : this.create_child("rect");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let w = this._px(size[0], 0);
    let h = this._px(size[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return e.attr({width: f(w), height: f(h), x: f(x - w / 2), y: f(y - h / 2)});
}

image(href, size, center, selector) {
/* Modify or append an <image> to the <g> element */
    let e = selector ? $(selector) : this.create_child("image");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let w = this._px(size[0], 0);
    let h = this._px(size[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return e.attr({href: href, width: f(w), height: f(h), x: f(x - w / 2), y: f(y - h / 2)});
}

plot(points, size, href, theta) {
/* Plot an array of points as circles, rectangles, or images */
    let g = this.group().css(".Plot", "black1", "blue");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    if (theta) theta *= svg.angleDir;
    if (!(points instanceof Array)) points = zip(points.x, points.y);
    for (let pt of points) {
        let e;
        if (href) e = g.image(href, size, pt);
        else if (size instanceof Array) e = g.rect(size, pt);
        else e = g.circle(size, pt);
        if (theta) {
            let [x, y] = svg.a2p(...pt);
            e.attr({transform: `rotate(${f(theta)} ${f(x)},${f(y)})`});
        }
    }
    return g;
}

label(fn, x, y) {
/* Add a <g> containing <text> labels or tick marks as <line> */
    let g = this.group();
    let xa = x instanceof Array;
    let ya = y instanceof Array;
    let tm, tp;
    if (fn instanceof Array) {
        [tm, tp] = fn;
        [tm, tp] = xa ? [this._cs([0, tm])[1], this._cs([0, tp])[1]] : [this._cs([tm, 0])[0], this._cs([tp, 0])[0]];
    }
    else if (typeof(fn) == "number") {
        let dec = fn;
        fn = xa ? (x) => x.toFixed(dec) : (x, y) => y.toFixed(dec);
    }
    let tick = tm || tp;
    let n = xa ? x.length : y.length;
    for (let i=0;i<n;i++) {
        let x0 = xa ? x[i] : x;
        let y0 = ya ? y[i] : y;
        let [xc, yc] = this._cs([x0, y0]);
        if (tick) {
            if (!ya) g.line([xc, yc + tm], [xc, yc + tp]);
            else if (!xa) g.line([xc + tm, yc], [xc + tp, yc]);
        }
        else {
            let txt = g.text(fn(x0, y0, i), [xc, yc]);
            if (parseFloat(txt.html()) == 0) txt.addClass("Zero");
        }
    }
    if (tick) g.$.addClass(`Ticks Tick${ya ? 'Y' : 'X'}`).css(SVG2._style.black1);
    else {
        g.$.addClass(`Labels Label${ya ? 'Y' : 'X'}`);
        g.css("text", "f15");
        if (ya) g.css({"text-anchor": "end"});
    }
    return g;
}

tick_label(fn, x, y, tick, offset) {
/* Draw and label tick marks along axis */
    let t = ["number", "string"].indexOf(typeof(tick)) >= 0;
    let xa = x instanceof Array;
    if (tick) this.label(t ? [0, tick] : tick, x, y);
    if (offset == null) offset = 0;
    if (xa) this.label(fn, x, offset);
    else this.label(fn, offset, y);
    return this;
}

poly(points, closed) {
/* Modify or append a <polygon> or <polyline> to the <g> element */
    let attr = {points: this.svg.pts_str(points)};
    return $(closed)[0] instanceof SVGElement ? $(closed).attr(attr) :
        this.create_child(closed ? "polygon" : "polyline", attr);
}

_cs_size(r) {return typeof(r) == "string" ? parseFloat(r) / this.svg.unit : r}
_px_size(r) {return typeof(r) == "string" ? parseFloat(r) : r * this.svg.unit}

star(n, far, near) {
    let pts = star_points(n, this._cs_size(far), near == null ? null : this._cs_size(near));
    return this.poly(pts, 1);
}

arrow(pts, options, anchor) {return new SVG2arrow(this, pts, options, anchor)}
locus(eq, param, args) {return new SVG2locus(this, eq, param, args)}
path(start) {return new SVG2path(this, start)}

line(p1, p2, selector) {
/* Modify or append a <line> to the <g> element */
    let e = selector ? $(selector) : this.create_child("line");
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x1, y1] = svg.a2p(...this._cs(p1));
    let [x2, y2] = svg.a2p(...this._cs(p2));
    return e.attr({x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2)});
}

chevron(xy, dir, size) {
    if (size == null) size = "7";
    let ratio = size.ratio;
    if (!ratio) ratio = 1;
    else size = size.size;
    let svg = this.svg;
    let s = svg.scale;
    size = this._px_size(size);
    let dx = -size / s[0], dy = ratio * size / s[1];
    let g = this.group();
    g.poly([[dx, dy], [0, 0], [dx, -dy]]);
    return g.config({shift: xy, theta: dir ? dir : 0});
}

ray(p1, p2, size, ...pos) {
/* Draw a directed segment */
    let g = this.group();
    g.$.addClass("Ray");
    g.line(p1, p2);
    let seg = g.seg = new Segment(...p1, ...p2);
    let svg = this.svg;
    let L = seg.length;
    if (pos.length == 0) pos = [0.5];
    for (let pt of pos) g.chevron(seg.point(pt * L), svg.adjustAngle(seg.deg), size);
    return g;
}

grid(x, y, appendAxes) {
/* Draw a coordinate grid */
    let g = this.group().css("grid");
    this._grid(g, x, y);
    this._grid(g, y, x, 1);
    let e = g.$.addClass("Grid");
    if (appendAxes == null || appendAxes) // Modified!
        e.find(".Axis").appendTo(e);
    return g;
}

_grid(g, x, y, swap) {
/* Draw the x (swap=false) OR y (swap=true) portion of the coordinate grid */
    if (x.length == 3) {
        let [x0, x1, dx] = x;
        let [y0, y1] = y;
        [x0, x1] = [Math.min(x0, x1), Math.max(x0, x1)];
        [y0, y1] = [Math.min(y0, y1), Math.max(y0, y1)];
        if (dx < 0) dx = -dx;
        let ddx = dx / 1000;
        x1 += ddx;
        while (x0 <= x1) {
            let pts = swap ? [[y0, x0], [y1, x0]] : [[x0, y0], [x0, y1]];
            let line = g.line(...pts);
            if (Math.abs(x0) < ddx) line.addClass("Axis").css(SVG2._style.black1);
            x0 += dx;
        }
    }
}

text(data, xy, selector) {
/* Add a <text> element to the group */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = svg.a2p(...this._cs(xy));
    let e = selector ? $($(selector)[0]) : this.create_child("text");
    return e.attr({x: f(x), y: f(y)}).html(data);
}

gtext(data, css, xy, ...align) {
/* Create a <g> element with an aligned <text> child */
    if (!(css instanceof Array)) css = [css];
    let g = this.group(...css);
    g.text(data);
    g.align(xy, ...align);
    return g;
}

symbol(...args) { // Deprecated!
    let g = this.group();
    g.css(".Symbol");
    for (let [s, f, xy, opt] of args) {
        let txt = g.text(s, xy);
        if (f & 4) txt.addClass("Small");
        if (f & 2) txt.css(SVG2._style.ital);
        if (f & 1) txt.css(SVG2._style.bold);
        if (opt) {
            if (opt.size) txt.css({"font-size": `${opt.size}px`});
        }
    }
    return g;
}

symb(size, ...args) {
/* Render a symbol from a list of text elements */
//  BOLD = 1, ITAL = 2, SMALL = 4
    let g = this.group().css(".Symbol");
    let szStr = (s) => typeof(s) == "number" ? `${size}px` : s;
    if (size) g.css("symbol", {"font-size": szStr(size)});
    for (let [s, opt, pos] of args) {
        let f = 0;
        if (typeof(opt) == "number") [f, opt] = [opt, null];
        let txt = g.text(s, pos);
        if (f & 4) txt.css({"font-size": "60%"});
        if (f & 1) txt.css(SVG2._style.bold);
        if (f & 2) txt.css(SVG2._style.ital);
        if (opt) {
            if (opt.size) txt.css({"font-size": szStr(opt.size)});
            if (opt.css) txt.css(opt.css);
        }
    }
    return g;
}

ctext(...args) {
/* Render multiple centred <g> elements with <text> child nodes */
    let gs = [];
    for (let [t, xy, options] of args) {
        if (options == null) options = {};
        if (typeof(options) == "string") options = {css: options};
        let g = this.group();
        if (options.config) g.config(options.config);
        let css = options.css;
        if (css) {
            if (!(css instanceof Array)) css = [css];
            g.css(...css);
        }
        g.text(t);
        gs.push(g.align(xy ? xy : 0));
    }
    return gs;
}

textm(text, space) {
/* Render multiple lines of text */
    if (!space) space = "20";
	let g = this.group();
	let y = 0;
	if (typeof(space) == "string") space = parseFloat(space) / Math.abs(this.svg.scale[1]);
	for (let t of text.split("\n")) {
		g.text(t, [0, y]);
		y -= space;
	}
	return g;
}

flow(text, shape, options) {
/* Render a flow chart element */
	let g = this.group();
	if (shape == "d") {
		let [sx, sy] = this.svg.scale;
		let w = this._cs([options.width, 0])[0] / Math.sqrt(2);
		g.group().config({theta: 45}).rect([w, w * Math.abs(sx/sy)]);
	}
	else {
		let wh = new RArray(...this._cs(options.size));
		if (shape == "r") g.rect(wh);
		else if (shape == "e") g.ellipse(wh.times(0.5));
		else if (shape == "p") {
			let [x, y] = wh.times(0.5);
			let d = (options.slant ? options.slant : 0.15) * x;
			g.poly([[d-x, y], [x+d, y], [x-d, -y], [-x-d, -y]], 1);
		}
	}
	g.textm(text, options.space).align([0, 0]);
	return g;
}

cylinder(r, L) {
/* Draw a cylinder; pivot is center of the elliptical "top" */
    let g = this.group();
    g.$.addClass("Cylinder");
    let p1 = new RArray(r[0], 0);
    let p2 = p1.neg().minus([0, L]);
    let c = g.svg.angleDir == -1 ? 2 : 0;
    g.path(p1).ver(-L).arcTo(p2, r, c).ver(0).arcTo(p1, r).close().update();
    g.ellipse(r);
    return g;
}

stickman(h) {
/* Add a stick man as an SVG2g instance */
    let g = this.group().css("nofill", "black3");
    let r = h / 8;
    g.circle(r, [0, 7 * r]);
    g.line([0, 6 * r], [0, 3 * r]);
    let w = 1.2 * r;
    g.poly([[-w, 0], [0, 3 * r], [w, 0]]);
    let pt = new RArray(0, 5 * r);
    r *= 1.5;
    g.poly([pt.plus(vec2d(r, uniform(150, 210))), pt, pt.plus(vec2d(r, uniform(-30, 30)))]);
    return g;
}

graph(options) {
/* Add common scatter plot / line graph elements */
    let svg = this.svg.css(".NoStyle");
    let x = options.x, y = options.y;
    if (options.grid) {
        let [dx, dy] = options.grid;
        let [l, r, b, t] = svg.lrbt;
        l = dx * Math.round(l / dx);
        r = dx * Math.round(r / dx);
        b = dy * Math.round(b / dy);
        t = dy * Math.round(t / dy);
        this.grid([l, r, dx], [b, t, dy], options.appendAxes);
    }

    if (x || y) {
        let txt = this.group(".AxisTitle", "text");
        let xy = (i) => {
            let pos = (i ? y : x).title[1];
            if (!(pos instanceof Array)) pos = i ? [pos, svg.center[1]] : [svg.center[0], pos];
            return pos;
        }
        if (x) {
            let dy = [0, x.y ? x.y : 0];
            if (x.tick) {
                this.tick_label(x.dec ? x.dec : 0, [...range(...x.tick)], 0, x.tickSize ? x.tickSize : "-6");
                this.find("g.LabelX").config({shift: x.shift}).shiftBy(dy);
                this.find("g.TickX").shiftBy(dy);
            }
            if (x.title) txt.group().shiftBy(dy).text(x.title[0], xy(0));
        }
        if (y) {
            let dx = [y.x ? y.x : 0, 0];
            if (y.tick) {
                this.tick_label(y.dec ? y.dec : 0, 0, [...range(...y.tick)], y.tickSize ? y.tickSize : "-6");
                this.find("g.LabelY").config({shift: y.shift}).shiftBy(dx);
                this.find("g.TickY").shiftBy(dx);
            }
            if (y.title) txt.group().config({theta: 90, shift: xy(1)}).shiftBy(dx).text(y.title[0]);  
        }  
    }

    let data = options.data;
    if (data) {
        let g = this.group(".Series"), s = [];
        for (let series of data) {
            if (series.plot) s.push(g.plot(...series.plot));
            else {
                let gs = g.group(".Locus", "blue2", "nofill");
                s.push(gs);
                if (series.connect) {
                    let pts = series.connect;
                    if (!(pts instanceof Array)) pts = zip(pts.x, pts.y);
                    gs.poly(pts);
                }
                else if (series.locus) gs.locus(...series.locus);
            }
        }
        this.series = s;
    }
    return this;
}

errorBarY(x, y0, y1, dx, _swap) {
    /* Draw x or y error bars */
    dx = this._cs_size(dx);
    let g = this.group().addClass("ErrorBar");
    if (_swap) {
        g.line([y0, x], [y1, x]);
        x -= dx / 2;
        g.line([y0, x], [y0, x + dx]);
        g.line([y1, x], [y1, x + dx]);    
    }
    else {
        g.line([x, y0], [x, y1]);
        x -= dx / 2;
        g.line([x, y0], [x + dx, y0]);
        g.line([x, y1], [x + dx, y1]);    
    }
    return g;
}

errorBarX(x0, x1, y, dy) {return this.errorBarY(y, x0, x1, dy, 1)}


tip_to_tail(vecs, options) {
/* Draw a 2D "tip-to-tail" vector diagram */
    if (options == null) options = {};
    let g = this.group(".TipToTail2D");
    let pt = new RArray(0, 0);
    let opt = Object.assign({tail: "7"}, options);
    for (let v of vecs) {
        let pt0 = pt;
        let tmp = pt0.plus([v[0], 0]);
        pt = pt.plus(v);
        if (v[0] || v[1]) {
            if (v[0]) g.arrow({tail: pt0, tip: tmp}, opt).css(".Component");
            if (v[1]) g.arrow({tail: tmp, tip: pt}, opt).css(".Component");
            g.arrow({tail: pt0, tip: pt}, opt);
        }
    }
    if (vecs.length > 1) {
        if (pt[0] && pt[1]) {
            let tmp = [pt[0], 0];
            g.arrow({tail: [0, 0], tip: tmp}, opt).$.addClass("Component Resultant");
            g.arrow({tail: tmp, tip: pt}, opt).$.addClass("Component Resultant");
        }
        g.arrow({tail: [0, 0], tip: pt}, opt).$.addClass("Resultant");    
    }
    return g;
}

energy_flow(data) {
/* Draw an energy flow diagram */
    this.svg.css(".NoStyle");
    let g = this.group("text");
    g.circle(data.radius).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let gs = g.group("symbol", "f28");
    for (let item of data.labels) {
        let [txt, pos, color, shift] = item;
        color = {fill: color ? color : "#0065fe"};
        if (txt.charAt(0) == '$') {
            txt = txt.substring(1).split("_");
            let sym = [[txt[0], 2]];
            if (txt.length > 1) sym.push([txt[1], 6, shift ? shift : ["12", "-7"]]);
            gs.symb(0, ...sym).css(color).align(pos);
        }
        else g.group(color, {"font-size": "24px"}).ctext([txt, pos]);
    }
    g = g.group("arrow");
    for (let item of data.arrows) {
        let [l, pos, angle, txt, color] = item;
        color = {fill: color ? color : "#0065fe"};
        let a = g.arrow(l, {tail: "6"}).css(color).config({theta: angle, shift: pos});
        if (txt) {
            if (!(txt instanceof Array)) txt = [txt, [l > 0 ? "-6": "6", "12"]];
            a.label(...txt).css({stroke: "none"});
        }
    }
    return this;
}

coil(size, n, reverse, r, axle) {
/* Draw a coil frame with turns of wire and axle */
    let g0 = this.group();
    g0.$.addClass("Coil");
    let g = reverse ? g0.scaled([-1, 1]) : g0;
    let [w, h] = size;
    if (!n) n = 15;
    if (!r) r = h / n / 4;
    g.rect(size);
    for (let i=0;i<n+0.5;i++) {
        let y = (h - 6 * r) * (i - n / 2) / n;
        let path = g._turn(size[0], r, i == n ? 2 : 3).config({shift: [0, y]});
        path.$.addClass("Wire");
        if (i == 0 || i == n) {
            y += r * (i ? 2 : -2);
            g.line([w / 2, y], [w / 2 + 2 * r, y]).addClass("Wire");
        }
    }
    if (axle == null) axle = 0.7 * r;
    if (axle) g.circle(axle);
    return g0;
}

_turn(w, r, circ) {
/* Render a turn of wire as a path */
    let g = this.group();
    if (circ == null) circ = 0;
    w /= 2;
    let p = g.path([w, circ & 1 ? 4 * r : 2 * r]);
    if (circ & 1) p.arc([w, 3 * r], -90);
    p.lineTo([-w, -2 * r]);
    if (circ & 2) p. arc([-w, -r], 90, 2);
    p.update();
    return g;
}

}


class SVG2scaled extends SVG2g {

constructor(parent, g, scale) {
    super(parent, g);
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = svg.a2p(0, 0);
    x = f(x); y = f(y);
    let xn = f(-x), yn = f(-y);
    let [sx, sy] = this.scale = typeof(scale) == "number" ? [scale, scale] : scale;
    this.$.attr({transform: `translate(${x} ${y}) scale(${sx} ${sy}) translate(${xn} ${yn}) `});
}

get pivot() {return new RArray(0, 0)};
get shift() {return new RArray(0, 0)};
get theta() {return 0}

update_transform() {return this}

coord_to_parent(xy) {
    let [sx, sy] = this.scale;
    return new RArray(xy[0] * sx, xy[1] * sy);
}

coord_from_parent(xy) {
    let [sx, sy] = this.scale;
    return new RArray(xy[0] / sx, xy[1] / sy);
}

}


class SVG2arrow extends SVG2g {

constructor(g, info, options, anchor) {
    super(g);
    this.$.addClass("Arrow");
    this._poly = this.poly([], 1);
    this.reshape(info, options, anchor);
}

reshape(info, options, anchor) {
    let tail_and_tip = (info) => {
        if (typeof(info) == "number") return [[-info / 2, 0], [info / 2, 0]];
        else {
            let tail = info.tail;
            let tip = info.tip;
            if (tail == null) tail = [0, 0];
            if (tip == null) {
                let angle = info.angle;
                tip = vec2d(info.length, angle ? angle : 0).plus(tail);
            }
            return [tail, tip];
        }
    }

    let svg = this.svg;
    let [tail, tip] = tail_and_tip(info);
    tail = svg._cs(tail);
    tip = svg._cs(tip);
    let seg = this.seg = new Segment(...tail, ...tip);
    if (!anchor) anchor = 0;
    else if (typeof(anchor) == "string") anchor = ["tail", "center", "tip"].indexOf(anchor) - 1;
    this.pivot = seg[anchor == -1 ? "point1" : (anchor == 1 ? "point2" : "midpoint")];
    let f = (x) => Math.abs(typeof(x) == "string" ? parseFloat(x) : x * svg.scale[1]);
    let opt = {};
    if (options) {
        opt = Object.assign(opt, options);
        if (opt.tail) opt.tail = f(opt.tail);
        if (opt.head) opt.head = f(opt.head);    
    }
    seg = new Segment(...svg.a2p(...tail), ...svg.a2p(...tip));
    let pts = arrow_points(seg.length, opt);
    pts = transform({angle: seg.deg, deg: true, shift: seg.midpoint}, ...pts);
    for (let i=0;i<pts.length;i++) pts[i] = svg.p2a(...pts[i]);
    this.poly(pts, this._poly);
    return this;
}

label(text, shift) {
/* Add text relative to arrow midpoint */
    return this.text(text, this.seg.midpoint.plus(this._cs(shift)));
}

}


class SVG2locus {

css = SVG2g.prototype.css;

constructor(g, eq, param, args) {
    let svg = this.svg = g.svg;
    this.eq = eq;
    if (!param) param = [svg.lrbt[0], svg.lrbt[1]];
    this.param = param.length > 2 ? param : param.concat([svg.$.width() / 3]);
    this.args = args;
    this.$ = g.create_child("polyline", {}).addClass("Locus");
    this.css("nofill");
    this.element = this.$[0];
    this.element.graphic = this;
    this.update();
}

update() {
    let svg = this.svg;
    let t = svg.time;
    let [eq, args] = [this.eq, this.args];
    let [x0, x1, dx] = this.param;
    dx = (x1 - x0) / Math.round(dx);
    x1 += dx / 2;
    let pts = [];
    while (x0 <= x1) {
        let y = eq(x0, t, args);
        if (y === false) return;
        pts.push(typeof(y) == "number" ? [x0, y] : y);
        x0 += dx;
    }
    this.$.attr({points: svg.pts_str(pts)});
}

}


class SVG2path {

constructor(g, xy) {
    this.g = g;
    this.svg = g.svg;
    this.$ = g.create_child("path", {});
    this.d = "";
    this.moveTo(xy == null ? [0, 0] : xy);
}

moveTo(xy, c) {
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = xy;        
    this.x = x;
    this.y = y;
    [x, y] = svg.a2p(...xy);
    this.d += `${c ? c : 'M'} ${f(x)} ${f(y)} `;
    return this;
}

lineTo(xy) {return this.moveTo(xy, "L")}

linesTo(...points) {
    for (let xy of points)
        this.lineTo(xy);
    return this;
}

hor(x) { // Move horizontally
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    this.x = x;
    x = svg.a2p(x, 0)[0];
    this.d += `H ${f(x)} `;
    return this;
}

ver(y) { // Move vertically
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    this.y = y;
    y = svg.a2p(0, y)[1];
    this.d += `V ${f(y)} `;
    return this;
}

arcTo(xy, r, choice, rotn) { // Draw a circular or elliptical arc to the specified point
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let rx, ry;
    if (r instanceof Array) [rx, ry] = r;
    else rx = ry = r;
    rx = svg._px(rx, 0);
    ry = svg._px(ry, 1);
    rotn = rotn ? f(rotn * svg.angleDir) : "0";
    let [x, y] = xy;        
    this.x = x;
    this.y = y;
    [x, y] = svg.a2p(x, y);
    let large = 0, sweep = 0;
    if (choice) {
        large = choice & 1;
        sweep = choice & 2 ? 1 : 0;
    }
    this.d += `A ${f(rx)} ${f(ry)} ${rotn} ${large} ${sweep} ${f(x)} ${f(y)} `;
    return this;
}

arc(c, a, choice) { // Draw a circular arc to the specified angle
    c = new RArray(...c);
    let d = c.minus([this.x, this.y]).neg();
    let r = d.mag();
    let a0 = d.dir();
    if (choice == null) {
        choice = Math.max(a, a0) - Math.min(a, a0) >= 180 ? 1 : 0;
        if (a < a0) choice += 2;
    }
    let p1 = c.plus([r * cos(a), r * sin(a)]);
    return this.arcTo(p1, r, choice);
}

curveTo(xy, p1, p2) { // Bezier curve to the specified point using two reference points
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = xy;
    this.x = x;
    this.y = y;
    [x, y] = svg.a2p(x, y);
    let [x1, y1] = svg.a2p(...p1);
    let [x2, y2] = svg.a2p(...p2);
    this.d += `C ${f(x1)} ${f(y1)}, ${f(x2)} ${f(y2)}, ${f(x)} ${f(y)} `;
    return this;
}

quadTo(xy, p) { // Quadratic Bezier curve to the specified point
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = xy;
    this.x = x;
    this.y = y;
    [x, y] = svg.a2p(x, y);
    let [x1, y1] = svg.a2p(...p);
    this.d += `Q ${f(x1)} ${f(y1)}, ${f(x)} ${f(y)} `;
    return this;
}

close() {
    this.d += "Z ";
    delete this.x;
    delete this.y;
    return this;
}

update() {return this.$.attr({d: this.d.trim()})}

}


class SVG2 extends SVG2g {

constructor(selector, options) {
    super();
    this.svg = this;
    this.element = $(selector).filter("svg")[0];
    selector = this.$ = $(this.element).attr("xmlns", SVG2.nsURI);
    this.element.graphic = this;
    this.decimals = 2;

    /* <svg> element size */
    let margin = options.margin ? options.margin : 0;
    if (typeof(margin) == "number") margin = [margin, margin, margin, margin];
    let lrbt = options.lrbt;
    let s = options.scale;
    if (s && !(s instanceof Array)) s = [s, s];
    let [w, h] = options.size ? options.size :
        (s && lrbt.length > 3 ? [s[0] * (lrbt[1] - lrbt[0]) + margin[0] + margin[1] + 1, s[1] * (lrbt[3] - lrbt[2]) + margin[2] + margin[3] + 1] :
            [selector.width(), selector.height()]);
    w = Math.abs(Math.round(w));
    h = Math.abs(Math.round(h));
    selector.attr({width: w, height: h, "data-aspect": w/h, viewBox: `0 0 ${w} ${h}`});

    /* Coordinate system */
    if (lrbt) {
        let [l, r, b, t] = margin;
        if (lrbt.length < 4)
            lrbt = SVG2.auto_lrbt(w - margin[0] - margin[1], h - margin[2] - margin[3], ...lrbt);
        this.coords_by_map([l, h - 1 - b], [lrbt[0], lrbt[2]], [w - 1 - r, t], [lrbt[1], lrbt[3]]);
    }
    else {
        lrbt = [0, w - 1, 0, h - 1];
        this.coords_by_map([0, 0], [0, 0], [1, 1], [1, 1]);
        this.p2a = this.a2p = (x, y) => new RArray(x, y);
    }
    this.lrbt = lrbt;

    /* Draw coordinate grid */
    let grid = options.grid;
    if (grid) {
        let [gx, gy] = typeof(grid) == "number" ? [grid, grid] : grid;
        let x0 = gx * Math.round(lrbt[0] / gx);
        let y0 = gy * Math.round(lrbt[2] / gy);
        this.grid([x0, lrbt[1], gx], [y0, lrbt[3], gy], options.appendAxes);
    }

    /* Animation data */
    this.playing = false;
    this.frameRate = 60;
    this.frameCount = 0;
    this.timeFactor = 1;
    this.time = 0;
}

static arr(dy) {return ["→", 5, [0, dy == null ? "20" : dy]]}

static css(...key) {
    let a = {};
    for (let k of key)
        Object.assign(a, typeof(k) == "string" ? SVG2._style[k] : k);
    return a;
}

save(callback) {
/* Clone <svg> and prepend <style> nodes; then save SVG file or pass to callback */
    if (callback == null) callback = `${randomString(12, 1)}.svg`;
    if (callback === true) callback = (html) => BData.init(html, "svg").open();
    else if (typeof(callback) == "string") {
        let fn = callback;
        callback = (html) => BData.init(html, fn).save();
    }
    let html = $(this.element.outerHTML).attr({xmlns: SVG2.nsURI});
    callback(html[0].outerHTML);
    return this;
}

get defs() {
    let d = this.$.find("defs");
    if (d.length == 0) d = this.create_child("defs").prependTo(this.$);
    return d;
}

get center() {
    let [l, r, b, t] = this.lrbt;
    return new RArray((l + r) / 2, (b + t) / 2);
}

clipRect(xy, id) {
/* Create a clip path that excludes the margin */
    if (xy == null) xy = 0;
    xy = this._cs(xy instanceof Array ? xy : [xy, xy]).times(2);
    let clip = this.group();
    let [l, r, b, t] = this.lrbt;
    clip.rect([Math.abs(r - l) + xy[0], Math.abs(t - b) + xy[1]], this.center);
    clip.clipPath(id ? id : "lrbt");
    return this;
}

gradient(id, c1, c2, x1, x2, y1, y2) {
/* Create a <linearGradient> */
    let elem = (t, a) => {
        let e = document.createElementNS(SVG_Item.nsURI, t);
        if (a != null) $(e).attr(a);
        return e;
    }

    let e = $(elem("linearGradient", {
        id: id,
        x1 : `${x1 == null ? 0 : x1}%`,
        x2 : `${x2 == null ? 100 : x2}%`,
        y1 : `${y1 == null ? 0 : y1}%`,
        y2 : `${y2 == null ? 0 : y2}%`
    })).appendTo(this.defs[0]);
    e.append(elem("stop", {offset: "0%", "stop-color" : c1}));
    e.append(elem("stop", {offset: "100%", "stop-color" : c2}));
    return this;
}

static svg(sel, i, ev) {
/* Save an SVG2 drawing as an SVG file */
    if (ev) ev.stopPropagation();
    let e = $(sel ? sel : "svg[data-svg2x]");
    console.log(e);
    let n = 0;
    for (let ei of e) if (ei.graphic) n++;
    if (n) {
        if (i == null) i = n > 1 ? parseInt(prompt(`Choose index: 0..${n-1}`)): 0;
        e[i].graphic.save();    
    }
}

static create(options) {return new SVG2(document.createElementNS(SVG2.nsURI, "svg"), options)}

static auto_lrbt(w, h, l, r, b, t) {
/* Calculate coordinate limits so axes have the same scale */
    if (t == null) {
        let dy = (h - 1) * (r - l) / (w - 1);
        if (b == null) {
            t = dy / 2;
            b = -t;
        }
        else t = b + dy;
    }
    return [l, r, b, t];
}

update_transform() {return this}

coords_by_map(p1, a1, p2, a2) {
/* Assign an abstract coordinate system to the drawing */
    let [adx, ady] = new RArray(...a2).minus(a1);
    let [pdx, pdy] = new RArray(...p2).minus(p1);
    let sx = pdx / adx;
    let sy = pdy / ady;
    let s = this.scale = new RArray(sx, sy);
    this.unit = Math.sqrt((sx*sx + sy*sy) / 2);
    this.angleDir = sx * sy < 0 ? -1 : 1;
    let t = new RArray(-1/sx, -1/sy);
    p1 = new RArray(...p1).minus(s.times(a1));
    this.a2p = (x, y) => p1.plus(s.times([x,y]));
    this.p2a = (x, y) => p1.minus([x,y]).times(t);
}

eventCoords(ev) {
/* Calculate the coordinates of a mouse event in pixels and using the SVG2 coordinate system */
    let e = this.$;
    let dx = parseFloat(e.css("padding-left")) + parseFloat(e.css("border-left-width"));
    let dy = parseFloat(e.css("padding-top")) + parseFloat(e.css("border-top-width"));
    let r = this.element.getBoundingClientRect();
    let px = new RArray(ev.clientX - (r.x + dx), ev.clientY - (r.y + dy));
    px[0] *= parseFloat(e.attr("width")) / e.width();
    px[1] *= parseFloat(e.attr("height")) / e.height();
    return {pixels: px, coords: this.p2a(...px)};
}

adjustAngle(a, invert) {
/* Adjust rotation angle when x and y scales differ */
    let [sx, sy] = this.scale;
    if (invert) {sx = 1 / sx; sy = 1 / sy}
    return atan2(sy * this.angleDir * sin(a), sx * cos(a));
}

group(...css) {
    let g = new SVG2g(this);
    if (css) g.css(...css);
    return g;
}

pts_str(pts) {
/* Create a string from an array of ordered pairs*/
    let s = "";
    let f = (x) => x.toFixed(this.decimals);
    for (let i=0;i<pts.length;i++) {
        let [x, y] = this.a2p(...pts[i]);
        s += (s.length ? " " : "") + `${f(x)},${f(y)}`;
    }
    return s;
}

static style(items, ...styles) {
    for (let e of items) {
        if (e instanceof SVG2g) e.css(...styles);
        else {
            e = $(e);
            for (let s of styles) {
                if (typeof(s) == "string" && s.charAt(0) == ".") e.addClass(s.substring(1));
                else e.css(SVG2._style[s] ? SVG2._style[s] : s);
            }
        }
    }
}


/** Animation methods **/

animate(...args) {
/* Save an array of animated SVG2g instances */
    this.items = [];
    for (let arg of args) {
        if (!arg.update) arg = $(arg)[0].graphic;
        this.items.push(arg);
    }
    return this;
}

update(dt) {
/* Update the drawing each frame */
    clearTimeout(this._animate);
    let anim = dt == null;
    if (anim) dt = this.timeFactor / this.frameRate;
    if (this.beforeupdate) this.beforeupdate.call(this);
    if (this.items) for (let item of this.items) {
        try {
            if (item.beforeupdate) item.beforeupdate(item);
            item.update(dt);
            if (item.afterupdate) item.afterupdate(item);
        } catch(err) {console.warn(err)}
    }
    this.time += dt;
    dt = 1000 / this.frameRate;
    let ft = this._nextFrame - Date.now();
    if (ft <= 0) {
        ft = 1;
        this._nextFrame = Date.now() + dt - 1;
    }
    else this._nextFrame += dt;
    if (anim) this.frameCount++;
    if (this.afterupdate) this.afterupdate.call(this);
    if (this.playing) this._animate = setTimeout(() => {this.update()}, ft);
    return this;
}

play() {
/* Start or resume the animation */
    this.playing = true;
    this._nextFrame = Date.now() + 1000 / this.frameRate;
    if (this._fpsDebug) this._fpsDebug = [this.frameCount, Date.now()];
    return this.update();
}

pause() {
/* Pause the animation */
    clearTimeout(this._animate);
    this.playing = false;
    if (this._fpsDebug) {
        let [n, t] = this._fpsDebug;
        n = this.frameCount - n;
        t = (Date.now() - t) / 1000;
        console.log(`${n} frames / ${t} sec = ${n/t} fps`);
    }
    return this;
}

toggle() {return this.playing ? this.pause() : this.play()}

clickToggle(n, click, init) {
    let a = [() => clickCycle.toggle(this, false, ...range(n))];
    for (let i=0;i<n;i++) a.push(() => clickCycle.toggle(this, true, i));
    clickCycle(this.element, init == null ? -1 : init, ...a);
    if (click) for (let i=0;i<click;i++)
        this.$.trigger("click");
    return this;
}


/** Load and run SVG2 JavaScripts **/

static async load(cb) {
/* Send AJAX requests for SVG2 scripts */
    let svgs = $("svg[data-svg2]");
    let pending = {};
    let ts = Date.now();
    for (let svg of svgs) {
        let [url, id, args] = $(svg).attr("data-svg2").split("#");
        url = new URL(url, SVG2.url).href;
        svg.info = [url, id, args];
        if (pending[url] == null && SVG2._cache[url] == null)
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
        try {SVG2._cache[url][id](svg, ...args)}
        catch(err) {console.warn(err)}
    }
    return cb ? cb() : null;
}

static cache_run(url, id, ...arg) {
    let js = SVG2._cache[new URL(url, SVG2.url).href];
    return js[id](...arg);
}

static cache(url, obj) {
/* Load SVG2 JavaScript into cache */
    SVG2._cache[new URL(url, SVG2.url).href] = obj;
}

static makeURL(url) {return new URL(url, SVG2.url).href}
static cached(url) {return SVG2._cache[new URL(url, SVG2.url).href]}


/** Vector diagram helpers **/

static vec_diag(sel, vecs, opt) {
/* Draw a vector diagram in an <svg> tag */
    let svg = new SVG2(sel, opt).css(".NoStyle");
    if (!opt) opt = {};
    let g = svg.tip_to_tail(vecs);
    if (opt.shift) g.config({shift: opt.shift});
    if (opt.label) {
        let [space, n, x, y] = opt.label;
        let [l, r, b, t] = svg.lrbt;
        l = space * Math.ceil(l / space);
        b = space * Math.ceil(b / space);
        let tick = opt.tick;
        if (tick) {
            svg.tick_label(n, 0, [...range(b, t + space / 10, space)], tick, x);
            svg.tick_label(n, [...range(l, r + space / 10, space)], 0, tick, y);
        }
        else {
            svg.label(n, x, [...range(b, t + space / 10, space)]);
            svg.label(n, [...range(l, r + space / 10, space)], y);
        }
    }
    g.$.appendTo(svg.$);
    for (let s of "XY") {
        let e = svg.find(`g.Label${s}`);
        if (e) e.shiftBy([0, "-5"]);
    }
    svg.$.find(".Zero").hide();
    if (opt.cycle == -1) g.$.find(".Component").hide();
    else if (opt.cycle) svg.vec_cycle(g.$, vecs.length > 1);
    g.$.find(".Arrow").css(SVG2._style.arrow);
    g.$.find(".Resultant").css(SVG2._style.blue);
    g.$.find(".Component").css({fill: "yellow"});
    return svg;
}

vec_cycle(g, res) {
/* Default 'clickCycle' for vector diagrams */
    g.find(".Component").hide();
    if (res) clickCycle(this.element, 0,
        () => {g.find(".Component").fadeOut()},
        () => {g.find(".Resultant").fadeOut(); g.find(".Component:not(.Resultant)").fadeIn()},
        () => {g.find(".Component:not(.Resultant)").fadeOut(); g.find(".Component.Resultant").fadeIn()},
        () => {g.find(".Resultant").fadeIn()},
    );
    else this.$.on("click", () => g.find(".Component").fadeToggle());
    return this;
}

static vec_diag_table(sym, vecs, prec, scale) {
/* Compose a table showing vector addition */
    let tbl = $("<table>").addClass("VectorTable");
    let thead = $("<thead>").appendTo(tbl);
    let tr = $("<tr>").appendTo(thead);
    let v = sym.charAt(0) == "Δ" ? `\\Delta\\vec{\\bf ${sym.substring(1)}}` : `\\vec{\\bf ${sym}}`;
    for (let x of [`|${v}|`, `\\theta`, `${v}_x`, `${v}_y`])
        tr.append($("<th>").addClass("TeX").html(x));
    tr = $("<tr>").appendTo(thead);
    for (let x of [`\\sqrt{(${v}_x)^2 + (${v}_y)^2}`, `\\tan^{-1}\\frac{${v}_y}{${v}_x}`, `|${v}| \\cos\\theta`, `|${v}| \\sin\\theta`])
        tr.append($("<th>").html($("<p>").html(x).addClass("TeX")));
    let tbody = $("<tbody>").appendTo(tbl);
    let pt = new RArray(0, 0);
    for (let v of vecs) {
        if (scale) v = new RArray(...v).times(scale);
        pt = pt.plus(v);
        tbody.append(new RArray(...v).tr(prec ? prec : 4));
    }
    tbody.append(new RArray(...pt).tr(prec ? prec : 4).addClass("Resultant"));
    renderTeX(thead.find(".TeX"));
    return tbl;
}

static ebg(sel, Emax, step, data, options) {
/* Create an animated energy bar graph */
    options= Object.assign({size: [512, 384], width: 0.5, duration: 0, unit: "J", margin: [32, 4, 44, 16]}, options);
    let n = data.length;
    let svg = new SVG2(sel, {size: options.size, lrbt: [0, n, 0, Emax], margin: options.margin}).css(".NoStyle");
    svg.grid([0, n], [0, Emax, step]).grid([0, 1, 2], [0, Emax]);

    let bars = [];
    let sym = svg.group("symbol", "f28");
    for (let i=0;i<n;i++) {
        let d = data[i];
        let c = d[2] ? d[2] : "#0065fe"
        bars.push(svg.rect([options.width, 1], [i + 0.5, 1]).css({fill: c}));
        let [t, sub] = d[0].split("_");
        t = [[t, 2]];
        if (sub) t.push([sub, 6, [`${8 + 5 * sub.length}`, "-8"]]);
        sym.symb(0, ...t).align([i + 0.5, "-4"], 0.5, 0).css({fill: c});
    }
    svg.config({data: data, options: options});
    svg.$.find("g.Grid line.Axis").appendTo(svg.$);

    if (options.E) svg.line([0, options.E], [n, options.E]).addClass("TotalEnergy").css({stroke: "black", "stroke-width": "2px"});
    if (options.label) {
        let [dec, x, skip] = options.label;
        let g = svg.label(dec, x, [...range(0, Emax + step, skip ? skip * step : step)]);
        let dy = options.yShift;
        g.shiftBy([0, dy != null ? dy : "-6"]);
        if (options.unit) g.text(options.unit, ["6", Emax]).css({"text-anchor" : "start"});
        g.$.find(".Zero").removeClass("Zero");
        g.$.find("text").css({"font-size": "16px"});
    }

    svg.beforeupdate = function() {
        let t = this.time;
        let opt = this.options;
        if (opt.duration && t > opt.duration) {
            this.pause();
            this.time = opt.duration;
        }
        else {
            let E = 0, calc = 0;
            let w = opt.width;
            let n = bars.length;
            if (opt.duration) t /= opt.duration;
            for (let i=0;i<n;i++) {
                let f = this.data[i][1];
                if (f === true) calc += 1;
                else {
                    let Ei = typeof(f) == "number" ? f : f(t);
                    E += Ei;
                    svg.rect([w, Ei], [i + 0.5, Ei / 2], bars[i]);
                }
            }
            let Ei = (opt.E - E) / calc;
            for (let i=0;i<n;i++) {
                let f = this.data[i][1];
                if (f === true) svg.rect([w, Ei], [i + 0.5, Ei / 2], bars[i]);
            }
        }
    }

    svg.$.on("click", () => {
        if (svg.time >= svg.options.duration && !svg.playing) {
            svg.time = 0;
            svg.update(0);
        }
        else svg.toggle();
    });

    return svg.update(0);
}

static async latex(code, e) {
/* Render LaTeX equation to SVG using MathJax */
    let remove = e == null;
    e = remove ? $("<p>").css({display: "none"}).appendTo("body") : $(e);
    e.html(`$$${code}$$`);
    return MathJax.typesetPromise().then(a => {
        let svg;
        try {svg = e.find("svg")[0].outerHTML}
        catch(err) {}
        if (remove) e.remove();
        return svg;
    });
}

static async latex_img(code) {
/* Render LaTeX equation to <img> */
    return SVG2.latex(code).then(svg => {
        return $("<img>").attr({src: "data:image/svg+xml," + encodeURIComponent($(svg)[0].outerHTML)})[0];
    })
}

}

SVG2.nsURI = "http://www.w3.org/2000/svg";
SVG2._cache = {};
SVG2.load.pending = [];

SVG2.url = location.origin;
if (SVG2.url.substring(0, 16) != "http://localhost") SVG2.url += "/sci/";

SVG2.sans = "'Noto Sans', 'Open Sans', 'Droid Sans', Oxygen, sans-serif";
SVG2.mono = "Inconsolata, 'Droid Sans Mono', monospace";
SVG2.serif = "'Noto Serif', 'Open Serif', 'Droid Serif', serif";
SVG2.symbol = "KaTeX_Main, 'Latin Modern Roman', 'Droid Serif', 'Noto Serif', serif";

SVG2._style = {
    grid: {stroke: "lightgrey", "stroke-width": "0.5px"},
    text: {"font-family": SVG2.sans, "font-size": "18px", "text-anchor": "middle"},
    middle: {"text-anchor": "middle"},
    symbol: {"font-family": SVG2.symbol, "font-size": "18px", "text-anchor": "middle"},
    arrow: {fill: "red", stroke: "black", "stroke-width": "0.5px"},
    ital: {"font-style": "italic"},
    bold: {"font-weight": "bold"},
    nofill: {fill: "none"},
    sans: {"font-family": SVG2.sans},
    serif: {"font-family": SVG2.serif},
    mono: {"font-family": SVG2.mono},
};

for (let i=12;i<33;i++) SVG2._style[`f${i}`] = {"font-size": `${i}px`};
for (let i=1;i<13;i++) SVG2._style[`px${i}`] = {"stroke-width": `${i}px`};
for (let c of ["black", "red", "green", "lime", "blue"]) {
    cc = (c) => c == "blue" ? "#0065fe" : c;
    SVG2._style[`${c}`] = {fill: cc(c)};
    for (let i=1;i<4;i++)
        SVG2._style[`${c}${i}`] = {stroke: cc(c), "stroke-width": `${i}px`};
}

// console.log(SVG2._style);
