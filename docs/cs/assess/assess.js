function showOld() {
    $("section[data-date]").show();
    $("#Old").remove();
}

function init() {
    let s = $("section[data-date]");
    let n = -1;
    for (let i=0;i<s.length;i++) {
        let si = $(s[i]);
        let due = si.attr("data-date");
        si.find("h3").prepend(`[${due.split("-")[0]}]<br/>`);
        if (isAfter(due.replace("-", "."))) n = i;
    }
    if (btoa(localStorage.getItem("cs/assess")) == "dHFKbTZqbkl0Mw==") n = s.length - 1;
    for (let i=n+1;i<s.length;i++) $(s[i]).remove();
    if (n >= 0) {
        $(s[n]).show();
        $("#Instructions").show();
        if (n == 0) $("#Old").remove();
        else $("#Old").show();
    }
    else {
        $("#Instructions").remove();
        $("#Old").addClass("NoAssess").html("There are no assessments yet!").show();
    }
    s = $("div[data-htm]");
    for (i=0;i<s.length;i++) {
        let si = $(s[i]);
        let f = function(e, s) {
            init.mjAjax--;
            if (s == "success") {
                $(e.responseText).insertBefore(si);
                si.remove();
                if (init.mjAjax == 0) mjTypeset();
            }
            else console.log(e);
        }
        init.mjAjax++;
        published(si.attr("data-htm"), {complete: f});
    }
}

init.mjAjax = 0;

$(init);
