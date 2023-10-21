class Matrix {
  /**
   * @param {number[][]} rows
   */
  constructor(rows) {
    this.data = []
    this.cols = rows.length
    this.rows = rows[0].length
    this.set(rows)
  }
  set(arr) {
    for (let i = 0; i < arr.length; i++) {
      let row = arr[i]
      this.data.push(...row)
    }
  }
  addScl(n) {
    this.map(el => el += n)
  }
  subScl(n) {
    this.addScl(-n)
  }
  divScl(n) {
    this.multScl(1 / n)
  }
  multScl(n) {
    this.map(el => el *= n)
  }
  addMtx(matrix) {
    for (var i = 0; i < this.rows; i++) {
      let c = i * this.rows
      for (var j = 0; j < this.cols.length; j++) {
        this.data[j + c] += matrix.data[j + c]
      }
    }
  }
  multMtx(matrix) {
    if (this.rows !== matrix.cols)
      return this
    let m = []
    for (let i = 0; i < this.cols; i++) {
      let a = [],
        c = i * this.rows
      for (let j = 0; j < matrix.rows; j++) {
        let sum = 0
        for (var k = 0; k < this.rows; k++) {
          let d =
            sum += this.data[c + k] * matrix.data[k * this.rows + j]
          console.log(c + k, k * this.rows + j);
        }
        a.push(sum)
      }
      m.push(a)
    }
    return new Matrix(m)
  }
  map(fn) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols.length; j++) {
        this.data[i + j] = fn(this.data[i + j], i, j)
      }
    }
  }
  transpose() {
      let data = [],
        k = 0
      for (var i = 0; i < this.cols; i++) {
        let c = i * this.rows
        for (var j = 0; j <= this.rows; j++) {
          if (j == this.rows && c !== this.cols) continue
          if (this.data[c + j] == undefined) k++
          data[j * this.rows + i] = this.data[c + j]
          console.log(c+j,j * this.rows + i);
        }
      }
      return [data,this.cols,this.rows]
    }
    *[Symbol.iterator]() {
      for (var i = 0; i < this.data.length; i++) {
        yield this.data[i]
      }
    }
}

export {
  Matrix
}

// m[i][j] = m[j][i]
// 01 - 10
// 