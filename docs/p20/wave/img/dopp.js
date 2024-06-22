save("p20/wave/img/dopp", {

Q1: (sel) => {
    let e = $(sel).attr({width: 480, height: 120, "data-aspect": "4"});
    let svg = new SVG_Animation(sel, -2.6, 2.4, -0.25);
    svg.axis({x: [-2.6, 2.4]});

    svg.stickMan(0.6, [2, 0.6]);
    svg.rect([0.9, 0.4], [-2, 0.3]).css({fill: "red", stroke: "black"});
    svg.circle(0.1, [-2.25, 0.1]).css({fill: "black", stroke: "none"});
    svg.circle(0.1, [-1.75, 0.1]).css({fill: "black", stroke: "none"});

    let g = svg.group().css({fill: "red"});
    let attr = {tail: "6"};
    svg.arrow([-1.4, 0.25], [-0.4, 0.25], attr, g);
    svg.symbol("v", {q4: "s", vec: 1}, [-1, 0.6], g);
    svg.arrow([1.7, 0.25], [1.2, 0.25], attr, g);
    svg.symbol("v", {q4: "o", vec: 1}, [1.45, 0.6], g);
    
    g = svg.group().css({fill: "blue"});
    svg.arrow([-0.1, 0.7], [0.9, 0.7], attr, g);
    svg.symbol("v", {vec: 1}, [0.4, 0.35], g);
    
    svg.final();
},

Q2: (sel) => {
    let e = $(sel).attr({width: 480, height: 120, "data-aspect": "4"});
    let svg = new SVG_Animation(sel, -2.6, 2.4, -0.3);
    svg.axis({x: [-2.6, 2.4]});

    svg.stickMan(0.6, [1.35, 0.6]);
    svg.image("p20/wave/img/guitar.svg", [1, 0.42], [-1.5, 0.3]);

    let g = svg.group().css({fill: "red"});
    let attr = {tail: "6"};
    svg.arrow([1.6, 0.25], [2.1, 0.25], attr, g);
    svg.symbol("v", {q4: "o", vec: 1}, [1.85, 0.6], g);
    
    g = svg.group().css({fill: "blue"});
    svg.arrow([-0.5, 0.25], [0.5, 0.25], attr, g);
    svg.symbol("v", {vec: 1}, [0, 0.6], g);
    
    svg.final();
},

Q3: (sel) => {
    let e = $(sel).attr({width: 480, height: 144, "data-aspect": "10/3"});
    let svg = new SVG_Animation(sel, -2.6, 2.4, -0.25);
    // svg.grid([-3, 3, 0.25], [-3, 3, 0.25], 1);
    svg.axis({x: [-2.6, 2.4]});

    svg.stickMan(0.8, [2, 0.8]);
    svg.stickMan(0.8, [-1.9, 0.8]);
    
    svg.line([-1.75, 0.1], [-1.75, 0.94]).css({stroke: "black"});
    let g = svg.group().css({stroke: "black", fill: "skyblue"});
    svg.circle("6", [-1.75, 0.1], g)
    svg.circle("6", [-1.75, 0.94], g)

    g = svg.group().css({fill: "red"});
    let attr = {tail: "6"};
    svg.arrow([-1.55, 0.1], [-1.05, 0.1], attr, g);
    svg.arrow([-1.95, 0.94], [-2.45, 0.94], attr, g);
    svg.symbol("v", {q4: "s", vec: 1}, [-1.5, 0.5], g);
    
    g = svg.group().css({fill: "blue"}).config({position: [0.5, 0]});
    svg.arrow([-0.5, 0.25], [0.5, 0.25], attr, g);
    svg.symbol("v", {vec: 1}, [0, 0.6], g);
    
    svg.final();
},

});
