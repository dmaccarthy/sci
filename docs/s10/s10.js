page.cal.s10 = [ // Calendar items
    ["2026.9.1", "Lab Safety (<i>continued</i>)", {attr: {"data-feed": "s10/chem/chem1/whmis@post=group"}}],
    ["2026.9.9", "Lab: Metals & Non-Metals", {attr: {"data-feed": "s10/chem/chem1/dot@post=handouts"}}],
    ["2026.9.15", "Quiz: Matter [Tentative]", {attr: {class: "Bold"}}],
    ["12026.9.17", "Lab: Ionic & Molecular Substances", {attr: {"data-feed": "s10/chem/chem2/ionic@post=handouts"}}],
    ["12026.9.22", "Lab: Acids & Bases", {attr: {"data-feed": "s10/chem/chem2/acid@post=handouts"}}],
    ["12026.9.24", "Quiz: Compounds [Tentative]", {attr: {class: "Bold"}}],
    ["12026.9.25", "Lab: Evidence of Chemical Reactions", {attr: {"data-feed": "s10/chem/chem3/rxn@post=handouts"}}],
    ["12026.10.7", "Project: Antacids (Planning)", {attr: {"data-gdrv": "17KvjCnoFdUihVRdvUVlJNrnUtAyX4N0l"}}],
    ["12026.10.7", "Project: Antacids (Lab)", {attr: {"data-gdrv": "17KvjCnoFdUihVRdvUVlJNrnUtAyX4N0l"}}],
    ["12026.10.9", "Quiz: Reactions [Tentative]", {attr: {class: "Bold"}}],
    ["12026.10.15", "Unit Exam: Chemistry [Tentative]", {attr: {class: "Bold"}}],
    ["2027.1.28", "Final Exam [Tentative]", {attr: {class: "Bold"}}],
];

{ // Units
home.item("home", {page: "s10", icon: "microscope", title: "Science 10", data: {cal: false}});
_ = d => home.item("s10", d);
_({page: "chem", icon: "testtube.webp", title: "Chemistry", data: {cal: false, s: "9999.1.1"}});
_({page: "phys", icon: "soccer", title: "Physics", data: {cal: false, hide: 1}});
_({page: "bio", icon: "microscope", title: "Biology", data: {cal: false, hide: 1}});
_({page: "clim", icon: "earth", title: "Climate", data: {cal: false, hide: 1}});
}

{ // Matter
home.item("s10/chem", {page: "chem1", icon: "atom", title: "Part 1: #Matter", data: {cal: false}});
_ = d => home.item("s10/chem/chem1", d);
_({page: "whmis", title: "WHMIS & Lab Safety", data: {s: "2026.8.27", a: "2026.9.1"}});

/* Reversed order so 'classify' is on a Wednesday */
_({page: "expDes", title: "Experiment Design", data: {s: "2026.9.3", a: "2026.9.4"}});
_({page: "classify", title: "Classifying Matter", data: {s: "2026.9.2", a: "2026.9.3"}});

_({page: "atomic", title: "Atomic Models", data: {s: "2026.9.4", a: "2026.9.8"}});
_({page: "isotope", title: "Isotopes & Ions", data: {s: "2026.9.8", a: "2026.9.10"}});
_({page: "bohr", title: "Bohr Model (Energy Levels)", data: {s: "2026.9.10", a: "2026.9.11"}});
_({page: "dot", title: "Periodic Table & Dot Diagrams", data: {s: "2026.9.11", a: "2026.9.14"}});
}

{ // Compounds
home.item("s10/chem", {page: "chem2", icon: "salt", title: "Part 2: #Compounds", data: {cal: false, s: "9999.1.1"}});
_ = d => home.item("s10/chem/chem2", d);
_({page: "ionic", title: "Binary Ionic Compounds", data: {s: "2026.9.14", a: "2026.9.16"}});
_({page: "molec", title: "Molecular Compounds", data: {s: "12026.9.16", a: "12026.9.18"}});
_({page: "poly", title: "Polyatomic Ions & Solubility", data: {s: "12026.9.18", a: "12026.9.21"}});
_({page: "acid", title: "Acids & Bases", data: {s: "12026.9.21", a: "12026.9.23"}});
_({page: "water", title: "Properties of Water", data: {s: "12026.9.23", a: "12026.9.23 16:00"}});
}

{ // Reactions
home.item("s10/chem", {page: "chem3", icon: "testtube.webp", title: "Part 3: #Reactions", data: {cal: false, s: "9999.1.1"}});
_ = d => home.item("s10/chem/chem3", d);
_({page: "rxn", title: "Chemical Reactions", data: {s: "12026.9.25", a: "12026.9.28"}});
_({page: "rxn_fd", title: "Formation & Decomposition", data: {s: "12026.11.1", a: "12026.11.1"}});
_({page: "rxn_c", title: "Hydrocarbon Combustion", data: {s: "12026.11.1", a: "12026.11.1"}});
_({page: "rxn_sr", title: "Single Replacement", data: {s: "12026.11.1", a: "12026.11.1"}});
_({page: "rxn_dr", title: "Double Replacement", data: {s: "12026.11.1", a: "12026.11.1"}});
_({page: "scinot", title: "Scientific Notation", data: {s: "12026.11.1", a: "12026.11.1"}});
_({page: "mole", title: "Molar Mass", data: {s: "12026.11.1", a: "12026.11.1"}});
}

{ // Motion
home.item("s10/phys", {page: "phys1", icon: "train", title: "Part 1: #Motion", data: {cal: false}});
_ = d => home.item("s10/phys/phys1", d);
_({page: "si", title: "SI Units"});
_({page: "graph", title: "Graphing Data"});
_({page: "displ", title: "Position & Displacement"});
_({page: "vel", title: "Velocity & Speed"});
_({page: "acc", title: "Acceleration"});
}

{ // Energy
home.item("s10/phys", {page: "phys2", title: "Part 2: #Energy", data: {cal: false}});
_ = d => home.item("s10/phys/phys2", d);
_({page: "mech", title: "Mechanical Energy"});
_({page: "work", title: "Energy Transformations"});
_({page: "we", title: "Work-Energy Theorem"});
_({page: "eff", title: "Efficiency"});
_({page: "heat", title: "Theories of Heat"});
}

{ // Cells
home.item("s10/bio", {page: "bio1", title: "Part 1: #Cells", data: {cal: false}});
_ = d => home.item("s10/bio/bio1", d);
_({page: "micro", title: "Microscopes"});
_({page: "cell", title: "Cell Theory"});
_({page: "org", title: "Organelles"});
}

{ // Transport
home.item("s10/bio", {page: "bio2", title: "Part 2: #Membranes & Transport", data: {cal: false}});
_ = d => home.item("s10/bio/bio2", d);
_({page: "memb", title: "Biological Membranes"});
_({page: "pass", title: "Passive Transport"});
_({page: "act", title: "Active Transport"});
}

{ // Plants
home.item("s10/bio", {page: "bio3", title: "Part 3: #Plant Systems", data: {cal: false}});
_ = d => home.item("s10/bio/bio3", d);
_({page: "photo", title: "Photosynthesis & Cellular Respiration"});
_({page: "spec", title: "Cell Specialization"});
_({page: "gas", title: "Gas Exchange"});
_({page: "water", title: "Water Transport"});
_({page: "sys", title: "Plant Control Systems"});
}
