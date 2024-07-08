import { Vector2 } from "./vector2.js";
import { deprecate } from "../logger/index.js"
/**
 * A class that is used to transform positions through rotation, scaling and translation.
 */
export class Matrix2x3 {
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
   * @param {Vector2} translation
   * @param {Angle} orientation
   * @param {Vector2} scale
   * 
   * @returns {this}
   */
  setFromTransform(translation, orientation, scale) {
    return Matrix2x3.setFromTransform(this, translation, rotation, scale)
  }
  /**
   * Multiplies with another matrix,
   *  A * B = C, where A is this matrix
   * 
   * @param {Matrix2x3} m
   * @returns {this}
   */
  multiply(m) {
    return Matrix2x3.multiply(this, m, this)
  }
  /**
   * Rotates the matrix by the given angle.
   * 
   * @param {number} angle
   * @returns {this}
   */
  rotate(angle) {
    return Matrix2x3.rotate(this, angle, this)
  };
  /**
   * Makes a matrix to be an identity matrix.
   * 
   * @returns {this}
   */
  identity() {
    return Matrix2x3.identity(this)
  };
  /**
   * Translates a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  translate(x, y) {
    return Matrix2x3.translate(this, x, y, this)
  };
  /**
   * Scales a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  scale(x, y) {
    return Matrix2x3.scale(this, x, y, this)
  };
  /**
   * Transforms the given vector.
   * 
   * @param { Vector2} v
   */
  transform(v) {
    return Matrix2x3.transformVector2(this, v, v)
  };
  /**
   * Inverts the matrix.
   *
   * @returns {this}
   */
  invert() {
    return Matrix2x3.invert(this, this)
  }
  /**
   * Copies a matrix into this matrix.
   * 
   * @param {Matrix2x3} m
   * @returns this
   */
  copy(m) {
    return Matrix2x3.copy(m, this)
  }
  /**
   * Creates a new matrix,fills its values with this ones and returns the former.
   * 
   * @returns {Matrix2x3}
   */
  clone() {
    return new Matrix2x3().copy(this);
  }
  /**
   * Deeply checks if a matrix is equal to another.
   * 
   * @param {Matrix2x3} matrix
   * @returns {boolean}
   */
  equals(matrix) {
    return Matrix2x3.equals(this,matrix)
  }
  /**
   * @param {Matrix2x3} matrix
   * @param {Vector2} translation
   * @param {Angle} orientation
   * @param {Vector2} scale
   * @return {Matrix2x3}
   */
  static setFromTransform(matrix, translation, orientation, scale) {
    const cos = Math.cos(orientation.value)
    const sin = Math.sin(orientation.value)

    matrix.a = cos * scale.x
    matrix.b = sin * scale.x
    matrix.c = -sin * scale.y
    matrix.d = cos * scale.y
    matrix.e = translation.x
    matrix.f = translation.y

    return matrix
  }
  /**
   * @param {Matrix2x3} m1
   * @param {Matrix2x3} m2
   */
  static multiply(m1, m2, out = new Matrix2x3()) {
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
  static identity(out = new Matrix2x3()) {
    out.a = 1;
    out.b = 0;
    out.c = 0;
    out.d = 1;
    out.e = 0;
    out.f = 0;

    return out
  }
  /**
   * @param {Matrix2x3} matrix
   * @param {number} angle
   */
  static rotate(matrix, angle, out = new Matrix2x3()) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
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
  /**
   * @param {Matrix2x3} matrix
   * @param {any} x
   * @param {any} y
   */
  static translate(matrix, x, y, out = new Matrix2x3()) {
    out.a = matrix.a
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d
    out.e = matrix.e + x;
    out.f = matrix.f + y;

    return out;
  }
  /**
   * @param {Matrix2x3} matrix
   * @param {number} x
   * @param {number} y
   */
  static scale(matrix, x, y, out = new Matrix2x3()) {
    out.a = matrix.a * x
    out.b = matrix.b
    out.c = matrix.c
    out.d = matrix.d * y
    out.e = matrix.e
    out.f = matrix.f

    return out;
  };
  /**
   * @param {Matrix2x3} matrix
   * @param {Vector2} v
   */
  static transformVector2(matrix, v, out = new Vector2()) {
    const x = v.x

    out.x = matrix.a * x + matrix.c * v.y + matrix.e;
    out.y = matrix.b * x + matrix.d * v.y + matrix.f;

    return out;
  }
  /**
   * @param {Matrix2x3} matrix
   */
  static invert(matrix, out = new Matrix2x3()) {
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
  /**
   * @param {Matrix2x3} matrix
   */
  static copy(matrix, out = new Matrix2x3()) {
    out.a = matrix.a;
    out.b = matrix.b;
    out.c = matrix.c;
    out.d = matrix.d;
    out.e = matrix.e;
    out.f = matrix.f;

    return out;
  }
  static equals(m1, m2) {
    return (
      (m1.a === m2.a) &&
      (m1.b === m2.b) &&
      (m1.c === m2.c) &&
      (m1.d === m2.d) &&
      (m1.e === m2.e) &&
      (m1.f === m2.f)
    )
  }
  /**
   * Allows iteration of components.
   */
  *[Symbol.iterator]() {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
    yield this.e
    yield this.f
  }
}