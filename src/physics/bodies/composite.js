import { Vector }from "../../math/index.js"
import {Utils} from  "../../utils/index.js"
import { ObjType } from "../settings.js"


class Composite {
  entity = null
  constructor() {
    this.bodies = []
    this.constraints = []
  }
  get physicsType() {
    return ObjType.COMPOSITE
  }
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity, true)
    })
    this.requires("transform")

  }
  add(object) {
    if (object.physicsType === ObjType.CONSTRAINT)
      return this.constraints.push(object)
    if (object.physicsType === ObjType.BODY)
      this.bodies.push(object)
  }
  update() {
    this.lastPosition.copy(this.position)
  }

  get acceleration() {
    let acceleration= new Vector()
    for (var i = 0; i < this.bodies.length; i++) {
      acceleration.copy(this.bodies[i].acceleration)
    }
    return acceleration.divide(this.bodies.length)
  }
  set acceleration(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].acceleration = x
    }
  }
  get velocity() {
    let velocity = new Vector()
    
    for (var i = 0; i < this.bodies.length; i++) {
      velocity.add(this.bodies[i].velocity)
    }
    return velocity.divide(this.bodies.length)
  }
  set velocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].velocity.copy(x)
    }
  }

  set angle(angle) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angle = x
    }
  }
  get angle() {
    let angle = 0
    for (var i = 0; i < this.bodies.length; i++) {
      angle += this.bodies[i].angle
    }
  }
  set mass(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].mass = x
    }
  }
  get mass() {
    let mass = 0
    for (var i = 0; i < this.bodies.length; i++) {
      mass += this.bodies[i].mass
    }
    return mass
  }
  set density(x) {
    let area = 0
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].density = x
    }
  }
  get density() {
    let density = 0
    for (var i = 0; i < this.bodies.length; i++) {
      density += this.bodies[i].density
    }
    return density / this.bodies.length
  }
  get position() {
    let position = new Vector()
    for (var i = 0; i < this.shapes.length; i++) {
      position.add(this.bodies[i].position)
    }
    return position
  }
  set position(x) {
    let dp = x.clone().sub(this.position)
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].position.add(dp)
    }
  }
  set orientation(r) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].orientation.copy(r)
    }
  }
  get angularVelocity() {
    let ang = 0
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].angularVelocity
    }
    return ang
  }
  set angularVelocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angularVelocity = x
    }
  }
}
Utils.inheritComponent(Composite)
export {
  Composite
}