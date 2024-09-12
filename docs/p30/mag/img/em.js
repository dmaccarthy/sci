save("p30/mag/img/em", {

    slnd1: (sel) => {
        $(sel).attr({width: 200, height: 400, "data-aspect": "1/2"});
        svg = new SVG_Animation(sel, -1.02, 1.02);
        // svg.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
        svg.rect([2, 4], [0, 0]).css({fill: "none", stroke: "black"});


        svg.final();
    },

    atom: (sel) => {
        $(sel).attr({width: 256, height: 128, "data-aspect": "2"});
        svg = new SVG_Animation(sel, -1, 1);
        svg.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
        svg.ellipse(0.9, 0.08, [0, 0]);
        let g = svg.group().config({theta: -95, position: [-0.45, -0.07]});
        svg.poly([[-0.05, -0.05], [0, 0], [0.05, -0.05]], 0, g);
        g = svg.group().config({theta: 90, position: [0.36, 0.07]});
        svg.poly([[-0.04, -0.04], [0, 0], [0.04, -0.04]], 0, g);
        svg.circle(0.07, [0, 0.03]).css({stroke: "none", fill: "#0065FE"});
        svg.circle(0.04, [0.5, -0.06]).css({stroke: "none", fill: "#0065FE"});
        svg.final();
    },

    q_neg: (sel) => {
        $(sel).attr({width: 200, height: 200, "data-aspect": "1"});
        svg = new SVG_Animation(sel, -1, 1, -1);
        svg.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
        for (let i=0;i<8;i++) {
            let g = svg.group().config({theta: 45*i})
            svg.line([-2, 0], [-0.05, 0], g);
            svg.poly([[-0.65, 0.05], [-0.6, 0], [-0.65, -0.05]], 0, g);    
        }
        svg.circle(0.06, [0, 0]).css({stroke: "none", fill: "#0065FE"});
        svg.final();
    },

    coil: (sel) => {
        $(sel).attr({width: 200, height: 200, "data-aspect": "1"});
        svg = new SVG_Animation(sel, -1, 1, -1);
        svg.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
        svg.line([0, -1.1], [0, 1.1]);
        for (let i=1;i<5;i++) {
            let r = Math.pow(i, 3) / 5;
            let x = r + (5 - i) / 10;
            svg.ellipse(r, 0.6 * r, [x, 0]);
            svg.ellipse(r, 0.6 * r, [-x, 0]);
            if (i % 2 == 0) {
                let g = svg.group().config({position: [x - r, 0]});
                svg.poly([[-0.05, -0.05], [0, 0], [0.05, -0.05]], 0, g);
                g = svg.group().config({position: [r - x, 0]});
                svg.poly([[-0.05, -0.05], [0, 0], [0.05, -0.05]], 0, g);
            }
        }

        // Arrows
        let a = (t, p) => {
            let g = svg.group().config({theta: t, position: p});
            svg.poly([[-0.05, -0.05], [0, 0], [0.05, -0.05]], 0, g);
        }
        a(-90, [0.62, 0.12]);
        a(90, [0.58, -0.12]);
        a(90, [-0.62, 0.12]);
        a(-90, [-0.58, -0.12]);
    
        // Coil cross-section
        svg.circle(0.04, [0.6, 0]).css({stroke: "none", fill: "#0065FE"});
        svg.circle(0.04, [-0.6, 0]).css({stroke: "none", fill: "#0065FE"});
        svg.final();
    },

    q2_pos: (sel) => {
        $(sel).attr({width: 200, height: 200, "data-aspect": "1"});
        svg = new SVG_Animation(sel, -1, 1, -1);
        svg.$.css({stroke: "red", "stroke-width": "1px", fill: "none"});
        // svg.grid([-1, 1, 0.1], [-1, 1, 0.1]);

        // Field lines

        svg.line([0, -1.1], [0, 1.1]);
        svg.line([-1.1, 0], [1.1, 0]);

        let f = (param, args, t, p) => {
            let g = svg.group().config({theta: t, position: p});
            svg.locus((x, t, a) => a[0] * Math.pow(x, a[1]), param, args, 0, g);
        }
    
        // Q I
        f([-1, 0], [1, 2], -120, [0.6, 0]);
        f([-1, 0], [2, 2], -40, [0.6, 0]);
        f([-1, 0], [6, 4], -10, [0.6, 0]);
    
        // Q II
        f([0, 1], [1, 2], 120, [-0.6, 0]);
        f([0, 1], [2, 2], 40, [-0.6, 0]);
        f([0, 1], [6, 4], 10, [-0.6, 0]);

        // Q III
        f([-1, 0], [1, 2], 60, [-0.6, 0]);
        f([-1, 0], [2, 2], 140, [-0.6, 0]);
        f([-1, 0], [6, 4], 170, [-0.6, 0]);

        // Q IV
        f([0, 1], [1, 2], -60, [0.6, 0]);
        f([0, 1], [2, 2], -140, [0.6, 0]);
        f([0, 1], [6, 4], -170, [0.6, 0]);

        // Arrows
        let a = (t, p) => {
            let g = svg.group().config({theta: t, position: p});
            svg.poly([[-0.05, -0.05], [0, 0], [0.05, -0.05]], 0, g);
        }

        a(0, [0, 0.5]);
        a(180, [0, -0.5]);
        a(90, [0.2, 0]);
        a(-90, [-0.2, 0]);
        a(-10, [0.52, 0.63]);
        a(190, [0.52, -0.63]);
        a(10, [-0.52, 0.63]);
        a(170, [-0.52, -0.63]);
        a(-55, [0.78, 0.185]);
        a(-125, [0.78, -0.185]);
        a(55, [-0.78, 0.185]);
        a(125, [-0.78, -0.185]);
        a(10, [0.155, 0.61]);
        a(170, [0.155, -0.61]);
        a(-10, [-0.155, 0.61]);
        a(-170, [-0.155, -0.61]);

        // Sources
        svg.circle(0.04, [0.58, 0]).css({stroke: "none", fill: "#0065FE"});
        svg.circle(0.04, [-0.58, 0]).css({stroke: "none", fill: "#0065FE"});
        svg.final();
    },

});