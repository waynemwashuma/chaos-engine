import { CollisionManifold } from "../utils/collisionManifold.js"
import { VerletSolver } from "../integrators/index.js";
import { PenetrationSolver, FrictionSolver, ImpulseSolver, ContactSolver } from "../solvers/index.js";
import { Vector } from "../../utils/index.js"
import { SAT } from "../SAT/index.js";
import { EventDispatcher } from "../../inputs/index.js"
class World {
  constructor() {
    this.objects = []
    this.constraints = []
    this.linearDamping = 0.001
    this.angularDamping = 0.001
    //collision manifolds
    this.CLMDs = []
    this.contactList = []
    this.gravitationalAcceleration = new Vector(0, 0)
    this.eventDispatcher = new EventDispatcher()
  }
  set gravity(x) {
    if (typeof x === "object")
      return this.gravitationalAcceleration.copy(x)
    this.gravitationalAcceleration.set(0, x)
  }
  get gravity() {
    return this.gravitationalAcceleration.magnitude()
  }
  narrowPhase() {
    for (var i = 0; i < this.contactList.length; i++) {
      let { a, b } = this.contactList[i]
      if (a.components.length == 0 || b.components.length == 0)
        continue
      if (!a.mass && !b.mass)
        continue
      if (!this.layer(a, b)) continue
      if (a.sleeping && b.sleeping)
        continue
      if (object1.sleeping && object1.mass)
        object1.sleeping = false
      if (object2.sleeping && object2.mass)
        object2.sleeping = false

      let collisionData = SAT.shapesInBodyCollided(object1, object2)

      if (!collisionData) continue

      let ca1 = collisionData.contactPoint.clone().sub(object1.position)
      let ca2 = collisionData.contactPoint.clone().sub(object2.position)
      let manifold = new CollisionManifold(object1, object2, collisionData, ca1, ca2)
      manifold.restitution = object1.restitution < object2.restitution ? object1.restitution : object2.restitution
      manifold.staticFriction = object1.staticFriction < object2.staticFriction ? object1.staticFriction : object2.staticFriction
      manifold.kineticFriction = object1.kineticFriction < object2.kineticFriction ? object1.kineticFriction : object2.kineticFriction
      manifold.collide = object1.collisionResponse && object2.collisionResponse
      manifold.penerate = object1.collisionPenetration && object2.collisionPenetration
      this.CLMDs.push(manifold)
      this.eventDispatcher.emit("collision", manifold, CollisionDOMEventHandler)
    }
  }
  broadPhase() {
    this.contactList = []
    for (let i = 0; i < length; i++) {
      let object1 = this.objects[i]
      for (let j = i + 1; j < length; j++) {
        let object2 = this.objects[j]
        if (object1.bounds.intersects(object2.bounds)) {
          this.contactList.push({
            a: object1,
            b: object2
          })
        }
      }
    }
  }
  collisionDetection2(){
    this.broadPhase()
    this.narrowPhase()
  }
  collisionDetection(length) {
    for (let i = 0; i < length; i++) {
      let object1 = this.objects[i]
      for (let j = i + 1; j < length; j++) {
        let object2 = this.objects[j]

        if (!object1.components.length || !object2.components.length)
          continue
        if (!object1.mass && !object2.mass)
          continue
        if (!this.layer(object1, object2)) continue
        if (object1.sleeping && object2.sleeping)
          continue
        if (object1.sleeping && object1.mass)
          object1.sleeping = false
        if (object2.sleeping && object2.mass)
          object2.sleeping = false

        let collisionData = SAT.shapesInBodyCollided(object1, object2)

        if (!collisionData) continue

        let ca1 = collisionData.contactPoint.clone().sub(object1.position)
        let ca2 = collisionData.contactPoint.clone().sub(object2.position)
        let manifold = new CollisionManifold(object1, object2, collisionData, ca1, ca2)
        manifold.restitution = object1.restitution < object2.restitution ? object1.restitution : object2.restitution
        manifold.staticFriction = object1.staticFriction < object2.staticFriction ? object1.staticFriction : object2.staticFriction
        manifold.kineticFriction = object1.kineticFriction < object2.kineticFriction ? object1.kineticFriction : object2.kineticFriction
        manifold.collide = object1.collisionResponse && object2.collisionResponse
        manifold.penerate = object1.collisionPenetration && object2.collisionPenetration
        this.CLMDs.push(manifold)
      }
    }
  }
  collisionResponse() {
    let length = this.CLMDs.length
    for (var i = 0; i < length; i++) {
      let manifold = this.CLMDs[i]
      if (!manifold.penerate)
        return
      PenetrationSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.manifold
      )
      if (!manifold.collide)
        return

      let r = ImpulseSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.manifold.axis,
        manifold.ca1,
        manifold.ca2,
        manifold.restitution
      )
      manifold.impulse = r
    }
    for (var i = 0; i < length; i++) {
      let manifold = this.CLMDs[i]
      if (!manifold.penerate || !manifold.collide)
        return
      FrictionSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.manifold.axis,
        manifold.ca1,
        manifold.ca2,
        manifold.impulse
      )
      ContactSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.impulse
      )
    }
  }
  intergrate(dt, length) {
    for (var i = 0; i < length; i++) {
      let a = this.objects[i]
      if (!a.sleeping)
        VerletSolver.solve(a, dt)
    }
  }
  applyGravity(length, dt) {
    for (var i = 0; i < length; i++) {
      let a = this.objects[i]
      a.acceleration.add(this.gravitationalAcceleration)
    }
  }
  layer(a, b) {
    if(
      (a.mask.group == 0 || b.mask.group ==0) ||
      a.mask.group !== b.mask.group
      )return true
    if (a.mask.layer < 0 || b.mask.layer < 0) return true;
    if (!a.mask.layer || !b.mask.layer || a.mask.layer === b.mask.layer)
      return true
    return false
  }
  updateConstraints() {
    let length = this.constraints.length
    for (var i = 0; i < length; i++) {
      this.constraints[i].update(dt)
    }
  }
  updateBodies(length) {
    let ld = 1 - this.linearDamping
    let ad = 1 - this.angularDamping
    for (var i = 0; i < length; i++) {
      this.objects[i].update()
      this.objects[i].velocity.multiply(ld)
      this.objects[i].angularVelocity = this.objects[i].angularVelocity * ad
    }
  }
  update(dt) {
    let length = this.objects.length
    this.CLMDs = []
    this.applyGravity(length, dt)
    this.collisionDetection(length)
    this.collisionResponse()
    this.intergrate(dt, length)
    this.updateConstraints(length)
    this.updateBodies(length)
  }
  add(body) {
    body.index = this.objects.length
    this.objects.push(body)
  }
  remove(body) {
    this.objects.splice(body.index, 1)
    body.index = -1
  }
  addConstraint(constraint) {
    this.constraints.push(constraint)
  }
  query(position, radius) {
    let dist = radius ** 2,
      closeObjects = []
    for (var i = 0; i < this.objects.length; i++) {
      let ob = this.objects[i]
      if (position.distanceToSquared(ob.position) < dist)
        closeObjects.push(ob)
    }
    return closeObjects
  }
}

export {
  World
}