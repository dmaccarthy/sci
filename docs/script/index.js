function process_loadData(feed) {
    let data = Object.assign({up: "home"}, loadFeed.index[feed]);
    if (data.title) {
        if (data.title.charAt(0) == "@") data.title = data.title.substring(1);
        if (data.num) data.title = `${data.num} — ${data.title}`;
    }
    return Object.assign(data, loadFeed.data);
}

function make_cal(crs) {
    let cal = [];
    for (let feed in loadFeed.index) {
        let feedArray = feed.split("/")
        if (feedArray[0] == crs) {
            let data = loadFeed.index[feed];
            if (data.title && data.showDate && data.showDate.split(".").length > 2) {
                let attr = feedArray[feedArray.length - 1] == "@" ? {} : {"data-feed": feed.split("#")[0]};
                if (data.attr) attr = Object.assign(attr, data.attr);
                cal.push([data.showDate, data.title, attr, data.css]);
            }
        }
    }
    return cal.toSorted((a, b) => {
        f = (x) => {
            x = x.split(".");
            if (x.length > 1) x[1] = parseInt(x[1]) - 1;
            return new Date(...x);
        }
        [a, b] = [f(a[0]), f(b[0])];
        return a > b ? 1 : (a < b ? -1 : 0);
    });
}

loadFeed.index = {
    "p20/home": {title: "@Physics 20"},
    "p20/skill/expDes": {title: "@Experiment Design", num: "0.1", showDate: "2025.8.28", answerDate: "2025.8.29"},
    "p20/skill/expDes#": {title: "Lab: Self-Designed Experiment", showDate: "2025.8.29"},
    "p20/skill/scatter": {title: "@Scatter Plots & Slope", num: "0.2", showDate: "2025.9.2", answerDate: "2025.9.3"},
    "p20/skill/algebra": {title: "@Algebra", num: "0.3", showDate: "2025.9.3", answerDate: "2025.9.4"},
    "p20/skill/sciNot": {title: "@Significant Digits & Scientific Notation", num: "0.4", showDate: "2025.9.4", answerDate: "2025.9.5"},
    "p20/skill/si": {title: "@SI Units", num: "0.5", showDate: "2025.9.5", answerDate: "2025.9.8"},
    "p20/skill/eqn": {title: "@Linear Relations", num: "0.6", showDate: "2025.9.8", answerDate: "2025.9.9"},

    "p20/kin/displ": {title: "@Position & Displacement", num: "1.1", showDate: "2025.9.9", answerDate: "2025.9.10"},
    "p20/kin/displ#": {title: "Lab: Motion of a Rolling Ball", showDate: "2025.9.10"},
    "p20/kin/vel": {title: "@Velocity & Speed", num: "1.2", showDate: "2025.9.11", answerDate: "2025.9.12"},
    "p20/kin/graph": {title: "@Motion Graphs", num: "1.3", showDate: "2025.9.12", answerDate: "2025.9.15"},
    "p20/kin/acc": {title: "@Acceleration", num: "1.4", showDate: "2025.9.15", answerDate: "2025.9.16"},
    "p20/kin/acc#": {title: "Lab: Motion of a Bouncing Ball", showDate: "2025.9.16"},
    "p20/kin/uam": {title: "@Uniform Accelerated Motion", num: "1.5", showDate: "2025.9.17", answerDate: "2025.9.18.11"},
    "p20/kin/uam#": {title: "@Uniform Accelerated Motion <i>(continued)</i>", showDate: "2025.9.18"},
    "p20/q1/@": {title: "Quiz: One-Dimensional Motion", showDate: "2025.9.19", css: {"font-weight": "bold"}},

    "p20/vec2d/trig": {title: "@Trigonometry Review", num: "2.1", showDate: "2025.9.22", answerDate: "2025.9.23"},
    "p20/vec2d/mag": {title: "@Magnitude & Direction", num: "2.2", showDate: "2025.9.23", answerDate: "2025.9.24"},
    "p20/vec2d/diag": {title: "@Vector Diagrams", num: "2.3", showDate: "2025.9.24", answerDate: "2025.9.25"},
    "p20/vec2d/polar": {title: "@Polar & Cartesian Form", num: "2.4", showDate: "2025.9.25", answerDate: "2025.9.26"},
    "p20/vec2d/arith": {title: "@Vector Arithmetic", num: "2.5", showDate: "2025.9.26", answerDate: "2025.9.29"},
    "p20/vec2d/proj": {title: "@Projectile Motion", num: "2.6", showDate: "2025.9.29", answerDate: "2025.10.2"},
    "p20/vec2d/proj#": {title: "@Projectile Motion <i>(continued)</i>", showDate: "2025.10.2"},
    "p20/kin/proj#": {title: "Simulation: Cannonball!", showDate: "2027"},
    "p20/vec2d/rev": {title: "@2D Motion Review", showDate: "2025.10.29", answerDate: "2025.10.30"},
    "p20/q2/@": {title: "Quiz: Two-Dimensional Motion", showDate: "2025.10.31", css: {"font-weight": "bold"}},
    "p20/uA/@": {title: "Unit A Exam", showDate: "2025.11.4", css: {"font-weight": "bold"}},

    "p20/dyn/n2": {title: "@Force & Inertia", num: "3.1", showDate: "2025.10.30", answerDate: "2025.10.31"},
    "p20/dyn/n3": {title: "@Newton’s 3<sup>rd</sup> Law", num: "3.2", showDate: "2025.11.3", answerDate: "2025.11.5"},
    "p20/dyn/weight": {title: "@Mass & Weight", num: "3.3", showDate: "2025.11.5", answerDate: "2025.11.6"},
    "p20/dyn/fric": {title: "@Contact Forces", num: "3.4", showDate: "2025.11.6", answerDate: "2025.11.6.19"},
    "p20/dyn/fric#": {title: "Lab: Friction", showDate: "2025.11.17"},
    "p20/dyn/adv": {title: "@Dynamics in 2D", num: "3.5", showDate: "2025.11.7", answerDate: "2025.11.18.11"},
    "p20/dyn/adv#": {title: "@Dynamics in 2D <i>(continued)</i>", showDate: "2025.11.18"},
    "p20/q3/@": {title: "Quiz: Newton’s Laws", showDate: "2025.11.19", css: {"font-weight": "bold"}},

    // "p20/da/regr": {title: "@Regression Analysis", num: "4.1", showDate: "2025.11.20", answerDate: "2025.11.21"},
    // "p20/da/pwr": {title: "@Transforming Power Data", num: "4.2", showDate: "2025.11.21", answerDate: "2025.11.24"},
    // "p20/grav/ugrav": {title: "@Universal Gravitation", num: "4.3", showDate: "2025.11.24", answerDate: "2025.11.25"},
    "p20/grav/cav": {title: "@Cavendish Experiment", num: "4.4", showDate: "2027"},
    "p20/grav/field": {title: "@Gravitational Fields", num: "4.5", showDate: "2027"},
    "p20/grav/field#1": {title: "Activity: Visualizing Gravity", showDate: "2027"},
    "p20/grav/field#2": {title: "Activity: Visualizing Gravity <i>(continued)</i>", showDate: "2027"},
    "p20/grav/orbit": {title: "@Circular Orbital Motion", num: "4.6", showDate: "2027"},
    "p20/q4/@": {title: "Quiz: Universal Gravitation", showDate: "2025.11.27", css: {"font-weight": "bold"}},
    "p20/uB/@": {title: "Unit B Exam", showDate: "2025.12.1", css: {"font-weight": "bold"}},

    // "p20/uC/@": {title: "Unit C Exam", showDate: "2026.1.7", css: {"font-weight": "bold"}},
    // "p20/uD/@": {title: "Unit D Exam", showDate: "2026.1.27", css: {"font-weight": "bold"}},

    "p20/galaxy/@": {title: "Galaxyland", showDate: "2027", attr: {href: "https://drive.google.com/file/d/1DfO81FZvQzby3lBU9qp39PLeIkiXuBwd/view?usp=drive_link", target: "Galaxy"}},

// ["2025.9.28", "@Mechanical Energy", {"data-feed": "p20/energy/mech"}],
// ["2025.3.3", "@Energy Conservation", {"data-feed": "p20/energy/cons"}],
// ["2025.3.4", "@Non-Isolated Systems", {"data-feed": "p20/energy/sys"}],
// ["2025.3.5", "Lab: Energy Transformations on a Ramp", {"data-feed": "p20/energy/sys"}],
// ["2025.3.6", "@Energy Transformations (Work)", {"data-feed": "p20/energy/work"}],
// ["2025.3.10", "@Work-Energy Theorem", {"data-feed": "p20/energy/we"}],
// ["2025.3.11", "@Power & Efficency", {"data-feed": "p20/energy/power"}],
// ["2025.3.13", "Quiz: Energy & Work", 0, {"font-weight": "bold"}],
// ["2025.4.2", "@Regression Analysis", {"data-feed": "p20/da/regr"}],
// ["2025.4.3", "@Transforming Power Data", {"data-feed": "p20/da/pwr"}],
// ["2025.4.4", "@Equilibrium & Oscillations", {"data-feed": "p20/shm/eqm"}],
// ["2025.4.8", "@Simple Harmonic Motion", {"data-feed": "p20/shm/shm"}],
// ["2025.4.9", "@Period of SHM", {"data-feed": "p20/shm/T"}],
// ["2025.4.10", "Lab: Mass on a Spring", {"data-feed": "p20/shm/T"}],
// ["2025.4.11", "@Simple Pendulum", {"data-feed": "p20/shm/pend"}],
// ["2025.4.14", "@Energy of SHM", {"data-feed": "p20/shm/E"}],
// ["2025.4.15", "Lab: Period of a Simple Pendulum", {"data-feed": "p20/shm/pend"}],
// ["2025.4.16", "@Mechanical Resonance", {"data-feed": "p20/shm/res"}],
// ["2025.4.17", "Quiz: Simple Harmonic Motion", 0, {"font-weight": "bold"}],
// ["2025.4.22", "@Harmonic Waves", {"data-feed": "p20/wave/harm"}],
// ["2025.4.23", "@Doppler Effect", {"data-feed": "p20/wave/dopp"}],
// ["2025.4.24", "@Interference and Beats", {"data-feed": "p20/wave/beat"}],
// ["2025.4.25", "@Standing Waves", {"data-feed": "p20/wave/stand"}],
// ["2025.4.28", "Lab: Air Column Resoance", {"data-feed": "p20/wave/stand"}],
// ["2025.4.29", "Quiz: Mechanical Waves", 0, {"font-weight": "bold"}],
// ["2025.4.30", "@Uniform Circular Motion", {"data-feed": "p20/circ/ucm"}],
// ["2025.5.1", "@Centripetal Acceleration", {"data-feed": "p20/circ/ac"}],
// ["2025.5.5", "Lab: Uniform Circular Motion", {"data-feed": "p20/circ/ac"}],
// ["2025.5.6", "@Apparent Weight", {"data-feed": "p20/circ/appWt"}],
// ["2025.5.7", "Data: Planetary Motion", {"data-feed": "p20/circ/kep"}],
// ["2025.5.8", "@Kepler’s Laws", {"data-feed": "p20/circ/kep"}],
// ["2025.5.12", "Quiz: Uniform Circular Motion", 0, {"font-weight": "bold"}],
// ["2025.5.27", "Quiz: Universal Gravitation", 0, {"font-weight": "bold"}],
// ["2025.6.5", "Review: Newton’s Laws & Gravitation", {"data-feed": "p20/dyn/rev"}],
// ["2025.6.12", "Review: Energy & Circular Motion", {"data-feed": "p20/energy/rev"}],
// ["2025.6.16", "Review: SHM & Waves", {"data-feed": "p20/shm/rev"}],

    "s10/home": {title: "@Science 10"},

    "s10/chem1/whmis": {title: "@WHMIS / Lab Safety", num: "C01", showDate: "2025.8.28", answerDate: "2025.8.29"},
    "s10/chem1/whmis#": {title: "Lab Safety <i>(continued)</i>", showDate: "2025.8.29"},
    "s10/chem1/expDes": {title: "@Experiment Design", num: "C02", showDate: "2025.9.2", answerDate: "2025.9.3"},
    "s10/chem1/classify": {title: "@Classifying Matter", num: "C03", showDate: "2025.9.3", answerDate: "2025.9.4"},
    "s10/chem1/atomic": {title: "@Atomic Models", num: "C04", showDate: "2025.9.4", answerDate: "2025.9.5"},
    "s10/chem1/atomic#": {title: "Lab: Metals & Non-Metals", showDate: "2025.9.5"},
    "s10/chem1/isotope": {title: "@Isotopes & Ions", num: "C05", showDate: "2025.9.8", answerDate: "2025.9.9"},
    "s10/chem1/bohr": {title: "@Bohr Model (Energy Levels)", num: "C06", showDate: "2025.9.9", answerDate: "2025.9.10"},
    "s10/chem1/dot": {title: "@Periodic Table & Dot Diagrams", num: "C07", showDate: "2025.9.10", answerDate: "2025.9.11"},
    "s10/q1/@": {title: "Quiz: Matter (Chapter 1)", showDate: "2025.9.12", css: {"font-weight": "bold"}},

    "s10/chem2/ionic#": {title: "Lab: Ionic & Molecular Substances", showDate: "2025.9.11"},
    "s10/chem2/ionic": {title: "@Binary Ionic Compounds", num: "C08", showDate: "2025.9.15", answerDate: "2025.9.16"},
    "s10/chem2/molec": {title: "@Molecular Compounds", num: "C09", showDate: "2025.9.16", answerDate: "2025.9.17"},
    "s10/chem2/poly": {title: "@Polyatomic Ionic Compounds / Solubility", num: "C10", showDate: "2025.9.17", answerDate: "2025.9.18"},
    "s10/chem2/acid": {title: "@Acids & Bases", num: "C11", showDate: "2025.9.19", answerDate: "2025.9.22"},
    "s10/chem2/acid#": {title: "Lab: Acids & Bases", showDate: "2025.9.18"},
    "s10/chem2/water": {title: "@Properties of Water", num: "C12", showDate: "2025.9.22", answerDate: "2025.9.23"},
    "s10/q2/@": {title: "Quiz: Compounds (Chapter 2)", showDate: "2025.9.23", css: {"font-weight": "bold"}},

    "s10/chem3/rxn": {title: "@Chemical Reactions / Conservation Laws", num: "C13", showDate: "2025.9.22", answerDate: "2025.9.23"},
    "s10/chem2/rxn#": {title: "Lab: Evidence of Chemical Reactions", showDate: "2025.9.25"},
    "s10/chem3/rxn_fd": {title: "@Formation & Decomposition", num: "C14", showDate: "2025.9.26", answerDate: "2025.9.29"},
    "s10/chem3/rxn_c": {title: "@Combustion", num: "C15", showDate: "2025.9.29", answerDate: "2025.10.1"},
    "s10/chem3/rxn_sr": {title: "@Single Replacement", num: "C16", showDate: "2025.10.1", answerDate: "2025.10.2"},
    "s10/chem3/rxn_dr": {title: "@Double Replacement", num: "C17", showDate: "2025.10.2", answerDate: "2025.10.3"},
    "s10/chem3/scinot": {title: "@Scientific Notation", num: "C18", showDate: "2025.10.29", answerDate: "2025.10.30"},
    "s10/chem3/mole": {title: "@Molar Mass", num: "C19", showDate: "2025.10.30", answerDate: "2025.10.31"},
    "s10/q3/@": {title: "Quiz: Reactions (Chapter 3)", showDate: "2025.10.31", css: {"font-weight": "bold"}},
    "s10/unitA#": {title: "Project: Antacids", showDate: "2026"},
    "s10/uA/@": {title: "Chemistry Unit Exam", showDate: "2025.11.4", css: {"font-weight": "bold"}},

    "s10/phys1/si": {title: "@SI Units", num: "P01", showDate: "2025.11.3", answerDate: "2025.11.5"},
    "s10/phys1/graph": {title: "@Graphing Data", num: "P02", showDate: "2025.11.5", answerDate: "2025.11.6"},
    "s10/phys1/displ": {title: "@Position & Displacement", num: "P03", showDate: "2025.11.6", answerDate: "2025.11.7"},
    "s10/phys1/displ#": {title: "Lab: Motion of a Cart", showDate: "2025.11.7"},
    "s10/phys1/vel": {title: "@Velocity & Speed", num: "P04", showDate: "2025.11.17", answerDate: "2025.11.18"},

    "s10/qp1/@": {title: "Quiz: Motion", showDate: "2025.11.24", css: {"font-weight": "bold"}},

    "s10/qp2/@": {title: "Quiz: Energy / Heat", showDate: "2025.12.5", css: {"font-weight": "bold"}},
    "s10/uB/@": {title: "Physics Unit Exam", showDate: "2025.12.9", css: {"font-weight": "bold"}},

};
