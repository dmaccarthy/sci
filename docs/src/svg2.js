/***

Simple JavaScript animations rendered in an <svg> element
(c) 2023-2024 by D.G. MacCarthy <sc8pr.py@gmail.com>

Create a new animation:
    svg = new SVG2(jSelect, {size or scale, lrbt, margin, grid}) -> SVG2
    svg = SVG2.create(options) -> SVG2

Get the <svg>/<g> element or its jQuery object:
    svg.element -> <svg> or <g> element
    g.$ -> jQuery

Create and configure an animated group:
    g = svg.group() -> SVG2g
    g.config({theta, omega, alpha, pivot, shift, vel, acc}) -> g

Create a <g> for scaling (cannot be animated, but can be nested in an animated <g>):
    s = g.scaled(s) -> SVGscaled

Add primitive content to an <svg>/<g> tag using an SVG2g instance (or subclasses SVG2, SVG2scaled, SV2arrow):
    g.line([x1, y1], [x2, y2]) -> jQuery
    g.circle(r, [cx, cy]) -> jQuery
    g.ellipse([rx, ry], [cx, cy]) -> jQuery
    g.rect([w, h], [cx, cy]) -> jQuery
    g.image(href, [w, h], [cx, cy]) -> jQuery
    g.poly([pts], closed) -> jQuery

Add composite content:
    g.grid([x1, x2, dx], [y1, y2, dy]) -> SVG2g
    g.cylinder([rx, ry], L) -> SVG2g
    g.plot(pts or {x, y}, size, href, theta) -> SVG2g
    g.label([tm, tp] or int or (x, y, i) => string, x, y) -> SVG2g
    g.tick_label(fn, x, y, tick, offset) -> g
    g.locus((p, t, args) => {y or [x, y]}, [p0, p1, n], args) -> SVG2locus
    g.arrow({tail, tip} or length, {tail, head, angle, shape, double}, anchor) -> SVG2arrow
    g.tip_to_tail(vecs, options) -> SVG2g
    g.stickman(h) -> SVG2g
    g.symbol(...args) -> SVG2g
    g.coil(size, n, reverse, r, axle) -> SVG2g

Create a <path>; must call 'update' to write 'd' attribute to <path>:
    path = g.path(start).[path directives] -> SVG2path
    path.update() -> <path> element

Register SVG2g (and subclass SVG2arrow) and SVG2locus instances to animate:
    svg.animate(g1, g2, ...) -> svg

Update-handlers for SVG2 or SVG2g instances:
    svg.beforeupdate = (svg) => {...}
    g.afterupdate = (g) => {...}

Run the animation:
    svg.play() -> svg
    svg.pause() -> svg
    svg.toggle() -> svg

Get mouse event coordinates:
    svg.eventCoords(ev) -> {coords: RArray, pixels: RArray}

Convert coordinates between child and parent coordinate systems:
    g.coord_to_parent([cx, cy]) -> RArray
    g.coord_from_parent([px, py]) -> RArray
    g.coord_to_svg([gx, gy]) -> RArray
    g.coord_from_svg([sx, sy]) -> RArray

Vector diagram helpers:
    SVG2.vec_diag = (jSelect, [vectors], {size or scale, lrbt, margin, grid, tick, label, cycle, shift}) -> SVG2
    SVG2.vec_diag_table(sym, vecs, prec, scale) -> jQuery
    svg.vec_cycle(jQuery) -> svg

***/


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

config(attr) {
/* Encapsulate multiple attributes */
    for (let k in attr) this[k] = attr[k];
    return this.update_transform();
}


/** Kinematics getters and setter **/

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

group() {return new SVG2g(this.svg, this.create_child("g"))}
scaled(s) {return new SVG2scaled(this.svg, this.create_child("g"), s)}

_px(x, i) {return Math.abs(typeof(x) == "string" ? parseFloat(x) : x * this.svg.scale[i])}

_cs(xy) {
    let [x, y] = xy == null ? [0, 0] : xy;
    let svg = this.svg;
    let [sx, sy] = svg.scale;
    if (typeof(x) == "string") x = parseFloat(x) / sx;
    if (typeof(y) == "string") y = parseFloat(y) / sy * svg.angleDir;
    return new RArray(x, y);
}

circle(r, center) {
/* Append a <circle> to the <g> element */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = svg.a2p(...this._cs(center));
    r = typeof(r) == "string" ? parseFloat(r) : r * svg.unit;
    return this.create_child("circle", {r: f(r), cx: f(x), cy: f(y)});
}

ellipse(r, center) {
/* Append a <ellipse> to the <g> element */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let rx = this._px(r[0], 0);
    let ry = this._px(r[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return this.create_child("ellipse", {rx: f(rx), ry: f(ry), cx: f(x), cy: f(y)});
}

rect(size, center) {
/* Append a <rect> to the <g> element */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let w = this._px(size[0], 0);
    let h = this._px(size[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return this.create_child("rect", {width: f(w), height: f(h), x: f(x - w / 2), y: f(y - h / 2)});
}

image(href, size, center, use) {
/* Append an <image> to the <g> element */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let w = this._px(size[0], 0);
    let h = this._px(size[1], 1);
    let [x, y] = svg.a2p(...this._cs(center));
    return this.create_child(use ? "use" : "image", {href: href, width: f(w), height: f(h), x: f(x - w / 2), y: f(y - h / 2)});
}

plot(pts, size, href, theta) {
/* Plot an array of points as circles, rectangles, or images */
    let g = this.group();
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    if (theta) theta *= svg.angleDir;
    g.$.addClass("Plot");
    if (!(pts instanceof Array)) pts = zip(pts.x, pts.y);
    for (let pt of pts) {
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
    if (tick) g.$.addClass(`Ticks Tick${ya ? 'Y' : 'X'}`);
    else g.$.addClass(`Labels Label${ya ? 'Y' : 'X'}`);
    // g.$.addClass(tick ? "Ticks" : "Labels");
    // if (!tick) g.$.addClass(ya ? "LabelY" : "LabelX");
    return g;
}

tick_label(fn, x, y, tick, offset) {
/* Draw and label tick marks along axis */
    let t = ["number", "string"].indexOf(typeof(tick)) >= 0;
    let xa = x instanceof Array;
    if (tick) this.label(t ? [0, tick] : tick, x, y);
    if (xa) this.label(fn, x, offset);
    else this.label(fn, offset, y);
    return this;
}

poly(pts, closed) {
/* Append a <polygon> or <polyline> to the <g> element */
    return this.create_child(closed ? "polygon" : "polyline", {points: this.svg.pts_str(pts)});
}

arrow(pts, options, anchor) {return new SVG2arrow(this, pts, options, anchor)}

locus(eq, param, args) {return new SVG2locus(this, eq, param, args)}
path(start) {return new SVG2path(this, start)}

line(p1, p2) {
/* Append a <line> to the <g> element */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x1, y1] = svg.a2p(...this._cs(p1));
    let [x2, y2] = svg.a2p(...this._cs(p2));
    return this.create_child("line", {x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2)});
}

grid(x, y) {
/* Draw a coordinate grid */
    let g = this.group();
    g.$.addClass("Grid");
    this._grid(g, x, y);
    this._grid(g, y, x, 1);
    return g;
}

_grid(g, x, y, swap) {
/* Draw the x (swap=false) OR y (swap=true) portion of the coordinate grid */
    if (x.length == 3) {
        let [x0, x1, dx] = x;
        let ddx = dx / 1000;
        let y0 = y[0], y1 = y[1];
        while (x0 <= x1) {
            let pts = swap ? [[y0, x0], [y1, x0]] : [[x0, y0], [x0, y1]];
            let line = g.line(...pts);
            if (Math.abs(x0) < ddx) line.addClass("Axis");
            x0 += dx;
        }
    }
}

text(data, xy) {
/* Add a <text> element to the group */
    let svg = this.svg;
    let f = (x) => x.toFixed(svg.decimals);
    let [x, y] = svg.a2p(...this._cs(xy));
    return this.create_child("text", {x: f(x), y: f(y)}).html(data);
}

symbol(...args) {
/* Render a symbol from a list of text elements */
//  BOLD = 1, ITAL = 2, SMALL = 4
    let g = this.group();
    g.$.addClass("Symbol");
    for (let [s, f, xy, opt] of args) {
        let txt = g.text(s, xy);
        if (f & 4) txt.addClass("Small");
        if (f & 2) txt.addClass("Ital");
        if (f & 1) txt.addClass("Bold");
        if (opt) {
            if (opt.size) txt.css({"font-size": `${opt.size}px`});
        }
    }
    return g;
}

cylinder(r, L) {
/* Draw a cylinder; pivot is center of the elliptical "top" */
    let g = this.group();
    g.$.addClass("Cylinder");
    let p1 = new RArray(r[0], 0);
    let p2 = p1.neg().minus([0, L]);
    g.path(p1).ver(-L).arcTo(p2, r, 2).ver(0).arcTo(p1, r).close().update();
    g.ellipse(r);
    return g;
}

stickman(h) {
/* Add a stick man as an SVG2g instance */
    let g = this.group();
    g.$.addClass("StickMan");
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

tip_to_tail(vecs, options) {
/* Draw a 2D "tip-to-tail" vector diagram */
    if (options == null) options = {};
    let g = this.group();
    g.$.addClass("TipToTail2D");
    let pt = new RArray(0, 0);
    let opt = Object.assign({tail: "6"}, options);
    for (let v of vecs) {
        let pt0 = pt;
        let tmp = pt0.plus([v[0], 0]);
        pt = pt.plus(v);
        if (v[0] || v[1]) {
            if (v[0]) g.arrow({tail: pt0, tip: tmp}, opt).$.addClass("Component");
            if (v[1]) g.arrow({tail: tmp, tip: pt}, opt).$.addClass("Component");
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

constructor(g, length, options, anchor) {
    super(g);
    let [tail, tip] = typeof(length) == "number" ? [[-length / 2, 0], [length / 2, 0]] : [length.tail, length.tip];
    tail = g._cs(tail);
    tip = g._cs(tip);
    let seg = this.seg = new Segment(...tail, ...tip);
    if (!anchor) anchor = 0;
    else if (typeof(anchor) == "string") anchor = ["tail", "center", "tip"].indexOf(anchor) - 1;
    this.pivot = seg[anchor == -1 ? "point1" : (anchor == 1 ? "point2" : "midpoint")];
    let f = (x) => Math.abs(typeof(x) == "string" ? parseFloat(x) / g.svg.scale[1] : x);
    if (options.tail) options.tail = f(options.tail);
    if (options.head) options.head = f(options.head);
    let pts = arrow_points(seg.length, options);
    pts = transform({angle: seg.deg, deg: true, shift: seg.midpoint}, ...pts);
    this.poly(pts, 1);
    this.$.addClass("Arrow");
}

}


class SVG2locus {

constructor(g, eq, param, args) {
    this.svg = g.svg;
    this.eq = eq;
    this.param = param.length > 2 ? param : param.concat([this.svg.$.width() / 3]);
    this.args = args;
    this.$ = g.create_child("polyline", {}).addClass("Locus");
    this.element = this.$[0];
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
    rx *= svg.scale[0];
    ry *= svg.scale[1] * svg.angleDir;
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

close() {
    this.d += "Z ";
    delete this.x;
    delete this.y;
    return this;
}

update() {return this.$.attr({d: this.d.trim()})}

}


class SVG2 extends SVG2g {

constructor(jSelect, options) {
    super();
    this.svg = this;
    this.element = $(jSelect)[0];
    jSelect = this.$ = $(this.element);
    this.element.graphic = this;
    this.decimals = 2;

    /* <svg> element size */
    let margin = options.margin ? options.margin : 0;
    if (typeof(margin) == "number") margin = [margin, margin, margin, margin];
    let lrbt = options.lrbt;
    let s = options.scale;
    let [w, h] = options.size ? options.size :
        (s && lrbt.length > 3 ? [s * (lrbt[1] - lrbt[0]) + margin[0] + margin[1] + 1, s * (lrbt[3] - lrbt[2]) + margin[2] + margin[3] + 1] :
            [jSelect.width(), jSelect.height()]);
    w = Math.abs(Math.round(w));
    h = Math.abs(Math.round(h));
    jSelect.attr({width: w, height: h, "data-aspect": w/h, viewBox: `0 0 ${w} ${h}`});

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
        this.grid([lrbt[0], lrbt[1] + gx/1000, gx], [lrbt[2], lrbt[3] + gy/1000, gy]);
    }

    /* Animation data */
    this.playing = false;
    this.frameRate = 60;
    this.frameCount = 0;
    this.timeFactor = 1;
    this.time = 0;
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

group() {return new SVG2g(this)}

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
    let ft = 1000 / this.frameRate;
    if (this.beforeupdate) this.beforeupdate.call(this);
    if (this.items) for (let item of this.items) {
        try {
            if (item.beforeupdate) item.beforeupdate(item);
            item.update(dt);
            if (item.afterupdate) item.afterupdate(item);
        } catch(err) {console.warn(err)}
    }
    if (anim) { // Advance frame counter and adjust frame timing to maintain desired frame rate
        this.frameCount++;
        let t = new Date().getTime();
        let d = this._fDelay;
        if (d && this._fTime) {
            d.push(t - this._fTime - ft);
            if (d.length > 5) {
                ft = Math.max(0.6 * ft, ft - Math.max(0, 1.4 * d.sum() / d.length))
                if (d.length > 80) d.splice(0, 30);
            }
        }
        this._fTime = t;            
    }
    this.time += dt;
    if (this.afterupdate) this.afterupdate.call(this);
    if (this.playing) this._animate = setTimeout(() => {this.update()}, ft);
    return this;
}

play() {
/* Start or resume the animation */
    this._fDelay = new RArray();
    delete this._fTime;
    this.playing = true;
    return this.update();
}

pause() {
/* Pause the animation */
    clearTimeout(this._animate);
    this.playing = false;
    return this;
}

toggle() {return this.playing ? this.pause() : this.play()}


/** Load and run SVG2 JavaScripts **/

static load(cb) {
    /* Send AJAX requests for SVG2 scripts */
    if (!cb) cb = aspect;
    let svgs = $("svg[data-svg2]");
    for (let svg of svgs) {
        svg = $(svg);
        let [url, id] = svg.attr("data-svg2").split("#");
        url = new URL(url, SVG2.url).href;
        if (SVG2._cache[url]) {
            SVG2.remove_pending(url);
            svg.removeAttr("data-svg2").attr("data-svg2x", `${url}#${id}`);
            SVG2._cache[url][id](svg);
        }
        else if (SVG2.load.pending.indexOf(url) == -1) {
            SVG2.load.pending.push(url);
            $.getScript({url: url, success: () => SVG2.load(cb), error: () => SVG2.remove_pending(url)});
        }
    }
    if (SVG2.load.pending.length == 0) cb();
}

static cache_run(url, id, arg) {
    url = new URL(url, SVG2.url).href;
    return SVG2._cache[url][id](arg);
}

static remove_pending(url) {
    /* Remove completed request from pending list */
    let i = SVG2.load.pending.indexOf(url);
    SVG2.load.pending.splice(i, 1);
}

static cache(url, obj) {
    /* Load SVG2 JavaScript into cache */
    SVG2._cache[new URL(url, SVG2.url).href] = obj;
}

static makeURL(url) {return new URL(url, SVG2.url).href}
static cached(url) {return SVG2._cache[new URL(url, SVG2.url).href]}


/*** Vector diagram helpers ***/

static vec_diag(sel, vecs, opt) {
/* Draw a vector diagram in an <svg> tag */
    let svg = new SVG2(sel, opt);
    svg.$.addClass("SVG2 VectorDiagram");
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
    if (opt.cycle == -1) g.$.find(".Component").hide();
    else if (opt.cycle) svg.vec_cycle(g.$, vecs.length > 1);
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
    
}

SVG2.nsURI = "http://www.w3.org/2000/svg";
SVG2._cache = {};
SVG2.load.pending = [];

SVG2.url = location.origin;
if (SVG2.url.substring(0, 16) != "http://localhost") SVG2.url += "/sci/";
