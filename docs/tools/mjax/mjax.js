function render(ev) {
    // Render LaTeX with MathJax
    let latex = $("#Input").val();
    let b = render.custom.indexOf(latex) > -1;
    for (let eq of $("[data-latex]"))
        if ($(eq).attr("data-latex") == latex) b = true;
    let p = $("<p>").attr({"data-latex": latex}).html(`$$${latex}$$`).prependTo("#Output");
    MathJax.typesetPromise(p).then(() => {
        if (ev != null && !b) render.custom.push(latex);    
        if (ev == null || !(ev.ctrlKey && ev.altKey)) convert_to_img(p);
        p.on("click", click);
    });
}

render.custom = [];
render.currentColor = "black";

function convert_to_img(p) {
    // Convert MathJax to <img> with SVG dataURL
    let svg = p.find("svg")[0].outerHTML.replaceAll("currentColor", render.currentColor);
    let src = "data:image/svg+xml," + encodeURIComponent(svg);
    p.html($("<img>").attr({src: src}));
}

function click() {
    // Handle clicks on SVG images
    let p = $(this);
    let latex = p.attr("data-latex");
    $("#Input").val(latex);
    if ($("#Del")[0].checked) {
        p.remove();
        let i = render.custom.indexOf(latex);
        if (i >= 0) render.custom.splice(i, 1);
    }
}

function init() {
    // Make Render button available when MathJax is ready
    if (MathJax.typesetPromise) {
        $("#Del")[0].checked = false;
        $("#Bank").on("click", bank).find("ul").hide();
        let url = new URLSearchParams(location.search).get("eqBank");
        if (url != "false")
            fetch(url == null ? "mjax.json": url).then((a) => a.json().then(update_bank));
        $("#Render").on("click", render);
        $(".Hidden").removeClass("Hidden");
    }
    else setTimeout(init, 50);
}

function save() {
    // Download math as JSON file
    if (render.custom.length == 0) {
        alert("There are no new equations to save!");
        return;
    }
    let digits = (t, n) => {
        if (!n) n = 2;
        t = `${t}`;
        while (t.length < n) t = "0" + t;
        return t;
    }
    let t = new Date();
    let m = digits(t.getMonth() + 1);
    t = `${t.getFullYear()}${m}${digits(t.getDate())}_${digits(t.getHours())}${digits(t.getMinutes())}${digits(t.getSeconds())}`;
    let data = [[`/${t}`]], n = 0;
    for (let eq of render.custom) {
        data.push([`*/Math ${n++}`, eq]);
    }
    let blob = new Blob([JSON.stringify(data, null, "")], {type: "application/json"});
    let url = URL.createObjectURL(blob);
    $("<a>").attr({href: url, download: `${t}.json`}).html("Save")[0].click();
    render.custom = [];
    update_bank(data);
}

function bank(ev) {
    let e = $(ev.target);
    if (e.is("p")) e.next("ul").slideToggle();
    else if (e.is("li[data-latex]")) {
        $("#Input").val(e.attr("data-latex"));
        render();
    }
}

function update_bank(data) {
    // Add more items to the math bank
    let bank = $("#Bank"), prev;
    for (let [key, latex] of data) {
        let parent;
        key = key.split("/");
        if (key[0] == "*") key[0] = prev;
        else if (latex == null) prev = key[1];
        for (let p of bank.find("p")) {
            if (key[0] == $(p).text()) parent = $(p);
        }
        if (latex && parent) {
            let li = $("<li>").attr("data-latex", latex).html(key[1]);
            parent.next("ul").append(li);
        }
        else {
            let ul = parent ? parent.next("ul") : bank;
            let exists = false;
            for (let p of ul.find("p")) if ($(p).text() == key[1]) exists = true;
            if (!exists) {
                let li = $("<li>").appendTo(ul);
                $("<p>").html(key[1]).appendTo(li);
                li.append($("<ul>").hide());
            }
        }
    }
    if (bank.children().length) bank.show();
}

function load(e) {
    // Load math from JSON file
    let f = e.files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
        let data = JSON.parse(reader.result);
        update_bank(data);
    });
    reader.readAsText(f);
}

$(init);
