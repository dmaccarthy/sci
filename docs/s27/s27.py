import os

fldr = "p20/circ/"
files = ["ucm", "ac", "appWt", "kep", "orbit"]

def svg_line(line, n):
    line = line.split("=")[1].split(">")[0].split("#")
    line[0] = line[0][:line[0].find(".js")]
    s = f'["#{n}", {line[0]}"'
    for arg in line[1:]:
        s += f', "{arg}"'
    return s[:-1] + "],"

def fix_one_file(src):
    with open("../" + src, encoding="utf8") as inFile:
        data = inFile.read()
    data = data.replace('data-icon="python"', 'data-action="slides"')
    data = data.replace('<h2 class="Collapse">', '<h3>')
    data = data.replace('</h2>', '</h3>')
    data = data.replace('data-icon=', 'data-action=')
    data = data.replace('<ol class="Questions">', '<ol>')

    svg2 = []
    i = 1
    for line in data.split("\n"):
        line = line.split("data-svg2")
        if len(line) > 1:
            svg2.append(svg_line(line[1], i))
        i += 1

    script = """
<script type="text/javascript">

page({title: "?", s: "2028.1.1", a: 1, handou: "",
    svg2: [
        // ["#id", "jsfile", "name", arg],***
    ],
});

</script>
""".split("***")
    with open("new/" + src, "x", encoding="utf8") as outFile:
        outFile.write(data)
        outFile.write(script[0])
        for s in svg2:
            outFile.write("\n" + (8*" ") + s)
        outFile.write(script[1])

def main():
    os.makedirs("new/" + os.path.dirname(fldr), exist_ok=True)
    for f in files:
        fix_one_file(f"{fldr}{f}.htm")

main()
