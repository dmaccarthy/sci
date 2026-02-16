function layer(...args) {
    for (let i=0;i<args.length;i++) $(args[i]).css("z-index", i + 1);
}

layer.top = (e) => {
    e = $(e)[0];
    let popup = [...$(".PopUp")];
    let i = popup.indexOf(e);
    if (i > -1) {
        popup.splice(i, 1);
        popup.push(e);
        layer(...popup);
    }
}

function border_color(e, c) {
    e = $(e);
    if (!c) c = e.attr("data-color");
    e.css("border-color", c).children(".Caption").css("background-color", c);
    return e;
}

function style_vecs(svg) {
    let a = svg.$.find("g.TipToTail2D > .Arrow");
    a.filter(".Component").hide().css({fill: "yellow"});
    a.filter(".Resultant:not(.Component)").css({fill: "#0065fe"});
}

function draw_calc(e, ...args) {
    e = $(e);
    if (!e.is("div.Calc")) {
        e = $("<div>").addClass("Calc").appendTo(e);
        e.append($("<p>").html($("<img>").attr({src: "../../media/calc.svg"})));
    }
    for (let i=0;i<args.length;i++) {
        e.append($("<p>").html(args[i++]));
        e.append($("<p>").addClass("Right").html(args[i]));
    }
    return e;
}

function minimize(e, icon) {
    e = $(e).closest(".PopUp").fadeOut();
    if (!icon) {
        let svg = e.find("svg")[0];
        icon = e.attr("data-icon");
        if (!svg && !icon) icon = "../../media/link.svg";
        icon = icon ? $("<img>").attr({src: icon}) : svg.outerHTML;
    }
    icon = $(icon).addClass("Icon").appendTo("#Icons").on("click", () => minimize.restore(icon));
    let c = e.attr("data-color");
    if (c) icon.css("border-color", c);
    icon[0].restore_element = e;
}

minimize.restore = (icon)  => {
    let e = $(icon).remove()[0].restore_element.fadeIn()[0];
    layer.top(e);

}

async function show(e, t, delay) {
    if (t == null) t = 1000;
    if (delay) await sleep(delay);
    e = $(e).fadeIn(t);
    return sleep(t).then(() => e);
}

async function hide(e, t, delay) {
    if (t == null) t = 1000;
    if (delay) await sleep(delay);
    e = $(e).fadeOut(t);
    return sleep(t).then(() => e);
}

function next_cue() {return cues[next_cue.n++]()}

next_cue.n = 0;

function click(ev) {
    let orig = ev.originalEvent;
    let t = $(ev.target), e;
    t.closest(".UnHighlight").addClass("Highlight").removeClass("UnHighlight");
    if (orig.ctrlKey) {
        e = t.closest(".Minimize, .Caption");
        if (e.length) {
            e = e.closest(".PopUp");
            if (e.length == 1) minimize(e);
        }
    }
    else {
        e = t.closest(".PopUp");
        if (e.length) layer.top(e); 
    }
}

$(window).on("mousemove", ev => {
    $("#Mouse").css({top: ev.clientY, left: ev.clientX+1});
}).on("keydown", ev => {
    ev = ev.originalEvent;
    let mod = (ev.shiftKey ? 1 : 0) + (ev.ctrlKey ? 2 : 0) + (ev.altKey ? 4 : 0);
    if (mod == 0) {
        if (ev.keyCode == 13 && next_cue.n < cues.length) {
            next_cue();
        }
    }
}).on("click", click);

$(() => {
    let j = new URLSearchParams(location.search).get("j");
    fetch(`${j}.htm`).then(h => h.text()).then(h => {
        $("main").append(h);
        mjax_wait().then(mjax_render).then(() => {
            for (let e of $(".PopUp[data-color]")) border_color(e);
            for (let e of $(".PopUp")) console.log(e, e.getBoundingClientRect());
            if (cues.init) cues.init();
        });
    });
});
