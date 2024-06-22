"Convert HTML files from MathJax to Temml"

import os

FILES = "p20/kin/rev0.htm", 

def convert(fn):
    with open(fn, encoding="utf8") as f:
        items = f.read().split("$$")
        data = ""
        i = 0
        while i < len(items):
            if i: data += '<p class="display TeX">' if i % 2 else '</p>'
            data += items[i]
            i += 1
        items = data.replace("\)", "</span>").split("\(")
        data = ""
        n = len(items)
        for i in range(n):
            data += items[i]
            if i < n-1: data += '<span class="TeX">'
    os.rename(fn, fn + ".bak")
    with open(fn, "w", encoding="utf8") as f:
        f.write(data)
        n = len(data.split("</p></p>")) - 1
        if n: print(f"{n:5d} cases of '</p></p>' in {fn}")

for fn in FILES: convert(fn)
