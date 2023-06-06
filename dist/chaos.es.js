var Ct = Object.defineProperty;
var Pt = (r, t, e) => t in r ? Ct(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => (Pt(r, typeof t != "symbol" ? t + "" : t, e), e);
const st = {
  AABBColliding(r, t) {
    return r.min.x <= t.max.x && r.max.x >= t.min.x && r.min.y <= t.max.y && r.max.y >= t.min.y;
  },
  boundSpheresColliding(r, t) {
    return (r.x - t.x) * (r.x - t.x) + (r.y - t.y) * (r.y - t.y) < r.r * r.r + t.r * t.r;
  },
  AABBvsSphere(r, t) {
    const e = Math.max(box.min.x, Math.min(t.pos.x, box.max.x)), s = Math.max(box.min.y, Math.min(t.pos.y, box.max.y));
    return (e - t.pos.x) * (e - t.pos.x) + (s - t.pos.y) * (s - t.pos.y) < t.radius;
  }
}, _t = Math.PI / 180, Tt = 1 / _t;
function $(r = 0, t = 1) {
  return Math.random() * (t - r) + r;
}
function M(r) {
  return r * r;
}
function He(r, t = 2) {
  return r ** t;
}
function Ve(r) {
  return Math.sqrt(r);
}
function qe(r, t, e) {
  return r + e * (t - r);
}
function R(r, t = 4) {
  return t = 10 ** t, Math.round(r * t) / t;
}
function Ye(r, t, e) {
  return r < t ? t : r > e ? e : r;
}
function xt(r, t, e, s, n) {
  return s + r * (n - s) / (e - t);
}
function Mt(r, t) {
  return r > t ? (r + t) * (r + t + 1) / 2 + r : (r + t) * (r + t + 1) / 2 + t;
}
function Ue(r) {
  return r * _t;
}
function ze(r) {
  return r * Tt;
}
let O = {
  x: 0,
  y: 0
}, nt = Math.PI * 2;
/**
 * This is a 2D vector class.It has been optimized to reduce garbage collection and for perfomance when used properly
 * @author Wayne Mwashuma <mwashumawayne@gmail.com>
 * @license MIT
 */
var je;
const v = class {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(t, e) {
    a(this, je, function* () {
      yield this.x, yield this.y;
    });
    this.x = t || 0, this.y = e || 0;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "vector";
  }
  /**
   *Calculates length of this vector and returns 
   * it
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  }
  setMagnitude(t) {
    this.normalize().multiply(t);
  }
  /**
   *Calculates length squared of vector and returns it
   */
  magnitudeSquared() {
    return this.y ** 2 + this.x ** 2;
  }
  /**
   *Calculates length of this vector to another vector
   * @@param {Vector} v the other vector
   */
  distanceTo(t) {
    return O.x = this.x - t.x, O.y = this.y - t.y, Math.sqrt(v.prototype.magnitudeSquared.call(O));
  }
  /**
   *Calculates length squared of this vector to another vector
   * @@param {Vector} v the other vector
   */
  distanceToSquared(t) {
    return O.x = this.x - t.x, O.y = this.y - t.y, v.prototype.magnitudeSquared.call(O);
  }
  /**
   * Adds a given vector into this vector
   * @@param {Vector} v
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  /**
   * Adds a scalar value into this vector's
   * x and y values
   * @@param {number} n
   */
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  /**
   * Subtracts a given vector from this vector
   * @@param {Vector} v
   */
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  /**
   * Subtracts a scalar value from this vector's x and y values.
   * @@param {number} n
   */
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  /**
   * Calculates the dot product of two vectors.
   * @@param {Vector} v
   */
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  /**
   * Calculates the cross product of two vectors
   * @@param {Vector} v
   */
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  /**
   * Multiplies this vector with a scalar
   * @@param {number} n 
   */
  multiply(t) {
    return this.x *= t, this.y *= t, this;
  }
  /**
   * Divides this vector with a scalar
   * @@param {number} n 
   */
  divide(t) {
    return this.multiply(1 / t), this;
  }
  /**
   * Makes this vector a unit vector by 
   * dividing its components with its length
   * 
   */
  normalize() {
    const t = this.magnitude();
    return t == 0 ? this : (this.x = this.x / t, this.y = this.y / t, this);
  }
  /**
   * Checks to see if this vector is equal to
   * another vector
   * @@param {Vector} v
   */
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  equalsZero() {
    return this.x === 0 && this.y === 0;
  }
  /**
   * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
   * 
   * @@param {number} l the length of the vector returned
   * @param {Vector} [target = Vector] Vector in which results are stored
   */
  normal(t = 1, e) {
    return e = e || new v(), e.copy(this).normalize(), e.set(-e.y * t, e.x * t);
  }
  /**
   * Rotates this vector by a given angle in radians
   * @@param {Vector} Angle in radians
   */
  rotate(t) {
    let e = this.x, s = Math.cos(t), n = Math.sin(t);
    return this.x = e * s - this.y * n, this.y = e * n + this.y * s, this;
  }
  /**
   * Returns an array with x and y values of
   * this vector pushed into the array in
   * that order.
   * @@param {number[]} [target = []] The array to
   * push values.Defaults to creating a new
   * array if not provided one
   * @returns number[]
   */
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  /**
   * Copies x and y values of this vector to 
   * a new vector and returns the new vector
   * @return Vector
   */
  clone() {
    return new v(this.x, this.y);
  }
  /**
   * Copies x and y values of another vector
   * to this vector
   * @@param {Vector} v 
   * @return this
   */
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  /**
   * Sets x and y values of this vector to the given parameter
   * @param {Number} x 
   * @param {Number} y
   */
  set(t, e) {
    return this.x = t, this.y = e, this;
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
  draw(t, e = 0, s = 0, n = "red", o = 1) {
    return t.beginPath(), t.moveTo(e, s), t.lineTo(this.x * o + e, this.y * o + s), t.strokeStyle = n, t.stroke(), t.strokeStyle = "black", t.closePath(), this;
  }
  /**
   * Negates the values of this vector
   */
  reverse() {
    return this.multiply(-1);
  }
  /**
   * Returns a vector of this reflected on a sirface perpendicular to the normal
   * @param {number} normal the unit vector perpendicular to reflection surface
  @return {Vector}
  */
  reflect(t, e) {
    return e = e || new v(), e.copy(t).multiply(this.dot(t) * 2).sub(this);
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
  clamp(t = 0, e = 1) {
    let s = this.magnitude();
    if (s == 0)
      return this;
    let n = Math.max(t, Math.min(s, e)) / s;
    return this.multiply(n);
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getAbsDegBtwn(t, e) {
    let s = t.cross(e), n = v.getDegBtwn(t, e);
    return s < 0 ? n : 360 - n;
  }
  /**
   * Same as Vector.getAbsDegBtwn but returns in radians
   * 
   * @param { Vector } v1 start of the angle
   * @param { Vector } v2 end of the angle
   **/
  static getAbsRadBtwn(t, e) {
    let s = t.cross(e), n = v.getDegBtwn(t, e);
    return s < 0 ? n : 360 - n;
  }
  /**
   * Gets the angle (in radians) between two
   * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getRadBtwn(t, e) {
    return Math.acos(t.dot(e) / (t.magnitude() * e.magnitude()));
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
   * 
   * @param {Vector} v1 start of the angle
   * @param {Vector} v2 end of the angle
   */
  static getDegBtwn(t, e) {
    return v.getRadBtwn(t, e) * 180 / Math.PI;
  }
  /**
   * Returns a unit vector pointing in the
   * given angle starting from the positive x axis
   * 
   * @param {number} radian angle in radians from 0 to `Math.PI * 2`
   * @param {Vector} target Vector to store results in.
   */
  static fromRad(t, e = new v()) {
    return e.set(Math.cos(t), Math.sin(t));
  }
  /**
   * Returns a unit vector pointing in the
   * given angle from the positive x axis
   * 
   * @param {number} degree angle in radians from `0°` to `360°`
   * @param {Vector} target Vector to store results in.
   */
  static fromDeg(t, e) {
    return v.fromRad(t * Math.PI / 180, e);
  }
  /**
   * Generates a new unit Vector in a random direction
   */
  static random(t) {
    return v.fromRad(Math.random() * nt, t);
  }
  /**
   * Returns a Vector that has been lerped between v1 and v2
   * @param {Vector} v1 the vector to lerp from
   * @param {Vector} v2 the vector to lerp from
   * @param {number} t a value from 0 to 1 to scale the new Vector between v1 and v2
   * @param {Vector} target the vector to store results into
   */
  static lerp(t, e, s, n) {
    return n = n || new v(), n.copy(t).set(
      (e.x - t.x) * s + t.x,
      (e.y - t.y) * s + t.y
    );
  }
  static toDeg(t) {
    return v.toRad(t) / Math.PI * 180;
  }
  static toRad(t) {
    let e = Math.atan2(t.y, t.x);
    return e < 0 ? nt + e : e;
  }
};
let c = v;
je = Symbol.iterator, a(c, "ZERO", Object.freeze(new v()));
class E {
  constructor(t) {
    this._deg = t || 0, this._rad = t * Math.PI / 2 || 0;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "angle";
  }
  set degree(t) {
    this._deg = t, this._rad = t * Math.PI / 180;
  }
  set radian(t) {
    this._rad = t, this._deg = t * 180 / Math.PI;
  }
  get radian() {
    return this._rad;
  }
  get degree() {
    return this._deg;
  }
  copy(t) {
    this.degree = t.degree;
  }
  static fromJSON(t) {
    return new E(t._deg);
  }
}
class et {
  constructor(t, e, s, n, o, h) {
    this.a = t || 1, this.b = e || 0, this.c = s || 0, this.d = n || 1, this.e = o || 0, this.f = h || 0;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "matrix";
  }
  rotate(t) {
    let e = Math.sin(t), s = Math.cos(t);
    return this.a = s, this.c = -e, this.b = e, this.d = s, this;
  }
  translate(t, e) {
    return this.e += t, this.f += e, this;
  }
  transform(t) {
    let e = t.x, s = t.y;
    return t.x = this.a * e + this.c * s + this.e, t.y = this.b * e + this.d * s + this.f, t;
  }
  clone() {
    return new et(...this);
  }
  copy(t) {
    return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.e = t.e, this.f = t.f, this;
  }
  *[Symbol.iterator]() {
    yield this.a, yield this.b, yield this.c, yield this.d, yield this.e, yield this.f;
  }
}
let W = `🚀Chaos Engine Says::::
`, rt = [];
const _ = {};
_.warn = function(r) {
  console.warn(W + r);
};
_.throw = function(r) {
  throw new Error(W + r);
};
_.error = function(r) {
  console.error(W + r);
};
_.log = function(r) {
  console.log(W + r);
};
_.warnOnce = function(r) {
  rt.includes(r) || (rt.push(r), _.warn(r));
};
_.assert = function(r, t, e) {
  return r || t(e), r;
};
const f = {};
let Et = 0;
f.appendArr = function(r, t) {
  for (var e = 0; e < t.length; e++)
    r.push(t[e]);
};
f.clearArr = function(r) {
  for (var t = r.length; t > 0; t--)
    r.pop();
};
f.popArr = function(r, t) {
  let e = r.length;
  for (var s = e; s > e - t; s--)
    r.pop();
};
f.removeElement = function(r, t) {
  if (t == -1)
    return null;
  if (r.length - 1 == t)
    return r.pop();
  let e = r[t];
  return r[t] = r.pop(), e;
};
f.generateID = function() {
  return Et += 1;
};
f.inheritComponent = function(r, t = !0, e = !0) {
  if (r == null || typeof r != "function")
    return;
  let s = r.prototype;
  if (s.destroy) {
    let n = r.destroy;
    s.destroy = function() {
      this.entity = null, n.call(this);
    };
  } else
    s.destroy = function() {
      this.entity = null;
    };
  if (s.init && t) {
    let n = s.init;
    s.init = function(o) {
      this.entity = o, n.call(this, o);
    };
  } else
    s.init || (s.init = function(n) {
      this.entity = n;
    });
  !s.update && e && (s.update = function() {
    _.warnOnce("Please override the update function in the component " + s.constructor.name);
  }), s.getComponent = function(n) {
    return this.parent.getComponent(n);
  }, s.requires = function(...n) {
    for (var o = 0; o < n.length; o++)
      this.entity.has(n[o]) || _.throw(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${n[o]}\` but cannot find it in the Entity with id ${this.entity.id}`);
  }, s.query = function(n, o = []) {
    return this.parent.query(n, o);
  }, Object.defineProperty(s, "CHOAS_CLASSNAME", {
    get: function() {
      return this.constructor.name.toLowerCase();
    },
    enumerable: !0,
    configurable: !1
  }), Object.defineProperty(s, "CHAOS_OBJ_TYPE", {
    get: function() {
      return "component";
    },
    enumerable: !0,
    configurable: !1
  });
};
f.inheritSystem = function(r) {
  if (r == null || typeof r != "function")
    return;
  let t = r.prototype;
  t.init || (t.init = function() {
    _.warnOnce("Please override the init method in the system " + t.constructor.name);
  }), t.update || (t.update = function() {
    _.warnOnce("Please override the update method in the system " + t.constructor.name);
  }), t.add || (t.add = function(e) {
    this.objects.push(e);
  }), t.remove || (t.remove = function(e) {
    let s = this.objects.indexOf(e);
    f.removeElement(this.objects, s);
  });
};
class wt {
  constructor() {
    this.lastcall = 0, this.dt = 0;
  }
  getFrameRate() {
    return 1 / (this.dt / 1e3);
  }
  getRoundedFrameRate() {
    return Math.round(this.getFrameRate());
  }
  update(t) {
    return this.dt = t - this.lastcall, this.framerate = this.getFrameRate(), this.lastcall = t, this.delta = this.dt / 1e3, this.delta;
  }
}
class it {
  constructor() {
    a(this, "entity", null);
  }
}
f.inheritComponent(it);
class L extends it {
  constructor(t, e, s, n) {
    super(), this.pos = {
      x: 0,
      y: 0
    }, this.max = {
      x: s,
      y: n
    }, this.min = {
      x: t,
      y: e
    }, this.padding = 0;
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param { AABBox} bound the bound to check  intersection with
   * 
   * @param { BoundingSphere } bound the bound to check  intersection with
   **/
  intersects(t) {
    return t.r ? st.AABBvsSphere(this, t) : st.AABBColliding(this, t);
  }
  /**
   * 
   * @param {Body} body Body to calculate max and min from
   * @@param {Number} padding increases the size of the bounds
   */
  calculateBounds(t, e = 0) {
    let s = Number.MAX_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER, o = -Number.MAX_SAFE_INTEGER, h = -Number.MAX_SAFE_INTEGER;
    if (t.shapes.length == 0) {
      this.min.x = t.position.x, this.max.x = t.position.x, this.min.y = t.position.y, this.max.y = t.position.y, this.pos.x = t.position.x, this.pos.y = t.position.y;
      return;
    }
    for (var l = 0; l < t.shapes.length; l++) {
      let m = t.shapes[l];
      if (m.type == 0) {
        let d = t.position.x - m.radius, u = t.position.y - m.radius, g = t.position.x + m.radius, w = t.position.y + m.radius;
        (!s || d < s) && (s = d), (!o || g > o) && (o = g), (!n || u < n) && (n = u), (!h || w > h) && (h = w);
        continue;
      }
      for (var p = 0; p < m.vertices.length; p++) {
        let d = m.vertices[p];
        d.x < s && (s = d.x), d.x > o && (o = d.x), d.y < n && (n = d.y), d.y > h && (h = d.y);
      }
    }
    this.min.x = s - e, this.max.x = o + e, this.min.y = n - e, this.max.y = h + e, this.pos.x = t.position.x, this.pos.y = t.position.y, this.padding = e;
  }
  update(t) {
    let e = t.x - this.pos.x, s = t.y - this.pos.y;
    this.pos.x = t.x, this.pos.y = t.y, this.min.x += e, this.max.x += e, this.min.y += s, this.max.y += s;
  }
  draw(t) {
    t.strokeStyle = "red", t.moveTo(this.min.x, this.min.y), t.lineTo(this.min.x, this.max.y), t.lineTo(this.max.x, this.max.y), t.lineTo(this.max.x, this.min.y), t.lineTo(this.min.x, this.min.y), t.stroke(), t.strokeStyle = "black";
  }
  static union(t, e, s) {
    return s = s || new L(), s.max.x = t.max.x > e.max.x ? t.max.x : e.max.x, s.max.y = t.max.y > e.max.y ? t.max.y : e.max.y, s.min.x = t.min.x < e.min.x ? t.min.x : e.min.x, s.min.y = t.min.y < e.min.y ? t.min.y : e.min.y, s;
  }
  get area() {
    return (this.max.x - this.min.x) * (this.max.y - this.min.y);
  }
  clone() {
    let t = new L();
    return t.min.x = this.min.x, t.max.x = this.max.x, t.min.y = this.min.y, t.max.y = this.max.y, t.pos.x = this.pos.x, t.pos.y = this.pos.y, t.padding = this.padding, t;
  }
}
class kt {
  constructor(t) {
    this.vertices = t, this.normals = this.calcFaceNormals(), this._dynNormals = this.normals.map((e) => e.clone());
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "geometry";
  }
  getNormals(t, e) {
    e = e || [];
    for (var s = 0; s < this.normals.length; s++)
      e.push(this._dynNormals[s].copy(this.normals[s]).rotate(t));
    return e;
  }
  calcFaceNormals() {
    const t = [], { vertices: e } = this;
    for (var s = 0; s < e.length; s++) {
      let o = e[s >= e.length ? e.length - 1 : s].clone().sub(e[s + 1 >= e.length ? 0 : s + 1]).normal();
      for (var n = 0; n < t.length; n++)
        if (o.equals(t[n]) || o.clone().reverse().equals(t[n])) {
          o = null;
          break;
        }
      o && t.push(o);
    }
    return t;
  }
  transform(t, e, s, n) {
    for (let o = 0; o < this.vertices.length; o++) {
      let h = t[o];
      h.copy(this.vertices[o]), h.rotate(s), h.multiply(n), h.add(e);
    }
  }
}
const Bt = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
}), A = Object.freeze({
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
}), It = Object.freeze({
  DYNAMIC: 2,
  KINEMATIC: 1,
  STATIC: 0
}), b = {
  //For the world
  posDampen: 0.8,
  linearDamping: 0,
  angularDamping: 0,
  velocitySolverIterations: 1,
  fixedFrameRate: 0.016,
  //For all bodies
  mass: 1,
  restitution: 0.6,
  staticFriction: 0.4,
  kineticFriction: 0.2,
  boundPadding: 0,
  allowSleep: !1,
  aabbDetectionOnly: !1,
  collisionResponse: !0,
  autoUpdateBound: !0,
  type: It.DYNAMIC
};
let Ot = new c();
class k {
  /**
   * @param {array<vector>} vertices The vertices of the shape in local space coordinates.
   * @param {Vector} [offset=vector] offset position relative to parent body
   * @param {number} [offsetAngle=0] offset angle relative to parent body.
  */
  constructor(t, e = new c(), s = 0) {
    a(this, "type", Bt.POLYGON);
    a(this, "offAngle", 0);
    a(this, "offPosition", null);
    a(this, "vertices", null);
    a(this, "geometry", null);
    this.offPosition = e, this.offAngle = s * Math.PI / 180, this.vertices = t.map((n) => n.clone()), this.geometry = new kt(t);
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "shape";
  }
  /**
   * Returns the normals of the faces when rotated.
   * 
   * @param {} body
   * @param {} [target=[]] An array where results are stored.
   * @returns {Array<Vector>}
  */
  getNormals(t, e) {
    return this.geometry.getNormals(this.angle, e);
  }
  drawNormals(t, e = 10) {
    const { vertices: s } = this;
    if (s.length < 2)
      return;
    let n, o;
    t.beginPath(), t.strokeStyle = "green";
    for (var h = 0; h < s.length - 1; h++)
      n = s[h + 1].clone().sub(s[h]).multiply(0.5), o = n.normal(), n = s[h].clone().add(n), t.moveTo(n.x, n.y), t.lineTo(o.x * e + n.x, o.y * e + n.y), t.stroke();
    n = s[0].clone().sub(s[s.length - 1]).multiply(0.5), o = n.normal(), n = s[s.length - 1].clone().add(n), t.moveTo(n.x, n.y), t.lineTo(o.x * e + n.x, o.y * e + n.y), t.stroke(), t.strokeStyle = "black", t.closePath();
  }
  draw(t, e) {
    const { vertices: s } = this.geometry;
    t.beginPath(), t.strokeStyle = "black", t.moveTo(s[0].x, s[0].y);
    for (var n = 1; n < s.length; n++)
      t.lineTo(s[n].x, s[n].y);
    t.lineTo(s[0].x, s[0].y), t.stroke(), e && (t.fillStyle = e, t.fill()), t.closePath(), t.beginPath(), t.arc(0, 0, 2, 0, Math.PI * 2), t.fillStyle = "black", t.fill(), t.stroke(), t.closePath();
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @param {vector} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {number} scale the scale of the body
  */
  update(t, e, s) {
    this.angle = this.offAngle + e, this.geometry.transform(this.vertices, Ot.copy(t).add(this.offPosition), this.angle, 1, t);
  }
  /**
   * Returns the world coordinates of the vertices.
   * 
   * @returns {Array<Vector>}
  */
  getVertices() {
    return this.vertices;
  }
  /**
   * Calculates the inertia of a given shape.
   * 
   * @returns {number}
  */
  static calcInertia() {
    throw new Error("Implement in the children classes");
  }
}
a(k, "CIRCLE", 0), a(k, "POLYGON", 1);
class Lt extends k {
  constructor(t, e, s) {
    let n = new c(1).multiply(t / 2), o = new c(1).multiply(-t / 2);
    super([n, o], e, s), this.length = t;
  }
}
let ot = new c(), Dt = new c();
class X extends k {
  /**
   * @param {number} radius 
   * @param {vector} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(e, s, n) {
    super([], s, n);
    a(this, "position", new c());
    a(this, "angle", 0);
    a(this, "radius", 0);
    a(this, "type", k.CIRCLE);
    this.radius = e;
  }
  static calcInertia(e, s) {
    return e * (s * s) / 4;
  }
  /**
   * 
  */
  getVertices(e, s) {
    s = s || [];
    let n = ot.copy(e).multiply(-this.radius).add(this.position), o = Dt.copy(e).multiply(this.radius).add(this.position);
    return s[0] = n.clone(), s[1] = o.clone(), s;
  }
  /**
   * 
   * @param {Shape} shape 
   * @param {[]} [target=[]] target
  */
  getNormals(e, s = []) {
    let n = null, o = null;
    for (let h = 0; h < e.vertices.length; h++) {
      let l = this.position.distanceToSquared(e.vertices[h]);
      (!n || n > l) && (o = e.vertices[h], n = l);
    }
    return o || (o = e.position), s.push(ot.copy(o).sub(this.position).normalize().clone()), s;
  }
  /**
   * @inheritdoc
  */
  update(e, s, n) {
    this.position.copy(e).add(this.offPosition), this.angle = this.offAngle + s;
  }
  draw(e, s) {
    e.beginPath(), e.strokeStyle = "black", e.arc(0, 0, this.radius, 0, Math.PI * 2), e.lineWidth = 1, e.stroke(), s && (e.fillStyle = s, e.fill()), e.closePath(), e.beginPath(), e.arc(0, 0, 2, 0, Math.PI * 2), e.fillStyle = "black", e.fill(), e.stroke(), e.closePath(), e.beginPath(), e.moveTo(0, 0);
    let n = c.fromDeg(this.angle).multiply(this.radius);
    e.lineTo(...n), e.stroke(), e.closePath();
  }
  drawNormals() {
  }
  get area() {
    return Math.PI * this.radius * this.radius;
  }
}
class K extends k {
  /**
   * @param {number} width
   * @param {number} height
   * @param {vector} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
  */
  constructor(e, s, n, o) {
    let h = new c(-e / 2, -s / 2), l = new c(-e / 2, s / 2), p = new c(e / 2, s / 2), m = new c(e / 2, -s / 2);
    super([h, l, p, m], n, o);
    a(this, "height", 0);
    a(this, "width", 0);
    this.height = s, this.width = e;
  }
  static calcInertia(e, s, n) {
    return e * (M(s) + M(n)) / 12;
  }
  get area() {
    return this.width * this.height;
  }
}
let Nt = new c(), Rt = new c();
class We extends k {
  constructor(t, e, s, n, o) {
    let h = Nt.set(1, 0).multiply(t), l = c.fromDeg(s, Rt).multiply(e);
    super([
      new c(
        -h.x / 2,
        -l.y / 2
      ),
      new c(
        h.x / 2,
        -l.y / 2
      ),
      new c(
        l.x / 2,
        l.y / 2
      )
    ], n, o);
  }
}
const z = class {
  constructor(...t) {
    a(this, "id", f.generateID());
    a(this, "_position", new c());
    a(this, "_velocity", new c());
    a(this, "_acceleration", new c());
    a(this, "_orientation", new E());
    a(this, "_rotation", new E());
    a(this, "bounds", new L());
    a(this, "_mass", 1);
    a(this, "_inertia", 0);
    a(this, "_type", null);
    a(this, "_localanchors", []);
    a(this, "anchors", []);
    a(this, "lastPosition", new c());
    a(this, "inv_mass", 0);
    a(this, "inv_inertia", 0);
    a(this, "restitution", b.restitution);
    a(this, "staticFriction", b.staticFriction);
    a(this, "kineticFriction", b.kineticFriction);
    a(this, "boundPadding", b.boundPadding);
    a(this, "index", -1);
    a(this, "mask", {
      layer: 0,
      group: 0
    });
    a(this, "entity", null);
    a(this, "bounds", null);
    a(this, "shapes", null);
    a(this, "allowSleep", b.allowSleep);
    a(this, "sleeping", !1);
    a(this, "aabbDetectionOnly", b.aabbDetectionOnly);
    a(this, "collisionResponse", b.collisionResponse);
    a(this, "autoUpdateBound", b.autoUpdateBound);
    this.type = b.type, this.shapes = t, this.mass = 1, this.inertia = 1;
  }
  /**
   * Sets the type of a body.It includes the static and dynamic for now.
   * 
   * @example
   * let body = new Body()
   * body.type = Body.STATIC
   * 
  */
  set type(t) {
    (t === z.STATIC || t === z.KINEMATIC) && (this.mass = 0), this._type = t;
  }
  /**
   * Gets the type of body.
  */
  get type() {
    return this._type;
  }
  get physicsType() {
    return A.BODY;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "body";
  }
  get acceleration() {
    return this._acceleration;
  }
  set acceleration(t) {
    this._acceleration.copy(t);
  }
  get velocity() {
    return this._velocity;
  }
  set velocity(t) {
    this._velocity.copy(t);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation.copy(t);
  }
  set angle(t) {
    this.orientation.degree = t;
  }
  get angle() {
    return this.orientation.degree;
  }
  set mass(t) {
    this._mass = t, this.inv_mass = t === 0 ? 0 : 1 / t, t == 0 && (this.inertia = 0);
  }
  get mass() {
    return this._mass;
  }
  set density(t) {
    let e = 0;
    for (var s = 0; s < this.shapes.length; s++)
      e += this.shapes[s].area;
    this.mass = t * e * 0.01;
  }
  get density() {
    let t = 0;
    for (var e = 0; e < this.shapes.length; e++)
      t += this.shapes[e].area;
    return 100 * this.mass / t;
  }
  set inertia(t) {
    this._inertia = t, this.inv_inertia = t == 0 ? 0 : 1 / t;
  }
  get inertia() {
    return this._inertia;
  }
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copy(t);
  }
  set orientation(t) {
    this._orientation.copy(t);
  }
  get orientation() {
    return this._orientation;
  }
  get angularVelocity() {
    return this.rotation.degree;
  }
  set angularVelocity(t) {
    this.rotation.degree = t;
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @param {Vector} v The anchor arm
   * @returns {number}
   */
  setAnchor(t) {
    return this.anchors.push(new c(t.x, t.y).rotate(this.orientation.radian).add(this.position)), this._localanchors.push(t) - 1;
  }
  /**
   * Gets an anchor in its world coordinate form.
   * Treat the returned value as read-only.
   * 
   * @param {number} index the position of the
   * @returns {Vector}
   */
  getAnchor(t) {
    return this.anchors[t];
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @param {number} index The position of the anchor.
   * @param {Vector} [target=Vector] Vector to store results in.
   * @rerurns {Vector}
   */
  getLocalAnchor(t, e = new c()) {
    return e.copy(this._localanchors[t]).rotate(this.orientation.radian);
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * 
   * 
   * @param {number} index The force to be applied.
   * @param {Vector} [arm=Vector] The collision arm.
   */
  applyForce(t, e = c.ZERO) {
    this.acceleration.add(t.multiply(this.inv_mass)), this.rotation.degree += e.cross(t) * this.inv_inertia;
  }
  /**
   * @private
  */
  init(t, e = !1) {
    if (this.entity = t, e) {
      this.bounds = new L(), this.update();
      return;
    }
    this.requires("transform", "movable", "bounds");
    let s = t.get("transform"), n = t.get("bounds"), o = t.get("movable");
    this._acceleration = o.acceleration, this._rotation = o.rotation, this._velocity = o.velocity, this._position = s.position, this._orientation = s.orientation, this.bounds = n, this.update();
  }
  /**
   * This updates the world coordinates of shapes, anchors and bounds.
  */
  update() {
    for (var t = 0; t < this.shapes.length; t++)
      this.shapes[t].update(this.position, this._orientation.radian);
    for (var t = 0; t < this.anchors.length; t++)
      this.anchors[t].copy(this._localanchors[t]).rotate(this.orientation.radian).add(this.position);
    this.autoUpdateBound && this.bounds.calculateBounds(this, this.boundPadding), this.bounds.update(this.position);
  }
};
let P = z;
a(P, "STATIC", A.STATIC), a(P, "KINEMATIC", A.KINEMATIC), a(P, "DYNAMIC", A.DYNAMIC);
f.inheritComponent(P, !1, !1);
class Ge extends P {
  constructor(t, e) {
    let s = [], n = [];
    for (let o = 0; o < e.length; o++)
      s.push(new c(t * o, e[o]));
    for (let o = 1; o < s.length; o++) {
      let h = new Lt(s[o - 1], s[o]);
      n.push(h);
    }
    super(new c(), ...n), this.mass = 0, this.mask.layer = 0;
  }
}
class Je extends P {
  constructor(t) {
    super(new X(t)), this.inertia = X.calcInertia(this.mass, t);
  }
  get mass() {
    return this._mass;
  }
  set mass(t) {
    this._mass = t, this.inv_mass = t === 0 ? 0 : 1 / t, this.inertia = X.calcInertia(this.mass, this.shapes[0].radius);
  }
}
class Xe extends P {
  constructor(t, e) {
    super(new K(t, e)), this.inertia = K.calcInertia(this._mass, t, e);
  }
  set mass(t) {
    this._mass = t, this.inv_mass = t === 0 ? 0 : 1 / t, this.inertia = K.calcInertia(t, this.shapes[0].width, this.shapes[0].height);
  }
  get mass() {
    return this._mass;
  }
}
class Ft {
  constructor() {
    a(this, "entity", null);
    this.bodies = [], this.constraints = [];
  }
  get physicsType() {
    return A.COMPOSITE;
  }
  init(t) {
    this.bodies.forEach((e) => {
      e.init(t, !0);
    }), this.requires("transform");
  }
  add(t) {
    if (t.physicsType === A.CONSTRAINT)
      return this.constraints.push(t);
    t.physicsType === A.BODY && this.bodies.push(t);
  }
  update() {
    this.lastPosition.copy(this.position);
  }
  get acceleration() {
    let t = new c();
    for (var e = 0; e < this.bodies.length; e++)
      t.copy(this.bodies[e].acceleration);
    return t.divide(this.bodies.length);
  }
  set acceleration(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].acceleration = t;
  }
  get velocity() {
    let t = new c();
    for (var e = 0; e < this.bodies.length; e++)
      t.add(this.bodies[e].velocity);
    return t.divide(this.bodies.length);
  }
  set velocity(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].velocity.copy(t);
  }
  set angle(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].angle = x;
  }
  get angle() {
    let t = 0;
    for (var e = 0; e < this.bodies.length; e++)
      t += this.bodies[e].angle;
  }
  set mass(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].mass = t;
  }
  get mass() {
    let t = 0;
    for (var e = 0; e < this.bodies.length; e++)
      t += this.bodies[e].mass;
    return t;
  }
  set density(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].density = t;
  }
  get density() {
    let t = 0;
    for (var e = 0; e < this.bodies.length; e++)
      t += this.bodies[e].density;
    return t / this.bodies.length;
  }
  get position() {
    let t = new c();
    for (var e = 0; e < this.shapes.length; e++)
      t.add(this.bodies[e].position);
    return t;
  }
  set position(t) {
    let e = t.clone().sub(this.position);
    for (var s = 0; s < this.bodies.length; s++)
      this.bodies[s].position.add(e);
  }
  set orientation(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].orientation.copy(t);
  }
  get angularVelocity() {
    let t = 0;
    for (var e = 0; e < this.bodies.length; e++)
      t += this.bodies[e].angularVelocity;
    return t;
  }
  set angularVelocity(t) {
    for (var e = 0; e < this.bodies.length; e++)
      this.bodies[e].angularVelocity = t;
  }
}
f.inheritComponent(Ft);
class bt {
  constructor(t, e) {
    this.body1 = t, this.body2 = e, this.stiffness = 50, this.dampening = 0.03;
  }
  get physicsType() {
    return A.CONSTRAINT;
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  get CHAOS_OBJ_TYPE() {
    return "constraint";
  }
  behavior(t, e) {
    e.position.copy(t.position);
  }
  update(t) {
    this.behavior(this.body1, this.body2, t);
  }
}
let jt = new c(), $t = new c(), Ht = new c(), H = new c(), V = new c(), at = new c();
class Ke extends bt {
  constructor(t, e, s, n) {
    super(t, e), this.localA = new c().copy(s || at), this.localB = new c().copy(n || at), this.fixed = !t.mass || !e.mass, this.dampen = 1, this.maxDistance = 1, this.stiffness = 1;
  }
  behavior(t, e, s) {
    let n = jt.copy(this.localA).rotate(t.angle * Math.PI / 180), o = $t.copy(this.localB).rotate(e.angle * Math.PI / 180), h = Ht.copy(t.position).add(n), l = H.copy(e.position).add(o), p = h.sub(l), m = p.magnitude();
    if (m === 0)
      return;
    let d = (m - this.maxDistance) / m, u = p.multiply(d * this.stiffness * this.dampen), g = t.inv_mass + e.inv_mass;
    t.inv_inertia + e.inv_inertia, H.copy(u), u.divide(g * 2), t.velocity.add(V.copy(u).multiply(-t.inv_mass).divide(s)), e.velocity.add(V.copy(u).multiply(e.inv_mass).divide(s)), t.position.add(V.copy(u).multiply(-t.inv_mass)), e.position.add(V.copy(u).multiply(e.inv_mass)), t.rotation.radian += H.cross(n) * t.inv_inertia, e.rotation.radian += H.cross(o) * -e.inv_inertia;
  }
}
let Vt = new c(), qt = new c(), Yt = new c(), q = new c(), lt = new c(), ht = new c(), ct = new c();
class Ze extends bt {
  constructor(t, e, s, n) {
    super(t, e), this.localA = new c().copy(s || ct), this.localB = new c().copy(n || ct), this.fixed = !t.mass || !e.mass, this.dampen = 1, this.maxDistance = 1, this.stiffness = 1;
  }
  behavior(t, e, s) {
    let n = Vt.copy(this.localA).rotate(t.angle * Math.PI / 180), o = qt.copy(this.localB).rotate(e.angle * Math.PI / 180), h = Yt.copy(t.position).add(n), l = q.copy(e.position).add(o), p = h.sub(l), m = p.magnitude();
    if (m === 0)
      return;
    let d = (m - this.maxDistance) / m, u = p.multiply(d * this.stiffness * this.dampen), g = t.inv_mass + e.inv_mass;
    t.inv_inertia + e.inv_inertia, q.copy(u), u.divide(g * 2), t.velocity.add(ht.copy(u).multiply(-t.inv_mass).divide(s)), e.velocity.add(lt.copy(u).multiply(e.inv_mass).divide(s)), t.position.add(ht.copy(u).multiply(-t.inv_mass)), e.position.add(lt.copy(u).multiply(e.inv_mass)), t.rotation.radian += q.cross(n) * t.inv_inertia, e.rotation.radian += q.cross(o) * -e.inv_inertia;
  }
}
let Z = new c(), Q = new c(), ut = new c();
class Ut {
  static solve(t, e) {
    Q.copy(t.acceleration).multiply(e * 0.5), ut.copy(t.velocity), Z.copy(t.position), t.acceleration.set(0, 0), t.velocity.add(Q), Z.add(ut.multiply(e)).add(Q.multiply(e)), t.position = Z, t.angle += t.angularVelocity * e;
  }
}
let zt = new c(), Wt = new c(), Gt = new c(), pt = new c(), dt = new c();
class Jt {
  static solve(t) {
    let { bodyA: e, bodyB: s, ca1: n, ca2: o, restitution: h, impulse: l } = t, { axis: p } = t.contactData;
    if (l <= 0)
      return;
    let m = zt.set(n.y * -e.rotation._rad, n.x * e.rotation._rad), d = Wt.set(o.y * -s.rotation._rad, o.x * s.rotation._rad), u = Gt.copy(e.velocity).add(m), g = pt.copy(s.velocity).add(d), w = u.sub(g);
    if (w.magnitudeSquared() === 0)
      return;
    let y = p.normal(1, pt);
    if (y = y.multiply(y.dot(w)), y.magnitudeSquared() === 0)
      return;
    y.normalize();
    let C = y.dot(w), I = Math.min(e.staticFriction, s.staticFriction), J = Math.min(e.kineticFriction, s.kineticFriction), N = -C / (e.inv_mass + s.inv_mass + M(n.dot(y) * e.inv_inertia + M(o.dot(y)) * s.inv_inertia)), T;
    Math.abs(N) <= l * I ? T = y.multiply(N) : T = y.multiply(N * J), t.velA.add(dt.copy(T).multiply(e.inv_mass)), t.velB.add(dt.copy(T).multiply(-s.inv_mass)), t.rotA += n.cross(T) * e.inv_inertia, t.rotB += o.cross(T) * -s.inv_inertia;
  }
}
let Y = { x: 0, y: 0 }, mt = 1, U = 1, Xt = 0.8;
class Kt {
  static solve(t, e, s, n) {
    n == 2 && (Math.abs(t.angularVelocity) > U && (t.angularVelocity = 0), Math.abs(e.angularVelocity) > U && (e.angularVelocity = 0)), !(s > Xt) && (t.velocity.magnitude() > mt && Math.abs(t.angularVelocity) > U || e.velocity.magnitude() > mt && Math.abs(e.angularVelocity) > U || !t.allowSleep || !e.allowSleep || (t.sleeping = !0, t.velocity = Y, t.acceleration = Y, e.sleeping = !0, e.velocity = Y, e.acceleration = Y));
  }
}
const ft = new c(), Zt = new c();
let Qt = b.posDampen;
class te {
  static warmstart(t, e) {
    if (t.stmp !== e)
      return;
    let s = t.contactData.lastOverlap - t.contactData.overlap;
    t.contactData.overlap -= s * 0.2;
  }
  static solve(t, e) {
    let { bodyA: s, bodyB: n, ca1: o, ca2: h } = t, { axis: l, overlap: p } = t.contactData;
    const d = p * Qt / (s.inv_mass + n.inv_mass + M(o.cross(l)) * s.inv_inertia + M(h.cross(l)) * n.inv_inertia);
    let u = Zt.copy(l).multiply(d);
    s.velocity.add(ft.copy(u).multiply(s.inv_mass * e)), n.velocity.add(ft.copy(u).multiply(-n.inv_mass * e)), s.rotation.radian += o.cross(u) * s.inv_inertia * e, n.rotation.radian += h.cross(u) * -n.inv_inertia * e, t.contactData.lastOverlap = p;
  }
}
let ee = new c(), ie = new c(), se = new c(), ne = new c();
class re {
  static solve(t) {
    let { bodyA: e, bodyB: s, ca1: n, ca2: o, restitution: h } = t, { axis: l } = t.contactData, p = ee.set(n.y * -e.rotation.radian, n.x * e.rotation.radian), m = ie.set(o.y * -s.rotation.radian, o.x * s.rotation.radian), d = se.copy(e.velocity).add(p), u = ne.copy(s.velocity).add(m), g = d.sub(u), w = l.dot(g);
    if (w >= 0) {
      t.impulse = 0;
      return;
    }
    let y = -h * w / (e.inv_mass + s.inv_mass + M(n.cross(l)) * e.inv_inertia + M(o.cross(l)) * s.inv_inertia), C = l.clone().multiply(y), I = n.cross(C) * e.inv_inertia, J = o.cross(C) * -s.inv_inertia, N = C.clone().multiply(e.inv_mass), T = C.clone().multiply(-s.inv_mass);
    t.velA.copy(N), t.velB.copy(T), t.rotA = I, t.rotB = J, t.impulse = y;
  }
}
const oe = [], ae = {
  overlap: 0,
  verticesA: null,
  verticesB: null,
  axis: new c(),
  vertex: null,
  shape: null
}, le = {
  min: 0,
  max: 0,
  indexN: 0
}, he = {
  min: 0,
  max: 0,
  indexN: 0
}, ce = new c(), ue = new c(), F = new c(), S = {
  shapesInBodyCollided(r, t, e) {
    let s = r.shapes, n = t.shapes;
    for (var o = 0; o < s.length; o++)
      for (var h = 0; h < n.length; h++)
        S.shapesCollided(s[o], n[h], e);
    if (e.overlap < 0)
      return e;
    let l = e.dorminantShape, p = ue.copy(e.axis), m = e.shapes[0], d = e.shapes[1], u = [];
    const g = S.findNearSupports(e.vertShapeA, p, []), w = S.findNearSupports(e.vertShapeB, F.copy(p).reverse(), []);
    for (var o = 0; o < g.length; o++)
      S.shapeContains(d, g[o]) && u.push(g[o]);
    if (u.length < 2)
      for (var o = 0; o < w.length; o++)
        S.shapeContains(m, w[o]) && (u.push(w[o]), u.length || (shape = d));
    return u.length == 0 && u.push(g[0]), u = S.findNearSupports(u, p, []), l == d && p.reverse(), l == m && (e.verticesA[0] = u[0], e.verticesB[0] = u[0].clone().add(F.copy(p).multiply(e.overlap)), u.length == 2 && (e.verticesA[1] = u[1], e.verticesB[1] = u[1].clone().add(F.copy(p).multiply(e.overlap)))), l == d && (e.verticesA[0] = u[0].clone().add(F.copy(p).multiply(e.overlap)), e.verticesB[0] = u[0], u.length == 2 && (e.verticesA[1] = u[1].clone().add(F.copy(p).multiply(e.overlap)), e.verticesB[1] = u[1])), e.contactNo = u.length, e;
  },
  shapesCollided(r, t, e) {
    let s = oe, n;
    f.clearArr(s), r.getNormals(t, s), n = s.length, t.getNormals(r, s), S.projectShapesToAxes(r, t, s, e, n);
  },
  projectShapesToAxes(r, t, e, s, n) {
    let o = ae;
    o.vertex = null, o.body = null, o.overlap = 1 / 0;
    for (let h = 0; h < e.length; h++) {
      let l = ce.copy(e[h]), p = r.getVertices(l), m = t.getVertices(l), d = S.projectVerticesToAxis(p, l, le), u = S.projectVerticesToAxis(m, l, he), g = d.max < u.max ? d.max : u.max, w = d.min > u.min ? d.min : u.min, y = g - w;
      if (y < 0)
        return s;
      if (d.max < u.max && l.reverse(), d.max > u.max && d.min < u.min || u.max > d.max && u.min < d.min) {
        let C = Math.abs(d.max - u.max), I = Math.abs(d.min - u.min);
        I < C ? y += I : (y += C, l.reverse());
      }
      y < o.overlap && (o.overlap = y, o.axis.copy(l), o.shape = h <= n - 1 ? t : r, o.indexA = d.indexN, o.indexB = u.indexN, o.verticesA = p, o.verticesB = m);
    }
    return o.overlap > s.overlap && (s.overlap = o.overlap, s.axis.copy(o.axis), s.dorminantShape = o.shape, s.shapes[0] = r, s.shapes[1] = t, s.vertShapeA = o.verticesA, s.vertShapeB = o.verticesB, s.indexA = o.indexA, s.indexB = o.indexB, s.done = !0), s;
  },
  projectVerticesToAxis(r, t, e) {
    let s = 1 / 0, n = -1 / 0, o = null, h = r.length;
    for (let l = 0; l < h; l++) {
      let p = t.dot(r[l]);
      p < s && (s = p, o = l), p > n && (n = p);
    }
    return e.min = s, e.max = n, e.indexN = o, e;
  },
  findNearSupports(r, t, e = [], s) {
    let n = 1 / 0, o = e, h = r.length;
    for (let l = 0; l < h; l++) {
      let p = t.dot(r[l]);
      if (Math.abs(p - n) <= 0.1 && !o.includes(r[l])) {
        o.push(r[l]);
        continue;
      }
      p < n && (n = p, f.clearArr(o), o.push(r[l]), l = -1);
    }
    return o;
  },
  shapeContains(r, t) {
    return r.type == "circle" ? S.circleContains(r.position, r.radius, t) : S.verticesContain(r.vertices, t);
  },
  circleContains(r, t, e) {
    let s = e.x - r.x, n = e.y - r.y;
    return !(s * s + n * n > t * t);
  },
  verticesContain(r, t) {
    var e = t.x, s = t.y, n = r.length, o = r[n - 1], h;
    if (n < 2)
      return !1;
    for (var l = 0; l < n; l++) {
      if (h = r[l], (e - o.x) * (h.y - o.y) + (s - o.y) * (o.x - h.x) < 0)
        return !1;
      o = h;
    }
    return !0;
  }
};
class pe {
  canCollide(t, e) {
    return !(t.mass == 0 && e.mass == 0 || t.mask.group !== 0 && e.mask.group !== 0 && t.mask.group == e.mask.group || t.mask.layer && e.mask.layer && t.mask.layer !== e.mask.layer || t.sleeping && e.sleeping);
  }
  insert() {
  }
  remove() {
  }
  traverse(t) {
  }
  draw(t) {
  }
  update(t) {
  }
  remove(t) {
  }
}
class de extends pe {
  constructor(t) {
    super(), this.bodies = t.objects;
  }
  query(t, e) {
    closeObjects = e || [];
    for (var s = 0; s < this.objects.length; s++) {
      let n = this.world.objects[s];
      n.bounds.intersects(t) < dist && closeObjects.push(n);
    }
    return closeObjects;
  }
  getCollisionPairs(t) {
    t = t || [];
    let e = this.bodies, s = e.length;
    for (let n = 0; n < s; n++) {
      let o = e[n];
      for (let h = n + 1; h < s; h++) {
        let l = e[h];
        if (!this.canCollide(o, l) || !o.bounds.intersects(l.bounds))
          continue;
        let p = {
          a: o,
          b: l
        };
        o.aabbDetectionOnly || l.aabbDetectionOnly || !o.shapes.length || !l.shapes.length || t.push(p);
      }
    }
    return t;
  }
}
class me {
  /**
   * @constructor World
   * 
   */
  constructor() {
    a(this, "count", 0);
    a(this, "records", /* @__PURE__ */ new Map());
    a(this, "objects", []);
    a(this, "fixedConstraits", []);
    a(this, "constraints", []);
    a(this, "linearDamping", b.linearDamping);
    a(this, "angularDamping", b.angularDamping);
    a(this, "velocitySolverIterations", b.velocitySolverIterations);
    a(this, "CLMDs", []);
    a(this, "contactList", []);
    a(this, "gravitationalAcceleration", new c(0, 0));
    a(this, "fixedFrameRate", b.fixedFrameRate);
    a(this, "perf", {
      lastTimestamp: 0,
      total: 0
    });
    a(this, "broadphase", null);
    this.broadphase = new de(this);
  }
  /**
   * Sets the gravitational pull of the world
   */
  set gravity(t) {
    if (typeof t == "object")
      return this.gravitationalAcceleration.copy(t);
    this.gravitationalAcceleration.set(0, t);
  }
  /**
   * gets the gravitational pull of the world
   * @returns {Vector}
   */
  get gravity() {
    return this.gravitationalAcceleration;
  }
  /**
   * @private
   */
  narrowPhase() {
    let t, e;
    for (var s = 0; s < this.contactList.length; s++) {
      let { a: n, b: o } = this.contactList[s];
      n.sleeping = !1, o.sleeping = !1;
      let h = Mt(n.id, o.id);
      this.records.has(h) || this.records.set(h, {
        bodyA: n,
        bodyB: o,
        contactData: {
          lastOverlap: 0,
          overlap: -1 / 0,
          done: !1,
          axis: new c(),
          verticesA: [],
          verticesB: [],
          vertShapeA: null,
          vertShapeB: null,
          contactNo: 0,
          shapes: [],
          indexA: 0,
          indexB: 0
        },
        stmp: -1,
        impulse: 0,
        persistent: !1,
        ca1: new c(),
        ca2: new c(),
        restitution: 0,
        staticFriction: 0,
        kineticFriction: 0,
        velA: new c(),
        velB: new c(),
        rotA: 0,
        rotB: 0
      }), e = this.records.get(h), t = e.contactData, t.overlap = -1 / 0, t.done = !1, S.shapesInBodyCollided(n, o, t), !(t.overlap < 0 || !t.done) && (t.contactNo == 2 ? (c.lerp(
        t.verticesA[0],
        t.verticesA[1],
        0.5,
        e.ca1
      ).sub(n.position), c.lerp(
        t.verticesB[0],
        t.verticesB[1],
        0.5,
        e.ca2
      ).sub(o.position)) : (e.ca1.copy(t.verticesA[0]).sub(n.position), e.ca2.copy(t.verticesB[0]).sub(o.position)), e.restitution = n.restitution < o.restitution ? n.restitution : o.restitution, e.staticFriction = n.staticFriction < o.staticFriction ? n.staticFriction : o.staticFriction, e.kineticFriction = n.kineticFriction < o.kineticFriction ? n.kineticFriction : o.kineticFriction, n.collisionResponse && o.collisionResponse && this.CLMDs.push(e));
    }
  }
  /*
   * @private
   */
  broadPhase() {
    this.contactList = [], this.broadphase.getCollisionPairs(this.contactList);
  }
  /**
   * @private
   */
  collisionDetection() {
    this.broadPhase(), this.narrowPhase();
  }
  /**
   * @private
   */
  collisionResponse(t) {
    let e = this.CLMDs.length, s, n = 1 / t;
    this.count - 1;
    for (var o = 0; o < this.velocitySolverIterations; o++) {
      for (let l = 0; l < e; l++)
        s = this.CLMDs[l], s.velA.set(0, 0), s.velB.set(0, 0), s.rotA = 0, s.rotB = 0, re.solve(s), Jt.solve(s);
      for (var h = 0; h < e; h++)
        s = this.CLMDs[h], s.bodyA.velocity.add(s.velA), s.bodyB.velocity.add(s.velB), s.bodyA.rotation.radian += s.rotA, s.bodyB.rotation.radian += s.rotB;
    }
    for (let l = 0; l < e; l++)
      s = this.CLMDs[l], te.solve(s, n);
    for (let l = 0; l < e; l++)
      s = this.CLMDs[l], s.stmp = this.count, Kt.solve(
        s.bodyA,
        s.bodyB,
        s.impulse,
        s.contactData.contactNo
      );
  }
  /**
   * @private
   */
  intergrate(t, e) {
    for (var s = 0; s < e; s++) {
      let n = this.objects[s];
      n.sleeping || Ut.solve(n, t);
    }
  }
  /**
   * @private
   */
  applyGravity(t, e) {
    this.gravitationalAcceleration.clone().multiply(e);
    for (var s = 0; s < t; s++) {
      let n = this.objects[s];
      n.mass && n.acceleration.add(this.gravitationalAcceleration);
    }
  }
  /**
   * @private
   */
  updateConstraints(t) {
    let e = this.constraints.length, s = this.fixedConstraits.length;
    for (var n = 0; n < s; n++)
      this.fixedConstraits[n].update(t);
    for (var n = 0; n < e; n++)
      this.constraints[n].update(t);
  }
  /**
   * @private
   */
  updateBodies(t) {
    let e = 1 - this.linearDamping, s = 1 - this.angularDamping;
    for (var n = 0; n < t; n++)
      this.objects[n].update(), this.objects[n].velocity.multiply(e), this.objects[n].angularVelocity = this.objects[n].angularVelocity * s;
  }
  /**
   * @param {Number} dt the time passed between two frames
   */
  update(t) {
    this.perf.lastTimestamp = performance.now();
    let e = this.fixedFrameRate || t, s = this.objects.length;
    this.CLMDs = [], this.applyGravity(s, e), this.updateBodies(s), this.broadphase.update(), this.updateConstraints(e), this.collisionDetection(), this.collisionResponse(e), this.updateConstraints(e), this.updateBodies(s), this.intergrate(e, s), this.count += 1, this.perf.total = performance.now() - this.perf.lastTimestamp;
  }
  init(t) {
    t.setComponentList("body", this.objects);
  }
  add(t) {
    t.physicsType == A.BODY ? this.addBody(t) : t.physicsType == A.CONSTRAINT ? this.addConstraint(t) : t.physicsType == A.COMPOSITE && this.addComposite(t);
  }
  /**
   * Adds a body to the physics world
   * @param {Body} body Body to insert to world
   */
  addBody(t) {
    t.update(), t.index = this.objects.length, this.objects.push(t), this.broadphase.insert(t);
  }
  remove(t) {
    this.removeBody(t);
  }
  /**
   * Removes a body from the physics world
   * @@param {Body} body Body to remove from world
   */
  removeBody(t) {
    if (this.broadphase.remove(t), f.removeElement(this.objects, t.index)) {
      if (t.index === this.objects.length)
        return;
      this.objects[t.index].index = t.index;
    }
    return t;
  }
  /**
   * Adds a constraint to the physics world
   * @@param {Constraint} constraint constaint to add to world
   */
  addConstraint(t) {
    if (t.fixed) {
      t.index = this.fixedConstraits.length, this.fixedConstraits.push(t);
      return;
    }
    t.index = this.constraints.length, this.constraints.push(t);
  }
  /**
   * Removes a constraint from the physics world
   * @@param {Constraint} constraint constaint to add to world
   */
  removeContraint(t) {
    let s = (t.fixed ? this.fixedConstraits : this.constraints).pop();
    return this.objects[t.index] = temp1, s.index = t.index, t.index = -1, t;
  }
  addComposite(t) {
    for (var e = 0; e < t.bodies.length; e++)
      this.addBody(t.bodies[e]);
    for (var e = 0; e < t.constraints.length; e++)
      this.addConstraint(t.constraints[e]);
  }
  removeComposite() {
    for (var t = 0; t < composite.bodies.length; t++)
      this.removeBody(composite.bodies[t]);
    for (var t = 0; t < composite.constraints.length; t++)
      this.removeContraint(composite.constraints[t]);
  }
  /**
   * Searches for objects in a given bounds and returns them
   * @@param {} bound the region to search in
   * @param {[]} [target = []] an array to store results in
   */
  query(t, e = []) {
    return this.broadphase.query(t, e), e;
  }
}
class fe {
  constructor(t, e) {
    a(this, "_position", new c());
    this.transformMatrix = new et(), this.target = null, this.lerpFactor = 0.5, this.renderer = t, this.position.set((e == null ? void 0 : e.x) || 0, (e == null ? void 0 : e.y) || 0), this.orientation = new E();
  }
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copy(t);
  }
  get transform() {
    return this.position;
  }
  update(t) {
    this.target && this._position.lerp(
      this.target,
      this.lerpFactor
    );
  }
  clear(t) {
    t.setTransform();
  }
  dispose() {
    this.renderer = null;
  }
  follow(t) {
    this.target = t;
  }
}
class ye {
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(t) {
    a(this, "_accumulator", 0);
    a(this, "_transforms", []);
    a(this, "_rotation", 0);
    a(this, "_translation", new c());
    a(this, "_scale", new c());
    a(this, "_fill", "black");
    a(this, "_stroke", "black");
    a(this, "frameRate", 1 / 60);
    a(this, "objects", []);
    a(this, "renderLast", []);
    a(this, "perf", {
      lastTimestamp: 0,
      total: 0
    });
    a(this, "background", null);
    /** @type {HTMLCanvasElement}*/
    a(this, "domElement", null);
    /**@type {CanvasRenderingContext2D}*/
    a(this, "ctx", null);
    a(this, "camera", null);
    a(this, "_update", (t) => {
      let e = this.clock.update(t);
      if (this._accumulator < this.frameRate) {
        this._accumulator += e, this.RAF();
        return;
      }
      this.update(e || this._accumulator), this.RAF(), this._accumulator = 0;
    });
    this.domElement = t || document.createElement("canvas"), this.ctx = this.domElement.getContext("2d"), this.camera = new fe(this), this.clock = new wt();
  }
  init(t) {
    t.setComponentList("mesh", this.objects);
  }
  push() {
    this._transforms.push(this.ctx.getTransform());
  }
  pop() {
    this.ctx.setTransform(this._transforms.pop());
  }
  reset() {
    this.ctx.setTransform();
  }
  translate(t, e) {
    this.ctx.translate(t, e);
  }
  scale(t, e) {
    this.ctx.scale(t, e);
  }
  rotate(t) {
    this.ctx.rotate(t), this._rotation += t;
  }
  line(t, e, s, n) {
    this.ctx.moveTo(
      t - this.camera.position.x,
      e - this.camera.position.y
    ), this.ctx.lineTo(
      s - this.camera.position.x,
      n - this.camera.position.y
    );
  }
  rect(t, e, s, n) {
    this.ctx.rect(
      t - this.camera.position.x,
      e - this.camera.position.y,
      s,
      n
    );
  }
  circle(t, e, s) {
    this.ctx.arc(
      t - this.camera.position.x,
      e - this.camera.position.y,
      s,
      0,
      Math.PI * 2
    );
  }
  vertices(t, e = !0) {
    this.ctx.moveTo(
      t[0].x - this.camera.position.x,
      t[0].y - this.camera.position.y
    );
    for (var s = 1; s < t.length; s++)
      this.ctx.lineTo(
        t[s].x - this.camera.position.x,
        t[s].y - this.camera.position.y
      );
    e && this.ctx.lineTo(
      t[0].x - this.camera.position.x,
      t[0].y - this.camera.position.y
    );
  }
  arc(t, e, s, n, o) {
    this.ctx.arc(
      t - this.camera.position.x,
      e - this.camera.position.y,
      s,
      n,
      o
    );
  }
  fillText(t, e, s) {
    this.ctx.fillText(
      t,
      e - this.camera.position.x,
      s - this.camera.position.y
    );
  }
  fill(t = "black", e) {
    this.ctx.fillStyle = t, this.ctx.fill(e);
  }
  stroke(t = "black", e = 1) {
    this.ctx.strokeStyle = t, this.ctx.width = e, this.ctx.stroke();
  }
  begin() {
    this.ctx.beginPath();
  }
  close() {
    this.ctx.closePath();
  }
  clip() {
    this.ctx.clip();
  }
  drawImage(t, e, s, n = t.width, o = t.height, h = 0, l = 0) {
    this.ctx.drawImage(
      t,
      n * h,
      o * l,
      n,
      o,
      e - this.camera.position.y,
      s - this.camera.position.y,
      n,
      o
    );
  }
  get width() {
    return this.domElement.clientWidth;
  }
  get height() {
    return this.domElement.clientHeight;
  }
  set width(t) {
    this.domElement.width = t;
  }
  set height(t) {
    this.domElement.height = t;
  }
  setViewport(t, e) {
    this.width = t, this.height = e;
  }
  set CSSbackground(t) {
    this.domElement.style.background = t;
  }
  get CSSbackground() {
    return this.domElement.style.background;
  }
  clear() {
    this.reset();
    let t = this.height, e = this.width;
    this.ctx.clearRect(0, 0, e, t);
  }
  update(t) {
    this.perf.lastTimestamp = performance.now(), this.background != null && this.background.update(this, t);
    for (var e = 0; e < this.objects.length; e++)
      this.objects[e].update(this, t);
    for (var e = 0; e < this.renderLast.length; e++)
      this.renderLast[e].update(this, t, this.camera.transform);
    this.perf.total = performance.now() - this.perf.lastTimestamp;
  }
  RAF() {
    this._rafID = requestAnimationFrame(this._update);
  }
  play() {
    this.RAF();
  }
  pause() {
    cancelAnimationFrame(this._rafID);
  }
  bindTo(t, e = !0) {
    let s = document.querySelector(t);
    this.domElement.remove(), this.domElement.style.backgroundColor = "grey", this.domElement.style.touchAction = "none", s.append(this.domElement);
  }
  add(t) {
    this.objects.push(t);
  }
  remove(t) {
    this.objects.splice(this.objects.indexOf(t), 1);
  }
  addUI(t) {
    this.renderLast.push(t);
  }
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen();
  }
}
const B = {
  webgpu: !1,
  webgl: !1,
  canvas2d: !1,
  canvas: !1,
  webAudio: !1,
  supportedAudio: [],
  supportedImages: [],
  windows: !1,
  mac: !1,
  android: !1,
  linux: !1,
  ios: !1,
  chrome: !1,
  firefox: !1,
  edge: !1,
  safari: !1
};
let j = navigator.userAgent;
new Audio();
/Android/.test(j) ? B.android = !0 : /iP[ao]d|iPhone/i.test(j) ? B.ios = !0 : /Linux/.test(j) ? B.linux = !0 : /Mac OS/.test(j) ? B.mac = !0 : /Windows/.test(j) && (B.windows = !0);
window.AudioContext && (B.webAudio = !0);
Object.freeze(B);
class ge {
  constructor(t) {
    this._toload = [], this.imgs = {}, this.sfx = {}, this.json = {}, this._progressBytes = 0, this._totalBytes = 0, this._filesErr = 0, this._filesLoaded = 0, this._totalFileNo = 0;
    const e = this;
    this.onfinish = null, this._handlers = {
      onload: function(s, n) {
        let o = e._getType(s.responseURL), h = e._getName(s.responseURL);
        if (n.lengthComputable === !1) {
          e._handlers.onerror(s, n);
          return;
        }
        if (o === "image")
          e.imgs[h] = new Image(), e.imgs[h].src = URL.createObjectURL(s.response);
        else if (o === "audio")
          e.sfx[h] = s.response;
        else if (o === "json")
          e.json[h] = JSON.parse(s.response);
        else
          return _.warn(`The file in url ${s.responseURL} is not loaded into the loader because its extension name is not supported.`);
        e._filesLoaded += 1, e._filesLoaded + e._filesErr === e._totalFileNo && e.onfinish && e.onfinish();
      },
      onheadload: function(s) {
        if (s.total === 0 || !s.lengthComputable)
          return;
        e._totalBytes += s.total;
        let n = new XMLHttpRequest();
        n.open("GET", files.images[i], !0), n.onload = (o) => e._handlers.onload(n), n.onerror = e._handlers.onerror(n), n.send();
      },
      onerror: function(s) {
        e._filesErr += 1, _.warn(`The file ${s.responseURL} could not be loaded as the file might not exist in current url`), e._filesLoaded + e._filesErr === e._totalFileNo && e.onfinish && e.onfinish();
      }
    };
  }
  _getName(t) {
    if (t.includes("/")) {
      let e = t.split("/");
      t = e[e.length - 1];
    }
    return t.split(".")[0];
  }
  _getType(t) {
    let e;
    if (t.includes("/")) {
      let s = t.split("/");
      t = s[s.length - 1];
    }
    if (e = t.split(".")[1], e === "jpg" || e === "png" || e === "jpeg")
      return "image";
    if (e === "mp3" || e === "ogg")
      return "audio";
    if (e === "json")
      return "json";
  }
  loadAll(t = {}) {
    var s, n, o;
    if (this._totalFileNo = (((s = t.images) == null ? void 0 : s.length) || 0) + (((n = t.audio) == null ? void 0 : n.length) || 0) + (((o = t.json) == null ? void 0 : o.length) || 0), this._totalFileNo === 0) {
      this.onfinish();
      return;
    }
    if (t.images)
      for (var e = 0; e < t.images.length; e++) {
        let h = new XMLHttpRequest();
        h.open("GET", t.images[e], !0), h.responseType = "blob", h.onload = (l) => {
          this._handlers.onload(h, l);
        }, h.onerror = (l) => this._handlers.onerror(h), h.send();
      }
    if (t.audio)
      for (var e = 0; e < t.audio.length; e++) {
        let l = new XMLHttpRequest();
        l.responseType = "arraybuffer", l.open("GET", t.audio[e], !0), l.onload = (p) => this._handlers.onload(l, p), l.onerror = (p) => this._handlers.onerror(l), l.send();
      }
    if (t.json)
      for (var e = 0; e < t.json.length; e++) {
        t.json[e];
        let l = new XMLHttpRequest();
        l.responseType = "text", l.open("GET", t.json[e], !0), l.onload = (p) => this._handlers.onload(l, p), l.onerror = (p) => this._handlers.onerror(l), l.send();
      }
  }
}
class ve {
  constructor() {
    a(this, "handlers", {});
  }
  /**
   * This fires all event handlers of a certain event.
   * 
   * @param {string} n the name of event fired.
   * @param {any} data The payload of the event.
  */
  trigger(t, e) {
    t in this.handlers && this.handlers[t].forEach((s) => s(e));
  }
  /**
   * Ignore this,must be here for it to be a system.Might make this class not a system later
  */
  init() {
  }
  /**
   * Adds an event handler to an event dispatcher.
   * 
   * @param {string} name name of the event.
   * @param {function} handler Function to be called when the event is triggered.
  */
  add(t, e) {
    if (t in this.handlers) {
      this.handlers[t].push(e);
      return;
    }
    this.handlers[t] = [e];
  }
}
class _e {
  constructor() {
    this.handlers = {}, this._evHandlers = {};
  }
  /**
   * Adds an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  add(t, e) {
    if (this.handlers[t])
      return this.handlers[t].push(e);
    this.handlers[t] = [e];
    let s = (n) => {
      let o = this.handlers[t];
      for (var h = 0; h < o.length; h++)
        o[h](n);
    };
    document.addEventListener(t, s), this._evHandlers[t] = s;
  }
  /**
   * Removes an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  remove(t, e) {
    this.handlers[t].splice(this.handlers[t].indexOf(e), 1), this.handlers[t].length || this.dispose(t);
  }
  /**
   * Removes all eventlisteners of an event.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  disposeEvent(t) {
    document.removeEventListener(t, this._evHandlers[t]), delete this.handlers[t], delete this._evHandlers[t];
  }
  /**
   * Clears all eventlisteners of every event registered.
   */
  clear() {
    for (var t in this.handlers)
      this.dispose(t);
  }
  /* 
  Donno why this is here,but i do know past me has a reason for this being here.
  Ill leave it for now.
  */
  init() {
  }
}
function xe(r) {
  let t, e;
  for (let s = 0; s < r.length; s++)
    t = r[s].bodyA.entity.getHandler("collision"), e = r[s].bodyB.entity.getHandler("collision"), t && t(
      r[s].bodyA.entity,
      r[s].bodyB.entity,
      r[s]
    ), e && e(
      r[s].bodyB.entity,
      r[s].bodyA.entity,
      r[s]
    );
}
function we(r) {
  let t, e;
  for (let s = 0; s < r.length; s++)
    t = r[s].a.entity.getHandler("precollision"), e = r[s].b.entity.getHandler("precollision"), t && t(
      r[s].a.entity,
      r[s].b.entity,
      r[s]
    ), e && e(
      r[s].b.entity,
      r[s].a.entity,
      r[s]
    );
}
const Qe = {
  COLLISION: "collision",
  PRECOLLISION: "precollision",
  PREUPDATE: "preupdate",
  POSTUPDATE: "postupdate",
  UPDATE: "postupdate",
  INITIALIZE: "init",
  ADD: "add",
  REMOVE: "remove",
  PAUSE: "pause",
  PLAY: "play"
};
class be {
  constructor(t) {
    a(this, "_onDown", (t) => {
      let e = this.normalize(t.code);
      this.keys[e] = !0, this.activeKeys.push(e), this.ondown(t);
    });
    a(this, "_onUp", (t) => {
      this.keys[this.normalize(t.code)] = !1, this.onup(t);
    });
    this.keys = {}, this.activeKeys = [], this.init(t);
  }
  normalize(t) {
    let e = t;
    return t.includes("Key") && (e = e.slice(3, e.length)), e.toUpperCase();
  }
  init(t) {
    t.add("keydown", this._onDown), t.add("keyup", this._onUp);
  }
  ondown(t) {
  }
  onup(t) {
  }
}
class Se {
  constructor(t) {
    a(this, "_onClick", (t) => {
      ++this.clickCount, this.onclick(t);
    });
    a(this, "_onMove", (t) => {
      this.position.x = t.clientX, this.position.y = t.clientY, this.lastPosition.x === void 0 && (this.lastPosition = { ...this.position }), this.delta.x = this.position.x - this.lastPosition.x, this.delta.y = this.position.y - this.lastPosition.y, this.dragging = !!(this.leftbutton || this.rightbutton), this.dragging || (this.dragLastPosition.x = t.clientX, this.dragLastPosition.y = t.clientY), this.onmove(t);
    });
    a(this, "_onDown", (t) => {
      switch (t.button) {
        case 0:
          this.leftbutton = !0;
          break;
        case 2:
          this.rightbutton = !0;
          break;
      }
      this.ondown(t);
    });
    a(this, "_onUp", (t) => {
      switch (t.button) {
        case 0:
          this.leftbutton = !1;
          break;
        case 2:
          this.rightbutton = !1;
          break;
      }
      this.onup(t);
    });
    a(this, "_onWheel", (t) => {
      this.onwheel(t);
    });
    a(this, "_onContextMenu", (t) => {
      t.preventDefault(), this.oncontextmenu(t);
    });
    this.clickCount = 0, this.dragging = !1, this.dragLastPosition = {}, this.delta = {}, this.position = {}, this.lastPosition = { x: 0, y: 0 }, this.leftbutton = null, this.rightbutton = null, this.init(t);
  }
  /**
   * Checks to see if the vector provided is
   * within a dragbox if mouse is being dragged with a right or left button down
   * @param {Vector} pos an object containing x and y coordinates to be checked
   * 
  */
  inDragBox(t) {
    return !(!this.dragging || t.x > this.dragLastPosition.x && t.x < this.position.x && t.y > this.dragLastPosition.y && t.y < this.position.y);
  }
  /**
   * Initializes the mouse by appending to the DOM
   * 
   * @private
  */
  init(t) {
    t.add("click", this._onClick), t.add("mousedown", this._onDown), t.add("mouseup", this._onUp), t.add("mousewheel", this._onWheel), t.add("mousemove", this._onMove), t.add("contextmenu", this._onContextMenu);
  }
  onmove(t) {
  }
  onclick(t) {
  }
  ondown(t) {
  }
  onup(t) {
  }
  onwheel(t) {
  }
  oncontextmenu(t) {
  }
  update() {
    this.lastPosition = { ...this.position };
  }
}
class Ae {
  constructor(t) {
    a(this, "_onMove", (t) => {
      t.preventDefault(), this.onmove(t);
    });
    a(this, "_onDown", (t) => {
      this.touches = t.touches, this.ondown(t);
    });
    a(this, "_onUp", (t) => {
      this.touches = t.touches, this.onup(t);
    });
    this.clickCount = 0, this.touches = [], this.init(t);
  }
  inDragBox(t) {
    return !(t.x > this.dragLastPosition.x && t.x < this.dragLastPosition.x + this.position.x && t.y > this.dragLastPosition.y && t.y < this.dragLastPosition.y + this.position.y);
  }
  init(t) {
    t.add("touchstart", this._onDown), t.add("touchend", this._onUp), t.add("touchmove", this._onMove);
  }
  onmove(t) {
  }
  onclick(t) {
  }
  ondown(t) {
  }
  onup(t) {
  }
  onwheel(t) {
  }
  update() {
  }
}
class Ce {
  constructor(t) {
    this.DOMEventHandler = t || new _e(), this.mouse = new Se(this.DOMEventHandler), this.touch = new Ae(this.DOMEventHandler), this.keyboard = new be(this.DOMEventHandler);
  }
  update() {
    this.mouse.update(), this.touch.update();
  }
  dispose() {
    this.mouse.dispose(), this.keyboard.dispose(), this.touch.dispose();
  }
}
class St {
  /**
   * Creates a new instance of Manager class
   * with no Systems ,classes or entities inside it
   * 
   * @param {Object} [options] 
   * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
   * @param {Object} [options.files] This is passed onto the Loader.Please check `Loader.load()` for more information on it.
   * 
   **/
  constructor(t = {}) {
    a(this, "_rafID");
    a(this, "_classes", {});
    a(this, "_componentLists", {});
    a(this, "_systems", []);
    a(this, "_coreSystems", {
      world: null,
      renderer: null,
      input: null,
      events: null,
      audio: null
    });
    a(this, "_initialized", !1);
    a(this, "playing", !1);
    a(this, "_systemsMap", {});
    a(this, "_compMap", {});
    a(this, "clock", new wt());
    a(this, "objects", []);
    a(this, "_accumulator", 0);
    a(this, "frameRate", 0);
    a(this, "perf", {
      lastTimestamp: 0,
      total: 0
    });
    a(this, "loader", new ge());
    /**
     * @private
     */
    a(this, "_update", (t) => {
      let e = this.clock.update(t);
      if (this._accumulator < this.frameRate) {
        this._accumulator += e, this.RAF();
        return;
      }
      this._coreSystems.events && this._coreSystems.events.trigger("updateStart"), this.update(e), this._coreSystems.events && (this._coreSystems.events.trigger("update"), this._coreSystems.events.trigger("updateEnd")), this._accumulator = 0, this.RAF();
    });
    t = Object.assign({
      autoPlay: !0
    }, t), this.loader.onfinish = (e) => {
      this.init(), this.play();
    }, this.loader.loadAll(t.files);
  }
  /**
   * This initializes the manager.
   * No need to call this function directly.
   * This is called after the preloader finishes loading all its files.
   */
  init() {
    for (var t = 0; t < this.objects.length; t++)
      this.objects[t].init(this);
    this._coreSystems.events && this._coreSystems.events.trigger("init", this), this.update(0), this._initialized = !0, this.playing && this.play();
  }
  /**
   * Adds an entity to the manager and initializes it.
   * 
   * @param {Entity} The entity to add
   */
  add(t) {
    if (t.manager) {
      _.warn(`The entity with id ${t.id} has already been added to a manager.It will be ignored and not added to the manager`, t);
      return;
    }
    this.objects.push(t), t.init(this), this._coreSystems.events && this._coreSystems.events.trigger("add", t);
  }
  /**
   * This adds a component to a componentList
   * if the componentList is there else exits
   * without an error.
   * There is no need for you to use this method
   * as it is for internal use only and may change in the future 
   * 
   * @param {string} n name of the component
   * @param {object} c An object implementing Component
   */
  addComponent(t, e) {
    if (t === "body") {
      this._coreSystems.world.add(e);
      return;
    }
    if (t === "mesh") {
      this._coreSystems.renderer.add(e);
      return;
    }
    t in this._componentLists && this._componentLists[t].push(e);
  }
  /**
   * This removes a component from a componentList
   * if the componentList is there else exits
   * without an error.
   * There is no need for you to use this method
   * as it is for internal use only and may change in the future 
   * @param { string } n name of the component *
   * @param { object } c An object implementing Component interface
   */
  removeComponent(t, e) {
    if (t === "body") {
      this._coreSystems.world.remove(e);
      return;
    }
    if (t === "mesh") {
      this._coreSystems.renderer.remove(e);
      return;
    }
    t in this._componentLists && f.removeElement(this._componentLists[t], this._componentLists[t].indexOf(e));
  }
  /**
   * Removes an entity from the manager.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} The entity to remove
   */
  remove(t) {
    let e = this.objects.indexOf(t);
    t.removeComponents(), f.removeElement(this.objects, e), this._coreSystems.events && this._coreSystems.events.trigger("remove", t);
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    for (let t = this.objects.length - 1; t >= 0; t--)
      this.remove(this.objects[t]);
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
      this.playing = !0;
      return;
    }
    this.RAF(), this._coreSystems.events && this._coreSystems.events.trigger("play");
  }
  /**
   * This stops the update loop of the manager
   */
  pause() {
    if (!this._initialized) {
      this.playing = !1;
      return;
    }
    cancelAnimationFrame(this._rafID), this._coreSystems.events && this._coreSystems.events.trigger("pause");
  }
  /**
   * This method might be useless as systems are initialized on being added
   * 
   * @private 
   */
  initSystems() {
    for (var t = 0; t < this._systems.length; t++)
      for (var e = 0; e < this._systems[t].length; e++)
        this._systems[t][e].init(this);
  }
  /**
   * Marches the update loop forward,updating
   * the systems
   * You shouldn't mess with this/call it or everything will explode with undetectable errors.
   * 
   * @private
   */
  update(t = 0.016) {
    let e = this._coreSystems.world, s = this._coreSystems.renderer, n = this._coreSystems.events, o = this._coreSystems.input, h = performance.now();
    s && s.clear();
    for (var l = 0; l < this._systems.length; l++)
      this._systems[l].update(t);
    o && o.update(), e && e.update(t), s && s.update(t), e && n && (n.trigger("precollision", e.contactList), n.trigger("collision", e.CLMDs)), this.perf.total = performance.now() - h;
  }
  /**
   * This registers a class into the manager so that ot can be used in cloning an entity.
   * 
   * @param {function} obj The class or constructor function to register
   * @param {boolean} override Whether to override an existing class
   */
  registerClass(t, e = !1) {
    let s = t.name.toLowerCase();
    if (s in this._classes && !e)
      return _.warn(`The class \`${t.name}\` is already registered.Set the second parameter of \`Manager.registerClass()\` to true if you wish to override the set class`);
    this._classes[s] = t;
  }
  /**
   * Used to register a system
   * 
   * @param {string} n The name for the system
   * @param {Object} sys The system to be addad
   * 
   * @param {string} [cn=n] The componentList name that the system will primarily take care of
   */
  registerSystem(t, e, s = t) {
    if (e.init && e.init(this), this._systemsMap[t] === void 0)
      switch (t) {
        case "events":
          this._coreSystems.events = e;
          break;
        case "world":
          this._coreSystems.world = e;
          break;
        case "renderer":
          this._coreSystems.renderer = e;
          break;
        case "input":
          this._coreSystems.input = e;
          break;
        default:
          this._systemsMap[t] = this._systems.length, this._systems.push(e), this._compMap[s] = t;
      }
  }
  /**
   * Gets the named system
   * 
   * @param {} n the name the system was registered with.
   * 
   * @return {System}
  */
  getSystem(t) {
    return t in this._coreSystems ? this._coreSystems[t] : this._systems[this._systemsMap[t]];
  }
  /**
   * Removes a system from the manager.
   * 
   * @param {string} n The name of the system.
   * 
   */
  unregisterSystem(t) {
    if (t in this._coreSystems)
      return this._systems[this._systemsMap[t]] = null;
    delete this._systems[this._systemsMap[t]], delete this._systemsMap[t];
  }
  /**
   * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
   * 
   * @param {string} n The name of the components to store into the created componentlist
   * @param {[]} [arr=[]] A reference to the array to store components in.
   */
  setComponentList(t, e = []) {
    this._componentLists[t] = e;
  }
  /**
   * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
   * 
   * @param {string} n The name of the components to store into the created componentlist
   * @returns {Array} An array of components
   */
  getComponentList(t) {
    return this._componentList[t];
  }
  /**
   * Finds the first entity with all the components and returns it.
   * 
   * @param {Array<String>} comps An array containing the component names to be searched
   * @param {[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
   * 
   * @returns {Entity} 
   */
  getEntityByComponents(t, e = this.objects) {
    for (let s = 0; s < e.length; s++)
      for (let n = 0; n < t.length; n++)
        if (e[s].has(t[n]))
          return e[s];
  }
  /**
   * Finds the first entity with all the tag and returns it.
   * 
   * @param {Array<String>} comps An array containing the component names to be searched
   * @param {[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
   * 
   * @returns {Array<Entity>} 
   */
  getEntitiesByComponents(t, e = this.objects, s = []) {
    for (let n = 0; n < e.length; n++)
      for (let o = 0; o < t.length; o++)
        e[n].has(t[o]) && s.push(e[n]);
    return s;
  }
  /**
   * Finds the first entity with all the tag and returns it.
   * 
   * @param {Array<String>} tags An array containing the tags to be searched
   * @param {[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
   * 
   * @returns {Entity} 
   */
  getEntityByTags(t, e = this.objects) {
    for (let s = 0; s < e.length; s++)
      for (let n = 0; n < t.length; n++)
        if (e[s].hasTag(t[n]))
          return e[s];
  }
  /**
   * Finds the entities with all the tag and returns them in an array.
   * 
   * @param {Array<String>} tags An array containing the tags to be searched
   * @param {[]} [entities = Manager#objects] The array of entities to search in. Defaults to the manager's entity list
   * 
   * @returns {Array<Entity>} 
   */
  getEntitiesByTags(t, e = this.objects, s = []) {
    for (let n = 0; n < e.length; n++)
      for (let o = 0; o < t.length; o++)
        e[n].hasTag(t[o]) && s.push(e[n]);
  }
  /**
   * Ignore this,im going to remove it and the rest of cloning utilities.
   * @private
   * @deprecated
   */
  infertype(t) {
    let e = t.CHOAS_CLASSNAME;
    if (e) {
      if (e in this._classes)
        return new this._classes[e]();
      _.throw(`Class \`${e}\` is not registered in the manager thus cannot be used in cloning.Use \`Manager.registerClass\` to register it into this manager.`);
    }
    return t instanceof Array ? [] : {};
  }
  /**
   * Deep copies an entity
   * 
   * @deprecated
   * @returns {Entity}
   */
  clone(t) {
    if (typeof t != "object")
      return t;
    let e = this.infertype(t);
    for (var s in t)
      e[s] = this.clone(t[s]);
    return e;
  }
  /**
   * Creates a system that allows you to use the `Component.update` method for the given componentList whose name is given.
   * 
   * @param {string} n The name of componentList this system is taking care of.
   * 
   * @returns {System}
   */
  static DefaultSystem(t) {
    return {
      init(e) {
        e.setComponentList(t);
      },
      update(e) {
        let s = manager.getComponentList(t);
        for (let n = 0; n < s.length; n++)
          s[n].update(e);
      }
    };
  }
  /**
   * Creates manager with the renderer,world,input and event systems registered to avoid much boiler code
   * 
   * This function might be deprecated later on.
   * 
   * @params {Object} options Passed onto the first parameter of the Manager's constructor
   * 
   * @returns {Manager} 
   */
  static Default(t) {
    let e = new ve(), s = new St(t), n = new ye(), o = new me(), h = new Ce();
    return e.add("collision", xe), e.add("precollision", we), s.registerSystem("input", h), s.registerSystem("events", e), s.registerSystem("world", o), s.registerSystem("renderer", n), s;
  }
}
class D {
  constructor() {
    a(this, "_position", new c());
    a(this, "_orientation", new E());
    a(this, "scale", new c(1, 1));
    a(this, "_children", []);
    a(this, "parent", null);
  }
  get angle() {
    return this._orientation.radian * 180 / Math.PI;
  }
  set angle(t) {
    this._orientation.degree = t;
  }
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copy(t);
  }
  get orientation() {
    return this._orientation;
  }
  set orientation(t) {
    this._orientation.copy(t);
  }
  draw(t) {
    t.circle(0, 0, 10);
  }
  update(t, e) {
    let s = this._position.x, n = this._position.y;
    t.begin(), t.translate(s, n), t.rotate(this._orientation.radian), t.scale(this.scale), this.draw(t, e), t.close(), t.reset();
  }
  init(t) {
    this.entity = t, this.requires("transform");
    let e = t.get("transform");
    this._position = e.position, this._orientation = e.orientation, this.bounds = parent.bounds;
  }
  add(t) {
    this._children.push(t);
  }
  remove(t, e = !1, s) {
    let n = s ?? this._children.indexOf(t);
    if (n !== -1)
      return f.removeElement(this._children, n), !0;
    if (!e)
      return !1;
    for (var o = 0; o < this._children.length; o++)
      if (this._children[o].remove(t, e, s))
        return !0;
    return !1;
  }
}
f.inheritComponent(D);
let tt = new c();
class ti extends D {
  constructor(e = {}) {
    super();
    a(this, "drawVelocity", !1);
    a(this, "drawBounds", !1);
    this.drawVelocity = e.drawVelocity || !1, this.drawBounds = e.drawBounds || !1;
  }
  update(e, s) {
    if (this.body.physicsType == A.COMPOSITE)
      for (var n = 0; n < this.body.bodies.length; n++)
        this.drawShapes(this.body.bodies[n], e);
    else
      this.drawShapes(this.body, e), this.drawVelocity == !0 && this.drawVelocity(this.body, e), this.drawBounds == !0 && this.drawBounds(this.body, e);
  }
  drawVelocity(e, s) {
    s.begin(), s.line(
      e.position.x,
      e.position.y,
      e.position.x + e.velocity.x,
      e.position.y + e.velocity.y
    ), s.stroke("cyan"), s.close;
  }
  drawBounds(e, s) {
    s.begin(), s.rect(
      e.bounds.min.x,
      e.bounds.min.y,
      e.bounds.max.x - this.body.bounds.min.x,
      e.bounds.max.y - this.body.bounds.min.y
    ), s.stroke("red"), s.close();
  }
  drawShapes(e, s) {
    s.begin();
    for (var n = 0; n < e.shapes.length; n++) {
      let o = e.shapes[n];
      o.type == k.CIRCLE ? (s.circle(
        o.position.x,
        o.position.y,
        o.radius
      ), c.fromRad(o.angle, tt).multiply(o.radius), s.line(
        ...o.position,
        o.position.x + tt.x,
        o.position.y + tt.y
      )) : s.vertices(o.vertices, !0);
    }
    s.stroke(), s.close();
  }
  init(e) {
    this.body = e.get("body"), super.init(e);
  }
}
class ei extends D {
  constructor(t) {
    super(), this.manager = t, this.count = 25, this.now = 0, this.lastPerf = {}, this.drawBounds = !1;
  }
  update(t, e) {
    var p, m, d;
    this.now++;
    let s = this.manager.getSystem("renderer"), n = this.manager.getSystem("world"), o = (p = n == null ? void 0 : n.perf) == null ? void 0 : p.total, h = (m = s == null ? void 0 : s.perf) == null ? void 0 : m.total, l = 1 / e;
    this.now > this.count && (this.lastPerf.rate = R(l, 2), this.lastPerf.actual = R(1 / (h + o) * 1e3, 2), this.lastPerf.phy = R(o, 2), this.lastPerf.ren = R(h, 2), this.lastPerf.tot = R(this.manager.perf.total, 2), this.now = 0), t.begin(), t.translate(s.width - 80, 80), t.fill("cyan"), t.fillText(this.lastPerf.actual + "afps", 0, -20), t.fillText("render: " + this.lastPerf.ren + "ms", 0, 0), t.fillText("physics: " + this.lastPerf.phy + "ms", 0, 10), t.fillText("total: " + this.lastPerf.tot + "ms", 0, 20), t.fillText(`bodies: ${(d = n == null ? void 0 : n.objects) == null ? void 0 : d.length}`, 0, 30), this.lastPerf.rate > 59 ? t.fill("cyan") : this.lastPerf.rate > 29 ? t.fill("orange") : this.lastPerf.rate <= 29 && t.fill("red"), t.fillText(this.lastPerf.rate + "fps", 0, -30), t.close(), t.translate(-s.width + 80, -80);
  }
}
class ii extends D {
  constructor(e, s, n) {
    super();
    a(this, "_index", 0);
    a(this, "_maxFrame", 0);
    a(this, "_frame", 0);
    a(this, "_accumulator", 0);
    a(this, "_dt", 0);
    a(this, "frameRate", 1 / 60);
    a(this, "_maxFrames", null);
    a(this, "width", 0);
    a(this, "height", 0);
    a(this, "frameWidth", 0);
    a(this, "frameHeight", 0);
    this.img = e, this._maxFrame = (s || 1) - 1, e.onload = () => {
      this.width = e.width, this.height = e.height, this.frameWidth = e.width / (s || 1), this.frameHeight = e.height / (n || 1);
    }, this.width = 0, this.height = 0, this.frameWidth = 0, this.frameHeight = 0;
  }
  setMaxFrames(...e) {
    this._maxFrames = e;
  }
  setIndex(e) {
    this._maxFrame = this._maxFrames[e], this._index = e, this._frame = 0;
  }
  /**
   * @param {Renderer} ctx
   */
  draw(e) {
    e.drawImage(
      this.img,
      -this.frameWidth / 2,
      -this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index
    );
  }
  update(e, s) {
    super.update(e, s), this._accumulator += s, !(this._accumulator < this._frameRate) && (this._accumulator = 0, this._frame += 1, this._frame > this._maxFrame && (this._frame = 0));
  }
}
class si extends D {
  constructor(t, e, s) {
    super(), this.img = t, t.onload = () => {
      this.width = t.width, this.height = t.height;
    }, this.width = 0, this.height = 0, this.frameWidth = 0, this.frameHeight = 0;
  }
  /**
   * @param {Renderer} ctx
   */
  draw(t) {
    t.drawImage(
      this.img,
      -this.frameWidth / 2,
      -this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index
    );
  }
  update(t, e) {
    super.update(t, e), this._accumulator += e, !(this._accumulator < this._frameRate) && (this._accumulator = 0, this._frame += 1, this._frame > this._maxFrame && (this._frame = 0));
  }
}
let Pe = new c();
class Te {
  constructor(t, e, s = 5) {
    this.position = t, this.active = !0, this.velocity = new c(), this.radius = e, this.color = {
      r: 100,
      g: 255,
      b: 255,
      a: 1
    }, this.lifespan = s, this._life = 0;
  }
  draw(t) {
    t.begin(), t.circle(...this.position, this.radius), t.fill(`rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`), t.close();
  }
  update(t, e) {
    this._life += e, this.position.add(Pe.copy(this.velocity).multiply(e)), this.active = this._life < this.lifespan;
  }
  init() {
  }
}
class ni extends D {
  constructor(t = 1, e = 100, s = 5) {
    super(), this.initial = t, this.frameIncrease = s, this.max = e;
  }
  initParticles(t) {
    for (var e = 0; e < t; e++)
      this.add(this.create());
  }
  create() {
    return new Te(
      new c(...this.position),
      $(1, 10),
      $(1, 6)
    );
  }
  init(t) {
    super.init(t), this.initParticles(this.initial);
  }
  behavior(t) {
    t.velocity.set(
      t.velocity.x + $(-1, 1),
      t.velocity.y + $(0, 0.3)
    );
  }
  update(t, e) {
    for (let s = this._children.length - 1; s > 0; s--) {
      let n = this._children[s];
      n.update(t, e), this.behavior(n), n.draw(t, e), n.active || this.remove(s);
    }
    this._children.length < this.max && this.initParticles(this.frameIncrease);
  }
  remove(t) {
    this._children.splice(t, 1);
  }
  add(t) {
    this._children.push(t);
  }
}
class ri {
  constructor(t) {
    a(this, "speed", 1);
    this.img = t;
  }
  draw(t, e, s) {
    t.drawImage(this.img, e, s);
  }
  update(t, e) {
  }
}
class oi {
  constructor(...t) {
    this.layers = t || [];
  }
  update(t, e) {
    this.layers.forEach((s) => {
      s.draw(t, e);
    });
  }
}
class At {
  constructor() {
    a(this, "_components", {});
    a(this, "_handlers", {});
    a(this, "_tags", /* @__PURE__ */ new Set());
    a(this, "_global", null);
    a(this, "active", !1);
  }
  get CHAOS_OBJ_TYPE() {
    return "entity";
  }
  get CHAOS_CLASSNAME() {
    return this.constructor.name.toLowerCase();
  }
  /**
   * Removes all components and handlers from an entity while removing it from its manager
   */
  destroy() {
    this.removeSelf();
    for (let t in this._components) {
      let e = this._components[t];
      e.destroy && e.destroy(), delete this._components[t];
    }
    for (let t in this._handlers)
      delete this._handlers[t];
  }
  /**
   * Removes an entity and its components from its manager whilst retaining its components and handlers
   */
  removeSelf() {
    this._global && this._global.remove(this), this.active = !1, this._global = null;
  }
  /**
   * Removes all components of an entity from its manager but keeps the entity inside the manager.
   * This is an internal function so no need on your part to use it.
   */
  removeComponents() {
    if (this._global !== void 0)
      for (var t in this._components)
        this._global.removeComponent(t, this._components[t]);
  }
  /**
   * Gets the current manager of an entity
   * 
   * @returns {Manager}
   * @readonly
   */
  get manager() {
    return this._global;
  }
  /**
   * Adds a component into an entity
   * 
   * @param {String} n Name of the component.
   * @param {Component} c The component to add.
   * 
   * @returns {this}
   */
  attach(t, e) {
    return this._components[t] = e, this.manager && (e.init(this), this._global.addComponent(t, e)), this;
  }
  /**
   * Removes a component from an entity.
   * 
   * @param {String} n Name pf the component
   * @rerurns {this}
   */
  remove(t) {
    return this._global.removeComponent(t, this._components[t]), delete this._components[t], this;
  }
  /**
   * Registers a function to handle a named event.
   * 
   * @param {string} n Name of the event
   * @param {function} h The function to be called when an event is fired.
   */
  register(t, e) {
    this._handlers[t] = e;
  }
  /**
   * Removes an event handler function of the given name
   * 
   * @param {string} n Name of the event
   */
  unregister(t) {
    t in this._handlers && delete this._handlers[t];
  }
  /**
   * Returns an event handler which can be fired during an event
   * 
   * @param {string} n Name of the event
   * @returns {function | undefined}
   */
  getHandler(t) {
    return this._handlers[t];
  }
  /**
   * Returns the named component.
   * 
   * @param {string} n Name of the component.
   * @returns {Component | undefined }
   */
  get(t) {
    return this._components[t];
  }
  /**
   * Used to check if the component exists in an entity
   * 
   * @param {string} n Name of the component.
   * @returns {boolean}
   */
  has(t) {
    return t in this._components;
  }
  /**
   * Adds a tag into an entity.
   * 
   * @param {string} n The tag to be added
   */
  addTag(t) {
    this._tags.add(t);
  }
  /**
   * Removes a tag from an entity.
   * 
   * @param {string} n The tag to be added
   */
  removeTag(t) {
    this._tags.delete(t);
  }
  /**
   * Checks if a tag exists in an entity.
   * 
   * @param {string} n The tag to be added
   * @returns {boolean}
   */
  hasTag(t) {
    return this._tags.has(t);
  }
  /**
   * Initializes the components within an entity and marks it as active.
   * It is called by an instance of a game manager so no need to call it manually
   * 
   * @private
   * @param {Manager} global
   */
  init(t) {
    this._global = t, this.active = !0;
    for (let e in this._components)
      this._components[e].init(this), t.addComponent(e, this._components[e]);
  }
  /**
   * A helper function to create a new Entity with transform,movable and bounds components.
   * 
   * @returns {Entity}
   */
  static Default(t, e, s) {
    return new At().attach("transform", new Me(t, e, s)).attach("movable", new Ee()).attach("bounds", new L());
  }
  /**
   * Search an entity's manager for entities in a given bound.
   * 
   * @param {Object} bound the region to search entitities in.
   * @param {[]} [target=[]] An array to store results in.
   * @returns {array<Entity>}
   */
  query(t, e = []) {
    return this._global.query(t, e);
  }
}
class Me {
  constructor(t, e, s) {
    this.position = new c(t, e), this.orientation = new E(s);
  }
  init() {
  }
}
class Ee extends it {
  constructor(t, e, s) {
    super(), this.velocity = new c(t, e), this.rotation = new E(s), this.acceleration = new c();
  }
}
class yt {
  /**
   * 
   * @param {AudioContext} context 
   * @param {AudioBuffer} buffer
   */
  constructor(t, e) {
    this.buffer = t.ctx.createBufferSource(), this.buffer.buffer = e, this.finished = !1, this.id = -1;
    let s = this;
    this.buffer.onended = () => {
      t.remove(s.id), s.finished = !0;
    };
  }
  play(t = 0, e = 0, s = !1) {
    this.buffer.start(e, t), this.buffer.loop = s;
  }
  disconnect() {
    this.buffer.disconnect();
  }
  connect(t) {
    this.buffer.connect(t);
  }
}
class ai {
  constructor() {
    a(this, "ctx", new AudioContext());
    a(this, "sfx", {});
    a(this, "_backname", "");
    a(this, "_background", null);
    a(this, "playing", []);
    a(this, "toplay", {});
    a(this, "baseUrl", "");
    a(this, "_mute", 1);
    this.toplay = {}, this.gainNodes = [this.ctx.createGain()], this.gainNodes[0].connect(this.ctx.destination), this.canPlay = this.ctx.state == "running";
    let t = this;
    window.addEventListener("pointerdown", function e() {
      t.ctx.resume(), t.ctx.state == "running" && (removeEventListener("pointerdown", e), t.canPlay = !0);
    });
  }
  /**
   * 
   * @param {string} src
   */
  load(t) {
    let e = t.split(".")[0];
    fetch(this.baseUrl + "/" + t).then((s) => s.arrayBuffer()).then((s) => this.ctx.decodeAudioData(s)).then((s) => {
      this.sfx[e] = s, this._backname == e && this.playMusic(e);
    }).catch((s) => console.log(s));
  }
  playMusic(t) {
    this._backname = t, t in this.sfx && (this._background = new yt(this, this.sfx[t]), this._background.connect(this.gainNodes[0]), this._background.play(0, 0, !0));
  }
  playEffect(t, e = !1) {
    if (!(t in this.sfx)) {
      this.toplay[t] = this.toplay[t] || 0, this.toplay[t] = 1;
      return;
    }
    let s = new yt(this, this.sfx[t]), n = this.playing.length;
    return s.id = n, s.connect(this.gainNodes[0]), this.playing.push(s), s.play(0, 0, e), s;
  }
  playAll() {
    this.playing.forEach((t) => {
      t.play();
    });
  }
  pauseAll() {
    this.playing.forEach((t) => {
      t.stop();
    });
  }
  mute() {
    this._mute = this.gainNodes[0].gain;
  }
  unmute() {
    this.gainNodes[0].gain = this._mute;
  }
  remove(t) {
    t != -1 && (f.removeElement(this.playing, t), t < this.playing.length && (this.playing[t].id = t));
  }
}
class li {
  constructor() {
    this.objects = [];
  }
  init(t) {
    t.setComponentList("agent", this.objects);
  }
  update(t) {
    let e = 1 / t;
    for (var s = 0; s < this.objects.length; s++)
      this.objects[s].update(e);
  }
}
class ke {
  constructor() {
    this._behaviours = [], this._accumulated = new c(), this.active = !1;
  }
  add(t) {
    this._behaviours.push(t), this.active && t.init(this._agent);
  }
  remove(t) {
    f.removeElement(this._behaviours, this._behaviours.indexOf(t));
  }
  init(t) {
    this._agent = t;
    for (var e = 0; e < this._behaviours.length; e++)
      this._behaviours[e].init(t);
  }
  update(t) {
    let e = new c();
    this._accumulated.set(0, 0);
    for (let s = 0; s < this._behaviours.length; s++)
      this._behaviours[s].calc(e, t), this._accumulated.add(e);
    this._agent.acceleration.add(this._accumulated), this._agent.orientation.radian = c.toRad(this._agent.velocity);
  }
  clear() {
    f.clearArr(this._behaviours);
  }
}
class Be {
  constructor() {
    a(this, "velocity", null);
    a(this, "rotation", null);
    a(this, "maxSpeed", 20);
    a(this, "maxTurnRate", 5);
    a(this, "behaviours", new ke());
  }
  init(t) {
    this.parent = t, this.requires("transform", "movable");
    let e = this.get("movable"), s = this.get("transform");
    this.velocity = e.velocity, this.rotation = e.rotation, this.position = s.position, this.orientation = s.orientation, this.acceleration = e.acceleration, this.behaviours.init(this);
  }
  add(t) {
    this.behaviours.add(t);
  }
  remove(t) {
    this.behaviours.remove(t);
  }
  update(t) {
    this.behaviours.update(t);
  }
}
f.inheritComponent(Be);
class G {
  constructor() {
    this.active = !0;
  }
  init() {
  }
  update() {
  }
  calc() {
  }
}
let Ie = new c(), Oe = new c();
class hi extends G {
  constructor(e) {
    super();
    a(this, "maxSpeed", 800);
    a(this, "maxForce", 2e3);
    a(this, "arrive", !1);
    a(this, "arrivespeed", 1);
    a(this, "radius", 100);
    let s = e.get("transform"), n = e.get("movable");
    this.pursuerPos = s.position, this.pursuerVel = n.velocity, this.pursuerRot = n.rotation, this.pursuerOrt = s.orientation;
  }
  init(e) {
    this.pursuedPos = e.position, this.pursuedVel = e.velocity, this.pursuedPosRot = e.rotation, this.pursuedOrt = e.orientation;
  }
  calc(e, s) {
    let n = Ie.copy(this.pursuedPos).sub(this.pursuerPos), o = Oe.copy(this.pursuedVel), h = n.magnitude();
    if (h == 0 || h > this.radius)
      return;
    n.setMagnitude(xt(h, 0, this.radius, this.maxSpeed, 0));
    let l = n.sub(o).multiply(s);
    l.clamp(0, this.maxForce), e.copy(l);
  }
}
let Le = new c(), gt = new c();
class ci extends G {
  constructor() {
    super();
    a(this, "maxSpeed", 200);
    a(this, "maxForce", 100);
    a(this, "_theta", 90);
    a(this, "dtheta", 10);
    a(this, "_radius", 100);
  }
  init(e) {
    this.pos = e.position, this.vel = e.velocity, this.pursuerRot = e.rotation, this.pursuerOrt = e.orientation;
  }
  calc(e, s) {
    this._theta += $(-this.dtheta, +this.dtheta);
    let n = Le.copy(this.vel);
    n.equalsZero() && c.random(n);
    let o = this._radius * 0.8;
    n.setMagnitude(this._radius), c.fromDeg(this._theta + c.toDeg(this.vel), gt).multiply(o), n.add(gt), n.setMagnitude(this.maxSpeed), n.sub(this.vel).multiply(s).clamp(0, this.maxForce), e.copy(n);
  }
}
class ui {
  constructor() {
  }
  init() {
  }
  calc(t) {
  }
}
class pi {
  constructor() {
    this.neighbours = [];
  }
  init() {
  }
  calc(t) {
  }
}
let De = new c(), Ne = new c();
class di extends G {
  constructor(e) {
    super();
    a(this, "maxSpeed", 1e3);
    a(this, "maxForce", 2e3);
    a(this, "arrive", !1);
    a(this, "arrivespeed", 1);
    a(this, "radius", 100);
    let s = e.get("transform"), n = e.get("movable");
    this.pursuedPos = s.position, this.pursuedVel = n.velocity, this.pursuedRot = n.rotation, this.pursuedOrt = s.orientation;
  }
  init(e) {
    this.pursuerPos = e.position, this.pursuerVel = e.velocity, this.pursuerRot = e.rotation, this.pursuerOrt = e.orientation;
  }
  calc(e, s) {
    let n = De.copy(this.pursuedPos).sub(this.pursuerPos), o = Ne.copy(this.pursuerVel);
    n.setMagnitude(this.maxSpeed);
    let h = n.sub(o).multiply(s);
    h.clamp(0, this.maxForce), e.copy(h);
  }
}
let Re = new c(), Fe = new c();
class mi extends G {
  constructor(e) {
    super();
    a(this, "maxSpeed", 1e3);
    a(this, "maxForce", 2e3);
    a(this, "arrive", !1);
    a(this, "arrivespeed", 1);
    a(this, "radius", 1e3);
    let s = e.get("transform"), n = e.get("movable");
    this.pursuedPos = s.position, this.pursuedVel = n.velocity, this.pursuedRot = n.rotation, this.pursuedOrt = s.orientation;
  }
  init(e) {
    this.pursuerPos = e.position, this.pursuerVel = e.velocity, this.pursuerRot = e.rotation, this.pursuerOrt = e.orientation;
  }
  calc(e, s) {
    let n = Re.copy(this.pursuedPos).sub(this.pursuerPos), o = Fe.copy(this.pursuerVel), h = n.magnitude();
    h < this.radius ? n.setMagnitude(xt(h, 0, this.radius, 0, this.maxSpeed)) : n.setMagnitude(this.maxSpeed);
    let l = n.sub(o).multiply(s);
    l.clamp(0, this.maxForce), l.draw(ctx, ...this.pursuerPos), e.copy(l);
  }
}
const vt = {
  _pairs: null,
  split() {
    let r = document.cookie.split(";"), t = {};
    for (let e = 0; e < r.length; e++) {
      let s = r[e].split("=");
      t[s[0]] = s[1];
    }
    return t;
  },
  set(r, t, e = 12e5) {
    document.cookie = `${r}=${t};maxAge=${e}`;
  },
  get(r) {
    let t = document.cookie.split(";");
    for (var e = 0; e < t.length; e++) {
      let s = t[e].split("=");
      if (s[0].includes(r))
        return s[1];
    }
  },
  delete(r) {
    document.cookie = `${r}=; max-age=0`;
  },
  clear() {
    let r = document.cookie.split(";");
    for (var t = 0; t < r.length; t++) {
      let e = r[t].split("=");
      this.delete(e[0]);
    }
  }
};
vt._pairs = vt.split();
const fi = {
  set(r, t) {
    JSON.stringify(t), sessionStorage.setItem(r, t);
  },
  get(r) {
    let t = sessionStorage.getItem(r);
    return JSON.parse(t);
  },
  clear() {
    sessionStorage.clear();
  }
}, yi = {
  set(r, t) {
    JSON.stringify(t), localStorage.setItem(r, t);
  },
  get(r) {
    let t = localStorage.getItem(r);
    return JSON.parse(t);
  },
  clear() {
    localStorage.clear();
  }
};
export {
  st as AABB,
  L as AABBox,
  Be as Agent,
  li as AgentManager,
  E as Angle,
  mi as ArriveBehaviour,
  ai as AudioHandler,
  Je as Ball,
  G as Behaviour,
  P as Body,
  ti as BodyMesh,
  Xe as Box,
  X as Circle,
  wt as Clock,
  it as Component,
  Ft as Composite,
  bt as Constraint,
  vt as Cookies,
  B as DEVICE,
  _e as DOMEventHandler,
  ei as DebugMesh,
  Ke as DistanceConstraint,
  At as Entity,
  _ as Err,
  hi as EvadeBehaviour,
  ve as EventDispatcher,
  Qe as Events,
  pi as Flock,
  kt as Geometry,
  Ge as HeightMap,
  ii as ImageSprite,
  Ce as Input,
  be as Keyboard,
  ri as Layer,
  Lt as Line,
  ge as Loader,
  St as Manager,
  et as Matrix,
  Se as Mouse,
  Ee as Movable,
  oi as ParallaxBackground,
  Te as Particle,
  ni as ParticleSystemSprite,
  ui as Pursuit,
  K as Rectangle,
  ye as Renderer,
  di as SeekBehaviour,
  fi as Session,
  k as Shape,
  Ze as SpringConstraint,
  D as Sprite,
  si as StaticImageSprite,
  yi as Storage,
  Ae as Touch,
  Me as Transform,
  We as Triangle,
  f as Utils,
  c as Vector,
  ci as WanderBehaviour,
  me as World,
  Ye as clamp,
  xe as defaultCollisionHandler,
  we as defaultPrecollisionHandler,
  Ue as degToRad,
  He as exp,
  qe as lerp,
  xt as map,
  Mt as naturalizePair,
  ze as radToDeg,
  $ as rand,
  R as round,
  M as sq,
  Ve as sqrt
};
