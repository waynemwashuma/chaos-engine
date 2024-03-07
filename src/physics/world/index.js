import { VerletSolver } from "../integrators/index.js";
import { PenetrationSolver, ImpulseSolver } from "../solvers/index.js";
import { Vector2 } from "../../math/index.js"
import { NaiveBroadphase } from "../broadphases/index.js"
import { SATNarrowPhase, CollisionManifold } from "../narrowphase/index.js"
import { Settings } from "../settings.js"
import { Logger } from "../../logger/index.js"
import { Body2D } from "../bodies/index.js"

/**
 * Class responsible for updating bodies,constraints and composites.
 */
export class World2D {
  /**
   * The number of times to solve for velocity.A high number results in much more stable stacking.
   * 
   * @type {number}
   */
  velocitySolverIterations = Settings.velocitySolverIterations
  /**
   * The collision manifolds that have passed narrowphase and verified to be colliding.
   * 
   * @type {Manifold[]}
   */
  CLMDs = []
  /**
   * The collision manifolds that have passed broadphase and could be colliding
   * 
   * 
   * @type {CollisionPair[]}
   */
  contactList = []
  /**
   * The gravitational pull of the world.
   * 
   * @type {Vector2}
   */
  gravitationalAcceleration = new Vector2(0, 0)
  /**
   * Time in seconds that a single frame takes.This has more precedence than the first parameter of World2D.update(),set to this to zero if you want to use the latter as the delta time.
   * 
   * @type {number}
   */
  fixedFrameRate = Settings.fixedFrameRate
  /**
   * This is a cheap way of determining which pairs of bodies could be colliding.
   * 
   * @type {Broadphase}
   */
  broadphase = null
  /**
   * This accurately tests body pairs to check 
   * for collision and outputs a manifold for each body pair.
   * 
   * @type {NarrowPhase}
   */
  narrowphase = null

  constructor() {
    this.broadphase = new NaiveBroadphase(this)
    this.narrowphase = new SATNarrowPhase()
  }

  /**
   * Gravitational pull of the world,will affect all bodies except static bodies.
   * 
   * @type { Vector2 }
   */
  get gravity() {
    return this.gravitationalAcceleration
  }

  set gravity(x) {
    if (typeof x === "object") {
      this.gravitationalAcceleration.copy(x)
    } else {
      this.gravitationalAcceleration.set(0, x)
    }
  }

  /**
   * @private
   */
  static narrowPhase(manager, world, contactList) {
    return world.narrowphase.getCollisionPairs(manager, contactList)

  }
  /**
   * @private
   */
  static broadPhase(world) {
    return world.broadphase.getCollisionPairs()
  }
  /**
   * @private
   */
  static collisionDetection(manager, world, body) {
    world.contactList = World2D.broadPhase(world)
    world.CLMDs = World2D.narrowPhase(manager, world, world.contactList, body)
  }
  /**
   * @private
   * @param {number} dt 
   */
  static collisionResponse(manager, world, CLMDs, dt) {
    const inv_dt = 1 / dt

    for (let i = 0; i < CLMDs.length; i++) {
      const manifold = CLMDs[i]
      const [movableA, bodyA] = manager.get(manifold.entityA, "movable", "body")
      const [movableB, bodyB] = manager.get(manifold.entityB, "movable", "body")

      CollisionManifold.prepare(
        manifold,
        bodyA,
        bodyB,
        movableA,
        movableB,
        inv_dt
      )
    }
    for (let i = 0; i < 1; i++) {
      for (let i = 0; i < CLMDs.length; i++) {
        const manifold = CLMDs[i]
        const [movableA, bodyA] = manager.get(manifold.entityA, "movable", "body")
        const [movableB, bodyB] = manager.get(manifold.entityB, "movable", "body")

        CollisionManifold.solve(
          manifold,
          movableA,
          movableB,
          bodyA,
          bodyB
        )
      }
    }


    /*for (let j = 0; j < world.velocitySolverIterations; j++) {
      for (let i = 0; i < CLMDs.length; i++) {
        const manifold = CLMDs[i]
        const [movableA, bodyA] = manager.get(manifold.entityA, "movable", "body")
        const [movableB, bodyB] = manager.get(manifold.entityB, "movable", "body")
        ImpulseSolver.solveWithFriction(
          movableA,
          movableB,
          bodyA,
          bodyB,
          manifold
        )
      }
    }
    for (let i = 0; i < CLMDs.length; i++) {
      const manifold = CLMDs[i]
      const [movableA, bodyA] = manager.get(manifold.entityA, "transform", "body")
      const [movableB, bodyB] = manager.get(manifold.entityB, "transform", "body")

      PenetrationSolver.solveT(
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold,
        inv_dt
      )
    }*/
  }
  /**
   * @private
   * @param {Body2D[][]} body 
   * @param {number} dt 
   */
  static applyGravity(world, movable, bodies, dt) {
    for (var i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        if (bodies[i][j].inv_mass)
          movable[i][j].acceleration.add(world.gravitationalAcceleration)
      }
    }
  }
  /**
   * @private
   * @param {Body[][]} bodies 
   */
  static updateBodies(transform, bounds, bodies) {
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        Body2D.update(
          bodies[i][j],
          transform[i][j].position,
          transform[i][j].orientation,
          transform[i][j].scale,
          bounds[i][j]
        )
      }
    }
  }
  /**
   * @param {World2D} world
   * @param {Body[][]} bodies
   * @param {Number} dt the time passed between the last call and this call.
   */
  static update(manager, world, entities, transform, movable, bounds, bodies, dt) {
    let delta = world.fixedFrameRate || dt
    this.CLMDs = []
    World2D.applyGravity(world, movable, bodies, delta)
    World2D.updateBodies(transform, bounds, bodies)
    world.broadphase.update(entities, bounds)
    World2D.collisionDetection(manager, world)
    World2D.collisionResponse(manager, world, world.CLMDs, dt)
    manager.events.addEvent("collision", world.CLMDs)
  }

  /**
   * Searches for objects in a given bounds and returns them.
   * 
   * @template T
   * @param {Bounds} bound the region to search in
   * @param {T[]} [target = []] an array to store results in
   * @returns {T[]}
   */
  query(bound, target = []) {
    this.broadphase.query(bound, target)
    return target
  }

}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
export class World extends World2D {
  /**
   * @inheritdoc
   */
  constructor() {
    Logger.deprecate("World()", "World2D()")
    super(...arguments)
  }
}