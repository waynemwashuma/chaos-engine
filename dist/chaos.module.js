/*
 * @author Wayne Mwashuma
 * {@link https://github.com/waynemwashuma/chaos-engine.git}
 * @copyright  2023-2024 Wayne Mwashuma
 *
 * @license MIT
 * @version 0.8.0
 */
 /*
 MIT License

Copyright (c) 2023 Wayne Mwashuma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
 
const PI = Math.PI;
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const DEG2RAD = Math.PI / 180;
const epilson = Math.pow(2, -53);
const RAD2DEG = 180 / Math.PI;
const SQRT2 = Math.sqrt(2);

/**
 * Creates a random number between the parameters
 * 
 * @param {number} [min=0] The minimal bound of the random number
 * @param {number} [max=1] The maximum bound of the random number
 * @returns {number}
 */
function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 * Returns the square of a number
 * 
 * @param {number} x The number to square
 *  @returns {number}
 */
function sq(x) {
  return x * x
}
/**
 * Returns the power of a number by a given exponent.
 * 
 *  @param {number} x the number to power.
 *  @param {number} [e=2] The number to power by.
 *  @returns {number}
 */
function exp(x, e = 2) {
  return x ** e
}
/**
 * Returns the square root pf a number
 * 
 * @param {number} x The number to root 
 * @returns {number}
 */
function sqrt(x) {
  return Math.sqrt(x)
}


/**
 * Interpolates between two numbers by a constant t.
 * 
 *  @param {number} a The minimal bound of the interpolation.
 *  @param {number} b The maximum bound of the interpolation.
 *  @param {number} t A number between 0 and 1 to interpopate by.Any other number greater than 1 or less than 0 will extapolate beyond b or a respectively.
 *  @returns {number}
 */
function lerp(a, b, t) {
  return a + t * (b - a)
}

/**
 * Rounds a given value to a given precision.
 * 
 *  @param {number} number The number to round.
 *  @param {number} [precision=4] How many decimal places there should be.
 *  @returns {number}
 */
function round(number, precision = 4) {
  precision = 10 ** precision;
  return Math.round(number * precision) / precision
}

/**
 * Clamps a value between two numbers.
 * 
 *  @param {number} value The number to clamp.
 *  @param {number} min The minimal bound of the clamped number.
 *  @param {number} max The maximum bound of the clamped number.
 *  @returns {number}
 */
function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Maps a value from one range to another.
 * 
 *  @param {number} v
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x2
 *  @param {number} y2
 *  @returns {number}
 */
function map(v, x1, y1, x2, y2) {
  return x2 + v * (y2 - x2) / (y1 - x1)
}
/**
 * Returns a unique number given from a pair of numbers
 *  @param {number} a
 *  @param {number} b
 *  @returns {number}
 */
function naturalizePair(a, b) {
  if (a > b)
    return (a + b) * (a + b + 1) / 2 + a;
  return (a + b) * (a + b + 1) / 2 + b;
}

/**
 * Converts a degree to a radian.
 * 
 * @param {number} deg number to convert.
 *  @returns {number}
 */
function degToRad(deg) {
  return deg * DEG2RAD
}

/**
 * Converts a radian to a degree.
 * 
 * @param {number} rad number to convert.
 *  @returns {number}
 */
function radToDeg(rad) {
  return rad * RAD2DEG
}
/**
 * @param {number} x
 */
function wrapAngle(x) {
  let a = x;
  while (a > Math.PI * 2) {
    a = a - Math.PI * 2;
  }
  while (a < 0) {
    a = a + Math.PI * 2;
  }
  return a
}

const marker = `🚀Chaos Engine:\n\n`;
const mess = [""];
/**
 * Logs out a warning to the console.
 *
 * @param {string} message
 */
function warn(message) {
  console.warn(marker + message);
}
/**
 * Throws a fatal error.
 * 
 * @param {string} message
 */
function throws(message) {
  throw new Error(marker + message)
}
/**
 * Logs out a non fatal error to the console.
 * 
 * @param {string} message
 */
function error(message) {
  console.error(marker + message);
}

/**
 * Logs out a message to the console.
 * 
 * @param {string} message
 */
function log(message) {
  deprecate("Logger.throws()", "throws()");

  console.log(marker + message);
}
/**
 * Logs out a warning once to the console.
 * 
 * @param {string} message
 */
function warnOnce(message) {
  if (mess.includes(message)) return
  mess.push(message);
  warn(message);
}
/**
 * Logs out a message,warning or error to the console according to the supplied log function.
 * 
 * @param {boolean} test
 * @param {string} message
 * @param {(message:string)=>void} errfunc
 */
function assert(test, message,errfunc = throws) {
  if (!test) errfunc(message);
  return test
}
/**
 * Logs out a warning to the console.
 * 
 * @param {string} original
 * @param {string} [replacement]
 */
function deprecate(original, replacement = "") {
  let message = `\`${original}\` has been depreciated.`;
  if (replacement !== "")
    message += `Use \`${replacement}\` instead.`;
  warnOnce(message);
}
/**
 * @deprecated
*/
const Logger = {
  /**
   * Logs out a warning to the console.
   * @deprecated
   * @param {string} message
   */
  warn(message) {
    deprecate("Logger.warn()", "warn()");
    console.warn(marker + message);
  },
  /**
   * Throws a fatal error.
   * @deprecated
   * @param {string} message
   */
  throws(message) {
    deprecate("Logger.throws()", "throws()");
    throw new Error(marker + message)
  },
  /**
   * Logs out a non fatal error to the console.
   * @deprecated
   * @param {string} message
   */
  error(message) {
    deprecate("Logger.error()", "error()");

    console.error(marker + message);
  },

  /**
   * Logs out a message to the console.
   * @deprecated
   * @param {string} message
   */
  log(message) {
    deprecate("Logger.log()", "log()");

    console.log(marker + message);
  },
  /**
   * Logs out a warning once to the console.
   * @deprecated
   * @param {string} message
   */
  warnOnce(message) {
    deprecate("Logger.warnOnce()", "warnOnce()");

    if (mess.includes(message)) return
    mess.push(message);
    this.warn(message);
  },
  /**
   * Logs out a message,warning or error to the console according to the supplied log function.
   * @deprecated
   * @param {boolean} test
   * @param {string} message
   * @param {(message:string)=>void} errfunc
   */
  assert(test, message,errfunc = throws) {
    deprecate("Logger.assert()", "assert()");

    if (!test) errfunc(message);
    return test
  },
  /**
   * Logs out a warning to the console.
   * @deprecated
   * @param {string} original
   * @param {string} [replacement]
   */
  deprecate(original, replacement = "") {
    deprecate("Logger.deprecate()", "deprecate()");
    let message = `"${original}" has been depreciated.`;
    if (replacement !== "")
      message += `Use "${replacement}" instead.`;
    this.warnOnce(message);
  }
};

const obj = {
  x: 0,
  y: 0
};
/**
 * This is a 2D vector class.
 * 
 */
class Vector2 {
  /**
   * @param {number} [x] the x coordinate of the vector
   * @param {number} [y] the y coordinate of the vector
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * @deprecated
   *Calculates length squared of vector and returns it
   */
  magnitudeSquared() {
    deprecate("Vector2().magnitudeSquared()", "Vector2.magnitudeSquared()");
    return Vector2.magnitudeSquared(this)
  }
  /**
   * @deprecated
   *Calculates length of this vector and returns 
   * it
   * 
   * @returns {number}
   */
  magnitude() {
    deprecate("Vector2().magnitude()", "Vector2.magnitude()");
    return Vector2.magnitude(this)
  }
  /**
   * @deprecated
   * Sets a vector to have the given length.
   * 
   * @param {number} length 
   */
  setMagnitude(length) {
    deprecate("Vector2().setMagnitude()", "Vector2.setMagnitude()");
    Vector2.setMagnitude(this, length, this);
    return this
  }
  /**
   * @deprecated
   *Calculates length of this vector to another vector
   * @param { Vector2} v the other vector
   */
  distanceTo(v) {
    deprecate("Vector2().distanceTo()", "Vector2.distanceTo()");

    return Vector2.distanceTo(this, v)
  }
  /**
   *Calculates length squared of this vector to another vector
   * 
   * @deprecated
   * @param { Vector2} v the other vector
   * @returns {number}
   */
  distanceToSquared(v) {
    deprecate("Vector2().distanceToSquared()", "Vector2.distanceToSquared()");
    return Vector2.distanceTo(this, v)
  }
  /**
   * Adds a given vector into this 
   * 
   * @deprecated
   * @param { Vector2} v
   */
  add(v) {
    deprecate("Vector2().add()", "Vector2.add()");
    Vector2.add(this, v, this);
    return this
  }
  /**
   * Adds a scalar value into this vector's
   * x and y values
   * 
   * @deprecated
   * @param {number} n
   */
  addScalar(n) {
    deprecate("Vector2().addScalar()", "Vector2.addScalar()");
    Vector2.addScalar(this, n, this);
    return this
  }
  /**
   * Subtracts a given vector from this vector
   * 
   * @deprecated
   * @param { Vector2} v
   * @returns {this}
   */
  sub(v) {
    deprecate("Vector2().sub()", "Vector2.sub()");
    Vector2.sub(this, v, this);
    return this
  }
  /**
   * Subtracts a scalar value from this vector's x and y values.
   * 
   * @deprecated
   * @param {number} n
   * @returns {this}
   */
  subScalar(n) {
    deprecate("Vector2().subScalar()", "Vector2.subScalar()");
    Vector2.subScalar(this, n, this);
    return this
  }
  /**
   * Multiplies this vector with a scalar.
   * 
   * @deprecated
   * @param {number} n 
   * @returns {this}
   */
  multiply(n) {
    deprecate("Vector2().multiply()", "Vector2.multiply()");
    Vector2.multiplyScalar(this, n, this);
    return this
  }
  /**
   * Rotates this vector by a given angle in radians.
   * 
   * @deprecated
   * @param {number} cos
   * @param {number} sin 
   * @returns {this}
   */
  rotateFast(cos, sin) {
    deprecate("Vector2().rotateFast()", "Vector2.rotateFast()");
    Vector2.rotateFast(this, cos, sin, this);
    return this
  };
  /**
   * 
   * @deprecated
   * Returns an array with x and y values of
   * this vector pushed into the array in
   * that order.
   * 
   * @param {number[]} [target = []] The array to
   * push values.Defaults to creating a new
   * array if not provided one
   * @returns number[]
   */
  toArray(target = [], offset = 0) {
    deprecate("Vector2().toArray()", "Vector2.toArray()");
    target[offset] = this.x;
    target[offset + 1] = this.y;
    return target;
  }
  /**
   * Copies x and y values of this vector to 
   * a new vector and returns the new vector.
   * @deprecated
   * @return Vector2
   */
  clone() {
    deprecate("Vector2().clone()", "Vector2.copy()");
    return Vector2.copy(this)
  }
  /**
   * Copies x and y values of another vector
   * to this vector.
   * 
   * @deprecated
   * @param { Vector2} v 
   * @return this
   */
  copy(v) {
    deprecate("Vector2().copy()", "Vector2.copy()");
    Vector2.copy(v, this);
    return this
  }
  /**
   * Sets x and y values of this vector to the given parameter.
   * 
   * @deprecated
   * @param {Number} x 
   * @param {Number} y
   */
  set(x, y) {
    deprecate("Vector2().set()", "Vector2.set()");
    Vector2.set(this, x, y);
    return this
  }
  /**
   * Returns a vector of this reflected on a sirface perpendicular to the normal.
   * 
   * @deprecated
   * @param {Vector2} normal the unit vector perpendicular to reflection surface
   * @param { Vector2} [target]
   * @return { Vector2}
   */
  reflect(normal, target = new Vector2()) {
    deprecate("Vector2().reflect()", "Vector2.reflect()");
    Vector2.reflect(this, normal, target);
    return target
  }
  /**
   * Forces this vector to have a length 
   * between the min and max.
   * 
   * @deprecated
   * @param {number} [min = 0] The smallest value 
   * the length of this vector is allowed to have.
   * @param {number} [max = 1] The biggest value the length of this vector is allowed to have.
   * @returns {this}
   */
  clamp(min = 0, max = 1) {
    deprecate("Vector2().clamp()", "Vector2.clamp()");
    Vector2.clampMagnitude(this, min, max, this);
    return this
  }
  /**
   * Calculates the dot product of two vectors.
   * 
   * @deprecated
   * @param { Vector2} v
   * @returns {number}
   */
  dot(v) {
    deprecate("Vector2().dot()", "Vector2.dot()");
    return Vector2.dot(this, v)
  }
  /**
   * Calculates the cross product of two vectors.
   * 
   * @deprecated
   * @param { Vector2} v
   * @returns {number}
   */
  cross(v) {
    deprecate("Vector2().cross()", "Vector2.cross()");
    return Vector.cross(this, v)
  }
  /**
   * Makes this vector a unit vector by 
   * dividing its components with its length.
   * 
   * @deprecated
   * @returns {this}
   */
  normalize() {
    deprecate("Vector2().normalize()", "Vector2.normalize()");
    Vector2.normalize(this, this);
    return this
  }
  /**
   * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
   * 
   * @deprecated
   * @param {number} l the length of the vector returned.
   * @param { Vector2} [target = Vector2] Vector2 in which results are stored.
   * @returns { Vector2}
   */
  normal(l = 1, target = new Vector2()) {
    deprecate("Vector2().normal()", "Vector2.normal()");
    Vector2.normal(this, target);
    Vector2.normalize(target, target);
    Vector2.multiplyScalar(target, l, target);
    return target
  }
  /**
   * Returns the normal to a vector, the normal has the same length as the vector.
   * 
   * @deprecated
   * @param { Vector2} [target = Vector2] Vector2 in which results are stored.
   *  @returns { Vector2}
   */
  normalFast(target = new Vector2()) {
    deprecate("Vector2().normalFast()", "Vector2.normal()");
    Vector2.set(target,-this.y, this.x);
    return this
  }
  /**
   * Rotates this vector by a given angle in radians.
   * 
   * @deprecated
   * @param {number} rad Angle in radians
   * @returns {this}
   */
  rotate(rad) {
    deprecate("Vector2().rotate()", "Vector2.rotate()");
    Vector2.rotate(this, rad, this);
    return this
  }
  /**
   * Divides this vector with a scalar.
   * 
   * @deprecated
   * @param {number} n 
   * @returns {this}
   */
  divide(n) {
    deprecate("Vector2().divide()", "Vector2.divide()");
    this.multiply(1 / n);
    return this
  }
  /**
   * Checks to see if this vector is equal to
   * another vector.
   * 
   * @deprecated
   * @param { Vector2} v
   * @returns {boolean}
   */
  equals(v) {
    deprecate("Vector2().equals()", "Vector2.equals()");
    return Vector2.equal(this, v)
  }
  /**
   * Checks if the vector length is zero.
   * 
   * @deprecated
   * @returns {boolean}
   */
  equalsZero() {
    deprecate("Vector2().equalsZero()", "Vector2.equalsZero()");
    return Vector2.equalsZero(this)
  }
  /**
   * Negates the values of this vector.
   * 
   * @deprecated
   * @returns {this}
   */
  reverse() {
    deprecate("Vector2().reverse()", "Vector2.reverse()");
    Vector2.reverse(this, this);
    return this
  }
  /**
   * @param {Vector_like} v
   */
  static magnitudeSquared(v) {
    return v.y ** 2 + v.x ** 2
  }
  /**
   * @param {Vector_like} v
   */
  static magnitude(v) {
    return Math.sqrt(Vector2.magnitudeSquared(v));
  }
  /**
   * @param {Vector_like} v
   * @param {number} length
   */
  static setMagnitude(v, length, out = new Vector2()) {
    Vector2.normalize(v, out);
    Vector2.multiplyScalar(v, length, out);
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static distanceTo(v1, v2) {
    obj.x = v1.x - v2.x;
    obj.y = v1.y - v2.y;
    return Vector2.magnitude(obj)
  }
  /**
   * Calculates length squared of this vector to another vector
   * 
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static distanceToSquared(v1, v2) {
    obj.x = v1.x - v2.x;
    obj.y = v1.y - v2.y;
    return Vector2.magnitudeSquared(obj)
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static add(v1, v2, out = new Vector2()) {
    out.x = v1.x + v2.x;
    out.y = v1.y + v2.y;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static addScalar(v1, n, out = new Vector2()) {
    out.x = v1.x + n;
    out.y = v1.y + n;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static sub(v1, v2, out = new Vector2()) {
    out.x = v1.x - v2.x;
    out.y = v1.y - v2.y;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static subScalar(v1, n, out = new Vector2()) {
    out.x = v1.x - n;
    out.y = v1.y - n;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static multiply(v1, v2, out = new Vector2()) {
    out.x = v1.x * v2.x;
    out.y = v1.y * v2.y;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static multiplyScalar(v1, n, out = new Vector2()) {
    out.x = v1.x * n;
    out.y = v1.y * n;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static divide(v1, v2, out = new Vector2()) {
    out.x = v1.x / v2.x;
    out.y = v1.y / v2.y;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static divideScalar(v1, n, out = new Vector2()) {
    return Vector2.multiplyScalar(v1, 1 / n, out)
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static cross(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} out
   */
  static crossScalar(v1, n, out = new Vector2()) {
    out.x = v1.y * -n;
    out.y = v1.x * n;
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static normalize(v, out = new Vector2()) {
    const length = Vector2.magnitude(v);
    if (length == 0) return out
    out.x = v.x / length;
    out.y = v.y / length;
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static equal(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static absEqual(v1, v2) {
    return (
      Math.abs(v1.x) === Math.abs(v2.x) ||
      Math.abs(v1.y) === Math.abs(v2.y)
    )
  }
  /**
   * @param {Vector_like} v
   */
  static equalsZero(v) {
    return v.x === 0 && v.y === 0
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} out
   */
  static normal(v, out = new Vector2()) {
    return Vector2.set(out, -v.y, v.x);
  }
  /**
   * @param {Vector_like} v
   * @param {number} angle
   * @param {Vector_like} out
   */
  static rotate(v, angle, out = new Vector2()) {
    return Vector2.rotateFast(v, Math.cos(angle), Math.sin(angle), out)
  }
  /**
   * @param {Vector_like} v
   * @param {number} cos
   * @param {number} sin
   * @param {Vector_like} out
   */
  static rotateFast(v, cos, sin, out = new Vector2()) {
    const x = v.x;
    out.x = x * cos - v.y * sin;
    out.y = x * sin + v.y * cos;
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static copy(v, out = new Vector2()) {
    out.x = v.x;
    out.y = v.y;
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {number} x
   * @param {number} y
   */
  static set(v, x, y) {
    v.x = x;
    v.y = y;
    return v
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static reverse(v, out = new Vector2()) {
    return Vector2.multiplyScalar(v, -1, out)
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} normal
   * @param {Vector_like} [out]
   */
  static reflect(v, normal, out = new Vector2()) {
    const multiplier = Vector2.dot(v, normal) * 2;
    out.x = normal.x * multiplier - v.x;
    out.y = normal.y * multiplier - v.y;

    return out
  }
  /**
   * @param {Vector_like} v
   * @param {number} min
   * @param {number} max
   * @param {Vector_like} out
   */
  static clampMagnitude(v, min, max, out) {
    if (Vector2.equalsZero(v)) return Vector2.copy(v, out)
    let length = Vector2.magnitude(v);
    if (length > max)
      return Vector2.multiplyScalar(v, max / length, out)
    if (length < min)
      return Vector2.multiplyScalar(v, min / length, out)
    return Vector2.copy(v, out)
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getAbsDegBtwn(v1, v2) {
    let a = Vector2.cross(v1,v2);
    let deg = Vector2.getDegBtwn(v1, v2);
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Same as ` Vector2.getAbsDegBtwn` but returns in radians.
   * 
   * @param { Vector2 } v1 start of the angle
   * @param { Vector2 } v2 end of the angle
   * @returns {number}
   **/
  static getAbsAngleBetween(v1, v2) {
    const a = Vector2.cross(v1, v2);
    const deg = Vector2.getAngleBetween(v1, v2);

    return a < 0 ? deg : Math.PI * 2 - deg
  }
  /**
   * Gets the angle (in radians) between two
   * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getAngleBetween(v1, v2) {
    return Math.acos(Vector2.dot(v1, v2) / (Vector2.magnitude(v1) * Vector2.magnitude(v2)))
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getDegBtwn(v1, v2) {
    return Vector2.getAngleBetween(v1, v2) * 180 / Math.PI
  }
  /**
   * Returns a unit vector pointing in the
   * given angle starting from the positive x axis.
   * 
   * @param {number} radian angle in radians from 0 to `Math.PI * 2`
   * @param { Vector2} [out] Vector2 to store results in.
   * @returns { Vector2}
   */
  static fromAngle(radian, out = new Vector2()) {
    Vector2.set(out, Math.cos(radian), Math.sin(radian));
    return out
  }
  /**
   * Generates a new unit Vector2 in a random direction
   * 
   * @param { Vector2} [out]
   * @returns { Vector2}
   */
  static random(out) {
    return Vector2.fromAngle(Math.random() * TWO_PI, out)
  }
  /**
   * Returns a Vector2 that has been lerped between v1 and v2
   * @param { Vector2} v1 the vector to lerp from
   * @param { Vector2} v2 the vector to lerp from
   * @param {number} t a value from 0 to 1 to scale the new Vector2 between v1 and v2
   * @param { Vector2} [out] the vector to store results into
   * 
   * @returns { Vector2}
   */
  static lerp(v1, v2, t, out = new Vector2()) {
    Vector2.set(
      out,
      (v2.x - v1.x) * t + v1.x,
      (v2.y - v1.y) * t + v1.y
    );
    return out
  }
  /**
   * Returns the angle in radians between the positive x-axis and the vector.
   * 
   * @param { Vector2} v
   * @returns {number}
   */
  static toAngle(v) {
    let a = Math.atan2(v.y, v.x);
    return a < 0 ? TWO_PI + a : a
  }
  /**
   * @this {Vector2}
   */
  [Symbol.iterator] = function*() {
    yield this.x;
    yield this.y;
  }
  /**
   * A vector whose x and y values will remain 0.
   * 
   * @static
   * @readonly
   * @type { Vector2}
   */
  static ZERO = Object.freeze(new Vector2())
}
/**
 * @deprecated
 */
class Vector extends Vector2 {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(x, y) {
    super(x, y);
    console.error("The class `Vector` is depreciated since v0.4.13.Use Vector2 instead.");
  }
}

/**
 * @deprecated
 */
class Vec2 extends Vector2 {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(x, y) {
    super(x, y);
    console.error("The class `Vec2` is depreciated since v0.4.13.Use Vector2 instead.");
  }
}

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
class Angle {

  /**
   * Orientation in radians.
   * 
   * @type {number}
   */
  value = 0
  /**
   * @param {number} [rad=0] angle in radians.
   */
  constructor(rad = 0) {
    this.value = rad;
  }
  /**
   * The orientation in degrees.
   * @deprecated
   */
  set degree(x) {
    deprecate("Angle.degree");
    this.value = x * Math.PI / 180;
  }
  /**
   * The orientation in radians.
   * 
   * @deprecated
   */
  set radian(x) {
    deprecate("Angle().radian", "Angle().value");
    this.value = x;
  }
  get radian() {
    deprecate("Angle().radian", "Angle().value");
    return this.value
  }
  get degree() {
    deprecate("Angle().degree");
    return this.value * 180/Math.PI
  }
  /**
   * Copies the orientation of another angle.
   * 
   * @param {Angle} angle
   */
  static copy(angle) {
    this.value = angle.value;
  }
}

/**
 * A class that is used to transform positions through rotation, scaling and translation.
 */
class Matrix3x2 {
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
    deprecate("Matrix3x2().setFromTransform()","Matrix3x2.setFromTransform()");
    Matrix3x2.setFromTransform(this, x, y, rotation, scaleX, scaleY);
    return this;
  }
  /**
   * Multiplies with another matrix,
   *  A * B = C, where B is this matrix
   * 
   * @deprecated
   * @param {Matrix3x2} m
   * @returns this
   */
  prepend(m) {
    deprecate("Matrix3x2().prepend()","Matrix3x2.multiply()");
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
   * @param {Matrix3x2} m
   * @returns {this}
   */
  append(m) {
    deprecate("Matrix3x2().append()","Matrix3x2.multiply()");
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
    deprecate("Matrix3x2().rotate()","Matrix3x2.rotate()");
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
    deprecate("Matrix3x2().identity()","Matrix3x2.identity()");
    
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
    deprecate("Matrix3x2().translate()","Matrix3x2.translate()");
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
    deprecate("Matrix3x2().scale()","Matrix3x2.scale()");
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
    deprecate("Matrix3x2().transform()","Matrix3x2.transformVector2()");
    const x = v.x;

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
    deprecate("Matrix3x2().invert()","Matrix3x2.invert()");
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
   * @param {Matrix3x2} m
   * @returns this
   */
  copy(m) {
    deprecate("Matrix3x2().copy()","Matrix3x2.copy()");
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
   * @returns Matrix3x2
   */
  clone() {
    deprecate("Matrix3x2().clone()","Matrix3x2.copy()");
    return new Matrix3x2().copy(this);
  }
  /**
   * Deeply checks if a matrix is equal to another.
   * 
   * @deprecated
   * @param {Matrix3x2} matrix
   * @returns boolean
   */
  equals(matrix) {
    deprecate("Matrix3x2().equals()","Matrix3x2.equals()");
    return (this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.e === matrix.e && this.f === matrix.f);
  }
  /**
   * @param {Matrix3x2} matrix
   * @param {number} x
   * @param {number} y
   * @param {number} angle
   * @param {number} scaleX
   * @param {number} scaleY
   */
  static setFromTransform(matrix, x, y, angle, scaleX, scaleY) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    matrix.a = cos * scaleX;
    matrix.b = sin * scaleX;
    matrix.c = -sin * scaleY;
    matrix.d = cos * scaleY;
    matrix.e = x;
    matrix.f = y;

    return matrix
  }
  /**
   * @param {Matrix3x2} m1
   * @param {Matrix3x2} m2
   */
  static multiply(m1, m2, out = new Matrix3x2()) {
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
  static identity(out = new Matrix3x2()) {
    out.a = 1;
    out.b = 0;
    out.c = 0;
    out.d = 1;
    out.e = 0;
    out.f = 0;

    return out
  }
  /**
   * @param {Matrix3x2} matrix
   * @param {number} angle
   */
  static rotate(matrix, angle, out = new Matrix3x2()) {
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
   * @param {Matrix3x2} matrix
   * @param {any} x
   * @param {any} y
   */
  static translate(matrix, x, y, out = new Matrix3x2()) {
    out.a = matrix.a;
    out.b = matrix.b;
    out.c = matrix.c;
    out.d = matrix.d;
    out.e = matrix.e + x;
    out.f = matrix.f + y;

    return out;
  }
  /**
   * @param {Matrix3x2} matrix
   * @param {number} x
   * @param {number} y
   */
  static scale(matrix, x, y, out = new Matrix3x2()) {
    out.a = matrix.a * x;
    out.b = matrix.b;
    out.c = matrix.c;
    out.d = matrix.d * y;
    out.e = matrix.e;
    out.f = matrix.f;

    return out;
  };
  /**
   * @param {Matrix3x2} matrix
   * @param {Vector_like} v
   */
  static transformVector2(matrix, v, out = new Vector2()) {
    const x = v.x;

    out.x = matrix.a * x + matrix.c * v.y + matrix.e;
    out.y = matrix.b * x + matrix.d * v.y + matrix.f;

    return out;
  }
  /**
   * @param {Matrix3x2} matrix
   */
  static invert(matrix, out = new Matrix3x2()) {
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
   * @param {Matrix3x2} matrix
   */
  static copy(matrix, out = new Matrix3x2()) {
    out.a = matrix.a;
    out.b = matrix.b;
    out.c = matrix.c;
    out.d = matrix.d;
    out.e = matrix.e;
    out.f = matrix.f;

    return out;
  }
  /**
   * @this {Matrix3x2}
   */
  [Symbol.iterator] = function*() {
    yield this.a;
    yield this.b;
    yield this.c;
    yield this.d;
    yield this.e;
    yield this.f;
  }
}

const Easing = {
  /**
   * @type {EasingFunc}
   */
  linear: function(x) {
    return x;
  },
  /**
   * @type {EasingFunc}
   */
  quadraticIn: function(x) {
    return x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quadraticOut: function(x) {
    return x * (2 - x);
  },
  /**
   * @type {EasingFunc}
   */
  quadraticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x;
    }
    return -0.5 * (--x * (x - 2) - 1);
  },
  /**
   * @type {EasingFunc}
   */
  cubicIn: function(x) {
    return x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  cubicOut: function(x) {
    return --x * x * x + 1;
  },
  /**
   * @type {EasingFunc}
   */
  cubicInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x + 2);
  },
  /**
   * @type {EasingFunc}
   */
  quarticIn: function(x) {
    return x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quarticOut: function(x) {
    return 1 - --x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quarticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x;
    }
    return -0.5 * ((x -= 2) * x * x * x - 2);
  },
  /**
   * @type {EasingFunc}
   */
  quinticIn: function(x) {
    return x * x * x * x * x;
  },
  /**
   * @type {EasingFunc}
   */
  quinticOut: function(x) {
    return --x * x * x * x * x + 1;
  },
  /**
   * @type {EasingFunc}
   */
  quinticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x * x * x + 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalIn: function(x) {
    return 1 - Math.sin(((1.0 - x) * Math.PI) / 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalOut: function(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  /**
   * @type {EasingFunc}
   */
  sinusoidalInOut: function(x) {
    return 0.5 * (1 - Math.sin(Math.PI * (0.5 - x)));
  },
  /**
   * @type {EasingFunc}
   */
  exponentialIn: function(x) {
    return x === 0 ? 0 : Math.pow(1024, x - 1);
  },
  /**
   * @type {EasingFunc}
   */
  exponentialOut: function(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  /**
   * @type {EasingFunc}
   */
  exponentialInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    if ((x *= 2) < 1) {
      return 0.5 * Math.pow(1024, x - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (x - 1)) + 2);
  },
  /**
   * @type {EasingFunc}
   */
  circularIn: function(x) {
    return 1 - Math.sqrt(1 - x * x);
  },
  /**
   * @type {EasingFunc}
   */
  circularOut: function(x) {
    return Math.sqrt(1 - --x * x);
  },
  /**
   * @type {EasingFunc}
   */
  circularInOut: function(x) {
    if ((x *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - x * x) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
  },
  /**
   * @type {EasingFunc}
   */
  elasticIn: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return -Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
  },
  /**
   * @type {EasingFunc}
   */
  elasticOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return Math.pow(2, -10 * x) * Math.sin((x - 0.1) * 5 * Math.PI) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  elasticInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    x *= 2;
    if (x < 1) {
      return -0.5 * Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  backIn: function(x) {
    var s = 1.70158;
    return x === 1 ? 1 : x * x * ((s + 1) * x - s);
  },
  /**
   * @type {EasingFunc}
   */
  backOut: function(x) {
    var s = 1.70158;
    return x === 0 ? 0 : --x * x * ((s + 1) * x + s) + 1;
  },
  /**
   * @type {EasingFunc}
   */
  backInOut: function(x) {
    var s = 1.70158 * 1.525;
    if ((x *= 2) < 1) {
      return 0.5 * (x * x * ((s + 1) * x - s));
    }
    return 0.5 * ((x -= 2) * x * ((s + 1) * x + s) + 2);
  },
  /**
   * @type {EasingFunc}
   */
  bounceIn: function(x) {
    return 1 - Easing.bounceOut(1 - x);
  },
  /**
   * @type {EasingFunc}
   */
  bounceOut: function(x) {
    if (x < 1 / 2.75) {
      return 7.5625 * x * x;
    }
    else if (x < 2 / 2.75) {
      return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75;
    }
    else if (x < 2.5 / 2.75) {
      return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375;
    }
    else {
      return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
    }
  },
  /**
   * @type {EasingFunc}
   */
  bounceInOut: function(x) {
    if (x < 0.5) {
      return Easing.bounceIn(x * 2) * 0.5;
    }
    return Easing.bounceOut(x * 2 - 1) * 0.5 + 0.5;
  },
};

const Interpolation = {
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} t
   * 
   * @returns {number}
   */
  Linear: function(p0, p1, t) {
    return (p1 - p0) * t + p0
  },
  //Todo - remove this Bernstein and Factorial.
  Bernstein: function(/** @type {number} */ n, /** @type {number} */ i) {
    const fc = Interpolation.Factorial;

    return fc(n) / fc(i) / fc(n - i)
  },
  Factorial: (function() {
    const a = [1];

    return function(/** @type { number} */ n) {
      let s = 1;

      if (a[n]) {
        return a[n]
      }

      for (let i = n; i > 1; i--) {
        s *= i;
      }

      a[n] = s;
      return s
    }
  })(),
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} p2
   * @param {number} p3
   * @param {number} t
   * 
   * @returns {number}
   */
  CatmullRom: function(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;

    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
  },
  /**
   * @param {number} p0
   * @param {number} p1
   * @param {number} t
   */
  cosine(p0, p1, t) {
    const c = (1 - Math.cos(t * 3.1415927)) * .5;
    return (1 - c) * p0 + c * p1
  }
};

/**
 * Checks if two AABB overlap
 * 
 * @param {BoundingBox} a
 * @param {BoundingBox} b
 */
function AABBColliding(a, b) {
  return (
    a.min.x <= b.max.x &&
    a.max.x >= b.min.x &&
    a.min.y <= b.max.y &&
    a.max.y >= b.min.y
  )
}
/**
 * Checks if two BoundingCircles overlap
 * 
 * @param {BoundingCircle} a
 * @param {BoundingCircle} b
 */
function boundSpheresColliding(a, b) {
  const distance = (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) +
    (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y);
  return distance < a.r * a.r + b.r * b.r;
}
/**
 * Checks if An AABB and a CircleBound overlap
 * 
 * @param {BoundingBox} a
 * @param {BoundingCircle} b
 */
function AABBvsSphere(a, b) {
  const x = Math.max(a.min.x, Math.min(b.pos.x, a.max.x));
  const y = Math.max(a.min.y, Math.min(b.pos.y, a.max.y));
  const distance =
    (x - b.pos.x) * (x - b.pos.x) +
    (y - b.pos.y) * (y - b.pos.y);

  return distance < b.r * b.r;
}
/**
 * Checks if any AABB or/and a BoundingCircle overlap
 * 
 * @param {BoundingBox | BoundingCircle} bound1
 * @param {BoundingCircle | BoundingBox} bound2
 */
function boundsColliding(bound1, bound2) {
  if (bound1.type === BoundType.BOX && bound2.type === BoundType.BOX)
    // @ts-ignore
    return AABBColliding(bound1, bound2)
  if (bound1.type === BoundType.CIRCLE && bound2.type === BoundType.CIRCLE)
    // @ts-ignore
    return boundSpheresColliding(bound1, bound2)
  if (bound1.type === BoundType.CIRCLE)
    // @ts-ignore
    return AABBvsSphere(bound2, bound1)
  // @ts-ignore
  return AABBvsSphere(bound1, bound2)
}

const BoundType = {
  BOX: 0,
  CIRCLE: 1,
};

/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
class BoundingBox {
  type = BoundType.BOX
  /**
   * The upper limit of the bounding box
   * 
   * @type {Vector_like}
   */
  max
  /**
   * The lower limit of the bounding box
   * 
   * @type {Vector_like}
   */
  min
  /**
   * @param {number} [minX=0]
   * @param {number} [minY=0]
   * @param {number} [maxX=0]
   * @param {number} [maxY=0]
   */
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    this.max = {
      x: maxX,
      y: maxY
    };
    this.min = {
      x: minX,
      y: minY
    };
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param {BoundingCircle | BoundingBox} bound the bound to check  intersection with
   * @returns boolean
   **/
  intersects(bound) {
    deprecate("BoundingBox().intersects()", "boundsColliding()");
    if (bound.type === BoundType.CIRCLE)
      // @ts-ignore
      return AABBvsSphere(this, bound)
    // @ts-ignore
    return AABBColliding(this, bound)
  }
  /**
   * @deprecated
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    deprecate("BoundingBox().translate()", "BoundingBox.translate()");
    return BoundingBox.translate(this,x,y,this)
  }
  /**
   * Deep copies a bounding box to a new one.
   * 
   * @deprecated
   * @returns {BoundingBox}
   */
  clone() {
    deprecate("BoundingBox().clone()", "BoundingBox.copy()");
    return BoundingBox.copy(this)
  }
  /**
   * Deep copies another bounding box.
   * 
   * @deprecated
   * @param {BoundingBox} bounds
   */
  copy(bounds) {
    deprecate("BoundingBox().copy()", "BoundingBox.copy()");
    BoundingBox.copy(bounds,this);
  }
  /**
   * @param {BoundingBox} bound
   */
  static copy(bound,out = new BoundingBox()){
    out.min.x = bound.min.x;
    out.min.y = bound.min.y;
    out.max.x = bound.max.x;
    out.max.y = bound.max.y;
    
    return out
  }
  /**
   * @param {BoundingBox} bound
   * @param {number} x
   * @param {number} y
   */
  static translate(bound, x, y, out = new BoundingBox()) {
    out.min.x = bound.min.x + x;
    out.min.y = bound.min.y + y;
    out.max.x = bound.max.x + x;
    out.max.y = bound.max.y + y;
    
    return out
  }
  /**
   * Combines two bounds to create a new one that covers the previous two.
   * 
   * @param {BoundingBox} bound1 
   * @param {BoundingBox} bound2 
   * @param {BoundingBox} out Bound to store results into.
   * @returns BoundingBox
   */
  static union(bound1, bound2, out = new BoundingBox()) {
    out.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x;
    out.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y;
    out.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x;
    out.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y;
    
    return out
  }
}

/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
class BoundingCircle {
  type = BoundType.CIRCLE
  /**
   * 
   * @type {number}
   */
  r = 0
  /**
   * 
   * @type {Vector_like}
   */
  pos = { x: 0, y: 0 }
  /**
   * @param {number} [r]
   * @param {Vector_like} [position]
   */
  constructor(position = {x:0,y:0},r = 0) {
    this.r = r;
    this.pos = position;
  }
  /**
   * 
   * @deprecated
   * Checks to see if this intersects with another bounding box
   * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
   **/
  intersects(bound) {
    deprecate("BoundingCircle().intersects()", "boundsColliding()");
    if (bound.type === BoundType.CIRCLE)
      // @ts-ignore
      return boundSpheresColliding(this, bound)
    // @ts-ignore
    return AABBvsSphere(bound, this)
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  translate(x, y) {
    deprecate("BoundingCircle().translate()", "BoundingCircle.translate()");
    this.pos.x += x;
    this.pos.y += y;
  }
  /**
   * @param {BoundingCircle} bound
   * @param {any} x
   * @param {any} y
   */
  static translate(bound, x, y, out = new BoundingCircle()) {
    out.pos.x = bound.pos.x + x;
    out.pos.y = bound.pos.y + y;
    
    return out
  }
  /**
   * @param {BoundingCircle} bound
   */
  static copy(bound, out = new BoundingCircle()) {
    out.pos.x = bound.pos.x;
    out.pos.y = bound.pos.y;
    out.r = bound.r;

    return out
  }
}

/**
 * A color manipulation class.
 */
class Color {
  /**
   * @param {number} [r=0] - red component [0 .. 255]
   * @param {number} [g=0] - green component [0 .. 255]
   * @param {number} [b=0] - blue component [0 .. 255]
   * @param {number} [alpha=1.0] - alpha value [0.0 .. 1.0]
   */
  constructor(r = 0, g = 0, b = 0, alpha = 1.0) {
    this.set(r, g, b, alpha);
  }
  /**
   * @deprecate
   * Set this color to the specified value.
   * @param {number} r - red component [0 .. 255]
   * @param {number} g - green component [0 .. 255]
   * @param {number} b - blue component [0 .. 255]
   * @param {number} [alpha=1.0] - alpha value [0.0 .. 1.0]
   * @returns {Color} Reference to this object for method chaining
   */
  set(r, g, b, alpha = 1.0) {
    deprecate("Color().set()", "Color.set()");
    return Color.set(this, r, g, b, alpha)
  }
  /**
   * @deprecate
   * Create a new copy of this color object.
   * @returns {Color} Reference to the newly cloned object
   */
  clone() {
    deprecate("Color().clone()", "Color.copy()");
    return Color.copy(this);
  }
  /**
   * @deprecate
   * Copy a color object or CSS color into this one.
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  copy(color) {
    deprecate("Color().copy()", "Color.copy()");

    return Color.copy(color, this)
  }
  /**
   * Blend this color with the given one using addition.
   * 
   * @deprecated
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  add(color) {
    deprecate("Color().add()", "Color.add()");

    this.r = clamp(this.r + color.r, 0, 255);
    this.g = clamp(this.g + color.g, 0, 255);
    this.b = clamp(this.b + color.b, 0, 255);
    this.a = (this.a + color.a) / 2;

    return this;
  }
  /**
   * Darken this color value by 0..1
   * 
   * @deprecated
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  darken(scale) {
    deprecate("Color().darken()", "Color.darken()");

    scale = clamp(scale, 0, 1);
    this.r *= scale;
    this.g *= scale;
    this.b *= scale;

    return this;
  }
  /**
   * Lighten this color value by 0..1
   * 
   * @deprecated
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  lighten(scale) {
    deprecate("Color().lighten()", "Color.lighten()");

    scale = clamp(scale, 0, 1);
    this.r = clamp(this.r + (1 - this.r) * scale, 0, 1);
    this.g = clamp(this.g + (1 - this.g) * scale, 0, 1);
    this.b = clamp(this.b + (1 - this.b) * scale, 0, 1);

    return this;
  }
  /**
   * Linearly interpolate between this color and the given one.
   * @deprecated
   * @param {Color} color
   * @param {number} alpha - with alpha = 0 being this color, and alpha = 1 being the given one.
   * @returns {Color} Reference to this object for method chaining
   */
  lerp(color, alpha) {
    deprecate("Color().lerp()", "Color.lerp()");

    alpha = clamp(alpha, 0, 1);
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;

    return this;
  }
  /**
   * Generate random r,g,b values for this color object
   * @deprecated
   * @param {number} [min=0] - minimum value for the random range
   * @param {number} [max=255] - maxmium value for the random range
   * @returns {Color} Reference to this object for method chaining
   */
  random(min = 0, max = 255) {
    deprecate("Color().random()", "Color.random()");

    if (min < 0) {
      min = 0;
    }
    if (max > 255) {
      max = 255;
    }

    return this.set(
      rand(min, max),
      rand(min, max),
      rand(min, max),
      this.a
    );
  }
  /**
   * @param {number[]} array
   */
  toArray(array, offset = 0) {
    deprecate("Color().toArray()");

    array[offset] = this.r;
    array[offset + 1] = this.g;
    array[offset + 2] = this.b;
    array[offset + 3] = this.a;

    return array
  }
  static random(min = 0, max = 255, out = new Color()) {
    return Color.set(
      out,
      rand(min, max),
      rand(min, max),
      rand(min, max)
    );
  }
  /**
   * @param {Color} color
   * @param {number} r
   * @param {number} g
   * @param {number} b
   */
  static set(color, r, g, b, a = 1.0) {
    color.r = r;
    color.g = g;
    color.b = b;
    color.a = a;
    return color;
  }
  /**
   * @param {Color} color
   */
  static copy(color, out = new Color()) {
    return Color.set(out, color.r, color.g, color.b, color.a)
  }
  /**
   * @param {Color} color1
   * @param {Color} color2
   */
  static add(color1, color2, out = new Color()) {
    out.r = clamp(color1.r + color2.r, 0, 255);
    out.g = clamp(color1.g + color2.g, 0, 255);
    out.b = clamp(color1.b + color2.b, 0, 255);
    out.a = (color1.a + color2.a) / 2;

    return out;
  }
  /**
   * @param {Color} color1
   * @param {Color} color2
   */
  static sub(color1, color2, out = new Color()) {
    out.r = clamp(color1.r - color2.r, 0, 255);
    out.g = clamp(color1.g - color2.g, 0, 255);
    out.b = clamp(color1.b - color2.b, 0, 255);
    out.a = (color1.a + color2.a) / 2;

    return out;
  }
  /**
   * @param {Color} color
   * @param {number} scale
   */
  static darken(color, scale, out = new Color()) {
    scale = clamp(scale, 0, 1);

    out.r = color.r * scale;
    out.g = color.g * scale;
    out.b = color.b * scale;
    out.a = color.a;
    return this;
  }
  /**
   * @param {Color} color
   * @param {number} scale
   */
  static lighten(color, scale, out = new Color()) {
    scale = clamp(scale, 0, 1);
    out.r = clamp(color.r + (1 - color.r) * scale, 0, 1);
    out.g = clamp(color.g + (1 - color.g) * scale, 0, 1);
    out.b = clamp(color.b + (1 - color.b) * scale, 0, 1);

    return out;
  }
  /**
   * @param {Color} color1
   * @param {Color} color2
   * @param {number} t
   */
  static lerp(color1, color2, t, out = new Color()) {
    out.r += color1.r + (color1.r - color2.r) * t;
    out.g += color1.g + (color1.g - color2.g) * t;
    out.b += color1.b + (color1.b - color2.b) * t;
    out.a = color1.a + (color1.a - color2.a) * t;

    return out
  }
}

/**
 * Handles time management for the game.
 */
class Clock {
  /**
   * Last time the clock was updated
   * 
   * @private
   * @type {number}
   */
  start = performance.now()
  /**
   * @private
   * @type {number}
   */
  lastTick = 0
  /**
   * Difference between the last call in the last frame and current call.
   * 
   * @private
   * @type {number} 
   */
  dt = 0
  /**
   * Updates the clock
   * @deprecated
   * @param {number} [accumulate]
   */
  update(accumulate = performance.now()) {
    deprecate("Clock().update()", "Clock.update()");
    return Clock.update(this, accumulate)
  }
  /**
   * starts the clock
   * 
   * @param {Clock} clock
   */
  static start(clock) {
    clock.start = performance.now();
    clock.dt = 0;
  }
  /**
   * Gets the elapsed time of the clock
   * 
   * @param {Clock} clock
   */
  static getElapsed(clock) {
    return performance.now() - clock.start
  }
  /**
   * Gets the time between two frames/ticks clock
   * 
   * @param {Clock} clock
   */
  static getDelta(clock) {
    return clock.dt
  }
  /**
   * Gets the frameRate of the clock
   * 
   * @param {Clock} clock
   */
  static getFrameRate(clock) {
    return 1000 / clock.dt
  }
  /**
   * Updates the clock
   * 
   * @param {Clock} clock
   * @param {number} [accumulate]
   */
  static update(clock, accumulate = performance.now()) {
    clock.dt = accumulate - clock.lastTick;
    clock.lastTick = accumulate;
    return clock.dt / 1000
  }
}

class Noise {
  /**
   * @param {number} seed
   */
  constructor(seed = rand() * Number.MAX_SAFE_INTEGER) {
    this.seed = seed;
  }
  /**
   * @param {number} x
   */
  get1D(x) {
    x += this.seed;
    x = BigInt((x << 13) ^ x);
    x = (x * (x * x * 15731n + 789221n) + 1376312589n);
    x = parseInt(x.toString(2).slice(-31), 2);
    return 1.0 - x / 1073741824
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  get2D(x, y) {
    const intX = Math.floor(x);
    const intY = Math.floor(y);

    const tx = x - intX;
    const ty = y - intY;

    const a = this.get1D(intX + intY);
    const b = this.get1D(intX + 1 + intY);

    const c = this.get1D(intX + intY + 1);
    const d = this.get1D(intX + 1 + intY + 1);
    return Interpolation.cosine(
      Interpolation.cosine(a, b, tx),
      Interpolation.cosine(c, d, ty),
      ty
    )
  }
}

/**
 * @template T
 * An extendable object pool for optimizing performance.
 */

class Pool {
  /**
   * List of objects
   * 
   * @type T[]
  */
  _pool = []
  /**
   * @param {number} number Number of objects to create at the initialization.
   * @param {()=>T} create 
   */
  constructor(number = 100,create) {
    this._create = create;
    for (var i = 0; i < number; i++) {
      this._pool.push(this._create());
    }
  }
  /**
   * The number of objects available in the pool.
   * 
   * @type {number}
  */
  get size() {
    return this._pool.length
  }
  set size(x) {
    let d = this._pool.length - x;
    if (d < 0) {
      for (var i = d; i < 0; i++) {
        this._pool.push(this._create());
      }
      return
    }
    if (d > 0) {
      for (var i = d; i > 0; i--) {
        this._pool.pop();
      }
      return
    }
  }
  /**
   * Gives an object ownership.
   * 
   * @returns {T}
   */
  give() {
    const p = this._pool.pop();
    if (p) return p
    return this._create()
  }
  /**
   * Takes an object's ownership.
   * Do not use the taken object and remove all references of it outside otherwise you will get some wierd behaviour.
   * 
   * @param {T} obj
   */
  take(obj) {
    this._pool.push(obj);
  }
  /**
   * Creates a new object.
   * 
   * @protected
   * @returns T
  */
  create() {
    return {}
  }
}

/**
 * @template T
 */
class IndexedList {
  /**
   * @private
   * @type {Map<string,number>}
   */
  _keys = new Map()
  /**
   * @type {string[]}
   */
  _actualKeys = []
  /**
   * @private 
   * @type {T[]}
   */
  _list = []
  /**
   * @param {string} name
   */
  get(name) {
    const index = this._keys.get(name);
    if(!index)return undefined
    return this._list[index]
  }
  /**
   * @param {string} name
   * @param {T} value
   */
  set(name, value) {
    this._keys.set(name, this._list.length);
    this._list.push(value);
    this._actualKeys.push(name);
  }
  /**
   * @param {string} name
   */
  remove(name) {
    const index = this._keys.get(name);
    if(!index)return
    this._actualKeys.splice(index, 1);
    this._list.splice(index, 1);
    this._keys.delete(name);
  }
  /**
   * @returns {string[]}
   */
  keys() {
    return this._actualKeys
  }
  /**
   * @returns {T[]}
   */
  values() {
    return this._list
  }
  /**
   * @param {string} name
   */
  has(name) {
    return this._keys.has(name)
  }
}

let tmpID = 0;

/**
 * Appends the second array to the first.
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr1
 * @param {T[]} arr2
 */
function appendArr(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
}
/**
 * Clears an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 */
function clearArr(arr) {
  for (var i = arr.length; i > 0; i--) {
    arr.pop();
  }
}
/**
 * Removes a number of items at the end of an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} number
 */
function popArr(arr, number) {
  let length = arr.length;
  for (var i = length; i > length - number; i--) {
    arr.pop();
  }
}
/**
 * Removes an element by its index from an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} index
 */
function removeElement(arr, index) {
  if (index == -1) return null
  if (arr.length - 1 == index) return arr.pop()
  const temp2 = arr.pop();
  if(!temp2)return 
  arr[index] = temp2;
  return
}
/**
 * Generates a unique id when called
 * 
 * @memberof Utils
 */
function generateID() {
  return (tmpID += 1)
}

/**
 * Todo - Fix this function to add all props if no props param is given
 * Mixes the properties and methods required by an object from another object.
 * 
 *  @param {*} from the object constructor function to add methods from.
 * @param {*} to the object constructor function to add methods to.
 * @param {string[]} [props]
 */
function mixin(from, to, props = []) {
  for (let name of props) {
    to[name] = from[name];
  }
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  appendArr: appendArr,
  clearArr: clearArr,
  generateID: generateID,
  mixin: mixin,
  popArr: popArr,
  removeElement: removeElement
});

class Perf{
  _start = 0
  _time = 0
  start(){
    this._start = performance.now();
  }
  end(){
    this._time = performance.now() - this._start;
    return this._time
  }
  fps(){
    return 1000/this._time
  }
}

class Archetype {
  /**
   * @type {Map<string,any>}
   */
  components = new Map()
  /**
   * @type {string[]}
   */
  keys = []
  constructor() {
    this.components.set("entity", []);
    //this.keys.push("entity")
  }
  /**
   * @param {Entity} entity
   * @param {{[x:string]:any}} components
   */
  insert(entity, components) {
    const entities = this.getComponentLists("entity");

    for (let i = 0; i < this.keys.length; i++) {
      this.components.get(this.keys[i]).push(components[this.keys[i]]);
    }
    entities.push(entity);
    return entities.length - 1
  }
  /**
   * @param {number} index
   * @returns {Entity | undefined}
   */
  remove(index) {
    const entities = this.components.get("entity");
    for (let name in this.keys) {
      removeElement(
        this.components.get(this.keys[name]),
        index
      );
    }
    removeElement(entities, index);
    return this.components.get("entity")[index]
  }
  /**
   * @param {number} index
   * @param {{[x:string] : any}} compnames
   */
  get(index, compnames) {
    const comp = [];
    for (let i = 0; i < compnames.length; i++) {
      const list = this.getComponentLists(compnames[i]);
      if (list == void 0) {
        comp.push(null);
        continue
      }
      comp.push(
        list[index]
      );
    }
    return comp
  }
  /**
   * @param {string} name
   * @param {any[]} list
   */
  setComponentList(name, list) {
    this.components.set(name, list);
    this.keys.push(name);
  }
  /**
   * @param {string} name
   */
  getComponentLists(name) {
    return this.components.get(name)
  }
  /**
   * @param {string} name
   */
  hasComponentList(name) {
    return this.components.has(name)
  }
}
class NaiveArchTypeTable {
  /**
   * @type {Archetype[]}
   */
  list = []
  /**
   * @type {number[]}
   */
  entities = []
  constructor() {}
  /**
   * @private
   * @param {{[x:string] : any}} comps
   */
  _createArchetype(comps) {
    const archetype = new Archetype();
    for (let i = 0; i < comps.length; i++) {
      archetype.setComponentList(comps[i], []);
    }
    return this.list.push(archetype) - 1
  }
  /**
   * @private
   * @param {Archetype} archetype
   * @param {{[x:string] : any}} comps
   */
  _ArcheTypeHasOnly(archetype, comps) {
    if (comps.length !== archetype.components.size - 1) return false
    for (let i = 0; i < comps.length; i++) {
      if (!archetype.components.has(comps[i])) return false
    }
    return true
  }
  /**
   * @private
   * @param {string[]} comps
   */
  _getArchetype(comps) {
    for (let i = 0; i < this.list.length; i++) {
      if (this._ArcheTypeHasOnly(this.list[i], comps)) {
        return i
      }
    }
    return -1
  }
  /**
   * @private
   * @param {string[]} comps
   */
  _getArchetypes(comps) {
    const filtered = [];
    for (let i = 0; i < this.list.length; i++) {
      let hasComponents = true;
      for (let j = 0; j < comps.length; j++) {
        if (!this.list[i].hasComponentList(comps[j])) {
          hasComponents = false;
          break
        }
      }
      if (hasComponents)
        filtered.push(this.list[i]);
    }
    return filtered
  }
  /**
   * @param {{[x:string] : any}} components
   * @returns {Entity}
   */
  insert(components) {
    const entity = this.entities.length;
    //components.entity = entity
    const keys = [];
    for (const name in components) {
      keys.push(name);
    }
    let archindex =
      this._getArchetype(keys);
    archindex = archindex === -1 ? this._createArchetype(keys) : archindex;
    const index = this.list[archindex].insert(entity, components);
    this.entities[entity] = archindex;
    this.entities[entity + 1] = index;

    return entity
  }
  /**
   * @param {Entity} entity
   */
  remove(entity) {
    const archid = this.entities[entity];
    const tableid = this.entities[entity + 1];

    const swapped = this.list[archid].remove(tableid);
    if (swapped)
      this.entities[swapped + 1] = this.entities[entity + 1];
    this.entities[entity] = -1;
    this.entities[entity + 1] = -1;
  }
  /**
   * @param {Entity} entity
   * @param {string[]} compnames
   */
  get(entity, compnames) {
    const archid = this.entities[entity];
    const index = this.entities[entity + 1];
    if (archid === -1) return []
    return this.list[archid].get(index, compnames)
  }
  /**
   * @param {string[]} compnames
   * @param {any[]} out 
   */
  query(compnames, out = []) {
    let archetypes = this._getArchetypes(compnames);
    for (let i = 0; i < compnames.length; i++) {
      out[i] = [];
    }
    for (let i = 0; i < compnames.length; i++) {
      for (let j = 0; j < archetypes.length; j++) {
        /** @type {[]}*/
        const bin = archetypes[j].getComponentLists(compnames[i]);
        out[i].push(bin);
        /*for (let k = 0; k < bin.length; k++) {
          out[i].push(bin[k])
        }*/
      }
    }
    return out
  }
  clear() {
    this.list = [];
  }
}

/**
 * This class manages all events by a game manager.
 * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
 */
class EventDispatcher {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type Object<string,function[]>
   */
  handlers = {}
  /**
   * @private
   * @type Object<string,any>
  */
  events = {}
  /**
   * This fires all event handlers of a certain event.
   * 
   * @param {string} n the name of event fired.
   * @param {any} data The payload of the event.
   */
  trigger(n, data) {
    this.addEvent(n,data);
    if (n in this.handlers)
      this.handlers[n].forEach(h => h(data));
  }
  /**
   * Adds an event handler to an event dispatcher.
   * 
   * @param {string} name name of the event.
   * @param {EventHandlerFunc} handler Function to be called when the event is triggered.
   */
  add(name, handler) {
    if (name in this.handlers) {
      this.handlers[name].push(handler);
      return
    }
    this.handlers[name] = [handler];
  }
  /**
   * @param {string} n
   * @param {any} data
   */
  addEvent(n,data){
    this.events[n] = data;
  }
  /**
   * @param {string} n
   */
  getEvent(n){
    return this.events[n]
  }
  clear(){
    for (const name in this.events) {
      delete this.events[name];
    }
  }
}

/**
 * @callback EventHandlerFunc
 * @param {any} data 
 * 
 * @returns {void}
*/

/**
 * This handles events created by the DOM.
 */
class DOMEventHandler {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type {Record<string,function[]>}
   */
  handlers = {}
  /**
   * A dictionary of the main callback functions
   * 
   * @private
   * @type Object<keyof DocumentEventMap,function>
   */
  _evHandlers = {}
  /**
   * Adds an eventlistener.
   * 
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  add(e, h) {
    if (this.handlers[e])
      return this.handlers[e].push(h)
    this.handlers[e] = [h];
    let listener = (/** @type {Event} */ event) => {
      let handlers = this.handlers[e];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](event);
      }
    };
    document.addEventListener(e, listener);
    this._evHandlers[e] = listener;
  }
  /**
   * Removes an eventlistener.
   * 
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  remove(e, h) {
    this.handlers[e].splice(this.handlers[e].indexOf(h), 1);
    if (!this.handlers[e].length)
      this.disposeEvent(e);
  }
  /**
   * Removes all eventlisteners of an event.
   * 
   * @param {keyof DocumentEventMap} e Name of the DOMEvent.
   */
  disposeEvent(e) {
    document.removeEventListener(e, this._evHandlers[e]);
    delete this.handlers[e];
    delete this._evHandlers[e];
  }
  /**
   * Clears all eventlisteners of every event registered.
   */
  clear() {
    for (const ev in this.handlers) {
      // @ts-ignore
      this.disposeEvent(ev);
    }
  }
  /* 
  Donno why this is here,but i do know past me has a reason for this being here.
  Ill leave it for now.
  */
  init() {}
}

/**
 * This provides a way to fire off an entity's collision event handler registered to it.
 * 
 * @param {Manifold[]} clmds an array of collision manifolds
*/
function defaultCollisionHandler(clmds) {
  let a, b;
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].bodyA.entity.getHandler("collision");
    b = clmds[i].bodyB.entity.getHandler("collision");

    if (a) a(
      clmds[i].bodyA.entity,
      clmds[i].bodyB.entity,
      clmds[i]
    );
    if (b) b(
      clmds[i].bodyB.entity,
      clmds[i].bodyA.entity,
      clmds[i]
    );
  }
}

/**
 * This provides a way to fire off an entity's precollision event handler registered to it
 * 
 * @param {CollisionPair[]} clmds an array of collision manifolds
*/
function defaultPrecollisionHandler(clmds) {
  let a, b;
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].a.entity.getHandler("precollision");
    b = clmds[i].b.entity.getHandler("precollision");

    if (a) a(
      clmds[i].a.entity,
      clmds[i].b.entity,
      clmds[i]
    );
    if (b) b(
      clmds[i].b.entity,
      clmds[i].a.entity,
      clmds[i]
    );
  }
}

/**@enum {string}*/
const Events = {
  COLLISION : "collision",
  PRECOLLISION : "precollision",
  PREUPDATE : "preupdate",
  POSTUPDATE : "postupdate",
   UPDATE : "postupdate",  
   INITIALIZE : "init",
   ADD : "add",
   REMOVE : "remove",
   PAUSE : "pause",
   PLAY : "play"
};

/**
 * @template T
 */
class Signal {
  /**
   * @type {signalListener<T>[]}
   */
  _listeners = []
  /**
   * @type {T}
   */
  _value
  /**
   * @param {T} value
   */
  constructor(value) {
    this._value = value;
  }
  /**
   * @type {T}
   */
  get value() {
    return this._value
  }
  set value(x) {
    this._value = x;
    for (var i = 0; i < this._listeners.length; i++) {
      this._listeners[i](this.value);
    }
  }
  /**
   * @param {signalListener<T>} listener
   * @param {boolean} callOnce
   */
  addListener(listener, callOnce = false) {
    this._listeners.push(listener);
  }
  /**
   * @param {signalListener<T>} listener
   */
  removeListener(listener) {
    for (var i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i] == listener)
        return this._detach(i)
    }
  }
  /**
   * @private
   * @param {number} bindingIndex
   */
  _detach(bindingIndex) {
    this._listeners.splice(bindingIndex, 1);
  }
}

/**
 * @template T
 * @callback signalListener
 * @param {T} value
 * @returns {void}
 */

/**
 * @template T
 */
class Query {
  /**
   * @type {string[]}
   */
  type = []
  /**
   * @type {number}
   */
  number = 0
  /**
   * @type {T | null}
   */
  components = null
  /**
   * @param {string[]} componentTypes
   */
  constructor(...componentTypes) {
    this.type = componentTypes;
    this.number = componentTypes.length;
  }
  raw() {
    return this.components
  }
  /**
   * @param {(comp:T)=>void} callback
   */
  each(callback) {
    const components = new Array(this.number);
    if (!this.components) return
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = 0; l < this.number; l++) {
          components[l] = this.components[l][j][k];
        }
        callback(...components);
      }
    }
  }
  single() {
    const components = new Array(this.number);
    
    assert(this.components && this.components[0][0] && this.components[0][0][0], `No entity with component types of \"${ this.type.join("\",\"")}\" found on \`Query().single()\``);

    for (let i = 0; i < this.number; i++) {
      components[i] = this.components[i][0][0];
    }
    return components
  }
}

/**
 * @typedef {import("typescript").TupleType} Tuple
 */

class Manager {
  /**
   * RAF number of current frame.Used for pausing the manager.
   * 
   * @private
   * @type {number}
   */
  _rafID = 0
  /**
   * @private
   */
  _table = new NaiveArchTypeTable()
  /**
   * 
   * @private
   * @type {SystemFunc[]}
   */
  _systems = []
  /**
   * 
   * @private
   * @type {boolean}
   */
  _initialized = false
  /**
   * @private
   * @type {Record<string,any>}
   */
  _resources = {}
  /**
   * Whether or not the manager is playing.
   * 
   * @type {boolean}
   */
  playing = false
  /**
   * 
   * @private
   * @type {Clock}
   */
  clock = new Clock()
  /**
   * 
   * @private
   * @type {number}
   */
  _accumulator = 0
  /**
   * Ideal framerate of the manager.Not implemented corrretly.
   * TODO correct it
   * 
   * @type {number}
   */
  frameRate = 0
  /**
   * @readonly
   * @type {EventDispatcher}
   */
  events = new EventDispatcher()
  /**
   * @private
   * @param {number} accumulate
   */
  _update = accumulate => {
    const dt = Clock.update(this.clock, accumulate);

    if (this._accumulator < this.frameRate) {
      this._accumulator += dt;
      this.RAF();
      return
    }
    this.events.trigger("updateStart", dt);
    this.update(dt);
    this._accumulator = 0;
    this.events.trigger("update", dt);
    this.events.trigger("updateEnd", dt);
    this.RAF();
  }
  /**
   * Creates a new instance of Manager class
   * @param {ManagerOptions} options
   **/
  constructor(options = {
    autoplay: true
  }) {
    options = Object.assign({
      autoplay: true,
    }, options);
    this.init();
    if (options.autoplay) this.play();
  }
  /**
   * This initializes the manager.
   * No need to call this function directly.
   * This is called after the preloader finishes loading all its files.
   * 
   */
  init() {
    this.events.trigger("init", this);
    this._initialized = true;
    if (this.playing) this.play();
  }

  /**
   * Adds an entity to the manager and initializes it.
   * 
   * @param {Record<string,any>} components The entity to add
   */
  create(components) {
    const entity = this._table.insert(components);
    this.events.trigger("add", {
      entity,
      components
    });
    return entity
  }
  /**
   * @template {Object} T
   * @param {T[]} entities
   */
  createMany(entities){
    for (let i = 0; i < entities.length; i++) {
      this.create(entities[i]);
    }
  }
  /**
   * Removes an entity from the manager.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} entity The entity to remove
   */
  remove(entity) {
    this.events.trigger("remove", entity);
    this._table.remove(entity);
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { string[]  } compNames
   * @returns {T}
   */
  get(entity, ...compNames) {
    // @ts-ignore
    return this._table.get(entity, compNames)
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { T } components
   */
  set(entity, components) {
    throw "not implemented yet"
  }
  /**
   * @template T
   * @param { string[]  } compNames
   * @returns {Query<T>}
   */
  query(...compNames) {
    const query = new Query(...compNames);
    query.components = this._table.query(compNames);
    return query
  }
  /**
   * @param {string} name
   */
  queryEvent(name) {
    return this.events.getEvent(name)
  }
  /**
   * @template T
   * @param {string} name
   * @returns {T}
   */
  getResource(name) {
    return this._resources[name]
  }
  /**
   * @template T
   * @param {string} name
   * @param {T} resource
   */
  setResource(name, resource) {
    this._resources[name] = resource;
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    this.events.trigger("clear", this);
    this._table.clear();
  }
  /**
   * This method requests an animation frame from the browser
   * 
   * @private
   */
  RAF() {
    this._rafID = requestAnimationFrame(this._update);
  }
  /**
   * This starts up the update loop of the manager
   */
  play() {
    if (!this._initialized) {
      this.playing = true;
      return
    }
    this.RAF();
    this.events.trigger("play", this);
  }
  /**
   * This stops the update loop of the manager
   */
  pause() {
    if (!this._initialized) {
      this.playing = false;
      return
    }
    cancelAnimationFrame(this._rafID);
    this.events.trigger("pause", this);
  }
  /**
   * Marches the update loop forward,updating
   * the systems
   * You shouldn't mess with this/call it or everything will explode with undetectable Loggerors.
   * 
   * @private
   */
  update(dt = 0.016) {
    const systems = this._systems;
    this.setResource("delta",dt);
    for (let i = 0; i < systems.length; i++) {
      systems[i](this);
    }
  }
  /**
   * Used to register a system
   *
   * @param {SystemFunc} sys The system to be addad
   * 
   */
  registerSystem(sys) {
    this._systems.push(sys);
  }
  /**
   * @param {Plugin} plugin
  */
  registerPlugin(plugin){
    plugin.register(this);
  }
}

/**
 * @callback SystemFunc
 * @param {Manager} manager
 * @returns {void}
 */
/**
 * @typedef ManagerOptions
 * @property {boolean} autoplay
 */
 /**
  * @typedef Plugin
  * @property {SystemFunc} register
 */

/**
 * Component responsible for animations.
 * 
 * @template T
 */
class Tween {
  /**
   * @type {number}
   */
  _duration = 0
  /**
   * @type {boolean}
   */
  _repeat = false
  /**
   * @type {boolean}
   */
  active = false
  /**
   * @type {T}
   * @private
   */
  _to
  /**
   * @type {T}
   * @private
   */
  _from
  /**
   * @type {T}
   * @private
   */
  _into
  /**
   * @type {LerpFunc}
   * @private
   */
  _interpolationFunc = Interpolation.Linear
  /**
   * @type {EasingFunc}
   * @private
   */
  _easingFunction = Easing.linear
  /**
   * @type {number}
   * @private
   */
  _timeTaken = 0
  /**
   * @type {TweenUpdate<T>}
   * @private
   */
  _updateFunc = NoUpdateThrow
  /**
   * @type {Tween<T> | null}
   * @private
   */
  _next = null
  /**
   * @param {T} into
   * @param {T} to
   * @param {T} from
   */
  constructor(to,from,into) {
    this._into = into;
    this._to = to;
    this._from = from;
  }
  /**
   * @param {T} x
   */
  to(x) {
    this._to = x;
    return this
  }
  /**
   * @param {T} x
   */
  from(x) {
    this._from = x;
    return this
  }
  /**
   * @param {number} t
   */
  duration(t) {
    this._duration = t;
    return this
  }
  repeat() {
    this._repeat = true;
    return this
  }
  play() {
    this._timeTaken = 0;
    this.active = true;
  }
  stop() {
    this.active = false;
  }
  /**
   * @param {TweenUpdate<T>} callback
   */
  onUpdate(callback) {
    this._updateFunc = callback;
    return this
  }
  /**
   * @param {EasingFunc} callback
   */
  easing(callback) {
    this._easingFunction = callback;
    return this
  }
  /**
   * @param {LerpFunc} callback
   */
  interpolant(callback) {
    this._interpolationFunc = callback;
    return this
  }
  /**
   * @template U
   * @param {Tween<U>} tween
   * @param {number} dt
   */
  static update(tween,dt) {
    if (!tween.active) return

    tween._timeTaken += dt;
    if (tween._timeTaken >= tween._duration) {
      if (tween._next) {
        tween.stop();
        tween._next.play();
      }
      if (tween._repeat) {
        tween._timeTaken = 0;
      } else {
        tween._timeTaken = tween._duration;
        tween.active = false;
      }
    }
    let t = tween._easingFunction(
      tween._timeTaken / tween._duration
    );
    tween._updateFunc(
      tween._interpolationFunc,
      tween._to,
      tween._from,
      t,
      tween._into
    );
  }
  /**
   * @param {Tween<T>} next
   */
  chain(next) {
    this._next = next;
    return this
  }
}
/**
 * @type {TweenUpdate<Vector2>}
 */
function Vector2Update(lerpFunc, to, from, t, into) {
  console.log(t);
  into.x = lerpFunc(from.x, to.x, t);
  into.y = lerpFunc(from.y, to.y, t);
}
/**
 * @template T
 * 
 * @type {TweenUpdate<T>}
 */
function Vector3Update(lerpFunc, to, from, t, into) {
  // @ts-ignore
  into.x = lerpFunc(from.x, to.x, t);
  // @ts-ignore
  into.y = lerpFunc(from.y, to.y, t);
  // @ts-ignore
  into.z = lerpFunc(from.z, to.z, t);
}

/**
 * @type {TweenUpdate<Color>}
 */
function ColorUpdate(lerpFunc, to, from, t, into) {
  into.r = lerpFunc(from.r, to.r, t);
  into.g = lerpFunc(from.g, to.g, t);
  into.b = lerpFunc(from.b, to.b, t);
  into.a = lerpFunc(from.a, to.a, t);
}
/**
 *
 * @type {TweenUpdate<Angle>}
 */
function AngleUpdate(lerpFunc, to, from, t, into) {
  into.value = lerpFunc(from.value, to.value, t);
}
/**
 * @type {TweenUpdate<any>}
 */
function NoUpdateThrow(lerpFunc, to, from, t, into) {
  throw "The Tween does not have a valid onUpdate callback."
}

/**
 * @template T
 * @callback TweenUpdate
 * @param {LerpFunc} lerpFunc
 * @param {T} to
 * @param {T} from
 * @param {number} t
 * @param {T} into
 * 
 * @returns {void}
 */
 
/**
 * @callback LerpFunc
 * @param {number} p0
 * @param {number} p1
 * @param {number} t
 * @returns {number}
 */

/**
 * @template T
 */
class TweenPlugin {
  /**
   * @param {any} name
   */
  constructor(name) {
    if (!name) throws("A `TweenPlugin` should be given a name to avoid conflict with other `TweenPlugin`s");
    this.name = name;
  }
  /**
   * @param {{ setResource: (arg0: any, arg1: never[]) => void; registerSystem: (arg0: (manager: any) => void) => void; }} manager
   */
  register(manager) {
    const name = this.name;
    manager.setResource(name, []);
    manager.registerSystem(manager => {
      const dt = manager.getResource("delta");
      const tweens = manager.getResource(name);

      for (let i = 0; i < tweens.length; i++) {
        Tween.update(tweens[i], dt);
      }
    });
  }
}
/**
 * @typedef TweenPluginOptions
 * @property {string} name
 */

class Geometry {
  /**
   * @type {Vector2[]}
   */
  vertices
  /**
   * @type {Vector2[]}
   */
  normals
  /**
   * @type {Vector2[]}
   */
  _dynNormals
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices;
    this.normals = Geometry.calcFaceNormals(vertices);
    // @ts-ignore
    this._dynNormals = this.normals.map(e => Vector2.copy(e));
  }

  /**
   * @param {Geometry} geometry
   * @param {number} angle
   * @param {Vector2[]} out
   */
  static getNormals(geometry, angle, out = []) {
    for (let i = 0; i < geometry.normals.length; i++) {
      const normal = Vector2.rotate(geometry.normals[i], angle);
      // @ts-ignore
      out.push(normal);
    }
    return out
  }
  /**
   * @param {Vector2[]} vertices
   * @returns {Vector2[]}
   */
  static calcFaceNormals(vertices) {
    const axes = [];
    let previous = vertices[vertices.length - 1];
    for (let i = 0; i < vertices.length; i++) {
      const current = vertices[i];
      const axis = Vector2.sub(previous, current);
      Vector2.normal(axis, axis);
      Vector2.normalize(axis, axis);

      previous = current;
      // @ts-ignore
      if (!checkifEquals(axis, axes))
        axes.push(axis);
    }
    // @ts-ignore
    return axes
  }
  /**
   * @param {Vector2[]} vertices
   * @param {Vector2} pos
   * @param {number} angle
   * @param {Vector2} scale
   * @param {Vector2[]} out
   */
  static transform(vertices, pos, angle, scale, out) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    for (let i = 0; i < vertices.length; i++) {
      const vertex = out[i];
      Vector2.rotateFast(vertices[i], cos, sin, vertex);
      Vector2.multiply(vertex, scale, vertex);
      Vector2.add(vertex, pos, vertex);
    }
  }
}

/**
 * @param {Vector2} axis
 * @param {Vector2[]} axes
 */
function checkifEquals(axis, axes) {
  for (let i = 0; i < axes.length; i++)
    if (Vector2.absEqual(axis, axes[i]))
      return true
  return false
}

/**@enum {number}*/
const ShapeType = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
});
/**@enum {number}*/
const ObjType = Object.freeze({
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
});
/**@enum {number}*/
const BodyType = Object.freeze({
  DYNAMIC: 2,
  KINEMATIC: 1,
  STATIC: 0
});

//Default settings 
const Settings = {

  //For the world
  posDampen: 0.3,
  linearDamping: 0.001,
  angularDamping: 0.001,
  velocitySolverIterations: 10,
  fixedFrameRate: 1 / 60,
  penetrationSlop: 0.1,
  positionCorrection: true,
  warmStarting: false,
  impulseAccumulation: false,
  separationTolerance: 0.1,

  //For all bodies
  type: BodyType.DYNAMIC,
  mass: 1,
  restitution: 0.6,
  staticFriction: 1,//0.4,
  kineticFriction: 0.5,//0.2,
  boundPadding: 0,
  allowSleep: false,
  aabbDetectionOnly: false,
  collisionResponse: true,
  autoUpdateBound: true
};

/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
class Shape {
  /**
   * Used to determine what type of shape this is.
   * 
   * @type {number}
   * @readonly
   */
  type = ShapeType.POLYGON
  /**
   * @type {number}
   */
  angle = 0
  /**
   * The vertices describing the shape.
   * 
   * @type {Vector2[]}
   */
  vertices
  /**
   * Keeps the original normals and vertices of this shape
   * 
   * @type {Geometry}
   */
  geometry

  /**
   * @param { Vector2[]} vertices The vertices of the shape in local space coordinates.
   */
  constructor(vertices) {
    // @ts-ignore
    this.vertices = vertices.map(v => Vector2.copy(v));
    this.geometry = new Geometry(vertices);
  }
  /**
   * Returns the normals of the faces when rotated.
   * @param {Shape} shape
   * @param {Shape} refshape
   * @param {Vector2[]} [out] An array where results are stored.
   * @returns {Vector2[]}
   */
  static getNormals(shape, refshape, out = []) {
    if (shape.type === Shape.POLYGON) return Geometry.getNormals(shape.geometry, shape.angle, out)
    let vertex = null;
    if (refshape.type === Shape.POLYGON)
      vertex = getNearVertex(shape.vertices[0], shape.vertices);
    if (!vertex)
      vertex = refshape.vertices[0];
    const normal = Vector2.copy(vertex);
    Vector2.sub(normal, shape.vertices[0], normal);
    Vector2.normalize(normal, normal);
    // @ts-ignore
    out.push(normal);

    return out
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @template {Shape} T
   * @param {T} shape
   * @param {Vector2} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {Vector2} scale the scale of the body
   */
  static update(shape, position, angle, scale) {
    shape.angle = angle;
    if (shape.type === ShapeType.CIRCLE) {
      Vector2.copy(position, shape.vertices[0]);
      return
    }
    Geometry.transform(
      shape.geometry.vertices,
      position,
      angle,
      scale,
      shape.vertices
    );
  }

  /**
   * Returns the world coordinates of the vertices.
   * @template {Shape} T
   * @param {T} shape
   * @param { Vector2 } axis
   * @param { Vector2[] } out
   * @returns { Vector2[] }
   */
  static getVertices(shape, axis, out = []) {
    if (shape.type === Shape.POLYGON)
      return shape.vertices

    const v1 = Vector2.multiplyScalar(axis, -shape.vertices[1].x);
    const v2 = Vector2.multiplyScalar(axis, shape.vertices[1].x);

    Vector2.add(v1, shape.vertices[0], v1);
    Vector2.add(v2, shape.vertices[0], v2);
    
    // @ts-ignore
    out[0] = v1;
    // @ts-ignore
    out[1] = v2;

    return out
  }
  /**
   * TODO - Actually implement this
   * @param {Shape} shape
   */
  static getArea(shape){
    if(shape.type === Shape.POLYGON){
      return 0
    }
    return 0
  }
  /**
   * Calculates the inertia of a given shape.
   * 
   * @param {Shape} shape
   * @param {number} mass
   * @returns {number}
   */
  static calcInertia(shape, mass) {
    const vertices = shape.vertices;
    if (shape.type === Shape.CIRCLE) {
      const radius = vertices[1].x;
      return mass * (radius * radius) * 0.5
    }
    const vertexCount = vertices.length;
    let numerator = 0.0;
    let denominator = 0.0;
    let i = vertexCount - 1;
    for (let j = 0; j < vertexCount; ++j) {
      const v1 = vertices[i];
      const v2 = vertices[j];
      const crs = Math.abs(Vector2.cross(v1, v2));
      numerator += crs * (Vector2.dot(v2, v2) + Vector2.dot(v1, v2) + Vector2.dot(v1, v1));
      denominator += crs;
      i = j;
    }
    return mass * numerator / (denominator * 6.0)
  }
  static CIRCLE = 0
  static POLYGON = 1
}

/**
 * @param {Vector2} position
 * @param {Vector2[]} vertices
 */
function getNearVertex(position, vertices) {
  let vertex = Vector2.ZERO;
  let min = -Infinity;
  for (let i = 0; i < vertices.length; i++) {
    const a = Vector2.distanceToSquared(vertices[i], position);
    if (min > a) {
      vertex = vertices[i];
      min = a;
    }
  }
  return vertex
}

class Line extends Shape {
  /**
   * @param {number} length
   */
  constructor(length) {
    const start = new Vector2(length / 2);
    const end = new Vector2(-length / 2);
    super([start, end]);
  }
}

/**
 * A circular shape.
 * 
 * 
 * @augments Shape
 */
class Circle extends Shape {
  type = Shape.CIRCLE
  /**
   * @param {number} radius 
   */
  constructor(radius) {
    //the first vertex is position
    //the second vertex x-position is radius
    //
    super([
      new Vector2(),
      new Vector2(radius, radius)
    ]);
  }
  get position() {
    return this.vertices[0]
  }
  get radius() {
    return this.vertices[1].x
  }
  set radius(x) {
    //this.vertices[1].x = x
  }
  get area() {
    return Math.PI * this.radius * this.radius
  }
}

class Rectangle extends Shape {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    let v1 = new Vector2(-width / 2, -height / 2);
    let v2 = new Vector2(-width / 2, height / 2);
    let v3 = new Vector2(width / 2, height / 2);
    let v4 = new Vector2(width / 2, -height / 2);
    super([v1, v2, v3, v4]);
  }
}

/**
 * A triangular shape.
 * 
 * @augments Shape
 */
class Triangle extends Shape {
  /**
   * @param {number} base Length of one side.
   * @param {number} height Length of a second side.
   * @param {number} angle The angle between the two sides.
   */
  constructor(base, height, angle) {
    angle = clamp(angle,1,179);
    
    const l1 = new Vector2(base);
    const l2 = Vector2.fromAngle(angle);
    Vector2.multiplyScalar(l2,-height / Math.sin(angle),l2);
    
    const center = new Vector2(-(l1.x + l2.x) / 3,-l2.y / 3);
    super([
      center,
      // @ts-ignore
      Vector2.add(l1,center,l1),
      // @ts-ignore
      Vector2.add(l2,center,l2)
    ]);
  }
}

/**
 * Holds information needed for collision detection and response.
 * 
 */
class Body2D {
  /**
   * Unique identification of a body.
   * 
   * @readonly
   * @type {number}
   */
  id = generateID()
  /**
   * Inverse mass of the body.
   * 
   * @type {number}
   */
  inv_mass = 0
  /**
   * Inverse inertia of the body.
   * 
   * @type {number}
   */
  inv_inertia = 0
  /**
   * The bounciness of the body between 0 and 1.
   * 
   * @type {number}
   * @default Settings.restitution
   */
  restitution = Settings.restitution
  /**
   * The friction of the body between 0 and 1 that affects it before it moves.
   * 
   * @type {number}
   * @default Settings.staticFriction
   */
  staticFriction = Settings.staticFriction
  /**
   * The friction of the body between 0 and 1that affects it after it moves.
   * 
   * @type {number}
   * @default Settings.kineticFriction
   */
  kineticFriction = Settings.kineticFriction
  /**
   * The padding of the body's bounds.
   * 
   * @type {number}
   * @default Settings.boundPadding
   */
  boundPadding = Settings.boundPadding
  /**
   * Used to describe how bodies will collide with each other.
   * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
   * Bodies in the same group will not collied with each other.
   * 
   * @type {{layer:number, group: number}}
   * @default -1
   */
  mask = {
    layer: 0,
    group: 0
  }
  /**
   * The shape of the body.
   * 
   * @readonly
   * @type {Shape}
   */
  shape
  /**
   * Whether the body should sleep when at rest or not.
   * 
   * @type {boolean}
   * @default Settings.allowSleep
   */
  allowSleep = Settings.allowSleep
  /**
   * If the body is asleep or not.
   * 
   * @type {boolean}
   */
  sleeping = false
  /**
   * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
   * 
   * @type {boolean}
   * @default Settings.aabbDetectionOnly
   */
  aabbDetectionOnly = Settings.aabbDetectionOnly
  /**
   * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
   * 
   * @type {boolean}
   * @default Settings.collisionResponse
   */
  collisionResponse = Settings.collisionResponse
  /**
   * Whether or not the bounds should be automatically updated.
   * 
   * @type {boolean}
   * @default Settings.autoUpdateBound
   */
  autoUpdateBound = Settings.autoUpdateBound
  /**
   * @param {Shape} shape
   */
  constructor(shape) {
    Body2D.setType(this,Settings.type);
    this.shape = shape;
    Body2D.setMass(this,1);
  }
  /**
   * Type of a body.It includes the static and dynamic for now.
   * Static bodies do not move and do not react to collisions.
   * Dynamic bodies move and respond to collisions.
   * Kinematic bodies move but do not respond to collisions.
   * 
   * @deprecated
   * @example
   * @type {number}
   * let body = new Body2D()
   * body.type = Body2D.STATIC
   * 
   */
  set type(x) {
    deprecate("Body2D().type","Body2D.setType()");
    if (x === Body2D.STATIC) this.mass = 0;
  }
  get type() {
    deprecate("Body2D().type");
    return 0
  }
  /**
   * @deprecated
   * @type {number} 
   */
  set mass(x) {
    deprecate("Body2D().mass");
    this.inv_mass = x === 0 ? 0 : 1 / x;
    this.inv_inertia = 1 / Shape.calcInertia(this.shape,this.mass);
  }
  get mass() {
    deprecate("Body2D().mass");
    return 1 / this.inv_mass
  }
  /**
   * Density of a body.
   *
   * @deprecated
   * @type {number}
   */
  set density(x) {
    deprecate("Body2D().density");
    const area = Shape.getArea(this.shape);
    this.inv_mass = 1 / (x * area);
  }
  get density() {
    deprecate("Body2D().density");
    const area = Shape.getArea(this.shape);
    return this.inv_mass * 1 / area
  }
  /**
   * Rotational inertia of a body.
   * 
   * @deprecated
   * @type number
   */
  set inertia(x) {
    deprecate("Body2D().inertia");
    this.inv_inertia = x == 0 ? 0 : 1 / x;
  }
  get inertia() {
    deprecate("Body2D().inertia");
    return 1 / this.inv_inertia
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @deprecated
   * @param { Vector2} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    deprecate("Ball().setAnchor()");
    return 0
  }
  /**
   * Gets an anchor in its local space coordinate form.
   * Treat the returned value as read-only.
   * 
   * @deprecated
   * @param {number} index the position of the
   * @returns { Vector2}
   */
  getAnchor(index) {
    deprecate("Ball().getAnchor()");
    return new Vector2()
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @deprecated
   * @param {number} index The position of the anchor.
   * @param {Vector2} [target] Vector2 to store results in.
   * @returns {Vector2}
   * @param {number} angle
   */
  getLocalAnchor(index,angle,target = new Vector2()) {
    deprecate("Ball().getLocalAnchor()");
    return target
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {BoundingBox} bound
   * @param {Body2D} body Body2D to calculate max and min from
   * @param {Number} padding increases the size of the bounds
   */
  static calculateBounds(body,bound,padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER;

    const shape = body.shape;
    if (shape.type == Shape.CIRCLE) {
      const position = shape.vertices[0];
      const radius = shape.vertices[1].x;
      const idx = position.x - radius,
        idy = position.y - radius,
        mdx = position.x + radius,
        mdy = position.y + radius;
      if (!minX || idx < minX) minX = idx;
      if (!maxX || mdx > maxX) maxX = mdx;
      if (!minY || idy < minY) minY = idy;
      if (!maxY || mdy > maxY) maxY = mdy;
    } else {
      for (let j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j];
        if (vertex.x < minX) minX = vertex.x;
        if (vertex.x > maxX) maxX = vertex.x;
        if (vertex.y < minY) minY = vertex.y;
        if (vertex.y > maxY) maxY = vertex.y;
      }
    }
    bound.min.x = minX - padding;
    bound.max.x = maxX + padding;
    bound.min.y = minY - padding;
    bound.max.y = maxY + padding;
  }
  /**
   * This updates the world coordinates of shape and bounds.
   * @param {Body2D} body
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {BoundingBox} bounds
   */
  static update(body,position,orientation,scale,bounds) {
    Shape.update(body.shape,position,orientation,scale);
    if (body.autoUpdateBound)
      Body2D.calculateBounds(body,bounds);
  }
  /**
   * @param {Body2D} body
   * @param {number} mass
   */
  static setMass(body,mass) {
    body.inv_mass = mass === 0 ? 0 : 1 / mass;
    Body2D.setInertia(body,Shape.calcInertia(body.shape,mass));
  }
  /**
   * @param {Body2D} body
   * @param {number} inertia
   */
  static setInertia(body,inertia) {
    body.inv_inertia = inertia === 0 ? 0 : 1 / inertia;
  }
  /**
   * @param {Body2D} body
   * @param {number} type
   */
  static setType(body,type) {
    if (type !== Body2D.STATIC) return
    body.inv_mass = 0;
    body.inv_inertia = 0;
  }
  /**
   * @param {Body2D} body
   * @param {number} density
   */
  static setDensity(body,density) {
    const area = Shape.getArea(body.shape);
    Body2D.setMass(body,density * area);
  }
  /**
   *Body2D type that dictates a body cannot move nor respond to collisions.
   * 
   * @readonly
   * @type {number}
   */
  static STATIC = 0
  /**
   * Body2D type that dictates a body can move and respond to collisions.
   * 
   * @readonly
   * @type {number}
   */
  static DYNAMIC = 2
}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
class Body extends Body2D {
  /**
   * @inheritdoc
   * @param {Shape} shape
   */
  constructor(shape) {
    deprecate("Body()","Body2D()");
    super(shape);
  }
}

/**
 * A body with a circle shape on it.
 * 
 * @augments Body2D
 */
class Ball extends Body2D {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    super(new Circle(radius));
  }
}

/**
 * A body with a rectangle shape on it.
 * 
 * @augments Body2D
 */
class Box extends Body2D {
  /**
   * @param {number} w
   * @param {number} h
   */
  constructor(w, h) {
    super(new Rectangle(w, h));
  }
}

class Trigon extends Body2D {
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle Angle in radians
   * 
   */
  constructor(base, height, angle = Math.PI / 3) {
    super(new Triangle(base, height, angle));
  }
}

/**
 * Base class for constructing different types of constraints.
 * 
 * @abstract
 * @see DistanceConstraint
 * @see SpringConstraint
 */
class Constraint {
  /**
   * @type {Vector2}
   */
  localA = null
  /**
   * @type {Vector2}
   */
  localB = null
  /**
   * @type {Body2D}
   */
  body1 = null
  /**
   * @type {Body2D}
   */
  body2 = null
  /**:
   * @type {number}
   */
  stiffness = 50
  /**
   * @type {number}
   */
  dampening = 0.03
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    this.body1 = body1;
    this.body2 = body2;
    this.localA = localA || new Vector2();
    this.localB = localB || new Vector2();
  }
  /**
   * Determine type of object this is in the world.
   * 
   * @package
   * @type number
   */
  get physicsType() {
    return ObjType.CONSTRAINT
  }
  /**
   * Will refactor this out later.
   * 
   * @protected
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {number} dt
   */
  behavior(body1, body2, dt) {
    body2.position.copy(body1.position);
  }
  /**
   * Updates constraint forces
   *
   * @param {number} dt
   */
  update(dt) {
    this.behavior(this.body1, this.body2, dt);
  }
}

let tmp1$7 = new Vector2(),
  tmp2$4 = new Vector2(),
  tmp3$2 = new Vector2(),
  tmp4$2 = new Vector2(),
  tmp5$2 = new Vector2();

/**
 * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
 */
class DistanceConstraint extends Constraint {
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2,localA,localB);
    this.fixed = !body1.mass || !body2.mass;
    this.dampening = 1;
    this.maxDistance = 1;
    this.stiffness = 1;
  }
  /**
   * @inheritdoc
   * 
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {number} dt
  */
  behavior(body1, body2,dt) {
    let arm1 = tmp1$7.copy(this.localA),
      arm2 = tmp2$4.copy(this.localB),
      pos1 = tmp3$2.copy(body1.position).add(arm1),
      pos2 = tmp4$2.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude();

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampening),
      massTotal = body1.inv_mass + body2.inv_mass;
      //inertiaTotal = body1.inv_inertia + body2.inv_inertia
    tmp4$2.copy(force);
    force.divide(massTotal * 2);

    body1.velocity.add(tmp5$2.copy(force).multiply(-body1.inv_mass).divide(dt));
    body2.velocity.add(tmp5$2.copy(force).multiply(body2.inv_mass).divide(dt));

    body1.position.add(tmp5$2.copy(force).multiply(-body1.inv_mass));
    body2.position.add(tmp5$2.copy(force).multiply(body2.inv_mass));

    body1.rotation.value += tmp4$2.cross(arm1) * body1.inv_inertia;
    body2.rotation.value += tmp4$2.cross(arm2) * -body2.inv_inertia;
  }
}

let tmp1$6 = new Vector2(),
  tmp2$3 = new Vector2(),
  tmp3$1 = new Vector2(),
  tmp4$1 = new Vector2(),
  tmp5$1 = new Vector2(),
  zero = new Vector2();
 /**
  * A constraint that acts like a spring between two bodies
 */
class SpringConstraint extends Constraint {
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2);
    this.localA = new Vector2().copy(localA || zero);
    this.localB = new Vector2().copy(localB || zero);
    this.fixed = !body1.mass || !body2.mass;
    this.dampening = 1;
    this.maxDistance = 100;
    this.stiffness = 1;
  }
    /**
   * @inheritdoc
   * 
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {number} dt
  */
  behavior(body1, body2, dt) {
    let arm1 = tmp1$6.copy(this.localA),
      arm2 = tmp2$3.copy(this.localB),
      pos1 = tmp3$1.copy(body1.position).add(arm1),
      pos2 = tmp4$1.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude();

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampeninging),
      massTotal = body1.inv_mass + body2.inv_mass,
      inertiaTotal = body1.inv_inertia + body2.inv_inertia;
      force.divide(massTotal + inertiaTotal);
      body1.velocity.add(tmp5$1.copy(force).multiply(-body1.inv_mass));
      body2.velocity.add(tmp5$1.copy(force).multiply(body2.inv_mass));
      
      body1.rotation.value += force.cross(arm1) * body1.inv_inertia;
      body2.rotation.value += force.cross(arm2) * -body2.inv_inertia;
  }
}

/**
 * This is an abstract class that extended to classes that are used to filter out unnecessary collision checks to boost performance.
 * 
 * @abstract
 * @see QuadtreeBroadphase
 * @see GridBroadphase
 * @see AABBBroadphase
 */
class Broadphase {
  /**
   * @param {Entity[][]} _bodies
   * @param {BoundingBox[][]} _bounds
   */
  update(_bodies,_bounds) {}
  /**
   * Gets all possibly colliding pairs.
   * 
   * @param {CollisionPair[]} _target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(_target) {return _target}

  /**
   * Returns bodies that are within the given bound.
   * 
   * @param {Bounds} _bounds Region to check in.
   * @param {Entity[]} _target Empty array to store results.
   * @returns {Entity[]}
   */
  query(_bounds, _target) {return _target}
}

/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
 */
class NaiveBroadphase extends Broadphase {
  /**
   * @private
   * @type {Entity[]}
   */
  entities = []
  /**
   * @private
   * @type {BoundingBox[]}
   */
  bounds = []
  /**
   * @inheritdoc
   * @param {BoundingBox} bound Region to check in.
   * @param {Entity[]} target Empty array to store results.
   * @returns {Entity[]}
   */
  query(bound,target = []) {
    for (let i = 0; i < this.entities.length; i++)
      if (boundsColliding(bound,this.bounds[i]))
        target.push(this.entities[i]);
    return target
  }
  /**
   * @param {Entity[][]} entities 
   * @param {BoundingBox[][]} bounds
   */
  update(entities,bounds) {
    this.entities = entities.reduce((a,b) => a.concat(b),[]);
    this.bounds = bounds.reduce((a,b) => a.concat(b),[]);
  }
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target = []) {
    const { entities,bounds } = this;
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        if (!boundsColliding(bounds[i],bounds[j]))
          continue
        target.push({
          a: entities[i],
          b: entities[j]
        });
      }
    }
    return target
  }
}

/**
 * Component to hold requirements for an entity to move.
 * 
 */
class Movable {
  /**
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [a]
   */
  constructor(x = 0, y = 0, a = 0) {
    this.velocity = new Vector2(x, y);
    this.rotation = a;
    this.acceleration = new Vector2();
    this.torque = 0;
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * @param {Vector2} force The force to be applied.
   * @param {Vector2} [arm] The collision arm.
   * @param {number} inv_mass
   * @param {number} inv_inertia
   */
  applyForce(force, inv_mass, inv_inertia, arm = Vector2.ZERO) {
    Vector2.set(
      this.acceleration,
      this.acceleration.x + force.x * inv_mass,
      this.acceleration.y + force.y * inv_mass
    );
    this.torque += Vector2.cross(arm,force) * inv_inertia;
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * @param {Vector2} impulse The force to be applied.
   * @param {Vector2} [arm] The collision arm.
   * @param {number} inv_mass
   * @param {number} inv_inertia
   */
  applyImpulse(impulse, inv_mass, inv_inertia, arm = Vector2.ZERO) {
    Vector2.set(
      this.velocity,
      this.velocity.x + impulse.x * inv_mass,
      this.velocity.y + impulse.y * inv_mass
    );
    this.rotation += Vector2.cross(arm,impulse) * inv_inertia;
  }
}

/**
 * @template T
 */
class CollisionManifold {
  /**
   * @type {T}
   */
  entityA
  /**
   * @type {T}
   */
  entityB
  /**
   * @type {CollisionData}
   */
  contactData = new CollisionData()
  /**
   * @type {number[]}
   */
  impulse = [0.0,0.0]
  /**
   * @type {number[]}
   */
  tImpulse = [0.0,0.0]
  /**
   * @type {number[]}
   */
  nbias = [0.0,0.0]
  /**
   * @type {Jacobian[]}
   */
  nJacobian = [new Jacobian(),new Jacobian()]
  /**
   * @type {Jacobian[]}
   */
  tJacobian = [new Jacobian(),new Jacobian()]
  /**
   * @type {number}
   */
  restitution = 0
  /**
   * @type {number}
   */
  staticFriction = 0
  /**
   * @type {number}
   */
  kineticFriction = 0
  effectiveMass = [0,0]
  nLambda = [0,0]
  tLambda = [0,0]
  /**
   * @param {T} a
   * @param {T} b
   */
  constructor(a,b) {
    this.entityA = a;
    this.entityB = b;
  }
  /**
   * @template T
   * @param {CollisionManifold<T>} manifold
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {Body2D} bodyA
   * @param {Body2D} bodyB
   */
  static warmstart(manifold,movableA,movableB,bodyA,bodyB) {
    const { contactNo } = manifold.contactData;

    for (let i = 0; i < contactNo; i++) {
      CollisionManifold.applyImpulse(
        manifold.tJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.tLambda[i]
      ); /***/
      CollisionManifold.applyImpulse(
        manifold.nJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.nLambda[i]
      );

    }
  }
  /**
   * @template T
   * @param {Jacobian} jacobian
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {Body2D} bodyA
   * @param {Body2D} bodyB
   * @param {number} lambda
   */
  static applyImpulse(jacobian,movableA,movableB,bodyA,bodyB,lambda) {
    const velA = movableA.velocity;
    const velB = movableB.velocity;
    const va = Vector2.multiplyScalar(jacobian.va,bodyA.inv_mass * lambda);
    const vb = Vector2.multiplyScalar(jacobian.vb,bodyB.inv_mass * lambda);

    Vector2.add(velA,va,velA);
    Vector2.add(velB,vb,velB);
    movableA.rotation += bodyA.inv_inertia * jacobian.wa * lambda;
    movableB.rotation += bodyB.inv_inertia * jacobian.wb * lambda;
  }
  /**
   * @template T
   * @param {CollisionManifold<T>} manifold
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {Body2D} bodyA
   * @param {Body2D} bodyB
   * @param {Vector_like} positionA
   * @param {Vector_like} positionB
   * @param {number} inv_dt
   */
  static prepare(manifold,bodyA,bodyB,movableA,movableB,positionA,positionB,inv_dt) {
    const { axis,overlap,tangent,contactPoints,contactNo } = manifold.contactData;

    for (let i = 0; i < contactNo; i++) {
      manifold.impulse[i] = 0;
      manifold.tImpulse[i] = 0;
      const ca1 = Vector2.sub(contactPoints[i],positionA);
      const ca2 = Vector2.sub(contactPoints[i],positionB);
      const va = Vector2.crossScalar(ca1,movableA.rotation);
      Vector2.add(va,movableA.velocity,va);
      const vb = Vector2.crossScalar(ca2,movableB.rotation);
      Vector2.add(vb,movableB.velocity,vb);
      const relativeVelocity = Vector2.sub(vb,va,vb);

      manifold.nbias[i] = 0.0;
      manifold.nJacobian[i].set(
        axis,
        Vector2.reverse(axis),
        Vector2.cross(ca1,axis),
        -Vector2.cross(ca2,axis)
      );

      //manifold.contactData.tangent.multiply(-Math.sign(manifold.contactData.tangent.dot(relativeVelocity)))
      manifold.tJacobian[i].set(
        tangent,
        Vector2.reverse(tangent),
        Vector2.cross(ca1,tangent),
        -Vector2.cross(ca2,tangent)
      );
      const normalVelocity = Vector2.dot(axis,relativeVelocity);

      manifold.nbias[i] = -(Settings.posDampen * inv_dt) * Math.max(overlap - Settings.penetrationSlop,0.0);
      manifold.nbias[i] += (manifold.restitution) * Math.min(normalVelocity,0.0);
      const k =
        bodyA.inv_mass +
        bodyB.inv_mass +
        manifold.nJacobian[i].wa * bodyA.inv_inertia * manifold.nJacobian[i].wa +
        manifold.nJacobian[i].wb * bodyB.inv_inertia * manifold.nJacobian[i].wb;
      manifold.effectiveMass[i] = k > 0.0 ? 1.0 / k : 0.0;
    }
  }
  /**
   * @template T
   * @param {CollisionManifold<T>} manifold
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {Body2D} bodyA
   * @param {Body2D} bodyB
   */
  static solve(manifold,movableA,movableB,bodyA,bodyB) {
    const { contactNo } = manifold.contactData;

    for (let i = 0; i < contactNo; i++) {
      const nvaDot = Vector2.dot(
        manifold.nJacobian[i].va,
        movableA.velocity
      );
      const nvbDot = Vector2.dot(
        manifold.nJacobian[i].vb,
        movableB.velocity
      );
      const tvaDot = Vector2.dot(
        manifold.tJacobian[i].va,
        movableA.velocity
      );
      const tvbDot = Vector2.dot(
        manifold.tJacobian[i].vb,
        movableB.velocity
      );
      const jv = nvaDot +
        manifold.nJacobian[i].wa * movableA.rotation +
        nvbDot +
        manifold.nJacobian[i].wb * movableB.rotation;
      const jt =
        tvaDot +
        manifold.tJacobian[i].wa * movableA.rotation +
        tvbDot +
        manifold.tJacobian[i].wb * movableB.rotation;
      let nLambda = manifold.effectiveMass[i] * -(jv + manifold.nbias[i]);
      let tLambda = manifold.effectiveMass[i] * -(jt);
      manifold.impulse[i];
      manifold.tImpulse[i];
      {
        manifold.impulse[i] = Math.max(0.0,nLambda);
        const maxfriction = manifold.impulse[i] * manifold.kineticFriction;
        manifold.tImpulse[i] = clamp(tLambda,-maxfriction,maxfriction); //Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction ?
        //tLambda :
        //-manifold.impulse[i] * manifold.kineticFriction
        manifold.nLambda[i] = manifold.impulse[i];
        manifold.tLambda[i] = manifold.tImpulse[i];
        //console.log(Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction)
        //if (Math.abs(manifold.tImpulse[i]) > 3000) throw console.log(manifold, jt)
      }
    }
    for (let i = 0; i < contactNo; i++) {

      CollisionManifold.applyImpulse(
        manifold.nJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.nLambda[i]
      );
      if (manifold.nLambda[i] <= 0) continue
      CollisionManifold.applyImpulse(
        manifold.tJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.tLambda[i]
      ); /***/
    }
  }
}
class CollisionData {
  /**
   * @type {number}
   */
  overlap = 0
  /**
   * @type {boolean}
   */
  done = false
  /**
   * @type {Vector2}
   */
  axis = new Vector2()
  /**
   * @type {Vector2}
   */
  tangent = new Vector2()
  /**
   * @type {Vector2[]}
   */
  contactPoints = [new Vector2(),new Vector2()]
  /**
   * @type {number}
   */
  contactNo = 0
}
class Jacobian {
  /**
   * @type {Vector2}
   */
  va = new Vector2()
  /**
   * @type {number}
   */
  wa = 0
  /**
   * @type {Vector2}
   */
  vb = new Vector2()
  /**
   * @type {number}
   */
  wb = 0
  /**
   * @param {Vector_like} [va]
   * @param {Vector_like} [vb]
   * @param {number} [wa]
   * @param {number} [wb]
   */
  constructor(va,vb,wa,wb) {
    this.set(va,vb,wa,wb);
  }
  /**
   * @param {Vector_like} [va]
   * @param {Vector_like} [vb]
   * @param {number} [wa]
   * @param {number } [wb]
   */
  set(va,vb,wa,wb) {
    if (va) Vector2.copy(va,this.va);
    if (vb) Vector2.copy(vb,this.vb);
    if (wa) this.wa = wa;
    if (wb) this.wb = wb;
  }
}

class NarrowPhase {
  /**
   * @param {CollisionPair[]} _contactList
   * @param {CollisionManifold<Entity>[]} [_clmds]
   * @returns {CollisionManifold<Entity>[]}
   * @param {Manager} _manager
   */
  getCollisionPairs(_manager,_contactList, _clmds = []) {return _clmds}
  /**
   * Checks to see if two bodies can proceed to have their bounding boxes checked 
   * 
   * @param {Body2D} a
   * @param {Body2D} b
   */
  static canCollide(a, b) {
    if (!a.inv_mass && !b.inv_mass )
      return false
    if (
      (a.mask.group && b.mask.group) &&
      a.mask.group == b.mask.group
    ) return false
    if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
      return false
    if (a.sleeping && b.sleeping) return false
    return true
  }
}

const  tmp1$5 = {
    overlap: 0,
    verticesA: null,
    verticesB: null,
    axis: new Vector2(),
    vertex: null,
    shape: null
  },
  tmp2$2 = {
    min: 0,
    max: 0
  },
  tmp3 = {
    min: 0,
    max: 0
  },
  tmp4 = new Vector2(),
  tmp5 = new Vector2();

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
class SATNarrowphase extends NarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  clmdrecord = new Map()
  /**
   * @param {Manager} manager
   * @param {CollisionPair[]} contactList
   * @param {CollisionManifold<Entity>[]} [clmds=[]] 
   */
  getCollisionPairs(manager, contactList, clmds = []) {
    for (let i = 0; i < contactList.length; i++) {
      const { a, b } = contactList[i];
      const [bodyA] = manager.get(a, "body");
      const [bodyB] = manager.get(b, "body");

      if (!NarrowPhase.canCollide(bodyA, bodyB)) continue
      if (bodyA.aabbDetectionOnly || bodyB.aabbDetectionOnly) continue

      bodyA.sleeping = false;
      bodyB.sleeping = false;
      const id = bodyA.id > bodyB.id ? bodyA.id + " " + bodyB.id : bodyB.id + " " + bodyA.id;
      if (!this.clmdrecord.has(id))
        this.clmdrecord.set(id, new CollisionManifold(a, b));
      const manifold = this.clmdrecord.get(id);
      const collisionData = manifold.contactData;
      collisionData.overlap = -Infinity;
      collisionData.done = false;
      SATNarrowphase.shapesInBodyCollided(bodyA, bodyB, collisionData);
      if (collisionData.overlap < 0 || !collisionData.done) continue
      manifold.restitution = bodyA.restitution < bodyB.restitution ? bodyA.restitution : bodyB.restitution;
      manifold.staticFriction = bodyA.staticFriction < bodyB.staticFriction ? bodyA.staticFriction : bodyB.staticFriction;
      manifold.kineticFriction = bodyA.kineticFriction < bodyB.kineticFriction ? bodyA.kineticFriction : bodyB.kineticFriction;
      //if (bodyA.collisionResponse && bodyB.collisionResponse)
      clmds.push(manifold);
    }
    return clmds
  }
  /**
   * @param {Body2D} body1
   * @param {Body2D} body2
   * @param {CollisionData} manifold
   */
  static shapesInBodyCollided(body1, body2, manifold) {
    SATNarrowphase.shapesCollided(body1.shape, body2.shape, manifold);
    
    if (manifold.overlap < 0) return manifold
    
    Vector2.normal(manifold.axis, manifold.tangent);
    const contactPoints = manifold.contactPoints;
    const
      axis = manifold.axis,
      shape1 = body1.shape,
      shape2 = body2.shape;
    const axisReverse = Vector2.reverse(axis, tmp5);
    const overload = [];
    // @ts-ignore
    const vertices1 = SATNarrowphase.findNearSupports(manifold.vertShapeA, axis, []);
    // @ts-ignore
    const vertices2 = SATNarrowphase.findNearSupports(manifold.vertShapeB, axisReverse, []);
    const balancedOverlap = manifold.overlap / (body1.inv_mass + body2.inv_mass);
    for (let i = 0; i < vertices2.length; i++) {
      if (SATNarrowphase.shapeContains(shape1, vertices2[i])) {
        overload.push(vertices2[i]);
      }
    }
    if (overload.length < 2) {
      for (let i = 0; i < vertices1.length; i++) {
        if (SATNarrowphase.shapeContains(shape2, vertices1[i])) {
          overload.push(vertices1[i]);
        }
      }
    }
    //some random error happened when this is not there.
    //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
    if (overload.length == 0) {
      overload.push(vertices2[0]);
    }
    Vector2.multiplyScalar(axis, -balancedOverlap * body2.inv_mass, tmp4);
    Vector2.add(tmp4, overload[0], contactPoints[0]);
    if (overload.length > 1) {
      Vector2.add(tmp4, overload[1], contactPoints[1]);
    }

    manifold.contactNo =
      shape1.type === Shape.CIRCLE ||
      shape2.type === Shape.CIRCLE ?
      1 : clamp(overload.length, 0, 2);

    return manifold
  }
  /**
   * @param {Shape} shapeA
   * @param {Shape} shapeB
   * @param {CollisionData} target
   */
  static shapesCollided(shapeA, shapeB, target) {
    /**
     * @type {Vector2[]}
     */
    const arr = [];
    Shape.getNormals(shapeA, shapeB, arr);
    Shape.getNormals(shapeB, shapeA, arr);
    SATNarrowphase.projectShapesToAxes(shapeA, shapeB, arr, target);
  }
  /**
   * @param {Shape} shapeB
   * @param {Shape} shapeA
   * @param {Vector_like[]} axes
   * @param {CollisionData} manifold
   */
  static projectShapesToAxes(shapeA, shapeB, axes, manifold) {
    const temp = tmp1$5;
    temp.vertex = null;
    temp.overlap = Infinity;
    for (let i = 0; i < axes.length; i++) {
      const axis = Vector2.copy(axes[i], tmp4);
      // @ts-ignore
      const verticesA = Shape.getVertices(shapeA, axis);
      // @ts-ignore
      const verticesB = Shape.getVertices(shapeB, axis);
      const p1 = SATNarrowphase.projectVerticesToAxis(verticesA, axis, tmp2$2);
      const p2 = SATNarrowphase.projectVerticesToAxis(verticesB, axis, tmp3);
      const min = p1.max < p2.max ? p1.max : p2.max;
      const max = p1.min > p2.min ? p1.min : p2.min;
      let overlap = min - max;
      if (overlap < 0) return manifold
      if (p1.max < p2.max)
        Vector2.reverse(axis, axis);
      if (
        (p1.max > p2.max && p1.min < p2.min) ||
        (p2.max > p1.max && p2.min < p1.min)
      ) {
        const max = Math.abs(p1.max - p2.max),
          min = Math.abs(p1.min - p2.min);
        if (min < max) {
          overlap += min;
        } else {
          overlap += max;
          Vector2.reverse(axis, axis);
        }
      }
      if (overlap < temp.overlap) {
        Vector2.copy(axis, temp.axis);
        temp.overlap = overlap;
        // @ts-ignore
        temp.verticesA = verticesA;
        // @ts-ignore
        temp.verticesB = verticesB;
      }
    }
    if (temp.overlap > manifold.overlap) {
      Vector2.copy(temp.axis, manifold.axis);
      manifold.overlap = temp.overlap;
      // @ts-ignore
      manifold.vertShapeA = temp.verticesA;
      // @ts-ignore
      manifold.vertShapeB = temp.verticesB;
      manifold.done = true;
    }
    return manifold
  }
  /**
   * @param {Vector_like[]} vertices
   * @param {Vector_like} axis
   * @param {{ min: any; max: any; }} target
   */
  static projectVerticesToAxis(vertices, axis, target) {
    let min = Infinity,
      max = -Infinity;
    const length = vertices.length;

    for (let i = 0; i < length; i++) {
      const point = Vector2.dot(axis, vertices[i]);
      if (point < min) min = point;
      if (point > max) max = point;
    }
    target.min = min;
    target.max = max;
    return target
  }
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param { Vector2[]} target
   */
  static findNearSupports(vertices, axis, target = []) {
    let min = Infinity;

    for (let i = 0; i < vertices.length; i++) {
      const point = Vector2.dot(axis, vertices[i]);
      if (
        Math.abs(point - min) <= Settings.separationTolerance &&
        !target.includes(vertices[i])
      ) {
        target.push(vertices[i]);
        continue
      }
      if (point < min) {
        min = point;
        clearArr(target);
        target.push(vertices[i]);
        i = -1;
      }
    }
    return target
  }
  /**
   * @param {Shape} shape
   * @param { Vector2} point
   */
  static shapeContains(shape, point) {
    if (shape.type == Shape.CIRCLE)
      return SATNarrowphase.circleContains(shape.vertices[0], shape.vertices[1].x, point)
    return SATNarrowphase.verticesContain(shape.vertices, point)
  }
  /**
   * @param { Vector2} position
   * @param {number} radius
   * @param { Vector2} point
   */
  static circleContains(position, radius, point) {
    const dx = point.x - position.x,
      dy = point.y - position.y;
    if (dx * dx + dy * dy > radius * radius)
      return false
    return true
  }
  /**
   * @param { Vector2[]} vertices
   * @param {Vector2} point 
   */
  static verticesContain(vertices, point) {
    const pointX = point.x,
      pointY = point.y,
      length = vertices.length;
    let previous = vertices[length - 1],
      current;
    if (length < 2) return false
    for (let i = 0; i < length; i++) {
      current = vertices[i];
      if ((pointX - previous.x) * (current.y - previous.y) +
        (pointY - previous.y) * (previous.x - current.x) < 0) {
        return false;
      }
      previous = current;
    }

    return true;
  }
}

/**
 * Holds transformation info of an entity 
 * 
 */
class Transform{
  /**
   * @param {number} [x]
   * @param {number} [y]
   * @param {number} [a]
   */
  constructor(x = 0,y = 0,a = 0){
    this.position = new Vector2(x,y);
    this.orientation = a;
    this.scale = new Vector2(1,1);
  }
}

/**
 * @type {IntergratorFunc}
 */
function euler(transform, movable, dt) {
  const position = transform.position;
  const velocity = movable.velocity;
  const acceleration = movable.acceleration;

  Vector2.set(
    velocity,
    velocity.x + acceleration.x * dt,
    velocity.y + acceleration.y * dt,
  );
  Vector2.set(
    position,
    position.x + velocity.x * dt,
    position.y + velocity.y * dt
  );
  Vector2.set(acceleration, 0, 0);

  movable.rotation += movable.torque * dt;
  transform.orientation += movable.rotation * dt;
  movable.torque = 0;
}
/**
 * @param {Transform} transform
 * @param {Movable} movable
 * @param {number} dt
 */
function verlet(transform, movable, dt) {
  const position = transform.position;
  const velocity = movable.velocity;
  const acceleration = movable.acceleration;

  Vector2.multiplyScalar(acceleration, dt * 0.5, acceleration);
  Vector2.add(velocity, acceleration, velocity);
  Vector2.set(
    position,
    position.x + velocity.x * dt + acceleration.x * dt,
    position.y + velocity.y * dt + acceleration.y * dt
  );
  Vector2.add(velocity, acceleration, velocity);
  Vector2.set(acceleration, 0, 0);

  movable.rotation += movable.torque * dt * 0.5;
  transform.orientation += movable.rotation * dt + movable.torque * dt;
  movable.rotation += movable.torque * dt * 0.5;
  movable.torque = 0;

}

/**
 * @callback IntergratorFunc
 * @param {Transform} transform
 * @param {Movable} movable
 * @param {number} dt
 * @returns {void}
 */

class Intergrator2DPlugin {
  /**
   * @param {IntergratorPluginOptions} options
   */
  constructor(options = {}) {
    options.intergrator = options.intergrator || "verlet";
    options.enableDamping = options.enableDamping || false;
    options.linearDamping = options.linearDamping || 0.01;
    options.angularDamping = options.angularDamping || 0.01;

    this.options = options;
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    if (this.options.enableDamping) {
      manager.setResource("linearDamping",this.options.linearDamping);
      manager.setResource("angularDamping",this.options.angularDamping);
      manager.registerSystem(dampenVelocity);
    }
    manager.registerSystem(updateTransformVerlet);
  }
}
/**
 * @param {Manager} manager
 */
function dampenVelocity(manager) {
  const [movables] = manager.query("movable").raw();
  const linear = 1 - manager.getResource("linearDamping");
  const angular = 1 - manager.getResource("angularDamping");
  for (let i = 0; i < movables.length; i++) {
    for (let j = 0; j < movables[i].length; j++) {
      const velocity = movables[i][j].velocity;
      Vector2.multiplyScalar(velocity,linear,velocity);
      movables[i][j].rotation *= angular;
    }
  }
}
/**
 * @param {Manager} manager
 */
function updateTransformVerlet(manager) {
  const [transforms,movables] = manager.query("transform","movable").raw();
  const dt = 1 / 60;// manager.getResource("delta")

  for (let i = 0; i < transforms.length; i++) {
    for (let j = 0; j < transforms[i].length; j++) {
      verlet(
        transforms[i][j],
        movables[i][j],
        dt
      );
    }
  }
}
/**
 * @param {Manager} manager
 */
function updateTransformEuler(manager) {
  const [transforms,movables] = manager.query("transform","movable").raw();
  const dt = manager.getResource("delta");

  for (let i = 0; i < transforms.length; i++) {
    for (let j = 0; j < transforms[i].length; j++) {
      euler(
        transforms[i][j],
        movables[i][j],
        dt
      );
    }
  }
}

/**
 * @typedef IntergratorPluginOptions
 * @property {boolean} [enableDamping]
 * @property {number} [linearDamping]
 * @property {number} [angularDamping]
 * @property {"euler" | "verlet"} [intergrator]
 */

/**
 * Class responsible for updating bodies,constraints and composites.
 */
class World2D {
  /**
   * The collision manifolds that have passed narrowphase and verified to be colliding.
   * 
   * @type {CollisionManifold<Entity>[]}
   */
  CLMDs = []
  /**
   * The collision manifolds that have passed broadphase and could be colliding
   * 
   * @deprecated
   * @type {CollisionPair[]}
   */
  contactList = []
  /**
   * The gravitational pull of the world.
   * 
   * @type {Vector2}
   */
  gravitationalAcceleration = new Vector2(0, 0)
  /**
   * Time in seconds that a single frame takes.This has more precedence than the first parameter of World2D.update(),set to this to zero if you want to use the latter as the delta time.
   * 
   * @type {number}
   */
  fixedFrameRate = Settings.fixedFrameRate
  /**
   * This is a cheap way of determining which pairs of bodies could be colliding.
   * 
   * @type {Broadphase}
   */
  broadphase
  /**
   * This accurately tests body pairs to check 
   * for collision and outputs a manifold for each body pair.
   * 
   * @type {NarrowPhase}
   */
  narrowphase
  constructor() {
    this.broadphase = new NaiveBroadphase();
    this.narrowphase = new SATNarrowphase();
  }

  /**
   * Gravitational pull of the world,will affect all bodies except static bodies.
   * 
   * @deprecated
   * @type { Vector2 }
   */
  get gravity() {
    return this.gravitationalAcceleration
  }

  set gravity(x) {
    if (typeof x === "object") {
      Vector2.copy(x, this.gravitationalAcceleration);
    } else {
      Vector2.set(this.gravitationalAcceleration, 0, x);
    }
  }

  /**
   * 
   * @param {any} manager
   * @param {World2D} world
   * @param {CollisionPair[]} contactList
   */
  static narrowPhase(manager, world, contactList) {
    return world.narrowphase.getCollisionPairs(manager, contactList)

  }
  /**
   * 
   * @param {World2D} world
   */
  static broadPhase(world) {
    return world.broadphase.getCollisionPairs([])
  }
  /**
   * 
   * @param {any} manager
   * @param {World2D} world
   */
  static collisionDetection(manager, world) {
    world.contactList = World2D.broadPhase(world);
    world.CLMDs = World2D.narrowPhase(manager, world, world.contactList);
  }
  /**
   * 
   * @param {number} dt
   * @param {Manager} manager
   * @param {World2D} world
   * @param {string | any[]} CLMDs
   */
  static collisionResponse(manager, world, CLMDs, dt) {
    const inv_dt = 1 / dt;

    for (let i = 0; i < CLMDs.length; i++) {
      const manifold = CLMDs[i];
      const [transformA, movableA, bodyA] = manager.get(manifold.entityA, "transform", "movable", "body");
      const [transformB, movableB, bodyB] = manager.get(manifold.entityB, "transform", "movable", "body");
      CollisionManifold.prepare(
        manifold,
        bodyA,
        bodyB,
        movableA,
        movableB,
        transformA.position,
        transformB.position,
        inv_dt
      );
    }
    for (let i = 0; i < Settings.velocitySolverIterations; i++) {
      for (let i = 0; i < CLMDs.length; i++) {
        const manifold = CLMDs[i];
        const [movableA, bodyA] = manager.get(manifold.entityA, "movable", "body");
        const [movableB, bodyB] = manager.get(manifold.entityB, "movable", "body");

        CollisionManifold.solve(
          manifold,
          movableA,
          movableB,
          bodyA,
          bodyB
        );
      }
    } /***/
  }
  /**
   * 
   * @param {Vector2} gravity
   * @param {Movable[][]} movable
   * @param {Body2D[][]} bodies
   */
  static applyGravity(gravity, movable, bodies) {
    for (var i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        if (bodies[i][j].inv_mass)
          Vector2.add(
            movable[i][j].acceleration,
            gravity,
            movable[i][j].acceleration
          );
      }
    }
  }
  /**
   * 
   * @param {Body2D[][]} bodies
   * @param {Transform[][]} transform
   * @param {BoundingBox[][]} bounds
   */
  static updateBodies(transform, bounds, bodies) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        Body2D.update(
          bodies[i][j],
          transform[i][j].position,
          transform[i][j].orientation,
          transform[i][j].scale,
          bounds[i][j]
        );
      }
    }
  }
  /**
   * @param {World2D} world
   * @param {Body2D[][]} bodies
   * @param {Number} dt the time passed between the last call and this call.
   * @param {Manager} manager
   * @param {Entity[][]} entities
   * @param {Transform[][]} transform
   * @param {Movable[][]} movable
   * @param {BoundingBox[][]} bounds
   */
  static update(manager, world, entities, transform, movable, bounds, bodies, dt) {
    /** @type {CollisionManifold<Entity>[]}*/
    this.CLMDs = [];
    World2D.applyGravity(world.gravitationalAcceleration, movable, bodies);
    World2D.updateBodies(transform, bounds, bodies);
    world.broadphase.update(entities, bounds);
    World2D.collisionDetection(manager, world);
    World2D.collisionResponse(manager, world, world.CLMDs, dt);
  }

  /**
   * Searches for objects in a given bounds and returns them.
   * 
   * @template {Entity} T
   * @param {Bounds} bound the region to search in
   * @param {T[]} [out = []] an array to store results in
   * @returns {T[]}
   */
  query(bound, out = []) {
    this.broadphase.query(bound, out);
    return out
  }
}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
class World extends World2D {
  /**
   * @inheritdoc
   */
  constructor() {
    deprecate("World()", "World2D()");
    // @ts-ignore
    super(...arguments);
  }
}

class Physics2DPlugin {
  /**
   * @param {Physics2DPluginOptions} options
   */
  constructor(options = {}) {
    this.gravity = options.gravity || new Vector2();
    this.enableGravity = options.enableGravity || true;
    this.broadphase = new Broadphase2DPlugin(options.broadphase);
    this.narrowphase = new Narrowphase2DPlugin(options.narrowphase);
    this.intergrator = new Intergrator2DPlugin(options.intergratorOpt);

  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    if (this.enableGravity) {
      manager.setResource("gravity",this.gravity);
      manager.registerSystem(applyGravity);
    }
    manager.registerPlugin(this.intergrator);
    manager.registerSystem(updateBodies);
    manager.registerPlugin(this.broadphase);
    manager.registerPlugin(this.narrowphase);
    manager.registerSystem(collisionResponse);
  }
}
class Broadphase2DPlugin {
  /**
   * 
   * @param {Broadphase} broadphase 
   */
  constructor(broadphase = new NaiveBroadphase()) {
    this.broadphase = broadphase;
  }
  /**
  * @param {Manager} manager
  */
  register(manager) {
    manager.setResource("collisionPairs",[]);
    manager.setResource("broadphase",this.broadphase);
    manager.registerSystem(naivebroadphaseUpdate);
  }
}
class Narrowphase2DPlugin {
  /**
   * 
   * @param {NarrowPhase} narrowphase 
   */
  constructor(narrowphase = new SATNarrowphase()) {
    this.narrowphase = narrowphase;
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource("contacts",[]);
    manager.setResource("narrowphase",this.narrowphase);

    if (this.narrowphase instanceof SATNarrowphase) {
      manager.registerSystem(satNarrowphaseUpdate);
    }
  }
}
/**
 * @param {Manager} manager
 */
function naivebroadphaseUpdate(manager) {
  const [entities,bounds] = manager.query("entity","bound").raw();
  const broadphase = manager.getResource("broadphase");
  broadphase.update(entities,bounds);
  const pairs = manager.getResource("collisionPairs");
  pairs.length = 0;
  broadphase.getCollisionPairs(pairs);
}
/**
 * @param {Manager} manager
 */
function satNarrowphaseUpdate(manager) {
  const narrowphase = manager.getResource("narrowphase");
  const pairs = manager.getResource("collisionPairs");

  const contacts = manager.getResource("contacts");
  contacts.length = 0;
  narrowphase.getCollisionPairs(manager,pairs,contacts);
}
/**
 * @param {Manager} manager
 */
function applyGravity(manager) {
  const gravity = manager.getResource("gravity");
  const [bodies,movables] = manager.query("body","movable").raw();

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies[i].length; j++) {
      if (bodies[i][j].inv_mass) {
        Vector2.add(
          movables[i][j].acceleration,
          gravity,
          movables[i][j].acceleration
        );
      }
    }
  }
}
/**
 * @param {Manager} manager
 */
function updateBodies(manager) {
  const [transform,bounds,bodies] = manager.query("transform","bound","body").raw();

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies[i].length; j++) {
      Body2D.update(
        bodies[i][j],
        transform[i][j].position,
        transform[i][j].orientation,
        transform[i][j].scale,
        bounds[i][j]
      );
    }
  }
}
/**
 * @param {Manager} manager
 */
function collisionResponse(manager) {
  const inv_dt = 1 / manager.getResource("delta");
  const contacts = manager.getResource("contacts");

  for (let i = 0; i < contacts.length; i++) {
    const manifold = contacts[i];
    const [transformA,movableA,bodyA] = manager.get(manifold.entityA,"transform","movable","body");
    const [transformB,movableB,bodyB] = manager.get(manifold.entityB,"transform","movable","body");
    CollisionManifold.prepare(
      manifold,
      bodyA,
      bodyB,
      movableA,
      movableB,
      transformA.position,
      transformB.position,
      inv_dt
    );
  }
  for (let i = 0; i < Settings.velocitySolverIterations; i++) {
    for (let j = 0; j < contacts.length; j++) {
      const manifold = contacts[j];
      const [movableA,bodyA] = manager.get(manifold.entityA,"movable","body");
      const [movableB,bodyB] = manager.get(manifold.entityB,"movable","body");

      CollisionManifold.solve(
        manifold,
        movableA,
        movableB,
        bodyA,
        bodyB
      );
    }
  } /***/
}

/**
 * @typedef Physics2DPluginOptions
 * @property {boolean} [enableGravity=true]
 * @property {Vector2} [gravity]
 * @property {Broadphase} [broadphase]
 * @property {NarrowPhase} [narrowphase]
 * @property {import("../intergrator/index.js").IntergratorPluginOptions} [intergratorOpt]
 */

class Camera2D {
  /**
   * @readonly
   * @type {Transform}
   */
  transform = new Transform()

  constructor() { }
  /**
   * @type {Vector2}
   */
  get position() {
    return this.transform.position
  }
  set position(x) {
    this.transform.position.copy(x);
  }
  update() {}
}
/**
 * @deprecated
*/
class Camera extends Camera2D{
  constructor(){
    super();
    deprecate("Camera()","Camera2D()");
  }
}

/**
 * This is an abstract class from which different types of renderers are implemented.
 * 
 * @abstract
 * @see Renderer2D
 * @see WebGLRenderer
 * @see WebGPURenderer
 */
class Renderer {
  /**
   * @type {HTMLCanvasElement}
   */
  domElement
  /**
   * @type {Camera2D}
   */
  camera
  /**
   * @param {HTMLCanvasElement} canvas element to draw on
   */
  constructor(canvas) {
    this.domElement = canvas;
    this.camera = new Camera2D();
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * @param {string} selector A css selector string that is passed to document.querySelector
   * @param {boolean} focus whether to shift focus of input to the element pr not
   * @param {Renderer} renderer
   */
  static bindTo(renderer,selector,focus = true) {
    let element = document.querySelector(selector);
    if (!element) return console.error("could not find container for the canvas.");
    renderer.domElement.remove();
    renderer.domElement.style.backgroundColor = "grey";
    renderer.domElement.style.touchAction = "none";
    element.append(renderer.domElement);
  }
  /**
   * Requests fullscreen for the renderer.
   * 
   * @param {Renderer} renderer
   */
  static requestFullScreen(renderer) {
    const parent = renderer.domElement.parentElement;
    if (parent) return parent.requestFullscreen()
    return renderer.domElement.requestFullscreen()
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   * @param {Renderer} renderer
   */
  static setViewport(renderer,w,h) {
    const canvas = renderer.domElement;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
  }
  /**
   * Width of the renderer
   * 
   * @type number
   */
  get width() {
    return this.domElement.width
  }
  set width(x) {
    this.domElement.width = x;
  }
  /**
   * Height of the renderer
   * 
   * @type number
   */
  get height() {
    return this.domElement.height
  }
  set height(x) {
    this.domElement.height = x;
  }
}

//Dont get too excited yet :)


/**
 * Renders images and paths to the webgpu context of a canvas.
 * 
 * @extends Renderer
*/
class WebGPURenderer extends Renderer{
  constructor(){
    super();
    throw new Error("Dont get too excited yet :)")
  }
}

/**
 * Renders images and paths to the webgl context of a canvas.
 * 
 * @extends Renderer
 */
class WebGLRenderer extends Renderer{
  constructor(){
    throw new Error("Hold your horses there!I haven't implemented this yet!")
  }
}

/**
 * @param {CanvasRenderingContext2D | Path2D} ctx
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function line(ctx, x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}
/**
 * @param {CanvasRenderingContext2D | Path2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function rect(ctx, x, y, w, h) {
  ctx.rect(x, y, w, h);
}
/**
 * @param {CanvasRenderingContext2D | Path2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} r
 */
function circle(ctx, x, y, r) {
  ctx.arc(x, y, r, 0, Math.PI * 2);
}
/**
 * @param {CanvasRenderingContext2D | Path2D} ctx
 * @param { Vector2[]} vertices
 * @param {boolean} [close=true]
 */
function vertices(ctx, vertices, close = true) {
  if (vertices.length < 2) return;
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  if (close)
    ctx.lineTo(vertices[0].x, vertices[0].y);
}
/**
 * @param {CanvasRenderingContext2D | Path2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} start
 * @param {number} end
 */
function arc(ctx, x, y, r, start, end) {
  ctx.arc(x, y, r, start, end);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {number} x
 * @param {number} y
 */
function fillText(ctx, text, x, y) {
  ctx.fillText(text, x, y);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} [color="black"]
 * @param {CanvasFillRule} [fillRule]
 */
function fill(ctx, color = "black", fillRule) {
  ctx.fillStyle = color;
  ctx.fill(fillRule);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param { string } [color = "black"]
 * @param {number} [width=1]
 */
function stroke(ctx, color = "black", width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} img
 * @param {number} x
 * @param {number} y
 * @param { number } [w = img.width]
 * @param { number } [h=img.height]
 * @param { number } [ix = 0]
 * @param { number } [iy = 0]
 */
function drawImage(
  ctx,
  img,
  x,
  y,
  w = img.width,
  h = img.height,
  ix = 0,
  iy = 0,
  dw = w,
  dh = h
) {
  ctx.drawImage(img, w * ix, h * iy, w, h,
    x,
    y,
    dw, dh);
}

class BufferGeometry {
  /**
   * @type {Record<string,any[] | undefined>}
   */
  attributes = {}
  /**
   * @package
   * @type {Path2D | null}
   */
  drawable = null
  /**
   * @param { Vector2[]} vertices
   */
  /**
   * @param {BufferGeometry} geometry
   */
  static initCanvas2D(geometry) {
    geometry.drawable = new Path2D();
    const positions = geometry.attributes["position"];
    if (!positions) return warnOnce("The `position` attribute should be available in `BufferGeometry` to use `Renderer2D` ")
    vertices(geometry.drawable, positions, true);
  }
  /**
   * @param {BufferGeometry} geometry
   * @param {string} name
   * @param {any[]} attribute
   */
  static setAttribute(geometry, name, attribute) {
    geometry.attributes[name] = attribute;
  }
}

class CircleGeometry extends BufferGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    super();
    BufferGeometry.setAttribute(this, "position", [radius]);
    CircleGeometry.initCanvas2D(this);
  }
  /**
   * @param {CircleGeometry} geometry
   */
  static initCanvas2D(geometry) {
    geometry.drawable = new Path2D();
    const position = geometry.attributes["position"];
    if(!position)return
    circle(geometry.drawable, 0, 0, position[0]);
  }
}

class BoxGeometry extends BufferGeometry{
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width,height){
    let v1 = new Vector2(-width / 2, -height / 2);
    let v2 = new Vector2(-width / 2, height / 2);
    let v3 = new Vector2(width / 2, height / 2);
    let v4 = new Vector2(width / 2, -height / 2);
    super();
    BufferGeometry.setAttribute(this, "position", [v1, v2, v3, v4]);
    BufferGeometry.initCanvas2D(this);
  }
}

class TriangleGeometry extends BufferGeometry {
  /**
   * @param {number} base
   * @param {number} height
   * @param {number} angle
   */
  constructor(base, height, angle = Math.asin(height / base)) {
    const l1 = new Vector2(base);
    const l2 = Vector2.fromAngle(angle);
    Vector2.multiplyScalar(l2, -height / Math.sin(angle), l2);
    const center = new Vector2(
      -(l1.x + l2.x) / 3,
      -l2.y / 3
    );
    super();
    BufferGeometry.setAttribute(this, "position", [
      center,
      Vector2.add(l1,center,l1),
      Vector2.add(l2,center,l2),
    ]);
    BufferGeometry.initCanvas2D(this);
  }
}

class LineGeometry extends BufferGeometry {
  /**
   * @param {number} length
   */
  constructor(length) {
    const start = new Vector2(length / 2);
    const end = new Vector2(-length / 2);
    super();
    BufferGeometry.setAttribute(this, "position", [start, end]);
    BufferGeometry.initCanvas2D(this);
  }
}

const MaterialType = {
  NULL:-1,
  BASIC: 0,
  TEXT: 1,
  STATICIMAGE: 2,
  SPRITE: 3,
};

/**
 * @interface
 */
class Material {
  type = MaterialType.NULL
  /**
   * @param {Material} material
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
   */
  static render(material, ctx, dt, path) {
    switch (material.type) {
      case MaterialType.BASIC:
        // @ts-ignore
        if (!material.wireframe) {
          // @ts-ignore
          ctx.fillStyle = material.fill;
          // @ts-ignore
          ctx.fill(path);
        }
        // @ts-ignore
        ctx.strokeStyle = material.stroke;
        // @ts-ignore
        ctx.stroke(path);
        break;
      case MaterialType.TEXT:
        /**@type {TextMetrics}*/
        // @ts-ignore
        const metrics = ctx.measureText(this.text);
        // @ts-ignore
        const x = material.center ? -metrics.width / 2 : 0;
        const y = 0;
        // @ts-ignore
        ctx.strokeRect = material.color;
        // @ts-ignore
        ctx.fillStyle = material.color;
        // @ts-ignore
        ctx.font = material.font;
        // @ts-ignore
        if (material.fill)
          // @ts-ignore
          ctx.fillText(material.text, x, y);
        else
          // @ts-ignore
          ctx.strokeText(material.text, x, y);
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          // @ts-ignore
          material.image,
          // @ts-ignore
          material.offset.x,
          // @ts-ignore
          material.offset.y,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        );
        break;
      case MaterialType.SPRITE:
        drawImage(
          ctx,
          // @ts-ignore
          material.img,
          // @ts-ignore
          -material.width / 2,
          // @ts-ignore
          -material.width / 2,
          // @ts-ignore
          material.frameWidth,
          // @ts-ignore
          material.frameHeight,
          // @ts-ignore
          material._frame,
          // @ts-ignore
          material._index,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        );
        // @ts-ignore
        material._accumulator += dt;
        // @ts-ignore
        if (material._accumulator < material.frameRate) return
        // @ts-ignore
        material._accumulator = 0;
        // @ts-ignore
        material._frame += 1;
        // @ts-ignore
        if (material._frame >= material._maxFrame)
          // @ts-ignore
          material._frame = 0;
        break;
      case MaterialType.STATICIMAGE:
        ctx.drawImage(
          // @ts-ignore
          material.image,
          // @ts-ignore
          material.offset.x,
          // @ts-ignore
          material.offset.y,
          // @ts-ignore
          material.width,
          // @ts-ignore
          material.height
        );
        break;
      default:
        throws("Unsupported Material type");
    }
  }
}

/**
 * 
 * @implements {Material}
*/
class BasicMaterial {
  type = MaterialType.BASIC
  /**
   * 
   * @type {string}
   * @default "white"
   */
  fill = "white"
  /**
   * 
   * @type {string}
   * @default "black"
   */
  stroke = "black"
  /**
   * 
   * @type {Boolean}
   * @default false
   */
  wireframe = false
}

/**
 * 
 * @implements {Material}
 */
class StaticImageMaterial{
  type = MaterialType.STATICIMAGE
  /**
   * @readonly
   * @type {Image}
   */
  image
  /**
   * 
   * @type {number}
   */
  width = 100
  /**
   * 
   * @type {number}
   */
  height = 100
  /**
   * @type {Vector_like}
   */
  offset = {
    x: 0,
    y: 0
  }
  /**
   * @param {Image} img
   */

  constructor(img, width = 100, height = 100) {
    this.image = img;
    this.width = width;
    this.height = height;
    this.offset.x = -width/2;
    this.offset.y = -height/2;
  }
}

/**
 * 
 * @implements {Material}
 */
class SpriteMaterial {
  type = MaterialType.SPRITE
  /**
   * @type {HTMLImageElement}
   */
  img
  /**
   * The index of the current action.
   * 
   * @private
   * @type {number}
   */
  _index = 0
  /**
   * The current action's max frame index.
   * 
   * @private
   * @type {number}
   */
  _maxFrame = 0
  /**
   * The current frame of an action.
   * 
   * @private
   * @type {number}
   */
  _frame = 0
  /**
   * Used with ImageSprite#frameRate to throttle the fps of the sprite.
   * 
   * @private
   * @type {number}
   */
  _accumulator = 0
  /**
   * The maximum frames for each given action.
   * 
   * @type {number}
   */
  frameRate = 1 / 60
  /**
   * The current action.
   * 
   * @private
   * @type {number[]}
   */
  _maxFrames = []
  /**
   * The width of the sprite.
   * 
   * @type {number}
   */
  width = 0
  /**
   * The height of the sprite..
   * 
   * @type {number}
   */
  height = 0
  /**
   * The width of a frame.
   * 
   * @private
   * @type {number}
   */
  frameWidth = 0
  /**
   * The height of a frame..
   * 
   * @private
   * @type {number}
   */
  frameHeight = 0
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
   * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(img, frames = 1, actions = 1) {
    this.img = img;
    this.setup(frames, actions);
  }
  /**
   * 
   * @param {number} frames
   * @param {number} actions
   */
  setup(frames, actions) {
    this._maxFrame = frames - 1;
    this.frameWidth = this.img.width / (frames || 1);
    this.frameHeight = this.img.height / actions;
    this.width ||= this.frameWidth;
    this.height ||= this.frameHeight;
    for (var i = 0; i < actions; i++) {
      this._maxFrames.push(frames);
    }
  }
  /**
   * Sets max number of frames for a given action
   * 
   * @param {number} action 
   * @param {number} max
   */
  setMaxFrames(action, max) {
    this._maxFrames[action] = max;
  }
  /**
   * Sets a given action to be rendered
   * 
   * @param {number} index
   */
  setAction(index) {
    this._maxFrame = (this._maxFrames[index] || 0);
    this._index = index;
    this._frame = 0;
  }
}

/**
 * Material for rendering text.
 */
class TextMaterial extends Material {
  type = MaterialType.TEXT
  /**
   * @type {String}
   */
  text = ""
  /**
   * @type {boolean}
   */
  center = false
  /**
   * @type {String}
   */
  color = "white"
  /**
   * @type {boolean}
   */
  fill = true
  /**
   * @type {String}
   */
  font = "16px sans-serif"
  /**
   * @param {String} text
   */
  constructor(text) {
    super();
    this.text = text;
  }
}

/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * TODO - ADD id property to this class and Group class.
 * * @template {BufferGeometry} T
 * * @template {Material} U
 */
class Sprite {
  /**
   * @private
   * @type {T}
   */
  geometry
  /**
   * @private
   * @type {U}
   */
  material
  /**
   * @param {T} geometry
   * @param {U} material
   */
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
  }
  /**
   * @deprecated
   * @template {BufferGeometry} T
   * @template {Material} U
   * @param {CanvasRenderingContext2D} ctx
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {Sprite<T,U>} sprite
   * @param {number} dt
   */
  static render(
    ctx,
    sprite,
    position,
    orientation,
    scale,
    dt
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(position.x, position.y);
    ctx.rotate(orientation);
    ctx.scale(scale.x, scale.y);
    // @ts-ignore
    Material.render(sprite.material,ctx, dt, sprite.geometry.drawable);
    ctx.closePath();
    ctx.restore();
  }
}

/**
 * Used for grouping similar.
 * 
 * @augments Sprite
 */
class Group extends Sprite {
  /**
   * @private
   * @type Sprite[]
   */
  _children = null
  /**
   * @private
   * @type Group
   */
  parent = null
  /**
   * @param {Sprite[]} sprites
   */
  constructor(sprites = []) {
    super();
    this._children = sprites;
  }

  /**
   * Adds another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    this._children.push(sprite);
    sprite.parent = this;
  }
  /**
   * Removes another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   * @param {boolean} [recursive=false]
   * @param {number} [index]
   */
  remove(sprite, recursive = false, index) {
    let inx = index ?? this._children.indexOf(sprite);
    if (inx !== -1) {
      this._children[inx].parent = null;
      Utils.removeElement(this._children, inx);
      return true
    }
    if (!recursive) return false
    for (var i = 0; i < this._children.length; i++) {
      if (this._children.CHAOS_OBJ_TYPE == "group") {
        let t = this._children[i].remove(sprite, recursive, index);
        if (t) return true
      }
    }
    return false
  }
  /**
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  render(ctx, dt) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].render(ctx, dt);
    }
  }
}

/**
 * Handled the keyboard input of an application on a PC.
*/
class Keyboard {
  /**
   * Dictionary of keys showing if they are active or not.
   * 
   * @type Object<string,boolean>
  */
  keys = {}
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.keys = {};
    this.init(eh);
  }
  /**
   * Ensures that keycodes are produced in a consistent manner
   * 
   * @private
   * @param {string} keycode
   * @returns {string}
  */
  normalize(keycode) {
    let r = keycode;
    if (keycode.includes('Key')) {
      r = r.slice(3, r.length);
    }
    return r.toUpperCase()
  }
  /**
   * Adds Keyboard events to the DOM.
   * 
   * @param {DOMEventHandler} eh
  */
  init(eh) {
    eh.add('keydown',this._onDown);
    eh.add('keyup',this._onUp);
  }
  /**
   * @private
  */
  // @ts-ignore
  _onDown = e => {
    let key = this.normalize(e.code);
    this.keys[key] = true;
    //this.activeKeys.push(key)
  }
    /**
     * @private
     */
  // @ts-ignore
  _onUp = e =>{
    this.keys[this.normalize(e.code)] = false;
  }
}

/**
 * This handles all inputs from mouse and touchpad on laptops
 */

class Mouse {
  /**
   * Number of times the mouse has been clicked.
   * 
   * @type number
   */
  clickCount = 0
  /**
   * If the mouse is being dragged or not.
   * 
   * @type boolean
   */
  dragging = false
  /**
   * The position from which the mouse is being dragged.
   * 
   * @type Vector_like
   */
  dragLastPosition = { x: 0, y: 0 }
  /**
   * Distance vector between the last frame's position and current position.
   * 
   * @type Vector_like
   */
  delta = { x: 0, y: 0 }
  /**
   * Position of the mouse in current frame.
   * 
   * @type Vector_like
   */
  position = { x: 0, y: 0 }
  /**

   * Position of the mouse in last frame.

   * 
   * @type Vector_like
   */
  lastPosition = { x: 0, y: 0 }
  /**
   * If the left mouse button is pressed or not.
   * 
   * @type boolean
   */
  leftbutton = false
  /**
   * If the right mouse button is pressed or not.
   * 
   * @type boolean
   */
  rightbutton = false
  /**
   * @param {DOMEventHandler} eh
   */
  constructor(eh) {
    this.init(eh);
  }
  /**
   * Checks to see if the vector provided is
   * within a dragbox if mouse is being dragged with a right or left button down
   * 
   * @param {Vector_like} pos an object containing x and y coordinates to be checked
   * @returns {Boolean}
   * 
   */
  inDragBox(pos) {
    if (!this.dragging) return false
    if (pos.x > this.dragLastPosition.x && pos.x < this.position.x &&
      pos.y > this.dragLastPosition.y &&
      pos.y < this.position.y) {
      return false
    }
    return true
  }
  /**
   * Initializes the mouse by appending to the DOM
   *
   * @param {DOMEventHandler} eh
   */
  init(eh) {
    eh.add('click', this._onClick);
    eh.add('mousedown', this._onDown);
    eh.add('mouseup', this._onUp);
    eh.add('wheel', this._onWheel);
    eh.add('mousemove', this._onMove);
    eh.add("contextmenu", this._onContextMenu);
  }
  /**
   * @private
   */
  // @ts-ignore
  // @ts-ignore
  _onClick = (e) => {
    ++this.clickCount;
  }
  /**
   * @private
   */
  // @ts-ignore
  _onMove = (e) => {
    this.position.x = e.clientX;

    this.position.y = e.clientY;

    if (this.lastPosition.x === undefined) {
      this.lastPosition = { ...this.position };
    }
    this.delta.x = this.position.x - this.lastPosition.x;
    this.delta.y = this.position.y - this.lastPosition.y;
    this.dragging = this.leftbutton || this.rightbutton ? true : false;
    if (!this.dragging) {
      this.dragLastPosition.x = e.clientX;
      this.dragLastPosition.y = e.clientY;
    }
  }
  /**
   * @private
   */
  // @ts-ignore
  _onDown = (e) => {
    switch (e.button) {

      case 0:

        this.leftbutton = true;
        break;
      case 2:
        this.rightbutton = true;
        break;
    }
  }
  /**
   * @private
   */
  // @ts-ignore
  _onUp = (e) => {
    switch (e.button) {
      case 0:
        this.leftbutton = false;
        break;
      case 2:
        this.rightbutton = false;
        break;
    }
  }
  /**
   * @private
   */
  // @ts-ignore
  _onWheel = (e) => {
  }
  /**
   * @private
   */
  // @ts-ignore
  _onContextMenu = (e) => {
    e.preventDefault();
  }
  /**
   * Updates the mouse internals.
   */
  update() {
    this.lastPosition = { ...this.position };
  }
}

/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
class Touch {
  /**
   * @type TouchEvent[]
   */
  touches = []
  /**
   * @type number
  */
  clickCount = 0
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.init(eh);
  }
  /**
   * Adds Touch events to the DOM.
   * 
   * @param {DOMEventHandler} eh
   */
  init(eh) {
    eh.add('touchstart', this._onDown);
    eh.add('touchend', this._onUp);
    eh.add('touchmove', this._onMove);
  }
  /**
   * @private
   */
  // @ts-ignore
  _onMove = (e) => {
    e.preventDefault();
  }
  /**
   * @private
   */
  // @ts-ignore
  _onDown = (e) => {
    this.touches = e.touches;
  }
  /**
   * @private
   */
  // @ts-ignore
  _onUp = (e) => {
    this.touches = e.touches;
  }
  update() {}
}

/**
 * This handles all inputs from the mouse,touch and keyboards.
 * 
 */
class Input {
  /**
   * This attaches callbacks to the DOM.
   * 
   * @type {DOMEventHandler}
  */
  DOMEventHandler
  /**
   * 
   * @type {Mouse}
  */
  mouse
  /**
   * 
   * @type {Touch}
  */
  touch
  /**
   * 
   * @type {Keyboard}
  */
  keyboard
  /**
   * @param {DOMEventHandler} eventHandler
  */
  constructor(eventHandler) {
    this.DOMEventHandler = eventHandler || new DOMEventHandler();
    this.mouse = new Mouse(this.DOMEventHandler);
    this.touch = new Touch(this.DOMEventHandler);
    this.keyboard = new Keyboard(this.DOMEventHandler);
  }
  /**
   * Updates all inputs.
  */
  update() {
    this.mouse.update();
    this.touch.update();
  }
  /**
   * Remove all bindings to the DOM for all input types.
  */
  dispose() {
    //TODO remove eventlisteners
    //this.mouse.dispose()
    //this.keyboard.dispose()
    //this.touch.dispose()
  }
}

/**
 * This class is responsible for playing a singular sound.
 */
class Sfx {
  /**
   * @private
   * @type {AudioBuffer}
   */
  _soundBuffer
  /**
   * @private
   * @type {AudioBufferSourceNode}
   */
  _source
  //Todo - Check to see if this one works
  /**
   * @private
   * @type {Function}
   */
  _onended = ()=>{}
  /**
   * @private
   * @type {AudioNode}
   */
  _destination
  /**
   * @private
   * @type {number}
   */
  _playingOffset = 0
  /**
   * Time on the sound to begin playing 
   * 
   * @type {number}
   */
  offset = 0
  /**
   * Whether to start from the beginning after sound has finished playing.
   * 
   * @type {boolean}
   */
  loop = false
  /**
   * @private
   * @type {number}
   */
  delay = 0
  /**
   * how long to play the sound.
   * 
   * @type {number}
   */
  duration = 0
  /**
   * @param {AudioHandler} handler 
   * @param {AudioBuffer} buffer
   */
  constructor(handler, buffer) {
    this.handler = handler;
    this.ctx = handler.ctx;
    this._source = handler.ctx.createBufferSource();
    this._soundBuffer = buffer;
    this._destination = handler.masterGainNode;
    this._startTime = Date.now();
    this.finished = false;
    this.id = -1;
    this.duration = buffer.duration;

  }
  /**
   * Set callback when the sound finishes playing.
   * 
   * @param {Function} x 
  */
  set onended(x) {
    this._onended = x;
  }
  /**
   * Plays an sfx from the beginning.
   */
  play() {
    this._playingOffset = this.offset;
    this.resume();
  }
  /**
   * Continues playing an sfx from where it was paused.
   */
  resume() {
    this._source = this.ctx.createBufferSource();
    this._source.buffer = this._soundBuffer;
    this._startTime = Date.now();
    this._source.connect(this._destination);
    this._source.start(this.delay, this._playingOffset, this.duration);
    this._source.loop = this.loop;
  }
  /**
   * Halts playing of an sfx.
   */
  pause() {
    this._source.stop();
    let time = (Date.now() - this._startTime) / 1000 + this._playingOffset;
    this._playingOffset = this.duration <= time ? this.offset : time;
  }
  /**
   * Disconnects this sfx from its current destination.
   */
  disconnect() {
    this._source.disconnect();
  }
  /**
   * Sets the given audionode to be the output destination of an sfx
   * 
   * @param {AudioNode} node
   */
  connect(node) {
    if (node)
      this._destination = node;
    if (!this._source) return;
    this._source.disconnect();
    this._source.connect(this._destination);
  }
}

/**
 * Manages playing of audio using Web Audio.
 */
class AudioHandler {
  /**
   * Audio context to use.
   * 
   *  @private
   * @type {AudioContext}
   */
  ctx = new AudioContext()
  /**
   * List of audio buffers to use.
   * 
   *  @private
   * @type {Object<string,AudioBuffer>}
   */
  sfx = {}
  /**
   * The name of the background music playing.
   * 
   *  @private
   * @type {string}
   */
  _backname = ""
  /**
   * The audiobuffer of the background music.
   * 
   *  @private
   * @type {Sfx | null }
   */
  _background = null
  /**
   * List of playing sounds
   * 
   * @private
   * @type {Sfx[]}
   */
  playing = []
  /**
   * What to play after loading the audiobuffers.
   * 
   * @private
   * @type {Record<string,number>}
   */
  toplay = {}
  /**
   * Volume to resume playing when unmuted.
   * 
   * @private
   * @type {number}
   */
  _mute = 1
  /**
   * Master volume for all sounds.
   * 
   * @private
   * @type {GainNode}
   */
  masterGainNode
  /**
   * @type {string}
   */
  baseUrl = ""
    /**
     * If the manager can play a sound.
   * @type boolean
   */
  canPlay = false
  constructor() {
    this.masterGainNode = this.ctx.createGain();
    this.masterGainNode.connect(this.ctx.destination);
    this.canPlay = this.ctx.state == "running";
    let that = this;
    window.addEventListener("pointerdown", function resume() {
      that.ctx.resume();
      if (that.ctx.state == "running") {
        removeEventListener("pointerdown", resume);
        that.canPlay = true;
      }
    });
  }
  /**
   * Load a sound into a sound manager
   * 
   * @param {string} src
   */
  load(src) {
    let name = src.split(".")[0];
    fetch(this.baseUrl + "/" + src)
      .then(e => e.arrayBuffer())
      .then(e => this.ctx.decodeAudioData(e))
      .then(e => {
        this.sfx[name] = e;
        if (this._backname == name)
          this.playBackgroundMusic(name);
        if (name in this.toplay) {
          this.playEffect(name);
        }
      }).catch(err => console.log(err));
  }
  /**
   * Loads all audio from the loader.
   * 
   * @param {*} loader
   */
  /*loadFromLoader(loader) {
    for (var n in loader.sfx) {
      let name = n
      this.ctx.decodeAudioData(loader.sfx[n]).then(e => {
        this.sfx[n] = e
        if (this._backname == name)
          this.playMusic(name)
        if (name in this.toplay) {
          this.playEffect(name)
        }
      })
    }
  }*/
  /**
   * Plays a single audio as the background in a loop throughout the game
   * 
   * @param {string} name
   */
  playBackgroundMusic(name) {
    this._backname = name;
    if (!(name in this.sfx))
      return
    this._background = new Sfx(this, this.sfx[name]);
    this._background.loop = true;
    this._background.play();
  }
  /**
   * Plays a sound only once.
   * 
   * @param {string} name Name of audio to play.
   * @param {number} [offset] Where to start playing the audio.It is in seconds.
   * @param {number} [duration] how long in seconds will the audio defaults to total duration of the selected audio. 
   */
  playEffect(name, offset = 0, duration = 0) {
    if (!(name in this.sfx)) {
      this.toplay[name] = 1;
      return
    }
    let s = new Sfx(this, this.sfx[name]);
    let id = this.playing.length;
    s.id = id;
    s.offset = offset;
    if (duration)
      s.duration = duration;
    this.playing.push(s);
    s.play();
  }

  /**
   * Creates and returns an SFX.
   * 
   * @param {string} name
   * @rerurns Sfx
   */
  createSfx(name) {
    ///throw error if name is not in this.
    return new Sfx(this, this.sfx[name])
  }
  /**
   * Pauses currently playing sounds.
   */
  pauseAll() {
    this.playing.forEach(sound => {
      sound.pause();
    });
  }
  /**
   * Sets the volume to zero.Sounds will continue playing but not be audible.
   */
  mute() {
    if(!this.masterGainNode)return
    this._mute = this.masterGainNode.gain.value;
    this.masterGainNode.gain.value = 0;

  }
  /**
   * Restores the volume before it was muted.
   */
  unmute() {
    this.masterGainNode.gain.value = this._mute;
  }
  /**
   * Removes an sfx from the handler and disconnects it from its destination.
   * 
   * @param {Sfx} sfx
   */
  remove(sfx) {
    let id = this.playing.indexOf(sfx);
    if (id == -1) return
    sfx.disconnect();
    removeElement(this.playing, id);
  }
}

/**
 * Base class for implementing customized behaviours.
 * 
 */

class Behaviour {
  /**
   * The maximum speed a behaviour will reach when active.
   * 
   * @type {number}
   */
  maxSpeed = 1000
  /**
   * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
   * 
   * @type {number}
   */
  maxForce = 1000
  /**
   * Whether to exert a behaviour's calculated force onto its agent
   * 
   * @type {boolean}
   */
  active = true
}

let tmp1$4 = new Vector2();
/**
 * Creates a behaviour to evade a certain position.
 * 
 * @augments Behaviour
*/
class EvadeBehaviour extends Behaviour {
  /**
   * Distance in which to begin evading.
   * 
   * @type {number}
  */
  radius = 200
  /**
   * @param { Vector2 } pursuer
  */
  constructor(pursuer) {
    super();
    this.pursuer = pursuer;
  }
  /**
   * @inheritdoc
   * @param {Vector2} position
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(position,velocity,target,inv_dt) {
    let difference = tmp1$4.copy(position).sub(this.pursuer);
    let length = difference.magnitude();
    if (length == 0 || length > this.radius) return
    difference.setMagnitude(map(length,0,this.radius,this.maxSpeed,0));
    let steering = difference.sub(velocity).multiply(inv_dt);

    steering.clamp(0,this.maxForce);
    target.copy(steering);
  }
}

let tmp1$3 = new Vector2(),
  tmp2$1 = new Vector2();
  
/**
 * Creates a behaviour that is used to make an agent wander in an organic manner.
 * 
 * @augments Behaviour
*/
class WanderBehaviour extends Behaviour {
  /**
   * This sets a point on the perimeter circle that is infront of the agent.
   * 
   * @type {number}
   */
  _theta = Math.PI
  /**
   * This clamps the offset that modify the WandererBehaviour#theta value each frame.
   * 
  * @type {number}
  */
  dtheta = Math.PI/18
  /**
   * How big should the circle in front of the agent be.
  */
  _radius = 100
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns {Vector2} the first parameter
   */
  calc(velocity,target, inv_dt) {

    this._theta += rand(-this.dtheta, +this.dtheta);
    let forward = tmp1$3.copy(velocity);
    if (forward.equalsZero())
      Vector2.random(forward);
    let radius = this._radius * 0.8;
    forward.setMagnitude(this._radius);
    Vector2.fromAngle(this._theta + Vector2.toAngle(velocity), tmp2$1).multiply(radius);
    forward.add(tmp2$1); 
    forward.setMagnitude(this.maxSpeed);
    forward.sub(velocity).multiply(inv_dt).clamp(0, this.maxForce);
    return target.copy(forward)
  }

}

/**
 * Not impemented.
 * 
 * @augments Behaviour
*/
class Pursuit extends Behaviour {
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target,inv_dt) {

  }
}

/**
 * not complete.
 * 
 * @augments Behaviour
 */
class Flock extends Behaviour{
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target,inv_dt) {

  }
}

let tmp1$2 = new Vector2();
  
/**
 * Creates a behaviour to seek out a target and move towards it.
 * 
 * @augments Behaviour
*/
class SeekBehaviour extends Behaviour {
  /**
   * Not implemented.
   * Radius in which to seek out the target.
   * 
   * @type {number}
  */
  radius = 100
  /**
   * @type {Vector2}
  */
  target
    /**
   * @param { Vector2} target
  */
  constructor(target) {
    super();
    this.target = target;
  }
  /**
   * @inheritdoc
   * @param {Vector2} position
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(position,velocity,target,inv_dt) {
    let difference = tmp1$2.copy(this.target).sub(position);
    difference.setMagnitude(this.maxSpeed);
    let steering = difference.sub(velocity).multiply(inv_dt);
    
    steering.clamp(0, this.maxForce);
    target.copy(steering);
  }
}

let tmp1$1 = new Vector2();

/**
 * This provides a seek behaviour which slows down when the agent approaches a target.
 * 
 * @augments Behaviour
 */
class ArriveBehaviour extends Behaviour {
  /**
   * Radius in which to expect the agent to start slowing down.
   * 
   * @type number
   */
  radius = 1000
  /**
   * @param { Vector2} target
   */
  constructor(target) {
    super();
    this.target = target;
  }
  /**
   * @inheritdoc
   * @param {Vector2} position
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(position,velocity,target, inv_dt) {
    const difference = tmp1$1.copy(this.target).sub(position);
    //const velocity = tmp2.copy(velocity1)
    const length = difference.magnitude();

    if (length < this.radius) {
      difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed));
    } else {
      difference.setMagnitude(this.maxSpeed);
    }

    const steering = difference.sub(velocity).multiply(inv_dt);

    steering.clamp(0, this.maxForce);
    target.add(steering);
  }
}

let tmp = new Vector2();
class Path {
  /**
   * @private
   * @type {Vector2[]}
   */
  _points = []
  /**
   * @private
   * type number 
   */
  _index = 0
  /**
   * type number 
   */
  speed = 20
  /**
   * type number 
   */
  tolerance = 20
  /**
   * @private
   * type number 
   */
  _lerp_t = 0
  /**
   * @private
   * type number 
   */
  _lerpdist = 0
  /**
   * @private
   * type number[]
   */
  _way = [0, 1]
  /**
   * @private
   * type boolean 
   */
  _finished = false
  /**
   * @private
   * type Vector2 
   */
  _lerpedPoint = new Vector2()
  /**
   * type boolean 
   */
  loop = false
  /**
   * @param { Vector2} point
   */
  add(point) {
    this._points.push(point);

    return this
  }
  clear() {
    this._points.length = 0;
    this._way[0] = 0;
    this._way[1] = 0;
    this._lerp_t = 0;
    this._finished = false;

    return this
  }
  /**
   * @private
   */
  advance() {
    if (this._points.length < 2) return false
    if (this._way[1] == this._points.length - 1 &&
      !this.loop) return false
    if (
      this._way[1] == this._points.length - 1 &&
      this.loop
    ) {
      this._way[0] = this._points.length - 1;
      this._way[1] = 0;
      this._lerp_t = 0;
      return true
    }
    this._way[0] = this._way[1];
    this._way[1] += 1;
    this._lerp_t = 0;
    return true
  }
  /**
   * 
   * @param {number} lerpdist
   */
  update(lerpdist = this._lerpdist) {
    if (this._finished) return this._lerpedPoint
    let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitude();
    this._lerp_t = (this.speed + lerpdist) / dist;
    if (this._lerp_t > 1 && (dist - lerpdist) < this.tolerance) {
      if (!this.advance()) this._finished = true;
    }
    this._lerp_t = clamp(this._lerp_t, 0, 1);
    Vector2.lerp(
      this._points[this._way[0]],
      this._points[this._way[1]],
      this._lerp_t,
      this._lerpedPoint
    );
    return this._lerpedPoint
  }
  /**
   * @returns {Vector2[]}
   */
  current() {
    return [
      this._points[this._way[0]],
      this._points[this._way[1]]
      ]
  }
  /**
   * @returns {Vector2}
   */
  point() {
    return this._lerpedPoint
  }
  /**
   * @type {Vector2[]}
   */
  get path() {
    return this._points
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    vertices(ctx, this._points, this.loop);
    stroke(ctx, "lightgreen");
    ctx.closePath();
  }
}

const tmp1 = new Vector2();
const tmp2 = new Vector2();
/**
 * Creates a behaviour that follows a certain path.
 * 
 * @augments Behaviour
 */
class PathFollowing extends Behaviour {
  /**
   * The path taken by a pathfollowing behaviour.
   * 
   * @type {Path}
   */
  path
  /**
   * @param {Path} path
   */
  constructor(path) {
    super();
    this.path = path;
    path.speed = this.maxSpeed;
  }
  /**
   * @inheritdoc
   * @param {Vector2} position
   * @param {Vector2} velocity
   * @param {Vector2} target
   * @param {number} inv_dt
   * @returns {Vector2} the first parameter
   */
  calc(position,velocity,target, inv_dt) {
    tmp1.copy(position);
    let [p1, p2] = this.path.current();
    tmp2.copy(p2).sub(p1).normalize();

    let proj = tmp2.dot(tmp1.sub(p1));
    let projPoint = this.path.update(proj);
    tmp1.copy(projPoint).sub(position);
    let length = tmp1.magnitude();
    if (length < velocity.magnitude()) {
      tmp1.setMagnitude(map(length, 0, this.maxSpeed, 0, this.maxSpeed));
    }
    let steering = tmp1.sub(velocity).multiply(inv_dt);

    steering.clamp(0, this.maxForce);
    target.add(steering);

    return target
  }
  /**
   * Removes all points on the path.
   */
  clear() {
    this.path.clear();
  }
  /**
   * Adds a point into the path.
   * 
   * @param { Vector2} point
   */
  add(point) {
    this.path.add(point);
  }
  /**
   * If the agent should start at the beginning after reaching the ent of the path.
   * 
   * @type boolean
   */
  set loop(x) {
    this.path.loop = x;
  }
  get loop() {
    return this.path.loop
  }
  /**
   * Sets a new path to follow.
   *
   * @param {Path} path
   */
  setPath(path) {
    this.path = path;
  }
}

/**
 * This is a component class used to add AI behavior to an entity.
 */
class Agent {
  /**
   * The maximum speed of the agent in pixels per second.
   * 
   * @type {number}
   */
  maxSpeed = 20
  /**
   * Maximum rotation of the agent in radians per second
   * Not yet implemented.
   * @type {number}
   */
  maxTurnRate = 5
  /**
   * 
   * @type {Behaviour[]}
   */
  behaviours = []
  /**
   * Adds a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  add(behaviour) {
    this.behaviours.push(behaviour);
  }
  /**
   * Removes a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  remove(behaviour) {
    this.behaviours.splice(
      this.behaviours.indexOf(behaviour),
      1
    );
  }
  /**
   * :
   * @param {number} inv_dt Inverse of delta time i.e frameRate.
   * @param {Agent} agent
   * @param {any} transform
   * @param {any} movable
   */
  static update(agent, transform, movable, inv_dt) {
    Agent.updateBehaviours(agent.behaviours, transform, movable, inv_dt);
  }
  /**
   * Updates the behaviours of the agent and applies changes to agent.
   * @param {number} inv_dt
   * @param {string | any[]} behaviours
   * @param {any} transform
   * @param {{ acceleration: { add: (arg0: Vector2) => void; }; torque: number; }} movable
   */
  static updateBehaviours(behaviours, transform, movable, inv_dt) {
    const accumulate = new Vector2();
    const angular = new Angle();
    for (let i = 0; i < behaviours.length; i++) {
      behaviours[i].calc(
        transform,
        movable,
        accumulate,
        angular,
        inv_dt
      );
      accumulate.add(accumulate);
    }
    movable.acceleration.add(accumulate);
    movable.torque += angular.value;
  }
}

/**
* A system that manages agent components by updating them.
*/
class AgentManager {}

/**
 * Contains values showing which features are supported,general model of the device and browser used.
 */

const DEVICE = {
  /**
   * Whether this device supports WebGPU
   * 
   * @type {boolean}
   */
  webgpu: false,
  /**
   * Whether this device supports WebGL
   * 
   * @type {boolean}
   */
  webgl: false,
  /**
   * Whether this device supports 2D canvas
   * 
   * @type {boolean}
   */
  canvas: false,
  /**
   * Whether this device supports WebAudio
   * 
   * @type {boolean}
   */
  webAudio: false,
  /**
   * Whether this device supports Audio tag.
   * 
   * @type {boolean}
   */
  audio: false,

  /**
   * A list of audio extensions this device supports.
   * 
   * @type {string[]}
   */
  supportedAudio: [],
  //Todo - Get the supported images correctly
  /**
   * A list of image extensions this device supports.
   * 
   * @type {string[]}
   */
  supportedImages: ["png","jpeg","svg","jpg"],

  /**
   * Whether this device uses windows
   * 
   * @type {boolean}
   */
  windows: false,
  /**
   * Whether this device uses MacOS
   * 
   * @type {boolean}
   */
  mac: false,
  /**
   * Whether this device uses android
   * 
   * @type {boolean}
   */
  android: false,
  /**
   * Whether this device uses linux
   * 
   * @type {boolean}
   */
  linux: false,
  /**
   * Whether this device uses IOS
   * 
   * @type {boolean}
   */
  ios: false,

  /**
   * If browser used is Chrome.
   * 
   * @type {boolean}
   */
  chrome: false,
  /**
   * If browser used is FireFox.
   * 
   * @type {boolean}
   */
  firefox: false,
  /**
   * If browser used is Edge.
   * 
   * @type {boolean}
   */
  edge: false,
  /**
   * If browser used is Internet Explorer.
   * 
   * @type {boolean}
   */
  ie: false,
  /**
   * If browser used is Safari.
   * 
   * @type {boolean}
   */
  safari: false,
  /**
   * If browser used is Opera.
   * 
   * @type {boolean}
   */
  opera: false

};
const ua = navigator.userAgent;
const ae = new Audio();

if (/Android/.test(ua)) {
  DEVICE.android = true;
}
else if (/iP[ao]d|iPhone/i.test(ua)) {
  DEVICE.ios = true;
}
else if (/Linux/.test(ua)) {
  DEVICE.linux = true;
}
else if (/Mac OS/.test(ua)) {
  DEVICE.mac = true;
}
else if (/Windows/.test(ua)) {
  DEVICE.windows = true;
}


if (window.AudioContext && window.AudioBuffer && window.AudioBufferSourceNode) {
  DEVICE.webAudio = true;
}

if (/Chrome/.test(ua)) {
  DEVICE.chrome = true;
}
else if (/Firefox/.test(ua)) {
  DEVICE.firefox = true;
}
else if (/Trident/.test(ua)) {
  DEVICE.edge = true;
}
else if (/Opera/.test(ua))
{
  DEVICE.opera = true;
}
else if (/Safari/.test(ua))
{
  DEVICE.safari = true;
}

if (DEVICE.audio = !!ae.canPlayType)
{
  if (ae.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("ogg");
  }

  if (ae.canPlayType('audio/mpeg;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("mp3");
  }
  if (ae.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("wav");
  }

  if (ae.canPlayType('audio/x-m4a;').replace(/^no$/,'') || ae.canPlayType('audio/aac;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("m4a");
  }
}

DEVICE.canvas = !!window.CanvasRenderingContext2D;
DEVICE.webgl = !!window.WebGLRenderingContext;

Object.freeze(DEVICE);
Object.freeze(DEVICE.supportedAudio);
Object.freeze(DEVICE.supportedImages);

class LoadManager {
  _total = 0
  _sucessful = 0
  _failed = 0
  onItemFinish = NOOP
  onItemStart = NOOP
  onItemError = NOOP
  onFinish = NOOP
  onError = NOOP
  /**
   * @param {LoadManager} manager
   * @param {string} url
   */
  static itemStart(manager, url) {
    manager._total += 1;
    manager.onItemStart(url);
  }
  /**
   * @param {Response} request
   * @param {LoadManager} manager
   */
  static itemFinish(manager, request) {
    if (!request.ok)
      return LoadManager.itemError(manager, request)

    manager._sucessful += 1;
    manager.onItemFinish(request);
  }
  /**
   * @param {LoadManager} manager
   */
  static finish(manager) {
    if (manager._sucessful + manager._failed === manager._total) manager.onFinish();
  }
  /**
   * @param {LoadManager} manager
   * @param {Response} request
   */
  static itemError(manager, request) {
    error("Could not load the resource \"" + request.url + "\".Resource was not found.");
    manager._failed += 1;
    manager.onItemError();
  }
}

/**
 * @param {*} _args
 * @returns {void}
 */
function NOOP(..._args) {}

/**
 * @param {string} url
 */
function getURLName(url){
  const prelude = url.split("/").pop();
  if(!prelude)return ""
  return prelude.split(".")[0]
}
/**
 * @param {string} url
 */
function getURLExtension(url){
  const prelude = url.split(".").pop();
  if(!prelude)return ""
  return prelude
}

/**
 * @template T
 */
class Loader {
  /**
   * @type {{ [x: string]: T; }}
   */
  _resources = {}
  manager
  baseUrl = ""
  constructor(manager = new LoadManager()) {
    this.manager = manager;
  }
  name() {
    return this.constructor.name
  }
  /**
   * @param {string} _extension
   */
  verify(_extension) {
    return true
  }
  /**
   * @abstract
   * @param {Response} _request
   * @returns {Promise<T | undefined>}
   */
  async parse(_request) {
    return new Promise(()=>{})
  }
  /**
   * @param {string} url
   */
  async load(url) {
    const fullurl = this.baseUrl + url;
    const name = getURLName(url);
    const extension = getURLExtension(url);

    if (this._resources[name])
      return warn("Duplicate load of \"" + fullurl + "\".")
    if (!this.verify(extension))
      return error(`\`${this.name()}\` could not load "${fullurl}" as it does not support the extension ${extension}.`)

    const request = await fetch(fullurl);

    LoadManager.itemStart(this.manager, fullurl);
    const resource = await this.parse(request);
    if (resource) this._resources[name] = resource;
    LoadManager.itemFinish(this.manager, request);
    LoadManager.finish(this.manager);
  }
  /**
   * @param {string} name
   */
  get(name) {
    const resource = this._resources[name];
    if (!resource) throws(`\`${this.name()}\` could not find the resource "${name}" `);
    return resource
  }
}

/**
 * @extends {Loader<{buffer: ArrayBuffer}>}
 */
class SoundLoader extends Loader {
  /**
   * @inheritdoc
   * @param {string} extension
   */
  verify(extension){
    if (DEVICE.supportedAudio.includes(extension))return true
    return false
  }
  /**
   * @param {Response} request
   */
  async parse(request) {
    if(!request.ok) return
    const raw = await request.arrayBuffer();

    return {
      buffer: raw
    }
  }
}

/**
 * @extends {Loader<{buffer: ArrayBuffer;dimensions:Vector_like}>}
 */
class ImageLoader extends Loader {
  /**
   * @param {string} extension
   */
  verify(extension) {
    if (DEVICE.supportedImages.includes(extension)) return true
    return false
  }
  /**
   * @param {Response} request
   */
  async parse(request) {
    if (!request.ok) return

    const raw = await request.arrayBuffer();
    const dimensions = await getDimensions(raw);
    return {
      buffer: raw,
      dimensions
    }
  }
}

/**
 * @param {BlobPart} raw
 * @returns {Promise<Vector_like>}
 */
function getDimensions(raw) {
  return new Promise((resolve,reject) => {
    const url = URL.createObjectURL(new Blob([raw]));
    const img = new Image();
    img.onload = e => {
      resolve({
        x: img.width,
        y: img.height
      });
    };
    img.src = url;
    URL.revokeObjectURL(url);
  })
}

/**
 * Used to manipulate and read from the cookie string.
 * 
 * @module Cookie
 */

const Cookies = {
  /**
   * Adds a cookie pair to cookies.
   * 
   * @param {string} n Key of the cookie.
   * @param {string} v The value of the cookie.
   * @param {number} [maxAge=12000] Max age of the cookie before it is deleted.
   */
  set(n, v, maxAge = 12000) {
    document.cookie = `${n}=${v};maxAge=${maxAge}`;
  },
  /**
   * Returns the value of the given key.
   * 
   * @param {string} n Key of the cookie
   * @returns {string | undefined}
   */
  get(n) {
    let arr = document.cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=');
      if (pair[0] === n) return pair[1]
    }
  },
  /**
   * Removes a cookie by its key from cookies.
   * 
   * @param {string} n Key of the cookie
   */
  delete(n) {
    document.cookie = `${n}=; max-age=0`;
  },
  /**
   * Removes all cookies that are contained on the document.
   */
  clear() {
    let arr = document.cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=');
      this.delete(pair[0]);
    }
  }
};

/**
 * This provides temporary storage when your application tab is open.
 * 
 * @module Session
*/
const Session = {
  /**
   * Adds a value to sessions
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v);
    sessionStorage.setItem(k,json);
  },
  /**
   * Gets a value from sessions using a key
   * @template T
   * @param {string} k A key to retrieve a value
   * @returns {T | undefined}
  */
  get(k) {
    let json = sessionStorage.getItem(k);
    if(!json)return undefined
    return JSON.parse(json)
  },
  /**
   * Removes everything from sessions
  */
  clear() {
    sessionStorage.clear();
  }
};

/**
 * This provides permanent storage
*/

const Storage = {
  /**
   * Adds a value to local storage
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v);
    localStorage.setItem(k,json);
  },
  /**
   * Gets a value from local storage by its key.
   * @template T
   * @param {string} k
   * @returns {T | undefined}
  */
  get(k) {
    let json = localStorage.getItem(k);
    if(!json)return undefined
    return JSON.parse(json)
  },
  /**
   * Removes everything from local storage 
  */
  clear() {
    localStorage.clear();
  }
};

/**
 * @param {Manager} manager
 */
function fpsDebugger(manager) {
  const container = document.body.appendChild(document.createElement("div"));

  container.id = "fps-container";
  container.style.position = "absolute";
  container.style.top = "0px";
  container.style.right = "0px";
  container.style.width = "100px";
  container.style.height = "20px";
  container.style.background = "black";
  container.style.textAlign = "center";
  container.style.color = "white";

  const timer = {
    updateTime: 0.5,
    timerDt: 0,
    perf: new Perf()
  };
  manager.events.add("updateStart", dt => {
    timer.perf.start();
  });

  manager.events.add("updateEnd", dt => {
    timer.perf.end();
    timer.timerDt += dt;
    if (timer.timerDt < timer.updateTime) return
    const fps = timer.perf.fps().toFixed(0);
    const afps = (1 / dt).toFixed(0);
    container.innerHTML =
      fps + " fps" +
      "<br>" +
      afps + " afps";
    timer.timerDt = 0;
  });
}

/**
 * @param {Manager} manager
 * @param {BodyDebbuggerOptions} [options]
 */
// @ts-ignore
function bodyDebugger(manager, options = {}) {
  options.clearRenderer = options.clearRenderer || false;
  options.drawCollisionArm = options.drawCollisionArm || false;
  options.drawContacts = options.drawContacts || false;
  manager.registerSystem(dt => {
    const [transform, movable, bounds, bodies] = manager.query("transform", "movable", "bound", "body").raw();
    const clmd = manager.queryEvent("collision");
    const viewport = manager.getResource("renderer");
    const ctx = manager.getResource("ctx");
    
    if (options.clear) ctx.clearRect(0,0,viewport.width,viewport.height);
    if (options.drawCollisionArm) drawArms();
    if (options.drawPosition) drawPositions();
    if (options.drawContacts) drawContacts();
    if (options.drawBounds) drawBounds();

    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        drawShapes(bodies[i][j].shape, ctx);
      }
    }

    function drawContacts() {
      for (let i = 0; i < clmd.length; i++) {
        let [p1, p2] = clmd[i].contactData.contactPoints;
        ctx.beginPath();
        circle(ctx, p1.x, p1.y, 5);
        if (clmd[i].contactData.contactNo === 2) circle(ctx, p2.x, p2.y, 5);
        ctx.closePath();
        fill(ctx, "white");
      }
    }

    function drawPositions() {
      for (let i = 0; i < transform.length; i++) {
        for (let j = 0; j < transform[i].length; j++) {
          ctx.beginPath();
          circle(
            ctx,
            transform[i][j].position.x,
            transform[i][j].position.y,
            2
          );
          ctx.closePath();
          fill(ctx, "white");
        }
      }
    }

    function drawArms() {
      ctx.beginPath();
      for (let i = 0; i < clmd.length; i++) {
        const manifold = clmd[i];
        const { contactData: { contactNo, contactPoints } } = clmd[i];
        const [transformA] = manager.get(manifold.entityA, "transform");
        const [transformB] = manager.get(manifold.entityB, "transform");

        for (let j = 0; j < contactNo; j++) {
          drawArmRaw(ctx, transformA.position, contactPoints[j]);
          drawArmRaw(ctx, transformB.position, contactPoints[j]);
        }

      }
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      ctx.closePath();
    }

    function drawBounds() {
      for (let i = 0; i < bounds.length; i++) {
        for (let j = 0; j < bounds[i].length; j++) {
          renderObj(
            ctx,
            bounds[i][j]
          );
          stroke(ctx, "red", 3);
        }
      }
    }
  });
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2} position
 * @param {Vector2} arm
 */
function drawArm(ctx, position, arm, color = "blue") {
  ctx.moveTo(position.x, position.y);
  ctx.lineTo(
    position.x + arm.x,
    position.y + arm.y
  );

  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {Vector2} position
 * @param {Vector2} arm
 */
function drawArmRaw(ctx, position, arm) {
  ctx.moveTo(position.x, position.y);
  ctx.lineTo(
    arm.x,
    arm.y
  );
}

/**
 * @param {Shape} shape
 * @param {CanvasRenderingContext2D} ctx
 */
function drawShapes(shape, ctx) {
  ctx.beginPath();
  if (shape.type === Shape.CIRCLE) {
    circle(
      ctx,
      shape.vertices[0].x,
      shape.vertices[0].y,
      shape.vertices[1].x
    );
    const r = Vector2.fromAngle(shape.angle);
    Vector2.multiplyScalar(r, shape.vertices[1].x, r);
    drawArm(ctx, shape.vertices[0], r);
  } else {
    vertices(ctx, shape.vertices, true);
  }
  ctx.lineWidth = 10;
  stroke(ctx, "lightgreen", 2);
  ctx.closePath();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {BoundingBox} bounds
 */
function renderObj(ctx, bounds) {
  const w = (bounds.max.x - bounds.min.x);
  const h = (bounds.max.y - bounds.min.y);
  ctx.strokeRect(
    bounds.min.x,
    bounds.min.y,
    w,
    h
  );
}
/**
 * @typedef BodyDebbuggerOptions
 * @property {boolean} [drawBounds=false]
 * @property {boolean} [drawPosition=false]
 * @property {boolean} [drawVelocity=false]
 * @property {boolean} [clearRenderer=false]
 * @property {boolean} [drawCollisionArm=false]
 * @property {boolean} [drawContacts]
 * @property {boolean} [clear]
 */

/**
 * @param {Manager} manager
 */
function raycastDebugger(manager) {
  manager.registerSystem("raycastDebugger", {
    renderer: null,
    raycaster: null,
    init(manager) {
      const that = this;
      this.renderer = manager.getSystem("renderer");
      this.raycaster = manager.getSystem("raycaster");
      setupDebugger(this);
      manager.events.add("clear", e => {
        setupDebugger(that);
      });
    },
    update(dt) {}
  });
}

function setupDebugger(debug) {
  debug.renderer.add({
    render(ctx) {
      debug.raycaster.objects.forEach(e => {
        ctx.save();
        ctx.beginPath();
        ctx.translate(...e._transform.position);
        e.rays.forEach(r => {
          ctx.moveTo(0, 0);
          ctx.lineTo(
            r.direction.x * r.maxLength,
            r.direction.y * r.maxLength
          );
          ctx.lineWidth = 2;
        });
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        e.collisionResults.forEach(r => {
          r.collisions.forEach(c => {
            c.points.forEach(p => {
              ctx.beginPath();
              ctx.arc(...p.point, 3, 0, Math.PI * 2);
              ctx.strokeStyle = "white";
              ctx.stroke();
              ctx.closePath();
            });
          });
        });
      });
    }
  });
}

class Ray {
  /**
   * @type {number}
   */
  maxLength = 1000;
  /**
   * @private
   * @type {Vector2}
   */
  _origin
  /**
   * @private
   * @type {Vector2}
   */
  _direction
  /**
   * @param {Vector2} origin
   * @param {Vector2} direction
   */
  constructor(origin = new Vector2(0, 1), direction = new Vector2()) {
    this._origin = origin;
    this._direction = direction;
  }
  /**
   * @type {Vector2}
   */
  get direction() {
    return this._direction
  }
  set direction(x) {
    Vector2.copy(x, this._direction);
  }
  /**
   * @type {Vector2}
   */
  get origin() {
    return this._origin
  }
  set origin(x) {
    Vector2.copy(x, this._origin);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOrigin(x, y) {
    Vector2.set(this._origin, x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setDirection(x, y) {
    Vector2.set(this._direction, x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  lookAt(x, y) {
    Vector2.set(
      this._direction,
      x - this._origin.x,
      y - this._origin.y
    );
    Vector2.normalize(this._direction, this._direction);
  }
}

/**
 * @template T
*/
class RayCollisionResult {
  /**
   * @type {T}
   */
  object
  /**
   * @readonly
   * @type {RayPoint[]}
   */
  points = []
  /**
   * @param {T} object
   */
  constructor(object) {
    this.object = object;
  }
}
class RayPoint {
  /**
   * @type {Vector2}
   */
  point
  /**
   * @type {number}
   */
  distance = 0
  /**
   * @param {Vector2} point
   * @param {number} distance
  */
  constructor(point, distance) {
    this.point = point;
    this.distance = distance;
  }
}
/**
 * @readonly
 * @enum {number}
 */
const RayCastModes = {
  NONE: 0,
  NEAREST: 1,
  FIRST: 2,
  ANY: 3
};

class Raycast2D {
  /**
   * @template  T
   * @param {Ray} ray
   * @param {Body2D} body
   * @param {T} value
   * @returns {RayCollisionResult<T>}
   */
  static castToBody(ray, body, value) {
    return Raycast2D.cast(ray,body.shapes[0],value)
  }
  /**
   * @template {Shape} T
   * @template  U
   * @param {Ray} ray
   * @param {T} shape
   * @param {U} value
   * @param {RayCollisionResult<U>} results
   */
  static cast(ray, shape, value, results = new RayCollisionResult(value)) {
    if (shape.type === Shape.POLYGON)
      return Raycast2D.testVertices(ray, shape.vertices, results)
    if (shape.type === Shape.CIRCLE)
      return Raycast2D.testCircle(ray, shape.vertices[0], shape.vertices[1].x, results)
    return results
  }
  /**
   * @template T
   * @param {Ray} ray
   * @param {Vector_like} position
   * @param {number} radius
   * @param {RayCollisionResult<T>} results 
   */
  static testCircle(ray, position, radius, results) {
    const x1 = ray.origin.x;
    const y1 = ray.origin.y;
    const x2 = ray.direction.x;
    const y2 = ray.direction.y;

    const x3 = position.x;
    const y3 = position.y;
    const x4 = x3 - x1;
    const y4 = y3 - y1;
    const r = radius;

    const proj = x2 * x4 + y2 * y4;
    const delta = proj * proj - ((x4 * x4 + y4 * y4) - r * r);
    const sqrtDelta = Math.sqrt(delta);
    const distance1 = proj + sqrtDelta;
    const distance2 = proj - sqrtDelta;

    if (delta < 0 || distance1 < 0) return results
    results.points.push(new RayPoint(
      new Vector2(
        x1 + distance1 * x2,
        y1 + distance1 * y2
      ), distance1 * distance1
    ));
    if (delta === 0 || (distance2 < 0)) return results
    results.points.push(new RayPoint(
      new Vector2(
        x1 + distance2 * x2,
        y1 + distance2 * y2
      ),
      distance2 * distance2
    ));
    return results
  }
  /**
   * @template T
   * @param {Ray} ray
   * @param {Vector2[]} vertices
   * @param {RayCollisionResult<T>} result 
   */
  static testVertices(ray, vertices, result) {
    const origin = ray.origin;
    const direction = ray.direction;

    const res = testSingleEdge(
      vertices[vertices.length - 1],
      vertices[0], ray.origin, ray.direction
    );
    if (res) result.points.push(
      new RayPoint(
        res,
        Vector2.magnitudeSquared(Vector2.sub(res,origin))
      )
    );
    for (let i = 0; i < vertices.length - 1; i++) {
      let res = testSingleEdge(
        vertices[i], vertices[i + 1],
        origin, direction
      );
      if (res) result.points.push(
        new RayPoint(
          res,
          Vector2.magnitudeSquared(Vector2.sub(res,origin))
        )
      );
    }
    return result
  }
}

/**
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {Vector2} or
 * @param {Vector2} dir
 */
function testSingleEdge(v1, v2, or, dir) {
  const x1 = v1.x;
  const y1 = v1.y;
  const x2 = v2.x;
  const y2 = v2.y;
  const x3 = or.x;
  const y3 = or.y;
  const x4 = dir.x + x3;
  const y4 = dir.y + y3;
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (den === 0) return null

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

  if (
    t > 0 && t < 1 &&
    u > 0
  ) return new Vector2(
    x1 + t * (x2 - x1),
    y1 + t * (y2 - y1)
  )
  return null
}

/**
 * Renders images and paths to the 2D context of a canvas.
 * 
 * @extends Renderer
 */
class Renderer2D extends Renderer {
  /**@type {CanvasRenderingContext2D }*/
  ctx
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
    constructor(canvas = document.createElement("canvas"), context = canvas.getContext('2d')) {
      if (!context) throw "Could not get a 2d context"
      super(canvas);
      this.ctx = context;
    }
  /**
   * @deprecated
   * @param {string} selector
   * @param {boolean} focus
   */
  bindTo(selector,focus = true){
    deprecate("Renderer2D().bindTo()","Renderer2D.bindTo()");
    Renderer.bindTo(this,selector,focus);
  }
    /**
   * @deprecated
   * @param {number} x
   * @param {number} y
   */
    setViewport(x,y){
      deprecate("Renderer2D().setViewport()","Renderer2D.setViewport()");
      Renderer.setViewport(this,x,y);
    }
  /**
   * @deprecated
   */
  clear() {
    deprecate("Renderer2D().clear()","Renderer2D.clear()");
    Renderer2D.clear(this);
  }
  /**
   * @param {Renderer2D} renderer
   */
  static clear(renderer) {
    renderer.ctx.setTransform();
    const h = renderer.height,
      w = renderer.width;
    renderer.ctx.clearRect(0, 0, w, h);
  }
  /**
   * @template {BufferGeometry} T
   * @template {Material} U
   * @param {CanvasRenderingContext2D} ctx
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {Sprite<T,U>} sprite
   * @param {number} dt
   */
  static render(
    ctx,
    sprite,
    position,
    orientation,
    scale,
    dt
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(position.x, position.y);
    ctx.rotate(orientation);
    ctx.scale(scale.x, scale.y);
    // @ts-ignore
    Material.render(sprite.material,ctx, dt, sprite.geometry.drawable);
    ctx.closePath();
    ctx.restore();
  }
}

class Renderer2DPlugin {
  constructor(renderer = new Renderer2D()) {
    this.renderer = renderer;
    this.camera = renderer.camera;
    if (!renderer.domElement.parentElement)
      document.body.append(renderer.domElement);
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource("renderer", this.renderer);
    manager.setResource("ctx",this.renderer.ctx);
    manager.setResource("camera",this.camera);
    manager.registerSystem(manager => {
      const [transforms, sprites] = manager.query("transform", "sprite").raw();
      const dt = manager.getResource("delta");
      const renderer = manager.getResource("renderer");
      const ctx = manager.getResource("ctx");
      const camera = manager.getResource("camera");
      
      Renderer2D.clear(renderer);
      ctx.save();
      ctx.rotate(
        camera.transform.orientation
      );
      ctx.scale(
        camera.transform.scale.x,
        camera.transform.scale.y
      );
      ctx.translate(
        camera.transform.position.x,
        camera.transform.position.y
      );
      for (let i = 0; i < sprites.length; i++) {
      for (let j = 0; j < sprites[i].length; j++) {
        Renderer2D.render(
          ctx,
          sprites[i][j],
          transforms[i][j].position,
          transforms[i][j].orientation,
          transforms[i][j].scale,
          dt
        );
      }
    }
      ctx.save();
    });
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setViewport(width, height) {
    Renderer2D.setViewport(this.renderer, width, height);
  }
  /**
   * @param {string} selector
   */
  bindTo(selector) {
    Renderer2D.bindTo(this.renderer, selector);
  }
}

export { AABBColliding, AABBvsSphere, Agent, AgentManager, Angle, AngleUpdate, NaiveArchTypeTable as ArchetypeTable, ArriveBehaviour, AudioHandler, Ball, BasicMaterial, Behaviour, Body, Body2D, BoundType, BoundingBox, BoundingCircle, Box, BoxGeometry, Broadphase, Broadphase2DPlugin, BufferGeometry, Camera, Camera2D, Circle, CircleGeometry, Clock, CollisionData, CollisionManifold, Color, ColorUpdate, Constraint, Cookies, DEG2RAD, DEVICE, DOMEventHandler, DistanceConstraint, Easing, EvadeBehaviour, EventDispatcher, Events, Flock, Geometry, Group, HALF_PI, ImageLoader, IndexedList, Input, Intergrator2DPlugin, Interpolation, Keyboard, Line, LineGeometry, LoadManager, Loader, Logger, Manager, Material, Matrix3x2, Mouse, Movable, NaiveArchTypeTable, NaiveBroadphase, NarrowPhase, Narrowphase2DPlugin, Noise, PI, Path, PathFollowing, Perf, Physics2DPlugin, Pool, Pursuit, Query, RAD2DEG, Ray, RayCastModes, RayCollisionResult, RayPoint, Raycast2D, Rectangle, Renderer, Renderer2D, Renderer2DPlugin, SATNarrowphase, SQRT2, SeekBehaviour, Session, Sfx, Shape, Signal, SoundLoader, SpringConstraint, Sprite, SpriteMaterial, StaticImageMaterial, Storage, TWO_PI, TextMaterial, Touch, Transform, Triangle, TriangleGeometry, Trigon, Tween, TweenPlugin, common as Utils, Vec2, Vector, Vector2, Vector2Update, Vector3Update, WanderBehaviour, WebGLRenderer, WebGPURenderer, World, World2D, applyGravity, arc, assert, bodyDebugger, boundSpheresColliding, boundsColliding, circle, clamp, collisionResponse, dampenVelocity, defaultCollisionHandler, defaultPrecollisionHandler, degToRad, deprecate, drawImage, epilson, error, exp, fill, fillText, fpsDebugger, lerp, line, log, map, mixin, naivebroadphaseUpdate, naturalizePair, radToDeg, rand, raycastDebugger, rect, round, satNarrowphaseUpdate, sq, sqrt, stroke, throws, updateBodies, updateTransformEuler, updateTransformVerlet, vertices, warn, warnOnce, wrapAngle };
/**
 * @typedef Bounds
 * @property {Vector_like} max
 * @property {Vector_like} min
 */
/**
 * @typedef {number} Entity
 *//**
 * @callback EasingFunc
 * @param {number} t
 * @returns {number}
 *//**
 * @typedef CollisionPair
 * @property {Body2D} a
 * @property {Body2D} b
*/

/**
 * @typedef Manifold
 * @property {Body2D} bodyA 
 * @property {Body2D} bodyB
 * @property {ContactManifold} contactData
 * @property {number} stmp
 * @property {number} impulse
 * @property {boolean} persistent 
 * @property { Vector2} ca1
 * @property { Vector2} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property { Vector2} velA
 * @property { Vector2} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property { Vector2} axis
 * @property { Vector2[]} verticesA
 * @property { Vector2[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 *//**
 * @typedef Vector_like
 * @property {number} x
 * @property {number} y
 */