page.cal.s10 = [ // Calendar items
    ["2026.9.1", "Lab Safety (<i>continued</i>)", {attr: {"data-feed": "s10/chem/whmis"}}],
    ["2026.9.9", "Lab: Metals & Non-Metals", {attr: {"data-feed": "s10/chem/dot@post=handouts"}}],
    ["2026.9.15", "Quiz: Matter [Tentative]", {attr: {class: "Bold"}}],
    ["2027.1.28", "Final Exam [Tentative]", {attr: {class: "Bold"}}],
];

{ // Chapters
home.item("home", {page: "s10", icon: "microscope", title: "Science 10", data: {cal: false}});
_ = d => home.item("s10", d);
_({page: "chem", icon: "testtube.webp", title: "Chemistry", data: {cal: false}});
_({page: "phys", icon: "soccer", title: "Physics", data: {cal: false}});
_({page: "bio", icon: "microscope", title: "Biology", data: {cal: false}});
_({page: "clim", icon: "earth", title: "Climate", data: {cal: false}});
}

{ // Matter
home.item("s10/chem", {page: "chem1", icon: "atom", title: "Part 1: Matter"});
_ = d => home.item("s10/chem/chem1", d);
_({page: "whmis", title: "WHMIS & Lab Safety", data: {s: "2026.8.31", a: "2026.9.1"}});
_({page: "expDes", title: "Experiment Design", data: {cal: "2026.9.2", s: "2026.9.1", a: "2026.9.3"}});
_({page: "classify", title: "Classifying Matter", data: {s: "2026.9.4", a: "2026.9.5"}});
_({page: "atomic", title: "Atomic Models", data: {s: "2026.9.4", a: "2026.9.8"}});
_({page: "isotope", title: "Isotopes & Ions", data: {s: "2026.9.8", a: "2026.9.10"}});
_({page: "bohr", title: "Bohr Model (Energy Levels)", data: {s: "2026.9.10", a: "2026.9.11"}});
_({page: "dot", title: "Periodic Table & Dot Diagrams", data: {s: "2026.9.11", a: "2026.9.14"}});
}

{ // Compounds
home.item("s10/chem", {page: "chem2", icon: "salt", title: "Part 2: Compounds"});
_ = d => home.item("s10/chem/chem2", d);
_({page: "a", title: "a", data: {s: "2026.9.", a: "2026.9."}});
}

{ // Reactions
home.item("s10/chem", {page: "chem3", icon: "testtube.webp", title: "Part 3: Reactions"});
_ = d => home.item("s10/chem/chem3", d);
_({page: "b", title: "", data: {s: "2026.9.", a: "2026.9."}});
}
