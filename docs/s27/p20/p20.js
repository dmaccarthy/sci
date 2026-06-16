page.cal.p20 = [ // Calendar items
    ["2026.8.31", "Classes Begin"],
    ["2026.9.10", "Kinematics Quiz", {class: "Bold"}],
    ["2027.1.20", "Exam Week Begins"],
];

{ // Chapters
home.item("home", {page: "p20", icon: "rocket", title: "Physics 20", data: {cal: false}});
_ = d => home.item("p20", d);
_({page: "skill", icon: "graph", title: "Math & Science 10 Review", data: {cal: false}});
_({page: "kin", icon: "train", title: "One-Dimensional Motion", data: {cal: false}});
// _({page: "vec2d", icon: "soccer", title: "Two-Dimensional Motion", data: {cal: false}});
// _({page: "dyn", icon: "rocket", title: "Newton’s Laws", data: {cal: false}});
// _({page: "grav", icon: "earth", title: "Gravitation", data: {cal: false}});
// _({page: "energy", icon: "archer.webp", title: "Energy & Work", data: {cal: false}});
_({page: "circ", icon: "midway", title: "Circular & Planetary Motion", data: {cal: false}});
// _({page: "shm", icon: "crane", title: "Simple Harmonic Motion", data: {cal: false}});
// _({page: "wave", icon: "speaker", title: "Mechanical Waves, data: {cal: false}"});
// _({page: "rev", icon:"review", icon: "rocket", title: "Course Review", data: {cal: false}});
}

{ // Review
_ = d => home.item("p20/skill", d);
_({page: "expDes", icon: "testtube.webp", title: "Experiment Design", data: {s: "2026.8.31", a: "2026.9.1"}});
_({page: "scatter", icon: "graph", title: "Scatter Plots", data: {s: "2026.9.1", a: "2026.9.2"}});
_({page: "algebra", title: "Algebra"});
_({page: "sciNot", title: "Significant Digits & Scientific Notation"});
_({page: "si", title: "SI Units"});
_({page: "rev", icon:"review", icon:"review", title: "Chapter Review", data: {cal: false}});
}

{ // Kin
_ = d => home.item("p20/kin", d);
_({page: "displ", title: "Position & Displacement"});
_({page: "vel", title: "Velocity & Speed"});
_({page: "graph", title: "Motion Graphs"});
_({page: "acc", title: "Acceleration"});
_({page: "uam", title: "Uniform Accelerated Motion"});
_({page: "rev", icon:"review", title: "Chapter Review", data: {cal: false}});
}

{ // Vec2d
_ = d => home.item("p20/vec2d", d);
_({page: "trig", title: ""});
_({page: "mag", title: ""});
_({page: "diag", title: ""});
_({page: "polar", title: ""});
_({page: "arith", title: ""});
_({page: "proj", title: ""});
_({page: "rev", icon:"review", title: "Chapter Review", data: {cal: false}});
}

{ // Dyn
_ = d => home.item("p20/dyn", d);
_({page: "n2", title: "Force & Inertia"});
_({page: "n3", title: "Newton’s 3<sup>rd</sup> Law"});
_({page: "weight", title: "Mass & Weight"});
_({page: "fric", title: "Contact Forces"});
_({page: "adv", title: "Dynamics in 2D"});
_({page: "rev", icon:"review", title: "Chapter Review", data: {cal: false}});
}

{ // Grav
_ = d => home.item("p20/grav", d);
_({page: "regr", title: ""});
_({page: "pwr", title: ""});
_({page: "ugrav", title: ""});
_({page: "cav", title: ""});
_({page: "field", title: ""});
_({page: "rev", icon:"review", title: "Chapter Review"});
_({page: "da", title: "Data Analysis Review"});
}

{ // Energy
_ = d => home.item("p20/energy", d);
_({page: "mech", title: ""});
_({page: "cons", title: ""});
_({page: "sys", title: ""});
_({page: "work", title: ""});
_({page: "we", title: ""});
_({page: "work2d", title: ""});
_({page: "power", title: ""});
_({page: "rev", icon:"review", title: "Chapter Review"});
}

{ // Circ
_ = d => home.item("p20/circ", d);
_({page: "ucm", title: "Uniform Circular Motion"});
_({page: "ac", title: "Centripetal Acceleration"});
_({page: "appWt", title: "Apparent Weight"});
_({page: "kep", title: "Planetary Motion (Kepler’s Laws)", data: {s: "9999.1.1", a: "9999.1.1"}});
_({page: "orbit", title: "Circular Orbital Motion"});
_({page: "rev", icon:"review", title: "Chapter Review", data: {cal: false}});
}

{// SHM
_ = d => home.item("p20/shm", d);
_({page: "eqm", title: "Equilibrium & Oscillations"});
_({page: "shm", title: "Simple Harmonic Motion"});
_({page: "T", title: "Period of SHM"});
_({page: "pend", title: "Simple Pendulum"});
_({page: "E", title: "Energy of SHM"});
_({page: "res", title: "Mechanical & Acoustic Resonance"});
_({page: "rev", icon:"review", title: "Chapter Review"});
}

{ // Waves
_ = d => home.item("p20/wave", d);
_({page: "harm", title: "Harmonic Waves"});
_({page: "dopp", title: "Doppler Effect"});
_({page: "beat", title: "Interference & Beats"});
_({page: "stand", title: "Standing Waves"});
_({page: "rev", icon:"review", title: "Chapter Review"});
}
