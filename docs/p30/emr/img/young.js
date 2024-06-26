save("p30/emr/img/young", {

laser: (sel) => {
    let svg = $(sel).attr({width: 400, height: 400, "data-aspect": "1"});
    svg = new SVG_Animation(svg, -3.3, 3.3, -10, 2);
    let [r, d, y] = [0.2, 0.75, -8.7];
    svg.text("Whiteboard", [0, 1.1]);
    svg.text("Laser", [-0.8, y]);
    svg.text("Diffraction Grating", [1.6, -7]);
    let arc = [r, d / 2];
    let g = svg.group().css({stroke: "red"});
    for (let i=-3; i<=3; i++) {
        svg.line([0, i ? -7 : y], [i, 0], g);
        svg.text(i < 0 ? -i : (i ? i : "C"), [i, 0.4]);        
    }
    svg.line([-4, 0], [4, 0]).css({stroke: "black", "stroke-width": "3px"});
    svg.line([-r, -7], [r, -7]).css({stroke: "black", "stroke-width": "2px"});
    let laser = svg.path([r, y-d]).ver(y+d).arcTo([-r, y+d], arc).ver(y-d).arcTo([r, y-d], arc);
    laser.close().item(svg).css({stroke: "black", fill: "silver"});
    svg.final();
},

});