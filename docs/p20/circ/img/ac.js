SVG2.cache("p20/circ/img/ac.js", {

merry: (sel) => {
    let svg = new SVG2(sel, {size: [400, 180], lrbt: [-10, 10, -0.5]}).css(".NoStyle");
    svg.line([-8, 2.7], [0, 2.7]).css({"stroke": "orange"});
    svg.rect([1, 8], [0, 4]);
    svg.rect([18, 0.6], [0, 1]);
    svg.$.find("rect").css({fill: "silver"});
    svg.stickman(2.7).config({shift: [-8, 1.3]}).css({fill: "none", stroke: "black", "stroke-width": "2px"});
    let g = svg.group().css("text");
    g.ctext(["Axis", [1.7, 6]], ["Icy Platform", [5, 2]], ["Bungee Cord", [-4, 3.3]]);
    svg.line([-10, 0], [10, 0]).css({stroke: "black", "stroke-width": "2px"});
},

ucm: (sel) => {
    $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1.15, 1.15);
    svg.axis({x: [-1, 1]});
    svg.axis({y: [-1, 1]});
    svg.$.find("line").css({stroke: "grey"});
    let g = svg.group().css({stroke: "black"});
    svg.circle(1, [0, 0]).css({fill: "none", stroke: "black", "stroke-width": "3px"});
    svg.final();
    svg.circle(0.05, [1, 0]).anchor(0, 0).config({omega: 60}).css({fill: "#0065FE"});
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