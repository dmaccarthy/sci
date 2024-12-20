"""
Convert isotope mass data from NIST (Pre-formatted ASCII Table) to JSON.

https://www.nist.gov/pml/atomic-weights-and-isotopic-compositions-relative-atomic-masses

"""

import json

data = {"0": {"sym": "n", "iso": [[1, 1.00866491606]]}}
z = None
with open("nist.txt") as txt:
    for line in txt:
        num = line[0].isnumeric()
        if num:
            z = int(line[:3].strip())
            sym = line[4:7].strip()
        if z and (num or line[0] == ' '):
            a = int(line[8:12].strip())
            m = float(line[12:].split("(")[0])
            if z not in data:
                data[z] = {"sym": sym, "iso": []}
            data[z]["iso"].append([a, m]);
with open("nist.json", 'w') as jsonfile:
    json.dump(data, jsonfile)
