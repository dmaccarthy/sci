SVG2.cache("cs_new/web1/img/tuscany.js", {

main: (sel) => {
    let svg = new SVG2(sel, {scale: 56, lrbt: [-3, 3, -5, 4.25]});
    let bullet = svg.group("black", "none@");
    css(svg.rect([4, 3]), "none", "black@2");
    let g = svg.group("sans", 20);
    g.text("[Illustration]");
    g = g.group("serif");
    g.text("234 Arezzo Avenue", [0, 2.3]);
    g.text("Sherwood Park", [0, 1.9]);
    let [x, y, i] = [-1.9, -2.2, 0];
    for (let t of ["Fine Italian Dining", "Daily Specials", "Licensed", "Banquet Room", "Open Daily Until 11 pm", "Eat In, Take Out, Delivery", "Call 780.555.1234"]) {
        bullet.circle("3", [x, y]);
        let item = g.text(t, [x + 0.2, y, "l"]);
        if (i++ == 1) item.css("#0065fe", {"text-decoration": "underline"});
        y -= 0.4;
    }
    g = g.group("bold", 24);
    g.text("A Taste of Tuscany", [0, 3.6], 0, 32);
    g.text("Italian Restaurant", [0, 3]);
},

spec: (sel) => {
    let svg = new SVG2(sel, {scale: 56, lrbt: [-2.5, 2.5, -5.5, 4.25]});
    css(svg.rect([4, 3]), "none", "black@2");
    let g = svg.group("sans", 20);
    g.text("[Illustration]");
    g = g.group("serif");
    let [x, y, i] = [-1.9, -2.2, 0];
    g.text("Includes any two of:", [x, y, "l"]);
    let bullet = g.group("ital");
    for (let t of ["Pasta e Fagioli", "Ravioli Nudi", "Fettunta", "Crostini con Salsiccia", "Ribollita"]) {
        y -= 0.4;
        bullet.text(`${++i}.  ${t}`, [x + 0.2, y, "l"]);
    }
    g = g.group(24);
    g.text("Today’s Special", [0, 3.6], 0, ["bold", "ital", 32]);
    let beef = g.text("<tspan>Valigette</tspan> (Beef Rolls)", [0, 2.7]);
    beef.$.find("tspan").css({"font-style": "italic"});
    g.text("$14.95", [0, 2.1]);
    g.text("Home", [0, y - 0.8]).css("#0065fe", {"text-decoration": "underline"})
},

});