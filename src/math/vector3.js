export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  set(x, y, z) {
    this.x = x
    this.y = y
    this.z = z

    return this
  }

  splat(scalar) {
    this.x = scalar
    this.y = scalar
    this.z = scalar

    return this
  }

  clone() {
    return new Vector3(this.x, this.y, this.z)
  }

  copy(v) {
    this.x = v.x
    this.y = v.y
    this.z = v.z

    return this
  }

  add(v) {
    this.x += v.x
    this.y += v.y
    this.z += v.z

    return this
  }

  addScalar(s) {
    this.x += s
    this.y += s
    this.z += s

    return this
  }

  sub(v) {
    this.x -= v.x
    this.y -= v.y
    this.z -= v.z

    return this
  }

  subScalar(s) {
    this.x -= s
    this.y -= s
    this.z -= s

    return this;
  }

  multiply(v) {
    this.x *= v.x
    this.y *= v.y
    this.z *= v.z

    return this

  }

  divide(v) {
    this.x /= v.x
    this.y /= v.y
    this.z /= v.z

    return this
  }

  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }

  clampMagnitude(min, max) {
    const length = this.length()

    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
  }

  reverse() {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z

    return this
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  magnitudeSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
  magnitude() {
    return Math.sqrt(this.magnitudeSq())
  }

  normalize() {
    return this.divideScalar(this.length() || 1)
  }

  setMagnitude(length) {
    return this.normalize().multiplyScalar(length);
  }

  lerp(v, t) {
    this.x += (v.x - this.x) * t
    this.y += (v.y - this.y) * t
    this.z += (v.z - this.z) * t

    return this
  }

  cross(v) {
    return Vector3.cross(this, v, this)
  }

  static cross(a, b, out = new Vector3()) {
    const ax = a.x,
      ay = a.y,
      az = a.z;
    const bx = b.x,
      by = b.y,
      bz = b.z;

    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;

    return out;
  }
  reflect(normal) {
    Vector3.reflect(this, normal, this)
  }
  static reflect(v, normal, out = new Vector3()) {
    const multiplier = Vector2.dot(v, normal) * 2
    out.x = normal.x * multiplier - v.x
    out.y = normal.y * multiplier - v.y
    out.z = normal.z * multiplier - v.z

    return out
  }

  static angleTo(v) {
    return Math.acos(Vector3.dot(v1, v2) / (Vector3.magnitude(v1) * Vector3.magnitude(v2)))

  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  distanceToSquared(v) {
    const dx = this.x - v.x,
      dy = this.y - v.y,
      dz = this.z - v.z;

    return dx * dx + dy * dy + dz * dz;
  }

  random() {
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const c = Math.sqrt(1 - u * u);

    this.x = c * Math.cos(theta);
    this.y = u;
    this.z = c * Math.sin(theta);

    return this;
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}