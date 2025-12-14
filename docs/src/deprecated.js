// SVG2g.prototype.text = function(data, xy, selector) {
// /* Add a <text> element to the group */
//     let svg = this.svg;
//     let e = selector ? $($(selector)[0]) : this.create_child("text");
//     let f = (x) => x.toFixed(svg.decimals);
//     let [x, y] = svg.a2p(...this._cs(xy));
//     return e.attr({x: f(x), y: f(y)}).html(data);
// }

// SVG2g.prototype.align = function(xy, x, y) {
// /* Align the element based on its bounding box */
//     let box = this.element.getBBox();
//     let [w, h] = [box.width, box.height];
//     if (w * h == 0) console.warn("Aligning group with 0 width or height:", this);
//     if (typeof(xy) == "number") xy = [xy, xy];
//     if (y == null) {
//         if (x == null) x = y = 0.5;
//         else if (typeof(x) == "string")
//             [x, y] = {top: [0.5, 0], bottom: [0.5, 1], left: [0, 0.5], right: [1, 0.5]}[x];
//     }
//     let nx = x == null;
//     let ny = y == null;
//     let dxy = this.svg.p2a(box.x + (nx ? 0 : x) * w, box.y + (ny ? 0 : y) * h).plus(this._shift);
//     dxy = this._cs(xy).minus(dxy);
//     if (nx) dxy[0] = 0;
//     if (ny) dxy[1] = 0;
//     this._shift = this._shift.plus(dxy);
//     return this.update_transform();
// }

// _text0(data, xy, anchor, selector) {
//     let e = selector ? $($(selector)[0]) : this.create_child("text");
//     let has = (c) => anchor.indexOf(c) > -1;
//     e.html(data).css({"dominant-baseline": (has("t") ? "hanging" : (has("b") ? "auto" : "middle")),
//         "text-anchor": has("l") ? "start" : (has("r") ? "end" : "middle")});
//     let [x, y] = xy == null ? [0, 0] : this.svg.a2p(...xy);
//     let f = (x) => x.toFixed(this.svg.decimals);
//     return e.attr({x: f(x), y: f(y)});
// }

// gtext(data, css, posn, theta) {
// /* Create a <g> element with aligned and possible rotated <text> */
//     if (css == null) css = [];
//     else if (!(css instanceof Array)) css = [css];
//     let outer = this.group(...css);
//     let inner = outer;
//     if (theta != null) {
//         let xy = (posn[0] instanceof Array) ? posn[0] : [posn[0], posn[1]];
//         outer.config({pivot: xy, theta: theta ? theta : 0});
//         inner = outer.group();
//     }
//     outer.content = inner.create_child("text").html(data);
//     inner.ralign(posn);
//     if (inner != outer) delete inner.element.graphic;
//     return outer;
// }

SVG2g.prototype.label = function(fn, x, y) {
/** Add a <g> containing <text> labels or tick marks as <line>, Usage:
 .label(["-5", "3"], [...range(-15, 31, 5)], 1); // Draw ticks from 5 pixels below x=1 to 3 pixels above
 .label(1, [...range(-15, 31, 5)], 2);           // Label x-axis to 1 decimal place at y=2
 .label(0, 0, [...range(-5, 5, 1)]);             // Label y-axis to 0 decimal places at x=0
 .label(f, 0, [...range(-5, 5, 1)]);             // Label y-axis at x=0 with function f generating text
**/
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
            if (parseFloat(txt.text) == 0) txt.addClass("Zero");
        }
    }
    if (tick) g.css("black@1").$.addClass(`Ticks Tick${ya ? 'Y' : 'X'}`);
    else {
        g.css("text", 15).$.addClass(`Labels Label${ya ? 'Y' : 'X'}`);
        if (ya) g.css({"text-anchor": "end"});
    }
    return g;
}

SVG2g.prototype.tick_label = function(fn, x, y, tick, offset) {
/* Draw and label tick marks along axis */
    let t = ["number", "string"].indexOf(typeof(tick)) >= 0;
    let xa = x instanceof Array;
    if (tick) this.label(t ? [0, tick] : tick, x, y);
    if (offset == null) offset = 0;
    if (xa) this.label(fn, x, offset);
    else this.label(fn, offset, y);
    return this;
}

SVG2g.prototype.graph = function(options) {
/* Add common scatter plot / line graph elements */
    let svg = this.svg;
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
                this.find("g.LabelX").config({shift: x.shift}).shift_by(dy);
                this.find("g.TickX").shift_by(dy);
            }
            if (x.title) txt.group().shift_by(dy).text(x.title[0], xy(0));
        }
        if (y) {
            let dx = [y.x ? y.x : 0, 0];
            if (y.tick) {
                this.tick_label(y.dec ? y.dec : 0, 0, [...range(...y.tick)], y.tickSize ? y.tickSize : "-6");
                this.find("g.LabelY").config({shift: y.shift}).shift_by(dx);
                this.find("g.TickY").shift_by(dx);
            }
            if (y.title) txt.group().config({theta: 90, shift: xy(1)}).shift_by(dx).text(y.title[0]);  
        }  
    }

    let data = options.data;
    if (data) {
        let g = this.group(".Series"), s = [];
        for (let series of data) {
            if (series.plot) s.push(g.plot(...series.plot));
            else {
                let gs = g.group(".Locus", "#0065fe@2", "none");
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

// gtext(data, css, posn) {
// /* Create a <g> element with an aligned <text> child */
//     if (!(css instanceof Array)) css = [css];
//     let g = this.group(...css);
//     g.text(data);
//     return g.ralign(posn);
// }

// static arr(dy) {return ["→", 5, [0, dy == null ? "20" : dy]]}

// SVG2g.prototype.symb = function(...args) {
// /* Render a symbol from a list of text elements */
// //  BOLD = 1, ITAL = 2, SMALL = 4
//     let g = this.group(".Symbol");
//     let szStr = (s) => typeof(s) == "number" ? `${size}px` : s;
//     // if (size) g.css("symbol", {"font-size": szStr(size)});
//     for (let [s, opt, pos] of args) {
//         let f = 0;
//         if (typeof(opt) == "number") [f, opt] = [opt, null];
//         let txt = g.text(s, pos);
//         if (f & 4) txt.css({"font-size": "60%"});
//         if (f & 1) txt.css(SVG2._style.bold);
//         if (f & 2) txt.css(SVG2._style.ital);
//         if (opt) {
//             if (opt.size) txt.css({"font-size": szStr(opt.size)});
//             if (opt.css) txt.css(opt.css);
//         }
//     }
//     return g;
// }

// ctext(...args) {
// /* Render multiple aligned <g> elements with <text> child nodes */
//     let gs = [];
//     for (let [t, posn, options] of args) {
//         if (options == null) options = {};
//         if (typeof(options) == "string") options = {css: options};
//         let g = this.gtext(t, options.css ? options.css : [], posn);
//         if (options.config) g.config(options.config);
//         gs.push(g);
//     }
//     return gs;
// }

// multiline(text, space) {
// /* Render multiple lines of text */
//     if (!space) space = "20";
// 	let g = this.group();
// 	let y = 0;
// 	if (typeof(space) == "string") space = parseFloat(space) / Math.abs(this.svg.scale[1]);
// 	for (let t of text.split("\n")) {
// 		g.text(t, [0, y]);
// 		y -= space;
// 	}
// 	return g;
// }

// flow(text, shape, options) {
// /* Render a flow chart element */
// 	let g = this.group();
// 	if (shape == "d") {
// 		let [sx, sy] = this.svg.scale;
// 		let w = this._cs([options.width, 0])[0] / Math.sqrt(2);
// 		g.group().config({theta: 45}).rect([w, w * Math.abs(sx/sy)]);
// 	}
// 	else {
// 		let wh = new RArray(...this._cs(options.size));
// 		if (shape == "r") g.rect(wh);
// 		else if (shape == "e") g.ellipse(wh.times(0.5));
// 		else if (shape == "p") {
// 			let [x, y] = wh.times(0.5);
// 			let d = (options.slant ? options.slant : 0.15) * x;
// 			g.poly([[d-x, y], [x+d, y], [x-d, -y], [-x-d, -y]], 1);
// 		}
// 	}
// 	g.multiline(text, options.space).align([0, 0]);
// 	return g;
// }

// async image_promise(href, selector) {
// /* Modify or append an <image> to the <g> element */
//     href = new URL(href, location.href).href;
//     let e = selector ? $($(selector)[0]) : this.create_child("image");
//     return load_img(href).then(img => {
//         return e.attr({href: href, x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight});
//     })
// }
