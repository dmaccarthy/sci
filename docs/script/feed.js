function clearFeed() {
/** Reset to empty feed **/
    if ($("body").hasClass("Present")) return location.reload();
    loadFeed.data = {};
    for (let name of loadFeed._inits) delete loadFeed[name];
    loadFeed._inits = [];
    $("div.Message").remove();
    return $("#Main").html("");
}

function chapRev() {
    let f = loadFeed.referer;
    if (f) {
        f = f.split("/");
        return ["rev", "home"].indexOf(f[f.length-1]) > -1;
    }
    return false;
}

function assign() {
    $(".Answer, hr, nav, #Copy").remove();
    $("section:not([data-answers])").remove();
    $("span.Action, img.Icon, img.Chevron").remove();
    $("div.Collapse").addClass("Expand").show();
}

function loadFeed(feed, noHist) {
/** Load feed via AJAX request or from cache **/
    clearTimeout(loadFeed.refresh);
    loadFeed.referer = loadFeed.current;
    if (feed == null) feed = loadFeed.current;
    else if (typeof(feed) != "string") {
        let action = $(feed).attr("data-id").toLowerCase();
        action = action == "today" ? loadFeed.current.split("/")[0] + "/cal" : loadFeed.data[action];
        if (action) feed = action;
        else return;
    }
    if (loadFeed.data.folder) feed = feed.replace("$", loadFeed.data.folder);
    loadFeed.opener = loadFeed.current;
    if (loadFeed.cache[feed]) onFeedLoaded(feed, true, noHist);
    else $.ajax({url: feed + ".htm", cache: false, error: (e) => {
        console.log(feed);
        console.log(e);
        msg();
        if ($("#Main").html() == "")
            setTimeout(() => {loadFeed("home")}, 1500);
    }, success:(e) => {
        onFeedLoaded(feed, e, noHist);
    }});
    loadFeed.refresh = setTimeout(() => {
        location.reload();
    }, 3600 * 4000);
}

loadFeed.cache = {};
loadFeed._inits = [];

function feedURL(feed, qs) {
/** Compose a URL for a specific feed **/
    let query = "";
    if (qs === true) qs = qsArgs();
    if (qs && qs.length) {
        query = "?";
        let k;
        for (k in qs) {
            if (query.length > 1) query += "&";
            query += `${encodeURIComponent(k)}=${encodeURIComponent(qs[k])}`;
        }
    }
    return location.origin + location.pathname + `${query}#${feed}`;
}

function mediaURL(key) {
/** Construct a URL for requested media **/
    if (key.indexOf("/") != -1) return key;
    if (key.slice(0, 4) == "http") return key;
    if (key.charAt(0) == "$") return data_images[key.substring(1)];
    let url = mediaURL.urls[key];
    let dot = key.indexOf(".") > -1;
    return url ? url : `./media/${key}` + (dot ? "" : ".png");
}

mediaURL.urls = {
    python: "https://www.python.org/static/favicon.ico",
    thonny: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thonny_logo.png/120px-Thonny_logo.png",
    replit: "https://replit.com/public/images/about/logo.png",
    amoeba: "./media/amoeba.webp",
    crash: "./media/crash.webp",
    sc8pr: "./media/sc8pr.svg",
    ide: "./media/vscode.svg",
    sal: "./media/sal.webp",
    bs: "https://s.brightspace.com/lib/branding/1.0.0/brightspace/favicon.svg",
    ps: "https://powerschool.eips.ca/favicon-196x196.png",
    desmos: "https://www.desmos.com/favicon.ico",
    phet: "https://phet.colorado.edu/favicon.ico",
    print: data_images.print,
    html5: data_images.sim,
    xml: data_images.xml,
    simulation: data_images.sim,
    "simulation.svg": data_images.sim,
    "html5.svg": data_images.html,
    help: "./media/help.svg",
    gdrv: data_images.gdrv,
    gdoc: "https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png",
    gsheet: "https://ssl.gstatic.com/docs/spreadsheets/spreadsheets_2023q4.ico",
    slides: data_images.slides,
    video: "./media/video.svg",
    correct: data_images.correct,
}

function calendar(cal) {
/** Draw the course calendar **/
    if (!cal) return;
    let today = new Date();
    let isToday = (d) => {
        d = new Date(d).toString();
        let t = new Date(today).toString();
        return d.substring(0, 15) == t.substring(0, 15);
    }
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let tb = $("table.Calendar");
    for (let ev of cal) {
        let [date, text, attr, css] = ev;
        if (text.charAt(0) == "@") text = "Lesson: " + text.substring(1);
        let tr = $("<tr>").appendTo(tb);
        if (isAfter(date) && !isToday(date)) tr.hide().addClass("PastDue");
        let [w, m, d] = date.split(".");
        m = months[parseInt(m) - 1];
        w = days[new Date(date).getDay()];
        $("<td>").html(`${w}, ${m} ${d}`).appendTo(tr);
        if (attr) {
            text = $("<a>").html(text).attr(attr);
            // if (attr.href) {}
        }
        $("<td>").html(text).css(css ? css : {}).appendTo(tr);
    }
    $("#ShowOld").on("change", (ev) => {
        let tr = $("table.Calendar tr.PastDue");
        if (ev.currentTarget.checked) tr.show();
        else tr.hide();
    })[0].checked = false;
}

function apply(e, f) {
/** Apply a function to all matched elements **/
    $.each($(e), (i, ei) => {f($(ei))});
}

function handouts(data) {
/** Generate handouts post **/
    if (data) {
        let s = $("#Main section.Handouts");
        if (s.length == 0) s = $("<section>").appendTo("#Main");
        s.removeClass("Handouts").addClass("Post NoPrintIcon").attr({"data-show": "1", "data-icon": "gdrv"});
        let h2 = $("<h2>").addClass("Collapse").html("Handouts").appendTo(s);
        let div = $("<div>").addClass("Collapse").appendTo(s);
        let html = $("<p>").html(siteData.handouts).appendTo(div);
        let p = $("<p>").addClass("BtnGrid").appendTo(div);
        for (let [title, info] of data) {
            if (title) {
                let btn = $("<button>").html(title).appendTo(p);
                if (info.gdrv) btn.attr({"data-icon": "gdrv"});
                for (let k in info) btn.attr(`data-${k}`, info[k]);
            }
            else {
                if (info.title) h2.html(info.title);
                if (info.html) html.html(info.html);
            }
        }
    }
}

function onFeedLoaded(feed, e, noHist) {
/** Render page once the feed has been loaded **/

    // Save feed to cache
    let cache = loadFeed.cache;
    if (e === true && cache) e = loadFeed.cache[feed];
    else {
        cache[feed] = e;
        if (teacher.mode) {
            let k, i = 0, n = 0;
            for (k in cache) {
                n += cache[k].length;
                i++
            }
            console.log(`Cache: ${i} feed(s) [${(n/1024).toFixed(1)} kb]`);           
        }
    }
    if (collapse.toggled[feed] == null) collapse.toggled[feed] = [];

    // Update browser history
    loadFeed.current = feed;
    let hash = location.hash;
    if (hash.slice(1) != feed && !noHist) {
        let url = feedURL(feed, true);
        if (hash) history.pushState({}, "", url);
        else history.replaceState({}, "", url);
    }

    // Add content to page
    let a, title, i;
    $("#Main").css("visibility", "hidden");
    clearFeed().prepend(e);
    handouts(loadFeed.data.handouts);
    calendar(loadFeed.data.cal);
    if (!teacher.mode) {
        apply("[data-answers]", (ei) => {
            let d = ei.attr("data-answers");
            if (d == "1") d = loadFeed.data.answerDate;
            if (!isAfter(d)) ei.find(".Answer").remove();
        });
        apply("[data-show]", (ei) => {
            let d = ei.attr("data-show");
            if (d == "1") d = loadFeed.data.showDate;
            if (!isAfter(d)) ei.remove();
        });
    }

    // Add titles and icons to posts
    apply("section.Post[data-title]", (ei) => {
        ei.prepend($("<h2>").html(ei.attr("data-title")));       
    });
    apply("button[data-icon]", (ei) => {
        ei.html($("<p>").html(ei.html()));
    });
    apply("[data-icon]", (ei) => {
        let a = {src: mediaURL(ei.attr("data-icon"))};
        ei.prepend($("<img>").attr(a).addClass("Icon"));
    });

    // Add print icons and get image source URLs
    printIcons();
    apply("img[data-src]", (ei) => {
         ei.attr({src: mediaURL(ei.attr("data-src"))});       
    });

    // Embed videos
    apply("[data-yt], [data-video]", video);

    // Enable collapsible posts
    let h2 = $("section.Post").find(".Collapse:not(div)");
    h2.addClass("Link").on("click", collapse).attr({title: "Click to expand or collapse"});
    $("section.Post > img.Icon:first-child").click((e) => {
        $(e.currentTarget).next().trigger("click");
    }).addClass("Link");

    // Feed title
    let data = loadFeed.data;
    title = data.title;
    if (!title) title = "Untitled Feed";
    document.title = $("<p>").html(data.title).text();
    h2 = $("#TopTitle").html(title);
    if (data.up)
        h2.addClass("FeedLink").attr({title: "Click to go up one level"});
    else
        h2.removeClass("FeedLink").removeAttr("title");

    // Page and site variables
    apply(".Var", (ei) => {
        let html = ei.html();
        html = data[html] ? data[html] : siteData[html];
        ei.html(html);
    });

    // Display active buttons
    let btn = ["today", "prev", "next"];
    let j = -1;
    a = $("#Buttons > a").removeClass("Last");
    for (i=0;i<btn.length;i++) {
        if (data[btn[i]]) {
            $(a[i]).show();
            j = i;
        }
        else $(a[i]).hide();
    }
    if (j > -1) $(a[j]).addClass("Last");

    // Create feed hyperlinks
    apply("[data-feed]", (ei) => {
        let tag = ei[0].tagName;
        let feed = ei.attr('data-feed');
        if (tag == "A") {
            let f = data.folder;
            f = feedURL(f ? feed.replace("$", f) : feed, true);        
            ei.attr({href: f}).click(clickLink);
        }
       else {
            if (tag == "SECTION") ei = $(ei.find("h2")[0]);
            ei.addClass("FeedLink").attr({title: "Click to open this feed"}).click(() => {loadFeed(feed)});
        }
    });

    // Create other hyperlinks
    apply("[data-gdrv], [data-gdoc], [data-doc], [data-link], [data-open]", (ei) => {
        let url = ei.attr("data-link"), tab = false;
        if (!url) {
            tab = true;
            url = ei.attr("data-gdrv");
            if (url) url = "https://drive.google.com/file/d/" + url;
            else {
                url = ei.attr("data-gdoc");
                if (url) url = "https://docs.google.com/document/d/" + url;
                else {
                    url = ei.attr("data-doc");
                    if (url) url = "./media/" + url;
                    else url = ei.attr("data-open");
                }
            }
        }
        if (ei[0].tagName == "A") {
            ei.attr({href: url});
            if (tab) ei.attr({target: randomString(12, 2)});
        }
        else ei.addClass("FeedLink").click(() => {
            if (tab) window.open(url);
            else location.href = url;
        });
    });

    // Enable copy/open operation on .Code elements
    $(".IO").removeClass("IO").addClass("Code");
    $("pre.Code, pre.CodeScroll").attr({spellcheck: false});
    $("[data-echo=copy]").attr("data-echo", "text");
    apply("[data-echo]", copy_or_open);

    // Add event listeners
    $("#Top").remove().appendTo("body").show();
    $("#Buttons > a").on("click", (e) => {
        loadFeed(e.currentTarget);
    });

    // Remove unnecessary MathJax elements
    setTimeout(() => $("div:is(.MJX_ToolTip, .MJX_LiveRegion, .MJX_HoverRegion)").remove(), 2000);

    // Finish up
    $("tr.NoBold th:not(.Bold)").addClass("NoBold");
    $("#Main, #Copy").show();
    drawChevrons();
    renderTeX();
    SVG2.load(initFeed);

}

function printIcons() {
    for (let e of $("section.Post:not(.NoPrintIcon)")) {
        e = $(e).children("h2:not(.NoPrintIcon)");
        if (e.length) {
            e = $(e[0]);
            e.children("span[data-print]").remove();
            let span = $("<span>").addClass("Action");
            e.append(span);
            $("<img>").attr({"data-src": "$print", title: "Print this section"}).appendTo(span).on("click", (ev) => {
                $("section.Post").hide();
                e.closest("section.Post").show();
                let div = $(ev.currentTarget).closest("h2").next("div.Collapse");
                div.show().find(".Collapse").show();
                print();
                return false;
            });
        }
    }
}

function initFeed() {
    // Run scripts
    for (let s of $("script[data-init]")) {
        let name = $(s).attr("data-init");
        try {loadFeed[name]()} catch(err) {console.error(err)};
        loadFeed._inits.push(name);
    }

    // Restore collapsed/expanded state
    $("section.Post div.Collapse:not(.Expand)").hide();
    let div = $("div.Collapse");
    let toggle = collapse.toggled[loadFeed.current];
    for (let i of toggle) $(div[i]).toggle();

    // Finalize layout
    layoutWidth();
    $(window).scrollTop(0);
    $("#Main").css("visibility", "visible");
}

function copy_or_open(ei) {
/** Enable copy/open operation on [data-echo] elements **/
    let echo = ei.attr("data-echo");
    let p = $("<p>").addClass("EchoControl").insertBefore(ei);
    let title  = ei.attr("data-title");
    if (title == "1") title = echo;
    echo = echo.split(".");
    echo = echo[echo.length - 1];
    if (!title) title = {
        html: "HTML Code",
        htm: "HTML Code",
        xml: "XML Code",
        py: "Python Code",
        text: "Plain Text",
        css: "CSS Code",
        js: "Javascript Code",
        json: "JSON Data",
        svg: "SVG Code",
        csv: "CSV Data",
        io: "Program Output",
    }[echo];
    if (!title) title = "Plain Text";
    p.html($("<span>").html(title).addClass("CodeTitle"));
    let s = $("<span>").addClass("Buttons").appendTo(p);
    let img = ["copy", "open_tab", "download"];
    for (i=0;i<3;i++) {
        btn = $("<img>").addClass("Icon").attr({
            src: data_images[img[i]], alt: img[i],
            title: ["Copy to clipboard", "Open in new browser tab", "Download"][i]
        }).appendTo(s);
        btn[0].action = i;
        btn.click((e) => {
            e = e.currentTarget;
            code_echo($(e).closest(".EchoControl").next("[data-echo]"), e.action);
        });
    }
}

function drawChevrons() {
/** Draw ^ or > chevrons to indicate expanded/collapsed state **/
    let div = $("div.Collapse");
    for (let i=0;i<div.length;i++) {
        let e = $(div[i]);
        let h2 = e.prev(".Collapse");
        if (h2.find(".Chevron").length == 0) for (let c of "dr")
            h2.prepend($("<img>").addClass("Chevron").attr({src: data_images[`chevron_${c}`]}));
        let j = e.is(":visible") ? 0 : 1;
        e = h2.find(".Chevron");
        $(e[j]).hide();
        $(e[1-j]).show();
     }
}

function clickLink(ev) {
/** Handle click event on feed link **/
    let url = location.origin + location.pathname;
    let a = $(ev.currentTarget);
    let href = a.attr("href");
    let n = url.length;
    if (href.slice(0, n) == url) {
        let feed = href.slice(n + 1);
        loadFeed(feed);
        return false;
    }    
}

function goUp(ev) {
/** Event handler for "up" command **/
    let feed = loadFeed.data.up;
    if (feed) loadFeed(feed);        
}

function video(s) {
/** Embed a <video> or YouTube <iframe> **/
    s = $(s);
    let opt = s.attr("data-opt");
    opt = opt ? JSON.parse(opt.replaceAll("'", '"')) : {};
    let border = opt.border? opt.border : 0;

    let w = opt.width;
    let r = opt.aspect;
    if (!r) r = 16 / 9;
    let ar = typeof(r) == "number" ? r : jeval_frac(r);
    if (!w) w = 405 * ar;
    let id = s.attr("data-yt"), v;
    if (id) {
        let c = id.charAt(0);
        if (c == "#") id = "videoseries?list=" + id.slice(1);
        v = $("<iframe>").attr({frameborder: border, allowfullscreen:1,
            src:"https://www.youtube.com/embed/" + id});
    }
    else {
        id = s.attr("data-video");
        v = $("<video>").attr({controls: 1, src: id});
    }
    v.attr({width: w, "data-aspect": r});
    $("<p>").addClass("Center Collapse").html(v).appendTo(s);
}

function layoutWidth() {
/** Adjust page metrics when body width changes **/
    let body = $("body");
    let w = body.width();
    let x = ($(window).width() - w) / 2;
    let top = $("#Top");
    let marg = body.hasClass("Present") ? "0px" : `calc(0.7em + ${top.outerHeight()}px)` ;
    body.css("margin-top", marg);
    top.width(w - (w < 780 ? 21.6 : 0 * 25.2)).css({left: `${x}px`});
    aspect();
}

function loadHash(init) {
/** Load feed identified by URL fragment/"hash" **/
    clearFeed();
    let feed = location.hash;
    if (feed == "#~") feed = "";
    loadFeed(feed ? feed.slice(1) : "home", !init);    
}

function collapse(e) {
/** Toggle collapsible sections **/
    let alt = e.altKey && e.ctrlKey;
    let div = $(e.currentTarget).next("div.Collapse");
    if (!alt || div.is(":hidden")) {
        div.toggle();
        layoutWidth();
        drawChevrons();
        let t = collapse.toggled;
        let k = loadFeed.current;
        let i = $("div.Collapse").index(div[0]);
        let j = t[k].indexOf(i);
        if (j == -1) t[k].push(i);
        else t[k].splice(j, 1);    
    }
    if (alt) slideShow(div);
}

collapse.toggled = {};

function teacher(t, init) {
/** Set/get teacher mode **/
    teacher.mode = false;
    if (t != null) localStorage.setItem("teacher_mode", t);
    if (parseInt(localStorage.getItem("teacher_mode")))
        if (btoa(localStorage.getItem("teacher_code")) == teacher.access)
            teacher.mode = true;
    console.log("Teacher", teacher.mode);
    if (teacher.mode && location.hostname == "dmaccarthy.github.io") serverUTC();
    if (!init) loadFeed();
}

teacher.access = "Qnpya1I0cDd3bFFITThIbA==";

let siteData = {lesson: "", email: "david.maccarthy@eips.ca"};

function msg(html, time) {
/** Display a message to the user **/
    if (!html) html = "Unable to load page."
    let b = $("body"), w = $(window);
    let e = $("<div>").addClass("Message").html(html).appendTo(b);
    let x = (w.width() - e.outerWidth()) / 2;
    e.css({left: `${x}px`});
    e.fadeIn(500);
    setTimeout(() => {
        e.fadeOut(1500);
        setTimeout(() => {e.remove()}, 1600);
    }, time ? time : 2500);
}

function serverUTC(cb) {$.ajax({url: serverUTC.url, success: cb ? cb : console.log})}
serverUTC.url = "https://dmaccarthy.vercel.app/utc.json";


// Printing 

function beforePrint() {
    let b = $("body");
    if (!b.hasClass("Present")) {
        beforePrint.hide = $("#Top, .NoPrint:visible").hide();
        b.prepend($("<h1>").attr({id: "PrintTitle"}).html(document.title));    
    }
}

window.addEventListener("beforeprint", beforePrint);

window.addEventListener("afterprint", () => {
    if (!$("body").hasClass("Present")) {
        try {
            $("#PrintTitle").remove();
            beforePrint.hide.show();
            loadFeed();
        }
        catch(err) {}    
    }
});


// Slideshow functions

function showOnly(sel) {
    sel = $($(sel)[0]);
    for (let e of $("body *")) {
        e = $(e);
        let d = e.closest(sel).length > 0;
        let a = sel.closest(e).length > 0;
        if (!d && !a) e.hide();
    }
}

function slideShow(sel) {
    $("body").addClass("Present");
    let e = sel = $($(sel)[0]).addClass("TopLevel");
    e.find(".NoPresent").remove();
    showOnly(sel);
    slideShow.sections = e.children(".Slide");
    if (slideShow.sections.length == 0) slideShow.sections = sel;
    while (e[0].tagName.toUpperCase() != "BODY") e = e.parent().show();
    goSlide();
    layoutWidth();
    $(window).on("keydown", (ev) => {
        let a = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].indexOf(ev.key);
        if (a >= 0) {
            let t = ["INPUT", "TEXTAREA"].indexOf(ev.target.tagName.toUpperCase());
            let n = ev.ctrlKey ? 10 : 1;
            if (t == -1) {
                if (a < 2) {
                    while (n--) (a ? prevCue : nextCue)();
                }
                else if (a == 2) goSlide();
                else if (a == 3) goPrev();
                layoutWidth();
                scrollToBottom(t);
            }
        }
    })
}

function goSlide(n) {
    if (n == null) n = goSlide.n == null ? 0 : goSlide.n + 1;
    if (n > slideShow.sections.length) n = slideShow.sections.length;
    goSlide.n = n;
    slideShow.sections.hide();
    let s = $(slideShow.sections[n]).fadeIn();
    let c = s.find("div, p, ol, ul, li, h1, h2, h3, table, *[data-cue]");
    goSlide.cues = [];
    for (let e of c) {
        e = $(e);
        let cue = e.attr("data-cue");
        if (cue == "prev")
            goSlide.cues[goSlide.cues.length-1].push(e.hide()[0]);
        else if (cue == "wait" || !e.is(":first-child") && cue != "none")
            goSlide.cues.push([e.hide()[0]]);
        else e.show();
    }
    goSlide.cueNum = -1;
}

function goPrev() {goSlide(goSlide.n ? goSlide.n - 1 : 0)}

function nextCue() {
    let cues = goSlide.cues;
    let n = ++goSlide.cueNum;
    if (n >= cues.length) goSlide();
    else $(cues[n]).fadeIn();
}

function prevCue() {
    let cues = goSlide.cues;
    let n = goSlide.cueNum--;
    if (n >= 0) $(cues[n]).fadeOut();
    else {
        goPrev();
        let cues = goSlide.cues;
        let n = cues.length;
        for (let i=0;i<n;i++) $(cues[i]).show();
        goSlide.cueNum = n - 1;    
    }
}

function scrollToBottom(t) {
    let h = $("html");
    let y = h[0].scrollHeight - $(window).height();
    h.animate({scrollTop: y < 0 ? 0 : y}, t ? t : 500);
}


// Other event handlers

$(window).on("resize", layoutWidth).on("popstate", loadHash);

$(window).on("keydown", (ev) => {
    if (ev.ctrlKey && ev.altKey) {
        let k = ev.key.toLowerCase();
        if (k == "n") window.open(location.href);
        else if (k == "t") teacher(teacher.mode ? 0 : 2);
        else if (k == "p") {
            if (teacher.mode) assign();
        }
    }
});


$(() => {
/** Initialize page **/
    let latex = localStorage.getItem("latex-renderer");
    if (latex) {
        let r = {
            svg: mjax_render,
            katex: katex_render,
            mjax: (e) => mjax_render(e, 1),
            none: (e) => $(e ? e : ".TeX").css({visibility: "visible"}),
        }[latex];
        if (r) {
            renderTeX = r;
            console.log(`latex-renderer = ${latex}`);
        }
    }
    teacher(null, true);
    loadHash(true);
    document.getElementById("TopTitle").addEventListener("click", goUp);
});
