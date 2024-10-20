SVG2.cache("p30/emr/img/maxwell.js", {

wave: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-2, 10, -2, 2], margin: 4, scale: 60});
    svg.$.addClass("SVG2");
    svg.line([-3, 0], [11, 0]);
    for (let x=0;x<9;x++) svg.rect(["10", "10"], [x, 0]).css({fill: "#40c040"});
    svg.status = 3;
    let v = 1.5, k = 47;
    let wave = (x, t) =>  {return 2 * cos(k * (x - v * t))};
    let w = svg.locus(wave, [-2, 10]);

    svg.beforeupdate = function() {
        this.$.find("g.FieldArrows").remove();
        let t = this.time;
        let g = this.group();
        g.$.addClass("FieldArrows");
        for (let x=0;x<9;x++) {
            let A = wave(x, t); //2 * cos(k * (x - v * t));
            let tail = Math.min(8 * Math.abs(A), 4).toFixed(2);
            g.arrow({tail: [x, 0], tip: [x, A]}, {tail: tail}).$.addClass("Electric").find("polygon").css({fill: "#0065fe"});
            if (svg.status > 2) g.arrow({tail: [x, 0], tip: [x, A]}, {tail: tail}, "tail").config({theta: 105}).$.addClass("Magnetic");
        }
    }

    svg.animate(w).play();
    svg.$.on("click", () => {
        let s = ++svg.status;
        if (s == 1) svg.$.find("polyline").fadeIn();
        else if (s == 2) svg.play();
        else if (s == 3) svg.$.find(".Magnetic").fadeIn();
        else if (s == 4) svg.pause();
        else {
            svg.$.find("polyline").hide();
            svg.status = 0;
            svg.update(0);
        }
    });
},

});