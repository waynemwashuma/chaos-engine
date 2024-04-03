import { Broadphase,NaiveBroadphase } from "./broadphases/index.js"
import { NarrowPhase,SATNarrowphase } from "./narrowphase/index.js"
import { Vector2 } from "../math/index.js"
import { Body2D } from "./bodies/index.js"
import { Settings } from './settings.js';
import { CollisionManifold } from './narrowphase/index.js';
import { Intergrator2DPlugin } from "../intergrator/index.js"
import { Manager } from "../ecs/index.js";

export class Physics2DPlugin {
  /**
   * @param {Physics2DPluginOptions} options
   */
  constructor(options = {}) {
    this.gravity = options.gravity || new Vector2()
    this.enableGravity = options.enableGravity || true
    this.broadphase = new Broadphase2DPlugin(options.broadphase)
    this.narrowphase = new Narrowphase2DPlugin(options.narrowphase)
    this.intergrator = new Intergrator2DPlugin(options.intergratorOpt)

  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    if (this.enableGravity) {
      manager.setResource("gravity",this.gravity)
      manager.registerSystem(applyGravity)
    }
    manager.registerPlugin(this.intergrator)
    manager.registerSystem(updateBodies)
    manager.registerPlugin(this.broadphase)
    manager.registerPlugin(this.narrowphase)
    manager.registerSystem(collisionResponse)
  }
}
export class Broadphase2DPlugin {
  /**
   * 
   * @param {Broadphase} broadphase 
   */
  constructor(broadphase = new NaiveBroadphase()) {
    this.broadphase = broadphase
  }
  /**
  * @param {Manager} manager
  */
  register(manager) {
    manager.setResource("collisionPairs",[])
    manager.setResource("broadphase",this.broadphase)
    manager.registerSystem(naivebroadphaseUpdate)
  }
}
export class Narrowphase2DPlugin {
  /**
   * 
   * @param {NarrowPhase} narrowphase 
   */
  constructor(narrowphase = new SATNarrowphase()) {
    this.narrowphase = narrowphase
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource("contacts",[])
    manager.setResource("narrowphase",this.narrowphase)

    if (this.narrowphase instanceof SATNarrowphase) {
      manager.registerSystem(satNarrowphaseUpdate)
    }
  }
}
/**
 * @param {Manager} manager
 */
export function naivebroadphaseUpdate(manager) {
  const [entities,bounds] = manager.query("entity","boundingbox").raw()
  const broadphase = manager.getResource("broadphase")
  broadphase.update(entities,bounds)
  const pairs = manager.getResource("collisionPairs")
  pairs.length = 0
  broadphase.getCollisionPairs(pairs)
}
/**
 * @param {Manager} manager
 */
export function satNarrowphaseUpdate(manager) {
  const narrowphase = manager.getResource("narrowphase")
  const pairs = manager.getResource("collisionPairs")

  const contacts = manager.getResource("contacts")
  contacts.length = 0
  narrowphase.getCollisionPairs(manager,pairs,contacts)
}
/**
 * @param {Manager} manager
 */
export function applyGravity(manager) {
  const gravity = manager.getResource("gravity")
  const [bodies,movables] = manager.query("body2d","movable").raw()

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies[i].length; j++) {
      if (bodies[i][j].inv_mass) {
        Vector2.add(
          movables[i][j].acceleration,
          gravity,
          movables[i][j].acceleration
        )
      }
    }
  }
}
/**
 * @param {Manager} manager
 */
export function updateBodies(manager) {
  const [transform,bounds,bodies] = manager.query("transform","boundingbox","body2d").raw()

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
 * @param {Manager} manager
 */
export function collisionResponse(manager) {
  const inv_dt = 1 / manager.getResource("delta")
  const contacts = manager.getResource("contacts")

  for (let i = 0; i < contacts.length; i++) {
    const manifold = contacts[i]
    const [transformA,movableA,bodyA] = manager.get(manifold.entityA,"transform","movable","body2d")
    const [transformB,movableB,bodyB] = manager.get(manifold.entityB,"transform","movable","body2d")

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
    for (let j = 0; j < contacts.length; j++) {
      const manifold = contacts[j]
      const [movableA,bodyA] = manager.get(manifold.entityA,"movable","body2d")
      const [movableB,bodyB] = manager.get(manifold.entityB,"movable","body2d")

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
 * @typedef Physics2DPluginOptions
 * @property {boolean} [enableGravity=true]
 * @property {Vector2} [gravity]
 * @property {Broadphase} [broadphase]
 * @property {NarrowPhase} [narrowphase]
 * @property {import("../intergrator/index.js").IntergratorPluginOptions} [intergratorOpt]
 */