SVG2.cache("p30/mag/img/faraday.js", {

lenz_law: (sel) => {
    let svg = new SVG2(sel, {scale: 36, lrbt: [-4, 3, -3, 3]});

    // Magnet
    let x = -2.65;
    let magnet = svg.path([x, 2.5]).lines_to([x, -2.5], [x - 1.3, -2.5]);
    for (let i=1;i<20;i++)
        magnet.line_to([-3.95 + 0.5 * Math.random(), i / 4 - 2.5]);
    magnet = magnet.line_to([x - 1.3, 2.5]).close().update();
    magnet.css({stroke: "black", fill: "lightgrey"});
    x -= 0.4;
    svg.gtext("N", ["sans", 24], [x, 0]);

    // Coil
    let coil = svg.coil([2, 4], 11, 0, 0, "3").css("none", {stroke: "#b87333"});
    let c$ = coil.$.on("click", function(ev) {
        ev.stopPropagation();
        let svg = coil.svg;
        if (!svg.playing) {
            coil.config({omega: -25});
            svg.play();
        }
        else if (coil.omega < -10) coil.config({omega: -3});
        else svg.pause();
    });
    c$.find("rect").css({stroke: "black", fill: "#f8f8f8"});
    c$.find("circle").css({"stroke-width": "0.5px", stroke: "black", fill: "silver"});

    // Poles
    let g = coil.group("sans", 24, "#0065fe", {stroke: "none"}, ".Toggle1");
    let pole = 1.65;
    g.gtext("N", {}, [0, -pole]);
    g.gtext("S", {}, [0, pole]);
    g = g.group(".Toggle2");
    g.gtext("+", {}, [1.45, -1.95]);
    g.gtext("–", {}, [1.45, 1.95]);

    // Magnetic force vectors
    g = svg.group("arrow", ".Toggle0");
    let arrows = [g.arrow({length: 1}), g.arrow({length: 1})];

    // Fade in / out
    let tog = 3;
    svg.$.on("click", () => {
        let e = svg.$;
        if (tog == 3) e.find(".Toggle0, .Toggle1, .Toggle2").fadeOut();
        else e.find(`.Toggle${tog}`).fadeIn();
        tog = (tog + 1) % 4;
    })

    svg.beforeupdate = function() {
        // Poles
        let t = coil.theta;
        let i = t > 90 && t < 270 ? 1 : 0;
        let text = c$.find("text");
        if (t == 90 || t == 270) c.html("");
        else {
            $(text[i]).html("N");
            $(text[1 - i]).html("S");
            text[i + 2].innerHTML = "+";
            text[3 - i].innerHTML = "–";
        }

        // Magnetic force vectors
        let Fm = 1.5 * Math.abs(cos(t));
        t = t + 90;
        s = 2 * i - 1;
        let seg = new Segment(...vec2d(-pole, t), x, 0);
        arrows[0].reshape({tail: seg.point(0.5 * s), tip: seg.point((0.5 + Fm) * s)});
        seg = new Segment(...vec2d(pole, t), x, 0);
        s = -s;
        arrows[1].reshape({tail: seg.point(0.5 * s), tip: seg.point((0.5 + Fm) * s)});
    }

    svg.animate(coil).update(0);
},

});
