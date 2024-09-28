save("p30/elec/img/eq", {

    eq: (sel) => {
        $(sel).attr({width: 400, height: 240, "data-aspect": "5/3"});
        svg = new SVG_Animation(sel, -1.15, 1.25);
        svg.$.addClass("FBD");
        // svg.grid([-1.5, 1.5, 0.25], [-1.5, 1.5, 0.25]);

        svg.symbol("a", {vec:1}, [-1, 0.5]);
        svg.symbol("F", {vec:1}, [0, 0.5]);
        svg.symbol("E", {vec:1}, [1, 0.5]);
        svg.symbol("v", {vec:1}, [-1, -0.5]);
        svg.symbol("W", {}, [0, -0.5]);
        svg.symbol("V", {delta:1}, [1.1, -0.5]);

        let g = svg.group();
        let arrow = (p) => svg.arrow(0.6, null, {double: 1}, g).config({position: p});
        let posn = [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5],
            [0.5, -0.5], [-1, 0], [0, 0], [1, 0]];
        let fill = ["red", "green", "gold", "violet", "grey", "tan", "#0065FE"];
        for (let i=0;i<posn.length;i++) {
            let a = arrow(posn[i]).css({fill: fill[i]});
            if (i > 3) a.config({theta: 90});
        }
        svg.final();
    },



});