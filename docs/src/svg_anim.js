/***

Simple JavaScript animations rendered in an SVG element
(c) 2023-2024 by D.G. MacCarthy <sc8pr.py@gmail.com>

***/


class SVG_Item {
    /* Create, modify, and animate items (element nodes) with an SVG tag */

    get size() { // Return rectangle size using coordinate system units
        let r = this.element.getBBox();
        let svg = this.svg;
        return [r.width * svg.pixelX, r.height * svg.pixelY];
    }
    
    config(a) {return Object.assign(this, a)}
    addClass(a) {this.$.addClass(a); return this}
    css(a) {this.$.css(a); return this}
    removeClass(a) {this.$.removeClass(a); return this}

    attr(a) {
        let r = this.$.attr(a);
        return typeof(a) == "string" ? r : this;
    }

    html(a) {
        let r = this.$.html(a);
        return a == null ? r : this;
    }

    after(sel, before) {
        let e = this.svg.$;
        e = typeof(sel) == "number" ? e.children()[sel] : e.find(sel)[0];
        if (before) this.$.insertBefore(e);
        else this.$.insertAfter(e);
        return this;
    }

    before(sel) {return this.after(sel, true)}

    top() {
        this.$.insertAfter(this.svg.$.children(":last-child"));
        return this;
    }

    constructor(sel) {
        let e = this.element = $(sel)[0];
        e.graphic = this;
        this.$ = $(e);
        this._anchor = new RArray(0, 0);
        this._shift = new RArray(0, 0);
        this._theta = 0;
        this.thetaMode = -1;
        this._vel = new RArray(0, 0);
        this._acc = new RArray(0, 0);
        this._omega = 0;
    }

    final(remove) { // Remove item from list of animated items
        this.update(0);
        let items = this.svg.items;
        if (remove == 2) { // Recursive!
            let child = this.$.children();
            for (let j=0;j<child.length;j++) {
                let c = child[j].graphic;
                if (c) c.final(2);
            }
        }
        let i = items.indexOf(this);
        if (remove && i != -1) items[i].$.remove();
        items.splice(i, 1);
        return this;
    }

    _init_xy() { // Extract position from element attributes
        let tag = this.element.tagName.toLowerCase();
        if (tag == "g") return this.svg.a2p(0, 0);
        let attrNames = [["x", "y"], ["cx", "cy"], ["x1", "y1"]];
        let e = this.$;
        for (let names of attrNames) {
            let [x, y] = names;
            x = e.attr(x);
            if (x != null) return [parseFloat(x), parseFloat(e.attr(y))];
        }
        let points = e.attr(tag == "path" ? "d" : "points").replaceAll(",", " ").split(" ");
        for (let i=0;i<points.length;i++) points[i] = parseFloat(points[i]);
        let xy = [];
        for (let i=0;i<points.length;i++) {
            let x = points[i];
            if (!isNaN(x)) {
                xy.push(x);
                if (xy.length == 2) return xy;
            }
        }
    }

    /* Getters and setters for kinematics variables*/

    get position() {return this._anchor.plus(this._shift)};
    get vel() {return this._vel}
    get acc() {return this._acc}
    get theta() {return this._theta}
    get omega() {return this._omega}

    set position(xy) {this._shift = new RArray(...xy).minus(this._anchor)}
    set vel(v) {this._sprite = true; this._vel = new RArray(...v)}
    set acc(a) {this._sprite = true; this._acc = new RArray(...a)}
    set omega(w) {this._sprite = true; this._omega = w}

    set theta(t) {
        if (this.thetaMode) {
            while (t <= -180) t += 360;
            if (this.theaMode == -1)
                while (t > 180) t -= 360;            
        }
        this._theta = t;
    }

    anchor(x, y) { // Set the anchor point/centre of rotation
        this._anchor = new RArray(x, y);
        return this;
    }

    update(dt) { // Advance the item's animation state by a time step of dt
        if (this.beforeupdate) this.beforeupdate.call(this);
        if (dt && this._sprite) this.kinematics(dt);
        let svg = this.svg;
        let f = svg._f;
        let [x, y] = svg.a2p(...this._anchor);
        let t = this._theta * svg.angleDir;
        let s = t ? `rotate(${f(t)} ${f(x)},${f(y)})` : "";
        [x, y] = this._shift.times(svg.scale);
        if (x || y) s = `translate(${f(x)}, ${f(y)})` + (s.length ? " " + s : "");
        if (s.length) this.$.attr({transform: s});
        else this.$.removeAttr("transform");
        return this;
    }

    kinematics(dt) { // Perform trnaslational and rotational kinematics calculations
        if (this._omega) this.theta = this._theta + dt * this._omega;
        let v = this._vel;
        let a = this._acc;
        if (v || a) {
            let dv = a.times(dt / 2);
            v = v.plus(dv);
            this._vel = v.plus(dv);
            this._shift = this._shift.plus(v.times(dt));
        }
        return this;
    }

    setPoints(pts, line) { // Set the points attribute for polygons/polylines or lines
        let s = "", svg = this.svg;
        let f = svg._f;
        for (let i=0;i<pts.length;i++) {
            let [x, y] = svg.a2p(...pts[i]);
            if (line) {
                let a = {}
                a[`x${i+1}`] = f(x);
                a[`y${i+1}`] = f(y);
                this.$.attr(a);
            }
            else s += (s.length ? " " : "") + `${f(x)},${f(y)}`;
        }
        if (!line) this.$.attr({points: s});
        return this;
    }

    // setArc(r, center, a1, a2, sector, rev) { // Set the path data for an arc or sector
    //     let svg = this.svg;
    //     let f = svg._f;
    //     this.info = [r, center, a1, a2, sector];
    //     if (typeof(r) == "number") r = [r, r];
    //     let [x1, y1] = svg.a2p(...new RArray(r[0] * cos(a1), r[1] * sin(a1)).plus(center));
    //     let [x2, y2] = svg.a2p(...new RArray(r[0] * cos(a2), r[1] * sin(a2)).plus(center));
    //     let [r1, r2] = svg.scale.times(r);
    //     let large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    //     let sweep = a2 > a1 ? 0 : 1;
    //     if (rev) sweep = 1 - sweep;
    //     let code = `M ${f(x1)} ${f(y1)} A ${f(r1)} ${f(Math.abs(r2))} 0 ${large} ${sweep} ${f(x2)} ${f(y2)}`;
    //     if (sector) {
    //         if (sector instanceof Array) center = sector;
    //         [x2, y2] = svg.a2p(...center);
    //         code += ` L ${f(x2)} ${f(y2)} L ${f(x1)} ${f(y1)}`;
    //     }
    //     this.$.attr({d: code});
    //     return this;
    // }

    *_locus() { // Generate a sequence of points from a function/parameterized curve
        let [x0, x1, n] = this._param;
        let dx = (x1 - x0) / n;
        let t = this.svg.time;
        for (let i=0;i<=n;i++) {
            let x = x0 + i * dx;
            let y = this._f(x, t, this.args);
            yield typeof(y) == "number" ? [x, y] : y;
        }
    }

    locusUpdate(dt) { // Alternate update method for locus polylines
        this.setPoints([...this._locus()]);
        SVG_Item.prototype.update.call(this, dt);        
    }

}

SVG_Item.nsURI = "http://www.w3.org/2000/svg";


class SVG_Animation {

    config(attr) {return Object.assign(this, attr)}

    constructor(sel, l, r, b, t, margin) {
        let e = this.element = $(sel)[0];
        e.graphic = this;
        e = this.$ = $(e).attr({xmlns: SVG_Item.nsURI});
        this.coords(l, r, b, t, margin);
        if (l != null || e.attr("viewBox") == null) {
            let [w, h] = this.size;
            e.attr({viewBox: `0 0 ${w} ${h}`});
        }
        this.items = [];
        this.fix = 4;

        // Animation
        this.playing = false;
        this.frameRate = 60;
        this.frameCount = 0;
        this.timeFactor = 1;
        this.time = 0;
    }

    get _f() { // Round numbers to the specified number of decimal places
        let f = this.fix;
        return (x) => x.toFixed(f);
    }

    get size() { // Return the width and height attributes of the <svg> element
        let e = this.$;
        return new RArray(parseFloat(e.attr("width")), parseFloat(e.attr("height")));
    }

    fromCorner(quad, offset) {
        let [x1, y1] = this.p2a(0, 0);
        let [x2, y2] = this.p2a(...this.size);
        let [sx, sy] = this.scale;
        let num = (x, s) => typeof(x) == "string" ? parseFloat(x) / s: x;
        let [offX, offY] = [num(offset[0], sx), num(offset[1], sy)];
        let x = (quad - 1) % 3 ? x1 + offX : x2 - offX;
        let y = quad < 3 ? y1 - offY : y2 + offY;
        return new RArray(x, y);
    }

    /* Ratios of abstract and pixel units */
    get scaleX() {return this.scale[0]}
    get scaleY() {return this.scale[1]}
    get pixelX() {return 1 / Math.abs(this.scale[0])}
    get pixelY() {return 1 / Math.abs(this.scale[1])}

    get scaleRatio() {
        let [sx, sy] = this.scale;
        return Math.abs(sx / sy);
    }

    coords_by_map(p1, a1, p2, a2) { // Assign drawing an abstract coordinate system
        let [adx, ady] = new RArray(...a2).minus(a1);
        let [pdx, pdy] = new RArray(...p2).minus(p1);
        let sx = pdx / adx;
        let sy = pdy / ady;
        let s = this.scale = new RArray(sx, sy);
        this.unit = Math.sqrt((sx*sx + sy*sy) / 2);
        this.angleDir = sx * sy < 0 ? -1 : 1;
        let t = new RArray(-1/sx, -1/sy);
        p1 = new RArray(...p1).minus(s.times(a1));
        this.a2p = (x, y) => {return p1.plus(s.times([x,y]))}
        this.p2a = (x, y) => {return p1.minus([x,y]).times(t)}
    }

    coords(l, r, b, t, m) { // Assign drawing an abstract coordinate system
        if (l == null) {
            this.a2p = this.p2a = (x, y) => {return new RArray(x, y)}
            Object.assign(this, {scale:new RArray(1, 1), unit:1, angleDir:1});            
        }
        else {
            if (!m) m = 0;
            let [w, h] = this.size;
            if (r == null) {
                r = Math.abs(l);
                l = -r;
            }
            let sx = (w - 2 * m) / (r - l);
            if (t == null) {
                let dy = (h - 2 * m) / sx;
                if (b == null) b = -dy / 2;
                t = b + dy;
            }
            this.coords_by_map([m, m], [l, t], [w - m, h - m], [r, b]);
        }
    }

    eventCoords(ev) {
        let e = this.$;
        let dx = parseFloat(e.css("padding-left")) + parseFloat(e.css("border-left-width"));
        let dy = parseFloat(e.css("padding-top")) + parseFloat(e.css("border-top-width"));
        let r = this.element.getBoundingClientRect();
        let px = new RArray(ev.clientX - (r.x + dx), ev.clientY - (r.y + dy));
        px[0] *= parseFloat(e.attr("width")) / e.width();
        px[1] *= parseFloat(e.attr("height")) / e.height();
        return {pixels: px, coords: this.p2a(...px)};
    }

    /* Blob functions */
    bdata(filename) {return new BData(this.element, filename)} // Defined in util.js
    blob() {return this.bdata().blob}
    save(filename) {return this.bdata(filename).save()}
    open(filename) {return this.bdata(filename).open()}

    stylesheet(url) {
        let e = this.element;
        $.ajax({url: url, success: (r) => {
            $("<style>").html(r).appendTo(e);
        }});
        return this;
    }

    update(dt) { // Update the drawing each frame (or when needed)
        clearTimeout(this._animate);
        let anim = dt == null;
        if (anim) dt = this.timeFactor / this.frameRate;
        let ft = 1000 / this.frameRate;
        if (this.beforeupdate) this.beforeupdate.call(this);
        for (let item of this.items) item.update(dt);
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
        for (let item of this.items)
            if (item.onupdate) item.onupdate.call(item);
        if (this.onupdate) this.onupdate.call(this);
        if (this.playing) this._animate = setTimeout(() => {this.update()}, ft);
        return this;
    }

    play() { // Start or resume the animation
        this._fDelay = new RArray();
        delete this._fTime;
        this.playing = true;
        return this.update();
    }

    pause() { // Pause the animation
        clearTimeout(this._animate);
        this.playing = false;
        return this;
    }

    toggle() {return this.playing ? this.pause() : this.play()}

    find(sel) { // Find an SVG_Item using its associated element node
        try {return this.$.find(sel)[0].graphic}
        catch(err) {}
    }

    item(sel) { // Attach an SVG element to a new SVG_Item instance
        let gr = new SVG_Item(sel);
        this.items.push(gr);
        gr.svg = this;
        try {gr._anchor = this.p2a(...gr._init_xy())}
        catch(err) {
            // console.warn(err);
            gr._anchor = this.p2a(0, 0);
        }
        return gr;
    }

    final() { // Mark ALL items as non-animated
        for (let item of [...this.items]) item.final();
        return this;
    }

    create(tag, attr, parent) { // Create and append a new element node to the <svg> or a <g> node
        let e = $(document.createElementNS(SVG_Item.nsURI, tag));
        let f = this._f;
        if (attr == null) attr = {};
        for (let k in attr) {
            let x = attr[k];
            if (typeof(x) == "number") attr[k] = f(x);
        }
        if (parent instanceof SVG_Item || parent == this) parent = parent.$;
        e.attr(attr).appendTo(parent ? parent : this.$);
        return this.item(e);
    }

    gradient(id, c1, c2, x1, x2, y1, y2) {
        let elem = (t, a) => {
            let e = document.createElementNS(SVG_Item.nsURI, t);
            if (a != null) $(e).attr(a);
            return e;
        }
        let defs = this.$.find("defs")[0];
        if (!defs) {
            defs = elem("defs");
            this.$.append(defs);
        }
        let gr = $(elem("linearGradient", {
            id: id,
            x1 : `${x1 == null ? 0 : x1}%`,
            x2 : `${x2 == null ? 100 : x2}%`,
            y1 : `${y1 == null ? 0 : y1}%`,
            y2 : `${y2 == null ? 0 : y2}%`
        })).appendTo(defs);
        gr.append(elem("stop", {offset: "0%", "stop-color" : c1}));
        gr.append(elem("stop", {offset: "100%", "stop-color" : c2}));
        return this;
    }

    group(parent) {return this.create("g", {}, parent)}

    poly(pts, closed, parent) { // Create a polygon or polyline
        return this.create(closed ? "polygon" : "polyline", {points: [[0, 0]]}, parent).setPoints(pts);
    }

    locus(f, param, args, closed, parent) { // Create a polyline from a function and recalculate automatically
        let p = this.poly([], closed, parent);
        p._f = f;
        p._param = param.length < 3 ? [...param, this.size[0]] : [...param];
        p.args = args;
        p.update = p.locusUpdate;
        return p;
    }

    text(msg, xy, parent) { // Create a text element
        let p = this.a2p(...xy);
        let e = this.create("text", {x: p[0], y: p[1]}, parent);
        e.$.html(msg);
        return e;
    }

    sciNot(opt, xy, parent) { // Create a <text> element for scientific notation
        opt = Object.assign({dy: 9}, opt);
        let s1 = opt.coeff ? `${opt.coeff} × 10` : "10";
        s1 = `<tspan>${s1}</tspan>`;
        let s2 = `<tspan class="Sup" dy="${-opt.dy}">${opt.exp}</tspan>`;
        let s3 = opt.unit ? ' ' + opt.unit : "";
        s3 = `<tspan dy="${opt.dy}">${s3}</tspan>`;
        return this.text(s1 + s2 + s3, xy, parent);
    }

    circle(r, xy, parent) { // Create a <circle> element
        xy = this.a2p(...xy);
        r = typeof(r) == "string" ? parseFloat(r) : r * this.unit;
        return this.create("circle", {r: r, cx: xy[0], cy: xy[1]}, parent);
    }

    ellipse(rx, ry, xy, parent) { // Create an <ellipse> element
        xy = this.a2p(...xy);
        rx = typeof(rx) == "string" ? parseFloat(rx) : rx * this.scaleX;
        ry = typeof(ry) == "string" ? parseFloat(ry) : ry * this.scaleY * this.angleDir;
        return this.create("ellipse", {rx: rx, ry: ry, cx: xy[0], cy: xy[1]}, parent);
    }

    _rect(size, xy) {
        let [w, h] = size;
        if (typeof(w) == "string") w = parseFloat(w) * this.pixelX;
        if (typeof(h) == "string") h = parseFloat(h) * this.pixelY;
        [w, h] = this.scale.times([w, h]);
        w = Math.abs(w);
        h = Math.abs(h);
        xy = this.a2p(...xy).plus(new RArray(w, h).times(-0.5));
        return [w, h, xy];
    }

    rect(size, xy, parent) { // Create a rectangle element
        if (!(size instanceof Array)) size = [size, size];
        let [w, h, pt] = this._rect(size, xy);
        return this.create("rect", {x: pt[0], y: pt[1], width: w, height: h}, parent).anchor(...xy);
    }

    image(href, size, xy, parent) { // Create an image element
        let [w, h, pt] = this._rect(size, xy);
        return this.create("image", {href: href, x: pt[0], y: pt[1], width: w, height: h}, parent).anchor(...xy);
    }

    path(xy) {return new SVG_Path(this, xy)}

    symbol(sym, opt, xy, parent) {
        if (opt == null) opt = {};
        let size = 28 * (opt.scale ? opt.scale : 1);
        let attr = {"font-size": size, "text-anchor": "middle", "dominant-baseline": "middle"};
        let g = this.group(parent).addClass("Symbol").css(attr);
        let t = this.text(sym, [0, 0], g);
        let tmp = $(document.createElementNS(SVG_Item.nsURI, "svg"));
        tmp.appendTo("body").append(g.$);
        let rect = g.element.getBBox();
        g.$.appendTo(parent ? parent.$ : this.$);
        if (opt.vec) {
            let sz = size / 1.5;
            let y = "acegmnopqrsuvwxyz".indexOf(sym) == -1 ? sz : sz / 1.7;
            t.css({"font-weight": "bold"});
            this.text("→", [0, y * this.pixelY], g).css({"font-size": sz});
        }
        else t.css({"font-style": "italic"});
        let x = rect.width / 1.8 * this.pixelX;
        let y = size / 2.4 * this.pixelY;
        if (opt.delta) {
            this.text("Δ", [-x, 0]).css({"text-anchor": "end"}).before(t.$);
        }
        for (let i=1;i<=4;i++) {
            let s = opt[`q${i}`];
            if (s != null) {
                let t = this.text(s, [x, y], g).css({"font-size": size / 1.5});;
                t.css({"text-anchor": i == 1 || i == 4 ? "start": "end"});
                if (typeof(s) != "number") t.css({"font-style": "italic"});
            }
            if (i == 1 || i == 3) x = -x;
            else if (i == 2) y = -y / 1.5;
        }
        if (opt.recenter) {
            let orig = this.a2p(0, 0);
            let dx = orig[0] - (rect.x + rect.width / 2);
            let dy = orig[1] - (rect.y + rect.height / 2);
            let e = g.$.find("*");
            for (let i=0;i<e.length;i++) {
                let ti = $(e[i]);
                if (ti.attr("x")) ti.attr({x: dx + parseFloat(ti.attr("x"))});
                if (ti.attr("y")) ti.attr({y: dy + parseFloat(ti.attr("y"))});
            }
        }
        tmp.remove();
        return g.config({position: xy});
    }

    // mpl(latex, size, xy, parent) {
    //     let url = `https://webapp2023-davidmaccarthy.replit.app/mpl.png?math=${latex}`;
    //     return this.image(url, size, xy, parent);
    // }

    line(p1, p2, parent) { // Create a line element
        let s = new Segment(...p1, ...p2);
        p1 = this.a2p(...p1);
        p2 = this.a2p(...p2);
        return this.create("line", {x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1]}, parent).config({segment: s});
    }

    grid(x, y, omitAxes, parent) { // Draw horizontal and/or vertical grid lines
        let group = this.create("g", {}, parent);
        group.$.addClass("Grid");
        let axes = omitAxes ? null : [];
        let x0 = x[0]; let x1 = x[1]; let dx = x[2];
        let y0 = y[0]; let y1 = y[1]; let dy = y[2];
        if (dx) this._grid(group, axes, 0, x0, x1, dx, y0, y1);
        if (dy) this._grid(group, axes, 1, y0, y1, dy, x0, x1);
        if (axes != null) for (let a of axes) a.$.appendTo(group.$);
        return group;
    }

    _grid(group, axes, dim, x0, x1, dx, y0, y1) {
        let ddx = dx / 1000;
        x1 += ddx;
        for (let x=x0; x<=x1; x+=dx) {
            let p1 = dim ? [y0, x] : [x, y0];
            let p2 = dim ? [y1, x] : [x, y1];
            let axis = Math.abs(x) < ddx;
            if (!axis || axes != null) {
                let line = this.line(p1, p2, group.$).final();
                if (axis) {
                    line.$.addClass("Axis");
                    axes.push(line);
                }
            }
        }
    }

    _offset(x, y) {
        if (typeof(x) == "string") x = parseFloat(x) * this.pixelX;
        if (typeof(y) == "string") y = parseFloat(y) * this.pixelY;
        return new RArray(x, y);
    }

    axis(opt, parent) { // Draw an axis and labels
        let v = opt.y instanceof Array;
        let x1, x2, y1, y2, c;
        if (v) {
            c = "Y";
            x1 = x2 = opt.x ? opt.x : 0;
            [y1, y2] = opt.y;
        }
        else {
            c = "X";
            y1 = y2 = opt.y ? opt.y : 0;
            [x1, x2] = opt.x;        
        }
        this.line([x1, y1], [x2, y2], parent).$.addClass(`Axis${c}`);
        if (opt.ticks) {
            let ticks = opt.ticks;
            let fmt = ticks.format ? ticks.format : (x) => {
                return ticks.fixed != null ? x.toFixed(ticks.fixed) : x;
            }
            let dx = ticks.interval;
            let l = ticks.length;
            if (typeof(l) == "string") l = parseFloat(l) * (v ? this.pixelX : this.pixelY);
            let minor = ticks.minor;
            let n1 = Math.floor((v ? y1 : x1) / dx);
            let n2 = Math.ceil((v ? y2 : x2) / dx);
            while (n1 <= n2) {
                let drawZero = n1 != 0 || !ticks.omitZero;
                let x = dx * n1;
                let [a1, a2] = v ? [y1, y2] : [x1, x2];
                if (x >= a1 && x <= a2) {
                    let pts = v ? [[x1, x], [x1 - l, x]] : [[x, y1], [x, y1 - l]];
                    if (drawZero) {
                        if (l) this.line(...pts, parent).$.addClass(`Tick${c}`);
                        let label = fmt(x);
                        if (label != null) {
                            let pt = new RArray(...pts[0]);
                            if (ticks.offset) pt = pt.plus(this._offset(...ticks.offset));
                            this.text(label, pt, parent).$.addClass(`TickLabel${c}`);;
                        }
                    }
                    if (minor && l) {
                        for (let m=1;m<minor;m++) {
                            x += dx / minor;
                            if (x <= a2) {
                            pts = v ? [[x1, x], [x1 - l/2, x]] : [[x, y1], [x, y1 - l/2]];
                            this.line(...pts, parent).$.addClass(`Tick${c}`);
                            }
                        }
                    }
                }
                n1 += 1;
           }
        }
        if (opt.title) {
            let txt = this.text(opt.title.text, opt.title.position, parent);
            if (v) txt.theta = 90;
            txt.$.addClass(`Title${c}`);
        }
        return this;
    }

    _make_marker(marker, g) {
        let mark;
        if (marker.radius) mark = (p) => this.circle(marker.radius, p, g);
        else if (marker.rect) mark = (p) => this.rect(marker.rect, p, g);
        else if (marker.tri) {
            let y0 = marker.tri, rt2 = Math.sqrt(2);
            let y = parseFloat(y0);
            let vert = [[0, y/rt2], [-y/2, -y/4], [y/2, -y/4]];
            if (typeof(y0) == "string") for (let i=0;i<3;i++) {
                vert[i][0] *= this.pixelX;
                vert[i][1] *= this.pixelY;
            }
            mark = (p) => this.poly(vert, 1, g).anchor(0, 0).config({position: p});
        }
        else if (marker.cross) {
            let y0 = marker.cross, x, y;
            let s = typeof(y0) == "string";
            if (s) {
                y0 = parseFloat(y0);
                x = y0 * this.pixelX;
                y = y0 * this.pixelY;
            }
            else {x = y = y0}
            let xw = x/5, yw = y/5;
            let vert = [[xw, yw], [x, yw], [x, -yw], [xw, -yw], [xw, -y], [-xw, -y],
                [-xw, -yw], [-x, -yw], [-x, yw], [-xw, yw], [-xw, y], [xw, y]];
            mark = (p) => this.poly(vert, 1, g).anchor(0, 0).config({position: p});
        }
        return mark;
    }

    plot(pts, marker, parent) {
    /* Plot a sequence of point markers...
        Marker can be a number or an object with one required key (radius, rect, tri, cross)
        and optional keys (css, config). Marker size is in pixels if a string or drawing
        units if a number. */
        let g = this.group(parent);
        try {
            let y = pts.y;
            if (typeof(y) == "function") y =[...fn_eval(y, pts.x)];
            pts = zip(pts.x, y);
        } catch(err) {};
        let mtype = typeof(marker);
        mtype = mtype != "number" && mtype != "string";
        let mark = mtype ? this._make_marker(marker, g) : (p) => this.circle(marker, p, g);
        for (let pt of pts) {
            let m = mark(pt);
            if (mtype) {
                if (marker.config) m.config(marker.config);
                if (marker.css) m.css(marker.css);
            }
        }
        return g.addClass("Plot");
    }

    arrow(tail, tip, options, parent) { // Draw an arrow
        options = Object.assign({}, options);
        let u = this.unit;
        if (u != 1) {
            let px = (x) => typeof(x) == "string" ? x : parseFloat(x) * u;
            if (options.tail) options.tail = px(options.tail);
            if (options.head) options.head = px(options.head);
        }
        if (tip == null) {tip = tail; tail = [0, 0]}
        if (typeof(tip) == "number") tip = [tail[0] + tip, tail[1]];
        let seg = new Segment(...tail, ...tip);
        let anchor = options.anchor;
        anchor = seg[anchor == "tail" ? "point1" : (anchor == "tip" ? "point2" : "midpoint")];
        tail = this.a2p(...tail);
        tip = this.a2p(...tip);
        let segp = new Segment(...tail, ...tip);
        let pts = arrow_points(segp.length, options);
        pts = transform({angle: segp.rad, shift: segp.midpoint}, ...pts);
        for (let i=0;i<pts.length;i++) pts[i] = this.p2a(...pts[i]);
        return this.poly(pts, 1, parent).anchor(...anchor).config({info: seg});
    }

    stickMan(size, head, parent) { // Draw a stickman figure
        let g = this.group(parent).addClass("StickMan");
        let [x, y] = head;
        let r = size / 10;
        let d = 1.75 * r;
        this.circle(r, [x, y-r], g);
        this.line([x, y-2*r], [x, y-6.5*r], g);
        this.poly([[x-d, y-4.2*r], [x, y-3.7*r], [x+d, y-3.5*r]], 0, g);
        this.poly([[x-d, y-size], [x, y-6.5*r], [x+d, y-size]], 0, g);
        return g;
    }
}


class SVG_Path {

    constructor(svg, xy) {
        this.svg = svg;
        this.d = "";
        this.moveTo(xy == null ? [0, 0] : xy);
    }

    moveTo(xy, c) {
        let svg = this.svg;
        let f = svg._f;
        let [x, y] = xy;        
        this.x = x;
        this.y = y;
        [x, y] = svg.a2p(...xy);
        this.d += `${c ? c : 'M'} ${f(x)} ${f(y)} `;
        return this;
    }

    lineTo(xy, c) {return this.moveTo(xy, "L")}

    hor(x) { // Move horizontally
        let svg = this.svg;
        let f = svg._f;
        this.x = x;
        x = svg.a2p(x, 0)[0];
        this.d += `H ${f(x)} `;
        return this;
    }

    ver(y) { // Move vertically
        let svg = this.svg;
        let f = svg._f;
        this.y = y;
        y = svg.a2p(0, y)[1];
        this.d += `V ${f(y)} `;
        return this;
    }

    arcTo(xy, r, choice, rotn) { // Draw a circular or elliptical arc to the specified point
        let svg = this.svg;
        let f = svg._f;
        let rx, ry;
        if (r instanceof Array) [rx, ry] = r;
        else rx = ry = r;
        rx *= svg.scaleX;
        ry *= svg.scaleY * svg.angleDir;
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
        let f = svg._f;
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

    item(parent) {return this.svg.create("path", {d: this.d.trim()}, parent)}

}
