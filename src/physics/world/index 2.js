import { VerletSolver } from "../integrators/index.js";
import { PenetrationSolver, FrictionSolver, ImpulseSolver, ContactSolver } from "../solvers/index.js";
import { Vector, naturalizePair } from "../../utils/index.js"
import { SAT } from "../SAT/index.js";

import { NaiveBroadphase } from "../broadphases/index.js"
const ObjType = {
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
}

class World {
  records = new Map()
  objects = []
  fixedConstraits = []
  constraints = []
  linearDamping = 0.0
  angularDamping = 0.01
  velocitySolverIterations = 1
  positionSolverIteration = 1
  CLMDs = []
  contactList = []
  gravitationalAcceleration = new Vector(0, 0)
  fixedFrameRate = 0.016
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * @constructor World
   * 
   */
  constructor() {
    this.broadphase = new NaiveBroadphase(this)
  }
  /**
   * Sets the gravitational pull of the world
   */

  set gravity(x) {
    if (typeof x === "object")
      return this.gravitationalAcceleration.copy(x)
    this.gravitationalAcceleration.set(0, x)
  }
  /**
   * gets the gravitational pull of the world
   * @returns {Vector}
   */
  get gravity() {
    return this.gravitationalAcceleration
  }
  /**
   * @private
   */
  narrowPhase() {
    let ca1,
      ca2,
      collisionData,
      manifold

    for (var i = 0; i < this.contactList.length; i++) {
      let { a, b } = this.contactList[i]
      a.sleeping = false
      b.sleeping = false
      let id = naturalizePair(a.id, b.id)
      if (!this.records.has(id))
        this.records.set(id,{
          bodyA: a,
          bodyB: b,
          contactData: {
            id,
            lastOverlap: null,
            overlap: -Infinity,
            done: false,
            axis: new Vector(),
            verticesA: [],
            verticesB: [],
            vertShapeA: null,
            vertShapeB: null,
            contactNo: 0,
            shapes: [],
            indexA: 0,
            indexB: 0
          },
          impulse: 0,
          ca1: new Vector(),
          ca2: new Vector(),
          restitution: 0,
          staticFriction: 0,
          kineticFriction: 0
        })
      manifold = this.records.get(id)
      collisionData = manifold.contactData
      collisionData.overlap = -Infinity
      collisionData.done = false
      SAT.shapesInBodyCollided(a, b, collisionData)
      if (collisionData.overlap < 0 || !collisionData.done) continue
      if (collisionData.contactNo == 2) {
        Vector.lerp(
          collisionData.verticesA[0],
          collisionData.verticesA[1],
          0.5,
          manifold.ca1
        ).sub(a.position)
        Vector.lerp(
          collisionData.verticesB[0],
          collisionData.verticesB[1],
          0.5,
          manifold.ca2
        ).sub(b.position)
      } else {
        manifold.ca1.copy(collisionData.verticesA[0]).sub(a.position)
        manifold.ca2.copy(collisionData.verticesB[0]).sub(b.position)
      }
      manifold.restitution = a.restitution < b.restitution ? a.restitution : b.restitution
      manifold.staticFriction = a.staticFriction < b.staticFriction ? a.staticFriction : b.staticFriction
      manifold.kineticFriction = a.kineticFriction < b.kineticFriction ? a.kineticFriction : b.kineticFriction
      if (a.collisionResponse && b.collisionResponse)
        this.CLMDs.push(manifold)
    }
  }
  /*
   * @private
   */
  broadPhase(length) {
    this.contactList = []
    this.broadphase.getCollisionPairs(this.contactList)
  }
  /**
   * @private
   */
  collisionDetection(l) {
    this.broadPhase(l)
    this.narrowPhase()
  }
  /**
   * @private
   */
  collisionResponse(dt) {
    let length = this.CLMDs.length,
      manifold
    for (var j = 0; j < this.positionSolverIteration; j++) {
      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i]
        PenetrationSolver.solve(
          manifold.bodyA,
          manifold.bodyB,
          manifold.contactData
        )
      }
    }
    for (var j = 0; j < this.velocitySolverIterations; j++) {
      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i]
        let r = ImpulseSolver.solve(
          manifold.bodyA,
          manifold.bodyB,
          manifold.contactData.axis,
          manifold.ca1,
          manifold.ca2,
          manifold.restitution
        )
        manifold.impulse = r
      }
    }
    /*for (let i = 0; i < length; i++) {
      manifold = this.CLMDs[i]
      FrictionSolver.solve(
        manifold.bodyA,
        manifold.bodyB,
        manifold.contactData.axis,
        manifold.ca1,
        manifold.ca2,
        manifold.impulse
      )
      ContactSolver.solve(
        manifold.bodyA,
        manifold.bodyB,
        manifold.impulse
      )
    }*/
  }
  /**
   * @private
   */
  intergrate(dt, length) {
    for (var i = 0; i < length; i++) {
      let a = this.objects[i]
      if (!a.sleeping)
        VerletSolver.solve(a, dt)
    }
  }
  /**
   * @private
   */
  applyGravity(length, dt) {
    let frame = this.gravitationalAcceleration
    for (var i = 0; i < length; i++) {
      let a = this.objects[i]
      if (a.mass)
        a.acceleration.add(frame)
    }
  }
  /**
   * @private
   */
  updateConstraints(dt) {
    let length = this.constraints.length,
      fixedlength = this.fixedConstraits.length
    for (var i = 0; i < fixedlength; i++) {
      this.fixedConstraits[i].update(dt)
    }
    for (var i = 0; i < length; i++) {
      this.constraints[i].update(dt)
    }
  }
  /**
   * @private
   */
  updateBodies(length) {
    let ld = 1 - this.linearDamping
    let ad = 1 - this.angularDamping
    for (var i = 0; i < length; i++) {
      this.objects[i].update()
      this.objects[i].velocity.multiply(ld)
      this.objects[i].angularVelocity = this.objects[i].angularVelocity * ad
    }
  }
  /**
   * @param {Number} dt the time passed between two frames
   */
  update(dt) {
    this.perf.lastTimestamp = performance.now()
    dt = this.fixedFrameRate || dt
    let length = this.objects.length
    this.CLMDs = []

    this.applyGravity(length, dt)
    this.intergrate(dt, length)
    this.updateBodies(length)
    this.broadphase.update(this.objects, dt)
    this.updateConstraints(dt)
    this.collisionDetection(length)
    this.collisionResponse(dt)
    this.updateConstraints(dt)
    this.updateBodies(length)
    this.perf.total = performance.now() - this.perf.lastTimestamp
  }

  init(manager) {
    manager.setComponentList("body", this.objects)
  }
  add(object) {
    if (object.type === 0) {

    }
  }
  /**
   * Adds a body to the physics world
   * @param {Body} body Body to insert to world
   */
  addBody(body) {
    //must update vertices and bounds so that Broadphase works properly
    body.update()
    body.bounds.calculateBounds(body)
    body.index = this.objects.length
    this.objects.push(body)
    this.broadphase.insert(body)
  }
  /**
   * Removes a body from the physics world
   * @@param {Body} body Body to remove from world
   */
  remove(body) {
    this.broadphase.remove(body)
    let temp = this.objects.pop()
    this.objects[body.index] = temp1
    temp.index = body.index
    body.index = -1
    return body
  }
  /**
   * Adds a constraint to the physics world
   * @@param {Constraint} constraint constaint to add to world
   */
  addConstraint(constraint) {
    if (constraint.fixed) {
      constraint.index = this.fixedConstraits.length
      this.fixedConstraits.push(constraint)
      return
    }
    constraint.index = this.constraints.length
    this.constraints.push(constraint)
  }
  /**
   * Removes a constraint from the physics world
   * @@param {Constraint} constraint constaint to add to world
   */
  removeContraint(constraint) {
    let arr = constraint.fixed ? this.fixedConstraits : this.constraints
    let temp = arr.pop()
    this.objects[constraint.index] = temp1
    temp.index = constraint.index
    constraint.index = -1
    return constraint
  }
  /**
   * Searches for objects in a given bounds and returns them
   * @@param {} bound the region to search in
   */
  query(bound, target) {
    target = target || []
    this.broadphase.query(bound, target)
    return target
  }
}

export {
  World
}
/**
 * 
 */