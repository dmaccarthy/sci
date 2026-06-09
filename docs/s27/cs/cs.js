// Calendar items

page.cal.cs10 = [
    ["2029.8.31", "First Day for Students"],
    // ["2029.8.31", "Sal", {f: "https://salcomp.ca", class: "Sal", attr: {target: "Sal"}}],
];

page.cal.cs20 = [
    ["2029.8.31", "First Day for Students"],
];

page.cal.cs30 = [
    ["2029.8.31", "First Day for Students"],
];

// Courses...
home.item("home", {page: "cs", title: "Computing Science"});
home.item("cs", {page: "cs10", title: "Computing Science 10"});
home.item("cs", {page: "cs20", title: "Computing Science 20"});
home.item("cs", {page: "cs30", title: "Computing Science 30"});

// CS 10...
_ = d => home.item("cs/cs10", d);
_({page: "sp", title: "Structured Programming"});
_({page: "web", title: "Client-Side Scripting"});
_({page: "ct1", title: "Computing Science 1"});

// SP1
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

// SP2
_({page: "bool", title: "Boolean Values & Operators"});
_({page: "if", title: "Conditional Statements"});
_({page: "while", title: "Loops"});
_({page: "flag", title: "Flags & Counters"});
_({page: "iter", title: "Iteration & Searching"});
_({page: "format", title: "Formatted Output"});
_({page: "accum", title: "Accumulation"});
_({page: "str", title: "String Methods"});

// Web1
_ = d => home.item("cs/cs10/web", d);
_({page: "www", title: "World Wide Web"});
_({page: "tree", title: "Data Trees"});
_({page: "xml", title: "eXtensible Markup Language (XML)"});
_({page: "text", title: "Text & Comment Nodes"});
_({page: "entity", title: "Entities"});
_({page: "html", title: "Hypertext Markup Language (HTML)"});
_({page: "char", title: "Character Formatting"});
_({page: "img", title: "Images"});
_({page: "vid", title: "Video"});
_({page: "list", title: "Lists"});
_({page: "table", title: "Tables"});

// Web2
_({page: "form", title: "HTML5 Forms"});
_({page: "css", title: "Stylesheets (CSS)"});
_({page: "ext", title: "External Stylesheets"});
_({page: "div", title: "Document Divisions"});
_({page: "js", title: "JavaScript"});

// CT1
_ = d => home.item("cs/cs10/ct1", d);
_({page: "bin", title: "Binary Encoding"});
_({page: "hex", title: "Hexadecimal & Floating Point"});
_({page: "text", title: "ASCII & Unicode"});
_({page: "vonN", title: "Von Neumann Architecture"});
_({page: "cs", title: "Topics in Computing Science"});
_({page: "algo", title: "Algorithms"});

// CS 20...
_ = d => home.item("cs/cs20", d);
_({page: "pp", title: "Procedural Programming"});
_({page: "ds", title: "Data Structures"});
_({page: "game", title: "Game Project"});
_({page: "robo", title: "Robotics Programming"});
_({page: "fs", title: "Files & File Structures"});

// CS 30...
_ = d => home.item("cs/cs30", d);
_({page: "iter", title: "Iterative Algorithms"});
_({page: "oop", title: "Object-Oriented Programming"});
_({page: "rec", title: "Recursive Algorithms"});
_({page: "dds", title: "Dynamics Data Structures"});
// _({page: "", title: ""});
