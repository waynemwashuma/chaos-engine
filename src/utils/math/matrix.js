class Matrix {
  constructor(a, b, c, d, e, f) {
    this.a = a || 1
    this.b = b || 0
    this.c = c || 0
    this.d = d || 1
    this.e = e || 0
    this.f = f || 0
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "matrix"
  }
  rotate(radian) {
    let sin = Math.sin(radian),
      cos = Math.cos(radian)
    this.a = cos
    this.c = -sin
    this.b = sin
    this.d = cos
    return this
  }
  translate(x, y) {
    this.e += x
    this.f += y
    return this
  }
  transform(v) {
    let x = v.x,
      y = v.y

    v.x = this.a * x + this.c * y + this.e
    v.y = this.b * x + this.d * y + this.f
    return v
  }
  identity() {
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 1
    this.e = 0
    this.f = 0
  }
  clone() {
    return new Matrix(...this)
  }
  copy(m) {
    this.a = m.a
    this.b = m.b
    this.c = m.c
    this.d = m.d
    this.e = m.e
    this.f = m.f
    
    return this
  }

  *[Symbol.iterator]() {
    yield this.a
    yield this.b
    yield this.c
    yield this.d
    yield this.e
    yield this.f
  }
}

console.log(new Matrix());



class Matrix3 {
  constructor() {
    //X - basis vector
    this.a = 1
    this.b = 0
    this.c = 0
    //Y - basis vector
    this.d = 0
    this.e = 1
    this.f = 0
    //Z - basis vector
    this.g = 0
    this.h = 0
    this.i = 1

    //translation vector
    this.j = 0
    this.k = 0
    this.l = 0
  }
  scale(x, y = 1, z = 1) {
    this.a *= x
    this.e *= y
    this.i *= z
  }
  translate(x = 0, y = 0, z = 0) {
    this.j += x
    this.k += y
    this.l += z
  }
  transform() {

  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "matrix"
  }
}

export {
  Matrix
}