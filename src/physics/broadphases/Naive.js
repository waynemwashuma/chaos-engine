import { Broadphase } from "./broadphase.js"

/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
*/
export class NaiveBroadphase extends Broadphase {
  /**
   * @private
   * @type {Body2D[]}
  */
  bodies = null
  /**
   * @param {World2D} world
  */
  constructor(world) {
    super()
    this.bodies = world.objects
  }
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
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
  */
  getCollisionPairs(target) {
    target = target || []
    let bodies = this.bodies,
      length = bodies.length
    for (let i = 0; i < length; i++) {
      let a = bodies[i]
      for (let j = i + 1; j < length; j++) {
        let b = bodies[j]
        if(!this.canCollide(a,b))continue
        if (!a.bounds.intersects(b.bounds))
          continue
        let list = {
          a,
          b
        }
        if (a.aabbDetectionOnly || b.aabbDetectionOnly) continue
        if (!a.shapes.length || !b.shapes.length) continue
        target.push(list)
      }
    }
    return target
  }

}