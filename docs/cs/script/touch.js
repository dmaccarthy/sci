function touchscreen() {
    let n = navigator;
    if (n.maxTouchPoints) return true;
    let p = n.platform.toLowerCase();
    if (["iphone", "ipad"].indexOf(p) > -1) return true;
    n = n.userAgent.toLowerCase();
    if (n.search("android") > -1) return true;
    return false;
}

function touch(ev) {
// Implement long-tap and swipe touch actions
    ev.stopPropagation();
    let c = ev.changedTouches[0];
    if (ev.type == "touchstart") {
        // Record time and position
        touch.xStart = c.pageX;
        touch.yStart = c.pageY;
        touch.tStart = (new Date()).getTime();
    }
    else if (ev.type == "touchend") {
        // Calculate intervals
        let dx = c.pageX - touch.xStart;
        let dy = c.pageY - touch.yStart;
        let dt = (new Date()).getTime() - touch.tStart;

        // Geometry
        let r = Math.sqrt(dx*dx + dy*dy);
        let a = Math.atan2(-dy, dx) * 180 / Math.PI;
        if (a < 0) a += 360;
        let x = Math.floor((a + 45) / 90) % 4;
        let da = a <= 315 ? Math.abs(a - 90 * x) : 360 - a;
        let data = {dx:dx, dy:dy, time:dt, r:r, angle:a, axis:x, da:da, quadrant:1 + Math.floor(a / 90)};
        if (da <= touch.swipeAngle) data.swipe = ["right", "up", "left", "down"][x];

        // Call handler
        if (dt >= touch.longTime && r < touch.longDist) a = 1;
        else if (r >= touch.longDist) a = 2;
        else a = 0;
        try {
            if (a == 1) touch.longTap(data, ev);
            else if (a == 2) touch.swipe(data, ev);
        } catch(x) {}
    }
}

touch.longTime = 600;
touch.longDist = 100;
touch.swipeAngle = 22.5;

$(window).on("touchstart", touch).on("touchend", touch);
