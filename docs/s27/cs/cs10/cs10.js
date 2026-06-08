// Calendar items

page.cal.cs10 = [
    ["2029.8.31", "Sal", {f: "https://salcomp.ca", class: "Sal", attr: {target: "Sal"}}],
];


//

home.item("home", {page: "cs", title: "Computing Science"});

home.item("cs", {page: "cs10", title: "Computing Science 10"});
_ = d => home.item("cs/cs10", d);
_({page: "sp", title: "Structured Programming"});

// Lesson links by module

_ = d => home.item("cs/cs10/sp", d);
_({page: "intro", title: "Intro to Programming"});
_({page: "ide", title: "Integrated Development Environments"});
_({page: "py", title: "Programming in Python"});
_({page: "comment", title: "Comments & Docstrings"});
_({page: "var", title: "Variables"});
_({page: "io", title: "Input & Output"});
_({page: "type", title: "Data Types (Classes)"});
_({page: "mod", title: "Modules & Packages"});
_({page: "oper", title: "Operators"});

_({page: "bool", title: "Boolean Values & Operators"});
_({page: "if", title: "Conditional Statements"});
_({page: "while", title: "Loops"});
_({page: "flag", title: "Flags & Counters"});
_({page: "iter", title: "Iteration & Searching"});
_({page: "format", title: "Formatted Output"});
_({page: "accum", title: "Accumulation"});
_({page: "str", title: "String Methods"});
