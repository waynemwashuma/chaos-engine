let obj = {
  x: 0,
  y: 0
}
let TWO_PI = Math.PI * 2
/**
 * This is a 2D vector class.It has been optimized to reduce garbage collection and for perfomance when used properly
 * @author Wayne Mwashuma <mwashumawayne@gmail.com>
 * @license MIT
 */
class Vector {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "vector"
  }
  /**
   *Calculates length of this vector and returns 
   * it
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  };
  setMagnitude(length) {
    this.normalize().multiply(length)
  }
  /**
   *Calculates length squared of vector and returns it
   */
  magnitudeSquared() {
    return this.y ** 2 + this.x ** 2
  }
  /**
   *Calculates length of this vector to another vector
   * @@param {Vector} v the other vector
   */
  distanceTo(v) {
    obj.x = this.x - v.x
    obj.y = this.y - v.y
    return Math.sqrt(Vector.prototype.magnitudeSquared.call(obj))
  }
  /**
   *Calculates length squared of this vector to another vector
   * @@param {Vector} v the other vector
   */
  distanceToSquared(v) {
    obj.x = this.x - v.x
    obj.y = this.y - v.y
    return Vector.prototype.magnitudeSquared.call(obj)
  }
  /**
   * Adds a given vector into this vector
   * @@param {Vector} v
   */
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  /**
   * Adds a scalar value into this vector's
   * x and y values
   * @@param {number} n
   */
  addScalar(n) {
    this.x += n
    this.y += n
    return this
  }
  /**
   * Subtracts a given vector from this vector
   * @@param {Vector} v
   */
  sub(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }
  /**
   * Subtracts a scalar value from this vector's x and y values.
   * @@param {number} n
   */
  subScalar(n) {
    this.x -= n
    this.y -= n
    return this
  }
  /**
   * Calculates the dot product of two vectors.
   * @@param {Vector} v
   */
  dot(v) {
    return this.x * v.x + this.y * v.y
  }
  /**
   * Calculates the cross product of two vectors
   * @@param {Vector} v
   */
  cross(v) {
    return this.x * v.y - this.y * v.x
  }
  /**
   * Multiplies this vector with a scalar
   * @@param {number} n 
   */
  multiply(n) {
    this.x *= n
    this.y *= n
    return this
  }
  /**
   * Divides this vector with a scalar
   * @@param {number} n 
   */
  divide(n) {
    this.multiply(1 / n)
    return this
  }
  /**
   * Makes this vector a unit vector by 
   * dividing its components with its length
   * 
   */
  normalize() {
    const length = this.magnitude()
    if (length == 0) return this
    this.x = this.x / length
    this.y = this.y / length
    return this
  };
  /**
   * Checks to see if this vector is equal to
   * another vector
   * @@param {Vector} v
   */
  equals(v) {
    return v.x === this.x && v.y === this.y
  }
  equalsZero() {
    return this.x === 0 && this.y === 0
  }
  /**
   * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
   * 
   * @@param {number} l the length of the vector returned
   * @param {Vector} [target = Vector] Vector in which results are stored
   */
  normal(l = 1, target) {
    target = target || new Vector()
    target.copy(this).normalize()
    return target.set(-target.y * l, target.x * l);
  };
  /**
   * Rotates this vector by a given angle in radians
   * @@param {Vector} Angle in radians
   */
  rotate(rad) {
    let
      x = this.x,
      cos = Math.cos(rad),
      sin = Math.sin(rad)
    this.x = x * cos - this.y * sin;
    this.y = x * sin + this.y * cos;
    return this
  };
  /**
   * Returns an array with x and y values of
   * this vector pushed into the array in
   * that order.
   * @@param {number[]} [target = []] The array to
   * push values.Defaults to creating a new
   * array if not provided one
   * @returns number[]
   */
  toArray(target = [], offset = 0) {
    target[offset] = this.x
    target[offset + 1] = this.y
    return target;
  }
  /**
   * Copies x and y values of this vector to 
   * a new vector and returns the new vector
   * @return Vector
   */
  clone() {
    return new Vector(this.x, this.y)
  }
  /**
   * Copies x and y values of another vector
   * to this vector
   * @@param {Vector} v 
   * @return this
   */
  copy(v) {
    this.x = v.x
    this.y = v.y
    return this
  }
  /**
   * Sets x and y values of this vector to the given parameter
   * @param {Number} x 
   * @param {Number} y
   */
  set(x, y) {
    this.x = x
    this.y = y
    return this
  }
  /**
   * Draws this vector to a 2D canvas
   * 
   * @param {CanvasRenderingContext2D} ctx the context to draw on.
   * @param {number} x Translates the x-coordinate origin of the vector
   * @param {number} y Translates the y-coordinate origin of the vector
   * @param {string} color a CSS string that
   * is supplied to the rendering context.Can
   *  be a hex(e.g "0xFFFFFF"),rgb(e.g "rgb(255,255,255)"),hsl or a color name(e.g "white")
   * @@param {Number} scale A value that
   * multiplies the length of the vector
   * 
   */
  draw(ctx, x = 0, y = 0, color = "red", scale = 1) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(this.x * scale + x, this.y * scale + y)
    //ctx.arc(this.x * scale + x, this.y * scale + y, 2, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.strokeStyle = "black"
    ctx.closePath()
    return this
  }
  /**
   * Negates the values of this vector
   */
  reverse() {
    return this.multiply(-1)
  }
  /**
   * Returns a vector of this reflected on a sirface perpendicular to the normal
   * @param {number} normal the unit vector perpendicular to reflection surface
  @return {Vector}
  */
  reflect(normal, target) {
    target = target || new Vector()
    return target.copy(normal).multiply(this.dot(normal) * 2).sub(this)
  }
  /**
   * Forces this vector to have a length 
   * between the min and max.
   * 
   * @param {number} [min = 0] The smallest value 
   * the length of this vector is allowed to have.
   * @param {number} [max = 1] The biggest value 
   * the length of this vector is allowed to have.
   */
  clamp(min = 0, max = 1) {
      let length = this.magnitude()
      if (length == 0) return this
      let l = Math.max(min, Math.min(length, max)) / length
      return this.multiply(l)
    }
  [Symbol.iterator] = function*() {
      yield this.x
      yield this.y
    }
  /**
   * Gets the angle (in degrees) between two
   * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getAbsDegBtwn(v1, v2) {
    let a = v1.cross(v2)
    let deg = Vector.getDegBtwn(v1, v2)
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Same as Vector.getAbsDegBtwn but returns in radians
   * 
   * @param { Vector } v1 start of the angle
   * @param { Vector } v2 end of the angle
   **/
  static getAbsRadBtwn(v1, v2) {
    let a = v1.cross(v2)
    let deg = Vector.getDegBtwn(v1, v2)
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Gets the angle (in radians) between two
   * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getRadBtwn(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.magnitude() * v2.magnitude()))
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getDegBtwn(v1, v2) {
    return Vector.getRadBtwn(v1, v2) * 180 / Math.PI
  }
  /**
   * Returns a unit vector pointing in the
   * given angle starting from the positive x axis
   * 
   * @param {number} radian angle in radians from 0 to `Math.PI * 2`
   * @param {Vector} target Vector to store results in.
   */
  static fromRad(radian, target = new Vector()) {
    return target.set(Math.cos(radian), Math.sin(radian))
  }
  /**
   * Returns a unit vector pointing in the
   * given angle from the positive x axis
   * 
   * @param {number} degree angle in radians from `0°` to `360°`
   * @param {Vector} target Vector to store results in.
   */
  static fromDeg(degree, target) {
    return Vector.fromRad(degree * Math.PI / 180, target)
  }
  /**
   * Generates a new unit Vector in a random direction
   */
  static random(target) {
    return Vector.fromRad(Math.random() * TWO_PI, target)
  }
  /**
   * Returns a Vector that has been lerped between v1 and v2
   * @param {Vector} v1 the vector to lerp from
   * @param {Vector} v2 the vector to lerp from
   * @param {number} t a value from 0 to 1 to scale the new Vector between v1 and v2
   * @param {Vector} target the vector to store results into
   */
  static lerp(v1, v2, t, target) {
    target = target || new Vector()
    return target.copy(v1).set(
      (v2.x - v1.x) * t + v1.x,
      (v2.y - v1.y) * t + v1.y
    )
  }
  static toDeg(v) {
    return Vector.toRad(v) / Math.PI * 180
  }

  static toRad(v) {
    let a = Math.atan2(v.y, v.x)
    return a < 0 ? TWO_PI + a : a
  }
  static ZERO = Object.freeze(new Vector())
  
}

export {
  Vector
}