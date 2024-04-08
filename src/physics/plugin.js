import { NaiveBroadphase2DPlugin } from "./broadphases/index.js"
import { SATNarrowphase2DPlugin } from "./narrowphase/index.js"
import { Vector2 } from "../math/index.js"
import { Body2D } from "./bodies/index.js"
import { Shape2D } from "./shapes/index.js"
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
    this.autoUpdateBounds = options.autoUpdateBounds ?? true
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
    if (this.autoUpdateBounds) manager.registerSystem(updateBounds)
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
  const query = manager.query("movable", "physicsproperties")

  query.each((movable, properties) => {
    if (properties.invmass == 0) return
    Vector2.add(
      movable.acceleration,
      gravity,
      movable.acceleration
    )
  })
}
/**
 * @param {Manager} manager
 */
export function updateBodies(manager) {
  const query = manager.query("transform", "shape2d")

  query.each((transform, shape) => {
    Shape2D.update(
      shape,
      transform.position,
      transform.orientation,
      transform.scale
    )
  })
}
export function updateBounds(manager) {
  const query = manager.query("shape2d", "bound")
  query.each((shape, bound) => {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER

    if (shape.type == Shape2D.CIRCLE) {
      const position = shape.vertices[0]
      const radiusX = shape.vertices[1].x
      const radiusY = shape.vertices[1].y
      const idx = position.x - radiusX,
        idy = position.y - radiusY,
        mdx = position.x + radiusX,
        mdy = position.y + radiusY
      if (idx < minX) minX = idx
      if (mdx > maxX) maxX = mdx
      if (idy < minY) minY = idy
      if (mdy > maxY) maxY = mdy
    } else {
      for (let j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j]
        if (vertex.x < minX) minX = vertex.x
        if (vertex.x > maxX) maxX = vertex.x
        if (vertex.y < minY) minY = vertex.y
        if (vertex.y > maxY) maxY = vertex.y
      }
    }
    bound.min.x = minX
    bound.max.x = maxX
    bound.min.y = minY
    bound.max.y = maxY
  })
}
/**
 * @param {Manager} manager
 */
export function collisionResponse(manager) {
  const inv_dt = 1 / manager.getResource("delta")
  const contacts = manager.getResource("contacts")
  for (let i = 0; i < contacts.length; i++) {
    const {
      positionA,
      positionB,
      movableA,
      movableB,
      propA,
      propB
    } = contacts[i]

    CollisionManifold.prepare(
      contacts[i],
      positionA,
      positionB,
      movableA.velocity,
      movableB.velocity,
      movableA.rotation,
      movableB.rotation,
      propA,
      propB,
      inv_dt
    )
  }
  for (let i = 0; i < Settings.velocitySolverIterations; i++) {
    for (let j = 0; j < contacts.length; j++) {
      const {
        movableA,
        movableB,
        propA,
        propB
      } = contacts[j]

      CollisionManifold.solve(
        contacts[j],
        movableA,
        movableB,
        propA.invmass,
        propB.invmass,
        propA.invinertia,
        propB.invinertia,
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