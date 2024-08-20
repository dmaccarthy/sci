function isSlideshow() {return $("body").hasClass("Slides")}
function isPrintPage() {return $("body").hasClass("Print")}

function clearFeed() {
/** Reset to empty feed **/
    loadFeed.data = {};
    loadFeed.init = () => {};
    // loadFeed.initNotes = loadFeed.initSoln = () => {};
    for (let name of loadFeed._inits) delete loadFeed[name];
    loadFeed._inits = [];
    $("div.Message").remove();
    return $("#Main").html("");
}

function loadFeed(feed, noHist) {
/** Load feed via AJAX request or from cache **/
    clearTimeout(loadFeed.refresh);
    if (feed == null) feed = loadFeed.current;
    else if (typeof(feed) != "string") {
        let action = $(feed).attr("data-id").toLowerCase();
        action = action == "today" ? "_today_" : loadFeed.data[action];
        if (action) feed = action;
        else return;
    }
    if (feed == "_today_") {
        let s = loadFeed.data.today;
        for (let i=0;i<s.length;i++) {
            if (isAfter(s[i][0])) feed = s[i][1];
            else i = s.length;
        }
    }
    if (loadFeed.data.folder) feed = feed.replace("$", loadFeed.data.folder);
    loadFeed.opener = loadFeed.current;
    // console.log(feed);
    if (loadFeed.cache[feed]) onFeedLoaded(feed, true, noHist);
    else $.ajax({url: feed + ".htm", cache: false, error: (e) => {
        console.log(feed);
        console.log(e);
        msg();
        if ($("#Main").html() == "")
            setTimeout(() => {loadFeed("home")}, 1500);
    }, success:(e, s, r) => {
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
    if (key.charAt(0) == "$") return data_images[key.substr(1)];
    let url = mediaURL.urls[key];
    let dot = key.indexOf(".") > -1;
    return url ? url : `./media/${key}` + (dot ? "" : ".png");
}

mediaURL.urls = {
    python: "https://www.python.org/static/favicon.ico",
    thonny: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Thonny_logo.png/120px-Thonny_logo.png",
    replit: "https://replit.com/public/images/about/logo.png",
    sc8pr: "./media/sc8pr.svg",
    sal : "./media/sal.jpg",
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
    gsheet: "https://ssl.gstatic.com/docs/spreadsheets/spreadsheets_2023q4.ico",
    slides: data_images.slides,
    video: "./media/video.svg",
    correct: data_images.correct,
}

function apply(e, f) {
/** Apply a function to all matched elements **/
    $.each($(e), (i, ei) => {f($(ei))});
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
    clearFeed().prepend(e);
    if (!teacher.mode) {
        apply("[data-answers]", (ei) => {
            let da = ei.attr("data-answers");
            if (da == "1") da = loadFeed.data.answerDate;
            if (!isAfter(da)) ei.find(".Answer").remove();
        });
        apply("[data-show]", (ei) => {
            if (!isAfter(ei.attr("data-show"))) ei.remove();
        });
    }

    // Store printable sections
    loadFeed.printable = {};
    apply("[data-print]", (ei) => {
        let id = ei.attr("data-print");
        loadFeed.printable[id] = $(`#${id}`)[0].outerHTML;
    });

    // // Send AJAX requests
    // apply("section.Post [data-ajax]", (ei) => {
    //     let url = ei.attr("data-ajax");
    //     // if (url == "1") url = location.hash.substr(1) + "_s.htm";
    //     $.ajax({url: url, cache: false, success: (e) => {
    //         ei.html(e);
    //         // ei.find("#Title").remove();
    //     }});
    // });

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

    // Add print icons
    $("<img>").appendTo("span[data-print]").click((ev) => {
        ev = ev.originalEvent;
        let id = $(ev.currentTarget.closest("[data-print]")).attr("data-print");
        if (ev.ctrlKey && ev.altKey) {
            if (id == "LessonNotes") window.open("slideshow.html");
        }
        else window.open(`print.html?id=${id}`);
        return false;
    }).attr({title: "Print Preview", alt: "Print", "data-src": "$print"});

    // Get image source URLs
    apply("img[data-src]", (ei) => {
         ei.attr({src: mediaURL(ei.attr("data-src"))});       
    });

    // Embed videos
    apply("[data-yt], [data-video]", video);

    // Enable collapsible posts
    let h2 = $("section.Post").find(".Collapse:not(div)");
    h2.addClass("Link").on("click", collapse).attr({title: "Click to expand or collapse"});  
    $("section.Post div.Collapse:not(.Expand)").hide();
    $("section.Post > img.Icon:first-child").click((e) => {
        $(e.currentTarget).next().trigger("click");
    }).addClass("Link");

    // Feed title
    let data = loadFeed.data;
    title = data.title;
    if (!title) title = "Untitled Feed";
    h2 = $("#TopTitle").html(document.title = title);
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

    // apply("[data-action]", (ei) => {
    //     ei.on("click", (ev) => {
    //         console.log(ei.attr("data-action"));
    //     });
    // });

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
                    if (url) url = "https://media-davidmaccarthy.replit.app/" + url;
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

    // Retore collapse/expand state
    let div = $("div.Collapse");
    let toggle = collapse.toggled[feed];
    for (let i of toggle) $(div[i]).toggle();

    // Finish up
    $("#Main, #Copy").show();
    layoutWidth();
    loadAllSVG(() => {
        try {loadFeed.init()} catch(err) {console.error(err)};
        $(window).scrollTop(0);
        for (let s of $("script[data-init]")) {
            let name = $(s).attr("data-init");
            try {loadFeed[name]()} catch(err) {console.error(err)};
            loadFeed._inits.push(name);
            // delete loadFeed[name];
        }
        // try {loadFeed.initNotes()} catch(err) {console.error(err)};
        // try {loadFeed.initSoln()} catch(err) {console.error(err)};
        aspect();
        renderTeX();
        drawChevrons();
    });
}

function printable(id) {return loadFeed.printable[id]}

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
            // src: mediaURL(img[i] + ".svg"), alt: img[i],
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
        if (a.attr("data-course")) clickLink.course = 1;
        else {
            let f = feed.split("/");
            if (f[f.length - 1] == "rev") clickLink.course = 0;
        }
        localStorage.setItem("clickLink.course", clickLink.course);
        loadFeed(feed);
        return false;
    }    
}

clickLink.course = localStorage.getItem("clickLink.course") == "1" ? 1 : 0;

function goUp(ev) {
/** Event handler for "up" command **/
    if (ev.ctrlKey && ev.altKey) teacher(teacher.mode ? 0 : 2);
    else if (ev.ctrlKey && ev.shiftKey) window.open(location.href);
    else {
        let feed = loadFeed.data.up;
        if (feed) loadFeed(feed);        
    }
}

function video(s) {
/** Embed a <video> or YouTube <iframe> **/
    s = $(s);
    let opt = s.attr("data-opt");
    opt = opt ? JSON.parse(opt.replaceAll("'", '"')) : {};

    let w = opt.width;
    let r = opt.aspect;
    if (!r) r = "16/9";
    let ar = typeof(r) == "number" ? r : math.evaluate(r);
    if (!w) w = 405 * ar;
    let id = s.attr("data-yt"), v;
    if (id) {
        let c = id.charAt(0);
        if (c == "#") id = "videoseries?list=" + id.slice(1);
        v = $("<iframe>").attr({frameborder:0, allowfullscreen:1,
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
    // clearTimeout(layoutWidth.timeout);
    let body = $("body");
    let w = body.width();
    let x = ($(window).width() - w) / 2;
    let top = $("#Top");
    body.css("margin-top", `calc(0.7em + ${top.outerHeight()}px)`);
    top.width(w - (w < 780 ? 21.6 : 0 * 25.2)).css({left: `${x}px`});
    aspect();
    // layoutWidth.timeout = setTimeout(layoutWidth, 10);
}

function loadHash(init) {
/** Load feed identified by URL fragment/"hash" **/
    clearFeed();
    let feed = location.hash;
    if (feed == "#~") {
        if (init && location.origin.indexOf("replit.") > -1)
            location.href = "https://dmaccarthy.github.io/sci";
        else feed = "";
    }
    loadFeed(feed ? feed.slice(1) : "home", !init);    
}

function collapse(e) {
/** Toggle collapsible sections **/
    e = $(e.currentTarget).next("div.Collapse").toggle();
    layoutWidth();
    drawChevrons();
    let t = collapse.toggled;
    let k = loadFeed.current;
    let i = $("div.Collapse").index(e[0]);
    let j = t[k].indexOf(i);
    if (j == -1) t[k].push(i);
    else t[k].splice(j, 1);
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
    if (teacher.mode && location.hostname == "dmaccarthy.github.io")
        $.ajax({url: "https://dmaccarthy.vercel.app/ping.json"});
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

// let tmp;

// Other event handlers

$(window).on("resize", layoutWidth).on("popstate", loadHash);

$(() => {
/** Initialize page **/
    $("#DateToday").html(new Date().getDate());
    teacher(null, true);
    loadHash(true);
    document.getElementById("TopTitle").addEventListener("click", goUp);
});
