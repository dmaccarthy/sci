SVG2.cache("test/clock.js", {

clock: (sel) => {
	const COLOR = "#0065fe";
	let svg = new SVG2(sel, {size: [480, 480], lrbt: [-1, 1], margin: 2});
	svg.circle(1).css({stroke: COLOR, "stroke-width": "3px", fill: "none"});
	let tick = svg.group().css({stroke: COLOR, "stroke-width": "1px"});
	let text = svg.group().css({fill: COLOR, "text-anchor": "middle", "dominant-baseline": "middle", "font-size": "28px", "font-family": '"Noto Sans", sans-serif'});
	for (let i=0;i<360;i+=6) {
		let g = tick.group().config({theta: i});
		g.line([0, 1], [0, 0.95]);
	}
	for (let i=1;i<13;i++) {
		let g = text.group();
		g.text(`${i}`);
		g.recenter(vec2d(0.86, 30 * (3 - i)));
	}
	let hr = svg.group();
	let min = svg.group();
	let sec = svg.group();
	hr.line([0, -0.1], [0, 0.6]).css({"stroke-width": "5px", stroke: "black"});
	min.line([0, -0.1], [0, 0.9]).css({"stroke-width": "3px", stroke: "black"});
	sec.line([0, -0.1], [0, 0.92]).css({"stroke-width": "1px", stroke: "red"});
	svg.circle(0.02).css({fill: "white", "stroke-width": "1px", stroke: "black"});

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
	return svg.addClass("NoStyle").play();
}

});
