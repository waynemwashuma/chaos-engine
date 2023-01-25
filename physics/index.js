import { Vector } from "/utils/Vector.js"
import { SAT, SATResponse } from "./Sat/index.js"
import { renderer } from '../render/renderer.js'
class World {
  constructor() {
    this.objects = []
    this.constraints = []
    this.friction = 0.0
    this.angularFriction = 0.00
    this.drag = 0.0
    this.collisionManifolds = []
    this.gravitationalAcceleration = new Vector(0, 0)
  }
  set gravity(x) {
    if (x instanceof Number)
      this.gravitationalAcceleration.copy(Vector.y_axis).multiply(x)
    if (x instanceof Vector)
      this.gravitationalAcceleration.copy(x)
  }
  get gravity() {
    return this.gravitationalAcceleration.magnitude()
  }
  update(dt) {
    let frameGravity = this.gravitationalAcceleration.clone().multiply(dt)
    this.constraints.forEach(constraint => {
      constraint.update(dt, frameGravity)
    })
    this.objects.forEach(object => {
      if (object.mass) object.velocity.add(frameGravity)
      object.update(dt)

    })
    for (let i = 0; i < this.objects.length; i++) {
      let object1 = this.objects[i]
      object1.angularVelocity *= 1 - this.angularFriction * dt
      object1.velocity.multiply(1 - this.friction * dt)
      for (let j = i + 1; j < this.objects.length; j++) {
        let object2 = this.objects[j]
        if (!object1.layer || !object2.layer || object1.layer === object2.layer) {} else { continue }
        let manifold = SAT.shapesInBodyCollided(object1, object2)
        if (!manifold) continue;
        object1.onCollision(object2)
        object2.onCollision(object1)
        this.collisionManifolds.push(new CollisionManifold(object1, object2, manifold, this))
      }
    }
    this.collisionManifolds.forEach(manifold => {
      manifold.resolve(dt)
    })
    this.collisionManifolds = []
  }
  add(...bodies) {
    bodies.forEach(body => {
      this.objects.push(body)
      body.init(this)
    })
  }
  remove(bodies) {
    bodies.forEach(body => {
      this.objects.splice(this.objects.indexOf(body), 1)
    })
  }
  addConstraint(constraint) {
    this.constraints.push(constraint)
  }
  query(position) {}
}
class CollisionManifold {
  constructor(body1, body2, manifold, world) {
    this.bodies = [body1, body2]
    this.manifold = manifold
    this._global = world
  }
  resolvePenetration() {
    SATResponse.applyPenetrationResolution(...this.bodies, this.manifold)
    let manifold = SAT.shapesInBodyCollided(...this.bodies)
    this._global.collisionManifolds.push(new CollisionManifold(...this.bodies, manifold, this.world))
  }
  resolveCollision() {
    let { axis, contactPoint, overlap } = this.manifold
    SATResponse.CalcSeparationVelocities(...this.bodies, axis, contactPoint)
  }
  applyContactForce(dt) {
    let [velocity1, velocity2] = SATResponse.ApplyContactForce(...this.bodies, this._global.gravitationalAcceleration, this.manifold, dt)

    //temporary fix for circle
    //if(this.bodies[0] instanceof Circle)
    //velocity1.reverse()
    //if(this.bodies[1] instanceof Circle)
    //velocity2.reverse()

    this.bodies[0].velocity.add(velocity1)
    this.bodies[1].velocity.add(velocity2)
  }
  resolve(dt) {
    this.resolvePenetration()
    this.resolveCollision()
    this.applyContactForce(dt)
  }
}
class Geometry {
  constructor(pos, vertices) {
    this.vertices = []
    vertices.forEach(vertex => {
      this.vertices.push(vertex.clone().sub(pos))
    })
    this.normals = this.calcFaceNormals()
  }
  getNormals(rad) {
    return this.normals.map(el => el.clone().rotate(rad))
  }
  calcFaceNormals() {
    const axes = [],
      { vertices } = this
    for (var i = 0; i < vertices.length; i++) {
      let axis = vertices[i >= vertices.length ? vertices.length - 1 : i]
        .clone()
        .sub(vertices[i + 1 >= vertices.length ? 0 : i + 1]).normal()
      for (var j = 0; j < axes.length; j++) {
        if (axis.equals(axes[j]) || axis.clone().reverse().equals(axes[j])) {
          axis = null
          break
        }
      }
      if (!axis) continue
      axes.push(axis)
    }
    return axes
  }
  applyRotation(rad, vertex) {
    vertex.rotate(rad)
  }
  applyScale(n = 1, vertex) {
    vertex.multiply(n)
  }
  applyReposition(pos, vertex) {
    vertex.add(pos)
  }
  loop(vertices, pos, rad, n) {
    for (let i = 0; i < vertices.length; i++) {
      let vertex = vertices[i]
      this.applyRotation(rad, vertex)
      this.applyScale(n, vertex)
      this.applyReposition(pos, vertex)
    }
    return vertices
  }
  transform(pos, rad, n) {
    let vertices = this.vertices.map(el => el.clone())
    this.loop(vertices, pos, rad, n)
    return vertices
  }
}

class Shape {
  //_mass = 0
  //inv_mass = 0
  rad = 0
  //velocity = new Vector()
  //acceleration = new Vector()
  scale = 1
  constructor(pos, vertices, mass) {
    this.position = new Vector().copy(pos)
    this.vertices = [...vertices]
    this.geometry = new Geometry(this.position, this.vertices)
  }
  getNormals() {
    return this.geometry.getNormals(this.rad)
  }
  set angle(angle) {
    this.rad = angle * Math.PI / 180
  }
  get angle() {
    return this.rad * 180 / Math.PI
  }
  //set mass(x) {
  //  this._mass = x
  //  this.inv_mass = x == 0 ? 0 : 1 / x
  //}
  //get mass() {
    //return this._mass
  //}
  drawNormals(ctx, scale = 10) {
    const { vertices } = this
    if (vertices.length < 2) return;
    let center, normal
    ctx.beginPath()
    ctx.strokeStyle = "green"
    for (var i = 0; i < vertices.length - 1; i++) {
      center = vertices[i + 1].clone().sub(vertices[i]).multiply(.5)
      normal = center.normal()
      center = vertices[i].clone().add(center)
      ctx.moveTo(center.x, center.y)
      ctx.lineTo((normal.x * scale) + center.x, (normal.y * scale) + center.y)

      ctx.stroke()
    }
    center = vertices[0].clone().sub(vertices[vertices.length - 1]).multiply(.5)
    normal = center.normal()
    center = vertices[vertices.length - 1].clone().add(center)
    ctx.moveTo(center.x, center.y)
    ctx.lineTo((normal.x * scale) + center.x, (normal.y * scale) + center.y)
    ctx.stroke()
    ctx.strokeStyle = "black"
    ctx.closePath()
  }
  draw(ctx) {
    const { vertices } = this
    ctx.beginPath()
    ctx.moveTo(vertices[0].x, vertices[0].y)
    for (var i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y)
    }
    ctx.lineTo(vertices[0].x, vertices[0].y)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = "black"
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
  updateVertices() {
    this.vertices = this.geometry.transform(this.position, this.rad, this.scale)
  }
  update() {
    this.angle = this.angle > 360 ? 360 - this.angle : this.angle
    this.updateVertices()
  }
  projectOnAxis(axis) {
    let min = Infinity,
      max = -Infinity,
      nearVertex = null
    for (let i = 0; i < this.vertices.length; i++) {
      let point = ProjectPointToAxis(this.vertices[i], axis)
      if (min > point) {
        min = point
        nearVertex = body.vertices[i]
      }
      if (max < point) {
        max = point
      }
    }
    return {
      min,
      max,
      nearVertex
    }
  }
  getNormalAxes() {
    return this.geometry.normals
  }
  getVertices() {
    return this.vertices
  }
}
class Line extends Shape {
  constructor(pos, length) {
    let start, end,angle = 0
    if (length instanceof Vector) {
      start = pos
      end = length
      let line = end.clone().sub(start)
      pos =start.clone().add(line.multiply(.5))
      line.draw(renderer.ctx,start.x,start.y)
      angle = Vector.getAbsDegBtwn(Vector.x_axis,line)
      
    } else {
      start = Vector.x_axis.multiply(length / 2).add(pos)
      end = Vector.x_axis.multiply(-length / 2).add(pos)

    }
    super(pos, [start, end])
    this.length = length
    this.type = "line"
  }
}
class Circle extends Shape {
  constructor(position, radius) {
    super(position, [])
    this.radius = radius
    this.length = radius * 2
    this.inertia = this.getInertia()
    this.type = "circle"
  }
  getInertia() {
    return this.mass * (this.radius ** 2) / 4
  }
  getVertices(axis) {
    let v1 = axis.clone().multiply(-this.radius).add(this.position)
    let v2 = axis.clone().multiply(this.radius).add(this.position)
    return [v1, v2]
  }
  getNormals(body) {
    let min = null,
      vertex = null
    for (let i = 0; i < body.vertices.length; i++) {
      let a = this.position.distanceTo(body.vertices[i])
      if (!min || min > a) {
        vertex = body.vertices[i]
        min = a
      }
    }
    if (!vertex) vertex = body.position
    return [vertex.clone().sub(this.position).normalize()]
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "black"
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
  drawNormals() {}
}
class Rectangle extends Shape {
  constructor(pos, width, height, mass) {
    let v1 = new Vector(pos.x - width / 2, pos.y - height / 2)
    let v2 = new Vector(pos.x - width / 2, pos.y + height / 2)
    let v3 = new Vector(pos.x + width / 2, pos.y + height / 2)
    let v4 = new Vector(pos.x + width / 2, pos.y - height / 2)
    super(pos, [v1, v2, v3, v4], mass)
    this.length = height
    this.width = width
    this._inertia = 12 || this.getInertia()
    this.type = "rectangle"
  }
  getInertia() {
    return this.mass * (this.length ** 2 + this.width ** 2) / 12
  }

}

class Body {
  acceleration = new Vector()
  velocity = new Vector()
  _mass = 0
  inv_mass = 0
  _inertia = 0
  inv_inertia = 0
  rad = 0
  angularVelocity = 0
  restitution = 1
  layer = 1
  constructor(position, ...components) {
    this.position = new Vector().copy(position)
    this.components = components || []
    this.offests = [];
    this.mass = 1
    this.angle = 0
    for (let i = 0; i < components.length; i++) {
      if (components[i] == undefined)
        continue
      this.offests[i] = {
        position: components[i].position.clone(),
        angle: components[i].angle
      }
    }
  }
  set angle(angle) {
    this.rad = angle * Math.PI / 180
  }
  get angle() {
    return this.rad * 180 / Math.PI
  }
  set mass(x) {
    this._mass = x
    this.inv_mass = x == 0 ? 0 : 1 / x
    this.inertia = this.getInertia()
    this.components.forEach(comp => {
      comp.mass = this.mass
    })
  }
  get mass() {
    return this._mass
  }
  set inertia(x) {
    this._inertia = x
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    return this._inertia
  }
  getInertia() {
    return this.mass
  }
  init(world) {
    this._global = world
  }
  update(dt) {
    this.velocity.add(this.acceleration.clone().multiply(dt))
    this.position.add(this.velocity.clone().multiply(dt))
    this.angle += this.angularVelocity * dt
    this.updateComponents()
  }
  updateComponents() {
    this.angle = this.angle > 360 ? 360 - this.angle : this.angle
    this.angle = this.angle < -360 ? 360 + this.angle : this.angle
    this.components.forEach((comp, i) => {
      comp.position.copy(this.position.clone().add(this.offests[i].position))
      comp.angle = this.offests[i].angle + this.angle
      comp.update()
    })
  }
  drawVelocity(ctx) {
    this.velocity.draw(ctx, this.position.x, this.position.y, "cyan")
  }
  draw(ctx) {
    this.components.forEach(component => {
      component.draw(ctx)
      //component.drawNormals(ctx)
    })
  }
  removeSelf() {
    this._global.remove(this)
    this._global = null
  }
  onCollision() {}
}
class Wall extends Body {
  constructor(x, y, l) {
    let line = new Line(new Vector(), l)
    super(new Vector(x, y), line)
    this.mass = 0
    this.layer = 0
  }
}
class HeightMap extends Body {
  constructor(step, heights) {
    let l = [],
      j = []
    for (let i = 0; i < heights.length; i++) {
      l.push(new Vector(step * i, heights[i]))
    }
    for (let i = 1; i < l.length; i++) {
      let line = new Line(l[i - 1], l[i])
      j.push(line)
    }
    super(new Vector(), ...j)
    this.mass = 0
  }
}

class Spring {
  constructor(start, end) {
    this.start = new Vector().copy(start)
    this.end = new Vector().copy(end)
  }
  attachTo(body, offset) {

  }
}
class Constraint {
  constructor(body1, body2) {
    this.bodies = [body1, body2]
    this.stiffness = 50
    this.dampening = 0.03
  }
  behavior(body1, body2) {
    body2.position.copy(body1.position)
    console.log(body2.position);
  }
  update(dt, gravity) {
    this.behavior(...this.bodies, gravity)
  }
}
class DistanceConstraint extends Constraint {
  constructor(body1, body2, offset) {
    super(body1, body2)
    this.offset = offset
    this.maxDistance = 0
    this.distance = 0
  }
  behavior(body1, body2, gravity) {
    let offset = this.offset.clone().rotate(body1.rad)
    let pos = body1.position.clone().add(offset)
    let dist = pos.clone().sub(body2.position)

    let collisionArm1 = pos.clone().sub(body1.position)
    let collisionArm2 = pos.clone().sub(body2.position)

    let diff = dist.clone().divide(body1.inv_mass + body2.inv_mass)

    let vel1 = diff.clone().multiply(-body1.inv_mass * this.stiffness).sub(body1.velocity.clone().multiply(this.dampening))
    let vel2 = diff.multiply(this.stiffness * body2.inv_mass).sub(body2.velocity.clone().multiply(this.dampening))

    body1.velocity.add(vel1)
    body2.velocity.add(vel2)

    body1.angularVelocity -= vel1.cross(collisionArm1)* body1.inv_inertia + body1.angularVelocity * this.dampening
    body2.angularVelocity += vel2.cross(collisionArm2) * body2.inv_inertia - body2.angularVelocity *this.dampening

    body1.velocity.add(gravity)
    body2.velocity.add(gravity)

    this.distance = dist
    //pos.draw(renderer.ctx)
  }
}
class AngleConstraint extends Constraint {
  constructor(body1, body2, rotationCenter) {
    super(body1, body2)
    this.center = new Vector().copy(rotationCenter)
    this.arms = [body1.position.clone().sub(this.center), body2.position.clone().sub(this.center)]
    this.angle = Vector.getAbsDegBtwn(this.arms[0], this.arms[1])
  }
  behavior(body1, body2) {
    let [arm1, arm2] = this.arms
    arm1.draw(renderer.ctx, this.center.x, this.center.y)
    arm2.draw(renderer.ctx, this.center.x, this.center.y, "blue")

  }
}

function createBoundingBox(x, y, w, h) {
  let l1 = new Wall(x + w / 2, y, w)
  let l2 = new Wall(x + w, y + h / 2, h)
  let l3 = new Wall(x + w / 2, y + h, w)
  let l4 = new Wall(x, y + h / 2, h)
  l2.angle = 90
  l4.angle = 90
  return [l1, l2, l3, l4]
}

export {
  Body,
  World,
  Shape,
  Line,
  Circle,
  Rectangle,
  Geometry,
  Wall,
  createBoundingBox,
  Constraint,
  DistanceConstraint,
  AngleConstraint,
  HeightMap,
  Spring
}