epoch = 2023

def jumb_hex(y, m, d):
    num = d + 100 * (m + 100 * (y - epoch))
    return f"{num:x}"

def jumb_unhex(s):
    num = int(s, 16)
    d, m = num % 100, num // 100
    m, y = m % 100, m // 100
    return y + epoch, m, d

h = jumb_hex(2023, 12, 2)
print(h, jumb_unhex(h))
