SVG2.cache("p30/photon/img/compton.js", {

pCons: (sel) => {
    let ps = vec2d(9.8, 30);
    let pe = vec(10, 0).minus(ps);
    let svg = SVG2.vec_diag(sel, [ps, pe], {lrbt: [-1, 11, -1.5, 5.5], scale: 32});
    svg.$.find(".Component").remove();

    let [BD, SM] = [1, 4];
    let arr = ["→", 5, [0, "12"]];
    let sub = ["15", "-10"];
    let g = svg.group();
    g.symbol(["p", BD], arr, ["i", SM, sub]).config({shift: [5, -1]}).$.addClass("Resultant");
    g.symbol(["p", BD], arr, ["s", SM, sub]).config({shift: [3.5, 3]});
    g.symbol(["p", BD], arr, ["e", SM, sub]).config({shift: [10, 3]});
    g.$.find("g.Symbol").addClass("Large").find("text").css({fill: "red"});
    g.$.find("g.Resultant text").css({fill: "#0065fe"});
    svg.text("θ", [1.5, 0.35]).css({"font-size": "20px"});
},


});