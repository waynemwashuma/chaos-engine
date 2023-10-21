import { CollisionManifold } from "../utils/collisionManifold.js"
import { VerletSolver } from "../integrators/index.js";
import { PenetrationSolver, FrictionSolver, ImpulseSolver, ContactSolver } from "../solvers/index.js";
import { Vector } from "../../utils/vector.js"
import { SAT } from "../SAT/index.js";
import { EventDispatcher } from "../../inputs/index.js"
//import { ctx } from "/chaos-engine/src/debug.js"

function CollisionEventHandler(ev) {
  ev.body1.parent.onCollision(ev, ev.body2.parent)
  ev.body2.parent.onCollision(ev, ev.body1.parent)
}
class World {
  objects = []
  constraints = []
  linearDamping = 0.001
  angularDamping = 0.001
  solverIterations = 10
  CLMDs = []
  contactList = []
  gravitationalAcceleration = new Vector(0, 0)
  eventDispatcher = new EventDispatcher()
  constructor() {
    this.eventDispatcher.add("collision",CollisionEventHandler)
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
      if (a.sleeping && a.mass)
        a.sleeping = false
      if (b.sleeping && b.mass)
        b.sleeping = false

      let collisionData = SAT.shapesInBodyCollided(a, b)

      if (!collisionData) continue
      let contactPoint
      if (collisionData.contactPoints.length == 2) {
        contactPoint = Vector.lerp(
          collisionData.contactPoints[0],
          collisionData.contactPoints[1],
          0.5
        )
      } else {
        contactPoint = collisionData.contactPoints[0]
      }
      let ca1 = contactPoint.clone().sub(a.position)
      let ca2 = contactPoint.clone().sub(b.position)
      let manifold = new CollisionManifold(a, b, collisionData, ca1, ca2)
      manifold.restitution = a.restitution < b.restitution ? a.restitution : b.restitution
      manifold.staticFriction = a.staticFriction < b.staticFriction ? a.staticFriction : b.staticFriction
      manifold.kineticFriction = a.kineticFriction < b.kineticFriction ? a.kineticFriction : b.kineticFriction
      manifold.collide = a.collisionResponse && b.collisionResponse
      manifold.penerate = a.collisionPenetration && b.collisionPenetration
      this.CLMDs.push(manifold)
      this.eventDispatcher.emit("collision", manifold)
    }
  }
  broadPhase(length) {
    this.contactList = []
    for (let i = 0; i < length; i++) {
      let a = this.objects[i]
      for (let j = i + 1; j < length; j++) {
        let b = this.objects[j]
        if (!a.mass && !b.mass) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        let list = {
          a,
          b
        }
        this.eventDispatcher.emit("precollision", {
          a:a.parent,
          b:b.parent
        })
        if (a.AABBDetectionOnly || b.AABBDetectionOnly) continue

        this.contactList.push(list)

      }
    }
  }
  collisionDetection(l) {
    this.broadPhase(l)
    this.narrowPhase()
  }
  collisionResponse(dt) {
    let length = this.CLMDs.length,
      subdt = dt / this.solverIterations
    for (var j = 0; j < length; j++) {
      let manifold = this.CLMDs[j]
      if (!manifold.penerate)
        continue
      PenetrationSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.manifold
      )
      if (!manifold.collide)
        continue
      let r = ImpulseSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.manifold.axis,
        manifold.ca1,
        manifold.ca2,
        manifold.restitution
      )
      if (!r) continue
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
      /*ContactSolver.solve(
        manifold.body1,
        manifold.body2,
        manifold.impulse
      )*/
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
      if (a.mass)
        a.acceleration.add(this.gravitationalAcceleration)
    }
  }
  layer(a, b) {
    if (a.layer < 0 || b.layer < 0) return true;
    if (!a.layer || !b.layer || a.layer === b.layer)
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
    this.intergrate(dt, length)
    this.collisionDetection(length)
    this.collisionResponse(dt)
    this.updateBodies(length)
    this.updateConstraints(length)

  }
  add(body) {
    this.objects.push(body)
  }
  remove(body) {
    this.objects.splice(this.objects.indexOf(body), 1)
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