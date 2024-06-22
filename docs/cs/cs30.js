let cs30 = {title:"Computing Science 30", id:"cs30", menu:[
    {title:"Iterative Algorithms", id:"iter", icon:"python", menu:[
        {title:"Linear Search", id:"search"},
        {title:"Binary Search", id:"bsearch"},
        {title:"Bubble Sort", id:"bubble"},
        {title:"Insertion Sort", id:"insert"},
        {title:"Selection Sort", id:"sel"},
        {title:"Merging Sorted Data", id:"merge"},
    ]},
    {title:"Object-Oriented Programming 1", id:"oop1", menu:[
        {title:"Objects", id:"obj"},
        {title:"Modifiers & Accessors", id:"get"},
        {title:"Special Methods", id:"spec"},
        {title:"Inheritance", id:"inher"},
    ]},
    {title:"Recursive Algorithms", id:"rec", menu:[
        {title:"Recursion", id:"recurs"},
        {title:"Sorting Algorithms", id:"rsort"},
        {title:"Recursion Issues", id:"issue"},
    ]},
    {title:"Dynamic Data Structures", id:"dds", menu:[
        {title:"Linked Lists", id:"llist"},
        {title:"Modifying Linked Lists", id:"mod"},
        {title:"Searching & Sorting", id:"lsort"},
    ]},
    {title:"Java Programming Project", icon:"https://www.svgrepo.com/show/184143/java.svg", id:"java"},
]};

let html30 = `<p>Students are expected to complete a total of five credits during the semester. Complete any prerequisite courses under <a href="/#cs_new/cs20">CS 20</a> before starting the courses below.</p>`;
html30 += `<p>Assignments must be completed in <a href="https://replit.com" target="replit">replit</a> or <a href="https://docs.google.com" target="GDocs">Google Docs</a> to establish a ‘History’ of your work.
    Work that is pasted or retyped from another location, or authored by an AI tool, will not be awarded credit!</p>`;

layout.cs30 = [{icons:[
        {icon:"gdrv", text:"Course Outline", url:"1TDh_NJbMUvriH_ZDOKALExd2CwabhNXt"},
        {icon:"today", text:"Brightspace", url:"https://eips.brightspace.com/d2l/home/118370"},
        {text:"replit Project", url:"https://replit.com/@DavidMacCarthy/CS30"},
        // {text:"Progress Update", url:pu_form},
    ]},
    {html:html30}, 0, 1];

// Object-Oriented Programming 1

layout.obj = [{ajax:"oop1/obj.html"}, 1];
layout.get = [{ajax:"oop1/mod.html"}, 1];
layout.spec = [{ajax:"oop1/spec.html"}, 1];
layout.inher = [{ajax:"oop1/inher.html"}, 1];

// Java Project

layout.java = [{icons:[
    // {text:"replit Project", url:"https://replit.com/@DavidMacCarthy/Java"},
    // {text:"Java Tutorial", url:"https://www.w3schools.com/java/default.asp"},
    // {icon:"gdoc", text:"Project Template", url:"1CSfKQJl9mXdgKSIg_NzxjhCDC_w2x7Dq"},
]}, {ajax:"java.htm"}];

// Dynamic Data Structures

layout.llist = [{ajax:"dds1/linkedList.html"}, 1];
layout.mod = [{ajax:"dds1/mod.html"}, 1];
layout.lsort = [{ajax:"dds1/sort.html"}, 1];

// Recursive

layout.recurs = [{ajax:"rec/rec.html"}, 1];
layout.rsort = [{ajax:"rec/sort.html"}, 1];
layout.issue = [{ajax:"rec/issue.html"}, 1];

// Iterative

layout.search = [{ajax:"iter/search.html"}, 1];
layout.bsearch = [{ajax:"iter/bsearch.html"}, 1];
layout.bubble = [{vid:"P00xJgWzz2c"}, {ajax:"iter/bubble.html"}, 1];
layout.insert = [{vid:"c4BRHC7kTaQ"}, {ajax:"iter/insert.html"}, 1];
layout.sel = [{vid:"6nDMgr0-Yyo"}, {ajax:"iter/sel.html"}, 1];
layout.merge = [{ajax:"iter/merge.html"}, 1];

//{vid:"6nDMgr0-Yyo"}, 