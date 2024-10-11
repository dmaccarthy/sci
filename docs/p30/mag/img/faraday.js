SVG2.cache("p30/mag/img/faraday.js", {

    lenz_law: (sel) => {

        $(sel).attr({width: 259, height: 222, "data-aspect": "7/6"});
        svg = new SVG_Animation(sel, -4, 3);
        svg.arrows = true;
        svg.$.css({"font-size": "24px"}).addClass("FBD");
    
        // Draw the external magnet
        let magnet = svg.path([-2.5, 2.5]).linesTo([-2.5, -2.5], [-3.8, -2.5]);
        for (let i=1;i<20;i++)
            magnet.lineTo([-3.3 - 0.5 * Math.random(), i / 4 - 2.5]);
        magnet = magnet.lineTo([-3.8, 2.5]).close().item();
        magnet.css({stroke: "black", fill: "lightgrey"});
        let poleXY = [-2.9, 0];
        let tog = [magnet.$, svg.text("N", poleXY).$];

        let turn = (w, r, circ) => {
            // Render a turn of wire as a path
            if (circ == null) circ = 0;
            w /= 2;
            let p = svg.path([w, circ & 1 ? 4 * r : 2 * r]);
            if (circ & 1) p.arc([w, 3 * r], -90);
            p.lineTo([-w, -2 * r]);
            if (circ & 2) p. arc([-w, -r], 90, 2);
            return p;
        }

        // Draw the solenoid frame and coils
        let r = 0.08;
        let coil = svg.group().css({fill: "none", stroke: "#B87333"}).config({theta: -10*0, omega: -25});
        svg.rect([2, 4], [0, 0], coil).css({stroke: "black", fill: "#F8F8F8"});
        svg.circle(0.07, [0, 0], coil).css({stroke: "black", fill: "silver", "stroke-width": "0.5px"});
        for (let i=-6;i<6;i++)
            turn(2, r, i == 5 ? 2 : 3).item(coil).anchor(0, 0).config({position: [0, (i + 0.5) / 3.5]});
        let y = 5.5 / 3.5 + 2 * r;
        svg.line([1, y], [1.1, y + r / 4], coil);
        y -= r;
        svg.line([1, -y], [1.1, -y], coil);

        // Label the magnetic poles and electric terminals of the solenoid
        tog.push(svg.text("S", [0, 1.6], coil).$);
        tog.push(svg.text("N", [0, -1.7], coil).$);
        tog.push(svg.text("–", [1.3, 1.8], coil).$);
        tog.push(svg.text("+", [1.3, -1.8], coil).$);
        coil.$.children("text").css({stroke: "none", fill: "blue"});

        // Event handlers

        coil.$.on("click", (ev) => {
            // Toggle slo-mo when coil is clicked
            let g = ev.currentTarget.graphic;
            let svg = g.svg;
            if (!svg.playing) {
                g.omega = -25;
                svg.play();
            }
            else if (g.omega == -25) g.config({omega: -3});
            else svg.pause();
            return false;
        });

        svg.beforeupdate = function() {
            // Rotate coil; draw magnetic force vectors; alternate poles
            let t = coil.theta;
            if (coil.Fm) {
                coil.Fm.final(2);
                delete coil.Fm;
            }
            let c = coil.$.children("text");
            if (t == 90 || t == -90) c.html("");
            else {
                let i = t < -90 || t > 90 ? 0 : 1;
                $(c[i]).html("N"); //.css({transform: `rotate(${180*i}deg)`});
                $(c[1 - i]).html("S");
                c[i + 2].innerHTML = "+";
                c[3 - i].innerHTML = "–";
                
                let poles = [vec2d(1.6, t + 90), vec2d(1.6, t - 90)];
                if (svg.arrows) {
                    coil.Fm = svg.group();
                    let Fm = 1.5 * Math.abs(cos(t));
                    let attr = {anchor: "tail"};
                    let a0 = svg.arrow(Fm, null, attr, coil.Fm);
                    let a1 = svg.arrow(Fm, null, attr, coil.Fm);
                    coil.Fm.$.children().addClass("Vector");
                    let seg = new Segment(...poles[1 - i], ...poleXY);
                    a0.config({theta: seg.deg, position: poles[1 - i].plus(vec2d(0.4, seg.deg))});
                    seg = new Segment(...poleXY, ...poles[i]);
                    a1.config({theta: seg.deg, position: poles[i].plus(vec2d(0.4, seg.deg))});
                }
            }
        }

        clickCycle(svg.element, -1,
            () => {clickCycle.toggle(tog, false, 0, 1, 2, 3, 4, 5); svg.arrows = false; svg.update(0)},
            () => {clickCycle.toggle(tog, true, 0, 1)},
            () => {svg.arrows = true; svg.update(0)},
            () => {clickCycle.toggle(tog, true, 2, 3)},
            () => {clickCycle.toggle(tog, true, 4, 5)},
        );
    
        // Finalize non-animated items and initialize the animation
        let final = [];
        for (let item of svg.items) if (item !== coil) final.push(item);
        svg.final(final);
        svg.update(0);

    },

});