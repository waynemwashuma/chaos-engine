import { clamp } from './math.js';

export class Quaternion {
  constructor(x = 0, y = 0, z = 0, w = 1) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  set(x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w

    return this
  }

  clone() {
    return new Quaternion().copy(this)
  }

  copy(quaternion) {
    this.x = quaternion.x
    this.y = quaternion.y
    this.z = quaternion.z
    this.w = quaternion.w

    return this;
  }

  fromEuler(euler, update = true) {
    const x = euler.x,
      y = euler.y,
      z = euler.z

    const c1 = Math.cos(x / 2);
    const c2 = Math.cos(y / 2);
    const c3 = Math.cos(z / 2);

    const s1 = Math.sin(x / 2);
    const s2 = Math.sin(y / 2);
    const s3 = Math.sin(z / 2);

    this.x = s1 * c2 * c3 + c1 * s2 * s3
    this.y = c1 * s2 * c3 - s1 * c2 * s3
    this.z = c1 * c2 * s3 + s1 * s2 * c3
    this.w = c1 * c2 * c3 - s1 * s2 * s3

    return this;
  }

  setFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2,
      s = Math.sin(halfAngle);

    this.x = axis.x * s;
    this.y = axis.y * s;
    this.z = axis.z * s;
    this.w = Math.cos(halfAngle);

    return this;
  }

  setFromRotationMatrix(m) {
    const te = m.elements,
      m11 = te[0],
      m12 = te[4],
      m13 = te[8],
      m21 = te[1],
      m22 = te[5],
      m23 = te[9],
      m31 = te[2],
      m32 = te[6],
      m33 = te[10],

      trace = m11 + m22 + m33;

    if (trace > 0) {

      const s = 0.5 / Math.sqrt(trace + 1.0);

      this.w = 0.25 / s;
      this.x = (m32 - m23) * s;
      this.y = (m13 - m31) * s;
      this.z = (m21 - m12) * s;

    } else if (m11 > m22 && m11 > m33) {

      const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

      this.w = (m32 - m23) / s;
      this.x = 0.25 * s;
      this.y = (m12 + m21) / s;
      this.z = (m13 + m31) / s;

    } else if (m22 > m33) {

      const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

      this.w = (m13 - m31) / s;
      this.x = (m12 + m21) / s;
      this.y = 0.25 * s;
      this.z = (m23 + m32) / s;

    } else {

      const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

      this.w = (m21 - m12) / s;
      this.x = (m13 + m31) / s;
      this.y = (m23 + m32) / s;
      this.z = 0.25 * s;

    }

    return this;

  }
  angleTo(q) {
    return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)))
  }

  identity() {
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 1

    return this
  }

  invert() {
    return this.conjugate();
  }

  conjugate() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

    return this;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }

  magnitudeSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
  }

  magnitude() {
    return Math.sqrt(this.magnitudeSq())
  }

  normalize() {
    const l = this.length()

    if (l === 0) {
      this.x = 0
      this.y = 0
      this.z = 0
      this.w = 1

    } else {
      const inv = 1 / l

      this.x = this.x * inv
      this.y = this.y * inv
      this.z = this.z * inv
      this.w = this.w * inv
    }
    return this;
  }

  multiply(q) {
    return Quaternion.multiply(this, q)
  }

  static multiply(a, b) {
    const qax = a.x,
      qay = a.y,
      qaz = a.z,
      qaw = a.w;
    const qbx = b.x,
      qby = b.y,
      qbz = b.z,
      qbw = b.w;

    this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

    return this;
  }

  slerp(qb, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(qb);

    const x = this.x,
      y = this.y,
      z = this.z,
      w = this.w;
    let cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

    if (cosHalfTheta < 0) {
      this.w = -qb.w;
      this.x = -qb.x;
      this.y = -qb.y;
      this.z = -qb.z;

      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }

    if (cosHalfTheta >= 1.0) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;

      return this;

    }
    const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      this.w = s * w + t * this.w;
      this.x = s * x + t * this.x;
      this.y = s * y + t * this.y;
      this.z = s * z + t * this.z;
      this.normalize()

      return this
    }

    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
      ratioB = Math.sin(t * halfTheta) / sinHalfTheta;

    this.w = (w * ratioA + this.w * ratioB)
    this.x = (x * ratioA + this.x * ratioB)
    this.y = (y * ratioA + this.y * ratioB)
    this.z = (z * ratioA + this.z * ratioB)

    return this
  }

  random() {
    const theta1 = 2 * Math.PI * Math.random()
    const theta2 = 2 * Math.PI * Math.random()

    const x0 = Math.random()
    const r1 = Math.sqrt(1 - x0)
    const r2 = Math.sqrt(x0)

    return this.set(
      r1 * Math.sin(theta1),
      r1 * Math.cos(theta1),
      r2 * Math.sin(theta2),
      r2 * Math.cos(theta2),
    );

  }

  equals(quaternion) {
    return (quaternion.x === this.x) && (quaternion.y === this.y) && (quaternion.z === this.z) && (quaternion.w === this.w)
  }

  applyQuaternion(q) {
    const vx = this.x,
      vy = this.y,
      vz = this.z
    const qx = q.x,
      qy = q.y,
      qz = q.z,
      qw = q.w

    const tx = 2 * (qy * vz - qz * vy)
    const ty = 2 * (qz * vx - qx * vz)
    const tz = 2 * (qx * vy - qy * vx)

    this.x = vx + qw * tx + qy * tz - qz * ty
    this.y = vy + qw * ty + qz * tx - qx * tz
    this.z = vz + qw * tz + qx * ty - qy * tx

    return this
  }

  *[Symbol.iterator]() {
    yield this.x
    yield this.y
    yield this.z
    yield this.w
  }
}