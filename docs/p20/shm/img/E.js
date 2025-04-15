SVG2.cache("p20/shm/img/E.js", {

pend: (sel) => {
    $(sel).attr({width: 300, height: 400, "data-aspect": "3/4"});
    let svg = new SVG_Animation(sel, -1.5, 1, -3.25);
    svg.$.css({"font-size": "28px"});
    // svg.grid([-1.5, 1.5, 0.25], [-3.5, 1, 0.25], 1);
    let p = vec2d(3, 245);
    svg.line([0.25, p[1]], p).css({stroke: "red", "stroke-width": "2px"});
    let g = svg.group().addClass("Serif").css({stroke: "none", fill: "red"});
    svg.text("L", [-0.8, -1.25], g).css({"font-style": "italic"});
    svg.text("h", [0.25, -2.9], g).css({"font-style": "italic"});
    svg.text("θ", [-0.1, -0.5], g);
    svg.text("L", [0.15, -1.5], g).css({"font-style": "italic"});
    svg.text("cos θ", [0.56, -1.5], g);
    let arc = svg.path([0, -3]).arcTo(p, 3, 2);
    arc.item().css({fill: "none", stroke: "#0065FE", "stroke-width": "3px"});
    g = svg.group().css({stroke: "black", "stroke-width": "2px"});
    svg.line([0, 0], p, g);
    svg.line([0, 0], [0, -3], g);
    svg.circle(0.1, p, g);
    svg.circle(0.1, [0, -3], g);
    g.$.find("circle").css({fill: "white"});
    g = svg.group().addClass("Serif").css({"font-style": "italic", fill: "#0065FE"});
    svg.text("x", [-0.65, -3.1], g);
    svg.symbol("x", {q4: 'H'}, [-0.65, -2.57]).css({fill: "red"});

    svg.final();
},

spring: (sel) => {
    $(sel).attr({width: 400, height: 192, "data-aspect": "25/12"});
    let svg = new SVG_Animation(sel, -2.52, 2, -0.75);
    svg.$.css({"font-size": "20px"});
    let css = {fill: "none", stroke: "black", "stroke-width": "2px"}
    svg.poly([[2, 0], [-2.5, 0], [-2.5, 1]]).css(css);
    svg.arrow([0, -0.3], [0, 0], {tail: "4"}).css({fill: "#0065FE"});
    svg.text("Eqm", [0, -0.5]).css({fill: "#0065FE"});
    svg.symbol("F", {q4: "elas", vec:1, recenter: 1}, [1.5, 1.05]).css({fill: "red"});
    svg.xLabel = svg.symbol("x", {vec:1}, [1.5, 0.6]).css({fill: "#0065FE"});
    svg.final();

    let r = svg.rect([0.4, 0.4], [1.5, 0.2]).css({fill: "#0065FE", stroke: "black"});
    r.beforeupdate = function() {
        this.config({position: [1.2 * cos(60 * this.svg.time), 0.2]});
    }
    r.beforeupdate();

    r = svg.poly([[0, 0.2], [1, 0.2]]).css({stroke: "darkgrey", "stroke-width": "2px", fill: "none"});
    r.beforeupdate = function() {
        let x = this.svg.items[0].position[0] - 0.3;
        let n = 14;
        let pts = [[-2.5, 0.2], [-2.3, 0.2]];
        let dx = (x + 2.3) / (n - 0);
        let i = 0.5;
        while (i < n - 1) {
            pts.push([dx * i - 2.3, (i - 0.5) % 2 ? 0.1 : 0.3]);
            i++;            
        }
        pts.push([dx * (i - 0.5) - 2.3, 0.2]);
        pts.push([x + 0.1, 0.2]);
        this.setPoints(pts);
    }

    svg.beforeupdate = function() {
        let a = this.xArrow;
        a = a ? a.theta : 0;
        if (this.label) this.label.final(2);
        let g = this.label = this.group();
        let x = this.items[0].position[0];
        let attr = Math.abs(x) > 0.3 ? {} : {shape: 2};
        this.xArrow = this.arrow([0, 0.7], [x, 0.7], attr, g).config({theta: a}).css({fill: "#0065FE", stroke: "black"});
        this.arrow([x, 1], [-0.4 * x, 1], attr, g).css({fill: "red", stroke: "black"}); //.final();
    }

    svg.update(0);
    svg.$.on("click", (ev) => {
        let e = ev.target;
        if (e.graphic == svg.xArrow) {
            let arrow = svg.xArrow;
            let a = arrow.theta;
            if (a) {
                arrow.config({theta: 0});                
                svg.xLabel.$.show();
            }
            else {
                arrow.config({theta: 180});
                svg.xLabel.$.hide();
            }
            svg.update(0);
            return false;
        }
        else svg.toggle();
    });
},

bar: (sel) => {
    svg = SVG2.ebg(sel, 10, 1, [
        ["E_k", (t) => 6.75 * t * t],
        ["E_p", true],
    ], {E: 9, duration: 4, unit: "mJ", label: [0, "-6", 2]});
},

Q3: (sel, Ep) => {
    let dt = 120;
    if (Ep != null) {
        let a = acos(Math.sqrt((Ep) / 8.1));
        dt = a / 90;
    }
    svg = SVG2.ebg(sel, 10, 1, [
        ["E_k", true],
        ["E_p", (t) => 8.1 * sq(cos(360*(dt*t/4)))],
    ], {E: 8.1, unit: "mJ", duration: dt, margin: [40, 4, 40, 16], label: [0, "-6", 2]});
},

Q5: (sel) => {
    let Ek = sq(0.35) * 79 / 2;
    let Ep = sq(0.036) * 19000 / 2;
    let E = Ek + Ep;
    let a = atan(Math.sqrt(Ek/Ep));
    svg = SVG2.ebg(sel, 18, 1, [
        ["E_k", true],
        ["E_p", (t) => E * sq(cos(a+360*(30*t)))],
    ], {E: E, unit: "mJ", duration: 120, margin: [40, 4, 40, 16], label: [0, "-6", 3]});
},

});