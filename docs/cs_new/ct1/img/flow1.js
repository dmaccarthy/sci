SVG2.cache("cs_new/ct1/img/flow1.js", {

factor: (sel) => {
	let svg = new SVG2(sel, {size: [600, 700], lrbt: [-0.4, 2.65, -0.6, 6.2], margin: 4});
	let dy1 = 0.4;
	let wh = [0.7, 0.4];

	svg.ray([0, 6], [0, 5]);
	svg.ray([0, 5], [0, 4]);
	svg.ray([0, 4], [0, 3 + dy1 / 2], null, 0.65);
	svg.ray([0, 2 - dy1], [0, 1 - dy1], null, 0.6);
	svg.ray([0, 2], [1, 2]);
	svg.ray([1, 2], [2, 2]);
	svg.ray([1, 2 - dy1], [1, 1 - dy1], null, 0.6);
	svg.ray([1, 1 - dy1], [1, -dy1]);
	svg.ray([2, 2.85], [1, 2.85]);
	svg.line([2, 2.85], [2, 2]);
	svg.line([1, 2], [1, 2.85]);
	svg.line([1, -dy1], [2.6, -dy1]);
	svg.line([2.6, 3 + dy1 / 2], [0, 3 + dy1 / 2]);
	svg.ray([2.6, -dy1], [2.6, 3 + dy1 / 2]);
	svg.ray([0, 3 + dy1 / 2], [0, 2.6]);
	svg.circle("5", [0, 3 + dy1 / 2]);

	svg.flow("Start", "e", {size: wh}).recenter([0, 6]);
	svg.flow("INPUT a whole\nnumber as <tspan>num</tspan>", "p", {size: wh}).recenter([0, 5]);
	svg.flow("SET <tspan>factor</tspan> = 2", "r", {size: wh}).recenter([0, 4]);
	svg.flow("<tspan>num</tspan> > 1?", "d", {width: 0.75}).recenter([0, 2]);
	svg.flow("<tspan>num</tspan> ÷ <tspan>factor</tspan>\nhas a remainder?", "d", {width: 0.75}).recenter([1, 2]);
	svg.flow("PRINT <tspan>factor</tspan>", "p", {size: wh}).recenter([1, 1 - dy1]);
	svg.flow("SET <tspan>num</tspan> =\n<tspan>num</tspan> ÷ <tspan>factor</tspan>", "r", {size: wh}).recenter([1, -dy1]);
	svg.flow("SET <tspan>factor</tspan> =\n<tspan>factor</tspan> + 1", "r", {size: wh}).recenter([2, 2]);
	svg.flow("End", "e", {size: wh}).recenter([0, 1 - dy1]);

	svg.text("yes", [0.5, 2.2]);
	svg.text("no", [0.1, 1]);
	svg.text("yes", [1.5, 2.2]);
	svg.text("no", [1.1, 1]);

	svg.css_map("text", "grid").addClass("NoStyle");
	let t = svg.$.find("text").css({"font-family": SVG2.sans, "font-size": "14px", "dominant-baseline": "middle", "text-anchor": "middle"});
	t.find("tspan").css({fill: "red", "font-weight": "bold"});
	svg.$.find("rect, ellipse, polygon, circle").css({fill: "white", stroke: "black"});
	svg.$.find("line, g.Ray polyline").css({stroke: "black"});
},

});