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



class Matrix3 {
  constructor(array) {
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
  identity() {
    this.a = 1
    this.b = 0
    this.c = 0
    this.d = 1
    this.e = 0
    this.f = 0
    this.j = 0
    this.k = 0
    this.l = 0
    
    return this
  }
  scale(x, y = 1, z = 1) {
    this.a *= x
    this.e *= y
    this.i *= z
    return this
  }
  translate(x = 0, y = 0, z = 0) {
    this.j += x
    this.k += y
    this.l += z

    return this
  }
  rotateX(rad) {
    let cos = Math.cos(rad),
      sin = Math.sin(rad),
      e = this.e,
      f = this.f,
      h = this.h,
      i = this.i

    this.e = e * cos - f * sin;
    this.f = e * sin + f * cos;
    this.h = h * cos - i * sin;
    this.i = h * sin + i * cos;

    return this
  }
  rotateY(rad) {
    let cos = Math.cos(rad),
      sin = Math.sin(rad),
      a = this.a,
      c = this.c,
      g = this.g,
      i = this.i

    this.a = a * cos - c * sin;
    this.c = a * sin + c * cos;
    this.g = g * cos - i * sin;
    this.i = g * sin + i * cos;

    return this
  }
  rotateZ(rad) {
    let cos = Math.cos(rad),
      sin = Math.sin(rad),
      a = this.a,
      b = this.b,
      d = this.d,
      e = this.e

    this.a = a * cos - b * sin;
    this.b = a * sin + b * cos;
    this.d = d * cos - e * sin;
    this.e = d * sin + e * cos;

    return this
  }
  transform(v) {

  }
  clone() {
    return new Matrix3().copy(this)
  }
  copy(m) {
    this.a = m.a
    this.b = m.b
    this.c = m.c
    this.d = m.d
    this.e = m.e
    this.f = m.f
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "matrix"
  }
}

//let matrix = new Matrix3().rotateZ(Math.PI / 2)
//console.log(matrix);
export {
  Matrix
}