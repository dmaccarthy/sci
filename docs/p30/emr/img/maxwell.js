SVG2.cache("p30/emr/img/maxwell.js", {

wave: (sel) => {
    let svg = new SVG2(sel, {lrbt: [-2, 10, -2, 2], margin: 4, scale: 60});
    svg.$.addClass("SVG2");
    svg.line([-3, 0], [11, 0]);
    svg.status = 3;

    // Wave locus
    let wave = (x, t) =>  {return 2 * cos(47 * (x - 2 * t))};
    svg.animate(svg.locus(wave, [-2, 10])).play();

    // E and B field arrows and sensors
    let gE = svg.group();
    let gB = svg.group();
    let E = [], B = [];
    for (let x=0;x<9;x++) {
        E.push(gE.arrow(1, {tail: "4"}));
        B.push(gB.arrow(1, {tail: "4"}));
    }
    gE.$.find("polygon").css({fill: "#0065fe"});
    gB.$.addClass("Magnetic").find("polygon").css({fill: "red"});
    for (let x=0;x<9;x++) svg.circle("6", [x, 0]).css({fill: "#40c040"});

    svg.beforeupdate = function() { // Reshape arrows
        let t = this.time;
        for (let x=0;x<9;x++) {
            let A = wave(x, t);
            let tail = Math.min(8 * Math.abs(A), 4).toFixed(2);
            E[x].reshape({tail: [x, 0], tip: [x, A]}, {tail: tail});
            B[x].reshape({tail: [x, 0], tip: [x, 0.85 * A]}, {tail: tail}, "tail").config({theta: 115});
        }
    }

    svg.$.on("click", () => {
        let s = ++svg.status;
        if (s == 1) svg.$.find("polyline").fadeIn();
        else if (s == 2) svg.play();
        else if (s == 3) svg.$.find(".Magnetic").fadeIn();
        else if (s == 4) svg.pause();
        else {
            svg.$.find("polyline, .Magnetic").fadeOut();
            svg.status = 0;
        }
    });
},

});