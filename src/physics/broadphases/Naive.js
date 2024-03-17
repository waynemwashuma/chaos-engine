import { Broadphase } from "./broadphase.js"
import { BoundingBox,boundsColliding } from "../../math/index.js"
import { Entity } from "../../ecs/index.js"

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
   * @param {BoundingBox} bound Region to check in.
   * @param {Entity[]} target Empty array to store results.
   * @returns {Entity[]}
   */
  query(bound,target = []) {
    for (let i = 0; i < this.entities.length; i++)
      if (boundsColliding(bound,this.bounds[i]))
        target.push(this.entities[i])
    return target
  }
  /**
   * @param {Entity[][]} entities 
   * @param {BoundingBox[][]} bounds
   */
  update(entities,bounds) {
    this.entities = entities.reduce((a,b) => a.concat(b),[])
    this.bounds = bounds.reduce((a,b) => a.concat(b),[])
  }
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target = []) {
    const { entities,bounds } = this
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        if (!boundsColliding(bounds[i],bounds[j]))
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