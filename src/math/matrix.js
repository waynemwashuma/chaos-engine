import { Vector2 } from "./vector.js";
import {deprecate} from "../logger/index.js"
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
   * @deprecated
   * @param {number} x
   * @param {number} y
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} rotation
   * 
   * @returns this
   */
  setFromTransform(x, y, scaleX, scaleY, rotation) {
    deprecate("Matrix2().setFromTransform()","Matrix2.setFromTransform()")
    Matrix2.setFromTransform(this, x, y, rotation, scaleX, scaleY)
    return this;
  }
  /**
   * Multiplies with another matrix,
   *  A * B = C, where B is this matrix
   * 
   * @deprecated
   * @param {Matrix2} m
   * @returns this
   */
  prepend(m) {
    deprecate("Matrix2().prepend()","Matrix2.multiply()")
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
   * @deprecated
   * @param {Matrix2} m
   * @returns {this}
   */
  append(m) {
    deprecate("Matrix2().append()","Matrix2.multiply()")
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
   * Rotates the matrix by the given angle.
   * 
   * @deprecated
   * @param {number} radians
   * @returns this
   */
  rotate(radians) {
    deprecate("Matrix2().rotate()","Matrix2.rotate()")
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
   * Makes a matrix to be an identity matrix.
   * 
   * @deprecated
   * @returns this
   */
  identity() {
    deprecate("Matrix2().identity()","Matrix2.identity()")
    
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
  };
  /**
   * Translates a matrix by a given amount.
   * 
   * @deprecated
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  translate(x, y) {
    deprecate("Matrix2().translate()","Matrix2.translate()")
    this.e += x;
    this.f += y;
    return this;
  };
  /**
   * Scales a matrix by a given amount.
   * 
   * @deprecated
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  scale(x, y) {
    deprecate("Matrix2().scale()","Matrix2.scale()")
    this.a *= x;
    this.d *= y;
    return this;
  };
  /**
   * Transforms the given vector.
   * 
   * @deprecated
   * @param { Vector2} v
   */
  transform(v) {
    deprecate("Matrix2().transform()","Matrix2.transformVector2()")
    const x = v.x

    v.x = this.a * x + this.c * v.y + this.e;
    v.y = this.b * x + this.d * v.y + this.f;
    return v;
  };
  /**
   * Inverts the matrix.
   *
   * @deprecated
   * @returns this
   */
  invert() {
    deprecate("Matrix2().invert()","Matrix2.invert()")
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
  }
  /**
   * Copies a matrix into this matrix.
   * 
   * @deprecated
   * @param {Matrix2} m
   * @returns this
   */
  copy(m) {
    deprecate("Matrix2().copy()","Matrix2.copy()")
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
   * @deprecated
   * @returns Matrix2
   */
  clone() {
    deprecate("Matrix2().clone()","Matrix2.copy()")
    return new Matrix2().copy(this);
  }
  /**
   * Deeply checks if a matrix is equal to another.
   * 
   * @deprecated
   * @param {Matrix2} matrix
   * @returns boolean
   */
  equals(matrix) {
    deprecate("Matrix2().equals()","Matrix2.equals()")
    return (this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.e === matrix.e && this.f === matrix.f);
  }
  static setFromTransform(matrix, x, y, angle, scaleX, scaleY) {
    const cos = Math.cos(rotation)
    const sin = Math.sin(rotation)

    matrix.a = cos * scaleX
    matrix.b = sin * scaleX
    matrix.c = -sin * scaleY
    matrix.d = cos * scaleY
    matrix.e = x
    matrix.f = y

    return matrix
  }
  static multiply(m1, m2, out = new Matrix2()) {
    const a1 = m1.a;
    const b1 = m1.b;
    const c1 = m1.c;
    const d1 = m1.d;

    out.a = m2.a * a1 + m2.b * c1;
    out.b = m2.a * b1 + m2.b * d1;
    out.c = m2.c * a1 + m2.d * c1;
    out.d = m2.c * b1 + m2.d * d1;
    out.e = m2.e * a1 + m2.f * c1 + m1.e;
    out.f = m2.e * b1 + m2.f * d1 + m1.f;

    return out
  }
  static identity(out = new Matrix2()) {
    out.a = 1;
    out.b = 0;
    out.c = 0;
    out.d = 1;
    out.e = 0;
    out.f = 0;

    return out
  }
  static rotate(matrix, angle, out = new Matrix2()) {
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const a1 = matrix.a;
    const c1 = matrix.c;
    const x = matrix.e;

    out.a = a1 * cos - matrix.b * sin;
    out.b = a1 * sin + matrix.b * cos;
    out.c = c1 * cos - matrix.d * sin;
    out.d = c1 * sin + matrix.d * cos;
    out.e = x * cos - matrix.f * sin;
    out.f = x * sin + matrix.f * cos;

    return out;
  };
  static translate(matrix, x, y, out = new Matrix2()) {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d
    out.e = matrix.e + x;
    out.f = matrix.f + y;

    return out;
  }
  static scale(matrix, x, y, out = new Matrix2()) {
    out.a = matrix.a * x
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d * y
    out.e = matrix.e
    out.f = matrix.f

    return out;
  };
  static transformVector2(matrix, v, out = new Vector2()) {
    const x = v.x

    out.x = matrix.a * x + matrix.c * v.y + matrix.e;
    out.y = matrix.b * x + matrix.d * v.y + matrix.f;

    return out;
  }
  static invert(matrix, out = new Matrix2()) {
    const a = matrix.a;
    const b = matrix.b;
    const c = matrix.c;
    const d = matrix.d;
    const x = matrix.e;
    const n = a * d - b * c;

    out.a = d / n;
    out.b = -b / n;
    out.c = -c / n;
    out.d = a / n;
    out.e = (c * matrix.f - d * x) / n;
    out.f = -(a * matrix.f - b * x) / n;

    return out;
  };
  static copy(matrix, out = new Matrix2()) {
    out.a = matrix.a;
    out.b = matrix.b;
    out.c = matrix.c;
    out.d = matrix.d;
    out.e = matrix.e;
    out.f = matrix.f;

    return out;
  }
  /**
   * @this {Matrix2}
   */
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