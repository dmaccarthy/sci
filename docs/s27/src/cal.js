function teacher() {
    return parseInt(localStorage.getItem("teacher_mode")) &&
        btoa(localStorage.getItem("teacher_code")) == teacher.code;
}

teacher.code = 'Qnpya1I0cDd3bFFITThIbA==';

page.cal = (c, data) => {
    page({_cal: [c, data.sort((a, b) => {
        a = new Date(a.s);
        b = new Date(b.s);
        return a == b ? 0 : (a < b ? -1 : 1);
    })]});
    page.run(page.cal.make);
}

page.cal.make = () => {
    /* Render the calendar */
    let old = x => new Date(x.s) <= new Date();
    let show = teacher() ? () => 1 : x => new Date(x.s) < new Date("9000");
    let date = d => {
        let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];
        let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getMonth()];
        return `${day}, ${mon} ${d.getDate()}`;
    }

    let [c, data] = page._data._cal;
    let e = $("main > article > section.Post[data-action='cal']");
    let tbl = $("<table>").addClass("Calendar").appendTo(e);
    let tr = $("<tr>").appendTo($("<thead>").appendTo(tbl));
    tr.append($("<th>").html("Date"));
    tr.append($("<th>").html("Description"));

    tbl = $("<tbody>").appendTo(tbl);

    for (let item of data) if (show(item)) {
        tr = $("<tr>").appendTo(tbl);
        if (old(item)) tr.addClass("Old").hide();
        let link = item.f != null;
        if (link) tr.attr("data-feed", c + "/" + item.f);
        $("<td>").html(date(new Date(item.s))).appendTo(tr);
        let t = item.t;
        if (t.charAt(0) == '@') t = "Lesson: " + t.substring(1);
        if (link) t = $("<a>").addClass("Link").html(t);
        $("<td>").html(t).appendTo(tr);
        if (item.class) tr.addClass(item.class);
        if (item.css) tr.css(item.css);
    }
    let a = $("<a>").addClass("Link").html("Show / Hide Past Events").on("click", () => tbl.find("tr.Old").toggle());
    $("<p>").addClass("Center").append(a).appendTo(e);
}
