let robo = {title:"Robotics Programming 1 & 2", id:"robo", icon:"robot", menu:[
    {title:"Intro to Robotics Programming", id:"rintro"},
    {title:"Turning the Robot", id:"turn"},
    {title:"Functions & Arguments", id:"func"},
    {title:"Colours & Sensors", id:"hsv"},
    {title:"Soccer Challenge", id:"soccer"},
    {title:"Lists", id:"rlist"},        
    {title:"Parking Lot Challenge", id:"park"},        
]};

let cs10 = {title:"Computing Science 10", text:"CS 10", id:"cs10", menu:[
    {title:"Structured Programming 1", id:"sp1", menu:[
        {title:"Intro to Programming", id:"intro"},
        {title:"Integrated Development Environments", id:"ide"},
        {title:"Programming in Python", id:"py"},
        {title:"Comments & Docstrings", id:"comment"},
        {title:"Variables", id:"var"},
        {title:"Input & Output", id:"io"},
        {title:"Data Types (Classes)", id:"type"},
        {title:"Modules & Packages", id:"pkg"},
        {title:"Operators", id:"oper"},
        // {title:"Mini-Project #1", show:"2024.7", id:"mp11"},
    ]},
    {title:"Structured Programming 2", id:"sp2", menu:[
        {title:"Boolean Values & Operators", id:"bool"},
        {title:"Conditional Statements", id:"if"},
        {title:"Loops", id:"loop"},
        {title:"Flags & Counters", id:"flag"},
        // {title:"Mini-Project #2", show:"2024.7", id:"mp12"},
        {title:"Iteration & Searching", id:"iter_srch"},
        {title:"Formatted Output", id:"format"},
        {title:"Accumulation", id:"accum"},
        // {title:"Mini-Project #3", show:"2024.4.25.10", id:"mp13"},
        {title:"String Methods", id:"str"},
        // {title:"Mini-Project #4", show:"2024.7", id:"mp14"},
    ]},
    {title:"Computer Science 1", id:"ct1", icon:"laptop", menu:[
        {title:"Binary Encoding", id:"bin"},
        {title:"Text Encoding", id:"utf"},
        {title:"Von Neumann Architecture", id:"vonN"},
        {title:"Topics in Computing Science", id:"tcs"},
        {title:"Algorithms", id:"algo"},
    ]},
    robo,
]};

layout.cs10 = [{icons:[
    {icon:"today", text:"Brightspace", url:"https://eips.brightspace.com/d2l/home/117712"},
    {icon:"check_box", text:"Assessments", url:"assess/cs10.html"},
    // {text:"Progress Update", url:pu_form},
]}, 0, 1];


// Robotics Programming

layout.robo = [
    {icons:[{text:"replit Project", url:"https://replit.com/@DavidMacCarthy/Robo2023"},]},
    0, 1];

layout.rintro = [{ajax:"robo/intro.html"}, 1];
layout.turn = [{ajax:"robo/turn.html"}, 1];
layout.func = [{ajax:"robo/func.html"}, 1];
layout.hsv = [{ajax:"robo/colour.html"}, 1];
layout.soccer = [{ajax:"robo/soccer.html"}, 1];
layout.rlist = [{ajax:"robo/list.html"}, 1];
layout.park = [{ajax:"robo/park.html"}, 1];

// Computing Science 1

layout.bin = [
    {icons:[
        // {text:"Binary Conversion", url:"ct1/binary.html"},
        {icon:"gdoc", text:"Assignment", url:"1uD73FDAhv1AiH5rVPLIsZn-acMjGY09gNxLbEozjDA4"},
    ]},
    {vid:"#PLpVmtCaB-lykMzpjcg79la6effekhfsJq"}, 1
];

layout.utf = [
    {icons:[
        {icon:"gdoc", text:"Assignment", url:"1wGMBQAUTTSNcbZPeNOf8BO6yVw7p2yHcHxeQ-acCbyM"},
    ]},
    {vid:"MijmeoH9LT4"}, 1
];

layout.vonN = [
    {icons:[
        {icon:"gdoc", text:"Assignment", url:"1dQAlZuVoWrzjZT-19dEB5gvnysCwPRGYu_AkQPQooMg"},
    ]},
    {vid:"HEjPop-aK_w"}, 1
];

layout.tcs = [
    {icons:[
        {icon:"gdoc", text:"Assignment", url:"13cPWZNfIyKYM6DPi_IxaVgUSj0b8II1kCzZVfvLZyOc"},
    ]},
    {html:"Please see the instructions in the assignment document!"}, 1
];

layout.algo = [{ajax:"ct1/algo.html"}, 1];

layout.ct1 = [{html:`For each topic, open the link and save a copy of the document in your Google Docs <code>CS10</code> folder. Watch the lesson video or read the notes, and then answer the questions. After completing all assignments, contact the teacher to schedule the summative assessment.`}, 0, 1];

// Structured Programming 1

layout.sp1 = [{icons:[
    {text:"replit Project", show:"2023.8", url:"https://replit.com/@DavidMacCarthy/CS10"},
]}, 0, 1];

layout.intro = [{ajax:"sp1/intro.html"}, 1];
layout.ide = [{ajax:"sp1/ide.html"}, 1];
layout.py = [{ajax:"sp1/py.html"}, 1];
layout.comment = [{ajax:"sp1/comment.html"}, 1];
layout.var = [{ajax:"sp1/var.html"}, 1];
layout.io = [{ajax:"sp1/io.html"}, 1];
layout.type = [{ajax:"sp1/type.html"}, 1];
layout.pkg = [{ajax:"sp1/pkg.html"}, 1];
layout.oper = [{ajax:"sp1/oper.html"}, 1];

// layout.mp11 = [{ajax:"sp1/mp1.html"}, 1];
// layout.mp12 = [{ajax:"sp2/mp2.html"}, 1];
// layout.mp13 = [{ajax:"sp2/mp3.html"}, 1];
// layout.mp14 = [{ajax:"sp2/mp4.html"}, 1];

// Structured Programming 2

layout.bool = [{ajax:"sp2/bool.html"}, 1];
layout.if = [{ajax:"sp2/if.html"}, 1];
layout.loop = [{ajax:"sp2/loop.html"}, 1];
layout.flag = [{ajax:"sp2/flag.html"}, 1];
layout.iter_srch = [{ajax:"sp2/iter.html"}, 1];
layout.format = [{ajax:"sp2/format.html"}, 1];
layout.accum = [{ajax:"sp2/accum.html"}, 1];
layout.str = [{ajax:"sp2/str.html"}, 1];
