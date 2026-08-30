page.cal.p30 = [ // Calendar items
    ["2027.2.1", "Classes Begin"],
    ["2027.2.28", "Momentum Exam [Tentative]", {class: "Bold"}],
    ["2027.6.17", "Exam Week Begins"],
];

{ // Chapters
home.item("home", {page: "p30", icon: "rocket", title: "Physics 30", data: {cal: false}});
_ = d => home.item("p30", d);
_({page: "mom", icon: "train", title: "Momentum & Impulse", data: {cal: false}});
_({page: "", icon: "_", title: "Electric Fields", data: {cal: false}});
_({page: "", icon: "magnet", title: "Magnetic Fields", data: {cal: false}});
_({page: "", icon: "lightbulb", title: "Electromagnetic Waves", data: {cal: false}});
_({page: "", icon: "_", title: "Optics", data: {cal: false}});
_({page: "", icon: "xray", title: "Photons", data: {cal: false}});
_({page: "", icon: "atom", title: "Atomic Physics", data: {cal: false}});
_({page: "", icon: "nuke.webp", title: "Nuclear & Particle Physics", data: {cal: false}});
}

{ // Momentum
_ = d => home.item("p30/mom", d);
_({page: "energy", icon: "", title: "Work & Energy Review", data: {s: "2027.2.1", a: "2027.2.2"}});
_({page: "mom", icon: "", title: "Momentum", data: {s: "2027.2.2", a: "2027.2.3"}});
_({page: "impulse", icon: "", title: "Impulse", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "cons", icon: "", title: "Momentum Conservation", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "coll1d", icon: "", title: "1D Collisions", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "vec2d", icon: "", title: "2D Vectors Review", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "coll2d", icon: "", title: "2D Collisions", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "rev", icon: "", title: "Chapter Review", data: {s: "9999.1.1", a: "9999.1.1"}});
}
