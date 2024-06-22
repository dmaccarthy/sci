class Matrix extends Array {

constructor(data, s) {
    let rows = data.length;
    let cols = data[0].length;
    if (!cols || !rows) throw("Dimension error");
    super(rows);
    if (s == null) s = 1;
    for (let r=0;r<rows;r++) {
        let datar = data[r];
        if (datar.length != cols) throw("Dimension error");
        let row = this[r] = new Array(cols);
        for (let c=0;c<cols;c++) row[c] = s * datar[c];
    }
}

get rows() {return this.length}
get cols() {return this[0].length}

static make(rows, cols, fn) { // Make a matrix with values calculated by a supplied function
    if (fn == null) fn = () => 0;
    let data = new Array(rows);
    for (let r=0;r<rows;r++) {
        let row = data[r] = new Array(cols);
        for (let c=0;c<cols;c++) row[c] = fn(r, c);
    }
    return new Matrix(data);
}

row(r) { // Extract a single row as a new matrix
    return new Matrix([this[r]]);
}
        
col(c) { // Extract a single column as a new matrix
    let n = this.rows;
    let data = new Array(n);
    for (let i=0;i<n;i++) data[i] = [this[i][c]];
    return new Matrix(data);
}

plus(...args) { // Add one or more matrices and return as a new matrix
    let s = new Matrix(this);
    for (let i=0;i<args.length;i++) {
        let a = args[i];
        if (a.rows != s.rows || a.cols != s.cols) throw("Dimension error");
        for (let r=0;r<s.rows;r++)
            for (let c=0;c<s.cols;c++) s[r][c] += a[r][c];
    }
    return s;
}

static sum(...args) {
    let m = args[0];
    let zero = Matrix.make(m.rows, m.cols, () => 0);
    return zero.plus(...args);
}
    
times(s) { // Multiply a matrix by a number or another matrix
    if (typeof(s) == "number") return new Matrix(this, s);
    if (s.rows != this.cols) throw("Dimension error");
    let data = [];
    for (let r=0;r<this.rows;r++) {
        let row = [];
        data.push(row);
        for (let c=0;c<s.cols;c++) {
            let cell = 0;
            for (let i=0;i<s.rows;i++) cell += this[r][i] * s[i][c];
            row.push(cell);
        }
    }
    return new Matrix(data);
}

removeRow(r) {
    let rows = this.rows;
    if (r < 0 || r >= rows) throw("Index error")
    let data = new Array(rows - 1);
    for (let i=0;i<rows;i++) if (i != r){
        let j = i < r ? i : i - 1;
        data[j] = [...this[i]];
    }
    return new Matrix(data);
}

removeCol(c) {
    if (c < 0 || c >= this.cols) throw("Index error")
    let m = new Matrix(this);
    for (let r=0;r<this.rows;r++) m[r].splice(c, 1);
    return m;
}

minor(r, c) { // Return a minor by removing row r and column c
    let rows = this.rows;
    if (r < 0 || c < 0 || r >= rows || c >= this.cols) throw("Index error")
    let data = new Array(rows - 1);
    for (let i=0;i<rows;i++) if (i!= r){
        let j = i < r ? i : i - 1;
        data[j] = [...this[i]];
        data[j].splice(c, 1);
    }
    return new Matrix(data);
}

get det() { // Calculate the determinant
    let rows = this.rows;
    if (rows != this.cols) throw("Dimension error");
    if (rows == 1) return this[0][0];
    else if (rows == 2) return this[0][0] * this[1][1] - this[0][1] * this[1][0];
    let d = 0;
    for (let r=0;r<rows;r++) d += this[r][0] * this.cofactor(r, 0);
    return d;
}

cofactor(r, c) { // Calculate one cofactor value
    return this.minor(r,c).det * ((r + c) % 2 ? -1 : 1);
}

get tr() { // Return the transpose as a new matrix
    let data = [];
    for (let c=0;c<this.cols;c++) data.push(this.col(c));
    return new Matrix(data);
}

get adj() { // Return the adjugate matrix (transpose of the cofactors)
    let rows = this.rows;
    let data = new Array(rows);
    for (let r=0;r<rows;r++) {
        let row = data[r] = new Array(rows);
        for (let c=0;c<rows;c++) row[c] = this.cofactor(c, r);
    }
    return new Matrix(data);
}

get inv() { // Return the inverse matrix
    return this.rows == 1 && this.cols == 1 ? new Matrix([[1 / this[0][0]]]): this.adj.times(1 / this.det);
}

trace() {
    let t = 0;
    let rows = this.rows;
    if (rows != this.cols) throw("Dimension error");
    for (let i=0;i<rows;i++) t += this[i][i];
    return t;
}

get array() { // Copy all data to a 1D RArray instance
    let a = this[0];
    if (a.length == 1) {
        let tmp = a[0];
        a = new RArray(1);
        a[0] = tmp;
    }
    else a = new RArray(...a);
    for (let r=1;r<this.rows;r++) a.extend(this[r]);
    return a;
}

solve() { // Solve a linear system described by a n × (n+1) matrix
    let rows = this.rows;
    if (this.cols != rows + 1) throw("Dimension error");
    let ref = this.ref();
    let soln = new RArray(rows);
    for (let i=0;i<rows;i++) {
        let row = rows - 1 - i;
        let c = ref[row][row];
        if (c == 0) return false;
        let x = ref[row][rows];
        for (let j=row+1;j<rows;j++) x -= ref[row][j] * soln[j];
        soln[row] = x / c;
    }
    return soln; // RArray instance
}

leastSq(y) {
/* Return least squares fit coefficients...
    Matrix instance (this) contains independent data
    y contains dependent data as an Array instance
*/
    let tr = this.tr;
    let a = tr.times(this);
    let b = tr.times(new Matrix([y]).tr);
    for (let r=0;r<a.rows;r++) a[r].push(b[r][0]);
    return a.solve();
}

ref() { // Not tested!
    let mx = new Matrix(this);
    let rows = mx.rows;
    let cols = mx.cols;
    let currentRow = 0;
    let currentCol = 0;
    while (currentRow < rows && currentCol < cols) {
        let m = currentRow;
        for (let r=currentRow+1;r<rows;r++)
            if (Math.abs(mx[r][currentCol]) > Math.abs(mx[m][currentCol])) m = r;
        if (m != currentRow) mx.swap(m, currentRow);
        currentCol = mx.one(currentRow);
        if (currentCol < cols) for (let r=currentRow+1;r<rows;r++) {
            mx.comb(r, currentRow, 1, -mx[r][currentCol]);
        }
        currentRow++;
        currentCol++;
    }
    return mx;
}

rref() { // Incomplete!
    let mx = this.ref();
    let nonZero = (r) => {
        for (let c=0;c<r.length;c++) if (r[c] != 0) return c;
        return -1;
    }
    let currentRow = mx.rows - 1;
    while (currentRow > 0) {
        let c = nonZero(mx[currentRow]);
        if (c >= 0) for (let r=0;r<currentRow;r++) {
            mx.comb(r, currentRow, 1, -mx[r][c]);
        }
        currentRow--;
    }
    return mx;
}

// In-place row operations

swap(a, b) { // Swap rows a nad b
    let tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
    return this;
}

one(r) { // Divide row r by the first non-zero value
    let tmp = this[r];
    let n = tmp.length;
    let c = 0;
    while (tmp[c] == 0 && c < n) c++;
    if (c < n) {
        let f = tmp[c];
        for (let i=c;i<n;i++) tmp[i] /= f;
    }
    return c;
}

comb(r1, r2, f1, f2) { // Replace r1 with f1*r1 + f2*r2
    r1 = this[r1];
    r2 = this[r2];
    for (let c=0;c<r1.length;c++) r1[c] = f1 * r1[c] + f2 * r2[c];
    return this;
}

}


/* Applications of matrix math */

function quadRegXY(x, y) {
    let n = x.length;
    if (y.length != n) throw("Dimension error");
    let mx = Matrix.make(n, 3, (r, c) => {
        let xr = x[r];
        return c ? (c == 1 ? xr : xr * xr) : 1
    });
    let [c, b, a] = mx.leastSq(y);
    return {a:a, b:b, c:c, fn: (x) => (a * x + b) * x + c}
}

function quadReg(...data) {return quadRegXY(...unzip(data))}

function linearSystem(...args) {
    return new Matrix(args).solve();
}
