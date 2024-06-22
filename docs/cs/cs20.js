let cs20 = {title:"Computing Science 20", id:"cs20", menu:[
    {title:"Procedural Programming 1", id:"pp1", menu:[
        {title:"Functions", id:"def"},
        {title:"Variable Scope", id:"scope"},
        {title:"Top-Down Design", id:"top"},
        {title:"Pre- & Post-Conditions", id:"pre"},
        {title:"Exception Handling", id:"try"},
        // {title:"Mini-Project #1", show:"2024.7", id:"mp21"},
    ]},
    {title:"Data Structures", id:"ds", menu:[
        {title:"Tuples & Lists", id:"tuple"},
        {title:"Iteration", id:"iteration"},
        {title:"Dictionaries & Sets", id:"dict"},
        {title:"Positional & Keyword Arguments", id:"kwargs"},
        // {title:"Mini-Project #2", show:"2024.7", id:"mp22"},
        {title:"List Comprehensions", id:"list_comp"},
        {title:"Generator Functions", id:"gen"},
        {title:"Arrays", id:"array"},
        // {title:"Mini-Project #3", show:"2024.7", id:"mp23"},
    ]},
    {title:"Game Programming Project", id:"game", icon:"sc8pr.svg", menu:[
        {title:"Sketches & Sprites", id:"s8"},
        {title:"Customizing the Animation", id:"s8custom"},
        {title:"Text in Animations", id:"s8text"},
        {title:"Keyboard Events", id:"s8key"},
        {title:"Mouse Events", id:"s8mouse"},
    ]},
    {title:"Files & File Structures", id:"fs", menu:[
        {title:"File Systems", id:"fsys"},
        {title:"Reading Text Files", id:"fread"},
        {title:"Writing Text Files", id:"fwrite"},
        {title:"Sequential & Direct Access", id:"fseq"},
        {title:"Binary Files", id:"fbin"},
        {title:"File Indexing", id:"findex"},
    ]},
]};

// let html20 = `<p>Students are expected to complete five credits over the semester. This can include <a href="#web">Web Scripting</a> or <a href="#cs30">CS 30</a> credits. <i>Data Structures</i> is a prerequisite for CS 30.</p>`;

layout.cs20 = [{icons:[
    {icon:"link", text:"Web Scripting", url:"../#cs_new/cs20"},
    // {icon:"today", text:"Brightspace", url:"https://eips.brightspace.com/d2l/home/"},
    // {icon:"check_box", text:"Assessments", url:"assess/cs20.html"},
    // {text:"Progress Update", url:pu_form},
]}, 0, 1]; // {html:html20}

// Procedural Programming 1

layout.pp1 = [{icons:[
    {text:"replit Project", url:"https://replit.com/@DavidMacCarthy/CS20"},
]}, 0];

layout.def = [{ajax:"pp/func.html"}, 1];
layout.scope = [{ajax:"pp/scope.html"}, 1];
layout.top = [{ajax:"pp/top.html"}, 1];
layout.pre = [{ajax:"pp/pre.html"}, 1];
layout.try = [{ajax:"pp/except.html"}, 1];

// Game Programming Prject

layout.game = [{icons:[
    {text:"replit Project", url:"https://replit.com/@DavidMacCarthy/Game2023"},
    {text:"Project Reflection", url:"https://eips.brightspace.com/d2l/le/calendar/63493/event/129589/detailsview#129589"},
]}, 0];

layout.s8 = [{ajax:"game/sketch.html"}, 1];
layout.s8custom = [{ajax:"game/custom.html"}, 1];
layout.s8text = [{ajax:"game/text.html"}, 1];
layout.s8key = [{ajax:"game/key.html"}, 1];
layout.s8mouse = [{ajax:"game/mouse.html"}, 1];

// Data Structures 1

layout.tuple = [{ajax:"ds/list.html"}, 1];
layout.iteration = [{ajax:"ds/iter.html"}, 1];
layout.dict = [{ajax:"ds/dict.html"}, 1];
layout.kwargs = [{ajax:"ds/args.html"}, 1];
layout.list_comp = [{ajax:"ds/comp.html"}, 1];
layout.gen = [{ajax:"ds/gen.html"}, 1];
layout.array = [{ajax:"ds/array.html"}, 1];
// layout.mp21 = [{ajax:"pp/mp1.html"}, 1];
// layout.mp22 = [{ajax:"ds/mp2.html"}, 1];
// layout.mp23 = [{ajax:"ds/mp3.html"}, 1];

// Files & File Systems

layout.fs = [{icons:[
    {text:"replit Project", url:"https://replit.com/@DavidMacCarthy/FileSys"},
]}, 0];

layout.fsys = [{ajax:"fs/fsys.html"}, 1];
layout.fread = [{ajax:"fs/fread.html"}, 1];
layout.fwrite = [{ajax:"fs/fwrite.html"}, 1];
layout.fseq = [{ajax:"fs/fseq.html"}, 1];
layout.fbin = [{ajax:"fs/fbin.html"}, 1];
layout.findex = [{ajax:"fs/findex.html"}, 1];
