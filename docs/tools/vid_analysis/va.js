var err;

function openFile(blob) {
	if (!blob) blob = document.getElementById("VideoFile").files[0];
	openPlayer(window.URL.createObjectURL(blob));
}

function openPlayer(fileURL) {
	var v = document.getElementById("Player");
	v.src = fileURL;
	v.load();
	$(".Hidden").show();
	$("nav p.Open").hide();
	var h = $(window).height() - $("nav").height() - 24;
	$(v).css("max-height", h + "px");
}

function togglePlay() {
	var v = document.getElementById("Player");
	if (v.paused) v.play();
	else v.pause();	
	timeDisplay();
}

function timeDisplay() {
	$("#Time").val(document.getElementById("Player").currentTime.toFixed(3) + " s");
}

function setTime(e) {
	var v = document.getElementById("Player");
	v.pause();
	v.currentTime = parseFloat($(e).val());
	timeDisplay();
}

function frame(n) {
	var v = document.getElementById("Player");
	v.pause();
	var e = $("#FPS");
	try {
		var fps = parseFloat(e.val());
		if (isNaN(fps)) fps = 30.0;
		e.val(fps.toFixed(2) + " fps");
		var t = 1 / fps;
		v.currentTime = t * (Math.round(v.currentTime / t) + n);
	}
	catch (err) {}
	timeDisplay();
}

window.onkeydown = function(ev) {
	if (ev.target.tagName.toLowerCase() != "input") {
		var k = ev.keyCode;
//		console.log(k);
		if (k == 32) togglePlay();
		else if (k == 37) frame(-1);
		else if (k == 39) frame(1);
		else {
			try {
				var v = document.getElementById("Player");
				var speed = true;
				if (k == 27) v.playbackRate = 1;
				else if (k == 38) v.playbackRate *= 1.2;
				else if (k == 40) v.playbackRate /= 1.2;
				else speed = false;
				if (speed) console.log("Playback Rate", v.playbackRate);
			}
			catch(err) {}
		}
	}
}
