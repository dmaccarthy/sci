SVG2.cache("p30/mom/img/vec2d.js", {

    Ex1: (sel) => {
        $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
        let svg = applet.vecDiagram.diagram(sel,
            [vec2d(8, 30)],
            {omitAxes: 1, component: 1, grid: 18}, 0.5, -1, -2,
        );
        let arrows = svg.items[1].$.find("polygon");
        let e = svg.items[0].element;
        let attr = {interval: 1, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
        svg.axis({x: [-1, 8], ticks: attr}, e);
        attr.offset = ["-14", 0];
        svg.axis({y: [-2, 8], ticks: attr}, e);
        svg.symbol("F", {vec:1}, [3.2, 2.5]).css({fill: "red"});
        arrows.push(svg.symbol("F", {vec:1, q4: "x"}, [3.5, -1.2]).css({fill: "#FF6060"}).$);
        arrows.push(svg.symbol("F", {vec:1, q4: "y"}, [7.5, 2]).css({fill: "#FF6060"}).$);
        svg.text("θ", [1.2, 0.27]).css({"font-size": "18px"});
        svg.text("N", [0.3, 6]).css({"font-size": "18px"});
        svg.final();

        clickCycle(svg.element, 1,
            () => {clickCycle.toggle(arrows, true, 0, 3)},
            () => {clickCycle.toggle(arrows, true, 1, 4)},
            () => {clickCycle.toggle(arrows, false, 0, 1, 3, 4)},
        );
    },

    Ex2: (sel) => {
        $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
        let svg = applet.vecDiagram.diagram(sel,
            [vec2d(20, 120), vec2d(5, 200)],
            {omitAxes: 1, resultant: 1, grid: 11}, 2, -18, -2,
        );
        let arrows = svg.items[1].$.find("polygon");
        let e = svg.items[0].element;
        let attr = {interval: 2, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
        svg.axis({x: [-18, 4], ticks: attr}, e);
        attr.offset = ["-14", 0];
        svg.axis({y: [-2, 20], ticks: attr}, e);
        svg.symbol("v", {vec:1, q4: 1}, [-4, 10]).css({fill: "red"});
        arrows.push(svg.symbol("v", {vec:1, q4: 2}, [-13, 18]).css({fill: "red"}).$);
        arrows.push(svg.symbol("v", {vec:1}, [-9, 7]).css({fill: "#0065FE"}).$);
        svg.text("m/s", [1.5, 18]).css({"font-size": "18px"});
        svg.final();

        clickCycle(svg.element, 1,
            () => {clickCycle.toggle(arrows, true, 1, 3)},
            () => {clickCycle.toggle(arrows, true, 2, 4)},
            () => {clickCycle.toggle(arrows, false, 1, 2, 3, 4)},
        );
    },

});