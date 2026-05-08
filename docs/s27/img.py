import os

fldr = "p20/circ/"
files = ["ac", "appWt", "ucm"]

def fix_one_file(src):
    with open("../" + src, encoding="utf8") as inFile:
        data = inFile.read()
    i = data.index("{")
    js = data[:i].split('"')[1].split('.')[0]
    data = f'scripts.cache["{js}"] = ' + data[i:]
    i = -1
    while data[i] != ')': i -= 1
    with open("new/" + src, "x", encoding="utf8") as outFile:
        outFile.write(data[:i] + data[i+1])

def main():
    os.makedirs("new/" + os.path.dirname(fldr) + "/img/", exist_ok=True)
    for f in files:
        fix_one_file(f"{fldr}img/{f}.js")

main()
