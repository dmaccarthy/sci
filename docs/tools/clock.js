SVG2.cache("tools/clock.js", {

clock: (sel) => {
	let svg = new SVG2(sel, {size: [480, 480], lrbt: [-1, 1], margin: 2});
	css(svg.circle(1), "#0065fe@3", "none");
	let tick = svg.group("#0065fe@1");
	let text = svg.group("#0065fe", 28);
	for (let i=0;i<360;i+=6) {
		let g = tick.group().config({theta: i});
		g.line([0, 1], [0, 0.95]);
	}
	for (let i=1;i<13;i++) {
		let g = text.group();
		g.text(`${i}`);
		g.align(vec2d(0.86, 30 * (3 - i)));
	}
	let hr = svg.group();
	let min = svg.group();
	let sec = svg.group();
	css(hr.line([0, -0.1], [0, 0.6]), "black@5");
	css(min.line([0, -0.1], [0, 0.9]), "black@3");
	css(sec.line([0, -0.1], [0, 0.92]), "red@1");
	css(svg.circle(0.02), "red@1", "white");

	svg.beforeupdate = function() {
		let t = new Date();
		let [h, m, s] = [t.getHours(), t.getMinutes(), t.getSeconds()];
		m += s / 60;
		h += m / 60;
		sec.config({theta: -6 * s});
		min.config({theta: -6 * m});
		hr.config({theta: -30 * h});
	}

	svg.frameRate = 20;
	return svg.play();
}

});
