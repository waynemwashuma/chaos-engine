import { BoundingBox, Vector2 } from "../../math/index.js"
import { Broadphase, NaiveBroadphase } from "../broadphases/index.js"
import { SATNarrowphase, CollisionManifold, NarrowPhase } from "../narrowphase/index.js"
import { Settings } from "../settings.js"
import { deprecate } from "../../logger/index.js"
import { Body2D } from "../bodies/index.js"
import { Entity, Manager } from "../../ecs/index.js";
import { Movable } from "../../intergrator/movableComponent.js"
import { Transform } from "../../intergrator/index.js"

/**
 * Class responsible for updating bodies,constraints and composites.
 */
export class World2D {
  /**
   * The collision manifolds that have passed narrowphase and verified to be colliding.
   * 
   * @type {CollisionManifold<Entity>[]}
   */
  CLMDs = []
  /**
   * The collision manifolds that have passed broadphase and could be colliding
   * 
   * @deprecated
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
  broadphase
  /**
   * This accurately tests body pairs to check 
   * for collision and outputs a manifold for each body pair.
   * 
   * @type {NarrowPhase}
   */
  narrowphase
  constructor() {
    this.broadphase = new NaiveBroadphase()
    this.narrowphase = new SATNarrowphase()
  }

  /**
   * Gravitational pull of the world,will affect all bodies except static bodies.
   * 
   * @deprecated
   * @type { Vector2 }
   */
  get gravity() {
    return this.gravitationalAcceleration
  }

  set gravity(x) {
    if (typeof x === "object") {
      Vector2.copy(x, this.gravitationalAcceleration)
    } else {
      Vector2.set(this.gravitationalAcceleration, 0, x)
    }
  }

  /**
   * 
   * @param {any} manager
   * @param {World2D} world
   * @param {CollisionPair[]} contactList
   */
  static narrowPhase(manager, world, contactList) {
    return world.narrowphase.getCollisionPairs(manager, contactList)

  }
  /**
   * 
   * @param {World2D} world
   */
  static broadPhase(world) {
    return world.broadphase.getCollisionPairs([])
  }
  /**
   * 
   * @param {any} manager
   * @param {World2D} world
   */
  static collisionDetection(manager, world) {
    world.contactList = World2D.broadPhase(world)
    world.CLMDs = World2D.narrowPhase(manager, world, world.contactList)
  }
  /**
   * 
   * @param {number} dt
   * @param {Manager} manager
   * @param {World2D} world
   * @param {string | any[]} CLMDs
   */
  static collisionResponse(manager, world, CLMDs, dt) {
    const inv_dt = 1 / dt

    for (let i = 0; i < CLMDs.length; i++) {
      const manifold = CLMDs[i]
      const [transformA, movableA, bodyA] = manager.get(manifold.entityA, "transform", "movable", "body")
      const [transformB, movableB, bodyB] = manager.get(manifold.entityB, "transform", "movable", "body")

      if (Settings.warmStarting)
        CollisionManifold.warmstart(
          manifold,
          movableA,
          movableB,
          bodyA,
          bodyB
        )
      CollisionManifold.prepare(
        manifold,
        bodyA,
        bodyB,
        movableA,
        movableB,
        transformA.position,
        transformB.position,
        inv_dt
      )
    }
    for (let i = 0; i < Settings.velocitySolverIterations; i++) {
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
    } /***/
  }
  /**
   * 
   * @param {Vector} gravity
   * @param {Movable[][]} movable
   * @param {Body2D[][]} bodies
   */
  static applyGravity(gravity, movable, bodies) {
    for (var i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies[i].length; j++) {
        if (bodies[i][j].inv_mass)
          Vector2.add(
            movable[i][j].acceleration,
            gravity,
            movable[i][j].acceleration
          )
      }
    }
  }
  /**
   * 
   * @param {Body2D[][]} bodies
   * @param {Transform[][]} transform
   * @param {BoundingBox[][]} bounds
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
   * @param {Body2D[][]} bodies
   * @param {Number} dt the time passed between the last call and this call.
   * @param {Manager} manager
   * @param {Entity[][]} entities
   * @param {Transform[][]} transform
   * @param {Movable[][]} movable
   * @param {BoundingBox[][]} bounds
   */
  static update(manager, world, entities, transform, movable, bounds, bodies, dt) {
    /** @type {CollisionManifold<Entity>[]}*/
    this.CLMDs = []
    World2D.applyGravity(world.gravitationalAcceleration, movable, bodies)
    World2D.updateBodies(transform, bounds, bodies)
    world.broadphase.update(entities, bounds)
    World2D.collisionDetection(manager, world)
    World2D.collisionResponse(manager, world, world.CLMDs, dt)
  }

  /**
   * Searches for objects in a given bounds and returns them.
   * 
   * @template {Entity} T
   * @param {Bounds} bound the region to search in
   * @param {T[]} [out = []] an array to store results in
   * @returns {T[]}
   */
  query(bound, out = []) {
    this.broadphase.query(bound, out)
    return out
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
    deprecate("World()", "World2D()")
    // @ts-ignore
    super(...arguments)
  }
}