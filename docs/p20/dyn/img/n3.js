save("p20/dyn/img/n3", {

n3: (sel) => {
    $(sel).attr({width: 400, height: 160, "data-aspect": "5/2"});
    let svg = new SVG_Animation(sel, -4, 4, -0.2);
    svg.image("./p20/dyn/img/walking.svg", [1.952, 3], [0.75, 1.5]);
    svg.line([-4, 0], [4, 0]).attr({stroke: "black", "stroke-width": 3});
    svg.arrow([-0.2, 0.2], [-3.5, 0.2], {tail: "6"}).addClass("Blue");
    svg.arrow([0.2, 0.2], [3.5, 0.2], {tail: "6"}).addClass("Vector");
    svg.symbol("F", {vec:1}, [-1.85, 0.7]).css({fill: "#0065FE"});
    svg.symbol("F", {vec:1}, [1.85, 0.7]).css({fill: "red"});
    svg.final();
},

pool: (sel) => {
    $(sel).attr({width: 450, height: 350, "data-aspect": "9/7"});
    let svg = new SVG_Animation(sel, -3.5, 5.5, 0);
    let attr = {stroke: "black", "stroke-width": 3};
    svg.line([-3.5, 4.5], [5.5, 4.5]).attr(attr);
    svg.line([-3.5, 0.5], [5.5, 0.5]).attr(attr);
    attr = {fill: "red", "fill-opacity": 0.4, stroke: "black"};
    svg.circle(1, [-2.4, 5.5]).attr(attr);
    svg.circle(1, [0, 1.5]).attr(attr);
    attr.fill = "#0065FE";
    svg.circle(1, [2, 1.5]).attr(attr);
    svg.circle(1, [2, 5.5]).attr(attr);
    svg.arrow([-1.3, 5.5], [0.3, 5.5], {tail: "6"}).addClass("Green");
    svg.arrow([3.2, 1.5], [5, 1.5], {tail: "6"}).addClass("Blue");
    svg.arrow([-1.2, 1.5], [-3, 1.5], {tail: "6"}).addClass("Vector");
    svg.symbol("F", {vec:1}, [-2, 2]).css({fill: "red"});
    svg.symbol("F", {vec:1}, [4, 2]).css({fill: "#0065FE"});
    svg.symbol("v", {vec:1, q4: "i"}, [-0.6, 6]).css({fill: "limegreen"});
    svg.final();
},

rocket: (sel) => {
    $(sel).attr({width: 80, height: 340, "data-aspect": "4/17"});
    let svg = new SVG_Animation(sel, -1, 1, -3.5);
    svg.image("./media/rocket.svg", [4, 4], [0, 0]).config({theta: 45});
    svg.arrow([0, 3], [0, 5], {tail: "6"}).attr({fill: "red"});
    svg.arrow([0, -1.5], [0, -3.5], {tail: "6"}).attr({fill: "#0065FE"});
    svg.symbol("F", {vec:1}, [-0.7, 3.6]).css({fill: "red"});
    svg.symbol("F", {vec:1}, [-0.7, -2.5]).css({fill: "#0065FE"});
    svg.final();
},
    
});