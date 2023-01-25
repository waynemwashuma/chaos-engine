import{CollisionManifold} from "../utils/collisionManifold.js"
import {Vector} from "/utils/vector.js"
import { SAT } from "../SAT/index.js";
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
    if (x instanceof Vector)
      return this.gravitationalAcceleration.copy(x)
      this.gravitationalAcceleration.copy(Vector.y_axis).multiply(x)
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

export{
  World
}