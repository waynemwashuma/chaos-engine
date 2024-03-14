import { Broadphase } from "./broadphase.js"
import { boundsColliding } from "../../math/index.js"

/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
 */
export class NaiveBroadphase extends Broadphase {
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
   * @param {Bounds} bound Region to check in.
   * @param {Body2D[]} target Empty array to store results.
   * @returns {Body2D[]}
   */
  query(bound, target) {
    closeObjects = target || []
    for (var i = 0; i < this.objects.length; i++) {
      let ob = this.world.objects[i]
      if (ob.bounds.intersects(bound) < dist)
        closeObjects.push(ob)
    }
    return closeObjects
  }
  /**
   * @param {Entity[][]} entities 
   * @param {BoundingBox[][]} bounds
   */
  update(entities, bounds) {
    this.entities = entities.reduce((a, b) => a.concat(b), [])
    this.bounds = bounds.reduce((a, b) => a.concat(b), [])
  }
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target = []) {
    const { entities, bounds } = this
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        if (!boundsColliding(bounds[i], bounds[j]))
          continue
        target.push({
          a: entities[i],
          b: entities[j]
        })
      }
    }
    return target
  }
}