/**
 * A class that is used to transform positions through rotation, scaling and translation.
 */
export class Matrix2 {
  /**
   *  @param {number} [a=1]
   *  @param {number} [b=0]
   *  @param {number} [c=0]
   *  @param {number} [d=1]
   *  @param {number} [e=0]
   *  @param {number} [f=0]
  */
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} rotation
   * 
   * @returns this
   */
  setFromTransform(x, y, scaleX, scaleY, rotation) {
    let cos = Math.cos(rotation)
    let sin = Math.sin(rotation)

    this.a = cos * scaleX
    this.b = sin * scaleX
    this.c = -sin * scaleY
    this.d = cos * scaleY
    this.e = x
    this.f = y
    return this;
  };
  /**
   * Multiplies with another matrix,
   *  A * B = C, where B is this matrix
   * 
   * @param {Matrix2} m
   * @returns this
   */
  prepend(m) {
    let x = this.e;
    let a1 = this.a;
    let c1 = this.c;
    this.a = a1 * m.a + this.b * m.c;
    this.b = a1 * m.b + this.b * m.d;
    this.c = c1 * m.a + this.d * m.c;
    this.d = c1 * m.b + this.d * m.d;
    this.e = x * m.a + this.f * m.c + m.e;
    this.f = x * m.b + this.f * m.d + m.f;
    return this;
  };
  /**
   * Multiplies with another matrix,
   *  A * B = C, where A is this matrix
   * 
   * @param {Matrix2} m
   * @returns {this}
   */
  append(m) {
    let a1 = this.a;
    let b1 = this.b;
    let c1 = this.c;
    let d1 = this.d;
    this.a = m.a * a1 + m.b * c1;
    this.b = m.a * b1 + m.b * d1;
    this.c = m.c * a1 + m.d * c1;
    this.d = m.c * b1 + m.d * d1;
    this.e = m.e * a1 + m.f * c1 + this.e;
    this.f = m.e * b1 + m.f * d1 + this.f;
    return this;
  }
  /**
   * Makes a matrix to be an identity matrix.
   * 
   * @returns this
   */
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
  };
  /**
   * Rotates the matrix by the given angle.
   * 
   * @param {number} radians
   * @returns this
   */
  rotate(radians) {

    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let a1 = this.a;
    let c1 = this.c;
    let x = this.e;
    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.e = x * cos - this.f * sin;
    this.f = x * sin + this.f * cos;
    return this;
  };
  /**
   * Translates a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  translate(x, y) {
    this.e += x;
    this.f += y;
    return this;
  };
  /**
   * Scales a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    return this;
  };
  /**
   * Transforms the given vector.
   * 
   * @param {Vector} v
   * @returns this
   */
  transform(v) {
    let x = v.x

    v.x = this.a * x + this.c * v.y + this.e;
    v.y = this.b * x + this.d * v.y + this.f;
    return v;
  };
  /**
   * Inverts the matrix.
   *
   * @returns this
   */
  invert() {
    let a = this.a;
    let b = this.b;
    let c = this.c;
    let d = this.d;
    let x = this.e;
    let n = a * d - b * c;
    this.a = d / n;
    this.b = -b / n;
    this.c = -c / n;
    this.d = a / n;
    this.e = (c * this.f - d * x) / n;
    this.f = -(a * this.f - b * x) / n;
    return this;
  };
  /**
   * Copies a matrix into this matrix.
   * 
   * @param {Matrix2} m
   * @returns this
   */
  copy(m) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.e = m.e;
    this.f = m.f;
    return this;
  }
  /**
   * Creates a new matrix,fills its values with this ones and returns the former.
   * 
   * @returns Matrix2
   */
  clone() {
    return new Matrix2().copy(this);
  }
  /**
   * Deeply checks if a matrix is equal to another.
   * 
   * @param {Matrix2} matrix
   * @returns boolean
   */
  equals(matrix) {
    return (this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.e === matrix.e && this.f === matrix.f);
  }

  [Symbol.iterator] = function*() {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
    yield this.e
    yield this.f
  }
}

export { Matrix2 as Matrix }