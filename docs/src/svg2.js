/***

Simple JavaScript animations rendered in an <svg> element
(c) 2023-2024 by D.G. MacCarthy <sc8pr.py@gmail.com>

Create a new animation:
    svg = new SVG2(jSelect, {size, lrbt, margin});

Create and configure an animated group:
    g = svg.group();
    g.config({theta, omega, alpha, pivot, shift, vel, acc});

Get the <svg>/<g> element or the jQuery object:
    svg.element;
    g.$;

Add content to a <svg>/<g> tag:
    svg.grid([x1, x2, dx], [y1, y2, dy]);
    g.line([x1, y1], [x2, y2]);
    g.circle(r, [cx, cy]);
    g.ellipse([rx, ry], [cx, cy]);
    g.rect([w, h], [cx, cy]);
    g.poly([pts], closed);
    g.arrow(length, {shape, tail, head, angle, double});

Create an SVG_Group instance containing an arrow:
    g.arrow_group(length, xy, pivot, {shape, tail, head, angle, double});
    // pivot is "tail", "tip", "center" (default) or a point as [x, y]
    // xy is the position of the pivot

Register groups to animate:
    svg.animate(g1, g2);

Update-handlers for SVG2 or SVG_Group instances:
    svg.beforeupdate = (svg) => {...};
    g.afterupdate = (g) => {...};

Run the animation:
    svg.play();
    svg.pause();
    svg.toggle();

Convert coordinates between <g> and <svg> coordinate systems:
    g.coord_s([gx, gy]);
    g.coord_g([sx, sy]);

***/


class SVG_Group {

    constructor(svg, g) {
        if (svg) {
            this.element = g ? $(g)[0] : document.createElementNS(SVG2.nsURI, "g");
            this.element.graphic = this;
            this.$ = $(this.element);
            this.$.appendTo(g ? g.$ : svg.$);
            this.svg = svg;
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

    set pivot(xy) {this._pivot = new RArray(...xy)}
    set shift(xy) {this._shift = new RArray(...xy)}
    set vel(xy) {this._vel = new RArray(...xy)}
    set acc(xy) {this._acc = new RArray(...xy)}

    set theta(a) {
        while (a >= 360) a -= 360;
        while (a < 0) a += 360;
        this._theta = a;
    }


/** Coordinate transformations **/

    coord_s(xy) {
    /* Apply <g> rotation and shift to convert coordinates xy relative to <svg> */
        let a = this.theta * this.svg.angleDir;
        return transform({angle: -a, deg: true, center: this._pivot, shift: this._shift}, xy)[0];
    }

    coord_g(xy) {
    /* Apply <g> rotation and shift to convert <svg> coordinates xy relative to <g> */
        let a = this.theta * this.svg.angleDir;
        xy = this._shift.neg().plus(xy);
        return transform({angle: a, deg: true, center: this._pivot}, xy)[0];
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

    kinematics(dt) {
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
        // console.log(tag, this);
        let c = $(document.createElementNS(SVG2.nsURI, tag));
        return c.attr(attr ? attr : {}).appendTo(this.element);
    }

    group() {return new SVG_Group(this.svg, this.create_child("g"))}

    _px(x, i) {return Math.abs(typeof(x) == "string" ? parseFloat(x) : x * this.svg.scale[i])}

    circle(r, center) {
    /* Append a <circle> to the <g> element */
        let svg = this.svg;
        let f = (x) => x.toFixed(svg.decimals);
        let [x, y] = svg.a2p(...center);
        r = typeof(r) == "string" ? parseFloat(r) : r * svg.unit;
        return this.create_child("circle", {r: f(r), cx: f(x), cy: f(y)});
    }

    ellipse(r, center) {
    /* Append a <ellipse> to the <g> element */
        let svg = this.svg;
        let f = (x) => x.toFixed(svg.decimals);
        let rx = this._px(r[0], 0);
        let ry = this._px(r[1], 1);
        let [x, y] = svg.a2p(...center);
        return this.create_child("ellipse", {rx: f(rx), ry: f(ry), cx: f(x), cy: f(y)});
    }

    rect(size, center) {
    /* Append a <rect> to the <g> element */
        let svg = this.svg;
        let f = (x) => x.toFixed(svg.decimals);
        let w = this._px(size[0], 0);
        let h = this._px(size[1], 1);
        let [x, y] = svg.a2p(...center);
        return this.create_child("rect", {width: f(w), height: f(h), x: f(x - w / 2), y: f(y - h / 2)});
    }

    poly(pts, closed) {
    /* Append a <polygon> or <polyline> to the <g> element */
        let svg = this.svg;
        let pts_str = "";
        let f = (x) => x.toFixed(svg.decimals);
        for (let i=0;i<pts.length;i++) {
            let [x, y] = svg.a2p(...pts[i]);
            pts_str += (pts_str.length ? " " : "") + `${f(x)},${f(y)}`;
        }
        return this.create_child(closed ? "polygon" : "polyline", {points: pts_str});
    }

    arrow(length, options) {
    /* Draw an arrow (centred at the origin, pointing right) as a <polygon> */
        options = options == null ? {} : Object.assign({}, options);
        let svg = this.svg;
        let f = (x) => Math.abs(typeof(x) == "string" ? parseFloat(x) / svg.scale[0] : x);
        if (options.tail) options.tail = f(options.tail);
        if (options.head) options.head = f(options.head);
        return this.poly(arrow_points(length, options), 1);
    }

    arrow_group(length, xy, pivot, options) {
    /* Create an arrow wrapped in a <g> tag */
        let i = pivot == null ? 2 : ["tail", "tip", "center"].indexOf(pivot);
        if (i == 0) pivot = [-length / 2, 0];
        else if (i == 1) pivot = [length / 2, 0];
        else if (i == 2) pivot = [0, 0];
        if (i >= 0) xy = new RArray(...xy).minus(pivot);
        let g = this.group().config({shift: xy, pivot: pivot});
        g.arrow(length, options); 
        return g;
    }

    line(p1, p2) {
    /* Append a <line> to the <g> element */
        let svg = this.svg;
        let f = (x) => x.toFixed(svg.decimals);
        let [x1, y1] = svg.a2p(...p1);
        let [x2, y2] = svg.a2p(...p2);
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


}


class SVG2 extends SVG_Group {

    constructor(jSelect, options) {
    /* options = {size, lrbt, margin} */

        super();
        this.svg = this;
        this.element = $(jSelect)[0];
        jSelect = this.$ = $(this.element);
        this.element.graphic = this;
        this.decimals = 2;
    
        /* <svg> element size */
        let [w, h] = options.size ? options.size : [jSelect.width(), jSelect.height()];
        jSelect.attr({width: w, height: h, "data-aspect": w/h, viewBox: `0 0 ${w} ${h}`});

        /* Coordinate system */
        let lrbt = options.lrbt;
        if (lrbt) {
            let margin = options.margin ? options.margin : 0;
            if (typeof(margin) == "number") margin = [margin, margin, margin, margin];
            let [l, r, b, t] = margin;
            if (lrbt.length < 4)
            lrbt = SVG2.auto_lrbt(w - margin[0] - margin[1], h - margin[2] - margin[3], ...lrbt);
            this.coords_by_map([l, h - 1 - b], [lrbt[0], lrbt[2]], [w - 1 - r, t], [lrbt[1], lrbt[3]]);
        }
        else {
            this.coords_by_map([0, 0], [0, 0], [1, 1], [1, 1]);
            this.p2a = this.a2p = (x, y) => new RArray(x, y);
        }

        /* Animation data */
        this.playing = false;
        this.frameRate = 60;
        this.frameCount = 0;
        this.timeFactor = 1;
        this.time = 0;
    }

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

    update_transform() {
    /* Override SVG_Group.prototype.update_transform */
        return this;
    }

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

    group() {return new SVG_Group(this)}


    /** Animation methods **/

    animate(...args) {
    /* Save an array of animated SVG_Group instances */
        this.items = [];
        for (let arg of args) {
            if (!(arg instanceof SVG_Group)) arg = $(arg)[0].graphic;
            this.items.push(arg);
        }
    }

    update(dt) {
    /* Update the drawing each frame (or when needed) */
        clearTimeout(this._animate);
        let anim = dt == null;
        if (anim) dt = this.timeFactor / this.frameRate;
        let ft = 1000 / this.frameRate;
        if (this.beforeupdate) this.beforeupdate.call(this);
        for (let item of this.items) {
            if (item.beforeupdate) item.beforeupdate(item);
            item.kinematics(dt);
            if (item.afterupdate) item.afterupdate(item);
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

}

SVG2.nsURI = "http://www.w3.org/2000/svg";
