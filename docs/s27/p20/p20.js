// Calendar items

page.cal.p20 = [
    ["2026.9.10", "Kinematics Quiz", {class: "Bold"}],
    // ["2026.9.20", "2D Motion Quiz", {class: "Bold"}],
    // ["2026.9.30", "Unit A Exam", {class: "Bold"}],
    // ["2027.1.19", "Final Exam", {class: "Bold"}],
    // ["2029.8.31", "Sal", {f: "https://salcomp.ca", class: "Sal", attr: {target: "Sal"}}],
    ["10000.1.1", "New Year’s Day, 10000 CE", {class: "Bold"}],
];

// Chapter links

home.item("home", {page: "p20", title: "Physics 20"});
_ = d => home.item("p20", d);
_({page: "skill", title: "Math & Science 10 Review"});
_({page: "kin", title: "One-Dimensional Motion"});
_({page: "vec2d", title: "Two-Dimensional Motion"});
_({page: "dyn", title: "Newton’s Laws"});
_({page: "grav", title: "Gravitation"});
_({page: "energy", title: "Energy & Work"});
_({page: "circ", title: "Circular & Planetary Motion"});
_({page: "shm", title: "Simple Harmonic Motion"});
_({page: "wave", title: "Mechanical Waves"});
_({page: "rev", title: "Course Review"});

// Lesson links by chapter

_ = d => home.item("p20/skill", d);
_({page: "expDes", title: "Experiment Design", data: {s: "2026.8.31", a: "2026.9.1"}});
_({page: "scatter", title: "Scatter Plots", data: {s: "2026.9.1", a: "2026.9.2"}});
_({page: "algebra", title: "Algebra", data: {s: "92026.9.2"}});
_({page: "sciNot", title: "Significant Digits & Scientific Notation"});
_({page: "si", title: "SI Units"});

_ = d => home.item("p20/kin", d);
_({page: "displ", title: "Position & Displacement"});

_ = d => home.item("p20/circ", d);
_({page: "kep", title: "Planetary Motion (Kepler’s Laws)"});
