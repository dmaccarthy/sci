page.cal.s10 = [ // Calendar items
    ["2026.9.1", "Lab Safety (<i>continued</i>)", {attr: {"data-feed": "s10/chem/whmis"}}],
    ["2026.9.14", "Quiz: Matter [Tentative]", {attr: {class: "Bold"}}],
    ["2027.1.28", "Final Exam [Tentative]", {attr: {class: "Bold"}}],
];

{ // Chapters
home.item("home", {page: "s10", icon: "rocket", title: "Science 10", data: {cal: false}});
_ = d => home.item("s10", d);
_({page: "chem", icon: "testtube.webp", title: "Chemistry", data: {cal: false}});
_({page: "phys", icon: "soccer", title: "Physics", data: {cal: false}});
_({page: "bio", icon: "microscope", title: "Biology", data: {cal: false}});
_({page: "clim", icon: "earth", title: "Climate", data: {cal: false}});
}

{ // Matter
_ = d => home.item("s10/chem", d);
_({page: "whmis", icon: "testtube.webp", title: "WHMIS & Lab Safety", data: {s: "2026.8.31", a: "2026.9.1"}});
_({page: "expDes", icon: "testtube.webp", title: "Experiment Design", data: {cal: "2026.9.2", s: "2026.9.1", a: "2026.9.3"}});
}
