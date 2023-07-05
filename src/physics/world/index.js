import { EulerSolver, VerletSolver } from "../integrators/index.js";
import { PenetrationSolver, FrictionSolver, ImpulseSolver, ContactSolver } from "../solvers/index.js";
import { Vector, naturalizePair }from "../../math/index.js"
import {Utils} from  "../../utils/index.js"
import { SAT } from "../SAT/index.js";
import { ObjType } from "../settings.js"
//import {ctx} from "../../debug.js"

import { NaiveBroadphase } from "../broadphases/index.js"
import { Settings } from "../settings.js"

/**
 * Class responsible for updating bodies,constraints and composites.
 */
class World {
  /**
   * Used to check if a manifold is persistent.
   * 
   * @type number
   * @private
   */
  count = 0
  /**
   * A record of collision manifolds.
   * 
   * @type Map<number,Manifold>
   * @protected
   */
  records = new Map()
  /**
   * A list of bodies.
   * 
   * @type Array<Body>
   * @private
   */
  objects = []
  /**
   * A list of constraints fixed to a static object.
   * 
   * @type Array<Constraint>
   * @private
   */
  fixedConstraits = []
  /**
   * A list of constraints fixed to two dynamic bodies.
   * 
   * @type Array<Constraint>
   * @private
   */
  constraints = []
  /**
   * A value between 0 and 1 used to dampen linear velocity of bodies.
   * 
   * @type number
   */
  linearDamping = Settings.linearDamping
  /**
   * A value between 0 and 1 used to dampen angular velocity of bodies.
   * 
   * @type number
   */
  angularDamping = Settings.angularDamping

  /**
   * The number of times to solve for velocity.A high number results in much more stable stacking.
   * 
   * @type number
   */
  velocitySolverIterations = Settings.velocitySolverIterations
  /**
   * The collision manifolds that have passed narrowphase and verified to be colliding.
   * 
   * @type Array<Manifold>
   */
  CLMDs = []
  /**
   * The collision manifolds that have passed broadphase and could be colliding
   * 
   * 
   * @type Array<BroadManifold>
   */
  contactList = []
  /**
   * The gravitational pull of the world.
   * 
   * @type Vector
   */
  gravitationalAcceleration = new Vector(0, 0)
  /**
   * Time in seconds that a single frame takes.This has more precedence than the first parameter of World.update(),set to this to zero if you want to use the latter as the delta time.
   * 
   * @type number
   */
  fixedFrameRate = Settings.fixedFrameRate
  /**
   * 
   * @type { {lastTimestamp:number,total: number}}
   * @ignore
   */
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * This is a cheap way of determining which pairs of bodies could be colliding.
   * 
   * @type Broadphase
   */
  broadphase = null
  /**
   * @constructor World
   * 
   */
  constructor() {
    this.broadphase = new NaiveBroadphase(this)
  }
  set gravity(x) {
    if (typeof x === "object")
      return this.gravitationalAcceleration.copy(x)
    this.gravitationalAcceleration.set(0, x)
  }
  /**
   * Gravitational pull of the world,will affect all bodies except static bodies.
   * 
   * @type {Vector }
   */
  get gravity() {
    return this.gravitationalAcceleration
  }
  /**
   * @private
   */
  narrowPhase() {
    let
      collisionData,
      manifold

    for (var i = 0; i < this.contactList.length; i++) {
      let { a, b } = this.contactList[i]
      a.sleeping = false
      b.sleeping = false
      let id = naturalizePair(a.id, b.id)
      if (!this.records.has(id))
        this.records.set(id, {
          bodyA: a,
          bodyB: b,
          contactData: {
            lastOverlap: 0,
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
          stmp: -1,
          impulse: 0,
          persistent: false,
          ca1: new Vector(),
          ca2: new Vector(),
          restitution: 0,
          staticFriction: 0,
          kineticFriction: 0,
          velA: new Vector(),
          velB: new Vector(),
          rotA: 0,
          rotB: 0
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
  broadPhase() {
    this.contactList = []
    this.broadphase.getCollisionPairs(this.contactList)
  }
  /**
   * @private
   */
  collisionDetection() {
    this.broadPhase()
    this.narrowPhase()
  }
  /**
   * @private
   * @param {number} dt 
   */
  collisionResponse(dt) {
    let length = this.CLMDs.length,
      manifold,
      inv_dt = 1 / dt,
      laststmp = this.count - 1



    for (var j = 0; j < this.velocitySolverIterations; j++) {
      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i]
        manifold.velA.set(0, 0)
        manifold.velB.set(0, 0)
        manifold.rotA = 0
        manifold.rotB = 0
        ImpulseSolver.solve(manifold)
        FrictionSolver.solve(manifold)
      }
      for (var i = 0; i < length; i++) {
        manifold = this.CLMDs[i]
        manifold.bodyA.velocity.add(manifold.velA)
        manifold.bodyB.velocity.add(manifold.velB)
        manifold.bodyA.rotation.radian += manifold.rotA
        manifold.bodyB.rotation.radian += manifold.rotB
      }
    }

    for (let i = 0; i < length; i++) {
      manifold = this.CLMDs[i]
      PenetrationSolver.solve(manifold, inv_dt)
    }

    for (let i = 0; i < length; i++) {
      manifold = this.CLMDs[i]
      manifold.stmp = this.count
      ContactSolver.solve(
        manifold.bodyA,
        manifold.bodyB,
        manifold.impulse,
        manifold.contactData.contactNo
      )
    }
  }
  /**
   * @private
   * @param {number} dt 
   * @param {number} length 
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
   * @param {number} length 
   * @param {number} dt 
   */
  applyGravity(length, dt) {
    let frame = this.gravitationalAcceleration.clone().multiply(dt)
    for (var i = 0; i < length; i++) {
      let a = this.objects[i]
      if (a.mass)
        a.acceleration.add(this.gravitationalAcceleration)
    }
  }
  /**
   * @private
   * @param {number} dt
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
   * @param {number} length 
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
   * 
   * 
   * @param {Number} dt the time passed between the last call and this call.
   */
  update(delta) {
    this.perf.lastTimestamp = performance.now()
    let dt = this.fixedFrameRate || delta
    let length = this.objects.length
    this.CLMDs = []

    this.applyGravity(length, dt)
    this.updateBodies(length)
    this.updateConstraints(dt)
    this.broadphase.update()
    this.collisionDetection()
    this.collisionResponse(dt)
    this.updateConstraints(dt)
    this.intergrate(dt, length)
    this.updateBodies(length)
    this.count += 1
    this.perf.total = performance.now() - this.perf.lastTimestamp
  }

  /**
   * Initializes the manager.
   * 
   * @param {Manager} manager
   */
  init(manager) {
    manager.setComponentList("body", this.objects)
  }
  /**
   * Adds an object to the world.
   * 
   * @param {Body | Composite | Constraint} object
   */
  add(object) {
    if (object.physicsType == ObjType.BODY) {
      this.addBody(object)
    } else if (object.physicsType == ObjType.CONSTRAINT) {
      this.addConstraint(object)
    } else if (object.physicsType == ObjType.COMPOSITE) {
      this.addComposite(object)
    }
  }
  /**
   * Adds a body to the physics world
   * @param {Body} body Body to insert to world
   */
  addBody(body) {
    //must update vertices and bounds so that Broadphase works properly
    body.update()
    body.index = this.objects.length
    this.objects.push(body)
    this.broadphase.insert(body)
  }
  /**
   * Removes an object from the world
   * @param {Body | Composite | Constraint} object
   */
  remove(object) {
    if (object.physicsType == ObjType.BODY) {
      this.removeBody(object)
    } else if (object.physicsType == ObjType.CONSTRAINT) {
      this.removeContraint(object)
    } else if (object.physicsType == ObjType.COMPOSITE) {
      this.removeComposite(object)
    }
  }
  /**
   * Removes a body from the physics world
   * @param {Body} body Body to remove from world
   * 
   * @returns Body
   */
  removeBody(body) {
    this.broadphase.remove(body)
    if (Utils.removeElement(this.objects, body.index)) {
      if (body.index === this.objects.length)
        return
      this.objects[body.index].index = body.index
    }
    return body
  }
  /**
   * Adds a constraint to the physics world
   * @param {Constraint} constraint constaint to add to world
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
   * @param {Constraint} constraint constaint to add to world
   * 
   * @returns Constraint
   */
  removeContraint(constraint) {
    let arr = constraint.fixed ? this.fixedConstraits : this.constraints
    let temp = arr.pop()
    this.objects[constraint.index] = temp
    temp.index = constraint.index
    constraint.index = -1
    return constraint
  }

  /**
   * Adds a composite to the physics world.
   * 
   * @param {Composite} composite composite to add to world
   */
  addComposite(composite) {
    for (var i = 0; i < composite.bodies.length; i++) {
      this.addBody(composite.bodies[i])
    }
    for (var i = 0; i < composite.constraints.length; i++) {
      this.addConstraint(composite.constraints[i])
    }
  }
  /**
   * Removes a composite from the physics world.
   * 
   * @param {Composite} composite composite to remove
   */
  removeComposite(composite) {
    for (var i = 0; i < composite.bodies.length; i++) {
      this.removeBody(composite.bodies[i])
    }
    for (var i = 0; i < composite.constraints.length; i++) {
      this.removeContraint(composite.constraints[i])
    }
  }
  /**
   * Searches for objects in a given bounds and returns them.
   * 
   * @param {Bounds} bound the region to search in
   * @param {Array<Body>} [target = []] an array to store results in
   * @returns Array<Body>
   */
  query(bound, target = []) {
    this.broadphase.query(bound, target)
    return target
  }
}

export {
  World
}