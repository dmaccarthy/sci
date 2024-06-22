function mx_invert(m) {
    /* Invert a 2x2 matrix as an array of rows */
    let [a00, a01] = m[0];
    let [a10, a11] = m[1];
    let d = a00 * a11 - a01 * a10;
    return [
        [a11 / d, -a01 / d],
        [-a10 / d, a00 / d]
    ];
}

function mx_multiply(a, b) {
    /* Apply a 2x2 matrix to a 2x2 matrix or 2-vector */
    if (typeof(b[0]) == "number") {
        b = mx_multiply(a, [[b[0]], [b[1]]]);
        return new RArray(b[0][0], b[1][0]);
    }
    let [a00, a01] = a[0];
    let [a10, a11] = a[1];
    let r0 = [], r1 = [];
    for (let c=0; c<b[0].length; c++) {
        let bx = b[0][c];
        let by = b[1][c];
        r0.push(a00 * bx + a01 * by);
        r1.push(a10 * bx + a11 * by);
    }
    return [r0, r1];
}