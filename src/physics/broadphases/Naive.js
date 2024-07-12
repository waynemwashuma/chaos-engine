import { AppSchedule } from "../../app/index.js"
import { BoundingBox, boundsColliding } from "../../math/index.js"
import { deprecate } from "../../logger/index.js"

export class CollisionPairs extends Array {}
/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
 */
export class NaiveBroadphase2D {
  /**
   * @private
   * @type {Entity[]}
   */
  entities = []
  /**
   * @private
   * @type {BoundingBox[]}
   */
  bounds = []
  /**
   * @inheritdoc
   * @param {BoundingBox} bound Region to check in.
   * @param {Entity[]} target Empty array to store results.
   * @returns {Entity[]}
   */
  query(bound, target) {
    return NaiveBroadphase2D.query(this, bound, target)
  }
  /**
   * @inheritdoc
   * @param {NaiveBroadphase2D} broadphase Region to check in.
   * @param {BoundingBox} bound Region to check in.
   * @param {Entity[]} target Empty array to store results.
   * @returns {Entity[]}
   */
  static query(broadphase, bound, target = []) {
    for (let i = 0; i < broadphase.entities.length; i++)
      if (boundsColliding(bound, broadphase.bounds[i]))
        target.push(broadphase.entities[i])
    return target
  }
}

/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
 */
export class NaiveBroadphase2DPlugin {
  register(manager) {
    manager
      .registerType(BoundingBox)
      .setResource(new CollisionPairs())
      .setResource(new NaiveBroadphase2D())
      .registerSystem(AppSchedule.Update, getCollisionPairs)
  }
}

function getCollisionPairs(manager) {
  const broadphase = manager.getResource("naivebroadphase2d")
  const pairs = manager.getResource("collisionpairs")
  const query = manager.query(["entity", "boundingbox"])
  const entities = query.raw()[0].reduce((a, b) => a.concat(b), [])
  const bounds = query.raw()[1].reduce((a, b) => a.concat(b), [])

  broadphase.entities = entities
  broadphase.bounds = bounds
  pairs.length = 0

  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      if (!boundsColliding(bounds[i], bounds[j]))
        continue
      pairs.push({
        entityA: entities[i],
        entityB: entities[j]
      })
    }
  }
}

/**
 * @deprecated
 */
export class NaiveBroadphase extends NaiveBroadphase2D {
  constructor() {
    super()
    deprecate("NaiveBroadphase()", "NaiveBroadphase2D()")
  }
}