SVG2.cache("p20/energy/img/sys.js", {

bar: (sel) => {
    let E = 11.772;
    svg = SVG2.ebg(sel, 14, 1, [
        ["E_k", (t) => 7.35 * t * t],
        ["E_g", (t) => E * (1 - t * t)],
        ["–W", true, "red"],
    ], {E: E, duration: 4, label: [0, "-6", 2]});
},

flow1: (sel) => {
    let s = $(sel).attr({width: 400, height: 260, "data-aspect": "20/13"});
    let svg = new SVG_Animation(sel, -0.25, 2.5);
    let css = {fill: "#0065FE"};
    svg.circle(0.8, [0.6, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "g", scale: 1}, [0, 0]).css(css);
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0], g);
    svg.arrow([0.25, 0], 0.6, {tail: "6"}, g);
    svg.text("9.81 J", [0.5, -0.15], g).addClass("Work");
    g = svg.group().css({fill: "red"});
    svg.text("Waste", [2.2, 0], g).css({"font-size": "24px"});
    svg.arrow([1.25, 0], 0.6, {tail: "6"}, g);
    svg.text("3.56 J", [1.55, -0.15], g).addClass("Work");
    svg.$.find("text.Work").hide();
    svg.final();
},

flow2: (sel) => {
    let s = $(sel).attr({width: 300, height: 228, "data-aspect": "25/19"});
    let svg = new SVG_Animation(sel, -0.27, 1.45, -0.85);
    svg.circle(0.4, [1, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    let g = svg.group().css({fill: "red"});
    let css = {"font-size": "24px"};
    svg.text("Food", [0, 0], g).css(css);
    svg.text("Waste", [0, -0.8], g).css(css);
    svg.arrow([0.25, 0], 0.6, {tail: "6"}, g);
    svg.text("59.6 J", [0.45, -0.1], g);
    svg.arrow([0, -0.1], [0, -0.7], {tail: "6"}, g);
    svg.symbol("E", {q4: "k", scale: 1}, [0.96, 0]).css({fill: "#0065FE"});
    svg.final();
},

flow3: (sel) => {
    let s = $(sel).attr({width: 400, height: 250, "data-aspect": "8/5"});
    let svg = new SVG_Animation(sel, -0.25, 2.5, -0.85);
    // svg.grid([-0.5, 2.5, 0.25], [-2, 2, 0.25]);
    let css = {fill: "#0065FE"};
    svg.circle(0.8, [0.6, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "g", scale: 1}, [0.17, 0.45]).css(css);
    svg.symbol("E", {q4: "elas", scale: 1}, [0.1, -0.45]).css(css);
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0], g);
    let g1 = svg.group(g).config({theta: -30, position: [0.65, 0.25]});
    svg.arrow([-0.3, 0], 0.6, {tail: "6"}, g1);
    svg.text("0.26 J", [-0.05, -0.15], g1);
    g1 = svg.group(g).config({theta: 30, position: [0.65, -0.25]});
    svg.arrow([-0.3, 0], 0.6, {tail: "6"}, g1);
    svg.text("8.00 J", [-0.05, -0.15], g1);
    g = svg.group().css({fill: "red"});
    svg.text("Waste", [2.2, 0], g).css({"font-size": "24px"});
    svg.arrow([1.25, 0], 0.6, {tail: "6"}, g);
    svg.text("3.00 J", [1.55, -0.15], g);
    svg.final();
},

flow4: (sel) => {
    let s = $(sel).attr({width: 400, height: 260, "data-aspect": "20/13"});
    let svg = new SVG_Animation(sel, -0.25, 2.5);
    let css = {fill: "#0065FE"};
    svg.circle(0.8, [0.6, 0]).css({fill: "none", stroke: "#0065FE", "stroke-width": 3});
    svg.symbol("E", {q4: "g", scale: 1}, [0, 0]).css(css);
    let g = svg.group().css(css);
    svg.symbol("E", {q4: "k", scale: 1}, [1, 0], g);
    svg.arrow([0.85, 0], [0.25, 0], {tail: "6"}, g);
    svg.text("6.13 J", [0.6, -0.15], g);
    g = svg.group().css({fill: "red"});
    svg.text("Waste", [2.2, 0], g).css({"font-size": "24px"});
    svg.arrow([1.25, 0], 0.6, {tail: "6"}, g);
    svg.text("1.68 J", [1.53, -0.15], g);
    svg.final();
},

});