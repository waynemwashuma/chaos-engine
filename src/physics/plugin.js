import { NaiveBroadphase2DPlugin } from "./broadphases/index.js"
import { SATNarrowphase2DPlugin } from "./narrowphase/index.js"
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
    this.enableGravity = options.enableGravity ?? true
    this.broadphase = options.broadphase || new NaiveBroadphase2DPlugin()
    this.narrowphase = options.narrowphase || new SATNarrowphase2DPlugin()
    this.intergrator = options.intergrator || new Intergrator2DPlugin(options.intergratorOpt)
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    if (this.enableGravity) {
      manager.setResource("gravity", this.gravity)
      manager.registerSystem(applyGravity)
    }
    manager.registerPlugin(this.intergrator)
    manager.registerSystem(updateBodies)
    manager.registerPlugin(this.broadphase)
    manager.registerPlugin(this.narrowphase)
    manager.registerSystem(collisionResponse)
  }
}

/**
 * @param {Manager} manager
 */
export function applyGravity(manager) {
  const gravity = manager.getResource("gravity")
  const [bodies, movables] = manager.query("body", "movable").raw()

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
  const [transform, bounds, bodies] = manager.query("transform", "bound", "body").raw()

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
    const { positionA, positionB, movableA, movableB, bodyA, bodyB } = contacts[i]

    /* 
    CollisionManifold.warmstart(
      contacts[i],
      movableA,
      movableB,
      bodyA,
      bodyB
    )
    */
    CollisionManifold.prepare(
      contacts[i],
      bodyA,
      bodyB,
      positionA,
      positionB,
      movableA.velocity,
      movableB.velocity,
      movableA.rotation,
      movableB.rotation,
      inv_dt
    )
  }
  for (let i = 0; i < Settings.velocitySolverIterations; i++) {
    for (let j = 0; j < contacts.length; j++) {
      const { movableA, bodyA, movableB, bodyB } = contacts[j]

      CollisionManifold.solve(
        contacts[j],
        movableA,
        movableB,
        bodyA,
        bodyB
      )
    }
  }
}

/**
 * @typedef Physics2DPluginOptions
 * @property {boolean} [enableGravity=true]
 * @property {Vector2} [gravity]
 * @property {Plugin} [broadphase]
 * @property {Plugin} [narrowphase]
 * @property {Plugin} [intergrator]
 */