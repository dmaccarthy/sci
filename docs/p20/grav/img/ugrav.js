save("p20/grav/img/ugrav", {
 
tri: (sel) => {
    $(sel).attr({width: 400, height: 360, "data-aspect": "10/9"});
    let a = 25;
    let da = a / 25;
    let b = a / (2 * cos(30));
    let c = a * tan(30) / 2;
    let h = a * sin(60);
    let svg = new SVG_Animation(sel, -a/2-da, a/2+da, -da);
    // svg.grid([-15, 15, 1], [0, a, 1]);
    da = new RArray(da, 0);
    let g = svg.group().css({stroke: "black", "stroke-width": "1px"});
    let r = a / 30;
    let [v1, v2, v3] = [[0, h], [-a/2, 0], [a/2, 0]];
    a = new RArray(0, c);
    b = new RArray(0, h - 10);
    svg.line(v1, [0, 0], g);
    svg.line(v2, [0, c], g);
    svg.line(v3, b, g);
    svg.poly([v1, v2, v3], 1, g).css({fill: "none"});
    svg.circle(r, v1, g).css({fill: "#0065FE"});
    svg.circle(r, v2, g).css({fill: "red"});
    svg.circle(r, v3, g).css({fill: "green"});
    r /= 4;
    g = svg.group().css({stroke: "black", "stroke-width": "1px", fill: "black"});
    svg.circle(r, a, g);
    svg.circle(r, b, g);
    svg.text("A", a.plus([-da[0], da[0] / 2]));
    svg.text("B", b.plus(da));
    svg.text("θ", new RArray(...v3).plus([-2* da[0], da[0] / 2]));
    svg.symbol("r", {q4: "A"}, [-0.8 * c, 0.8 * c]).css({"font-style": "italic"});
    svg.symbol("r", {q4: "B"}, [0.6 * c, 0.8 * c]).css({"font-style": "italic"});
    svg.text("12.5 km", [0.8 * c, c/8]);
    svg.text("12.5 km", [-0.8 * c, c/8]);
    svg.text("25.0 km", [0, c/8]).anchor(...v2).config({theta: 60});
    svg.text("25.0 km", [0, c/8]).anchor(...v3).config({theta: -60});
    svg.symbol("y", {}, [c/8, 0.25 * h]);

    svg.text("30°", da.times(3).plus(v2)).anchor(...v2).config({theta: 42});
    svg.text("30°", da.times(3).plus(v2)).anchor(...v2).config({theta: 12});
    svg.text("30°", da.times(3).plus(v1)).anchor(...v1).config({theta: -78});
    da = new RArray(0, c);
    c = [-c/8, 0.75 * h];
    svg.text("10.0 km", c).anchor(...c).config({theta: 90});

    let attr = {anchor: "tail", tail: "6"};
    da = da.times(0.56);
    g = svg.group().addClass("FBD_A");
    svg.arrow(a, a.plus(da), attr, g).addClass("Vector").css({fill: "#0065FE"});
    svg.arrow(a, a.plus(da), attr, g).config({theta: 240}).addClass("Vector").css({fill: "green"});
    svg.arrow(a, a.plus(da), attr, g).config({theta: 120}).addClass("Vector");
    g = svg.group().addClass("FBD_B");
    svg.arrow(b, b.plus(da.times(3.34/1.6)), attr, g).addClass("Vector").css({fill: "#0065FE"});
    da = da.times(1.14/1.6);
    svg.arrow(b, b.plus(da), attr, g).config({theta: 227}).addClass("Vector").css({fill: "green"});
    svg.arrow(b, b.plus(da), attr, g).config({theta: 133}).addClass("Vector");
    svg.$.find(".FBD_A, .FBD_B").hide().css("fill-opacity", 0.6);
    svg.final();

    clickCycle(svg.element, 2,
        () => svg.$.find(".FBD_A").fadeIn(),
        () => {
            svg.$.find(".FBD_A").fadeOut();
            svg.$.find(".FBD_B").fadeIn();
        },
        () => svg.$.find(".FBD_B").fadeOut(),
    );
},

});
