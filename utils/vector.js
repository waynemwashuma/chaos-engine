class Vector {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
  }
  /**
   *Calculates length of vector and returns 
   * it
   *@returns {Number}
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  };
  magnitudeSquared() {
    return this.y ** 2 + this.x ** 2
  }
  distanceTo(v) {
    return this.clone().sub(v).magnitude()
  }
  distanceToSquared(v) {
    return this.clone().sub(v).magnitudeSquared()
  }
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  addScalar(n) {
    this.x += n
    this.y += n
    return this
  }
  sub(v) {
    this.x -= v.x
    this.y -= v.y
    return this
  }
  subScalar(n) {
    this.x -= n
    this.y -= n
    return this
  }
  dot(v) {
    return this.x * v.x + this.y * v.y
  }
  cross(v) {
    return this.x * v.y - this.y * v.x
  }
  multiply(n) {
    this.x *= n
    this.y *= n
    return this
  }
  divide(n) {
    this.multiply(1 / n)
    return this
  }
  normalize() {
    const length = this.magnitude()
    this.x /= length
    this.y /= length
    return this
  };
  equals(v) {
    return v.x == this.x && v.y == this.y
  }
  absolute() {
    this.x = Math.abs(this.x)
    this.y = Math.abs(this.y)
    return this
  }
  normal() {
    let v = this.clone().normalize()
    return new Vector(-v.y, v.x);
  };
  rotate(rad) {
    let x = this.x,
      y = this.y
    this.x = x * Math.cos(rad) - y * Math.sin(rad);
    this.y = x * Math.sin(rad) + y * Math.cos(rad);
    return this
  };
  toArr() {
    return [this.x, this.y];
  }
  clone() {
    return new Vector(this.x, this.y)
  }
  copy(v) {
    this.x = v.x
    this.y = v.y
    return this
  }
  set(x, y) {
    this.x = x
    this.y = y
    return this
  }
  draw(ctx, x = 0, y = 0, color, scale = 1) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(this.x * scale + x, this.y * scale + y)
    ctx.arc(this.x * scale + x, this.y * scale + y, 2, 0, Math.PI * 2)
    ctx.strokeStyle = color || "red"
    ctx.stroke()
    ctx.strokeStyle = "black"
    ctx.closePath()
    return this
  }
  reverse() {
    return this.multiply(-1)
  }
  /**@@param {number} normal the unit vector perpendicular to reflection surface
  @return {Vector}
  */
  reflect(normal) {
    return normal.clone().multiply(this.dot(normal) * 2).sub(this)
  }
  static get y_axis() {
    return new Vector(0, 1)
  }
  static get x_axis() {
    return new Vector(1)
  }
  static getAbsDegBtwn(v1, v2) {
    let a = v1.cross(v2)
    let deg = Vector.getDegBtwn(v1, v2)
    return a < 0 ? deg : 360 - deg
  }
  static getRadBtwn(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.magnitude() * v2.magnitude()))
  }
  static getDegBtwn(v1, v2) {
    return Vector.getRadBtwn(v1, v2) * 180 / Math.PI
  }
  static radToNormalizedVector(radian) {
    return new Vector(Math.cos(radian), Math.sin(radian))
  }
  static randomVector() {
    let deg = Math.random() * 360
    return Vector.degToUN(deg)
  }
  static lerp(v1, v2, t) {
    return v1.clone().add(v2.clone().subtract(v1).multiply(t))
  }
}

export {
  Vector
}