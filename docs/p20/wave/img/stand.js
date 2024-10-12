SVG2.cache("p20/wave/img/stand.js", {

stand: (sel) => {
    let e = $(sel).attr({width: 480, height: 240, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, 0, 1, -1, 1, 4);
    svg.axis({x: [0, 1]});
    svg.final();

    let n = parseInt(e.attr("data-harmonic"));
    if (isNaN(n)) n = 1;
    svg.args = {n: n};
    let standingWave = (x, t, args) => {
        let n = args.n;
        return Math.cos(t * n / 2) * Math.sin(pi * x * n);
    }
    svg.locus(standingWave, [0, 1], svg.args).css({fill: "none", stroke: "#0065FE", "stroke-width": "3px"});
    let dx = 1 / n;
    let x = new RArray(...range(0, 1 + dx / 2, dx));
    svg.plot({x:x, y:x.times(0)}, "4").css({fill: "#0065FE"});
    x = n == 1 ? new RArray([0.5]) : new RArray(...range(dx/2, 1 + dx/2, dx));
    svg.plot({x:x, y:x.times(0)}, "4").css({fill: "red"});        

    svg.update(0);
    svg.$.on("click", () => svg.toggle());
},

closed: (sel) => {
    let e = $(sel).attr({width: 480, height: 240, "data-aspect": "2"});
    let svg = new SVG_Animation(sel, 0, 1, -1, 1, 4);
    svg.axis({x: [0, 1]});
    svg.final();

    let n = parseInt(e.attr("data-harmonic"));
    if (isNaN(n)) n = 1;
    svg.args = {n: n};
    let standingWave = (x, t, args) => {
        let n = args.n;
        return Math.cos(t * n / 2) * Math.sin(pi / 2 * x * n);
    }
    svg.locus(standingWave, [0, 1], svg.args).css({fill: "none", stroke: "#0065FE", "stroke-width": "3px"});
    let dx = 2 / n;
    let x = n == 1 ? new RArray([0]) : new RArray(...range(0, 1 + dx / 2, dx));
    svg.plot({x:x, y:x.times(0)}, "4").css({fill: "#0065FE"});
    x = n == 1 ? new RArray([1]) : new RArray(...range(dx/2, 1 + dx/2, dx));
    svg.plot({x:x, y:x.times(0)}, "4").css({fill: "red"});        

    svg.update(0);
    svg.$.on("click", () => svg.toggle());
},

});
