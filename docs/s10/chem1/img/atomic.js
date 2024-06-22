save("s10/chem1/img/atomic", {

bun: (sel) => {
    $(sel).attr({width: 280, height: 244, "data-aspect": "280/244"});
    let svg = new SVG_Animation(sel, -1, 1.3, -1, 1, 2);
    svg.circle(1, [0, 0]).css({fill: "#F1B9A1", stroke: "black"});
    let a = 0.15, b = 0.75;
    svg.poly([[a, b], [a, a], [b, a], [b, -a], [a, -a], [a, -b], [-a, -b], [-a, -a],
        [-b, -a], [-b, a], [-a, a], [-a, b]], 1).css({fill: "red", "fill-opacity": 0.2});
    let g = svg.group().css({fill: "green"});
    let attr = {stroke: "black", "stroke-width": "0.5px"};
    let pts = [[0.4243, 0.4243], [-0.28, 0.65], [-0.51, -0.07],
        [-0.15, -0.55], [0.1707, -0.1062], [0.5, -0.3]];
    svg.line(pts[0], [1, 0.7]).css({stroke: "green"});
    for (let i=0;i<pts.length;i++) svg.circle(0.04, pts[i], g).css(attr);
    svg.text("Electron", [1, 0.8], g);
    svg.final();
},

nuclear: (sel) => {
    $(sel).attr({width: 256, height: 256, "data-aspect": "1"});
    let svg = new SVG_Animation(sel, -1, 1, -1, 1, 2);
    let a = 0.35, b = 0.04;
    let elec = [a * sin(140), cos(140)];
    let n = [[0.0374, 0.019], [-0.0383, -0.0237], [-0.0558, 0.0394], [0.0516, -0.0361]];
    let p = [[-0.0138, 0.0375], [-0.0025, -0.0422], [0.0521, 0.0135]];
    svg.circle(b, n[3]).addClass("Neutron");
    for (let i=0;i<3;i++) {
        let g = svg.group();
        if (i) g.config({theta: 120 * i});
        svg.ellipse(a, 1, [0, 0], g);
        svg.circle(0.75 * b, elec, g).addClass("Electron");
        svg.circle(b, n[i]).addClass("Neutron");
        svg.circle(b, p[i]).addClass("Proton");
    }
    svg.line(vec2d(b, -60).plus(p[1]), [0.6, -0.7]).css({stroke: "red"});
    svg.line(n[2], [-0.6, 0.7]).css({stroke: "#0065FE"});
    svg.text("Electron", [0.55, 0.75]).addClass("Electron");
    svg.text("Proton", [0.7, -0.8]).addClass("Proton");
    svg.text("Neutron", [-0.7, 0.8]).addClass("Neutron");
    svg.$.find("ellipse").css({fill: "none", stroke: "green"});
    svg.$.find("circle").css({stroke: "black", "stroke-width": "0.5px"});
    svg.$.find(".Electron").css({fill: "green"});
    svg.$.find(".Proton").css({fill: "red"});
    svg.$.find(".Neutron").css({fill: "#0065FE"});
    svg.$.find("text").css({"font-size": "18px"});
    svg.final();

    let t = svg.$.find("text, line");
    svg.$.on("click", () => t.fadeToggle());
},

});
