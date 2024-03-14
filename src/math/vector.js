import { Logger } from "../logger/index.js";
import { TWO_PI } from "./constants.js";

const obj = {
  x: 0,
  y: 0
}
/**
 * This is a 2D vector class.
 * 
 * @license MIT
 */
export class Vector2 {
  /**
   * @param {number} [x] the x coordinate of the vector
   * @param {number} [y] the y coordinate of the vector
   */
  constructor(x = 0,y = 0) {
    this.x = x;
    this.y = y;
  }
  /**
   * @deprecated
 *Calculates length squared of vector and returns it
 */
  magnitudeSquared() {
    Logger.deprecate("Vector2().magnitudeSquared()","Vector2.magnitudeSquared()")
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
    Logger.deprecate("Vector2().magnitude()","Vector2.magnitude()")
    return Vector2.magnitude(this)
  }
  /**
   * @deprecated
   * Sets a vector to have the given length.
   * 
   * @param {number} length 
   */
  setMagnitude(length) {
    Logger.deprecate("Vector2().setMagnitude()","Vector2.setMagnitude()")
    Vector2.setMagnitude(this,length,this)
    return this
  }
  /**
   * @deprecated
   *Calculates length of this vector to another vector
   * @param { Vector2} v the other vector
   */
  distanceTo(v) {
    Logger.deprecate("Vector2().distanceTo()","Vector2.distanceTo()")

    return Vector2.distanceTo(this,v)
  }
  /**
   *Calculates length squared of this vector to another vector
   * 
   * @deprecated
   * @param { Vector2} v the other vector
   * @returns {number}
   */
  distanceToSquared(v) {
    Logger.deprecate("Vector2().distanceToSquared()","Vector2.distanceToSquared()")
    return Vector2.distanceTo(this,v)
  }
  /**
   * Adds a given vector into this 
   * 
   * @deprecated
   * @param { Vector2} v
   */
  add(v) {
    Logger.deprecate("Vector2().add()","Vector2.add()")
    Vector2.add(this,v,this)
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
    Logger.deprecate("Vector2().addScalar()","Vector2.addScalar()")
    Vector2.addScalar(this,n,this)
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
    Logger.deprecate("Vector2().sub()","Vector2.sub()")
    Vector2.sub(this,v,this)
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
    Logger.deprecate("Vector2().subScalar()","Vector2.subScalar()")
    Vector2.subScalar(this,n,this)
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
    Logger.deprecate("Vector2().multiply()","Vector2.multiply()")
    Vector2.multiplyScalar(this,n,this)
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
  rotateFast(cos,sin) {
    Logger.deprecate("Vector2().rotateFast()","Vector2.rotateFast()")
    Vector2.rotateFast(this,cos,sin,this)
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
  toArray(target = [],offset = 0) {
    Logger.deprecate("Vector2().toArray()","Vector2.toArray()")
    target[offset] = this.x
    target[offset + 1] = this.y
    return target;
  }
  /**
   * Copies x and y values of this vector to 
   * a new vector and returns the new vector.
   * @deprecated
   * @return Vector2
   */
  clone() {
    Logger.deprecate("Vector2().clone()","Vector2.copy()")
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
    Logger.deprecate("Vector2().copy()","Vector2.copy()")
    Vector2.copy(v,this)
    return this
  }
  /**
   * Sets x and y values of this vector to the given parameter.
   * 
   * @deprecated
   * @param {Number} x 
   * @param {Number} y
   */
  set(x,y) {
    Logger.deprecate("Vector2().set()","Vector2.set()")
    Vector2.set(this,x,y)
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
  reflect(normal,target = new Vector2()) {
    Logger.deprecate("Vector2().reflect()","Vector2.reflect()")
    Vector2.reflect(this,normal,target)
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
  clamp(min = 0,max = 1) {
    Logger.deprecate("Vector2().clamp()","Vector2.clamp()")
    Vector2.clampMagnitude(this,min,max,this)
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
    Logger.deprecate("Vector2().dot()","Vector2.dot()")
    return Vector2.dot(this,v)
  }
  /**
 * Calculates the cross product of two vectors.
 * 
 * @deprecated
 * @param { Vector2} v
 * @returns {number}
 */
  cross(v) {
    Logger.deprecate("Vector2().cross()","Vector2.cross()")
    return Vector.cross(this,v)
  }
  /**
   * Makes this vector a unit vector by 
   * dividing its components with its length.
   * 
   * @deprecated
   * @returns {this}
   */
  normalize() {
    Logger.deprecate("Vector2().normalize()","Vector2.normalize()")
    Vector2.normalize(this,this)
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
  normal(l = 1,target = new Vector2()) {
    Logger.deprecate("Vector2().normal()","Vector2.normal()")
    Vector2.normal(this,target)
    Vector2.normalize(target,target)
    Vector2.multiplyScalar(target,l,target)
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
    Logger.deprecate("Vector2().normalFast()","Vector2.normal()")
    return target.set(-this.y,this.x)
  }
  /**
   * Rotates this vector by a given angle in radians.
   * 
   * @deprecated
   * @param {number} rad Angle in radians
   * @returns {this}
   */
  rotate(rad) {
    Logger.deprecate("Vector2().rotate()","Vector2.rotate()")
    Vector2.rotate(this,rad,this)
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
    Logger.deprecate("Vector2().divide()","Vector2.divide()")
    this.multiply(1 / n)
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
    Logger.deprecate("Vector2().equals()","Vector2.equals()")
    return Vector2.equals(this,v)
  }
  /**
   * Checks if the vector length is zero.
   * 
   * @deprecated
   * @returns {boolean}
   */
  equalsZero() {
    Logger.deprecate("Vector2().equalsZero()","Vector2.equalsZero()")
    return Vector2.equalsZero(this)
  }
  /**
 * Negates the values of this vector.
 * 
 * @deprecated
 * @returns {this}
 */
  reverse() {
    Logger.deprecate("Vector2().reverse()","Vector2.reverse()")
    Vector2.reverse(this,this)
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
  static setMagnitude(v,length,out = new Vector2()) {
    Vector2.normalize(v,out)
    Vector2.multiplyScalar(v,length,out)
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static distanceTo(v1,v2) {
    obj.x = v1.x - v2.x
    obj.y = v1.y - v2.y
    return Vector2.magnitude(obj)
  }
  /**
   * Calculates length squared of this vector to another vector
   * 
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static distanceToSquared(v1,v2) {
    obj.x = v1.x - v2.x
    obj.y = v1.y - v2.y
    return Vector2.magnitudeSquared(obj)
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static add(v1,v2,out = new Vector2()) {
    out.x = v1.x + v2.x
    out.y = v1.y + v2.y
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static addScalar(v1,n,out = new Vector2()) {
    out.x = v1.x + n
    out.y = v1.y + n
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static sub(v1,v2,out = new Vector2()) {
    out.x = v1.x - v2.x
    out.y = v1.y - v2.y
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
  */
  static subScalar(v1,n,out = new Vector2()) {
    out.x = v1.x - n
    out.y = v1.y - n
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static multiply(v1,v2,out = new Vector2()) {
    out.x = v1.x * v2.x
    out.y = v1.y * v2.y
    return out
  }
  /**
  * @param {Vector_like} v1
  * @param {number} n
  * @param {Vector_like} [out]
  */
  static multiplyScalar(v1,n,out = new Vector2()) {
    out.x = v1.x * n
    out.y = v1.y * n
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   * @param {Vector_like} [out]
   */
  static divide(v1,v2,out = new Vector2()) {
    out.x = v1.x / v2.x
    out.y = v1.y / v2.y
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} [out]
   */
  static divideScalar(v1,n,out = new Vector2()) {
    return Vector2.multiplyScalar(v1,1 / n,out)
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static dot(v1,v2) {
    return v1.x * v2.x + v1.y * v2.y
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static cross(v1,v2) {
    return v1.x * v2.y - v1.y * v2.x
  }
  /**
   * @param {Vector_like} v1
   * @param {number} n
   * @param {Vector_like} out
   */
  static crossScalar(v1,n,out = new Vector2()) {
    out.x = v1.y * -n
    out.y = v1.x * n
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static normalize(v,out = new Vector2()) {
    const length = Vector2.magnitude(v)
    if (length == 0) return out
    out.x = v.x / length
    out.y = v.y / length
    return out
  }
  /**
   * @param {Vector_like} v1
   * @param {Vector_like} v2
   */
  static equals(v1,v2) {
    return v1.x === v2.x && v1.y === v2.y
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
  static normal(v,out = new Vector2()) {
    return Vector2.set(out,-v.y,v.x);
  }
  /**
   * @param {Vector_like} v
   * @param {number} angle
   * @param {Vector_like} out
   */
  static rotate(v,angle,out = new Vector2()) {
    return Vector2.rotateFast(v,Math.cos(angle),Math.sin(angle),out)
  }
  /**
   * @param {Vector_like} v
   * @param {number} cos
   * @param {number} sin
   * @param {Vector_like} out
   */
  static rotateFast(v,cos,sin,out = new Vector2()) {
    const x = v.x
    out.x = x * cos - v.y * sin
    out.y = x * sin + v.y * cos
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static copy(v,out = new Vector2()) {
    out.x = v.x
    out.y = v.y
    return out
  }
  /**
   * @param {Vector_like} v
   * @param {number} x
   * @param {number} y
   */
  static set(v,x,y) {
    v.x = x
    v.y = y
    return v
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} [out=new Vector2()] 
   */
  static reverse(v,out = new Vector2()) {
    return Vector2.multiplyScalar(v,-1,out)
  }
  /**
   * @param {Vector_like} v
   * @param {Vector_like} normal
   * @param {Vector_like} [out]
   */
  static reflect(v,normal,out = new Vector2()) {
    const multiplier = Vector2.dot(v,normal) * 2
    out.x = normal.x * multiplier - v.x
    out.y = normal.y * multiplier - v.y

    return out
  }
  /**
   * @param {Vector_like} v
   * @param {number} min
   * @param {number} max
   * @param {Vector_like} out
   */
  static clampMagnitude(v,min,max,out) {
    if (Vector2.equalsZero(v)) return Vector2.copy(v,out)
    let length = Vector2.magnitude(v)
    if (length > max)
      return Vector2.multiplyScalar(v,max / length,out)
    if (length < min)
      return Vector2.multiplyScalar(v,min / length,out)
    return Vector2.copy(v,out)
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
  */
  static getAbsDegBtwn(v1,v2) {
    let a = v1.cross(v2)
    let deg = Vector2.getDegBtwn(v1,v2)
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Same as ` Vector2.getAbsDegBtwn` but returns in radians.
   * 
   * @param { Vector2 } v1 start of the angle
   * @param { Vector2 } v2 end of the angle
   * @returns {number}
  **/
  static getAbsAngleBetween(v1,v2) {
    const a = Vector2.cross(v1,v2)
    const deg = Vector2.getAngleBetween(v1,v2)

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
  static getAngleBetween(v1,v2) {
    return Math.acos(Vector2.dot(v1,v2) / (Vector2.magnitude(v1) * Vector2.magnitude(v2)))
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
  */
  static getDegBtwn(v1,v2) {
    return Vector2.getAngleBetween(v1,v2) * 180 / Math.PI
  }
  /**
   * Returns a unit vector pointing in the
   * given angle starting from the positive x axis.
   * 
   * @param {number} radian angle in radians from 0 to `Math.PI * 2`
   * @param { Vector2} [out] Vector2 to store results in.
   * @returns { Vector2}
  */
  static fromAngle(radian,out = new Vector2()) {
    Vector2.set(out,Math.cos(radian),Math.sin(radian))
    return out
  }
  /**
   * Generates a new unit Vector2 in a random direction
   * 
   * @param { Vector2} [out]
   * @returns { Vector2}
  */
  static random(out) {
    return Vector2.fromAngle(Math.random() * TWO_PI,out)
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
  static lerp(v1,v2,t,out = new Vector2()) {
    Vector2.set(
      out,
      (v2.x - v1.x) * t + v1.x,
      (v2.y - v1.y) * t + v1.y
    )
    return out
  }
  /**
   * Returns the angle in radians between the positive x-axis and the vector.
   * 
   * @param { Vector2} v
   * @returns {number}
  */
  static toAngle(v) {
    let a = Math.atan2(v.y,v.x)
    return a < 0 ? TWO_PI + a : a
  }
  /**
   * @this {Vector2}
   */
  [Symbol.iterator] = function* () {
    yield this.x
    yield this.y
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
export class Vector extends Vector2 {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
  */
  constructor(x,y) {
    super(x,y)
    console.error("The class `Vector` is depreciated since v0.4.13.Use Vector2 instead.")
  }
}

/**
 * @deprecated
 */
export class Vec2 extends Vector2 {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(x,y) {
    super(x,y)
    console.error("The class `Vec2` is depreciated since v0.4.13.Use Vector2 instead.")
  }
}