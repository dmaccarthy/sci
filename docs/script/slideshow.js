let slideList, customAction = {};
let loadFeed = {init: renderTeX}
// let tmp = {};

function action(e) {
    let cue = e.attr("data-cue");
    if (cue == "+") {
        if (action.effect) e.slideDown();
        else e.show();
    }
    else if (typeof(cue) == "string") {
        if (cue == "!") cue = e[0].id;
        try {customAction[cue](e)}
        catch(e) {}
    }
}

action.effect = false;

function scrollToBottom(t) {
    let h = $("html");
    let y = h[0].scrollHeight - $(window).height();
    h.animate({scrollTop: y < 0 ? 0 : y}, t ? t : 500);
}

function nextCue(noScroll) {
    if (showSlide.action < showSlide.actions.length - 1)
        action($(showSlide.actions[++showSlide.action]));
    else {
        let n = showSlide.slide + 1;
        if (n < slideList.length) showSlide(n);
        else $("#LessonNotes > *").hide();

        // else if (sync.cueTimes) {
        //     let dt = [];
        //     for (let i=1;i<sync.cueTimes.length;i++)
        //         dt.push(sync.cueTimes[i][0] - sync.cueTimes[i-1][0]);
        //     console.log(sync.cueTimes);
        //     console.log(dt);
        //     delete sync.cueTimes;
        // }
    }
    maxVis();
    if (!noScroll) scrollToBottom();
    // try {sync.cueTimes.push([new Date().getTime(), showSlide.slide, showSlide.action+1])}
    // catch(n) {}
}

function goto(s, n) {
    showSlide(s == null ? showSlide.slide : s);
    if (n == null) n = 0;
    while (n--) nextCue(1);
    scrollToBottom();
}

function prevCue() {
    if (showSlide.action >= 0) goto(showSlide.slide, showSlide.action);
    else if (showSlide.slide) {
        showSlide(showSlide.slide - 1);
        let n = showSlide.actions.length;
        while (n--) nextCue();
    }
}

function showSlide(n) {
    if (n == null) n = showSlide.slide + 1;
    if (n < 0) n = 0;
    else if (n >= slideList.length) n = slideList.length - 1;
    let slide = $(slideList[n]);
    // showSlide.actions = slide.find("*").show().filter("[data-cue]").hide();
    showSlide.actions = slide.find("[data-cue]").hide();
    $("#LessonNotes > *").hide();
    $("#LessonNotes p[data-qr] canvas").show();
    if (action.effect) slide.slideDown();
    else slide.show();
    showSlide.slide = n;
    showSlide.action = -1;
    action(slide);
}

showSlide.init = () => {
    renderTeX();
    let e = qrMake().find("canvas");
    aspect();
    slideList = $("section.Slide");
    showSlide(0);
}

function qrMake() {
    let e = $("[data-qr]");
    for (let i=0;i<e.length;i++) {
        let ei = $(e[i]);
        let url = `https://dmaccarthy.github.io/sci/#${ei.attr("data-qr")}`;
        let qr = new QRCode(ei[0], {text: url, colorDark: "#0000ff"});
        let cv = ei.find("canvas").show();
        ei.find("img").remove();
    }
    return e;
}

function goLesson() {
    let feed = location.hash;
    if (feed) location.href = `../../${feed}`;
}

function maxVis() {
    let one = $(slideList[showSlide.slide]).find(".MaxVisible");
    for (let e of one) {
        e = $(e);
        let vis = e.children(":visible");
        let n = e.attr("data-max");
        if (!n) n = 1;
        for (let i=0;i<vis.length-n;i++) $(vis[i]).hide();
    }
}

function setTitle() {
    let title = $("#Title").text();
    if (title.length) document.title = title;    
}

function _init(e) {
    loadFeed.init = () => {}
    // loadFeed = {init: () => {}, initNotes: () => {}};
    e = $(e);
    if (e.attr("id") != "LessonNotes") e = e.find("#LessonNotes");
    $("#LessonNotes").html(e.html());
    loadAllSVG(() => {
        try {loadFeed.init()} catch(err) {console.error(err)};
        // try {loadFeed.initNotes()} catch(err) {console.error(err)};
        for (let s of $("script[data-init]")) {
            s = $(s);
            try {loadFeed[s.attr("data-init")]()} catch(err) {};
        }
        $("script").appendTo("body");
        setTitle();
        showSlide.init();        
    });
}

function init(url, movie) {
    // init.orig_src = location.hash;
    // let show = location.hash.substr(1);
    // if (show.length) $.ajax({url: `${show}.htm`, success: _init});
    if (url) $.ajax({url: `${url}`, success: _init});
    else {
        // init.orig_src = opener.location.hash;
        _init(opener.printable("LessonNotes"));
    }
    if (movie) setTimeout(() => {sync(1)}, 200);
}

function sync(movie) {
    action.effect = movie ? true : false;
    if (!movie) $("body").removeClass("Movie");
    showSlide(0);
    if (movie) {
        let b = $("body").addClass("Movie Red");
        pluck.play();
        setTimeout(() => {
            b.removeClass("Red");
        }, 500);    
    }
}

$(window).on("keydown", (ev) => {
    if (ev.target == $("body")[0]) {
        if (ev.key == "ArrowRight") nextCue();
        else if (ev.key == "ArrowLeft") prevCue();
        else if (ev.key == "ArrowDown")
            showSlide(showSlide.slide + 1);
        else if (ev.key == "ArrowUp")
            showSlide(showSlide.slide - (showSlide.action >= 0 ? 0 : 1));
    }
}).on("pop", () => {init()});

$(() => {init()});

console.log(`init("./p20/movie.htm");
sync(movie=[1|0]);`);
