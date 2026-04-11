SVG2.cache("cs_new/ct1/img/flow1.js", {

factor: (sel) => {
    let svg = new SVG2(sel, {scale: 148, lrbt: [-0.6, 3.75, -3.5, 1.7]});
	let r = 0.032, dw = 0.151;

    // Draw arrows
    let g = svg.group("black@1", "black");
	for (a of [
		[[0, 1.5], [0, 0.9]], [[0, 0.6], [0, 0.15]], [[0, -0.15], [0, r/2 - 0.55]],
		[[0, 0.575], [0, -1]], [[0, -0.6], [0, -2.35]], [[0.5, -1.5], [1, -1.5]],
		[[2, -1.5], [2.5 + dw/2, -1.5]],
		[[2 - dw, -3.25], [3.7, -3.25], [3.7, -0.575], [r, -0.575]],
		[[3, -1.35], [3, -0.8], [1.5, -0.8], [1.5, -1]],
		[[1.5, -2], [1.5, -2.35]], [[1.5, -2.65], [1.5, -3.1]],
	]) g.poly_arrow(0.09, 0, ...a);

    // Draw nodes
    g = svg.group("sans", 14);
	let rect = {size: [1 - dw, 0.3]}
	let ellipse = {shape: 1, ...rect};
	let rhombus = {size: [0.7, 0.7], theta: 45};
	let trap = {shape: 2, size: [1 - dw, 0.3]};
    let node1 = g.make_node({shape: SVG2.node_shape, textY: "-6"});
    let node2 = g.make_node({shape: SVG2.node_shape, textY: "4"});

    node1(0, "Start", ellipse).shift_by([0, 1.5]);
    node2(0, "INPUT a whole\\nnumber as <tspan>num</tspan>", trap).shift_by([0, 0.75]); 
    node1(0, "SET <tspan>factor</tspan> = 2", rect);
    node1(0, '<tspan>num</tspan> > 1?', rhombus).shift_by([0, -1.5]);
    node1(0, "End", ellipse).shift_by([0, -2.5]);
	css(svg.circle(r, [0, -0.575]), "white", "black@1");

    node2(0, '<tspan>num</tspan> % <tspan>factor</tspan>\\nhas a remainder?', rhombus).shift_by([1.5, -1.5]); 
    node1(0, "PRINT <tspan>factor</tspan>", trap).shift_by([1.5, -2.5]); 
    node2(0, "SET <tspan>num</tspan> =\\n<tspan>num</tspan> ÷ <tspan>factor</tspan> + 1", rect).shift_by([1.5, -3.25]);

    node2(0, "SET <tspan>factor</tspan> =\\n<tspan>factor</tspan> + 1", rect).shift_by([3, -1.5]);
    css(g.$.find("tspan"), "red", "bold");

	g.text("yes", [0.7, -1.45, "b"]);
	g.text("no", [0.05, -2.15, "bl"]);
	g.text("yes", [2.25, -1.45, "b"]);
	g.text("no", [1.55, -2.15, "bl"]);
},


});