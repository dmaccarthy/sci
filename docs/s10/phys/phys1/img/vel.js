scripts.cache["s10/phys/phys1/img/vel"] = {

uam: sel => {
    let svg = new SVG2(sel, {size: [480, 360], lrbt: [0, 8, 0, 12], grid: 1, margin: [54, 12, 52, 12]});
    svg.ticks_xy([0, 8.1, 1], [0, 13, 2], {default: true});
    let g = svg.group("sans", 18);
    g.text("Time / s", [4, "-44", "b"]);
    g.text("Position / m", ["-32", 6, "b"], 90);
    svg.locus(quad([5, 11], [8, 7]).fn).css("none", "#0065fe@2");
},

ticker: sel => {
    let png = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABGSURBVChTlYwBCgAgCAP3/08XSK1pJjmI3HmI0QgiqOJk4FSdyS4AUNTZunhO2v9TNvB72cAS9HGXSVl3chRU4j6CKi15AqGci4MuTwqsAAAAAElFTkSuQmCC";
    let svg = new SVG2(sel, {scale: 18, lrbt: [0, 30, -0.5, 0.5], grid: 0, margin: 5});
    for (let i=0;i<11;i++) {
        let x = [i * i / 5 + i, 0];
        svg.group().config({pivot: x, theta: 360 * Math.random()}).image(png, ["12", "12"], x);
    }
},

};