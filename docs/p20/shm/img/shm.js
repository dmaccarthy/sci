SVG2.cache("p20/shm/img/shm.js", {

v_t: (sel) => {
    $(sel).attr({width: 480, height: 300, "data-aspect": "8/5"});
    let svg = applet.graph(sel, {
        grid: [[-0.25, 2, 0.25], [-1.25, 1.25, 0.25], 1],
        margin: [0.01, 0.01, 0.01, 0.01],
        x: ["t", [1.92, "-18"], {format: () => null, offset: [0, "-24"]}],
        y: ["v", [0, 0], {}],
    });
    let ital = {"font-style": "italic"};
    svg.$.find(".TitleX").addClass("End").css(ital);
    svg.$.find(".TitleY").remove();
    let gx = svg.group()
    let gv = svg.group();
    let ga = svg.group();
    gx.$.hide(); ga.$.hide();
    svg.symbol("x", {vec: 1}, [-0.1, 1.1], gx).css({fill: "red"});
    svg.locus((t) => sin(360 * t), [-0.25, 2], 0, 0, gx).css({stroke: "red"});
    svg.symbol("v", {vec: 1}, [-0.1, 1.1], gv).css({fill: "#0065FE"});
    svg.locus((t) => cos(360 * t), [-0.25, 2], 0, 0, gv);
    svg.symbol("a", {vec: 1}, [-0.1, 1.1], ga).css({fill: "purple"});
    svg.locus((t) => -sin(360 * t), [-0.25, 2], 0, 0, ga).css({stroke: "purple"});
    svg.final();

    clickCycle(svg.element, 2,
        () => {gv.$.fadeOut(); ga.$.fadeIn()},
        () => {ga.$.fadeOut(); gx.$.fadeIn()},
        () => {gx.$.fadeOut(); gv.$.fadeIn()},
    );

},

ucm: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1.15, 1.15);
    // svg.grid([-1, 1, 1], [-1, 1, 1]);
    svg.axis({x: [-1, 1]});
    svg.axis({y: [-1, 1]});
    svg.$.find("line").css({stroke: "grey"});
    let g = svg.group().css({stroke: "black"});
    svg.circle(1, [0, 0]).css({fill: "none", stroke: "black", "stroke-width": "3px"});
    svg.final();
    let c = svg.circle(0.05, [1, 0]).anchor(0, 0).config({omega: 60}).css({fill: "#0065FE"});
    let arrow = {fill: "#0065FE", "fill-opacity": 0.4};
    svg.arrow([0, -0.15], [0, 0], {anchor: "tip", tail: "4"}).css(arrow);
    svg.arrow([-0.15, 0], [0, 0], {anchor: "tip", tail: "4"}).css(arrow);
    svg.line([0, 0], [1, 0], g);
    svg.line([0, 0], [0, 0], g);
    svg.line([0, 0], [1, 0], g);

    svg.beforeupdate = function() {
        let items = this.items;
        let a = items[0].theta + items[0].omega / this.frameRate;
        let [c, s] = [cos(a), sin(a)];
        items[1].config({position: [c, 0]});
        items[2].config({position: [0, s]});
        items[3].setPoints([[0, 0], [c, 0]], 1);
        items[4].setPoints([[c, s], [c, 0]], 1);
        items[5].setPoints([[c, s], [0, 0]], 1);
    };

    svg.play();
    svg.$.on("click", () => svg.toggle());
},

});