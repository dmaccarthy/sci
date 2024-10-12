SVG2.cache("p30/mag/img/helix.js", {

    ucm: (sel) => {
        let svg = new SVG2(sel, {size: [400, 400], lrbt: [-1.16, 1.16]});
        svg.$.addClass("SVG2");
        // svg.grid([-1.25, 1.25, 0.25], [-1.25, 1.25, 0.25]);
        let tog = [svg.circle(1)];

        /* Vector labels */
        let B = '<tspan class="Bold">B</tspan><tspan class="F80" dx="-20" dy="-22">→</tspan>';
        let v = '<tspan class="Bold">v</tspan><tspan class="F80" dx="-20" dy="-18">→</tspan>';
        let Fm = '<tspan class="Bold">F</tspan><tspan class="F80" dy="8">m</tspan><tspan class="F80" dx="-38" dy="-28">→</tspan>';

        /* Magnetic field */
        let c = {fill: "green"};
        svg.circle(0.1).css({fill: "none", stroke: c.fill});
        svg.text("×", [0, "-3"]).css(c);
        svg.text(B, [-0.25, -0.05]).css(c);
    
        let q = svg.group().config({omega: 20});

        /* Velocity */
        let g = q.group();
        c.fill = "red";
        q.arrow({tail: [1, 0], tip: [1, 0.5]}, {tail: "6"}, "tail").$.children().css(c);
        g.text(v, [0.8, 0.25]).css(c);

        /* Force */
        g = q.group();
        tog.push(g.$);
        c.fill = "#0065fe";
        g.arrow({tail: [1, 0], tip: [0.5, 0]}, {tail: "6"}, "tail").$.children().css(c);
        g.text(Fm, [0.8, -0.25]).css(c);

        /* Charge */
        q.circle("5", [1, 0]).css({fill: "yellow"});

        svg.$.find("text").css({ "font-size": "28px"});    
        svg.animate(q);
    
        clickCycle(svg.element, 3,
            () => {clickCycle.toggle(tog, true, 1)},
            () => {svg.play()},
            () => {clickCycle.toggle(tog, true, 0)},
            () => {svg.pause()},
            () => {clickCycle.toggle(tog, false, 0, 1)},
        );

    },

});