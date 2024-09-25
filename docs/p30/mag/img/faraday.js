save("p30/mag/img/faraday", {

    slnd1: (sel) => {

        $(sel).attr({width: 256, height: 256, "data-aspect": "1"});
        svg = new SVG_Animation(sel, -3.9, 2.5);
        // svg.grid([-4, 2.5, 0.5], [-3.5, 3.5, 0.5]);

        svg.rect([1.4, 5], [-3.2, 0]).css({fill: "red"});
        svg.text("N", [-2.9, 0]).css({"font-size": "24px"});
        svg.final();

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

        // Frame and coils
        let r = 0.08;
        let g = svg.group().css({fill: "none", stroke: "#B87333"}).config({theta: -10, omega: -25});

        g.beforeupdate = function() {
            let t = this.theta;
            let c = g.$.children("text");
            if (t == 90 || t == -90) c.html("");
            else {
                let i = t < -90 || t > 90 ? 0 : 1;
                c[i].innerHTML = "N";
                c[1 - i].innerHTML = "S";
            }
        }
    
        let rect = svg.rect([2, 4], [0, 0], g).css({stroke: "black", fill: "#F8F8F8"});
        rect.$.on("click", () => svg.toggle());
        for (let i=-6;i<7;i++)
            turn(2, r, i == 6 ? 2 : 3).item(g).anchor(0, 0).config({position: [0, i/3.5]});

        // Coil ends
        svg.line([1, 1.7173 + 2 * r], [1.1, 1.89], g);
        svg.line([1, -1.75], [1.1, -1.75], g);

        // Pole lanels
        svg.text("S", [0, 1.6], g);
        svg.text("N", [0, -1.7], g);
        g.$.children("text").css({"font-size": "24px", stroke: "none", fill: "blue"});


        svg.update(0);
    },

});