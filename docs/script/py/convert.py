"Convert 2023-format lesson notes to feed-format (KaTeX)"

FILES = (
#     ["expDes.html", "Experiment Design"],
    ["algebra.html", "Algebra"],
    ["eqn.html", "Model Equations (Linear)"],
    ["pwr.html", "Transforming Power Data"],
    ["regr.html", "Regression Analysis"],
    ["si.html", "SI Units"],
    ["sciNot.html", "Scientific Notation"],
#     ["trig.html", "Trigonometry"],
)

tsect = [
    """<section id="Title" class="Center">
<p class="Course"><a href="javascript:goCourse()">Physics 20</a></p>
<p class="Title"></p>
</section>""",
    """<section class="Slide" id="Title" class="Center">
<h1><a href="javascript:goLesson()">{}</a></h1>
</section>"""
]

def conv(fn, title):
    with open(fn, encoding="utf8") as f:
        data = f.read().split("<article>")[1].split("</article>")[0].split("</body>")[0]
        data = data.replace('data-last="?"', 'class="Slide"')
        data = data.replace('data-mark', 'data-cue')
        data = data.replace(tsect[0], tsect[1].format(title))
        data = tex(data)
    fn = fn.split(".")
    fn = f"{fn[0]}_s.htm"
    with open(fn, "x", encoding="utf8") as f:
        print(fn)
        f.write(data.strip())

def tex(data):
    items = data.split("$$")
    data = ""
    i = 0
    while i < len(items):
        if i: data += '<p class="TeX">' if i % 2 else '</p>'
        data += items[i]
        i += 1
    items = data.replace("\)", "</span>").split("\(")
    data = ""
    n = len(items)
    for i in range(n):
        data += items[i]
        if i < n-1: data += '<span class="TeX">'
    n = len(data.split("</p></p>")) - 1
    if n: print(f"{n:5d} cases of '</p></p>' in {fn}")
    return data



for fn in FILES:
    try: conv(*fn)
    except Exception as e: print(e)
    