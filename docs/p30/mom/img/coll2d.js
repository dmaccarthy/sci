save("p30/mom/img/coll2d", {

    Ex1: (sel) => {
        $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
        let svg = applet.vecDiagram.diagram(sel,
            [[0, 27], [-24, 0]],
            {omitAxes: 1, resultant: 1, grid: 18}, 2, -28, -4,
        );
        let arrows = svg.items[1].$.find("polygon");
        let e = svg.items[0].element;
        let attr = {interval: 4, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
        svg.axis({x: [-28, 8], ticks: attr}, e);
        attr.offset = ["-14", 0];
        svg.axis({y: [-4, 32], ticks: attr}, e);
        svg.symbol("p", {vec:1, q4: "iA"}, [3, 14]).css({fill: "red"});
        arrows.push(svg.symbol("p", {vec:1, q4: "iB"}, [-12, 30]).css({fill: "red"}).$);
        arrows.push(svg.symbol("p", {vec:1, prefix: "Σ"}, [-15, 12]).css({fill: "#0065FE"}).$);
        svg.text("kN·s", [3, 28]).css({"font-size": "18px"});
        svg.final();

        clickCycle(svg.element, 1,
            () => {clickCycle.toggle(arrows, true, 1, 3)},
            () => {clickCycle.toggle(arrows, true, 2, 4)},
            () => {clickCycle.toggle(arrows, false, 1, 2, 3, 4)},
        );
    },

    Ex2: (sel) => {
        $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
        let svg = applet.vecDiagram.diagram(sel,
            [[0, 27], vec2d(24, 210)],
            {omitAxes: 1, resultant: 1, grid: 18}, 2, -28, -4,
        );
        let arrows = svg.items[1].$.find("polygon");
        let e = svg.items[0].element;
        let attr = {interval: 4, fixed: 0, length: "8", omitZero: 1, offset: [0, "-18"]};
        svg.axis({x: [-28, 8], ticks: attr}, e);
        attr.offset = ["-14", 0];
        svg.axis({y: [-4, 32], ticks: attr}, e);
        svg.symbol("p", {vec:1, q4: "iA"}, [3, 14]).css({fill: "red"});
        arrows.push(svg.symbol("p", {vec:1, q4: "iB"}, [-13, 24]).css({fill: "red"}).$);
        arrows.push(svg.symbol("p", {vec:1, prefix: "Σ"}, [-14, 6]).css({fill: "#0065FE"}).$);
        svg.text("kN·s", [3, 28]).css({"font-size": "18px"});
        svg.final();

        clickCycle(svg.element, 1,
            () => {clickCycle.toggle(arrows, true, 1, 3)},
            () => {clickCycle.toggle(arrows, true, 2, 4)},
            () => {clickCycle.toggle(arrows, false, 1, 2, 3, 4)},
        );
    },

    Ex3: (sel) => {
        $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
        let svg = applet.vecDiagram.diagram(sel,
            [vec2d(0.348, 35), vec2d(0.24, -55)],
            {omitAxes: 1, resultant: 1}, 0.025, -0.05, -0.1
        );
        let arrows = svg.items[1].$.find("polygon");
        let e = svg.items[0].element;
        let attr = {interval: 0.1, fixed: 1, length: "8", omitZero: 1, offset: [0, "-18"]};
        svg.axis({x: [-0.05, 0.45], ticks: attr}, e);
        attr.offset = ["-14", 0];
        svg.axis({y: [-4, 36], ticks: attr}, e);
        arrows.push(svg.symbol("p", {vec:1, q4: "iA"}, [0.1, 0.13]).css({fill: "red"}).$);
        arrows.push(svg.symbol("p", {vec:1, q4: "iB"}, [0.38, 0.13]).css({fill: "red"}).$);
        svg.symbol("p", {vec:1, prefix: "Σ"}, [0.22, -0.06]).css({fill: "#0065FE"});
        svg.text("N·s", [0.03, 0.3]).css({"font-size": "18px"});
        arrows.push(svg.text("35°", [0.065, 0.015]).css({"font-size": "18px"}).$);
        arrows.push(svg.text("55°", [0.36, 0.02]).css({"font-size": "18px"}).$);
        arrows.push(svg.text("90°", [0.28, 0.15]).css({"font-size": "18px"}).$);
        svg.final();

        clickCycle(svg.element, 2,
            () => {clickCycle.toggle(arrows, true, 0, 3, 5)},
            () => {clickCycle.toggle(arrows, true, 1, 4, 6)},
            () => {clickCycle.toggle(arrows, true, 7)},
            () => {clickCycle.toggle(arrows, false, 0, 1, 3, 4, 5, 6, 7)},
        );
    },


});